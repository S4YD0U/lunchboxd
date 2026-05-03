// ============================================================
// main.js — Point d'entrée : orchestre tous les modules
// ============================================================
import { HEROES, ALL_ENEMIES, REGIONS, DIALOGUES } from './data/characters.js';
import { SHOP_CATALOG, SKILL_BRANCHES, LOOTBOX_TIERS, DIFFICULTIES, LEVEL_UNLOCKS } from './data/catalog.js';
import {
  player, selectedHero, setSelectedHero,
  loadCharSave, savePlayer, switchCharSave,
  addXpGold, getLevelStats, getXpForLevel, getXpProgress,
  getResetCost, doResetSkills, getSellPrice,
  loadRegionProgress, saveRegionProgress,
  isRegionUnlocked, getRegionEnemiesBeaten, markEnemyBeaten,
  getActiveTreeSkills, getPassiveRegenPerTurn, getSkillLevel, buySkill,
} from './engine/player.js';
import {
  state, currentDifficulty, setDifficulty,
  ENEMIES, setEnemiesFromRegion, applyDifficultyToEnemies,
  getAttacks, getLoadout, getAllAvailableAttacks, toggleLoadout, MAX_LOADOUT,
  calcDmg, isCrit, isMiss, getEffectiveAtk,
  STATUS_DEFS, applyStatus, cureStatus, cureAllStatuses, isSlowed,
  tickStatuses, maybeInflictStatus,
  calcBattleRewards, getDiffBadgeHtml,
} from './engine/battle.js';
import { openLootbox, getPityInfo } from './engine/lootbox.js';
import {
  $, pick, showScreen, switchTab,
  showToast, addLog, clearLog, anim, spawnDmg,
  showNarrator, showPhaseBanner, showLevelUpOverlay,
  spawnArenaParticles, updateStageIndicators, updateMapProgressLabel,
  openDialogue, advanceDlg, skipDialogue,
  updateProfileUI,
} from './ui/dom.js';
import {
  updateBattleUI, renderStatusBadges, setPlayerTurnLabel,
  buildActionRow, buildItemRow, setupBattleScreen, setupVictoryScreen,
} from './ui/battle-ui.js';

// ─── État global UI ──────────────────────────────────────────────────────────
let selectedRegion   = null;
let pendingDiffRegion = null;

// ─── Initialisation ──────────────────────────────────────────────────────────
(function init() {
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  renderHeroGrid();
  renderWorldMap();
  showScreen('map');
})();

// ─── Sélection de héros ──────────────────────────────────────────────────────
function buildCharCard(char, onclickFn, isSelected) {
  const save  = loadCharSave(char.id);
  const prev  = save.level > 1 ? (getXpForLevel(save.level - 1) || 0) : 0;
  const next  = getXpForLevel(save.level) || 1;
  const xpPct = Math.max(0, Math.min(100, ((save.xp - prev) / (next - prev)) * 100));
  const progressBadge =
    '<div style="margin-top:0.8rem;border-top:1px solid var(--border);padding-top:0.7rem;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">' +
    '<span style="font-family:monospace;font-size:0.6rem;color:var(--muted)">LV.' + save.level + '</span>' +
    '<span style="font-family:monospace;font-size:0.6rem;color:var(--gold)">🪙 ' + save.gold + '</span>' +
    '<span style="font-family:monospace;font-size:0.6rem;color:var(--purple)">✨ ' + save.skillPoints + ' pts</span>' +
    '</div>' +
    '<div style="height:4px;background:var(--surface2);border-radius:2px;overflow:hidden;">' +
    '<div style="width:' + xpPct + '%;height:100%;background:linear-gradient(90deg,var(--xp-blue),#93c5fd);border-radius:2px"></div>' +
    '</div></div>';

  const card = document.createElement('div');
  card.className = 'char-card' + (isSelected ? ' selected' : '');
  card.onclick = onclickFn;
  card.innerHTML =
    '<span class="char-type-badge badge-hero">⚔ HÉROS</span>' +
    '<div class="char-sprite"><img src="../sprite/' + char.sprite + '.png" alt="' + char.name + '" /></div>' +
    '<div class="char-name">' + char.name + '</div>' +
    '<div class="char-class">' + char.class + '</div>' +
    '<div class="char-stats">' +
    '<div class="stat-bar-row"><span class="stat-bar-label">ATK</span><div class="stat-bar-track"><div class="stat-bar-fill fill-atk" style="width:' + char.atk + '%"></div></div></div>' +
    '<div class="stat-bar-row"><span class="stat-bar-label">DEF</span><div class="stat-bar-track"><div class="stat-bar-fill fill-def" style="width:' + char.def + '%"></div></div></div>' +
    '<div class="stat-bar-row"><span class="stat-bar-label">VIT</span><div class="stat-bar-track"><div class="stat-bar-fill fill-spd" style="width:' + char.spd + '%"></div></div></div>' +
    '<div class="stat-bar-row"><span class="stat-bar-label">HP</span><div class="stat-bar-track"><div class="stat-bar-fill fill-hp" style="width:' + char.hp + '%"></div></div></div>' +
    '</div>' +
    '<div class="char-quote">' + char.quote + '</div>' +
    progressBadge;
  return card;
}

function renderHeroGrid() {
  const grid = $('heroGrid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.values(HEROES).forEach(hero => {
    grid.appendChild(buildCharCard(hero, () => selectHero(hero.id), selectedHero === hero.id));
  });
}

function selectHero(id) {
  setSelectedHero(id);
  switchCharSave(id);
  renderHeroGrid();
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  renderWorldMap();
  renderSkillTree();
}

