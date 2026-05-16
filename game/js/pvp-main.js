// ============================================================
// pvp-main.js — Orchestration du mode PvP en ligne (UI améliorée)
// ============================================================
import { HEROES } from './data/characters.js';
import { player, selectedHero, getLevelStats } from './engine/player.js';
import { calcDmg, isCrit, getAttacks, getLoadout } from './engine/battle.js';
import {
  pvp, isPvpActive, isPvpMyTurn,
  createDuel, joinDuel, confirmStart,
  submitAction, declareWinner,
  listenDuel, cleanupPvp, forfeitDuel,
  getMyData, getOppData, isConnected,
} from './engine/pvp.js';

const $ = id => document.getElementById(id);

// ─── Styles PvP injectés une seule fois ─────────────────────────────────────
function injectPvpStyles() {
  if (document.getElementById('pvp-styles')) return;
  const s = document.createElement('style');
  s.id = 'pvp-styles';
  s.textContent = `
    :root {
      --pvp-green:#c8f542;--pvp-red:#f87171;--pvp-sp:#a78bfa;
      --pvp-s1:rgba(255,255,255,0.04);--pvp-s2:rgba(255,255,255,0.08);
      --pvp-b:rgba(255,255,255,0.1);
      --pvp-gme:rgba(200,245,66,0.15);--pvp-gopp:rgba(248,113,113,0.15);
    }
    .pvp-lobby{max-width:520px;margin:0 auto;padding:2rem 1.2rem}
    .pvp-lobby-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;margin-bottom:.2rem}
    .pvp-lobby-sub{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:2rem}
    .pvp-hero-card{display:flex;align-items:center;gap:1rem;background:var(--pvp-s2);border:1px solid var(--pvp-b);border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.8rem}
    .pvp-hero-card img{width:52px;height:52px;object-fit:contain;border-radius:8px}
    .pvp-hn{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700}
    .pvp-hs{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);margin-top:2px}
    .pvp-ready{margin-left:auto;font-family:'DM Mono',monospace;font-size:.6rem;color:var(--pvp-green);border:1px solid rgba(200,245,66,.35);border-radius:5px;padding:.22rem .6rem}
    .pvp-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}
    .pvp-panel{background:var(--pvp-s2);border:1px solid var(--pvp-b);border-radius:14px;padding:1.3rem;display:flex;flex-direction:column;gap:.75rem}
    .pvp-pt{font-family:'Playfair Display',serif;font-size:.98rem;font-weight:700}
    .pvp-pd{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);line-height:1.5}
    .pvp-btn-p{background:var(--pvp-green);color:#0a0a0a;border:none;border-radius:8px;padding:.65rem 1rem;font-family:'DM Mono',monospace;font-size:.76rem;font-weight:700;cursor:pointer;letter-spacing:.04em;transition:all .15s}
    .pvp-btn-p:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)}
    .pvp-btn-p:disabled{opacity:.35;cursor:not-allowed}
    .pvp-btn-s{background:transparent;color:#67e8f9;border:1px solid rgba(103,232,249,.35);border-radius:8px;padding:.65rem 1rem;font-family:'DM Mono',monospace;font-size:.76rem;cursor:pointer;transition:all .15s}
    .pvp-btn-s:hover:not(:disabled){background:rgba(103,232,249,.07)}
    .pvp-btn-s:disabled{opacity:.35;cursor:not-allowed}
    .pvp-inp{background:var(--pvp-s1);border:1px solid var(--pvp-b);border-radius:8px;padding:.55rem .8rem;font-family:'DM Mono',monospace;font-size:.95rem;color:var(--fg);text-transform:uppercase;letter-spacing:.18em;width:100%;box-sizing:border-box;text-align:center;transition:border-color .15s}
    .pvp-inp:focus{outline:none;border-color:rgba(103,232,249,.5)}
    .pvp-alert{border-radius:10px;padding:.9rem 1rem;font-family:'DM Mono',monospace;font-size:.72rem;line-height:1.5;margin-bottom:1rem}
    .pvp-aw{background:rgba(255,200,0,.08);border:1px solid rgba(255,200,0,.25);color:#fde68a}
    .pvp-ae{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.25);color:#f87171}
    .pvp-waiting{background:rgba(200,245,66,.05);border:1px solid rgba(200,245,66,.2);border-radius:14px;padding:1.8rem;text-align:center}
    .pvp-code-big{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:700;letter-spacing:.3em;color:var(--pvp-green);cursor:pointer;transition:color .2s;user-select:all}
    .pvp-code-big:hover{color:#34d399}
    .pvp-code-hint{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);margin-top:.3rem}
    .pvp-wmsg{font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);margin-top:1rem;display:flex;align-items:center;justify-content:center;gap:.5rem}
    .pvp-spin{display:inline-block;width:12px;height:12px;border:2px solid rgba(200,245,66,.2);border-top-color:var(--pvp-green);border-radius:50%;animation:pvp-spin .8s linear infinite}
    @keyframes pvp-spin{to{transform:rotate(360deg)}}
    .pvp-btn-g{background:none;border:1px solid var(--pvp-b);color:var(--muted);border-radius:8px;padding:.4rem 1rem;font-family:'DM Mono',monospace;font-size:.68rem;cursor:pointer;transition:all .15s}
    .pvp-btn-g:hover{border-color:rgba(248,113,113,.4);color:#f87171}
    /* Arena */
    .pvp-arena{max-width:640px;margin:0 auto;padding:1rem 1rem 2rem}
    .pvp-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;gap:.5rem}
    .pvp-lbl{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
    .pvp-badge{font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.05em;padding:.3rem .9rem;border-radius:20px;border:1px solid;transition:all .3s;font-weight:600}
    .pvp-bm{color:var(--pvp-green);border-color:rgba(200,245,66,.4);background:rgba(200,245,66,.08)}
    .pvp-bt{color:var(--muted);border-color:var(--pvp-b);background:transparent}
    .pvp-ff{background:none;border:1px solid var(--pvp-b);color:var(--muted);border-radius:8px;padding:.3rem .7rem;font-family:'DM Mono',monospace;font-size:.62rem;cursor:pointer;transition:all .15s;white-space:nowrap}
    .pvp-ff:hover{border-color:rgba(248,113,113,.4);color:#f87171}
    .pvp-fighters{display:grid;grid-template-columns:1fr 40px 1fr;gap:.6rem;align-items:center;margin-bottom:1.2rem}
    .pvp-fc{border-radius:14px;padding:1rem;transition:box-shadow .3s,border-color .3s;position:relative;overflow:visible}
    .pvp-fcm{background:var(--pvp-s2);border:1px solid rgba(200,245,66,.2)}
    .pvp-fcm.pvp-at{box-shadow:0 0 0 1px rgba(200,245,66,.4),0 4px 24px var(--pvp-gme)}
    .pvp-fco{background:var(--pvp-s2);border:1px solid rgba(248,113,113,.2)}
    .pvp-fco.pvp-at{box-shadow:0 0 0 1px rgba(248,113,113,.4),0 4px 24px var(--pvp-gopp)}
    .pvp-ftag{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.6rem;font-weight:600}
    .pvp-ftm{color:var(--pvp-green)}.pvp-fto{color:var(--pvp-red)}
    .pvp-fi{display:flex;align-items:center;gap:.8rem;margin-bottom:.8rem}
    .pvp-spr{width:56px;height:56px;object-fit:contain;border-radius:8px;flex-shrink:0;transition:transform .15s}
    .pvp-fn{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700}
    .pvp-fh{font-family:'DM Mono',monospace;font-size:.58rem;color:var(--muted);margin-top:1px}
    .pvp-br{margin-bottom:.35rem}
    .pvp-bls{display:flex;justify-content:space-between;font-family:'DM Mono',monospace;font-size:.58rem;margin-bottom:3px}
    .pvp-bt2{height:7px;background:rgba(255,255,255,.07);border-radius:4px;overflow:hidden}
    .pvp-bf{height:100%;border-radius:4px;transition:width .45s cubic-bezier(.4,0,.2,1)}
    .pvp-hfm{background:linear-gradient(90deg,#ef4444,var(--pvp-green))}
    .pvp-hfo{background:linear-gradient(90deg,#991b1b,#ef4444)}
    .pvp-sf{background:linear-gradient(90deg,#7c3aed,#a78bfa)}
    .pvp-st{height:4px}
    .pvp-vs{text-align:center;font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:rgba(255,255,255,.22);user-select:none}
    @keyframes pvp-hit{0%{background:rgba(248,113,113,.35)}100%{background:transparent}}
    .pvp-hit{animation:pvp-hit .5s ease-out}
    .pvp-dmg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Playfair Display',serif;font-weight:700;font-size:1.6rem;pointer-events:none;animation:pvp-fup 1s ease-out forwards;z-index:10}
    @keyframes pvp-fup{0%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}70%{opacity:1;transform:translate(-50%,-140%) scale(1)}100%{opacity:0;transform:translate(-50%,-180%) scale(.85)}}
    .pvp-log{background:var(--pvp-s1);border:1px solid var(--pvp-b);border-radius:10px;padding:.8rem 1rem;min-height:70px;max-height:120px;overflow-y:auto;font-family:'DM Mono',monospace;font-size:.67rem;color:var(--muted);line-height:1.7;margin-bottom:1.1rem;scroll-behavior:smooth}
    .pvp-ll{padding:1px 0}.pvp-ll:last-child{color:var(--fg);font-weight:500}
    .pvp-albl{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.6rem}
    .pvp-acts{display:grid;grid-template-columns:repeat(2,1fr);gap:.55rem}
    .pvp-ab{background:var(--pvp-s2);border:1px solid var(--pvp-b);border-radius:10px;padding:.7rem .9rem;font-family:'DM Mono',monospace;font-size:.7rem;color:var(--fg);cursor:pointer;transition:all .18s;text-align:left;line-height:1.3;display:flex;flex-direction:column;gap:.15rem;position:relative;overflow:hidden}
    .pvp-ab:hover:not(.pvp-ad){border-color:rgba(200,245,66,.35);background:rgba(200,245,66,.06);transform:translateY(-1px)}
    .pvp-ad{opacity:.38;cursor:not-allowed}
    .pvp-asp{border-color:rgba(167,139,250,.45);background:rgba(167,139,250,.07);box-shadow:0 0 12px rgba(167,139,250,.18)}
    .pvp-asp:hover:not(.pvp-ad){border-color:rgba(167,139,250,.7);box-shadow:0 0 18px rgba(167,139,250,.3)}
    .pvp-at2{display:flex;align-items:center;gap:.45rem;font-weight:600}
    .pvp-ai{font-size:1.1rem;line-height:1}.pvp-an{font-size:.75rem}.pvp-acd{font-size:.58rem;color:var(--muted)}
    .pvp-adesc{font-size:.6rem;color:var(--muted);padding-left:1.55rem;line-height:1.4}
    .pvp-wbanner{background:rgba(0,0,0,.5);border:1px solid var(--pvp-b);border-radius:10px;padding:.7rem 1rem;font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);text-align:center;margin-top:.8rem;display:flex;align-items:center;justify-content:center;gap:.5rem}
    /* End */
    .pvp-end{max-width:460px;margin:0 auto;padding:3rem 1.5rem;text-align:center}
    .pvp-eemoji{font-size:4.5rem;margin-bottom:1rem;display:block;animation:pvp-pop .4s ease-out}
    @keyframes pvp-pop{0%{transform:scale(.5);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    .pvp-etitle{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;margin-bottom:.4rem;letter-spacing:-.01em}
    .pvp-esub{font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);margin-bottom:1.5rem}
    .pvp-elog{background:var(--pvp-s1);border:1px solid var(--pvp-b);border-radius:10px;padding:.9rem 1rem;max-height:140px;overflow-y:auto;font-family:'DM Mono',monospace;font-size:.63rem;color:var(--muted);text-align:left;margin-bottom:1.8rem;line-height:1.7}
    .pvp-ebtns{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap}
    .pvp-er{background:var(--pvp-green);color:#0a0a0a;border:none;border-radius:10px;padding:.75rem 1.8rem;font-family:'DM Mono',monospace;font-size:.8rem;font-weight:700;cursor:pointer;letter-spacing:.04em;transition:all .15s}
    .pvp-er:hover{filter:brightness(1.1);transform:translateY(-1px)}
    .pvp-eb{background:none;border:1px solid var(--pvp-b);color:var(--muted);border-radius:10px;padding:.75rem 1.8rem;font-family:'DM Mono',monospace;font-size:.8rem;cursor:pointer;transition:all .15s}
    .pvp-eb:hover{border-color:var(--fg);color:var(--fg)}
  `;
  document.head.appendChild(s);
}

