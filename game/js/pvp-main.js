// ============================================================
// pvp-main.js — Orchestration du mode PvP en ligne
// ============================================================
import { HEROES } from './data/characters.js';
import { player, selectedHero, getLevelStats, getLoadout } from './engine/player.js';
import { calcDmg, isCrit, getAttacks } from './engine/battle.js';
import {
  pvp, isPvpActive, isPvpMyTurn,
  createDuel, joinDuel, confirmStart,
  submitAction, declareWinner,
  listenDuel, cleanupPvp, forfeitDuel,
  getMyData, getOppData, isConnected,
} from './engine/pvp.js';

// ─── Raccourci DOM ───────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── État local du combat PvP ────────────────────────────────────────────────
let pvpState = {
  myHp: 0, myMaxHp: 0, mySpecial: 0,
  oppHp: 0, oppMaxHp: 0, oppSpecial: 0,
  attackCooldowns: {},
  lastActionTs: 0,
  waitingForOpp: false,
  battleOver: false,
};

// ─── Initialisation de l'onglet PvP ─────────────────────────────────────────

export function initPvpTab() {
  renderPvpLobby();
}

// ─── Rendu du lobby ──────────────────────────────────────────────────────────

function renderPvpLobby() {
  const wrap = $('pvpScreen');
  if (!wrap) return;

  const connected = isConnected();
  const heroSel   = selectedHero && HEROES[selectedHero];

  wrap.innerHTML = `
    <div style="max-width:540px;margin:0 auto;padding:1.5rem 1rem;">
      <div style="font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;margin-bottom:0.3rem;">⚔️ Duel en ligne</div>
      <div style="font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--muted);letter-spacing:0.08em;margin-bottom:1.5rem;">AFFRONTEZ UN AUTRE JOUEUR EN TEMPS RÉEL</div>

      ${!connected ? `
        <div style="background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);border-radius:8px;padding:1rem;font-family:'DM Mono',monospace;font-size:0.75rem;color:#f87171;margin-bottom:1.2rem;">
          ⚠️ Tu dois être <a href="../connexion.html" style="color:var(--accent);text-decoration:underline;">connecté</a> pour jouer en ligne.
        </div>
      ` : ''}

      ${!heroSel ? `
        <div style="background:rgba(255,200,0,0.1);border:1px solid rgba(255,200,0,0.3);border-radius:8px;padding:1rem;font-family:'DM Mono',monospace;font-size:0.75rem;color:#fde68a;margin-bottom:1.2rem;">
          ⚠️ Sélectionne d'abord un héros dans l'onglet Carte.
        </div>
      ` : `
        <div style="display:flex;align-items:center;gap:0.8rem;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.8rem 1rem;margin-bottom:1.5rem;">
          <img src="../sprite/${heroSel.sprite}.png" alt="${heroSel.name}" style="width:44px;height:44px;object-fit:contain;border-radius:4px;"/>
          <div>
            <div style="font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;">${heroSel.name}</div>
            <div style="font-family:'DM Mono',monospace;font-size:0.62rem;color:var(--muted);">LV.${player.level} · ATK ${getLevelStats(heroSel).atk} · DEF ${getLevelStats(heroSel).def} · HP ${getLevelStats(heroSel).hp}</div>
          </div>
          <div style="margin-left:auto;font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--accent2);border:1px solid var(--accent2);border-radius:4px;padding:0.2rem 0.5rem;">Prêt</div>
        </div>
      `}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:1.5rem;">

        <!-- CRÉER UN DUEL -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1.2rem;display:flex;flex-direction:column;gap:0.7rem;">
          <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;">🎯 Créer un duel</div>
          <div style="font-family:'DM Mono',monospace;font-size:0.62rem;color:var(--muted);">Génère un code et partage-le à ton adversaire.</div>
          <button id="btnCreateDuel" class="rdp-enter-btn" style="margin:0;padding:0.6rem;font-size:0.8rem;${!connected||!heroSel?'opacity:0.4;cursor:not-allowed;':''}"
            ${!connected||!heroSel?'disabled':''}>
            Créer un duel
          </button>
        </div>

        <!-- REJOINDRE UN DUEL -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1.2rem;display:flex;flex-direction:column;gap:0.7rem;">
          <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;">🔗 Rejoindre</div>
          <div style="font-family:'DM Mono',monospace;font-size:0.62rem;color:var(--muted);">Entre le code donné par l'hôte.</div>
          <input id="pvpCodeInput" placeholder="Ex: AB3K9Z" maxlength="6"
            style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:0.5rem 0.7rem;font-family:'DM Mono',monospace;font-size:0.85rem;color:var(--fg);text-transform:uppercase;letter-spacing:0.12em;width:100%;box-sizing:border-box;"
            ${!connected||!heroSel?'disabled':''} />
          <button id="btnJoinDuel" class="rdp-enter-btn" style="margin:0;padding:0.6rem;font-size:0.8rem;background:var(--surface2);border:1px solid var(--accent3);color:var(--accent3);${!connected||!heroSel?'opacity:0.4;cursor:not-allowed;':''}"
            ${!connected||!heroSel?'disabled':''}>
            Rejoindre
          </button>
        </div>

      </div>

      <!-- ZONE DE STATUT / CODE -->
      <div id="pvpStatusZone" style="min-height:80px;"></div>

    </div>
  `;

  $('btnCreateDuel')?.addEventListener('click', handleCreateDuel);
  $('btnJoinDuel')?.addEventListener('click', handleJoinDuel);
  $('pvpCodeInput')?.addEventListener('input', e => {
    e.target.value = e.target.value.toUpperCase();
  });
}