// ─── Carte du monde ──────────────────────────────────────────────────────────
function renderWorldMap() {
  const wrap = $('worldMapSvgWrap');
  if (!wrap) return;
  const prog = loadRegionProgress();

  const regionCenters = {
    foret_epices:    { cx: 195, cy: 175 },
    desert_sel:      { cx: 455, cy: 145 },
    marais_vinaigre: { cx: 330, cy: 235 },
    pics_sorbet:     { cx: 195, cy: 345 },
    volcan_cantine:  { cx: 430, cy: 390 },
  };

  const completedCount = REGIONS.filter(r => prog[r.id] && prog[r.id].completed).length;
  const MAP_IMAGES = ['../maps/map1.png','../maps/map2.png','../maps/map3.png','../maps/map4.png','../maps/map5.png'];
  const bgIdx = Math.min(completedCount, MAP_IMAGES.length - 1);

  let svg = `<defs>
    <filter id="activeglow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="vign" cx="50%" cy="50%" r="70%"><stop offset="40%" stop-color="transparent"/><stop offset="100%" stop-color="rgba(0,0,0,0.35)"/></radialGradient>
  </defs>`;

  svg += `<image href="${MAP_IMAGES[bgIdx]}" x="0" y="0" width="700" height="434" preserveAspectRatio="none"/>`;

  REGIONS.forEach((region, idx) => {
    const unlocked  = isRegionUnlocked(idx, REGIONS);
    const completed = !!(prog[region.id] && prog[region.id].completed);
    const isActive  = selectedRegion === region.id;
    const { cx, cy } = regionCenters[region.id] || { cx: 350, cy: 217 };

    svg += `<g class="map-region-zone ${unlocked ? 'unlocked' : 'locked'}${isActive ? ' active-zone' : ''}">`;

    if (unlocked) {
      const ringColor  = completed ? '#c8f542' : (isActive ? (region.color || '#c8f542') : 'rgba(255,255,255,0.85)');
      const glowColor  = completed ? '#c8f542' : (isActive ? (region.color || '#c8f542') : 'rgba(255,255,255,0.5)');
      svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${glowColor}" stroke-width="1" opacity="${isActive ? '0.5' : '0.2'}"/>`;
      if (isActive)
        svg += `<circle cx="${cx}" cy="${cy}" r="26" fill="none" stroke="${ringColor}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.9" class="region-glow"/>`;
      svg += `<circle cx="${cx}" cy="${cy}" r="16" fill="${ringColor}" fill-opacity="${completed ? '0.25' : isActive ? '0.2' : '0.08'}" stroke="${ringColor}" stroke-width="${isActive ? '2' : '1.5'}" stroke-opacity="${completed ? '0.9' : isActive ? '0.95' : '0.55'}" style="cursor:pointer" onclick="window._selectRegion('${region.id}')"/>`;
      svg += `<path d="M ${cx-7},${cy-9} Q ${cx},${cy-14} ${cx+7},${cy-9}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round" pointer-events="none"/>`;
      svg += completed
        ? `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#c8f542" font-weight="900" opacity="0.95" pointer-events="none">✓</text>`
        : `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="white" opacity="${isActive ? '1' : '0.8'}" pointer-events="none">${region.icon}</text>`;
      svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="transparent" style="cursor:pointer" onclick="window._selectRegion('${region.id}')"/>`;
    } else {
      svg += `<circle cx="${cx}" cy="${cy}" r="16" fill="rgba(0,0,0,0.3)" stroke="rgba(180,180,180,0.2)" stroke-width="1.5"/>`;
      svg += `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" opacity="0.5">🔒</text>`;
    }
    svg += `</g>`;
  });

  svg += `<g transform="translate(658,416)" opacity="0.22" stroke="#c8f542" stroke-width="1" fill="none">
    <circle r="14"/><line x1="0" y1="-13" x2="0" y2="13"/><line x1="-13" y1="0" x2="13" y2="0"/>
    <polygon points="0,-8 3,-3 -3,-3" fill="#c8f542" stroke="none"/>
    <text x="0" y="-17" text-anchor="middle" fill="#c8f542" font-size="7" font-family="DM Mono,monospace" stroke="none">N</text>
  </g>`;
  svg += `<rect width="700" height="434" fill="url(#vign)" pointer-events="none"/>`;

  wrap.innerHTML = `<svg id="worldMapSVG" viewBox="0 0 700 434" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">${svg}</svg>`;
  updateMapProgressLabel(REGIONS, loadRegionProgress());
}

// Expose pour les onclick SVG inline
window._selectRegion = function(regionId) {
  selectedRegion = regionId;
  renderWorldMap();
  showRegionDetail(regionId);
};

function showRegionDetail(regionId) {
  const region    = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  const beaten    = getRegionEnemiesBeaten(regionId);
  const prog      = loadRegionProgress();
  const completed = !!(prog[regionId] && prog[regionId].completed);

  $('rdpBiomeTag').textContent   = region.biome;
  $('rdpBiomeTag').style.cssText = `background:${region.colorBg};color:${region.color};border:1px solid ${region.colorBorder}`;
  $('rdpTitle').textContent  = region.icon + ' ' + region.name;
  $('rdpStory').textContent  = region.story;

  $('rdpEnemies').innerHTML = region.enemies.map(eid => {
    const e = ALL_ENEMIES[eid];
    if (!e) return '';
    const isBeaten = beaten.includes(eid);
    return `<div class="rdp-enemy-chip ${e.isBoss ? 'boss-chip' : ''} ${isBeaten ? 'beaten-chip' : ''}">
      ${isBeaten ? '✓' : e.isBoss ? '👑' : '⚔'} ${e.name}
      <span style="font-size:0.55rem;opacity:0.6">${e.isBoss ? 'BOSS' : 'SOUS-BOSS'}</span>
    </div>`;
  }).join('');

  const btn         = $('rdpEnterBtn');
  const heroWarning = $('rdpHeroWarning');
  if (!selectedHero) {
    if (heroWarning) heroWarning.style.display = 'flex';
    btn.disabled    = true;
    btn.textContent = '⚠ Choisis un héros d\'abord';
    btn.className   = 'rdp-enter-btn';
  } else {
    if (heroWarning) heroWarning.style.display = 'none';
    if (completed) {
      btn.textContent = '🔄 Rejouer la région';
      btn.className   = 'rdp-enter-btn completed-btn';
      btn.disabled    = false;
      btn.onclick     = () => openDiffModal(regionId);
    } else {
      const nextEnemyId = region.enemies.find(eid => !beaten.includes(eid));
      const nextE       = nextEnemyId ? ALL_ENEMIES[nextEnemyId] : null;
      btn.textContent   = nextE ? `⚔ Affronter : ${nextE.name}` : '⚔ Entrer dans la région';
      btn.className     = 'rdp-enter-btn resume-btn';
      btn.disabled      = false;
      btn.onclick       = () => openDiffModal(regionId);
    }
  }
  $('regionDetailPanel').style.display = 'block';
}