// ─── État local ──────────────────────────────────────────────────────────────
let pvpState = {
  myHp:0,myMaxHp:0,mySpecial:0,
  oppHp:0,oppMaxHp:0,oppSpecial:0,
  attackCooldowns:{},lastActionTs:0,
  waitingForOpp:false,battleOver:false,
};

export function initPvpTab() { injectPvpStyles(); renderPvpLobby(); }

function pct(v,m){ return m>0?Math.max(0,Math.min(100,v/m*100)).toFixed(1):0; }

// ─── Lobby ───────────────────────────────────────────────────────────────────
function renderPvpLobby() {
  const wrap = $('pvpScreen'); if (!wrap) return;
  const connected = isConnected();
  const heroSel   = selectedHero && HEROES[selectedHero];
  const stats     = heroSel ? getLevelStats(heroSel) : null;

  wrap.innerHTML = `
    <div class="pvp-lobby">
      <div class="pvp-lobby-title">⚔️ Duel en ligne</div>
      <div class="pvp-lobby-sub">Affrontez un autre joueur en temps réel</div>
      ${!connected?`<div class="pvp-alert pvp-ae">⚠️ Tu dois être <a href="../connexion.html" style="color:var(--pvp-green);text-decoration:underline">connecté</a> pour jouer.</div>`:''}
      ${!heroSel?`<div class="pvp-alert pvp-aw">⚠️ Sélectionne un héros dans l'onglet Carte.</div>`:`
      <div class="pvp-hero-card">
        <img src="../sprite/${heroSel.sprite}.png" alt="${heroSel.name}"/>
        <div><div class="pvp-hn">${heroSel.name}</div><div class="pvp-hs">LV.${player.level} · ATK ${stats.atk} · DEF ${stats.def} · HP ${stats.hp}</div></div>
        <div class="pvp-ready">✓ Prêt</div>
      </div>`}
      <div class="pvp-grid">
        <div class="pvp-panel">
          <div class="pvp-pt">🎯 Créer un duel</div>
          <div class="pvp-pd">Génère un code à 6 caractères et partage-le.</div>
          <button id="btnCreateDuel" class="pvp-btn-p" ${!connected||!heroSel?'disabled':''}>Créer un duel</button>
        </div>
        <div class="pvp-panel">
          <div class="pvp-pt">🔗 Rejoindre</div>
          <div class="pvp-pd">Entre le code de l'hôte du duel.</div>
          <input id="pvpCodeInput" class="pvp-inp" placeholder="AB3K9Z" maxlength="6" ${!connected||!heroSel?'disabled':''}/>
          <button id="btnJoinDuel" class="pvp-btn-s" ${!connected||!heroSel?'disabled':''}>Rejoindre</button>
        </div>
      </div>
      <div id="pvpStatusZone"></div>
    </div>`;

  $('btnCreateDuel')?.addEventListener('click', handleCreateDuel);
  $('btnJoinDuel')?.addEventListener('click', handleJoinDuel);
  $('pvpCodeInput')?.addEventListener('input', e => { e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''); });
  $('pvpCodeInput')?.addEventListener('keydown', e => { if(e.key==='Enter') handleJoinDuel(); });
}

