// ============================================================
// engine/battle.js — État et logique du combat au tour par tour
// ============================================================
import { SHOP_CATALOG, DIFFICULTIES, SKILL_BRANCHES } from '../data/catalog.js';
import {
  player, getLevelStats, addXpGold,
  getPassiveMissReduction, getPassiveCritBonus, getPassiveRegenPerTurn,
  getPassiveSpecialBonus, getActiveTreeSkills, isSkillUnlocked, savePlayer,
} from './player.js';

// ─── État global du combat ───────────────────────────────────────────────────
export const state = {
  heroChar: null,
  currentEnemyIndex: 0,
  villainChar: null,
  heroHp: 0, heroMaxHp: 0, heroHpPersist: 0,
  villainHp: 0, villainMaxHp: 0,
  heroSpecial: 0, villainSpecial: 0,
  turn: 1,
  heroDefending: false, villainDefending: false,
  battleRunning: false, playerTurn: true,
  heroStats: null,
  atkBuff: 0, atkBuffTurns: 0,
  fortressActive: false, fortressTurns: 0, fortressCounter: false,
  pendingLevelUp: null,
  heroStatuses: [],
  cooldowns: {},
};

// ─── Difficulté courante ─────────────────────────────────────────────────────
export let currentDifficulty = 'normal';
export function setDifficulty(d) { currentDifficulty = d; }

// ─── Ennemis actifs de la région (tableau mutable) ──────────────────────────
export let ENEMIES = [];

export function setEnemiesFromRegion(regionId, allEnemies, regions) {
  const region = regions.find(r => r.id === regionId);
  if (!region) return;
  ENEMIES = region.enemies.map(eid => allEnemies[eid]).filter(Boolean);
}

export function applyDifficultyToEnemies() {
  const d = DIFFICULTIES[currentDifficulty];
  if (d.hpMult === 1.0 && d.atkMult === 1.0) return;
  ENEMIES = ENEMIES.map(e => ({
    ...e,
    hp:  Math.round(e.hp  * d.hpMult),
    atk: Math.round(e.atk * d.atkMult),
    special: {
      name: e.special.name,
      fn:   (v) => {
        const base = e.special.fn(v);
        return { ...base, dmg: Math.round(base.dmg * d.atkMult) };
      },
    },
  }));
}

// ─── Formules de base ────────────────────────────────────────────────────────
export const calcDmg = (atk, def, mult = 1) =>
  Math.max(1, Math.floor(atk * mult * (0.85 + Math.random() * 0.3) * Math.max(0.3, 1 - def * 0.003)));

export const isCrit = () => Math.random() < 0.15;
export const isMiss = () => Math.random() < Math.max(0.01, 0.08 - getPassiveMissReduction());

export function getEffectiveAtk() {
  return state.heroStats.atk + (state.atkBuffTurns > 0 ? state.atkBuff : 0);
}