window.closeRegionDetail = function() {
  $('regionDetailPanel').style.display = 'none';
  selectedRegion = null;
  renderWorldMap();
};

// ─── Difficulté ──────────────────────────────────────────────────────────────
function openDiffModal(regionId) {
  pendingDiffRegion = regionId;
  const region = REGIONS.find(r => r.id === regionId);
  if (region) $('diffModalRegionName').textContent = region.icon + ' ' + region.name.toUpperCase();
  selectDiffCard('normal');
  $('diffModalOverlay').classList.add('show');
}

window.closeDiffModal = function() {
  $('diffModalOverlay').classList.remove('show');
  pendingDiffRegion = null;
};

function selectDiffCard(diff) {
  setDifficulty(diff);
  ['normal','epicee','infernal'].forEach(d => {
    const card = $('diffCard-' + d);
    if (card) card.classList.toggle('diff-selected', d === diff);
  });
  const btn = $('diffConfirmBtn');
  const d   = DIFFICULTIES[diff];
  if (btn) btn.textContent = d.icon + ' Lancer en ' + d.label;
}
window.selectDifficulty = selectDiffCard;

window.confirmDifficulty = function() {
  if (!pendingDiffRegion) return;
  const regionId = pendingDiffRegion;
  window.closeDiffModal();
  enterRegionWithDifficulty(regionId);
};

function enterRegionWithDifficulty(regionId) {
  selectedRegion = regionId;
  if (!selectedHero) { showToast('Sélectionne d\'abord un héros !', 'error'); return; }
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;

  const prog = loadRegionProgress();
  if (prog[regionId] && prog[regionId].completed) {
    const p = loadRegionProgress();
    p[regionId] = { beaten: [], completed: false };
    saveRegionProgress(p);
  }

  setEnemiesFromRegion(regionId, ALL_ENEMIES, REGIONS);
  applyDifficultyToEnemies();
  updateStageIndicators(ENEMIES, state.currentEnemyIndex);

  const beatenNow = getRegionEnemiesBeaten(regionId);
  const nextIdx   = region.enemies.findIndex(eid => !beatenNow.includes(eid));
  state.currentEnemyIndex = Math.max(0, nextIdx);
  state.heroHpPersist     = 0;

  startBattleWithDialogue(true);
}

// ─── Combat ──────────────────────────────────────────────────────────────────
function startBattleWithDialogue(newGame = false) {
  if (!selectedHero) return;
  const villainId = ENEMIES[state.currentEnemyIndex]?.id;
  if (!villainId) { startBattle(newGame); return; }
  openDialogue(villainId, selectedHero, HEROES, ALL_ENEMIES, selectedRegion, REGIONS, () => startBattle(newGame), DIALOGUES);
}

function startBattle(newGame = false) {
  if (!selectedHero) return;
  state.heroChar   = HEROES[selectedHero];
  state.villainChar = ENEMIES[state.currentEnemyIndex];
  state.heroStats  = getLevelStats(state.heroChar);

  state.atkBuff     = 0; state.atkBuffTurns   = 0;
  state.fortressActive = false; state.fortressTurns = 0;
  state.cooldowns   = {};
  state.heroStatuses = [];

  if (newGame || state.heroHpPersist === 0) {
    state.heroHp = state.heroMaxHp = state.heroStats.hp;
    state.heroHpPersist = 0;
  } else {
    state.heroMaxHp = state.heroStats.hp;
    state.heroHp    = state.heroHpPersist;
  }

  state.villainHp      = state.villainMaxHp = state.villainChar.hp * 10;
  state.heroSpecial    = 0; state.villainSpecial = 0;
  state.turn           = 1;
  state.heroDefending  = false; state.villainDefending = false;
  state.battleRunning  = true;  state.playerTurn       = true;
  if (state.villainChar.phases) state.villainChar.phases.forEach(p => p.taunted = false);

  setupBattleScreen(state.heroChar, state.villainChar, selectedRegion, REGIONS);
  updateStageIndicators(ENEMIES, state.currentEnemyIndex);
  spawnArenaParticles(selectedRegion, REGIONS);

  const diffBadge = $('battleDiffBadge');
  if (diffBadge) diffBadge.innerHTML = getDiffBadgeHtml();

  clearLog(); showScreen('battle');
  buildActionRow(state.heroChar, handleAction, autoPassTurn);
  updateBattleUI();

  // Logs de début
  const activeSkills = getActiveTreeSkills();
  if (activeSkills.length > 0) addLog('✨ Compétences actives : ' + activeSkills.map(s => s.emoji + ' ' + s.name).join(', '), 'skill-line');
  const regen = getPassiveRegenPerTurn();
  if (regen > 0) addLog('🫙 Régénération active : +' + regen + ' HP/tour', 'skill-line');

  const tag = state.villainChar.isBoss ? '💀 BOSS FINAL' : `⚔ COMBAT ${state.currentEnemyIndex + 1}/${ENEMIES.length}`;
  addLog(`${tag} : ${state.heroChar.name} (LV.${player.level}) vs ${state.villainChar.name}`, 'system');
  if (state.heroHpPersist > 0 && !newGame) addLog(`❤️ HP conservés : ${state.heroHp}/${state.heroMaxHp}`, 'heal-line');
  addLog(`🎙 "${pick(state.villainChar.narratorLines.taunt)}"`, state.villainChar.isBoss ? 'villain-action' : 'intermediate-action');
  setTimeout(() => showNarrator(pick(state.villainChar.narratorLines.taunt), 4000), 600);

  // Qui commence ?
  if (state.heroStats.spd < state.villainChar.spd || isSlowed()) {
    addLog('⚡ ' + state.villainChar.name + ' attaque en premier !', 'system');
    setPlayerTurn(false);
    setTimeout(() => villainTurn(), 800);
  } else {
    setPlayerTurn(true);
  }
}