async function handleCreateDuel() {
  const hero=HEROES[selectedHero],stats=getLevelStats(hero),hp=stats.hp,loadout=getLoadout();
  const btn=$('btnCreateDuel'); btn.disabled=true; btn.textContent='⏳ Création…';
  try {
    await waitForAuth();
    const {code}=await createDuel(selectedHero,stats,hp,loadout);
    showWaitingRoom(code);
  } catch(e) { console.error('❌',e); showPvpError(e.message); btn.disabled=false; btn.textContent='Créer un duel'; }
}

async function handleJoinDuel() {
  const code=$('pvpCodeInput')?.value?.trim();
  if(!code||code.length<6){showPvpError('Entre un code à 6 caractères.');return;}
  const hero=HEROES[selectedHero],stats=getLevelStats(hero),hp=stats.hp,loadout=getLoadout();
  const btn=$('btnJoinDuel'); btn.disabled=true; btn.textContent='⏳ Connexion…';
  try {
    await waitForAuth();
    await joinDuel(code,selectedHero,stats,hp,loadout);
    listenDuel(data=>handleDuelSnapshot(data));
    showJoiningRoom(code);
  } catch(e) { console.error('❌',e); showPvpError(e.message); btn.disabled=false; btn.textContent='Rejoindre'; }
}