// ─── Définitions des attaques ────────────────────────────────────────────────
export function getAttacks(heroChar) {
  const allAttacks = [
    {
      id:'punch', name:'Punch', icon:'👊', desc:'Coup direct', reqLv:1, cls:'', cooldown:0,
      fn:(hero, villain) => {
        if (Math.random() < Math.max(0.01, 0.08 - getPassiveMissReduction())) return { miss:true };
        const crit    = isCrit();
        const critMult = crit ? 1.8 + getPassiveCritBonus() : 1;
        const dmg     = crit
          ? Math.floor(calcDmg(hero.atk, villain.def) * critMult)
          : calcDmg(hero.atk, villain.def);
        return { dmg, crit, spBonus:15, log:(crit?'💥 CRITIQUE ! ':'👊 ')+hero.name+' frappe pour '+dmg+' dégâts !' };
      },
    },
    {
      id:'combo', name:'Combo', icon:'🔥', desc:'2 coups rapides', reqLv:1, cls:'', cooldown:2,
      fn:(hero, villain) => {
        const d1=calcDmg(hero.atk,villain.def,0.65), d2=calcDmg(hero.atk,villain.def,0.65);
        return { dmg:d1+d2, spBonus:20, log:'🔥 Combo — '+(d1+d2)+' dégâts !' };
      },
    },
    {
      id:'defend', name:'Garde', icon:'🛡️', desc:'Réduit les dégâts', reqLv:1, cls:'', cooldown:0,
      fn:(hero) => ({ defend:true, spBonus:8, log:'🛡️ '+hero.name+' se met en garde…' }),
    },
    {
      id:'special', name:'SPÉCIAL', icon:'⚡', desc:'Charge 0%', reqLv:1, cls:'special', cooldown:0,
      fn:(hero, villain) => {
        if (state.heroSpecial < 100) return null;
        state.heroSpecial = 0;
        return heroChar.special.fn(hero, villain);
      },
    },
    {
      id:'combo_plus', name:'Combo+', icon:'🌀', desc:'3 coups + stun', reqLv:2, cls:'unlocked-atk', cooldown:3,
      fn:(hero, villain) => {
        const hits=[calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.7)];
        const total=hits.reduce((a,b)=>a+b,0);
        return { dmg:total, spBonus:25, log:'🌀 Combo+ — '+hits.join('+')+' = '+total+' dégâts !' };
      },
    },
    {
      id:'piercing', name:'Perforant', icon:'🗡️', desc:'Ignore 50% DEF', reqLv:3, cls:'unlocked-atk', cooldown:3,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def*0.5,1.2);
        return { dmg, spBonus:20, log:'🗡️ Frappe Perforante — '+dmg+' dégâts (DEF ignorée) !' };
      },
    },
    {
      id:'counter', name:'Contre', icon:'↩️', desc:'Parade + riposte', reqLv:4, cls:'unlocked-atk', cooldown:4,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def,1.5);
        return { dmg, defend:true, spBonus:30, log:'↩️ Contre-attaque — '+dmg+' dégâts + garde activée !' };
      },
    },
    {
      id:'ultimate', name:'DÉVASTA.', icon:'💥', desc:'Dégâts massifs', reqLv:5, cls:'unlocked-atk', cooldown:5,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def,2.8);
        return { dmg, spBonus:0, log:'💥 DÉVASTATION — '+dmg+' dégâts cataclysmiques !' };
      },
    },
  ];

  // Attaques de l'arbre de compétences (actives débloquées)
  const treeActives = [
    {
      id:'sk_atk3', name:'Tornade', icon:'🍜', desc:'6 frappes / ignore DEF', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:4,
      fn:(hero, villain) => {
        const rd = villain.def * 0.6;
        const hits=[0.6,0.6,0.65,0.65,0.7,0.8].map(m=>calcDmg(hero.atk,rd,m));
        const total=hits.reduce((a,b)=>a+b,0);
        state.heroSpecial=Math.min(100,state.heroSpecial+40);
        return { dmg:total, spBonus:0, log:'🍜 TORNADE DE NOUILLES — '+hits.length+' coups, '+total+' dégâts ! (+40% spéciale)' };
      },
    },
    {
      id:'sk_def3', name:'Forteresse', icon:'🥖', desc:'Bouclier 3t + riposte', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:5,
      fn:(hero, villain) => {
        state.fortressActive=true; state.fortressTurns=3; state.fortressCounter=true;
        const dmg=calcDmg(hero.atk,villain.def,0.7);
        state.villainHp-=dmg;
        return { defend:true, spBonus:20, dmgDirect:dmg, log:'🥖 FORTERESSE DE BAGUETTE — '+dmg+' dmg + bouclier 85% (3 tours) + riposte auto.' };
      },
    },
    {
      id:'sk_spd3', name:'Coup du Chef', icon:'👨‍🍳', desc:'x2.5 ATK, vol 35% HP', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:4,
      fn:(hero, villain) => {
        const dmg=Math.floor(calcDmg(hero.atk,villain.def*0.2,2.5+getPassiveCritBonus()));
        const stolen=Math.floor(dmg*0.35);
        state.heroHp=Math.min(state.heroMaxHp,state.heroHp+stolen);
        state.heroSpecial=Math.min(100,state.heroSpecial+35);
        return { dmg, spBonus:0, heal:stolen, log:'👨‍🍳 COUP DU CHEF — '+dmg+' dégâts (DEF ignorée) + '+stolen+' HP volés + spéciale chargée !', crit:true };
      },
    },
  ];

  const baseList = allAttacks.filter(a => player.unlockedAttacks.includes(a.id));
  const treeList = treeActives.filter(a => isSkillUnlocked(a.id));
  return [...baseList, ...treeList];
}

