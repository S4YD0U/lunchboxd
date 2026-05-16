// ============================================================
// ui/battle-ui.js — Rendu de l'interface de combat
// ============================================================
import { state, STATUS_DEFS, getLoadout, getAllAvailableAttacks, MAX_LOADOUT } from '../engine/battle.js';
import { player } from '../engine/player.js';
import { SHOP_CATALOG } from '../data/catalog.js';
import { $, spawnDmg } from './dom.js';

// ─── Barre de vie / spéciale ────────────────────────────────────────────────
export function updateBattleUI() {
  const pct = (v, m) => Math.max(0, v / m * 100) + '%';
  const cls = (v, m) => {
    const r = v / m;
    return 'hp-fill' + (r < 0.2 ? ' critical' : r < 0.4 ? ' low' : '');
  };

  // HP héros
  $('heroHpFill').style.width  = pct(state.heroHp, state.heroMaxHp);
  $('heroHpFill').className    = cls(state.heroHp, state.heroMaxHp);
  $('heroHpVal').textContent   = Math.max(0, state.heroHp) + '/' + state.heroMaxHp;

  // HP vilain
  $('villainHpFill').style.width  = pct(state.villainHp, state.villainMaxHp);
  $('villainHpFill').className    = cls(state.villainHp, state.villainMaxHp);
  $('villainHpVal').textContent   = Math.max(0, state.villainHp) + '/' + state.villainMaxHp;

  // Barres spéciales
  $('heroSpecialFill').style.width     = state.heroSpecial + '%';
  $('heroSpecialLabel').textContent    = 'SPÉCIAL ' + state.heroSpecial + '%';
  $('villainSpecialFill').style.width  = state.villainSpecial + '%';
  $('villainSpecialLabel').textContent = 'SPÉCIAL ' + state.villainSpecial + '%';

  // Classe "ready" sur la barre spéciale héros
  const sf = $('heroSpecialFill');
  if (sf) sf.classList.toggle('ready', state.heroSpecial >= 100);
  const vsf = $('villainSpecialFill');
  if (vsf) vsf.classList.toggle('ready', state.villainSpecial >= 100);

  // Bouton spécial
  const sb   = $('btn-special');
  const desc = $('desc-special');
  if (sb) {
    sb.disabled = state.heroSpecial < 100 || !state.playerTurn;
    if (state.heroSpecial >= 100) {
      sb.classList.add('special-ready');
      if (desc) desc.textContent = 'PRÊT !';
    } else {
      sb.classList.remove('special-ready');
      if (desc) desc.textContent = 'Charge ' + state.heroSpecial + '%';
    }
  }

  $('turnLabel').textContent = 'Tour ' + state.turn;
  renderStatusBadges();
}

// ─── Badges de statuts ───────────────────────────────────────────────────────
export function renderStatusBadges() {
  const el = $('heroStatus');
  if (!el) return;
  let html = '';
  if (state.atkBuffTurns > 0)
    html += `<span class="status-icon" style="background:rgba(245,166,35,0.15);color:var(--accent2);border:1px solid rgba(245,166,35,0.3);">⚡ ATK+ (${state.atkBuffTurns}t)</span>`;
  if (state.fortressActive)
    html += `<span class="status-icon" style="background:rgba(96,165,250,0.15);color:var(--xp-blue);border:1px solid rgba(96,165,250,0.3);">🥖 FORTERESSE (${state.fortressTurns}t)</span>`;
  for (const s of (state.heroStatuses || [])) {
    const def       = STATUS_DEFS[s.type];
    if (!def) continue;
    const stackStr  = s.type === 'poison' ? ` x${s.stacks}` : '';
    html += `<span class="status-icon status-${s.type}">${def.icon} ${def.label}${stackStr} (${s.turnsLeft}t)</span>`;
  }
  el.innerHTML = html;
}

// ─── Label de tour ───────────────────────────────────────────────────────────
export function setPlayerTurnLabel(val) {
  const tl = $('turnLabel');
  if (!tl) return;
  if (val) {
    tl.textContent   = 'Tour ' + state.turn + ' — Ton tour';
    tl.style.color   = 'var(--accent)';
  } else {
    tl.textContent   = 'Tour ' + state.turn + ' — Ennemi';
    tl.style.color   = 'var(--accent3)';
  }
}