// ─── Créer un duel ───────────────────────────────────────────────────────────

async function handleCreateDuel() {
  const hero  = HEROES[selectedHero];
  const stats = getLevelStats(hero);
  const hp    = stats.hp;
  const loadout = getLoadout();

  const btn = $('btnCreateDuel');
  btn.disabled = true;
  btn.textContent = 'Création…';

  try {
    const { code } = await createDuel(selectedHero, stats, hp, loadout);
    showWaitingRoom(code);
  } catch (e) {
    showPvpError(e.message);
    btn.disabled = false;
    btn.textContent = 'Créer un duel';
  }
}

// ─── Rejoindre un duel ───────────────────────────────────────────────────────

async function handleJoinDuel() {
  const code = $('pvpCodeInput')?.value?.trim();
  if (!code || code.length < 6) { showPvpError('Entre un code à 6 caractères.'); return; }

  const hero  = HEROES[selectedHero];
  const stats = getLevelStats(hero);
  const hp    = stats.hp;
  const loadout = getLoadout();

  const btn = $('btnJoinDuel');
  btn.disabled = true;
  btn.textContent = 'Connexion…';

  try {
    await joinDuel(code, selectedHero, stats, hp, loadout);
    // Écouter le duel et attendre la confirmation de l'hôte
    listenDuel(data => handleDuelSnapshot(data));
    showJoiningRoom(code);
  } catch (e) {
    showPvpError(e.message);
    btn.disabled = false;
    btn.textContent = 'Rejoindre';
  }
}

// ─── Salle d'attente (hôte) ─────────────────────────────────────────────────