function setPlayerTurn(val) {
  state.playerTurn = val;
  if (val && state.heroChar) {
    buildActionRow(state.heroChar, handleAction, autoPassTurn);
  } else {
    document.querySelectorAll('.action-btn').forEach(b => b.disabled = !val);
  }
  const sb = $('btn-special');
  if (sb) sb.disabled = !val || state.heroSpecial < 100;
  setPlayerTurnLabel(val);
}

// ─── Actions du joueur ────────────────────────────────────────────────────────
function handleAction(id) {
  // Items consommables
  if (id.startsWith('item:')) { useItem(id.slice(5)); return; }
  playerAction(id);
}

function playerAction(id) {
  if (!state.playerTurn || !state.battleRunning) return;
  const hero    = state.heroChar;
  const villain = state.villainChar;
  const heroEff = { ...state.heroStats, atk: getEffectiveAtk() };
  const attacks = getAttacks(hero);
  const atk     = attacks.find(a => a.id === id);
  if (!atk) { setPlayerTurn(true); return; }
  if (id === 'special' && state.heroSpecial < 100) { setPlayerTurn(true); return; }
  if (atk.cooldown > 0 && (state.cooldowns[id] || 0) > 0) {
    showToast(`⏳ ${atk.name} — encore ${state.cooldowns[id]} tour(s) !`, 'error'); return;
  }

  setPlayerTurn(false);
  const result = atk.fn(heroEff, villain);
  if (!result) { setPlayerTurn(true); return; }

  if (atk.cooldown > 0) state.cooldowns[id] = atk.cooldown;
  state.heroDefending = false;

  if (result.miss) {
    anim('heroSprite', 'punch-right');
    setTimeout(() => spawnDmg('villainSprite', 0, 'miss'), 300);
    addLog('💨 ' + hero.name + ' rate son coup !', 'hero-action');
    setTimeout(() => villainTurn(), 900);
    return;
  }

  // Cinématique spéciale Patate
  if (id === 'special' && hero.id === 'patate') {
    state.heroSpecial = 0;
    updateBattleUI();
    triggerPatateSpecial(heroEff, villain, result, (res) => {
      if (res.dmg) { anim('villainSprite','hit-shake'); spawnDmg('villainSprite',res.dmg,'crit'); state.villainHp -= res.dmg; }
      addLog(res.log, 'crit-line');
      const arena = document.querySelector('.arena');
      if (arena) { arena.classList.add('arena-quake'); setTimeout(() => arena.classList.remove('arena-quake'), 500); }
      updateBattleUI();
      checkBattleEnd() || setTimeout(() => villainTurn(), 900);
    });
    return;
  }

  anim('heroSprite', 'punch-right');
  setTimeout(() => {
    if (result.heal) { state.heroHp = Math.min(state.heroMaxHp, state.heroHp + result.heal); spawnDmg('heroSprite', result.heal, 'heal'); }
    if (result.dmg)  { anim('villainSprite','hit-shake'); spawnDmg('villainSprite', result.dmg, result.crit ? 'crit' : 'dmg'); state.villainHp -= result.dmg; }
    if (result.defend) state.heroDefending = true;
    if (result.spBonus) state.heroSpecial = Math.min(100, state.heroSpecial + result.spBonus);
    addLog(result.log, result.crit ? 'crit-line' : 'hero-action');
    updateBattleUI();
    checkBattleEnd() || setTimeout(() => villainTurn(), 900);
  }, 350);
}

function autoPassTurn() {
  if (!state.battleRunning) return;
  const hero = state.heroChar;
  const dmg  = Math.max(1, Math.floor(state.heroStats.atk * 0.25 * (0.8 + Math.random() * 0.4)));
  state.villainHp -= dmg;
  anim('heroSprite','punch-right');
  setTimeout(() => spawnDmg('villainSprite', dmg, 'dmg'), 200);
  addLog(`😤 ${hero.name} riposte faiblement — ${dmg} dégâts (recharge en cours…)`, 'hero-action');
  state.heroSpecial = Math.min(100, state.heroSpecial + 5);
  updateBattleUI();
  checkBattleEnd() || setTimeout(() => villainTurn(), 900);
}

function useItem(id) {
  if (!state.playerTurn || !state.battleRunning) return;
  const cat  = SHOP_CATALOG.consumables.find(c => c.id === id); if (!cat) return;
  const inv  = player.inventory.find(i => i.id === id); if (!inv || inv.qty <= 0) return;
  inv.qty--;
  if (inv.qty <= 0) player.inventory = player.inventory.filter(i => i.id !== id);
  savePlayer();

  if (cat.healAmt > 0) {
    const healed = Math.min(cat.healAmt, state.heroMaxHp - state.heroHp);
    state.heroHp = Math.min(state.heroMaxHp, state.heroHp + cat.healAmt);
    spawnDmg('heroSprite', healed, 'heal');
    addLog(`${cat.icon} ${cat.name} — +${healed} HP soignés !`, 'heal-line');
  }
  if (cat.atkMult > 0) {
    state.atkBuff      = Math.floor(state.heroStats.atk * cat.atkMult);
    state.atkBuffTurns = cat.duration || 2;
    addLog(`${cat.icon} ATK +${state.atkBuff} pendant ${state.atkBuffTurns} tours !`, 'hero-action');
  }
  if (cat.cureStatus) {
    if (cat.cureStatus === 'all') { cureAllStatuses(); addLog(`${cat.icon} Tous les statuts éliminés !`, 'heal-line'); }
    else {
      const cured = cureStatus(cat.cureStatus);
      addLog(cured ? `${cat.icon} ${STATUS_DEFS[cat.cureStatus].label} soignée !` : `${cat.icon} Aucun statut à soigner.`, cured ? 'heal-line' : 'system');
    }
  }

  updateBattleUI(); buildItemRow(handleAction);
  setPlayerTurn(false);
  setTimeout(() => villainTurn(), 600);
}

