// ============================================================
// ui/dom.js — Utilitaires DOM : toast, log, animations, sprites
// ============================================================

// ─── Utilitaires généraux ────────────────────────────────────────────────────
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function $(id)   { return document.getElementById(id); }
export function $$(sel) { return document.querySelectorAll(sel); }

// ─── Navigation entre écrans ─────────────────────────────────────────────────
const SCREENS = ['map','battle','victory'];

export function showScreen(name) {
  SCREENS.forEach(s => {
    const el = $('screen-' + s);
    if (el) el.classList.toggle('active', s === name);
  });
}

// ─── Tab navigation ──────────────────────────────────────────────────────────
export function switchTab(tabName) {
  $$('.tab-panel').forEach(p => p.classList.remove('active'));
  $$('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = $('tab-' + tabName);
  const btn   = $('tabBtn-' + tabName);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

// ─── Toast notifications ─────────────────────────────────────────────────────
let toastTimer = null;
export function showToast(msg, type = 'info') {
  const t = $('toast');
  if (!t) return;
  if (toastTimer) clearTimeout(toastTimer);
  t.textContent = msg;
  t.className   = 'toast ' + type;
  void t.offsetWidth; // reflow pour relancer l'animation
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Journal de combat ───────────────────────────────────────────────────────
export function clearLog() {
  const log = $('battleLog');
  if (log) log.innerHTML = '';
}

export function addLog(msg, cls = '') {
  const log = $('battleLog');
  if (!log) return;
  const d = document.createElement('div');
  d.className = 'log-line ' + cls;
  d.textContent = msg;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

// ─── Animations ─────────────────────────────────────────────────────────────
export function anim(id, cls, ms = 500) {
  const el = $(id);
  if (!el) return;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}

/**
 * Fait apparaître un nombre flottant (dégâts / soin / esquive) sur un sprite.
 */
export function spawnDmg(id, val, type) {
  const wrap = $(id);
  if (!wrap) return;

  // Chiffre flottant
  const el = document.createElement('div');
  el.className = 'dmg-float' +
    (type === 'crit' ? ' crit' : type === 'heal' ? ' heal' : type === 'miss' ? ' miss' : '');
  el.textContent = type === 'miss' ? 'ESQUIVÉ' : type === 'heal' ? '+' + val : '-' + val;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 1000);

  // Ripple d'impact
  if (type !== 'miss' && type !== 'heal') {
    const ripple = document.createElement('div');
    ripple.className = 'impact-ripple';
    ripple.style.cssText =
      `border-color:${type === 'crit' ? 'rgba(245,166,35,0.8)' : 'rgba(255,255,255,0.5)'};` +
      `width:${type === 'crit' ? '80px' : '60px'};height:${type === 'crit' ? '80px' : '60px'};`;
    wrap.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  }
}

// ─── Narrateur ───────────────────────────────────────────────────────────────
let narratorTimer = null;
export function showNarrator(msg, duration = 3000) {
  const box = $('narratorBox');
  if (!box) return;
  if (narratorTimer) clearTimeout(narratorTimer);
  box.textContent = '"' + msg + '"';
  box.classList.add('show');
  narratorTimer = setTimeout(() => box.classList.remove('show'), duration);
}

// ─── Phase banner (boss) ─────────────────────────────────────────────────────
export function showPhaseBanner(title, sub, duration = 1800) {
  const banner = $('phaseBanner');
  if (!banner) return;
  $('phaseBannerTitle').textContent = title;
  $('phaseBannerSub').textContent   = sub;
  banner.classList.add('show');
  setTimeout(() => banner.classList.remove('show'), duration);
}

// ─── Level-up overlay ────────────────────────────────────────────────────────
import { STAT_GROWTH } from '../data/catalog.js';

export function showLevelUpOverlay(newLevel, unlockMsg) {
  $('lvOverlayNum').textContent = 'Niveau ' + newLevel;
  const grid = $('statGainsGrid');
  grid.innerHTML =
    `<div class="stat-gain-item"><span>HP</span>+${STAT_GROWTH.hp}</div>` +
    `<div class="stat-gain-item"><span>ATK</span>+${STAT_GROWTH.atk}</div>` +
    `<div class="stat-gain-item"><span>DEF</span>+${STAT_GROWTH.def}</div>` +
    `<div class="stat-gain-item"><span>VIT</span>+${STAT_GROWTH.spd}</div>`;
  const umsg = $('unlockMsg');
  if (umsg) {
    if (unlockMsg) { umsg.textContent = unlockMsg; umsg.classList.remove('hidden'); }
    else             umsg.classList.add('hidden');
  }
  $('levelupOverlay').classList.add('show');
}

// ─── Particles d'arène ───────────────────────────────────────────────────────
export function spawnArenaParticles(selectedRegion, regions) {
  const container = $('arenaParticles');
  if (!container) return;
  container.innerHTML = '';
  const region = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;
  const colors = region
    ? [region.colorBg.replace('0.12', '0.5'), 'rgba(255,255,255,0.3)']
    : ['rgba(200,245,66,0.4)', 'rgba(232,69,69,0.3)'];
  for (let i = 0; i < 12; i++) {
    const p   = document.createElement('div');
    p.className = 'arena-particle';
    const size = 3 + Math.random() * 5;
    const x    = 10 + Math.random() * 80;
    const tx   = (Math.random() - 0.5) * 60;
    p.style.cssText =
      `left:${x}%;bottom:${5 + Math.random() * 25}%;` +
      `width:${size}px;height:${size}px;` +
      `background:${colors[Math.floor(Math.random() * colors.length)]};` +
      `--dur:${3 + Math.random() * 4}s;--delay:${Math.random() * 4}s;` +
      `--tx:${tx}px;--ty:${-60 - Math.random() * 80}px;`;
    container.appendChild(p);
  }
}

// ─── Stage indicators ────────────────────────────────────────────────────────
export function updateStageIndicators(enemies, currentEnemyIndex) {
  ['selectStageDots', 'battlePips'].forEach(containerId => {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = '';
    enemies.forEach((e, i) => {
      const dot = document.createElement('div');
      dot.className =
        'stage-dot' +
        (i < currentEnemyIndex  ? ' done' :
         i === currentEnemyIndex ? ' current' : '');
      if (e.isBoss) dot.classList.add('boss');
      dot.title = e.name;
      container.appendChild(dot);
    });
  });
}

// ─── Dialogue système ────────────────────────────────────────────────────────
export const dlgState = {
  lines: [], current: 0, typing: false, typeInterval: null,
  onComplete: null, canAdvance: false,
};

export function openDialogue(villainId, heroId, heroes, allEnemies, selectedRegion, regions, onComplete, dialogues) {
  const dlg = dialogues[villainId];
  const lines = (dlg && dlg.hero && dlg.hero[heroId]) ? dlg.hero[heroId] : null;
  if (!lines || lines.length === 0) { onComplete(); return; }

  const hero    = heroes[heroId];
  const villain = allEnemies[villainId];
  if (!hero || !villain) { onComplete(); return; }

  dlgState.lines      = lines.map(l => ({ ...l }));
  dlgState.current    = 0;
  dlgState.onComplete = onComplete;
  dlgState.canAdvance = false;

  $('dlgHeroSprite').innerHTML    = `<img src="../sprite/${hero.sprite}.png" alt="${hero.name}"/>`;
  $('dlgVillainSprite').innerHTML = `<img src="../sprite/${villain.sprite}.png" alt="${villain.name}"/>`;
  $('dlgHeroName').textContent    = hero.name.toUpperCase();
  $('dlgVillainName').textContent = villain.name.toUpperCase();

  const regionIdx = selectedRegion ? regions.findIndex(r => r.id === selectedRegion) : -1;
  const region    = regionIdx >= 0 ? regions[regionIdx] : null;
  $('dlgStageLabel').textContent = region ? `${region.icon} ${region.name}` : '⚔ COMBAT';

  renderDlgPips();
  $('dialogueOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  showDlgLine(0, heroes, allEnemies);
}

function renderDlgPips() {
  const container = $('dlgPips');
  if (!container) return;
  container.innerHTML = '';
  dlgState.lines.forEach((_, i) => {
    const pip = document.createElement('div');
    pip.className = 'dlg-pip' + (i === 0 ? ' active' : '');
    pip.id = `dlg-pip-${i}`;
    container.appendChild(pip);
  });
}

function updateDlgPips(idx) {
  dlgState.lines.forEach((_, i) => {
    const pip = $(`dlg-pip-${i}`);
    if (pip) pip.className = 'dlg-pip' + (i < idx ? ' done' : i === idx ? ' active' : '');
  });
}

function showDlgLine(idx, heroes, allEnemies) {
  if (idx >= dlgState.lines.length) { closeDlgAndStart(); return; }
  const line = dlgState.lines[idx];
  dlgState.current    = idx;
  dlgState.typing     = true;
  dlgState.canAdvance = false;

  const speakerEl = $('dlgSpeaker');
  const textEl    = $('dlgText');
  const hint      = $('dlgHint');
  const box       = $('dlgBox');
  hint.classList.remove('visible');

  const heroKeys = Object.keys(heroes);
  const isHero   = heroKeys.includes(line.speaker);
  const speakerChar = isHero
    ? heroes[line.speaker]
    : (allEnemies[line.speaker] || null);
  speakerEl.textContent = speakerChar ? speakerChar.name.toUpperCase() : line.speaker.toUpperCase();
  box.className = 'dlg-box' + (isHero ? '' : ' villain-speaking');
  $('dlgHeroChar').className    = 'dlg-character hero'    + (isHero  ? '' : ' dim');
  $('dlgVillainChar').className = 'dlg-character villain' + (!isHero ? '' : ' dim');
  updateDlgPips(idx);

  if (dlgState.typeInterval) clearInterval(dlgState.typeInterval);
  let charIdx = 0;
  const fullText = line.text;
  textEl.innerHTML = '';
  dlgState.typeInterval = setInterval(() => {
    if (charIdx < fullText.length) {
      textEl.innerHTML = fullText.substring(0, ++charIdx) + '<span class="dlg-cursor"></span>';
    } else {
      clearInterval(dlgState.typeInterval);
      dlgState.typing     = false;
      dlgState.canAdvance = true;
      textEl.innerHTML    = fullText;
      hint.classList.add('visible');
    }
  }, 28);
}

export function advanceDlg(heroes, allEnemies) {
  if (dlgState.typing) {
    clearInterval(dlgState.typeInterval);
    dlgState.typing     = false;
    dlgState.canAdvance = true;
    $('dlgText').innerHTML = dlgState.lines[dlgState.current].text;
    $('dlgHint').classList.add('visible');
    return;
  }
  if (!dlgState.canAdvance) return;
  showDlgLine(dlgState.current + 1, heroes, allEnemies);
}

export function skipDialogue() {
  if (dlgState.typeInterval) clearInterval(dlgState.typeInterval);
  closeDlgAndStart();
}

function closeDlgAndStart() {
  $('dialogueOverlay').classList.remove('show');
  document.body.style.overflow = '';
  if (dlgState.onComplete) {
    const cb = dlgState.onComplete;
    dlgState.onComplete = null;
    setTimeout(cb, 120);
  }
}

// ─── Carte du monde ──────────────────────────────────────────────────────────
export function updateMapProgressLabel(regions, progress) {
  const completed = regions.filter(r => progress[r.id] && progress[r.id].completed).length;
  const el = $('mapProgressLabel');
  if (!el) return;
  if      (completed === 0)               el.textContent = 'Sélectionne une région pour commencer ton épopée';
  else if (completed === regions.length)  el.textContent = '🏆 Épopée complète ! Tu es le Champion de la Cantine !';
  else                                    el.textContent = `${completed} / ${regions.length} régions maîtrisées — continue ton épopée`;
}

// ─── Profile UI ──────────────────────────────────────────────────────────────
import { getXpProgress } from '../engine/player.js';

export function updateProfileUI(player, selectedHero, heroes, getXpForLevel) {
  $('profileGold') && ($('profileGold').textContent = player.gold + ' 🪙');
  $('profileLevel') && ($('profileLevel').textContent = 'LV.' + player.level);
  const bar = $('xpBar');
  if (bar) bar.style.width = getXpProgress() + '%';
  const xpEl = $('xpLabel');
  if (xpEl) xpEl.textContent = player.xp + ' / ' + getXpForLevel(player.level) + ' XP';
  const sp = $('skillPointsBadge');
  if (sp) {
    sp.textContent = player.skillPoints > 0 ? '✨ ' + player.skillPoints + ' pts' : '';
    sp.style.display = player.skillPoints > 0 ? 'inline-block' : 'none';
  }
  // Nom du héros sélectionné
  const heroName = $('selectedHeroName');
  if (heroName && selectedHero && heroes[selectedHero]) {
    heroName.textContent = heroes[selectedHero].name;
  }
}