function waitForAuth() {
  return new Promise((res,rej)=>{
    if(typeof firebase==='undefined'){rej(new Error('Firebase non chargé.'));return;}
    const u=firebase.auth().onAuthStateChanged(user=>{u();user?res(user):rej(new Error('Tu dois être connecté.'));});
  });
}

// ─── Salles d'attente ────────────────────────────────────────────────────────
function showWaitingRoom(code) {
  const zone=$('pvpStatusZone'); if(!zone) return;
  zone.innerHTML=`
    <div class="pvp-waiting">
      <div style="font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">Code de duel</div>
      <div id="pvpCodeDisplay" class="pvp-code-big" title="Cliquer pour copier">${code}</div>
      <div class="pvp-code-hint">📋 Clique pour copier · Partage ce code</div>
      <div id="pvpWaitMsg" class="pvp-wmsg"><span class="pvp-spin"></span> En attente d'un adversaire…</div>
      <div id="pvpStartWrap" style="margin-top:1.1rem;display:none">
        <button id="btnStartDuel" class="pvp-btn-p" style="width:100%;margin-bottom:.5rem">⚡ Lancer le combat !</button>
      </div>
      <button id="btnCancelDuel" class="pvp-btn-g" style="margin-top:.8rem">Annuler</button>
    </div>`;
  $('btnCancelDuel')?.addEventListener('click',async()=>{try{await forfeitDuel();}catch(e){}renderPvpLobby();});
  $('btnStartDuel')?.addEventListener('click',async()=>{
    $('btnStartDuel').disabled=true;$('btnStartDuel').textContent='⚡ Lancement…';
    try{await confirmStart();}catch(e){console.error('❌',e);showPvpError('Erreur : '+e.message);}
  });
  $('pvpCodeDisplay')?.addEventListener('click',()=>{
    navigator.clipboard?.writeText(code).then(()=>{
      const el=$('pvpCodeDisplay');const prev=el.textContent;
      el.textContent='✓ Copié !';el.style.fontSize='1.4rem';
      setTimeout(()=>{el.textContent=prev;el.style.fontSize='';},1500);
    });
  });
  listenDuel(data=>{
    handleDuelSnapshot(data);
    if(data.status==='ready'&&pvp.role==='host'){
      const msg=$('pvpWaitMsg');
      if(msg) msg.innerHTML=`<span style="color:var(--pvp-green)">✅</span> <strong>${data.guest.displayName}</strong> a rejoint !`;
      const sw=$('pvpStartWrap'); if(sw) sw.style.display='block';
    }
  });
}

