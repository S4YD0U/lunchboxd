// ============================================================
// engine/pvp.js — Système de combat PvP en ligne (Firestore)
// ============================================================
//
// Architecture :
//   duels/{duelId}  →  document Firestore avec :
//     - host        : { uid, displayName, heroId, stats, hp, special, loadout }
//     - guest       : { uid, displayName, heroId, stats, hp, special, loadout }
//     - status      : 'waiting' | 'ready' | 'active' | 'finished'
//     - turn        : 'host' | 'guest'
//     - turnNumber  : int
//     - lastAction  : { type, attackId, result }  ← écrit par celui qui joue
//     - log         : string[]
//     - winner      : null | 'host' | 'guest'
//     - createdAt   : timestamp
//
// Flux :
//   Hôte  → createDuel()   → génère un code 6 lettres, status='waiting'
//   Invité → joinDuel(code) → remplit guest, status='ready'
//   Hôte  → confirmStart() → status='active', turn='host'
//   Chaque joueur : submitAction() → écrit lastAction + flip du turn
//   L'adversaire lit onSnapshot et applique l'action localement
// ============================================================

// ─── Accès Firebase ──────────────────────────────────────────────────────────

function getFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.apps.length) return null;
    return { db: firebase.firestore(), auth: firebase.auth() };
  } catch (e) { return null; }
}

function getDb() {
  const fb = getFirebase();
  return fb ? fb.db : null;
}

function getUid() {
  try {
    const fb = getFirebase();
    if (!fb) return null;
    const user = fb.auth.currentUser;
    if (user) return user.uid;
    // Fallback : chercher dans localStorage si Firebase pas encore prêt
    try {
      const keys = Object.keys(localStorage).filter(k => k.includes('firebase:authUser'));
      if (keys.length > 0) {
        const data = JSON.parse(localStorage.getItem(keys[0]));
        return data?.uid || null;
      }
    } catch(e) {}
    return null;
  } catch (e) { return null; }
}

function getDisplayName() {
  try {
    const fb = getFirebase();
    const u = fb && fb.auth.currentUser;
    if (u) return u.displayName || u.email?.split('@')[0] || 'Joueur';
    // Fallback localStorage
    try {
      const keys = Object.keys(localStorage).filter(k => k.includes('firebase:authUser'));
      if (keys.length > 0) {
        const data = JSON.parse(localStorage.getItem(keys[0]));
        return data?.displayName || data?.email?.split('@')[0] || 'Joueur';
      }
    } catch(e) {}
    return 'Joueur';
  } catch (e) { return 'Joueur'; }
}

// ─── Génération du code duel ─────────────────────────────────────────────────

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ─── État local PvP ─────────────────────────────────────────────────────────

export const pvp = {
  active:       false,
  duelId:       null,
  role:         null,   // 'host' | 'guest'
  opponentRole: null,   // 'guest' | 'host'
  myTurn:       false,
  duelData:     null,
  unsubscribe:  null,   // listener Firestore
  onUpdate:     null,   // callback appelé à chaque changement du doc
  pendingAction: null,  // action soumise en attente de confirmation
};

export function isPvpActive() { return pvp.active; }
export function isPvpMyTurn() { return pvp.myTurn; }

// ─── Créer un duel (hôte) ────────────────────────────────────────────────────

export async function createDuel(heroId, heroStats, heroHp, loadout) {
  const db  = getDb();
  const uid = getUid();
  if (!db || !uid) throw new Error('Tu dois être connecté pour jouer en ligne.');

  const code   = generateCode();
  const duelId = 'duel_' + code;

  const hostData = {
    uid,
    displayName: getDisplayName(),
    heroId,
    stats:   heroStats,
    hp:      heroHp,
    maxHp:   heroHp,
    special: 0,
    loadout,
  };

  await db.doc(`duels/${duelId}`).set({
    code,
    host:        hostData,
    guest:       null,
    status:      'waiting',
    turn:        'host',
    turnNumber:  1,
    lastAction:  null,
    log:         ['⚔️ Duel créé — En attente d\'un adversaire…'],
    winner:      null,
    createdAt:   firebase.firestore.FieldValue.serverTimestamp(),
  });

  pvp.active       = true;
  pvp.duelId       = duelId;
  pvp.role         = 'host';
  pvp.opponentRole = 'guest';
  pvp.myTurn       = true;

  return { code, duelId };
}

// ─── Rejoindre un duel (invité) ──────────────────────────────────────────────