function showWaitingRoom(code) {
  const zone = $('pvpStatusZone');
  if (!zone) return;

  zone.innerHTML = `
    <div style="background:rgba(200,245,66,0.07);border:1px solid rgba(200,245,66,0.25);border-radius:10px;padding:1.2rem;text-align:center;">
      <div style="font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--muted);letter-spacing:0.1em;margin-bottom:0.5rem;">CODE DE DUEL</div>
      <div id="pvpCodeDisplay" style="font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;letter-spacing:0.25em;color:var(--accent);margin-bottom:0.4rem;">${code}</div>
      <div style="font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--muted);margin-bottom:1rem;">Partage ce code à ton adversaire</div>
      <div id="pvpWaitMsg" style="font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--muted);">⏳ En attente d'un adversaire…</div>
      <button id="btnStartDuel" style="display:none;margin-top:0.8rem;" class="rdp-enter-btn">⚡ Lancer le combat !</button>
      <button id="btnCancelDuel" style="margin-top:0.6rem;background:none;border:1px solid var(--border);color:var(--muted);border-radius:6px;padding:0.4rem 1rem;font-family:'DM Mono',monospace;font-size:0.68rem;cursor:pointer;">Annuler</button>
    </div>
  `;

  $('btnCancelDuel')?.addEventListener('click', async () => {
    await forfeitDuel();
    renderPvpLobby();
  });

  $('btnStartDuel')?.addEventListener('click', async () => {
    await confirmStart();
  });

  // Copier le code au clic
  $('pvpCodeDisplay')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(code).then(() => {
      const el = $('pvpCodeDisplay');
      el.style.color = 'var(--accent2)';
      setTimeout(() => { el.style.color = 'var(--accent)'; }, 1000);
    });
  });

  // Écouter le duel
  listenDuel(data => {
    handleDuelSnapshot(data);
    // Mettre à jour la salle d'attente si guest vient d'arriver
    if (data.status === 'ready' && pvp.role === 'host') {
      const msg = $('pvpWaitMsg');
      if (msg) msg.innerHTML = `✅ <strong>${data.guest.displayName}</strong> a rejoint le duel !`;
      const btnStart = $('btnStartDuel');
      if (btnStart) btnStart.style.display = 'inline-block';
    }
  });
}

// ─── Salle d'attente (invité) ────────────────────────────────────────────────

function showJoiningRoom(code) {
  const zone = $('pvpStatusZone');
  if (!zone) return;
  zone.innerHTML = `
    <div style="background:rgba(200,245,66,0.07);border:1px solid rgba(200,245,66,0.25);border-radius:10px;padding:1.2rem;text-align:center;">
      <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;margin-bottom:0.3rem;">🤺 Tu rejoins le duel <span style="color:var(--accent);letter-spacing:0.15em;">${code}</span></div>
      <div id="pvpWaitMsg" style="font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--muted);margin-top:0.5rem;">⏳ En attente que l'hôte lance le combat…</div>
      <button id="btnCancelDuel" style="margin-top:0.8rem;background:none;border:1px solid var(--border);color:var(--muted);border-radius:6px;padding:0.4rem 1rem;font-family:'DM Mono',monospace;font-size:0.68rem;cursor:pointer;">Abandonner</button>
    </div>
  `;
  $('btnCancelDuel')?.addEventListener('click', async () => {
    await forfeitDuel();
    renderPvpLobby();
  });
}

// ─── Snapshot handler ────────────────────────────────────────────────────────

function handleDuelSnapshot(data) {
  if (!data) return;

  if (data.status === 'active') {
    // Première fois qu'on passe à active → démarrer le combat
    if (!$('pvpBattleArena')) {
      startPvpBattle(data);
    } else {
      // Mise à jour en cours de combat
      updatePvpBattle(data);
    }
  }

  if (data.status === 'finished') {
    endPvpBattle(data);
  }
}

// ─── Démarrer le combat PvP ──────────────────────────────────────────────────

function startPvpBattle(data) {
  const me  = data[pvp.role];
  const opp = data[pvp.opponentRole];

  pvpState.myHp       = me.hp;
  pvpState.myMaxHp    = me.maxHp;
  pvpState.mySpecial  = 0;
  pvpState.oppHp      = opp.hp;
  pvpState.oppMaxHp   = opp.maxHp;
  pvpState.oppSpecial = 0;
  pvpState.attackCooldowns = {};
  pvpState.battleOver = false;

  renderPvpArena(data);
}

// ─── Rendu de l'arène PvP ────────────────────────────────────────────────────