function showJoiningRoom(code) {
  const zone=$('pvpStatusZone'); if(!zone) return;
  zone.innerHTML=`
    <div class="pvp-waiting">
      <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:.5rem">
        🤺 Duel <span style="color:var(--pvp-green);letter-spacing:.18em">${code}</span>
      </div>
      <div class="pvp-wmsg"><span class="pvp-spin"></span> En attente que l'hôte lance…</div>
      <button id="btnCancelDuel" class="pvp-btn-g" style="margin-top:1rem">Abandonner</button>
    </div>`;
  $('btnCancelDuel')?.addEventListener('click',async()=>{await forfeitDuel();renderPvpLobby();});
}

// ─── Snapshot ────────────────────────────────────────────────────────────────
function handleDuelSnapshot(data) {
  if(!data) return;
  if(data.status==='active'){
    if(!$('pvpBattleArena')) startPvpBattle(data); else updatePvpBattle(data);
  }
  if(data.status==='finished') endPvpBattle(data);
}

function startPvpBattle(data) {
  const me=data[pvp.role],opp=data[pvp.opponentRole];
  pvpState={myHp:me.hp,myMaxHp:me.maxHp,mySpecial:0,oppHp:opp.hp,oppMaxHp:opp.maxHp,oppSpecial:0,attackCooldowns:{},lastActionTs:0,waitingForOpp:false,battleOver:false};
  renderPvpArena(data);
}