// ─── Rangée d'actions ────────────────────────────────────────────────────────
/**
 * Reconstruit les boutons d'attaque.
 * @param {Function} onAction     appelée avec l'id de l'attaque choisie
 * @param {Function} onAutoPass   appelée si toutes les attaques sont en CD
 */
export function buildActionRow(heroChar, onAction, onAutoPass) {
  if (!heroChar) return;

  const attacks       = getAllAvailableAttacks(); // descriptions UI seulement
  const loadout       = getLoadout();
  const specialEntry  = { id:'special', name:'SPÉCIAL', icon:'⚡', desc:'Charge ' + state.heroSpecial + '%', cls:'special', cooldown:0 };

  // Liste des attaques à afficher
  const chosenIds     = [...loadout];
  if (!chosenIds.includes('special')) chosenIds.push('special');
  const chosen        = chosenIds.map(id => {
    if (id === 'special') return specialEntry;
    return attacks.find(a => a.id === id) || null;
  }).filter(Boolean);

  const row           = $('actionRow');
  row.innerHTML       = '';

  // Check si tout est en cooldown
  const nonSpecial    = chosen.filter(a => a.id !== 'special');
  const allOnCd       = nonSpecial.length > 0 && nonSpecial.every(a => (state.cooldowns[a.id] || 0) > 0);
  const specialReady  = state.heroSpecial >= 100;

  if (allOnCd && !specialReady && state.battleRunning && state.playerTurn) {
    const panel         = document.createElement('div');
    panel.style.cssText = 'width:100%;padding:0.8rem 1rem;background:rgba(232,69,69,0.06);border:1px solid rgba(232,69,69,0.25);border-radius:6px;font-family:"DM Mono",monospace;font-size:0.7rem;color:var(--muted);text-align:center;letter-spacing:0.06em;';
    panel.textContent   = '⏳ Toutes les capacités en recharge — tour automatique…';
    row.appendChild(panel);
    setTimeout(() => onAutoPass(), 1200);
    buildItemRow(onAction);
    return;
  }

  chosen.forEach(atk => {
    const btn  = document.createElement('button');
    const cd   = (state.cooldowns && state.cooldowns[atk.id]) || 0;
    const onCd = cd > 0;
    btn.className = 'action-btn ' + (atk.cls || '') + (onCd ? ' on-cooldown' : '');
    btn.id        = 'btn-' + atk.id;

    if (atk.id === 'special') btn.disabled = state.heroSpecial < 100;
    if (onCd)                 btn.disabled = true;

    // Overlay numérique de cooldown — ★ AMÉLIORATION : affiche les tours restants
    const cdOverlay = onCd ? `<span class="cd-overlay">${cd}</span>` : '';
    btn.innerHTML =
      `${cdOverlay}` +
      `<span class="action-icon">${atk.icon}</span>` +
      `<span class="action-name">${atk.name}</span>` +
      `<span class="action-desc" id="desc-${atk.id}">${onCd ? '⏳ ' + cd + ' tour' + (cd > 1 ? 's' : '') : atk.desc}</span>`;
    btn.onclick = () => onAction(atk.id);
    row.appendChild(btn);
  });

  buildItemRow(onAction);
}

// ─── Rangée d'items ──────────────────────────────────────────────────────────
export function buildItemRow(onUseItem) {
  const row = $('itemRow');
  if (!row) return;
  row.innerHTML = '';
  if (!player.inventory.length) return;

  player.inventory.forEach(inv => {
    const cat = SHOP_CATALOG.consumables.find(c => c.id === inv.id);
    if (!cat) return;
    const btn   = document.createElement('button');
    btn.className = 'action-btn item-btn';
    btn.id        = 'item-btn-' + inv.id;
    btn.innerHTML =
      `<span class="action-icon">${cat.icon}</span>` +
      `<span class="action-name">${cat.name}</span>` +
      `<span class="action-desc">×${inv.qty} — ${cat.stat}</span>`;
    btn.onclick = () => onUseItem('item:' + inv.id);
    row.appendChild(btn);
  });
}

