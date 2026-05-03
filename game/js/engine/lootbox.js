// ============================================================
// engine/lootbox.js — Ouverture de lootboxes avec système de pity
// ============================================================
import { LOOTBOX_TIERS, DUPLICATE_GOLD, SHOP_CATALOG } from '../data/catalog.js';
import { player, savePlayer } from './player.js';

const PITY_STORAGE_KEY = 'lunchboxe_pity';

// ─── Pity counters ────────────────────────────────────────────────────────────
// Pour chaque tier de boîte, on mémorise combien d'ouvertures sans légendaire.
export function loadPity() {
  try { return JSON.parse(localStorage.getItem(PITY_STORAGE_KEY)) || {}; } catch { return {}; }
}

function savePity(pity) {
  localStorage.setItem(PITY_STORAGE_KEY, JSON.stringify(pity));
}

const PITY_THRESHOLDS = {
  lb_common: { rare: 10, epic: null, legendary: null },
  lb_rare:   { rare: null, epic: 15, legendary: null },
  lb_epic:   { rare: null, epic: null, legendary: 10 },
  lb_mythic:  { rare: null, epic: null, legendary: 5  },
};

/**
 * Retourne l'entrée garantie par le pity si applicable, null sinon.
 */
function getPityGuarantee(lootboxId, pity) {
  const thresholds = PITY_THRESHOLDS[lootboxId];
  if (!thresholds) return null;
  const counts = pity[lootboxId] || {};
  if (thresholds.legendary && (counts.legendary || 0) >= thresholds.legendary) return 'legendary';
  if (thresholds.epic      && (counts.epic      || 0) >= thresholds.epic)      return 'epic';
  if (thresholds.rare      && (counts.rare      || 0) >= thresholds.rare)      return 'rare';
  return null;
}

function incrementPity(lootboxId, pity, rarity) {
  if (!pity[lootboxId]) pity[lootboxId] = {};
  // Réinitialiser le compteur si on a obtenu la rareté visée
  const thresholds = PITY_THRESHOLDS[lootboxId];
  if (!thresholds) return;
  // Incrémente les compteurs pour les raretés supérieures à celle obtenue
  const order = ['common','rare','epic','legendary'];
  const obtained = order.indexOf(rarity);
  if (thresholds.rare      && obtained <= order.indexOf('rare'))      pity[lootboxId].rare      = 0;
  else if (thresholds.rare)                                           pity[lootboxId].rare      = (pity[lootboxId].rare      || 0) + 1;
  if (thresholds.epic      && obtained <= order.indexOf('epic'))      pity[lootboxId].epic      = 0;
  else if (thresholds.epic)                                           pity[lootboxId].epic      = (pity[lootboxId].epic      || 0) + 1;
  if (thresholds.legendary && obtained <= order.indexOf('legendary')) pity[lootboxId].legendary = 0;
  else if (thresholds.legendary)                                      pity[lootboxId].legendary = (pity[lootboxId].legendary || 0) + 1;
}

// ─── Résolution d'un item de la loot table ────────────────────────────────────
function resolveItem(entry) {
  switch (entry.type) {
    case 'gold': return { type:'gold', amount:entry.amount, rarity:entry.rarity,
                          label:'🪙 '+entry.amount+' pièces d\'or', icon:'🪙' };
    case 'xp':   return { type:'xp',   amount:entry.amount, rarity:entry.rarity,
                          label:'⭐ '+entry.amount+' XP',          icon:'⭐' };
    case 'sp':   return { type:'sp',   amount:entry.amount, rarity:entry.rarity,
                          label:'✨ '+entry.amount+' point(s) de compétence', icon:'✨' };
    default: {
      // weapon / armor / consumable
      const catalog = SHOP_CATALOG[entry.type + 's'] || SHOP_CATALOG.consumables;
      const item = catalog.find(i => i.id === entry.id);
      if (!item) return null;
      const isDupe = player.owned.includes(item.id);
      return { ...entry, ...item, isDupe, rarity: entry.rarity };
    }
  }
}

// ─── Tirage d'un seul item en respectant le pity ─────────────────────────────
function rollOne(lb, forceRarity, pity) {
  let table = [...lb.lootTable];

  // Si un pity force une rareté minimale, filtrer la table
  if (forceRarity) {
    const order = ['common','rare','epic','legendary'];
    const minIdx = order.indexOf(forceRarity);
    const filtered = table.filter(e => order.indexOf(e.rarity) >= minIdx);
    if (filtered.length > 0) table = filtered;
  }

  const totalWeight = table.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * totalWeight;
  let selected = table[table.length - 1]; // fallback sécurisé
  for (const entry of table) {
    r -= entry.weight;
    if (r <= 0) { selected = entry; break; }
  }
  return selected;
}

// ─── Ouverture complète d'une boîte ─────────────────────────────────────────
/**
 * @returns {{ items: object[], rewards: {gold,xp,sp}, pitySummary: string[] }}
 */
export function openLootbox(lootboxId) {
  const lb = LOOTBOX_TIERS.find(l => l.id === lootboxId);
  if (!lb) return null;
  if (player.gold < lb.price) return { error: 'Pas assez de pièces !' };

  player.gold -= lb.price;
  const pity    = loadPity();
  const results = [];
  const rewards = { gold: 0, xp: 0, sp: 0 };
  const pitySummary = [];

  for (let i = 0; i < lb.dropCount; i++) {
    const guarantee  = i === 0 ? getPityGuarantee(lootboxId, pity) : null;
    if (guarantee) pitySummary.push(`Pity activé (${guarantee} garanti) !`);

    const raw     = rollOne(lb, guarantee, pity);
    const item    = resolveItem(raw);
    if (!item) continue;

    incrementPity(lootboxId, pity, raw.rarity);

    if (item.type === 'gold') {
      player.gold  += item.amount;
      rewards.gold += item.amount;
    } else if (item.type === 'xp') {
      rewards.xp   += item.amount;
    } else if (item.type === 'sp') {
      player.skillPoints += item.amount;
      rewards.sp   += item.amount;
    } else {
      // Objet physique
      if (item.isDupe) {
        const goldValue = DUPLICATE_GOLD[item.rarity] || 10;
        player.gold  += goldValue;
        rewards.gold += goldValue;
        item.duplicateGold = goldValue;
      } else {
        player.owned.push(item.id);
      }
    }
    results.push(item);
  }

  savePity(pity);
  savePlayer();
  return { items: results, rewards, pitySummary };
}

// ─── Infos de pity pour l'UI ──────────────────────────────────────────────────
export function getPityInfo(lootboxId) {
  const pity       = loadPity();
  const thresholds = PITY_THRESHOLDS[lootboxId];
  if (!thresholds) return [];
  const counts = pity[lootboxId] || {};
  const info   = [];
  if (thresholds.legendary != null) {
    const remaining = thresholds.legendary - (counts.legendary || 0);
    info.push({ label: 'Légendaire garanti dans', count: remaining, icon: '🌟' });
  }
  if (thresholds.epic != null) {
    const remaining = thresholds.epic - (counts.epic || 0);
    info.push({ label: 'Épique garanti dans', count: remaining, icon: '💜' });
  }
  if (thresholds.rare != null) {
    const remaining = thresholds.rare - (counts.rare || 0);
    info.push({ label: 'Rare garanti dans', count: remaining, icon: '💙' });
  }
  return info;
}