// ─── Arène ───────────────────────────────────────────────────────────────────
function renderPvpArena(data) {
  const wrap=$('pvpScreen'); if(!wrap) return;
  const me=data[pvp.role],opp=data[pvp.opponentRole];
  const myHero=HEROES[me.heroId]||{},oppHero=HEROES[opp.heroId]||{};
  const mt=pvp.myTurn;

  wrap.innerHTML=`
    <div id="pvpBattleArena" class="pvp-arena">
      <div class="pvp-hdr">
        <div class="pvp-lbl">⚔️ Duel en ligne</div>
        <div id="pvpTurnBadge" class="pvp-badge ${mt?'pvp-bm':'pvp-bt'}">${mt?'⚡ Ton tour':'⏳ Adversaire'}</div>
        <button class="pvp-ff" onclick="window.__pvpForfeit&&window.__pvpForfeit()">🏳 Abandon</button>
      </div>

      <div class="pvp-fighters">
        <div id="pvpFighterMe" class="pvp-fc pvp-fcm ${mt?'pvp-at':''}">
          <div class="pvp-ftag pvp-ftm">● Toi</div>
          <div class="pvp-fi">
            <img src="../sprite/${myHero.sprite||'default'}.png" alt="${myHero.name||''}" class="pvp-spr"/>
            <div><div class="pvp-fn">${me.displayName}</div><div class="pvp-fh">${myHero.name||''}</div></div>
          </div>
          <div class="pvp-br">
            <div class="pvp-bls"><span style="color:var(--muted)">HP</span><span id="pvpMyHpTxt" style="color:var(--pvp-green)">${pvpState.myHp}/${pvpState.myMaxHp}</span></div>
            <div class="pvp-bt2"><div id="pvpMyHpBar" class="pvp-bf pvp-hfm" style="width:${pct(pvpState.myHp,pvpState.myMaxHp)}%"></div></div>
          </div>
          <div class="pvp-br">
            <div class="pvp-bls"><span style="color:var(--pvp-sp)">⚡ Spécial</span><span id="pvpMySpTxt" style="color:var(--pvp-sp)">${pvpState.mySpecial}%</span></div>
            <div class="pvp-bt2 pvp-st"><div id="pvpMySpBar" class="pvp-bf pvp-sf" style="width:${pvpState.mySpecial}%"></div></div>
          </div>
        </div>

        <div class="pvp-vs">VS</div>

        <div id="pvpFighterOpp" class="pvp-fc pvp-fco ${!mt?'pvp-at':''}">
          <div class="pvp-ftag pvp-fto">● Adversaire</div>
          <div class="pvp-fi">
            <img src="../sprite/${oppHero.sprite||'default'}.png" alt="${oppHero.name||''}" class="pvp-spr"/>
            <div><div class="pvp-fn">${opp.displayName}</div><div class="pvp-fh">${oppHero.name||''}</div></div>
          </div>
          <div class="pvp-br">
            <div class="pvp-bls"><span style="color:var(--muted)">HP</span><span id="pvpOppHpTxt" style="color:var(--pvp-red)">${pvpState.oppHp}/${pvpState.oppMaxHp}</span></div>
            <div class="pvp-bt2"><div id="pvpOppHpBar" class="pvp-bf pvp-hfo" style="width:${pct(pvpState.oppHp,pvpState.oppMaxHp)}%"></div></div>
          </div>
          <div class="pvp-br">
            <div class="pvp-bls"><span style="color:var(--pvp-sp)">⚡ Spécial</span><span id="pvpOppSpTxt" style="color:var(--pvp-sp)">${pvpState.oppSpecial}%</span></div>
            <div class="pvp-bt2 pvp-st"><div id="pvpOppSpBar" class="pvp-bf pvp-sf" style="width:${pvpState.oppSpecial}%"></div></div>
          </div>
        </div>
      </div>

      <div id="pvpLog" class="pvp-log">${(data.log||[]).map(l=>`<div class="pvp-ll">${l}</div>`).join('')}</div>

      <div class="pvp-albl">Actions</div>
      <div id="pvpActions" class="pvp-acts"></div>
      ${!mt?`<div class="pvp-wbanner"><span class="pvp-spin"></span> En attente du coup adverse…</div>`:''}
    </div>`;

  renderPvpActions(me);
  window.__pvpForfeit=async()=>{if(confirm('Abandonner le duel ?')){await forfeitDuel();renderPvpLobby();}};
}