export async function joinDuel(code, heroId, heroStats, heroHp, loadout) {
  const db  = getDb();
  const uid = getUid();
  if (!db || !uid) throw new Error('Tu dois être connecté pour jouer en ligne.');

  const duelId = 'duel_' + code.trim().toUpperCase();
  const snap   = await db.doc(`duels/${duelId}`).get();

  if (!snap.exists) throw new Error('Code invalide — aucun duel trouvé.');
  const data = snap.data();
  if (data.status !== 'waiting') throw new Error('Ce duel a déjà commencé ou est terminé.');
  if (data.host.uid === uid) throw new Error('Tu ne peux pas rejoindre ton propre duel !');

  const guestData = {
    uid,
    displayName: getDisplayName(),
    heroId,
    stats:   heroStats,
    hp:      heroHp,
    maxHp:   heroHp,
    special: 0,
    loadout,
  };

  await db.doc(`duels/${duelId}`).update({
    guest:  guestData,
    status: 'ready',
    log:    firebase.firestore.FieldValue.arrayUnion(`🤺 ${getDisplayName()} a rejoint le duel !`),
  });

  pvp.active       = true;
  pvp.duelId       = duelId;
  pvp.role         = 'guest';
  pvp.opponentRole = 'host';
  pvp.myTurn       = false;

  return { duelId };
}

// ─── Confirmer le début (hôte, quand guest=ready) ────────────────────────────

export async function confirmStart() {
  const db = getDb();
  if (!db || !pvp.duelId) return;
  await db.doc(`duels/${pvp.duelId}`).update({
    status: 'active',
    log: firebase.firestore.FieldValue.arrayUnion('⚡ Le combat commence ! C\'est à l\'hôte de jouer.'),
  });
}

// ─── Soumettre une action ────────────────────────────────────────────────────

export async function submitAction(actionData) {
  const db = getDb();
  if (!db || !pvp.duelId || !pvp.myTurn) return;

  const nextTurn = pvp.opponentRole;

  pvp.myTurn     = false;
  pvp.pendingAction = actionData;

  const logLine = actionData.logLine || '';

  await db.doc(`duels/${pvp.duelId}`).update({
    lastAction: {
      by:      pvp.role,
      ...actionData,
      ts: Date.now(),
    },
    turn:       nextTurn,
    turnNumber: firebase.firestore.FieldValue.increment(1),
    [`${pvp.role}.hp`]:      actionData.myHpAfter,
    [`${pvp.role}.special`]: actionData.mySpecialAfter,
    [`${pvp.opponentRole}.hp`]: actionData.oppHpAfter,
    log: logLine
      ? firebase.firestore.FieldValue.arrayUnion(logLine)
      : firebase.firestore.FieldValue.arrayUnion('— tour joué'),
  });
}

// ─── Déclarer un vainqueur ───────────────────────────────────────────────────

export async function declareWinner(winnerRole) {
  const db = getDb();
  if (!db || !pvp.duelId) return;
  await db.doc(`duels/${pvp.duelId}`).update({
    status: 'finished',
    winner: winnerRole,
    log: firebase.firestore.FieldValue.arrayUnion(
      winnerRole === pvp.role ? '🏆 Tu as gagné !' : '💀 Tu as été vaincu !'
    ),
  });
}

// ─── Écouter le duel (onSnapshot) ───────────────────────────────────────────

export function listenDuel(callback) {
  const db = getDb();
  if (!db || !pvp.duelId) return;

  if (pvp.unsubscribe) pvp.unsubscribe();

  pvp.onUpdate = callback;

  pvp.unsubscribe = db.doc(`duels/${pvp.duelId}`).onSnapshot(snap => {
    if (!snap.exists) return;
    const data = snap.data();
    pvp.duelData = data;

    // Mise à jour du flag myTurn
    pvp.myTurn = (data.turn === pvp.role && data.status === 'active');

    if (typeof callback === 'function') callback(data);
  });
}

// ─── Arrêter l'écoute & réinitialiser ───────────────────────────────────────

export function cleanupPvp() {
  if (pvp.unsubscribe) { pvp.unsubscribe(); pvp.unsubscribe = null; }
  pvp.active        = false;
  pvp.duelId        = null;
  pvp.role          = null;
  pvp.opponentRole  = null;
  pvp.myTurn        = false;
  pvp.duelData      = null;
  pvp.onUpdate      = null;
  pvp.pendingAction = null;
}

// ─── Abandon ─────────────────────────────────────────────────────────────────

export async function forfeitDuel() {
  const db = getDb();
  if (!db || !pvp.duelId) { cleanupPvp(); return; }
  try {
    await db.doc(`duels/${pvp.duelId}`).update({
      status: 'finished',
      winner: pvp.opponentRole,
      log: firebase.firestore.FieldValue.arrayUnion(`🏳️ ${getDisplayName()} a abandonné.`),
    });
  } catch (e) { /* silently fail */ }
  cleanupPvp();
}

// ─── Utilitaire : mes données & celles de l'adversaire ───────────────────────

export function getMyData()  { return pvp.duelData?.[pvp.role]         || null; }
export function getOppData() { return pvp.duelData?.[pvp.opponentRole] || null; }
export function isConnected() { return !!getUid(); }