// ─── Toutes les définitions d'attaques (sans filtre joueur) ──────────────────
// Utilisé en PvP pour construire la liste d'attaques depuis le loadout Firestore
export function getAllAttackDefs(heroChar) {
  const allAttacks = [
    {
      id:'punch', name:'Punch', icon:'👊', desc:'Coup direct', reqLv:1, cls:'', cooldown:0,
      fn:(hero, villain) => {
        if (Math.random() < Math.max(0.01, 0.08 - getPassiveMissReduction())) return { miss:true };
        const crit    = isCrit();
        const critMult = crit ? 1.8 + getPassiveCritBonus() : 1;
        const dmg     = crit
          ? Math.floor(calcDmg(hero.atk, villain.def) * critMult)
          : calcDmg(hero.atk, villain.def);
        return { dmg, crit, spBonus:15, log:(crit?'💥 CRITIQUE ! ':'👊 ')+hero.name+' frappe pour '+dmg+' dégâts !' };
      },
    },
    {
      id:'combo', name:'Combo', icon:'🔥', desc:'2 coups rapides', reqLv:1, cls:'', cooldown:2,
      fn:(hero, villain) => {
        const d1=calcDmg(hero.atk,villain.def,0.65), d2=calcDmg(hero.atk,villain.def,0.65);
        return { dmg:d1+d2, spBonus:20, log:'🔥 Combo — '+(d1+d2)+' dégâts !' };
      },
    },
    {
      id:'defend', name:'Garde', icon:'🛡️', desc:'Réduit les dégâts', reqLv:1, cls:'', cooldown:0,
      fn:(hero) => ({ defend:true, spBonus:8, log:'🛡️ '+hero.name+' se met en garde…' }),
    },
    {
      id:'special', name:'SPÉCIAL', icon:'⚡', desc:'Charge 0%', reqLv:1, cls:'special', cooldown:0,
      fn:(hero, villain) => {
        if (state.heroSpecial < 100) return null;
        state.heroSpecial = 0;
        return heroChar.special.fn(hero, villain);
      },
    },
    {
      id:'combo_plus', name:'Combo+', icon:'🌀', desc:'3 coups + stun', reqLv:2, cls:'unlocked-atk', cooldown:3,
      fn:(hero, villain) => {
        const hits=[calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.7)];
        const total=hits.reduce((a,b)=>a+b,0);
        return { dmg:total, spBonus:25, log:'🌀 Combo+ — '+hits.join('+')+' = '+total+' dégâts !' };
      },
    },
    {
      id:'piercing', name:'Perforant', icon:'🗡️', desc:'Ignore 50% DEF', reqLv:3, cls:'unlocked-atk', cooldown:3,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def*0.5,1.2);
        return { dmg, spBonus:20, log:'🗡️ Frappe Perforante — '+dmg+' dégâts (DEF ignorée) !' };
      },
    },
    {
      id:'counter', name:'Contre', icon:'↩️', desc:'Parade + riposte', reqLv:4, cls:'unlocked-atk', cooldown:4,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def,1.5);
        return { dmg, defend:true, spBonus:30, log:'↩️ Contre-attaque — '+dmg+' dégâts + garde activée !' };
      },
    },
    {
      id:'ultimate', name:'DÉVASTA.', icon:'💥', desc:'Dégâts massifs', reqLv:5, cls:'unlocked-atk', cooldown:5,
      fn:(hero, villain) => {
        const dmg=calcDmg(hero.atk,villain.def,2.8);
        return { dmg, spBonus:0, log:'💥 DÉVASTATION — '+dmg+' dégâts cataclysmiques !' };
      },
    },
    {
      id:'sk_atk3', name:'Tornade', icon:'🍜', desc:'6 frappes / ignore DEF', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:4,
      fn:(hero, villain) => {
        const rd = villain.def * 0.6;
        const hits=[0.6,0.6,0.65,0.65,0.7,0.8].map(m=>calcDmg(hero.atk,rd,m));
        const total=hits.reduce((a,b)=>a+b,0);
        state.heroSpecial=Math.min(100,state.heroSpecial+40);
        return { dmg:total, spBonus:0, log:'🍜 TORNADE DE NOUILLES — '+hits.length+' coups, '+total+' dégâts ! (+40% spéciale)' };
      },
    },
    {
      id:'sk_def3', name:'Forteresse', icon:'🥖', desc:'Bouclier 3t + riposte', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:5,
      fn:(hero, villain) => {
        state.fortressActive=true; state.fortressTurns=3; state.fortressCounter=true;
        const dmg=calcDmg(hero.atk,villain.def,0.7);
        state.villainHp-=dmg;
        return { defend:true, spBonus:20, dmgDirect:dmg, log:'🥖 FORTERESSE DE BAGUETTE — '+dmg+' dmg + bouclier 85% (3 tours) + riposte auto.' };
      },
    },
    {
      id:'sk_spd3', name:'Coup du Chef', icon:'👨‍🍳', desc:'x2.5 ATK, vol 35% HP', reqLv:1, cls:'unlocked-atk tree-skill', cooldown:4,
      fn:(hero, villain) => {
        const dmg=Math.floor(calcDmg(hero.atk,villain.def*0.2,2.5+getPassiveCritBonus()));
        const stolen=Math.floor(dmg*0.35);
        state.heroHp=Math.min(state.heroMaxHp,state.heroHp+stolen);
        state.heroSpecial=Math.min(100,state.heroSpecial+35);
        return { dmg, spBonus:0, heal:stolen, log:'👨‍🍳 COUP DU CHEF — '+dmg+' dégâts (DEF ignorée) + '+stolen+' HP volés + spéciale chargée !', crit:true };
      },
    },
  ];
  return allAttacks;
}

