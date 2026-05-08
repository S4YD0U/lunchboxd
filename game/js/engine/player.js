// ============================================================
// engine/player.js — Save, progression XP/gold, skill tree
// ============================================================
import { SKILL_BRANCHES, XP_CURVE, STAT_GROWTH, LEVEL_UNLOCKS, SHOP_CATALOG, DIFFICULTIES } from '../data/catalog.js';

// ─── Structure par défaut d'une sauvegarde de personnage ────────────────────
export const DEFAULT_CHAR_SAVE = () => ({
  level: 1, xp: 0, totalXp: 0, gold: 0,
  skillPoints: 0, skillPointsSpent: 0,
  unlockedSkills: {},
  unlockedAttacks: ['punch', 'combo', 'defend', 'special'],
  equippedLoadout: ['punch', 'combo', 'defend', 'special'],
  owned: [], equipped: { weapon: null, armor: null }, inventory: [],
});

// ─── Objet joueur courant (mutable) ─────────────────────────────────────────
export let player = DEFAULT_CHAR_SAVE();
export let selectedHero = null;

export function setSelectedHero(id) { selectedHero = id; }

// ─── Persistence localStorage ────────────────────────────────────────────────
export function loadCharSave(charId) {
  try {
    const raw = localStorage.getItem('lunchboxe_char_' + charId);
    if (raw) return Object.assign(DEFAULT_CHAR_SAVE(), JSON.parse(raw));
  } catch (e) { /* silently fail */ }
  return DEFAULT_CHAR_SAVE();
}

export function savePlayer() {
  if (!selectedHero) return;
  localStorage.setItem('lunchboxe_char_' + selectedHero, JSON.stringify(player));
}

export function switchCharSave(charId) {
  Object.assign(player, loadCharSave(charId));
}

// ─── Progression XP / niveaux ───────────────────────────────────────────────
export function getXpForLevel(lv) {
  return XP_CURVE[Math.min(lv, XP_CURVE.length - 1)] || XP_CURVE[XP_CURVE.length - 1];
}

export function getXpProgress() {
  const prev = player.level > 1 ? getXpForLevel(player.level - 1) : 0;
  const next = getXpForLevel(player.level);
  return Math.max(0, Math.min(100, ((player.xp - prev) / (next - prev)) * 100));
}

/**
 * Ajoute XP et gold, gère les montées de niveau.
 * @returns {boolean} true si au moins un niveau gagné
 */
export function addXpGold(xpAmt, goldAmt) {
  player.xp      += xpAmt;
  player.totalXp += xpAmt;
  player.gold    += goldAmt;
  let leveled = false;
  while (player.level < XP_CURVE.length && player.xp >= getXpForLevel(player.level)) {
    player.level++;
    player.skillPoints += 1;
    leveled = true;
    const unlock = LEVEL_UNLOCKS[player.level];
    if (unlock && !player.unlockedAttacks.includes(unlock.attack)) {
      player.unlockedAttacks.push(unlock.attack);
    }
  }
  savePlayer();
  return leveled;
}

// ─── Stats du joueur avec équipement et skills passifs ──────────────────────
export function getLevelStats(baseChar) {
  const bonus    = player.level - 1;
  const weaponItem = player.equipped.weapon
    ? SHOP_CATALOG.weapons.find(w => w.id === player.equipped.weapon) : null;
  const armorItem  = player.equipped.armor
    ? SHOP_CATALOG.armors.find(a => a.id === player.equipped.armor)  : null;
  const stats = {
    hp:  baseChar.hp  * 10 + bonus * STAT_GROWTH.hp,
    atk: baseChar.atk + bonus * STAT_GROWTH.atk + (weaponItem ? weaponItem.atkBonus : 0),
    def: baseChar.def + bonus * STAT_GROWTH.def + (armorItem  ? armorItem.defBonus  : 0),
    spd: baseChar.spd + bonus * STAT_GROWTH.spd,
  };
  return applyPassiveSkills(stats);
}

// ─── Skill tree helpers ──────────────────────────────────────────────────────
export function getSkillLevel(id)   { return player.unlockedSkills[id] || 0; }
export function isSkillUnlocked(id) { return getSkillLevel(id) > 0; }

export function getSkillDef(id) {
  for (const branch of SKILL_BRANCHES) {
    const sk = branch.skills.find(s => s.id === id);
    if (sk) return sk;
  }
  return null;
}

export function isSkillPrereqMet(skill) {
  return !skill.reqSkill || isSkillUnlocked(skill.reqSkill);
}