function renderPvpArena(data) {
  const wrap = $('pvpScreen');
  if (!wrap) return;

  const me  = data[pvp.role];
  const opp = data[pvp.opponentRole];
  const myHero  = HEROES[me.heroId]  || {};
  const oppHero = HEROES[opp.heroId] || {};

  wrap.innerHTML = `
    <div id="pvpBattleArena" style="max-width:600px;margin:0 auto;padding:1rem;">

      <!-- HEADER -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;">
        <div style="font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--muted);">⚔️ DUEL EN LIGNE</div>
        <div id="pvpTurnLabel" style="font-family:'DM Mono',monospace;font-size:0.68rem;padding:0.2rem 0.6rem;border-radius:4px;border:1px solid var(--accent);color:var(--accent);">
          ${pvp.myTurn ? '⚡ Ton tour' : '⏳ Tour de l\'adversaire'}
        </div>
        <button onclick="window.__pvpForfeit && window.__pvpForfeit()" style="background:none;border:1px solid var(--border);color:var(--muted);border-radius:6px;padding:0.2rem 0.6rem;font-family:'DM Mono',monospace;font-size:0.62rem;cursor:pointer;">🏳 Abandon</button>
      </div>

      <!-- FIGHTERS -->
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:0.5rem;align-items:center;margin-bottom:1rem;">

        <!-- MOI -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:0.8rem;text-align:center;">
          <div style="font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--accent2);margin-bottom:0.3rem;">TOI</div>
          <img src="../sprite/${myHero.sprite || 'default'}.png" alt="${myHero.name || 'Hero'}" style="width:52px;height:52px;object-fit:contain;" />
          <div style="font-family:'Playfair Display',serif;font-size:0.85rem;font-weight:700;margin-top:0.3rem;">${me.displayName}</div>
          <div style="font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--muted);">${myHero.name || ''}</div>
          <!-- HP bar -->
          <div style="margin-top:0.5rem;">
            <div style="display:flex;justify-content:space-between;font-family:'DM Mono',monospace;font-size:0.6rem;margin-bottom:2px;">
              <span style="color:var(--hp-red);">HP</span>
              <span id="pvpMyHpTxt">${pvpState.myHp}/${pvpState.myMaxHp}</span>
            </div>
            <div style="height:6px;background:var(--surface);border-radius:3px;overflow:hidden;">
              <div id="pvpMyHpBar" style="height:100%;background:linear-gradient(90deg,#ef4444,#f97316);border-radius:3px;transition:width 0.4s;width:${Math.max(0,(pvpState.myHp/pvpState.myMaxHp)*100)}%;"></div>
            </div>
          </div>
          <!-- Special bar -->
          <div style="margin-top:0.3rem;">
            <div style="display:flex;justify-content:space-between;font-family:'DM Mono',monospace;font-size:0.55rem;margin-bottom:2px;color:var(--muted);">
              <span>⚡ SPÉCIAL</span><span id="pvpMySpTxt">${pvpState.mySpecial}%</span>
            </div>
            <div style="height:4px;background:var(--surface);border-radius:2px;overflow:hidden;">
              <div id="pvpMySpBar" style="height:100%;background:linear-gradient(90deg,#a855f7,#7c3aed);border-radius:2px;transition:width 0.4s;width:${pvpState.mySpecial}%;"></div>
            </div>
          </div>
        </div>

        <div style="font-size:1.4rem;text-align:center;">VS</div>

        <!-- ADVERSAIRE -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:0.8rem;text-align:center;">
          <div style="font-family:'DM Mono',monospace;font-size:0.6rem;color:#f87171;margin-bottom:0.3rem;">ADVERSAIRE</div>
          <img src="../sprite/${oppHero.sprite || 'default'}.png" alt="${oppHero.name || 'Enemy'}" style="width:52px;height:52px;object-fit:contain;" />
          <div style="font-family:'Playfair Display',serif;font-size:0.85rem;font-weight:700;margin-top:0.3rem;">${opp.displayName}</div>
          <div style="font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--muted);">${oppHero.name || ''}</div>
          <!-- HP bar -->
          <div style="margin-top:0.5rem;">
            <div style="display:flex;justify-content:space-between;font-family:'DM Mono',monospace;font-size:0.6rem;margin-bottom:2px;">
              <span style="color:var(--hp-red);">HP</span>
              <span id="pvpOppHpTxt">${pvpState.oppHp}/${pvpState.oppMaxHp}</span>
            </div>
            <div style="height:6px;background:var(--surface);border-radius:3px;overflow:hidden;">
              <div id="pvpOppHpBar" style="height:100%;background:linear-gradient(90deg,#ef4444,#f97316);border-radius:3px;transition:width 0.4s;width:${Math.max(0,(pvpState.oppHp/pvpState.oppMaxHp)*100)}%;"></div>
            </div>
          </div>
          <!-- Special bar -->
          <div style="margin-top:0.3rem;">
            <div style="display:flex;justify-content:space-between;font-family:'DM Mono',monospace;font-size:0.55rem;margin-bottom:2px;color:var(--muted);">
              <span>⚡ SPÉCIAL</span><span id="pvpOppSpTxt">${pvpState.oppSpecial}%</span>
            </div>
            <div style="height:4px;background:var(--surface);border-radius:2px;overflow:hidden;">
              <div id="pvpOppSpBar" style="height:100%;background:linear-gradient(90deg,#a855f7,#7c3aed);border-radius:2px;transition:width 0.4s;width:${pvpState.oppSpecial}%;"></div>
            </div>
          </div>
        </div>

      </div>

      <!-- LOG DE COMBAT -->
      <div id="pvpLog" style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.7rem 1rem;min-height:80px;max-height:130px;overflow-y:auto;font-family:'DM Mono',monospace;font-size:0.68rem;color:var(--muted);margin-bottom:1rem;">
        ${(data.log || []).map(l => `<div>${l}</div>`).join('')}
      </div>

      <!-- ACTIONS -->
      <div id="pvpActions" style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;"></div>

      <!-- MESSAGE ATTENTE -->
      <div id="pvpWaitOverlay" style="display:${pvp.myTurn?'none':'flex'};position:absolute;pointer-events:none;"></div>

    </div>
  `;

  renderPvpActions(me);
  window.__pvpForfeit = async () => {
    if (confirm('Abandonner le duel ?')) {
      await forfeitDuel();
      renderPvpLobby();
    }
  };
}