// ─── Loadout ─────────────────────────────────────────────────────────────────
export const MAX_LOADOUT = 4;

export function getAllAvailableAttacks() {
  const base = [
    { id:'punch',     name:'Punch',       icon:'👊', desc:'Coup direct, peut critiquer',          reqLv:1, cooldown:0 },
    { id:'combo',     name:'Combo',       icon:'🔥', desc:'2 coups rapides',                      reqLv:1, cooldown:2 },
    { id:'defend',    name:'Garde',       icon:'🛡️', desc:'Réduit les dégâts reçus',             reqLv:1, cooldown:0 },
    { id:'combo_plus',name:'Combo+',      icon:'🌀', desc:'3 coups + étourdissement',             reqLv:2, cooldown:3 },
    { id:'piercing',  name:'Perforant',   icon:'🗡️', desc:'Ignore 50% de la DEF ennemie',        reqLv:3, cooldown:3 },
    { id:'counter',   name:'Contre',      icon:'↩️', desc:'Parade + riposte puissante',          reqLv:4, cooldown:4 },
    { id:'ultimate',  name:'DÉVASTA.',    icon:'💥', desc:'Dégâts cataclysmiques x2.8',          reqLv:5, cooldown:5 },
  ];
  const tree = [
    { id:'sk_atk3', name:'Tornade',      icon:'🍜', desc:'6 frappes / ignore DEF / +spéciale', reqLv:1, treeSkill:true, cooldown:4 },
    { id:'sk_def3', name:'Forteresse',   icon:'🥖', desc:'Bouclier 3 tours + riposte auto',    reqLv:1, treeSkill:true, cooldown:5 },
    { id:'sk_spd3', name:'Coup du Chef', icon:'👨‍🍳',desc:'x2.5 ATK · vol HP · DEF ignorée',   reqLv:1, treeSkill:true, cooldown:4 },
  ];
  return [
    ...base.filter(a => player.unlockedAttacks.includes(a.id)),
    ...tree.filter(a => isSkillUnlocked(a.id)),
  ];
}

export function getLoadout() {
  if (!player.equippedLoadout) player.equippedLoadout = ['punch','combo','defend','special'];
  const avail = [...getAllAvailableAttacks().map(a => a.id), 'special'];
  player.equippedLoadout = player.equippedLoadout.filter(id => avail.includes(id));
  const noSpecial = player.equippedLoadout.filter(id => id !== 'special');
  if (noSpecial.length > MAX_LOADOUT) player.equippedLoadout = noSpecial.slice(0, MAX_LOADOUT);
  return player.equippedLoadout;
}

export function toggleLoadout(id, onError) {
  if (!player.equippedLoadout) player.equippedLoadout = [];
  const idx = player.equippedLoadout.indexOf(id);
  if (idx >= 0) {
    player.equippedLoadout.splice(idx, 1);
  } else {
    if (player.equippedLoadout.length >= MAX_LOADOUT) {
      onError('⚠️ Tu as déjà 4 capacités ! Retire-en une d\'abord.');
      return false;
    }
    player.equippedLoadout.push(id);
  }
  savePlayer();
  return true;
}