export function buySkill(id, onSuccess, onError) {
  const sk = getSkillDef(id);
  if (!sk) return;
  if (!isSkillPrereqMet(sk)) { onError('🔒 Prérequis non rempli !'); return; }
  const currentLv = getSkillLevel(id);
  if (currentLv >= sk.maxLevel) { onError('✅ Compétence déjà au niveau max !'); return; }
  if (player.skillPoints < sk.costPerLevel) { onError('✨ Pas assez de points de compétence !'); return; }
  player.skillPoints     -= sk.costPerLevel;
  player.skillPointsSpent += sk.costPerLevel;
  player.unlockedSkills[id] = currentLv + 1;
  savePlayer();
  onSuccess(sk, currentLv + 1);
}

export function getResetCost() {
  return Math.min(500, Math.max(20, (player.skillPointsSpent || 0) * 10));
}

export function doResetSkills(onError) {
  const cost = getResetCost();
  if (player.gold < cost) { onError('Pas assez de pièces ! (' + cost + ' 🪙 requis)'); return false; }
  player.gold -= cost;
  player.skillPoints       += player.skillPointsSpent;
  player.skillPointsSpent  = 0;
  player.unlockedSkills    = {};
  savePlayer();
  return true;
}

// ─── Getters passifs (utilisés par le moteur de combat) ─────────────────────
export function applyPassiveSkills(stats) {
  for (const branch of SKILL_BRANCHES)
    for (const sk of branch.skills) {
      const lv = getSkillLevel(sk.id);
      if (lv > 0 && sk.effect) sk.effect(stats, lv);
    }
  return stats;
}

export function getPassiveMissReduction() {
  let r = 0;
  for (const b of SKILL_BRANCHES) for (const sk of b.skills) {
    const lv = getSkillLevel(sk.id);
    if (lv > 0 && sk.missReduction) r += sk.missReduction(lv);
  }
  return r;
}

export function getPassiveCritBonus() {
  let r = 0;
  for (const b of SKILL_BRANCHES) for (const sk of b.skills) {
    const lv = getSkillLevel(sk.id);
    if (lv > 0 && sk.critDmgBonus) r += sk.critDmgBonus(lv);
  }
  return r;
}

export function getPassiveRegenPerTurn() {
  let r = 0;
  for (const b of SKILL_BRANCHES) for (const sk of b.skills) {
    const lv = getSkillLevel(sk.id);
    if (lv > 0 && sk.regenPerTurn) r += sk.regenPerTurn(lv);
  }
  return r;
}

export function getPassiveSpecialBonus() {
  let r = 0;
  for (const b of SKILL_BRANCHES) for (const sk of b.skills) {
    const lv = getSkillLevel(sk.id);
    if (lv > 0 && sk.specialBonus) r += sk.specialBonus(lv);
  }
  return r;
}

export function getActiveTreeSkills() {
  const res = [];
  for (const b of SKILL_BRANCHES) for (const sk of b.skills)
    if (sk.type === 'active' && getSkillLevel(sk.id) > 0) res.push(sk);
  return res;
}

// ─── Inventaire / shop ───────────────────────────────────────────────────────
export function getSellPrice(item) { return Math.max(5, Math.floor(item.price * 0.4)); }

// ─── Progression des régions ─────────────────────────────────────────────────
function regionProgressKey() {
  return 'lunchboxe_region_progress_' + (selectedHero || 'default');
}

export function loadRegionProgress() {
  try { return JSON.parse(localStorage.getItem(regionProgressKey())) || {}; } catch { return {}; }
}

export function saveRegionProgress(prog) {
  localStorage.setItem(regionProgressKey(), JSON.stringify(prog));
}

export function isRegionUnlocked(regionIdx, regions) {
  if (regionIdx === 0) return true;
  const prog     = loadRegionProgress();
  const prevRegion = regions[regionIdx - 1];
  return !!(prog[prevRegion.id] && prog[prevRegion.id].completed);
}

export function getRegionEnemiesBeaten(regionId) {
  const prog = loadRegionProgress();
  return (prog[regionId] && prog[regionId].beaten) || [];
}

export function markEnemyBeaten(regionId, enemyId, regions) {
  const prog = loadRegionProgress();
  if (!prog[regionId]) prog[regionId] = { beaten: [], completed: false };
  if (!prog[regionId].beaten.includes(enemyId)) prog[regionId].beaten.push(enemyId);
  const region      = regions.find(r => r.id === regionId);
  const wasCompleted = prog[regionId].completed;
  if (region && prog[regionId].beaten.length >= region.enemies.length) {
    prog[regionId].completed = true;
  }
  saveRegionProgress(prog);
  return { wasCompleted, nowCompleted: prog[regionId].completed };
}
