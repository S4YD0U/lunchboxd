// ============================================================
// engine/cloud-save.js — Synchronisation Firestore multi-appareils
// ============================================================
// Ce module fait le pont entre les saves localStorage du jeu
// et Firestore, pour permettre la progression cross-appareils.
//
// Structure Firestore :
//   users/{uid}/game_saves/char_{charId}   → données personnage
//   users/{uid}/game_saves/region_progress → progression régions
//
// Comportement :
//   - Au chargement d'un perso : on fusionne localStorage + Firestore
//     (on garde le plus récent grâce au champ `updatedAt`)
//   - À chaque savePlayer() : on écrit en localStorage ET Firestore
//   - Indicateur visuel dans le coin pour montrer l'état de sync
// ============================================================

// ─── Accès Firebase (chargé dynamiquement par auth.js) ───────────────────────

function getFirebase() {
  try {
    if (typeof firebase === 'undefined' || !firebase.apps.length) return null;
    return {
      db:   firebase.firestore(),
      auth: firebase.auth(),
    };
  } catch (e) {
    return null;
  }
}

function getCurrentUserId() {
  try {
    const fb = getFirebase();
    if (!fb || !fb.auth.currentUser) return null;
    return fb.auth.currentUser.uid;
  } catch (e) {
    return null;
  }
}

// ─── Indicateur de sync (coin bas-droite) ────────────────────────────────────

let _syncIndicator = null;