// ─── Actions ─────────────────────────────────────────────────────────────────
function renderPvpActions(meData) {
  const container=$('pvpActions'); if(!container) return;
  const myHero=HEROES[meData.heroId];
  const attacks=getAttacks(myHero);
  const myLoadout=meData.loadout||['punch','combo','defend','special'];
  const available=attacks.filter(a=>myLoadout.includes(a.id)||a.id==='special');
  container.innerHTML='';
  const mt=pvp.myTurn;

  available.forEach(atk=>{
    const cd=pvpState.attackCooldowns[atk.id]||0;
    const isSp=atk.id==='special';
    const spOk=pvpState.mySpecial>=100;
    const canUse=mt&&cd===0&&(!isSp||spOk);
    const btn=document.createElement('button');
    btn.className=['pvp-ab',!canUse?'pvp-ad':'',isSp&&spOk?'pvp-asp':''].filter(Boolean).join(' ');
    btn.innerHTML=`
      <div class="pvp-at2">
        <span class="pvp-ai">${atk.icon}</span>
        <span class="pvp-an">${atk.name}</span>
        ${cd>0?`<span class="pvp-acd">(${cd} tour${cd>1?'s':''})</span>`:''}
        ${isSp&&spOk?`<span class="pvp-acd" style="color:var(--pvp-sp);margin-left:auto">PRÊT !</span>`:''}
        ${isSp&&!spOk?`<span class="pvp-acd" style="margin-left:auto">${pvpState.mySpecial}%</span>`:''}
      </div>
      ${atk.desc?`<div class="pvp-adesc">${atk.desc}</div>`:''}`;
    btn.title=atk.desc||'';
    if(canUse) btn.addEventListener('click',()=>handlePvpAction(atk));
    container.appendChild(btn);
  });

  const badge=$('pvpTurnBadge');
  if(badge){badge.textContent=mt?'⚡ Ton tour':'⏳ Adversaire';badge.className=`pvp-badge ${mt?'pvp-bm':'pvp-bt'}`;}
  $('pvpFighterMe')?.classList.toggle('pvp-at',mt);
  $('pvpFighterOpp')?.classList.toggle('pvp-at',!mt);

  const arena=$('pvpBattleArena');
  if(arena){
    let banner=arena.querySelector('.pvp-wbanner');
    if(!mt&&!banner){const b=document.createElement('div');b.className='pvp-wbanner';b.innerHTML=`<span class="pvp-spin"></span> En attente du coup adverse…`;arena.appendChild(b);}
    else if(mt&&banner) banner.remove();
  }
}

// ─── Action joueur ───────────────────────────────────────────────────────────
async function handlePvpAction(atk) {
  if(!pvp.myTurn||pvpState.battleOver) return;
  const meSnap=pvp.duelData?.[pvp.role],oppSnap=pvp.duelData?.[pvp.opponentRole];
  if(!meSnap||!oppSnap) return;
  const myHero=HEROES[meSnap.heroId],oppHero=HEROES[oppSnap.heroId];
  if(!myHero||!oppHero) return;

  let result={},myHpAfter=pvpState.myHp,oppHpAfter=pvpState.oppHp,mySpAfter=pvpState.mySpecial,logLine='',dmgDealt=0;

  if(atk.id==='defend'){
    logLine=`🛡️ ${meSnap.displayName} se met en garde !`;result={type:'defend'};mySpAfter=Math.min(100,mySpAfter+8);
  } else if(atk.id==='special'){
    if(pvpState.mySpecial<100) return;
    const r=myHero.special?.fn(myHero,oppHero)||{};
    dmgDealt=r.dmg||calcDmg(meSnap.stats.atk,oppSnap.stats.def,1.8);
    oppHpAfter=Math.max(0,oppHpAfter-dmgDealt);mySpAfter=0;
    logLine=`⚡ ${meSnap.displayName} déclenche son SPÉCIAL — ${dmgDealt} dégâts !`;result={type:'special',dmg:dmgDealt};
  } else {
    const r=atk.fn({...myHero,atk:meSnap.stats.atk},{...oppHero,def:oppSnap.stats.def});
    if(!r) return;
    if(r.miss){logLine=`💨 ${meSnap.displayName} rate son attaque !`;result={type:'miss'};}
    else {
      dmgDealt=r.dmg||0;oppHpAfter=Math.max(0,oppHpAfter-dmgDealt);
      mySpAfter=Math.min(100,mySpAfter+(r.spBonus||15));
      if(atk.cooldown>0) pvpState.attackCooldowns[atk.id]=atk.cooldown;
      logLine=r.log||`${atk.icon} ${meSnap.displayName} attaque — ${dmgDealt} dégâts !`;
      result={type:'attack',dmg:dmgDealt,crit:!!r.crit};
    }
  }

  pvpState.myHp=myHpAfter;pvpState.mySpecial=mySpAfter;pvpState.oppHp=oppHpAfter;
  if(dmgDealt>0) flashHit('pvpFighterOpp',dmgDealt,result.crit);
  updatePvpBars();

  const iWin=oppHpAfter<=0,iLose=myHpAfter<=0;
  try { await submitAction({attackId:atk.id,result,myHpAfter,mySpecialAfter:mySpAfter,oppHpAfter,logLine}); }
  catch(e){console.error('❌',e);showPvpError('Erreur : '+e.message);return;}
  try {if(iWin) await declareWinner(pvp.role);if(iLose) await declareWinner(pvp.opponentRole);} catch(e){}

  for(const id in pvpState.attackCooldowns){
    if(pvpState.attackCooldowns[id]>0) pvpState.attackCooldowns[id]--;
    if(pvpState.attackCooldowns[id]<=0) delete pvpState.attackCooldowns[id];
  }
  const meUpd=pvp.duelData?.[pvp.role]; if(meUpd) renderPvpActions(meUpd);
}