// ─── Rendu des boutons d'action ──────────────────────────────────────────────

function renderPvpActions(meData) {
  const container = $('pvpActions');
  if (!container) return;

  const myHero    = HEROES[meData.heroId];
  const attacks   = getAttacks(myHero);
  const myLoadout = meData.loadout || ['punch', 'combo', 'defend', 'special'];
  const available = attacks.filter(a => myLoadout.includes(a.id) || a.id === 'special');

  container.innerHTML = '';

  const myTurn = pvp.myTurn;

  available.forEach(atk => {
    const cd = pvpState.attackCooldowns[atk.id] || 0;
    const isSpecial = atk.id === 'special';
    const canUse = myTurn && cd === 0 && (!isSpecial || pvpState.mySpecial >= 100);

    const btn = document.createElement('button');
    btn.style.cssText = `
      background:var(--surface2);border:1px solid ${canUse ? 'var(--border)' : 'rgba(100,100,100,0.2)'};
      border-radius:8px;padding:0.6rem 0.8rem;font-family:'DM Mono',monospace;font-size:0.7rem;
      color:${canUse ? 'var(--fg)' : 'var(--muted)'};cursor:${canUse ? 'pointer' : 'not-allowed'};
      transition:all 0.15s;text-align:left;opacity:${canUse ? 1 : 0.5};
      ${isSpecial && pvpState.mySpecial >= 100 ? 'border-color:var(--accent);box-shadow:0 0 8px rgba(200,245,66,0.3);' : ''}
    `;
    btn.innerHTML = `<span style="font-size:1rem;">${atk.icon}</span> <strong>${atk.name}</strong>${cd > 0 ? ` <span style="color:var(--muted);font-size:0.6rem;">(${cd} tour${cd>1?'s':''})</span>` : ''}`;
    btn.title = atk.desc || '';

    if (canUse) {
      btn.addEventListener('click', () => handlePvpAction(atk));
    }
    container.appendChild(btn);
  });

  // Label de tour
  const label = $('pvpTurnLabel');
  if (label) {
    label.textContent = myTurn ? '⚡ Ton tour' : '⏳ Tour de l\'adversaire';
    label.style.color = myTurn ? 'var(--accent)' : 'var(--muted)';
    label.style.borderColor = myTurn ? 'var(--accent)' : 'var(--border)';
  }
}