// ─── Tour de l'ennemi ────────────────────────────────────────────────────────
function villainTurn() {
  if (!state.battleRunning) return;
  const villain = state.villainChar;
  const hero    = state.heroChar;
  state.turn++;

  // Tick statuts (brûlure, poison)
  tickStatuses(addLog, spawnDmg);
  if (checkBattleEnd()) return;

  // Régénération
  const regen = getPassiveRegenPerTurn();
  if (regen > 0 && state.heroHp < state.heroMaxHp) {
    const healed = Math.min(regen, state.heroMaxHp - state.heroHp);
    state.heroHp += healed;
    spawnDmg('heroSprite', healed, 'heal');
    addLog(`🫙 Régénération — +${healed} HP`, 'heal-line');
  }

  // Expiration des buffs
  if (state.atkBuffTurns > 0) { state.atkBuffTurns--; if (state.atkBuffTurns === 0) { state.atkBuff = 0; addLog('⚡ Boost ATK terminé.', 'system'); } }
  if (state.fortressActive)  { state.fortressTurns--; if (state.fortressTurns <= 0) { state.fortressActive = false; addLog('🥖 Forteresse effondrée…', 'system'); } }

  // Cooldowns
  for (const id in state.cooldowns) if (state.cooldowns[id] > 0) state.cooldowns[id]--;

  state.villainSpecial = Math.min(100, state.villainSpecial + 18);

  // Phases du vilain
  const hpRatio = state.villainHp / state.villainMaxHp;
  if (villain.phases) {
    const phase = villain.phases.slice().reverse().find(p => hpRatio <= p.threshold && !p.taunted);
    if (phase) {
      phase.taunted = true;
      addLog('😈 ' + villain.name + ' : "' + phase.taunt + '"', villain.isBoss ? 'villain-action' : 'intermediate-action');
      if (villain.isBoss) showPhaseBanner('⚡ NOUVELLE PHASE', phase.taunt.substring(0, 40) + '…');
      else showNarrator(phase.taunt, 2500);
    }
  }

  // Choix de l'action IA
  let action;
  if (state.villainSpecial >= 100 && Math.random() < 0.7) action = 'special';
  else if (hpRatio < 0.35)  action = Math.random() < 0.6 ? 'special' : 'punch';
  else if (hpRatio < 0.6)   action = Math.random() < 0.4 ? 'combo'   : 'punch';
  else { const r = Math.random(); action = r < 0.5 ? 'punch' : r < 0.75 ? 'combo' : 'defend'; }

  anim('villainSprite', 'punch-left');
  const logCls    = villain.isBoss ? 'villain-action' : 'intermediate-action';
  const blockRate = state.fortressActive ? 0.8 : 0.5;

  setTimeout(() => {
    switch (action) {
      case 'punch': {
        if (isMiss()) { addLog('💨 ' + villain.name + ' rate son coup !', logCls); spawnDmg('heroSprite', 0, 'miss'); break; }
        const crit = isCrit();
        let dmg    = crit ? Math.floor(calcDmg(villain.atk, state.heroStats.def) * 1.7) : calcDmg(villain.atk, state.heroStats.def);
        if (state.heroDefending || state.fortressActive) dmg = Math.floor(dmg * (1 - blockRate));
        anim('heroSprite','hit-shake'); spawnDmg('heroSprite', dmg, crit ? 'crit' : 'dmg'); state.heroHp -= dmg;
        if (crit) { const a2 = $('battleArena'); if (a2) { a2.classList.add('arena-quake'); setTimeout(() => a2.classList.remove('arena-quake'), 500); } }
        addLog((crit ? '💥 CRITIQUE ! ' : '😈 ') + villain.name + ' frappe pour ' + dmg + (state.heroDefending ? ' (garde !)' : state.fortressActive ? ' (forteresse !)' : '') + ' !', crit ? 'crit-line' : logCls);
        maybeInflictStatus(villain, addLog, showNarrator);
        if (state.fortressActive && state.fortressCounter) { const r2 = calcDmg(state.heroStats.atk,villain.def,0.6); state.villainHp -= r2; spawnDmg('villainSprite',r2,'dmg'); addLog('🥖 Riposte de la Forteresse — '+r2+' dégâts !','hero-action'); }
        break;
      }
      case 'combo': {
        let dmg = calcDmg(villain.atk, state.heroStats.def, 1.2);
        if (state.heroDefending || state.fortressActive) dmg = Math.floor(dmg * (1 - blockRate * 0.6));
        anim('heroSprite','hit-shake'); spawnDmg('heroSprite', dmg, 'dmg'); state.heroHp -= dmg;
        addLog('🔥 ' + villain.name + ' combo furieux — ' + dmg + ' dégâts !', logCls);
        maybeInflictStatus(villain, addLog, showNarrator);
        break;
      }
      case 'defend':
        state.villainDefending = true;
        addLog('🛡️ ' + villain.name + ' se barricade…', logCls);
        break;
      case 'special': {
        state.villainSpecial = 0;
        const res = villain.special.fn(villain, hero);
        let dmg   = res.dmg;
        if (state.heroDefending || state.fortressActive) dmg = Math.floor(dmg * (state.fortressActive ? 0.25 : 0.55));
        anim('heroSprite','hit-shake'); spawnDmg('heroSprite', dmg, 'crit'); state.heroHp -= dmg;
        const a3 = $('battleArena'); if (a3) { a3.classList.add('arena-quake'); setTimeout(() => a3.classList.remove('arena-quake'), 500); }
        addLog('⚡ ' + res.log, 'crit-line');
        maybeInflictStatus(villain, addLog, showNarrator);
        break;
      }
    }
    updateBattleUI();
    if (!checkBattleEnd()) setPlayerTurn(true);
  }, 400);
}