// ─── Animation dégâts ────────────────────────────────────────────────────────
function flashHit(id,dmg,crit) {
  const el=$(id); if(!el) return;
  el.classList.add('pvp-hit'); setTimeout(()=>el.classList.remove('pvp-hit'),500);
  const num=document.createElement('div');
  num.className='pvp-dmg';num.textContent=(crit?'💥 ':'')+dmg;
  num.style.color=crit?'#fbbf24':'#f87171';
  el.style.position='relative';el.appendChild(num);
  setTimeout(()=>num.remove(),1000);
}

// ─── Mise à jour combat ──────────────────────────────────────────────────────
function updatePvpBattle(data) {
  const me=data[pvp.role],opp=data[pvp.opponentRole]; if(!me||!opp) return;
  const prevHp=pvpState.myHp;
  pvpState.myHp=me.hp;pvpState.mySpecial=me.special??pvpState.mySpecial;
  pvpState.oppHp=opp.hp;pvpState.oppSpecial=opp.special??pvpState.oppSpecial;
  const dmgTaken=prevHp-me.hp;
  if(dmgTaken>0) flashHit('pvpFighterMe',dmgTaken,false);
  updatePvpBars();updatePvpLog(data.log||[]);renderPvpActions(me);
}

function updatePvpBars() {
  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v;};
  const setW=(id,v)=>{const e=$(id);if(e)e.style.width=v;};
  setW('pvpMyHpBar',pct(pvpState.myHp,pvpState.myMaxHp)+'%');set('pvpMyHpTxt',`${pvpState.myHp}/${pvpState.myMaxHp}`);
  setW('pvpOppHpBar',pct(pvpState.oppHp,pvpState.oppMaxHp)+'%');set('pvpOppHpTxt',`${pvpState.oppHp}/${pvpState.oppMaxHp}`);
  setW('pvpMySpBar',pvpState.mySpecial+'%');set('pvpMySpTxt',pvpState.mySpecial+'%');
  setW('pvpOppSpBar',pvpState.oppSpecial+'%');set('pvpOppSpTxt',pvpState.oppSpecial+'%');
}

function updatePvpLog(lines) {
  const log=$('pvpLog'); if(!log) return;
  log.innerHTML=lines.slice(-25).map(l=>`<div class="pvp-ll">${l}</div>`).join('');
  log.scrollTop=log.scrollHeight;
}

// ─── Fin de combat ───────────────────────────────────────────────────────────
function endPvpBattle(data) {
  if(pvpState.battleOver) return;
  pvpState.battleOver=true;
  const iWon=data.winner===pvp.role;
  const wrap=$('pvpScreen'); if(!wrap) return;
  wrap.innerHTML=`
    <div class="pvp-end">
      <span class="pvp-eemoji">${iWon?'🏆':'💀'}</span>
      <div class="pvp-etitle" style="color:${iWon?'var(--pvp-green)':'var(--pvp-red)'}">
        ${iWon?'Victoire !':'Défaite…'}
      </div>
      <div class="pvp-esub">${iWon?'Tu as triomphé de ton adversaire !':'Ton adversaire a été plus fort cette fois.'}</div>
      <div class="pvp-elog">${(data.log||[]).slice(-20).map(l=>`<div>${l}</div>`).join('')}</div>
      <div class="pvp-ebtns">
        <button id="btnPvpRematch" class="pvp-er">🔄 Revanche</button>
        <button id="btnPvpBack" class="pvp-eb">← Lobby</button>
      </div>
    </div>`;
  cleanupPvp();
  $('btnPvpBack')?.addEventListener('click',()=>renderPvpLobby());
  $('btnPvpRematch')?.addEventListener('click',()=>renderPvpLobby());
}

// ─── Erreur ──────────────────────────────────────────────────────────────────
function showPvpError(msg) {
  const zone=$('pvpStatusZone'); if(!zone) return;
  const div=document.createElement('div');
  div.className='pvp-alert pvp-ae';div.textContent='⚠️ '+msg;
  zone.prepend(div);setTimeout(()=>div.remove(),4500);
}