// ─── Système de statuts ──────────────────────────────────────────────────────
export const STATUS_DEFS = {
  burn: {
    icon:'🔥', label:'Brûlure',
    applyLog:  '🔥 Brûlure infligée ! Tu perdras des HP chaque tour.',
    refreshLog:'🔥 Brûlure ravivée !',
    expireLog: '🔥 La Brûlure s\'éteint.',
    narratorMsg:'Les flammes te consumment lentement…',
    onTick:(s, addLog, spawnDmg) => {
      const dmg=Math.max(3,Math.floor(state.heroMaxHp*0.06));
      state.heroHp=Math.max(1,state.heroHp-dmg);
      spawnDmg('heroSprite',dmg,'dmg');
      addLog(`🔥 Brûlure — ${dmg} dégâts de feu !`,'crit-line');
    },
  },
  poison: {
    icon:'☠️', label:'Poison',
    applyLog:  '☠️ Empoisonné ! Les dégâts augmentent chaque tour.',
    refreshLog:'☠️ Le poison s\'intensifie !',
    expireLog: '☠️ Le poison se dissipe.',
    narratorMsg:'Le venin se répand dans tes veines…',
    onTick:(s, addLog, spawnDmg) => {
      const dmg=Math.max(2,Math.floor(state.heroMaxHp*0.03*s.stacks));
      state.heroHp=Math.max(1,state.heroHp-dmg);
      spawnDmg('heroSprite',dmg,'dmg');
      addLog(`☠️ Poison (x${s.stacks}) — ${dmg} dégâts !`,'villain-action');
      if(s.stacks<5) s.stacks++;
    },
  },
  slow: {
    icon:'🧊', label:'Ralentissement',
    applyLog:  '🧊 Ralenti ! L\'ennemi agit en premier pendant quelques tours.',
    refreshLog:'🧊 Ralentissement prolongé !',
    expireLog: '🧊 Tu retrouves ta vitesse normale.',
    narratorMsg:'Tes mouvements se figent comme de la glace…',
    onTick: null,
  },
};

function initStatuses() { if (!state.heroStatuses) state.heroStatuses = []; }

export function applyStatus(type, turns, stacks, addLog, showNarrator) {
  initStatuses();
  const existing = state.heroStatuses.find(s => s.type === type);
  if (existing) {
    existing.turnsLeft = Math.max(existing.turnsLeft, turns);
    if (type === 'poison') existing.stacks = Math.min(existing.stacks + stacks, 5);
    addLog(STATUS_DEFS[type].refreshLog, 'villain-action');
  } else {
    state.heroStatuses.push({ type, turnsLeft: turns, stacks });
    addLog(STATUS_DEFS[type].applyLog, 'crit-line');
    showNarrator(STATUS_DEFS[type].narratorMsg, 2500);
  }
}

export function cureStatus(type) {
  initStatuses();
  const idx = state.heroStatuses.findIndex(s => s.type === type);
  if (idx >= 0) { state.heroStatuses.splice(idx, 1); return true; }
  return false;
}

export function cureAllStatuses() { initStatuses(); state.heroStatuses = []; }
export function isSlowed()        { initStatuses(); return state.heroStatuses.some(s => s.type === 'slow'); }

export function tickStatuses(addLog, spawnDmg) {
  initStatuses();
  const toRemove = [];
  for (const s of state.heroStatuses) {
    const def = STATUS_DEFS[s.type];
    if (def && def.onTick) def.onTick(s, addLog, spawnDmg);
    s.turnsLeft--;
    if (s.turnsLeft <= 0) toRemove.push(s.type);
  }
  toRemove.forEach(t => { cureStatus(t); addLog(STATUS_DEFS[t].expireLog, 'system'); });
}

export function maybeInflictStatus(villain, addLog, showNarrator) {
  const diffBonus = currentDifficulty==='infernal' ? 0.18 : currentDifficulty==='epicee' ? 0.09 : 0;
  const baseChance = villain.isBoss ? 0.28+diffBonus : 0.14+diffBonus;
  if (Math.random() > baseChance) return;
  const id = villain.id;
  let pool;
  if (/piment|cannelle|tomate|banane|volcan/.test(id))         pool=['burn','burn','poison'];
  else if (/glace|sorbet|esquimau|yeti/.test(id))              pool=['slow','slow','burn'];
  else if (/algue|vinaigre|ferment|anchois|cornichon/.test(id))pool=['poison','poison','slow'];
  else                                                          pool=['burn','poison','slow'];
  const chosen = pool[Math.floor(Math.random()*pool.length)];
  applyStatus(chosen, villain.isBoss ? 3 : 2, 1, addLog, showNarrator);
}

// ─── Calcul des récompenses ──────────────────────────────────────────────────
export function calcBattleRewards(won, villain) {
  const d = DIFFICULTIES[currentDifficulty] || DIFFICULTIES.normal;
  const baseXp   = won ? (villain.isBoss ? 200 : 80) : 20;
  const baseGold = won ? (villain.isBoss ? 60  : 20) : 5;
  const earnedXp   = Math.floor((baseXp   + state.turn*(won?8:3) + Math.random()*40) * (won ? d.xpMult     : 1.0));
  const earnedGold = Math.floor((baseGold + Math.random()*(won?30:8))                * (won ? d.rewardMult : 1.0));
  return { earnedXp, earnedGold };
}

export function getDiffBadgeHtml() {
  const d = DIFFICULTIES[currentDifficulty];
  return `<span class="diff-badge-battle ${currentDifficulty}">${d.icon} ${d.label}</span>`;
}