function checkBattleEnd() {
  if (state.heroHp    <= 0) { state.battleRunning = false; setTimeout(() => endBattle(false), 500); return true; }
  if (state.villainHp <= 0) { state.battleRunning = false; setTimeout(() => endBattle(true),  500); return true; }
  return false;
}

function endBattle(won) {
  const hero         = state.heroChar;
  const villain      = state.villainChar;
  const isLastEnemy  = state.currentEnemyIndex >= ENEMIES.length - 1;
  const { earnedXp, earnedGold } = calcBattleRewards(won, villain);

  if (won && selectedRegion) {
    const result = markEnemyBeaten(selectedRegion, villain.id, REGIONS);
    if (!result.wasCompleted && result.nowCompleted) {
      const nextIdx = REGIONS.findIndex(r => r.id === selectedRegion) + 1;
      const nextR   = REGIONS[nextIdx];
      if (nextR) setTimeout(() => showToast(`🗺 ${nextR.icon} ${nextR.name} débloquée !`, 'success'), 1200);
    }
  }
  if (!won && selectedRegion) {
    const p = loadRegionProgress();
    p[selectedRegion] = { beaten: [], completed: false };
    saveRegionProgress(p);
  }

  const didLevelUp = addXpGold(earnedXp, earnedGold);
  if (didLevelUp) {
    const unlock = LEVEL_UNLOCKS[player.level];
    $('levelupBannerTitle').textContent = '🎉 Niveau ' + player.level + ' atteint !';
    $('levelupBannerSub').textContent   = (unlock ? unlock.msg + ' · ' : '') + '✨ +1 point de compétence disponible !';
    $('levelupBanner').classList.add('show');
  }

  if (won && !isLastEnemy) {
    state.heroHpPersist = state.heroHp;
    state.currentEnemyIndex++;
    state.heroStatuses = [];
    updateStageIndicators(ENEMIES, state.currentEnemyIndex);
  }

  const vdb = $('victoryDiffBadge');
  if (vdb) vdb.innerHTML = getDiffBadgeHtml();

  setupVictoryScreen({
    won, isLastEnemy, villain, hero, earnedXp, earnedGold,
    enemies: ENEMIES, currentEnemyIndex: state.currentEnemyIndex,
    onRematch: _buildRematchBtn(won, isLastEnemy, villain),
    onBack:    _buildBackBtn(won),
  });
  showScreen('victory');
}

function _buildRematchBtn(won, isLastEnemy, villain) {
  if (won && !isLastEnemy) {
    const nextEnemy = ENEMIES[state.currentEnemyIndex];
    return {
      label: nextEnemy.isBoss ? '💀 Affronter le Boss !' : `⚔ Combat suivant : ${nextEnemy.name}`,
      cls:   'next-stage',
      fn:    () => startBattle(false),
    };
  }
  if (won && selectedRegion) {
    return { label: '🗺 Retour à la Carte', cls: 'next-stage', fn: () => switchTab('map') };
  }
  if (!won && selectedRegion) {
    return {
      label: '🔄 Réessayer depuis le début',
      fn:    () => { state.currentEnemyIndex = 0; state.heroHpPersist = 0; enterRegionWithDifficulty(selectedRegion); },
    };
  }
  return {
    label: won ? '🔄 Rejouer' : '🔄 Revanche',
    fn:    () => { state.currentEnemyIndex = 0; state.heroHpPersist = 0; if (selectedRegion) enterRegionWithDifficulty(selectedRegion); else startBattle(true); },
  };
}

function _buildBackBtn(won) {
  if (!won && selectedRegion) {
    return {
      label: '← Abandonner (remet à zéro)',
      fn:    () => {
        const p = loadRegionProgress();
        p[selectedRegion] = { beaten: [], completed: false };
        saveRegionProgress(p);
        state.currentEnemyIndex = 0; state.heroHpPersist = 0;
        updateStageIndicators(ENEMIES, 0);
        backToMap();
      },
    };
  }
  return { label: '← Carte du monde', fn: backToMap };
}

function backToMap() {
  if (selectedHero) switchCharSave(selectedHero);
  renderHeroGrid(); renderWorldMap();
  showScreen('map');
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
}

// ─── Niveau : fermer l'overlay ───────────────────────────────────────────────
window.closeLevelUp = function() {
  $('levelupOverlay').classList.remove('show');
  state.heroStats  = getLevelStats(state.heroChar);
  state.heroMaxHp  = state.heroStats.hp;
  if (state.heroHp > state.heroMaxHp) state.heroHp = state.heroMaxHp;
  $('heroLvlBadge').textContent = 'LV.' + player.level;
  buildActionRow(state.heroChar, handleAction, autoPassTurn);
  updateBattleUI();
  state.battleRunning = true; setPlayerTurn(true);
  addLog('⭐ Tu es maintenant niveau ' + player.level + ' !', 'level-line');
};

// ─── Skill tree ──────────────────────────────────────────────────────────────
function renderSkillTree() {
  SKILL_BRANCHES.forEach(branch => {
    branch.skills.forEach(sk => {
      const lv     = getSkillLevel(sk.id);
      const card   = $('sk-card-' + sk.id);
      const btn    = $('sk-btn-' + sk.id);
      const lvEl   = $('sk-lv-' + sk.id);
      if (card) card.classList.toggle('unlocked', lv > 0);
      if (lvEl) lvEl.textContent = `LV.${lv}/${sk.maxLevel}`;
      if (btn) {
        const atMax  = lv >= sk.maxLevel;
        btn.disabled = atMax || player.skillPoints < sk.costPerLevel;
        btn.textContent = atMax ? '✅ Max' : lv > 0 ? `✨ +1 (${sk.costPerLevel} pt)` : `✨ Débloquer (${sk.costPerLevel} pt)`;
      }
    });
  });
  const spEl = $('skillPointsDisplay');
  if (spEl) spEl.textContent = player.skillPoints + ' point(s) disponible(s)';
}