function getSyncIndicator() {
  if (_syncIndicator) return _syncIndicator;
  _syncIndicator = document.createElement('div');
  _syncIndicator.id = 'cloudSyncIndicator';
  _syncIndicator.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    font-size: 0.72rem;
    font-family: var(--font-mono, monospace);
    color: var(--muted, #888);
    background: var(--surface, #1a1a2e);
    border: 1px solid var(--border, #333);
    border-radius: 6px;
    padding: 0.3rem 0.6rem;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  `;
  document.body.appendChild(_syncIndicator);
  return _syncIndicator;
}

let _hideTimer = null;

function showSyncStatus(icon, text, persistent = false) {
  const el = getSyncIndicator();
  el.textContent = icon + ' ' + text;
  el.style.opacity = '1';
  clearTimeout(_hideTimer);
  if (!persistent) {
    _hideTimer = setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }
}

function hideSyncStatus() {
  const el = getSyncIndicator();
  el.style.opacity = '0';
}

// ─── Chemins Firestore ────────────────────────────────────────────────────────

function charDocPath(uid, charId) {
  return `users/${uid}/game_saves/char_${charId}`;
}

function regionDocPath(uid, heroId) {
  return `users/${uid}/game_saves/region_${heroId || 'default'}`;
}

// ─── Sauvegarde cloud d'un personnage ─────────────────────────────────────────

/**
 * Écrit la save du perso dans Firestore.
 * Appelé après chaque savePlayer() si l'utilisateur est connecté.
 */
export async function cloudSaveChar(charId, playerData) {
  const uid = getCurrentUserId();
  if (!uid) return; // pas connecté → on ignore silencieusement

  const fb = getFirebase();
  if (!fb) return;

  try {
    showSyncStatus('☁️', 'Sauvegarde...', true);
    const payload = Object.assign({}, playerData, {
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      charId,
    });
    await fb.db.doc(charDocPath(uid, charId)).set(payload);
    showSyncStatus('✅', 'Sauvegarde cloud OK');
  } catch (e) {
    console.warn('[cloud-save] Erreur sauvegarde perso :', e.message);
    showSyncStatus('⚠️', 'Hors-ligne (local OK)');
  }
}

// ─── Chargement cloud d'un personnage ────────────────────────────────────────

/**
 * Récupère la save Firestore pour charId.
 * Retourne l'objet de données ou null si inexistant / déconnecté.
 */
export async function cloudLoadChar(charId) {
  const uid = getCurrentUserId();
  if (!uid) return null;

  const fb = getFirebase();
  if (!fb) return null;

  try {
    showSyncStatus('☁️', 'Chargement...', true);
    const snap = await fb.db.doc(charDocPath(uid, charId)).get();
    if (snap.exists) {
      hideSyncStatus();
      const data = snap.data();
      delete data.updatedAt;
      delete data.charId;
      return data;
    }
    hideSyncStatus();
    return null;
  } catch (e) {
    console.warn('[cloud-save] Erreur chargement perso :', e.message);
    hideSyncStatus();
    return null;
  }
}

// ─── Fusion locale + cloud (stratégie : le plus récent gagne) ────────────────

/**
 * Compare la save locale et la save cloud, retourne la plus récente.
 * La save locale contient un champ `_savedAt` (timestamp ms).
 * La save cloud contient un champ `updatedAt` (Firestore Timestamp).
 */
export async function mergeAndLoadChar(charId, localSave, defaultSave) {
  const cloudSave = await cloudLoadChar(charId);

  if (!cloudSave) {
    // Pas de cloud → on reste sur le local
    return localSave;
  }

  const localTs = localSave._savedAt || 0;
  const cloudTs = cloudSave._savedAt || 0;

  if (cloudTs > localTs) {
    // Cloud plus récent → on met à jour le localStorage aussi
    try {
      localStorage.setItem('lunchboxe_char_' + charId, JSON.stringify(cloudSave));
    } catch (e) { /* silently fail */ }
    showSyncStatus('☁️', 'Progression récupérée !');
    const merged = Object.assign(defaultSave(), cloudSave);
    // Garantit que les attaques de base sont toujours présentes après fusion cloud
    const BASE_ATTACKS = ['punch', 'combo', 'defend', 'special'];
    for (const id of BASE_ATTACKS) {
      if (!merged.unlockedAttacks.includes(id)) merged.unlockedAttacks.push(id);
    }
    return merged;
  }

  // Local plus récent → on pousse le local vers le cloud en arrière-plan
  cloudSaveChar(charId, localSave).catch(() => {});
  return localSave;
}

// ─── Sauvegarde cloud de la progression régions ───────────────────────────────

export async function cloudSaveRegions(heroId, progressData) {
  const uid = getCurrentUserId();
  if (!uid) return;

  const fb = getFirebase();
  if (!fb) return;

  try {
    await fb.db.doc(regionDocPath(uid, heroId)).set({
      progress: progressData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      _savedAt: Date.now(),
    });
  } catch (e) {
    console.warn('[cloud-save] Erreur sauvegarde régions :', e.message);
  }
}

// ─── Chargement cloud de la progression régions ──────────────────────────────

export async function cloudLoadRegions(heroId) {
  const uid = getCurrentUserId();
  if (!uid) return null;

  const fb = getFirebase();
  if (!fb) return null;

  try {
    const snap = await fb.db.doc(regionDocPath(uid, heroId)).get();
    if (snap.exists) {
      return snap.data().progress || null;
    }
    return null;
  } catch (e) {
    console.warn('[cloud-save] Erreur chargement régions :', e.message);
    return null;
  }
}

/**
 * Fusionne progression régions locale + cloud.
 * Retourne la plus récente.
 */
export async function mergeAndLoadRegions(heroId, localProg) {
  const uid = getCurrentUserId();
  if (!uid) return localProg; // pas connecté

  const fb = getFirebase();
  if (!fb) return localProg;

  try {
    const snap = await fb.db.doc(regionDocPath(uid, heroId)).get();
    if (!snap.exists) {
      // Rien sur le cloud → on pousse le local
      if (Object.keys(localProg).length > 0) {
        cloudSaveRegions(heroId, localProg).catch(() => {});
      }
      return localProg;
    }

    const cloudData = snap.data();
    const cloudTs   = cloudData._savedAt || 0;

    // Récupérer le timestamp local depuis localStorage
    const localKey = 'lunchboxe_region_progress_' + (heroId || 'default');
    let localTs = 0;
    try {
      const raw = localStorage.getItem(localKey + '_savedAt');
      localTs = raw ? parseInt(raw, 10) : 0;
    } catch (e) { /* silently fail */ }

    const cloudProg = cloudData.progress || {};

    if (cloudTs > localTs) {
      // Cloud plus récent → màj localStorage
      try {
        localStorage.setItem(localKey, JSON.stringify(cloudProg));
        localStorage.setItem(localKey + '_savedAt', String(cloudTs));
      } catch (e) { /* silently fail */ }
      return cloudProg;
    }

    // Local plus récent → on pousse vers le cloud
    cloudSaveRegions(heroId, localProg).catch(() => {});
    return localProg;
  } catch (e) {
    console.warn('[cloud-save] Erreur merge régions :', e.message);
    return localProg;
  }
}

// ─── Indicateur de connexion dans le header du jeu ───────────────────────────

/**
 * Affiche un badge "Connecté" ou "Non connecté" dans la nav du jeu.
 * À appeler une fois au chargement de la page.
 */
export function renderCloudSyncBadge() {
  const uid = getCurrentUserId();
  const badge = document.createElement('div');
  badge.id = 'cloudSyncBadge';
  badge.style.cssText = `
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-family: var(--font-mono, monospace);
    color: ${uid ? 'var(--accent2, #4ade80)' : 'var(--muted, #888)'};
    border: 1px solid ${uid ? 'var(--accent2, #4ade80)' : 'var(--border, #333)'};
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
  `;
  badge.title = uid ? 'Sauvegarde synchronisée sur le cloud' : 'Connectez-vous pour synchroniser votre progression';
  badge.textContent = uid ? '☁️ Cloud ON' : '☁️ Local seulement';
  return badge;
}