// ─── Gérer une action du joueur ──────────────────────────────────────────────

async function handlePvpAction(atk) {
  if (!pvp.myTurn || pvpState.battleOver) return;

  const meSnap  = pvp.duelData?.[pvp.role];
  const oppSnap = pvp.duelData?.[pvp.opponentRole];
  if (!meSnap || !oppSnap) return;

  const myHero  = HEROES[meSnap.heroId];
  const oppHero = HEROES[oppSnap.heroId];
  if (!myHero || !oppHero) return;

  // Simulation locale de l'action
  let result = {};
  let myHpAfter  = pvpState.myHp;
  let oppHpAfter = pvpState.oppHp;
  let mySpAfter  = pvpState.mySpecial;
  let logLine    = '';

  if (atk.id === 'defend') {
    logLine = `🛡️ ${meSnap.displayName} se met en garde !`;
    result  = { type: 'defend' };
    mySpAfter = Math.min(100, mySpAfter + 8);
  } else if (atk.id === 'special') {
    if (pvpState.mySpecial < 100) return;
    const r = myHero.special?.fn(myHero, oppHero) || {};
    const dmg = r.dmg || calcDmg(meSnap.stats.atk, oppSnap.stats.def, 1.8);
    oppHpAfter = Math.max(0, oppHpAfter - dmg);
    mySpAfter  = 0;
    logLine = `⚡ ${meSnap.displayName} déclenche son SPÉCIAL — ${dmg} dégâts !`;
    result  = { type: 'special', dmg };
  } else {
    const r = atk.fn(
      { ...myHero, atk: meSnap.stats.atk },
      { ...oppHero, def: oppSnap.stats.def }
    );
    if (!r) return;
    if (r.miss) {
      logLine = `💨 ${meSnap.displayName} rate son attaque !`;
      result  = { type: 'miss' };
    } else {
      const dmg = r.dmg || 0;
      oppHpAfter = Math.max(0, oppHpAfter - dmg);
      mySpAfter  = Math.min(100, mySpAfter + (r.spBonus || 15));
      if (atk.cooldown > 0) pvpState.attackCooldowns[atk.id] = atk.cooldown;
      logLine = r.log || `${atk.icon} ${meSnap.displayName} attaque — ${dmg} dégâts !`;
      result  = { type: 'attack', dmg, crit: !!r.crit };
    }
  }

  // Mise à jour locale immédiate
  pvpState.myHp      = myHpAfter;
  pvpState.mySpecial = mySpAfter;
  pvpState.oppHp     = oppHpAfter;
  updatePvpBars();

  // Vérifier victoire
  const iWin = oppHpAfter <= 0;
  const iLose = myHpAfter <= 0;

  // Soumettre à Firestore
  await submitAction({
    attackId:      atk.id,
    result,
    myHpAfter,
    mySpecialAfter: mySpAfter,
    oppHpAfter,
    logLine,
  });

  if (iWin)  await declareWinner(pvp.role);
  if (iLose) await declareWinner(pvp.opponentRole);

  // Réduire les cooldowns
  for (const id in pvpState.attackCooldowns) {
    if (pvpState.attackCooldowns[id] > 0) pvpState.attackCooldowns[id]--;
    if (pvpState.attackCooldowns[id] <= 0) delete pvpState.attackCooldowns[id];
  }

  const meUpdated = pvp.duelData?.[pvp.role];
  if (meUpdated) renderPvpActions(meUpdated);
}

// ─── Mise à jour en cours de combat ─────────────────────────────────────────