window.unlockSkill = function(id) {
  buySkill(id,
    (sk, newLv) => { showToast(`✨ ${sk.emoji} ${sk.name} — niveau ${newLv} !`, 'skill'); renderSkillTree(); updateProfileUI(player, selectedHero, HEROES, getXpForLevel); },
    (msg) => showToast(msg, 'error'),
  );
};

window.confirmResetSkills = function() {
  if (!selectedHero) { showToast('Sélectionne un héros d\'abord !', 'error'); return; }
  const spent = player.skillPointsSpent || 0;
  if (spent === 0) { showToast('Aucune compétence à réinitialiser.', 'info'); return; }
  $('resetCostLabel').textContent = getResetCost() + ' 🪙';
  $('resetSkillsModal').style.display = 'flex';
};

window.doResetSkills = function() {
  $('resetSkillsModal').style.display = 'none';
  if (doResetSkills((msg) => showToast(msg, 'error'))) {
    renderSkillTree(); updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
    showToast('✨ Compétences réinitialisées !', 'skill');
  }
};

// ─── Inventaire ──────────────────────────────────────────────────────────────
window.switchInvTab = function(tab) {
  ['weapons','armors','abilities'].forEach(t => {
    const panel = $('invPanel-' + t);
    const btn   = $('invTab-' + t);
    if (panel) panel.style.display = t === tab ? 'block' : 'none';
    if (btn) { btn.style.background = t === tab ? 'var(--card-bg)' : 'var(--surface)'; btn.style.color = t === tab ? 'var(--accent)' : 'var(--muted)'; }
  });
  if (tab === 'weapons')   renderInvWeapons();
  if (tab === 'armors')    renderInvArmors();
  if (tab === 'abilities') renderLoadoutAbilities();
};

function renderInvWeapons() {
  const grid = $('invWeaponsGrid'); if (!grid) return;
  const all  = SHOP_CATALOG.weapons;
  grid.innerHTML = '';
  const owned = player.owned.filter(id => all.find(w => w.id === id));
  if (!owned.length) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted);">Aucune arme possédée.</div>'; return; }
  const counts = {};
  owned.forEach(id => counts[id] = (counts[id] || 0) + 1);
  Object.entries(counts).forEach(([id, count]) => {
    const item       = all.find(w => w.id === id); if (!item) return;
    const isEquipped = player.equipped.weapon === id;
    const sellPrice  = getSellPrice(item);
    const card = document.createElement('div');
    card.className = 'inv-card' + (isEquipped ? ' equipped' : '');
    card.innerHTML =
      `${isEquipped ? '<span class="badge eq-badge">ÉQUIPÉ</span>' : ''}` +
      `${count > 1  ? `<span class="badge dupe-badge">×${count}</span>` : ''}` +
      `<div class="inv-icon">${item.icon}</div>` +
      `<div class="inv-name">${item.name}</div>` +
      `<div class="inv-stat">${item.stat}</div>` +
      `<div class="inv-actions">` +
        (!isEquipped ? `<button onclick="window.equipItem('${id}','weapon')" class="btn-equip">⚔ Équiper</button>` : `<button onclick="window.unequip('${id}','weapon')" class="btn-unequip">↩ Déséquiper</button>`) +
        `<button onclick="window.sellItem('${id}','weapon')" class="btn-sell">🪙 Vendre (${sellPrice})</button>` +
      `</div>`;
    grid.appendChild(card);
  });
}

function renderInvArmors() {
  const grid = $('invArmorsGrid'); if (!grid) return;
  const all  = SHOP_CATALOG.armors;
  grid.innerHTML = '';
  const owned = player.owned.filter(id => all.find(a => a.id === id));
  if (!owned.length) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted);">Aucune armure possédée.</div>'; return; }
  const counts = {};
  owned.forEach(id => counts[id] = (counts[id] || 0) + 1);
  Object.entries(counts).forEach(([id, count]) => {
    const item       = all.find(a => a.id === id); if (!item) return;
    const isEquipped = player.equipped.armor === id;
    const sellPrice  = getSellPrice(item);
    const card = document.createElement('div');
    card.className = 'inv-card' + (isEquipped ? ' equipped' : '');
    card.innerHTML =
      `${isEquipped ? '<span class="badge eq-badge">ÉQUIPÉ</span>' : ''}` +
      `${count > 1  ? `<span class="badge dupe-badge">×${count}</span>` : ''}` +
      `<div class="inv-icon">${item.icon}</div>` +
      `<div class="inv-name">${item.name}</div>` +
      `<div class="inv-stat">${item.stat}</div>` +
      `<div class="inv-actions">` +
        (!isEquipped ? `<button onclick="window.equipItem('${id}','armor')" class="btn-equip">🛡 Équiper</button>` : `<button onclick="window.unequip('${id}','armor')" class="btn-unequip">↩ Déséquiper</button>`) +
        `<button onclick="window.sellItem('${id}','armor')" class="btn-sell">🪙 Vendre (${sellPrice})</button>` +
      `</div>`;
    grid.appendChild(card);
  });
}

