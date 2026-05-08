// ============================================================
// ui/dom.js — Utilitaires DOM corrigés pour matcher le HTML
// ============================================================

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export function $(id)   { return document.getElementById(id); }
export function $$(sel) { return document.querySelectorAll(sel); }

// ─── Navigation ──────────────────────────────────────────────────────────────
const ALL_SCREENS = ['map','select','shop','skills','loadout','battle','victory'];

export function showScreen(name) {
  const displayName = (name === 'select') ? 'map' : name;
  ALL_SCREENS.forEach(s => {
    const el = $('screen-' + s);
    if (el) el.style.display = 'none';
  });
  const tabs = $('screenTabs'), profile = $('playerProfile'), lvBanner = $('levelupBanner');
  ['map','shop','skills','loadout'].forEach(t => { const b = $('tab-'+t); if(b) b.classList.remove('active'); });
  if (['map','select','shop','skills','loadout'].includes(displayName)) {
    if (tabs) tabs.style.display = ''; if (profile) profile.style.display = ''; if (lvBanner) lvBanner.style.display = '';
    const btn = $('tab-' + displayName); if (btn) btn.classList.add('active');
  } else {
    if (tabs) tabs.style.display = 'none'; if (profile) profile.style.display = 'none';
  }
  const el = $('screen-' + displayName); if (el) el.style.display = 'block';
}

export function switchTab(name) { showScreen(name); }

// ─── Toast ───────────────────────────────────────────────────────────────────
let toastTimer = null;
export function showToast(msg, type = 'info') {
  const t = $('toast'); if (!t) return;
  if (toastTimer) clearTimeout(toastTimer);
  t.textContent = msg; t.className = 'toast ' + type;
  void t.offsetWidth; t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Combat log ──────────────────────────────────────────────────────────────
export function clearLog() { const l = $('battleLog'); if (l) l.innerHTML = ''; }
export function addLog(msg, cls = '') {
  const log = $('battleLog'); if (!log) return;
  const d = document.createElement('div'); d.className = 'log-line ' + cls; d.textContent = msg;
  log.appendChild(d); log.scrollTop = log.scrollHeight;
}

// ─── Animations ──────────────────────────────────────────────────────────────
export function anim(id, cls, ms = 500) {
  const el = $(id); if (!el) return; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms);
}

export function spawnDmg(id, val, type) {
  const wrap = $(id); if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'dmg-float' + (type==='crit'?' crit':type==='heal'?' heal':type==='miss'?' miss':'');
  el.textContent = type==='miss'?'ESQUIVÉ':type==='heal'?'+'+val:'-'+val;
  wrap.appendChild(el); setTimeout(() => el.remove(), 1000);
  if (type !== 'miss' && type !== 'heal') {
    const r = document.createElement('div'); r.className = 'impact-ripple';
    r.style.cssText = `border-color:${type==='crit'?'rgba(245,166,35,0.8)':'rgba(255,255,255,0.5)'};width:${type==='crit'?'80px':'60px'};height:${type==='crit'?'80px':'60px'};`;
    wrap.appendChild(r); setTimeout(() => r.remove(), 500);
  }
}

// ─── Narrateur & bannière ────────────────────────────────────────────────────
let narratorTimer = null;
export function showNarrator(msg, duration = 3000) {
  const box = $('narratorBox'); if (!box) return;
  if (narratorTimer) clearTimeout(narratorTimer);
  box.textContent = '"' + msg + '"'; box.classList.add('show');
  narratorTimer = setTimeout(() => box.classList.remove('show'), duration);
}

export function showPhaseBanner(title, sub, duration = 1800) {
  const banner = $('phaseBanner'); if (!banner) return;
  $('phaseBannerTitle').textContent = title; $('phaseBannerSub').textContent = sub;
  banner.classList.add('show'); setTimeout(() => banner.classList.remove('show'), duration);
}

// ─── Level-up overlay ────────────────────────────────────────────────────────
import { STAT_GROWTH } from '../data/catalog.js';

export function showLevelUpOverlay(newLevel, unlockMsg) {
  const lvEl = $('lvOverlayNum'); if (lvEl) lvEl.textContent = 'Niveau ' + newLevel;
  const grid = $('statGainsGrid');
  if (grid) grid.innerHTML = `<div class="stat-gain-item"><span>HP</span>+${STAT_GROWTH.hp}</div><div class="stat-gain-item"><span>ATK</span>+${STAT_GROWTH.atk}</div><div class="stat-gain-item"><span>DEF</span>+${STAT_GROWTH.def}</div><div class="stat-gain-item"><span>VIT</span>+${STAT_GROWTH.spd}</div>`;
  const umsg = $('unlockMsg');
  if (umsg) { if (unlockMsg) { umsg.textContent = unlockMsg; umsg.classList.remove('hidden'); } else umsg.classList.add('hidden'); }
  const overlay = $('levelupOverlay'); if (overlay) overlay.classList.add('show');
}