function updatePvpBattle(data) {
  const me  = data[pvp.role];
  const opp = data[pvp.opponentRole];
  if (!me || !opp) return;

  pvpState.myHp      = me.hp;
  pvpState.mySpecial = me.special ?? pvpState.mySpecial;
  pvpState.oppHp     = opp.hp;
  pvpState.oppSpecial = opp.special ?? pvpState.oppSpecial;

  updatePvpBars();
  updatePvpLog(data.log || []);

  // Si c'est maintenant mon tour
  if (data.turn === pvp.role && !pvpState.battleOver) {
    renderPvpActions(me);
  } else {
    renderPvpActions(me); // désactiver les boutons
  }
}

function updatePvpBars() {
  const pct = v => Math.max(0, Math.min(100, v)) + '%';
  const myPct  = pct((pvpState.myHp  / pvpState.myMaxHp)  * 100);
  const oppPct = pct((pvpState.oppHp / pvpState.oppMaxHp) * 100);

  const el = id => document.getElementById(id);
  if (el('pvpMyHpBar'))  el('pvpMyHpBar').style.width  = myPct;
  if (el('pvpMyHpTxt'))  el('pvpMyHpTxt').textContent  = `${pvpState.myHp}/${pvpState.myMaxHp}`;
  if (el('pvpOppHpBar')) el('pvpOppHpBar').style.width = oppPct;
  if (el('pvpOppHpTxt')) el('pvpOppHpTxt').textContent = `${pvpState.oppHp}/${pvpState.oppMaxHp}`;
  if (el('pvpMySpBar'))  el('pvpMySpBar').style.width  = pvpState.mySpecial + '%';
  if (el('pvpMySpTxt'))  el('pvpMySpTxt').textContent  = pvpState.mySpecial + '%';
}

function updatePvpLog(lines) {
  const log = $('pvpLog');
  if (!log) return;
  log.innerHTML = lines.slice(-20).map(l => `<div>${l}</div>`).join('');
  log.scrollTop = log.scrollHeight;
}

// ─── Fin de combat ───────────────────────────────────────────────────────────

function endPvpBattle(data) {
  if (pvpState.battleOver) return;
  pvpState.battleOver = true;

  const iWon = data.winner === pvp.role;
  const wrap = $('pvpScreen');
  if (!wrap) return;

  wrap.innerHTML = `
    <div style="max-width:480px;margin:0 auto;padding:2rem 1rem;text-align:center;">
      <div style="font-size:4rem;margin-bottom:0.8rem;">${iWon ? '🏆' : '💀'}</div>
      <div style="font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;margin-bottom:0.3rem;">${iWon ? 'Victoire !' : 'Défaite…'}</div>
      <div style="font-family:'DM Mono',monospace;font-size:0.72rem;color:var(--muted);margin-bottom:1.5rem;">
        ${iWon ? 'Tu as triomphé de ton adversaire !' : 'Ton adversaire a été plus fort cette fois.'}
      </div>
      <!-- Log final -->
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.8rem;max-height:150px;overflow-y:auto;font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--muted);text-align:left;margin-bottom:1.5rem;">
        ${(data.log || []).slice(-15).map(l => `<div>${l}</div>`).join('')}
      </div>
      <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;">
        <button id="btnPvpRematch" class="rdp-enter-btn" style="padding:0.7rem 1.5rem;">🔄 Revanche</button>
        <button id="btnPvpBack" style="background:none;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:0.7rem 1.5rem;font-family:'DM Mono',monospace;font-size:0.78rem;cursor:pointer;">← Lobby</button>
      </div>
    </div>
  `;

  cleanupPvp();

  $('btnPvpBack')?.addEventListener('click', () => renderPvpLobby());
  $('btnPvpRematch')?.addEventListener('click', () => renderPvpLobby());
}

// ─── Erreur ──────────────────────────────────────────────────────────────────

function showPvpError(msg) {
  const zone = $('pvpStatusZone');
  if (!zone) return;
  zone.innerHTML = `
    <div style="background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);border-radius:8px;padding:0.8rem 1rem;font-family:'DM Mono',monospace;font-size:0.72rem;color:#f87171;">
      ⚠️ ${msg}
    </div>
  `;
  setTimeout(() => { if (zone) zone.innerHTML = ''; }, 4000);
}