function renderLoadoutAbilities() {
  if (!selectedHero) {
    $('loadoutPool').innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted);">Sélectionne d\'abord un héros.</div>';
    $('loadoutSlots').innerHTML = '';
    $('loadoutCounter').textContent = '0 / 4';
    return;
  }
  const loadout = getLoadout();
  $('loadoutCounter').textContent = loadout.length + ' / ' + MAX_LOADOUT;
  const avail = getAllAvailableAttacks();

  // Slots
  const slotsEl = $('loadoutSlots'); slotsEl.innerHTML = '';
  for (let i = 0; i < MAX_LOADOUT; i++) {
    const id   = loadout[i];
    const slot = document.createElement('div');
    if (id) {
      const def = avail.find(a => a.id === id) || { name: id, icon: '⚡', desc: '' };
      slot.className = 'loadout-slot filled';
      slot.innerHTML = `<div class="slot-icon">${def.icon}</div><div class="slot-name">${def.name}</div><div class="slot-remove">✕ Retirer</div>`;
      slot.onclick   = () => { toggleLoadout(id, (msg) => showToast(msg, 'error')); renderLoadoutAbilities(); };
    } else {
      slot.className = 'loadout-slot empty';
      slot.innerHTML = `<div>＋</div><div style="font-size:0.6rem">Slot libre</div>`;
    }
    slotsEl.appendChild(slot);
  }

  // Pool d'attaques
  const poolEl = $('loadoutPool'); poolEl.innerHTML = '';
  avail.forEach(atk => {
    const selected = loadout.includes(atk.id);
    const card     = document.createElement('div');
    card.className = 'loadout-pool-card' + (selected ? ' selected' : '');
    card.innerHTML =
      `${atk.treeSkill ? '<span class="badge tree-badge">COMPÉTENCE</span>' : ''}` +
      `${selected ? '<span class="badge sel-badge">✓ ÉQUIPÉ</span>' : ''}` +
      `<div style="font-size:1.8rem;text-align:center">${atk.icon}</div>` +
      `<div style="font-weight:700;text-align:center">${atk.name}</div>` +
      `<div style="font-size:0.6rem;color:var(--muted);text-align:center">${atk.desc}</div>` +
      `<div style="font-size:0.58rem;text-align:center;color:${atk.cooldown > 0 ? 'var(--accent3)' : 'var(--accent)'}">` +
        `${atk.cooldown > 0 ? '⏳ CD : ' + atk.cooldown + ' tour(s)' : '✓ Sans cooldown'}</div>`;
    card.onclick = () => { toggleLoadout(atk.id, (msg) => showToast(msg, 'error')); renderLoadoutAbilities(); };
    poolEl.appendChild(card);
  });
}

window.equipItem = function(id, type) {
  player.equipped[type] = id; savePlayer();
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  type === 'weapon' ? renderInvWeapons() : renderInvArmors();
  showToast('✅ Équipé !', 'success');
};
window.unequip = function(id, type) {
  player.equipped[type] = null; savePlayer();
  type === 'weapon' ? renderInvWeapons() : renderInvArmors();
  showToast('↩ Déséquipé.', 'info');
};
window.sellItem = function(id, type) {
  const catalog = type === 'weapon' ? SHOP_CATALOG.weapons : SHOP_CATALOG.armors;
  const item    = catalog.find(i => i.id === id); if (!item) return;
  const count   = player.owned.filter(o => o === id).length;
  if (count <= 0) { showToast('Tu ne possèdes pas cet objet.', 'error'); return; }
  if (player.equipped[type] === id && count <= 1) player.equipped[type] = null;
  player.owned.splice(player.owned.indexOf(id), 1);
  const gain = getSellPrice(item); player.gold += gain; savePlayer();
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  type === 'weapon' ? renderInvWeapons() : renderInvArmors();
  showToast(`${item.icon} ${item.name} vendu — +${gain} 🪙`, 'success');
};

// ─── Shop ────────────────────────────────────────────────────────────────────
window.buyItem = function(id, type) {
  const catalog = SHOP_CATALOG[type + 's'] || SHOP_CATALOG.consumables;
  const item    = catalog.find(i => i.id === id); if (!item) return;
  if (player.level < item.reqLv) { showToast('Niveau ' + item.reqLv + ' requis !', 'error'); return; }
  if (player.gold < item.price)  { showToast('Pas assez de pièces !', 'error'); return; }
  player.gold -= item.price;
  if (type === 'consumable') {
    const inv = player.inventory.find(i => i.id === id);
    if (inv) inv.qty++;
    else player.inventory.push({ id, qty: 1 });
  } else {
    player.owned.push(id);
  }
  savePlayer();
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  showToast(`${item.icon} ${item.name} acheté !`, 'success');
};

// ─── Lootboxes ───────────────────────────────────────────────────────────────
window.openLootboxUI = function(id) {
  if (!selectedHero) { showToast('Sélectionne un héros d\'abord !', 'error'); return; }
  const result = openLootbox(id);
  if (!result) { showToast('Boîte introuvable.', 'error'); return; }
  if (result.error) { showToast(result.error, 'error'); return; }
  updateProfileUI(player, selectedHero, HEROES, getXpForLevel);
  // Afficher les résultats (UI modale lootbox — inchangée)
  if (typeof renderLootboxResults === 'function') renderLootboxResults(result);
};

// ─── Dialogue (expose pour HTML onclick) ─────────────────────────────────────
window.advanceDlg  = () => advanceDlg(HEROES, ALL_ENEMIES);
window.skipDialogue = skipDialogue;

// ─── Cinématique Patate (identique à l'original, conservée) ──────────────────
function triggerPatateSpecial(heroEffective, villain, dmgResult, onComplete) {
  // Délégué à la fonction globale d'origine (copiée depuis lunchboxe.js)
  if (typeof window._triggerPatateSpecial === 'function') {
    window._triggerPatateSpecial(heroEffective, villain, dmgResult, onComplete);
  } else {
    // Fallback simplifié si la cinématique n'est pas chargée
    onComplete(dmgResult);
  }
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────
window.openMobileMenu  = () => { $('mobileMenu').classList.add('open'); document.body.style.overflow='hidden'; };
window.closeMobileMenu = () => { $('mobileMenu').classList.remove('open'); document.body.style.overflow=''; };
window.switchTab = switchTab;