// ─── Particules arène ────────────────────────────────────────────────────────
export function spawnArenaParticles(selectedRegion, regions) {
  const container = $('arenaParticles'); if (!container) return;
  container.innerHTML = '';
  const region = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;
  const colors = region ? [region.colorBg.replace('0.12','0.5'),'rgba(255,255,255,0.3)'] : ['rgba(200,245,66,0.4)','rgba(232,69,69,0.3)'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div'); p.className = 'arena-particle';
    const size = 3+Math.random()*5, x = 10+Math.random()*80, tx = (Math.random()-0.5)*60;
    p.style.cssText = `left:${x}%;bottom:${5+Math.random()*25}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};--dur:${3+Math.random()*4}s;--delay:${Math.random()*4}s;--tx:${tx}px;--ty:${-60-Math.random()*80}px;`;
    container.appendChild(p);
  }
}

// ─── Stage indicators ────────────────────────────────────────────────────────
export function updateStageIndicators(enemies, currentEnemyIndex) {
  if (!enemies || !enemies.length) return;
  const pipsContainer = $('battlePips');
  if (pipsContainer) {
    pipsContainer.innerHTML = '';
    enemies.forEach((e, i) => {
      const pip = document.createElement('div');
      pip.className = 'stage-pip ' + (i < currentEnemyIndex ? 'done' : i === currentEnemyIndex ? 'active' : 'locked');
      pip.id = `pip-${i}`; pipsContainer.appendChild(pip);
    });
  }
  enemies.forEach((e, i) => {
    const dot = $(`stage-dot-${i}`), conn = $(`stage-conn-${i}`);
    const cls = i < currentEnemyIndex ? 'done' : i === currentEnemyIndex ? 'active' : 'locked';
    if (dot) dot.className = 'stage-dot ' + cls;
    if (conn) conn.className = 'stage-connector' + (i < currentEnemyIndex ? ' done' : '');
  });
  const stageText = $('battleStageText');
  if (stageText && enemies[currentEnemyIndex]) {
    const e = enemies[currentEnemyIndex];
    stageText.textContent = e.isBoss ? `💀 BOSS FINAL — ${e.name}` : `⚔ ÉTAPE ${currentEnemyIndex+1}/${enemies.length} — ${e.name}`;
  }
}

// ─── Map progress label ──────────────────────────────────────────────────────
export function updateMapProgressLabel(regions, progress) {
  const completed = regions.filter(r => progress[r.id] && progress[r.id].completed).length;
  const el = $('mapProgressLabel'); if (!el) return;
  if (completed === 0) el.textContent = 'Sélectionne une région pour commencer ton épopée';
  else if (completed === regions.length) el.textContent = '🏆 Épopée complète ! Tu es le Champion de la Cantine !';
  else el.textContent = `${completed} / ${regions.length} régions maîtrisées — continue ton épopée`;
}

// ─── Profile UI ──────────────────────────────────────────────────────────────
import { getXpProgress } from '../engine/player.js';

export function updateProfileUI(player, selectedHero, heroes, getXpForLevel) {
  const b = $('profileLevelBadge'); if (b) b.textContent = 'LV.' + player.level;
  const g = $('profileGold'); if (g) g.textContent = player.gold;
  const tx = $('profileTotalXp'); if (tx) tx.textContent = player.totalXp;
  const sp = $('profileSp'); if (sp) sp.textContent = player.skillPoints;
  const fill = $('profileXpFill');
  if (fill) fill.style.width = getXpProgress() + '%';
  const xpLabel = $('profileXpLabel');
  if (xpLabel) {
    const prev = player.level > 1 ? (getXpForLevel(player.level-1)||0) : 0;
    const next = getXpForLevel(player.level)||1;
    xpLabel.textContent = (player.xp-prev) + ' / ' + (next-prev) + ' XP';
  }
  const heroNames = {fraise:'Fraise',poire:'Poire',patate:'Patate Hongroise'};
  const heroIcons = {fraise:'🍓',poire:'🍐',patate:'🥔'};
  const pn = $('profileName'), pa = $('profileAvatar');
  if (selectedHero && heroes && heroes[selectedHero]) {
    if (pn) pn.textContent = heroNames[selectedHero]||heroes[selectedHero].name;
    if (pa) pa.textContent = heroIcons[selectedHero]||'⚔';
  } else {
    if (pn) pn.textContent = 'Sélectionne un héros';
    if (pa) pa.textContent = '⚔';
  }
  const spA = $('spAvailDisplay'); if (spA) spA.textContent = player.skillPoints;
  const spT = $('spTotalDisplay'); if (spT) spT.textContent = (player.skillPointsSpent||0) + ' dépensés au total';
}

// ─── Dialogue ────────────────────────────────────────────────────────────────
export const dlgState = {
  lines:[], current:0, typing:false, typeInterval:null,
  onComplete:null, canAdvance:false, heroes:null, allEnemies:null,
};