// ─── Initialisation de l'écran de combat ────────────────────────────────────
export function setupBattleScreen(heroChar, villainChar, selectedRegion, regions) {
  $('heroHpName').textContent     = heroChar.name;
  $('villainHpName').textContent  = villainChar.name;
  $('heroNameBadge').textContent  = heroChar.name.toUpperCase();
  $('villainNameBadge').textContent = villainChar.name.toUpperCase();
  $('heroLvlBadge').textContent   = 'LV.' + player.level;
  $('villainLvlBadge').textContent = villainChar.isBoss ? 'LV.MAX' : 'LV.' + (state.currentEnemyIndex * 5 + 5);

  const BASE = '../sprite/';
  $('heroSprite').innerHTML   = `<img src="${BASE}${heroChar.sprite}.png" alt="${heroChar.name}" />`;
  $('villainSprite').innerHTML = `<img src="${BASE}${villainChar.sprite}.png" alt="${villainChar.name}" />`;

  // Fond d'arène selon la région
  const arenaEl = document.querySelector('.arena');
  if (arenaEl) {
    arenaEl.className = 'arena';
    const region = regions.find(r => r.enemies && r.enemies.includes(villainChar.id));
    if (region) arenaEl.classList.add('region-' + region.id);
  }

  // Mode boss
  const arenaEl2 = $('battleArena');
  if (arenaEl2) arenaEl2.classList.toggle('boss-fight', !!villainChar.isBoss);
}

// ─── Écran de victoire / défaite ─────────────────────────────────────────────
export function setupVictoryScreen({ won, isLastEnemy, villain, hero, earnedXp, earnedGold, enemies, currentEnemyIndex, onRematch, onBack }) {
  $('hpCarryBanner').classList.toggle('hidden', isLastEnemy || !won);
  if (!isLastEnemy && won) {
    $('hpCarryVal').textContent = `${state.heroHp}/${state.heroMaxHp} HP`;
  }

  $('victoryIcon').textContent    = won ? (isLastEnemy ? '🏆' : '⚔') : '💀';
  const titleEl = $('victoryTitle');
  if (won && !isLastEnemy) {
    titleEl.textContent = villain.name + ' vaincu !';
    titleEl.className   = 'victory-title intermediate';
  } else if (won) {
    titleEl.textContent = 'Champion de la Cantine !';
    titleEl.className   = 'victory-title win';
  } else {
    titleEl.textContent = 'Défaite…';
    titleEl.className   = 'victory-title lose';
  }

  if (won && !isLastEnemy) {
    const nextEnemy = enemies[currentEnemyIndex];
    $('victorySub').textContent = `Bien joué ! Le prochain adversaire t'attend : ${nextEnemy.name}.`;
  } else if (won) {
    $('victorySub').textContent = `Incroyable ! ${enemies.length} combats, ${villain.name} vaincu en ${state.turn} tours !`;
  } else {
    $('victorySub').textContent = `${villain.name} t'a eu… La progression de la région est remise à zéro.`;
  }

  $('xpGained').textContent    = (won ? '+' : '') + earnedXp;
  $('goldGained').textContent  = (won ? '+' : '') + earnedGold;
  $('turnsUsed').textContent   = state.turn;

  const q = Math.random() < 0.5
    ? hero.narratorLines.win[Math.floor(Math.random() * hero.narratorLines.win.length)]
    : hero.narratorLines.lose[Math.floor(Math.random() * hero.narratorLines.lose.length)];
  $('victoryQuote').innerHTML = `"${q}"<cite>— Narrateur</cite>`;

  const btnR = $('btnRematch');
  btnR.textContent = onRematch.label;
  btnR.className   = 'btn-rematch ' + (onRematch.cls || '');
  btnR.onclick     = onRematch.fn;

  const btnB = $('btnBackSelect');
  btnB.textContent = onBack.label;
  btnB.onclick     = onBack.fn;
}