export function openDialogue(villainId, heroId, heroes, allEnemies, selectedRegion, regions, onComplete, dialogues) {
  const dlg = dialogues[villainId];
  const lines = (dlg && dlg.hero && dlg.hero[heroId]) ? dlg.hero[heroId] : null;
  if (!lines || !lines.length) { onComplete(); return; }
  const hero = heroes[heroId], villain = allEnemies[villainId];
  if (!hero || !villain) { onComplete(); return; }
  dlgState.lines = lines.map(l => ({...l})); dlgState.current = 0;
  dlgState.onComplete = onComplete; dlgState.canAdvance = false;
  dlgState.heroes = heroes; dlgState.allEnemies = allEnemies;
  $('dlgHeroSprite').innerHTML    = `<img src="../sprite/${hero.sprite}.png" alt="${hero.name}"/>`;
  $('dlgVillainSprite').innerHTML = `<img src="../sprite/${villain.sprite}.png" alt="${villain.name}"/>`;
  $('dlgHeroName').textContent    = hero.name.toUpperCase();
  $('dlgVillainName').textContent = villain.name.toUpperCase();
  const ri = selectedRegion ? regions.findIndex(r => r.id === selectedRegion) : -1;
  const reg = ri >= 0 ? regions[ri] : null;
  $('dlgStageLabel').textContent = reg ? `${reg.icon} ${reg.name}` : '⚔ COMBAT';
  _renderDlgPips(); $('dialogueOverlay').classList.add('show'); document.body.style.overflow = 'hidden';
  _showDlgLine(0);
}

function _renderDlgPips() {
  const c = $('dlgPips'); if (!c) return; c.innerHTML = '';
  dlgState.lines.forEach((_,i) => { const p = document.createElement('div'); p.className = 'dlg-pip'+(i===0?' active':''); p.id=`dlg-pip-${i}`; c.appendChild(p); });
}

function _updateDlgPips(idx) {
  dlgState.lines.forEach((_,i) => { const p = $(`dlg-pip-${i}`); if(p) p.className = 'dlg-pip'+(i<idx?' done':i===idx?' active':''); });
}

function _showDlgLine(idx) {
  if (idx >= dlgState.lines.length) { _closeDlgAndStart(); return; }
  const line = dlgState.lines[idx];
  dlgState.current = idx; dlgState.typing = true; dlgState.canAdvance = false;
  const speakerEl=$('dlgSpeaker'), textEl=$('dlgText'), hint=$('dlgHint'), box=$('dlgBox');
  if (hint) hint.classList.remove('visible');
  const heroes = dlgState.heroes||{}, allEnemies = dlgState.allEnemies||{};
  const isHero = Object.keys(heroes).includes(line.speaker);
  const sc = isHero ? heroes[line.speaker] : (allEnemies[line.speaker]||null);
  if (speakerEl) speakerEl.textContent = sc ? sc.name.toUpperCase() : line.speaker.toUpperCase();
  if (box) box.className = 'dlg-box'+(isHero?'':' villain-speaking');
  const hc=$('dlgHeroChar'), vc=$('dlgVillainChar');
  if (hc) hc.className = 'dlg-character hero'+(isHero?'':' dim');
  if (vc) vc.className = 'dlg-character villain'+(!isHero?'':' dim');
  _updateDlgPips(idx);
  if (dlgState.typeInterval) clearInterval(dlgState.typeInterval);
  let ci = 0; const ft = line.text; if (textEl) textEl.innerHTML = '';
  dlgState.typeInterval = setInterval(() => {
    if (ci < ft.length) { if (textEl) textEl.innerHTML = ft.substring(0,++ci)+'<span class="dlg-cursor"></span>'; }
    else { clearInterval(dlgState.typeInterval); dlgState.typing=false; dlgState.canAdvance=true; if(textEl)textEl.innerHTML=ft; if(hint)hint.classList.add('visible'); }
  }, 28);
}

export function advanceDlg(heroes, allEnemies) {
  if (dlgState.typing) {
    clearInterval(dlgState.typeInterval); dlgState.typing=false; dlgState.canAdvance=true;
    const t=$('dlgText'); if(t)t.innerHTML=dlgState.lines[dlgState.current].text;
    const h=$('dlgHint'); if(h)h.classList.add('visible'); return;
  }
  if (!dlgState.canAdvance) return;
  _showDlgLine(dlgState.current+1);
}

export function skipDialogue() { if(dlgState.typeInterval)clearInterval(dlgState.typeInterval); _closeDlgAndStart(); }

function _closeDlgAndStart() {
  $('dialogueOverlay').classList.remove('show'); document.body.style.overflow='';
  if (dlgState.onComplete) { const cb=dlgState.onComplete; dlgState.onComplete=null; setTimeout(cb,120); }
}
