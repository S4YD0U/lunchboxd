// ============================================
// LOOTBOX CATALOG
// ============================================
const LOOTBOX_TIERS = [
  {
    id: 'lb_common',
    name: 'Boîte de Cantine',
    tier: 'common',
    chest: '📦',
    price: 50,
    desc: 'Une boîte récupérée à la cantine. Contenu mystérieux mais prometteur.',
    dropCount: 2,
    drops: [
      { label: 'Arme commune', rarity: 'c', chance: 0.40 },
      { label: 'Consommable', rarity: 'c', chance: 0.35 },
      { label: 'Armure commune', rarity: 'c', chance: 0.20 },
      { label: 'Arme rare', rarity: 'r', chance: 0.04 },
      { label: 'Bonus XP', rarity: 'c', chance: 0.01 },
    ],
    guarantees: ['Au moins 2 objets', 'Chance de rare'],
    lootTable: [
      { type: 'weapon', id: 'w1', rarity: 'common', weight: 20 },
      { type: 'weapon', id: 'w5', rarity: 'common', weight: 20 },
      { type: 'armor',  id: 'a1', rarity: 'common', weight: 20 },
      { type: 'armor',  id: 'a5', rarity: 'common', weight: 15 },
      { type: 'consumable', id: 'c1', rarity: 'common', weight: 25 },
      { type: 'consumable', id: 'c5', rarity: 'common', weight: 20 },
      { type: 'consumable', id: 'c6', rarity: 'common', weight: 15 },
      { type: 'weapon', id: 'w2', rarity: 'rare',   weight: 8 },
      { type: 'armor',  id: 'a2', rarity: 'rare',   weight: 8 },
      { type: 'consumable', id: 'c2', rarity: 'rare', weight: 6 },
      { type: 'gold',   amount: 20, rarity: 'common', weight: 12 },
      { type: 'gold',   amount: 35, rarity: 'rare',   weight: 5 },
    ],
  },
  {
    id: 'lb_rare',
    name: 'Boîte Mystique',
    tier: 'rare',
    chest: '🎁',
    price: 120,
    desc: 'Enveloppée d\'une aura étrange. Les professeurs de SVT sont formellement déconseillés.',
    dropCount: 3,
    drops: [
      { label: 'Arme rare', rarity: 'r', chance: 0.40 },
      { label: 'Armure rare', rarity: 'r', chance: 0.35 },
      { label: 'Consommable épique', rarity: 'e', chance: 0.15 },
      { label: 'Arme épique', rarity: 'e', chance: 0.08 },
      { label: 'Item légendaire', rarity: 'l', chance: 0.02 },
    ],
    guarantees: ['Au moins 3 objets', 'Un rare garanti', 'Chance épique'],
    lootTable: [
      { type: 'weapon', id: 'w2', rarity: 'rare',   weight: 18 },
      { type: 'weapon', id: 'w6', rarity: 'rare',   weight: 18 },
      { type: 'armor',  id: 'a2', rarity: 'rare',   weight: 18 },
      { type: 'armor',  id: 'a6', rarity: 'rare',   weight: 15 },
      { type: 'armor',  id: 'a7', rarity: 'rare',   weight: 12 },
      { type: 'consumable', id: 'c2', rarity: 'rare', weight: 18 },
      { type: 'consumable', id: 'c7', rarity: 'rare', weight: 15 },
      { type: 'consumable', id: 'c8', rarity: 'rare', weight: 12 },
      { type: 'weapon', id: 'w3', rarity: 'epic',   weight: 8 },
      { type: 'armor',  id: 'a3', rarity: 'epic',   weight: 8 },
      { type: 'consumable', id: 'c3', rarity: 'epic', weight: 8 },
      { type: 'gold',   amount: 60, rarity: 'rare',  weight: 15 },
      { type: 'gold',   amount: 100, rarity: 'epic', weight: 5 },
      { type: 'xp',     amount: 80, rarity: 'rare',  weight: 12 },
      { type: 'sp',     amount: 1,  rarity: 'legendary', weight: 2 },
    ],
  },
  {
    id: 'lb_epic',
    name: 'Boîte Légendaire',
    tier: 'epic',
    chest: '🏆',
    price: 280,
    desc: 'Un artefact brillant de la cantine. On dit que la cuisinière elle-même l\'a bénie.',
    dropCount: 4,
    drops: [
      { label: 'Arme épique', rarity: 'e', chance: 0.35 },
      { label: 'Armure épique', rarity: 'e', chance: 0.30 },
      { label: 'Consommable légendaire', rarity: 'l', chance: 0.15 },
      { label: 'Gros bonus XP', rarity: 'e', chance: 0.12 },
      { label: 'Point de skill', rarity: 'l', chance: 0.08 },
    ],
    guarantees: ['4 objets garantis', 'Un épique garanti', 'Chance légendaire', 'Bonus XP/Gold'],
    lootTable: [
      { type: 'weapon', id: 'w7', rarity: 'epic',   weight: 18 },
      { type: 'weapon', id: 'w8', rarity: 'epic',   weight: 16 },
      { type: 'weapon', id: 'w9', rarity: 'epic',   weight: 14 },
      { type: 'armor',  id: 'a8', rarity: 'epic',   weight: 18 },
      { type: 'armor',  id: 'a9', rarity: 'epic',   weight: 14 },
      { type: 'consumable', id: 'c9',  rarity: 'epic', weight: 15 },
      { type: 'consumable', id: 'c10', rarity: 'epic', weight: 12 },
      { type: 'consumable', id: 'c11', rarity: 'epic', weight: 10 },
      { type: 'consumable', id: 'c4',  rarity: 'legendary', weight: 6 },
      { type: 'gold',   amount: 150, rarity: 'epic', weight: 12 },
      { type: 'gold',   amount: 250, rarity: 'legendary', weight: 5 },
      { type: 'xp',     amount: 200, rarity: 'epic', weight: 15 },
      { type: 'xp',     amount: 400, rarity: 'legendary', weight: 6 },
      { type: 'sp',     amount: 1, rarity: 'legendary', weight: 6 },
      { type: 'sp',     amount: 2, rarity: 'legendary', weight: 2 },
    ],
  },
  {
    id: 'lb_mythic',
    name: '✨ Boîte Mythique',
    tier: 'epic',
    chest: '🌟',
    price: 500,
    desc: 'La boîte ultime. Un vestige de l\'ère où la cantine servait des dieux.',
    dropCount: 5,
    drops: [
      { label: 'Arme légendaire', rarity: 'l', chance: 0.45 },
      { label: 'Armure légendaire', rarity: 'l', chance: 0.40 },
      { label: 'Consommable ultime', rarity: 'l', chance: 0.10 },
      { label: 'Méga XP', rarity: 'l', chance: 0.04 },
      { label: '3 pts Skill', rarity: 'l', chance: 0.01 },
    ],
    guarantees: ['5 objets garantis', 'Épique ou mieux garanti', 'Légendaire très probable', 'Méga récompenses'],
    lootTable: [
      { type: 'weapon', id: 'w4',  rarity: 'epic',      weight: 15 },
      { type: 'weapon', id: 'w10', rarity: 'legendary', weight: 12 },
      { type: 'weapon', id: 'w11', rarity: 'legendary', weight: 10 },
      { type: 'weapon', id: 'w12', rarity: 'legendary', weight: 6 },
      { type: 'armor',  id: 'a4',  rarity: 'epic',      weight: 15 },
      { type: 'armor',  id: 'a10', rarity: 'legendary', weight: 12 },
      { type: 'armor',  id: 'a11', rarity: 'legendary', weight: 8 },
      { type: 'consumable', id: 'c12', rarity: 'legendary', weight: 10 },
      { type: 'consumable', id: 'c4',  rarity: 'legendary', weight: 8 },
      { type: 'gold',   amount: 400, rarity: 'legendary', weight: 10 },
      { type: 'gold',   amount: 600, rarity: 'legendary', weight: 5 },
      { type: 'xp',     amount: 600, rarity: 'legendary', weight: 12 },
      { type: 'xp',     amount: 1000, rarity: 'legendary', weight: 5 },
      { type: 'sp',     amount: 2, rarity: 'legendary', weight: 8 },
      { type: 'sp',     amount: 3, rarity: 'legendary', weight: 3 },
    ],
  }
];

// ============================================
// LOOTBOX RENDER
// ============================================
function renderLootboxGrid() {
  const el = document.getElementById('lootboxGrid');
  el.innerHTML = '';
  LOOTBOX_TIERS.forEach(lb => {
    const cantAfford = player.gold < lb.price;
    const dropPills = lb.drops.map(d =>
      `<span class="drop-pill rarity-${d.rarity}">${d.label}</span>`
    ).join('');
    const guaranteePills = lb.guarantees.map(g =>
      `<span class="drop-pill rarity-c">✓ ${g}</span>`
    ).join('');

    el.innerHTML += `
      <div class="lootbox-card tier-${lb.tier}${cantAfford ? ' cant-afford-lb' : ''}"
           onclick="${cantAfford ? '' : `openLootbox('${lb.id}')`}">
        <span class="lootbox-card-chest">${lb.chest}</span>
        <span class="lootbox-tier-badge">${lb.id === 'lb_mythic' ? '✨ Mythique' : lb.tier === 'common' ? '🔵 Commun' : lb.tier === 'rare' ? '🟣 Rare' : '🟡 Épique'}</span>
        <div class="lootbox-card-name">${lb.name}</div>
        <div class="lootbox-card-desc">${lb.desc}</div>
        <div class="lootbox-card-drops" style="margin-bottom:0.4rem;">${dropPills}</div>
        <div class="lootbox-card-drops">${guaranteePills}</div>
        <div class="lootbox-card-price">
          🪙 ${lb.price}
          <span>${cantAfford ? `Il te manque ${lb.price - player.gold} 🪙` : `${lb.dropCount} objets garantis`}</span>
        </div>
      </div>`;
  });
}

// ============================================
// LOOTBOX OPENING ANIMATION — OVERWATCH STYLE
// ============================================
let currentLbItems = [];
let lbRevealedCount = 0;
let lbTotalCards = 0;

function openLootbox(lbId) {
  if (!selectedHero) { showToast('Sélectionne un héros d\'abord !', 'error'); return; }
  const lb = LOOTBOX_TIERS.find(l => l.id === lbId);
  if (!lb) return;
  if (player.gold < lb.price) { showToast('Pas assez de pièces !', 'error'); return; }

  player.gold -= lb.price;
  savePlayer();
  updateProfileUI();

  currentLbItems = rollLootbox(lb);

  const overlay = document.getElementById('lbOverlay');
  const openStage = document.getElementById('lbOpeningStage');
  const revealStage = document.getElementById('lbRevealStage');
  overlay.classList.add('show');
  openStage.style.display = 'block';
  revealStage.classList.remove('show');
  document.getElementById('lbCloseBtn').classList.remove('show');

  // Setup beams background
  setupLbBeams(lb.tier);

  document.getElementById('lbOpeningTierLabel').textContent = `✦ ${lb.name} ✦`;
  const emoji = document.getElementById('lbChestEmoji');
  emoji.textContent = lb.chest;
  emoji.style.animation = '';
  emoji.style.filter = 'drop-shadow(0 0 0px transparent)';

  const bar = document.getElementById('lbLoadingBar');
  bar.className = 'lb-loading-bar ' + lb.tier;
  bar.style.width = '0%';
  bar.style.transition = 'none';

  const glow = document.getElementById('lbChestGlow');
  glow.className = 'lb-chest-glow glow-' + lb.tier;
  glow.style.opacity = '0';

  const glowColors = { common: '#60a5fa', rare: '#a78bfa', epic: '#f5a623', legendary: '#e84545' };
  const glowColor = glowColors[lb.tier] || '#60a5fa';

  const phases = [
    { pct: 0,   label: 'Déverrouillage des serrures...', delay: 0 },
    { pct: 30,  label: 'Résistance de la cantine neutralisée...', delay: 500 },
    { pct: 60,  label: 'Artefacts détectés...', delay: 1100 },
    { pct: 85,  label: 'Dernière protection désactivée...', delay: 1700 },
    { pct: 100, label: '⚡ OUVERTURE !', delay: 2200 },
  ];

  setTimeout(() => { bar.style.transition = 'width 0.5s ease'; }, 50);

  phases.forEach(p => {
    setTimeout(() => {
      bar.style.width = p.pct + '%';
      document.getElementById('lbOpeningLabel').textContent = p.label;
      glow.style.opacity = (p.pct / 100) * 0.9;
      emoji.style.filter = `drop-shadow(0 0 ${p.pct * 0.4}px ${glowColor})`;
    }, p.delay);
  });

  setTimeout(() => {
    emoji.style.animation = 'chestShake 0.45s ease';
  }, 1300);
  setTimeout(() => {
    emoji.style.animation = 'chestShake 0.38s ease';
    launchParticles(lb.tier, 12);
  }, 1950);
  setTimeout(() => {
    emoji.style.animation = 'chestPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
    launchParticles(lb.tier, 24);
    // Flash the overlay
    overlay.style.background = 'rgba(255,255,255,0.06)';
    setTimeout(() => { overlay.style.background = 'rgba(5,5,4,0.98)'; }, 200);
    setTimeout(() => revealItems(lb), 550);
  }, 2500);
}

function setupLbBeams(tier) {
  const beamsEl = document.getElementById('lbBgBeams');
  if (!beamsEl) return;
  beamsEl.innerHTML = '';
  const tierColors = {
    common:    ['rgba(96,165,250,0.08)', 'rgba(147,197,253,0.06)'],
    rare:      ['rgba(167,139,250,0.1)', 'rgba(196,181,253,0.07)'],
    epic:      ['rgba(245,166,35,0.1)',  'rgba(251,191,36,0.07)'],
    legendary: ['rgba(232,69,69,0.12)', 'rgba(248,113,113,0.08)'],
  };
  const cols = tierColors[tier] || tierColors.common;
  for (let i = 0; i < 10; i++) {
    const beam = document.createElement('div');
    beam.className = 'lb-beam';
    const x = 5 + i * 9 + (Math.random() - 0.5) * 5;
    beam.style.cssText = `left:${x}%;background:linear-gradient(to top, ${cols[i%2]}, transparent);height:${55+Math.random()*20}%;transform:rotate(${(Math.random()-0.5)*12}deg);opacity:0;transition:opacity 0.8s ${i*0.06}s ease;`;
    beamsEl.appendChild(beam);
  }
  requestAnimationFrame(() => {
    beamsEl.classList.add('active');
    beamsEl.querySelectorAll('.lb-beam').forEach(b => b.style.opacity = '1');
  });
}

function rollLootbox(lb) {
  const items = [];
  const totalWeight = lb.lootTable.reduce((s, e) => s + e.weight, 0);
  for (let i = 0; i < lb.dropCount; i++) {
    let r = Math.random() * totalWeight;
    for (const entry of lb.lootTable) {
      r -= entry.weight;
      if (r <= 0) { items.push({ ...entry }); break; }
    }
  }
  return items;
}

function revealItems(lb) {
  const openStage = document.getElementById('lbOpeningStage');
  const revealStage = document.getElementById('lbRevealStage');
  openStage.style.display = 'none';
  revealStage.classList.add('show');
  document.getElementById('lbCloseBtn').classList.remove('show');

  const hasLegendary = currentLbItems.some(i => i.rarity === 'legendary');
  const hasEpic = currentLbItems.some(i => i.rarity === 'epic');
  document.getElementById('lbRevealTitle').textContent =
    hasLegendary ? '🌟 LÉGENDAIRE !' : hasEpic ? '✨ Épique !' : '🎁 Contenu révélé !';
  document.getElementById('lbRevealSub').textContent =
    `${lb.name} · Clique sur chaque carte pour la révéler`;

  const row = document.getElementById('lbCardsRow');
  row.innerHTML = '';
  lbRevealedCount = 0;
  lbTotalCards = currentLbItems.length;

  currentLbItems.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'lb-item-card';
    card.dataset.idx = idx;

    let icon, name, stat, isNew = false;
    if (item.type === 'gold') {
      icon = '🪙'; name = item.amount + ' Pièces'; stat = '+' + item.amount + ' 🪙';
    } else if (item.type === 'xp') {
      icon = '⭐'; name = item.amount + ' XP'; stat = '+' + item.amount + ' XP';
    } else if (item.type === 'sp') {
      icon = '✨'; name = item.amount + ' Pt(s) Skill'; stat = '+' + item.amount + ' pts compétence';
    } else {
      const catalog = item.type === 'weapon' ? SHOP_CATALOG.weapons
                    : item.type === 'armor'  ? SHOP_CATALOG.armors
                    : SHOP_CATALOG.consumables;
      const def = catalog ? catalog.find(c => c.id === item.id) : null;
      if (def) {
        icon = def.icon; name = def.name; stat = def.stat;
        isNew = !player.owned.includes(item.id) &&
                !player.inventory.find(i => i.id === item.id);
      } else { icon = '❓'; name = '???'; stat = ''; }
    }
    const isDuplicate = (item.type === 'weapon' || item.type === 'armor') && player.owned.includes(item.id);
    const dupGold = isDuplicate ? (DUPLICATE_GOLD[item.rarity] || 10) : 0;

    const rarityLabels = { common: 'Commun', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire' };
    card.innerHTML = `
      <div class="lb-card-inner">
        <div class="lb-card-back"><div class="lb-card-back-glyph">🍱</div></div>
        <div class="lb-card-face rarity-${item.rarity}">
          ${isNew ? '<div class="lb-new-badge">NOUVEAU</div>' : ''}
          ${isDuplicate ? `<div class="lb-new-badge" style="background:rgba(245,166,35,0.25);border-color:rgba(245,166,35,0.6);color:var(--gold)">♻️ DOUBLON</div>` : ''}
          <span class="lb-item-icon">${icon}</span>
          <div class="lb-item-name">${name}</div>
          <span class="lb-item-rarity rarity-${item.rarity}">${rarityLabels[item.rarity] || item.rarity}</span>
          <div class="lb-item-stat">${isDuplicate ? `♻️ Converti en +${dupGold} 🪙` : stat}</div>
        </div>
      </div>`;

    card.onclick = () => flipLbCard(card, item, idx);
    row.appendChild(card);

    // Stagger card appearance (cards slide in face-down)
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, idx * 120 + 100);
  });

  // After all cards appear, show click hint
  setTimeout(() => {
    document.getElementById('lbClickHint').style.display = 'block';
  }, currentLbItems.length * 120 + 300);
}

function flipLbCard(card, item, idx) {
  if (card.classList.contains('revealed')) return;
  card.classList.add('revealed');
  lbRevealedCount++;

  // Burst particles from card position
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  burstFromCard(cx, cy, item.rarity);

  // Spotlight effect
  const spotlight = document.getElementById('lbSpotlight');
  if (spotlight) {
    const glowMap = {
      common:    'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)',
      rare:      'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 70%)',
      epic:      'radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)',
      legendary: 'radial-gradient(circle, rgba(232,69,69,0.30) 0%, transparent 70%)',
    };
    spotlight.style.background = glowMap[item.rarity] || glowMap.common;
    spotlight.style.left = cx + 'px';
    spotlight.style.top  = cy + 'px';
    spotlight.classList.add('active');
    setTimeout(() => spotlight.classList.remove('active'), 800);
  }

  // Sound-like screen flash for legendary
  if (item.rarity === 'legendary') {
    const overlay = document.getElementById('lbOverlay');
    overlay.style.transition = 'background 0.08s';
    overlay.style.background = 'rgba(232,69,69,0.08)';
    setTimeout(() => { overlay.style.background = 'rgba(5,5,4,0.98)'; }, 160);
    launchParticles('legendary', 20);
  } else if (item.rarity === 'epic') {
    launchParticles('epic', 10);
  }

  // When all cards revealed, show close button
  if (lbRevealedCount >= lbTotalCards) {
    document.getElementById('lbClickHint').style.display = 'none';
    setTimeout(() => {
      document.getElementById('lbCloseBtn').classList.add('show');
    }, 400);
  }
}

function burstFromCard(cx, cy, rarity) {
  const container = document.getElementById('lbParticles');
  container.classList.add('show');
  const colorMap = {
    common:    ['#60a5fa','#93c5fd'],
    rare:      ['#a78bfa','#c4b5fd','#7c3aed'],
    epic:      ['#f5a623','#fbbf24','#fff7a0'],
    legendary: ['#e84545','#f87171','#f5a623','#fff'],
  };
  const cols = colorMap[rarity] || colorMap.common;
  const count = rarity === 'legendary' ? 22 : rarity === 'epic' ? 14 : 8;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'lb-burst-particle';
    const size = 4 + Math.random() * 7;
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const dist  = 60 + Math.random() * 120;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 40;
    const rot = (Math.random() - 0.5) * 360;
    const dur = 0.5 + Math.random() * 0.5;
    p.style.cssText = `
      left:${cx}px; top:${cy}px;
      width:${size}px; height:${size}px;
      background:${cols[Math.floor(Math.random()*cols.length)]};
      --tx:${tx}px; --ty:${ty}px; --rot:${rot}deg; --dur:${dur}s;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      position:fixed;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 100);
  }
  setTimeout(() => container.classList.remove('show'), 2000);
}

function launchParticles(tier, count = 18) {
  const container = document.getElementById('lbParticles');
  container.classList.add('show');
  const colors = {
    common:    ['#60a5fa','#93c5fd','#bfdbfe'],
    rare:      ['#a78bfa','#c4b5fd','#7c3aed'],
    epic:      ['#f5a623','#fbbf24','#fef08a'],
    legendary: ['#e84545','#f87171','#fca5a5','#fff'],
  };
  const cls = colors[tier] || colors.common;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'lb-particle';
      const size = 5 + Math.random() * 8;
      const startX = 35 + Math.random() * 30;
      const startY = 30 + Math.random() * 20;
      const tx = (Math.random() - 0.5) * 440;
      const ty = -(80 + Math.random() * 220);
      p.style.cssText = `left:${startX}%;top:${startY}%;width:${size}px;height:${size}px;background:${cls[Math.floor(Math.random()*cls.length)]};--tx:${tx}px;--ty:${ty}px;animation-duration:${0.8+Math.random()*0.7}s;animation-delay:${Math.random()*0.15}s;`;
      container.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }, i * 35);
  }
  setTimeout(() => container.classList.remove('show'), 3000);
}

// Gold value for duplicate weapons/armors by rarity
const DUPLICATE_GOLD = { common: 10, rare: 30, epic: 80, legendary: 200 };

function closeLbOverlay() {
  // Apply loot to player
  let duplicateGold = 0;
  let duplicateCount = 0;

  currentLbItems.forEach(item => {
    if (item.type === 'gold') {
      player.gold += item.amount;
    } else if (item.type === 'xp') {
      addXpGold(item.amount, 0);
    } else if (item.type === 'sp') {
      player.skillPoints += item.amount;
    } else if (item.type === 'weapon' || item.type === 'armor') {
      if (!player.owned.includes(item.id)) {
        player.owned.push(item.id);
      } else {
        // Doublon → conversion en gold selon la rareté
        const gold = DUPLICATE_GOLD[item.rarity] || 10;
        duplicateGold += gold;
        duplicateCount++;
      }
    } else if (item.type === 'consumable') {
      const totalItems = player.inventory.reduce((s, i) => s + i.qty, 0);
      if (totalItems < 8) {
        const cat = SHOP_CATALOG.consumables.find(c => c.id === item.id);
        const existing = player.inventory.find(i => i.id === item.id);
        if (existing && cat && cat.stackable) existing.qty++;
        else player.inventory.push({ id: item.id, qty: 1 });
      }
    }
  });

  if (duplicateGold > 0) {
    player.gold += duplicateGold;
  }

  savePlayer();
  updateProfileUI();
  renderShop();

  // Hide beams
  const beamsEl = document.getElementById('lbBgBeams');
  if (beamsEl) { beamsEl.classList.remove('active'); beamsEl.innerHTML = ''; }

  document.getElementById('lbOverlay').classList.remove('show');
  currentLbItems = [];
  lbRevealedCount = 0;
  lbTotalCards = 0;

  if (duplicateCount > 0) {
    showToast(`🎁 Objets ajoutés ! ♻️ ${duplicateCount} doublon${duplicateCount > 1 ? 's' : ''} → +${duplicateGold} 🪙`, 'lootbox');
  } else {
    showToast('🎁 Objets ajoutés à ton inventaire !', 'lootbox');
  }
}

// ============================================
// SKILL TREE DEFINITION
// ============================================
const SKILL_BRANCHES = [
  {
    id: 'force', name: 'Voie de la Force', icon: '⚔️', desc: 'Augmente ta puissance offensive',
    skills: [
      { id: 'sk_atk1', name: 'Muscles de Spaghetti', type: 'passive', emoji: '💪', maxLevel: 3, costPerLevel: 1, reqSkill: null, desc: 'Tes bras sont comme des pâtes al dente — décoratifs mais surprenants.', effectLabel: (lv) => `+${lv * 10} ATK permanente`, effect: (stats, lv) => { stats.atk += lv * 10; return stats; }, battleDesc: null },
      { id: 'sk_atk2', name: 'Fureur du Gruyère', type: 'passive', emoji: '🧀', maxLevel: 2, costPerLevel: 1, reqSkill: 'sk_atk1', desc: 'Tu frappes avec la densité d\'un fromage vieux de 3 ans.', effectLabel: (lv) => `+${lv * 8}% dégâts critiques`, effect: null, critDmgBonus: (lv) => lv * 0.08, battleDesc: null },
      { id: 'sk_atk3', name: 'Tornade de Nouilles', type: 'active', emoji: '🍜', maxLevel: 1, costPerLevel: 2, reqSkill: 'sk_atk2', desc: '6 coups frénétiques qui percent les défenses. Charge la spéciale de +40%.', effectLabel: () => 'Actif — 6 frappes, DEF -40%, +40% spéciale', effect: null, battleDesc: 'Tornade' }
    ]
  },
  {
    id: 'survie', name: 'Voie de la Survie', icon: '🛡️', desc: 'Renforce ta résistance et ta longévité',
    skills: [
      { id: 'sk_def1', name: 'Peau de Patate', type: 'passive', emoji: '🥔', maxLevel: 3, costPerLevel: 1, reqSkill: null, desc: 'Ta peau épaissit. Les attaques glissent sur toi comme de la purée.', effectLabel: (lv) => `+${lv * 12} DEF permanente`, effect: (stats, lv) => { stats.def += lv * 12; return stats; }, battleDesc: null },
      { id: 'sk_def2', name: 'Régénération Kombucha', type: 'passive', emoji: '🫙', maxLevel: 2, costPerLevel: 1, reqSkill: 'sk_def1', desc: 'Tu te régénères grâce à des bactéries bénéfiques inconnues.', effectLabel: (lv) => `+${lv * 6} HP régénérés/tour`, effect: null, regenPerTurn: (lv) => lv * 6, battleDesc: null },
      { id: 'sk_def3', name: 'Mur de Baguette', type: 'active', emoji: '🥖', maxLevel: 1, costPerLevel: 2, reqSkill: 'sk_def2', desc: 'Frappe + bouclier 85% pendant 3 tours. Chaque coup ennemi déclenche une riposte.', effectLabel: () => 'Actif — bouclier 3t + riposte automatique', effect: null, battleDesc: 'Forteresse' }
    ]
  },
  {
    id: 'ruse', name: 'Voie de la Ruse', icon: '🎯', desc: 'Maîtrise la vitesse et les techniques secrètes',
    skills: [
      { id: 'sk_spd1', name: 'Réflexes Wasabi', type: 'passive', emoji: '🌿', maxLevel: 3, costPerLevel: 1, reqSkill: null, desc: 'Ça pique les yeux, donc tu esquives tout par réflexe.', effectLabel: (lv) => `+${lv * 8} VIT, -${lv * 3}% chance de rater`, effect: (stats, lv) => { stats.spd += lv * 8; return stats; }, missReduction: (lv) => lv * 0.03, battleDesc: null },
      { id: 'sk_spd2', name: 'Double Expresso', type: 'passive', emoji: '☕', maxLevel: 2, costPerLevel: 1, reqSkill: 'sk_spd1', desc: 'Deux cafés serrés = charge de spéciale 2× plus rapide.', effectLabel: (lv) => `+${lv * 12}% charge spéciale/tour`, effect: null, specialBonus: (lv) => lv * 12, battleDesc: null },
      { id: 'sk_spd3', name: 'Coup du Chef', type: 'active', emoji: '👨‍🍳', maxLevel: 1, costPerLevel: 2, reqSkill: 'sk_spd2', desc: 'x2.5 ATK, ignore 80% DEF, vole 35% des dégâts en HP + recharge la spéciale.', effectLabel: () => 'Actif — x2.5 ATK, vol 35% HP, DEF ignorée', effect: null, battleDesc: 'Coup du Chef' }
    ]
  }
];

const XP_CURVE = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
const LEVEL_UNLOCKS = {
  2: { attack: 'combo_plus', msg: '🔥 Nouvelle attaque débloquée : Combo+ !' },
  3: { attack: 'piercing',   msg: '🗡️ Nouvelle attaque débloquée : Frappe Perforante !' },
  4: { attack: 'counter',    msg: '⚡ Nouvelle attaque débloquée : Contre-attaque !' },
  5: { attack: 'ultimate',   msg: '💥 Attaque ultime débloquée : DEVASTATION !' },
};
const STAT_GROWTH = { hp: 12, atk: 4, def: 3, spd: 2 };

const SHOP_CATALOG = {
  weapons: [
    { id: 'w1',  name: 'Fourchette Rouillée',     icon: '🍴',  type: 'weapon', price: 30,  stat: '+8 ATK',   atkBonus: 8,  defBonus: 0,  desc: 'Vieille mais efficace.', reqLv: 1 },
    { id: 'w2',  name: 'Couteau à Beurre',         icon: '🔪',  type: 'weapon', price: 70,  stat: '+18 ATK',  atkBonus: 18, defBonus: 0,  desc: 'Plus tranchant qu\'il n\'y paraît.', reqLv: 2 },
    { id: 'w5',  name: 'Baguette de Pain',         icon: '🥖',  type: 'weapon', price: 55,  stat: '+14 ATK +5 DEF', atkBonus: 14, defBonus: 5,  desc: 'Croustillante. Redoutable.', reqLv: 1 },
    { id: 'w6',  name: 'Pince à Crustacé',         icon: '🦞',  type: 'weapon', price: 95,  stat: '+24 ATK',  atkBonus: 24, defBonus: 0,  desc: 'Saisit les ennemis et ne lâche plus.', reqLv: 2 },
    { id: 'w7',  name: 'Poêle en Fonte',           icon: '🍳',  type: 'weapon', price: 120, stat: '+28 ATK +8 DEF', atkBonus: 28, defBonus: 8,  desc: 'La cuisine c\'est aussi de la résistance.', reqLv: 3 },
    { id: 'w3',  name: 'Spatule Légendaire',       icon: '🥄',  type: 'weapon', price: 150, stat: '+35 ATK',  atkBonus: 35, defBonus: 0,  desc: 'Forgée dans les flammes du four.', reqLv: 3 },
    { id: 'w8',  name: 'Tentacule de Calmar',      icon: '🦑',  type: 'weapon', price: 200, stat: '+42 ATK',  atkBonus: 42, defBonus: 0,  desc: 'Flexible. Imprévisible. Visqueux.', reqLv: 4 },
    { id: 'w9',  name: 'Sceptre de Mozzarella',    icon: '🧇',  type: 'weapon', price: 220, stat: '+38 ATK +10 DEF', atkBonus: 38, defBonus: 10, desc: 'Fondu à l\'intérieur, dur à l\'extérieur.', reqLv: 4 },
    { id: 'w4',  name: 'Rouleau de Sushi Épique',  icon: '🍣',  type: 'weapon', price: 280, stat: '+55 ATK +5 DEF', atkBonus: 55, defBonus: 5,  desc: 'Une arme digne des grands maîtres.', reqLv: 5 },
    { id: 'w10', name: 'Lance-Sauce Légendaire',   icon: '🫙',  type: 'weapon', price: 350, stat: '+68 ATK',  atkBonus: 68, defBonus: 0,  desc: 'Propulse de la sauce à haute vélocité.', reqLv: 6 },
    { id: 'w11', name: 'Épée de Glace Pilée',      icon: '🧊',  type: 'weapon', price: 400, stat: '+75 ATK +12 DEF', atkBonus: 75, defBonus: 12, desc: 'Tranchante, froide, absolue.', reqLv: 7 },
    { id: 'w12', name: 'Trident du Chef Étoilé',   icon: '⭐',  type: 'weapon', price: 500, stat: '+90 ATK',  atkBonus: 90, defBonus: 0,  desc: 'Forgé dans les étoiles Michelin.', reqLv: 8 },
  ],
  armors: [
    { id: 'a1',  name: 'Tablier Troué',            icon: '🥼',  type: 'armor',  price: 25,  stat: '+10 DEF',  atkBonus: 0,  defBonus: 10, desc: 'Une protection basique.', reqLv: 1 },
    { id: 'a5',  name: 'Gants de Four',            icon: '🧤',  type: 'armor',  price: 35,  stat: '+14 DEF',  atkBonus: 0,  defBonus: 14, desc: 'Résistants jusqu\'à 250°C.', reqLv: 1 },
    { id: 'a2',  name: 'Casque de Casserole',      icon: '🪖',  type: 'armor',  price: 60,  stat: '+22 DEF',  atkBonus: 0,  defBonus: 22, desc: 'Certifié anti-éclaboussures.', reqLv: 2 },
    { id: 'a6',  name: 'Gilet en Nori',            icon: '🌿',  type: 'armor',  price: 80,  stat: '+18 DEF +5 ATK', atkBonus: 5, defBonus: 18, desc: 'Léger et surprenant.', reqLv: 2 },
    { id: 'a7',  name: 'Cape de Poulpe',           icon: '🐙',  type: 'armor',  price: 100, stat: '+28 DEF',  atkBonus: 0,  defBonus: 28, desc: 'S\'adapte à tout grâce à ses tentacules.', reqLv: 2 },
    { id: 'a3',  name: 'Armure de Parmesan',       icon: '🧀',  type: 'armor',  price: 130, stat: '+40 DEF',  atkBonus: 0,  defBonus: 40, desc: 'Dur comme de la pierre. Et ça sent.', reqLv: 3 },
    { id: 'a8',  name: 'Bouclier de Tarte',        icon: '🥧',  type: 'armor',  price: 160, stat: '+35 DEF +8 ATK', atkBonus: 8, defBonus: 35, desc: 'Absorbant. Sucré. Mortel.', reqLv: 3 },
    { id: 'a4',  name: 'Bouclier de Baguette',     icon: '🥖',  type: 'armor',  price: 250, stat: '+62 DEF +5 ATK', atkBonus: 5, defBonus: 62, desc: 'Béni par le boulanger du village.', reqLv: 4 },
    { id: 'a9',  name: 'Cuirasse de Croûte',       icon: '🍞',  type: 'armor',  price: 280, stat: '+70 DEF',  atkBonus: 0,  defBonus: 70, desc: 'Aussi dur que le pain rassis du lundi.', reqLv: 5 },
    { id: 'a10', name: 'Armure de Caramel Dur',    icon: '🍮',  type: 'armor',  price: 350, stat: '+85 DEF +10 ATK', atkBonus: 10, defBonus: 85, desc: 'Caramélisée à la torche. Indestructible.', reqLv: 6 },
    { id: 'a11', name: 'Égide de Chocolat Noir',   icon: '🍫',  type: 'armor',  price: 450, stat: '+100 DEF', atkBonus: 0,  defBonus: 100, desc: 'Tempéré à la perfection. Amer. Invincible.', reqLv: 7 },
  ],
  consumables: [
    { id: 'c1',  name: 'Petite Potion Verte',      icon: '🧃',  type: 'consumable', price: 15,  stat: 'Soin +80 HP',  healAmt: 80,  atkMult: 0, desc: 'Un petit jus de légumes réconfortant.', reqLv: 1, stackable: true },
    { id: 'c5',  name: 'Banane Boostée',           icon: '🍌',  type: 'consumable', price: 20,  stat: 'Soin +50 HP +10% ATK', healAmt: 50, atkMult: 0.1, duration: 1, desc: 'Un régime, une philosophie.', reqLv: 1, stackable: true },
    { id: 'c6',  name: 'Thé Vert Concentré',       icon: '🍵',  type: 'consumable', price: 25,  stat: '+15% VIT (2 tours)', healAmt: 0, atkMult: 0, spdMult: 0.15, duration: 2, desc: 'L\'esprit s\'aiguise, le corps suit.', reqLv: 1, stackable: true },
    { id: 'c2',  name: 'Potion de Force',          icon: '🥤',  type: 'consumable', price: 40,  stat: '+30% ATK (2 tours)', healAmt: 0, atkMult: 0.3, duration: 2, desc: 'De la caféine pure. Dangereux.', reqLv: 2, stackable: true },
    { id: 'c7',  name: 'Smoothie Épinard-Fer',     icon: '🥬',  type: 'consumable', price: 45,  stat: 'Soin +120 HP', healAmt: 120, atkMult: 0, desc: 'Vert. Épais. Puissant.', reqLv: 2, stackable: true },
    { id: 'c8',  name: 'Chili Piment Fantôme',     icon: '🌶️', type: 'consumable', price: 60,  stat: '+50% ATK (1 tour)', healAmt: 0, atkMult: 0.5, duration: 1, desc: 'Ça brûle. Tout. Même les ennemis.', reqLv: 2, stackable: true },
    { id: 'c3',  name: 'Elixir du Champion',       icon: '🍶',  type: 'consumable', price: 90,  stat: 'Soin +200 HP +20% ATK', healAmt: 200, atkMult: 0.2, duration: 2, desc: 'Une recette secrète de la cantine.', reqLv: 3, stackable: true },
    { id: 'c9',  name: 'Potion de Pierre',         icon: '🪨',  type: 'consumable', price: 80,  stat: '+40% DEF (2 tours)', healAmt: 0, atkMult: 0, defMult: 0.4, duration: 2, desc: 'Bois ça et deviens inébranlable.', reqLv: 3, stackable: true },
    { id: 'c10', name: 'Sauce Secrète Niveau 9',   icon: '🫙',  type: 'consumable', price: 110, stat: 'Soin +150 HP +35% ATK', healAmt: 150, atkMult: 0.35, duration: 2, desc: 'La recette est dans le coffre-fort.', reqLv: 4, stackable: true },
    { id: 'c11', name: 'Ambroisie de Cantine',     icon: '🍯',  type: 'consumable', price: 140, stat: 'Soin +300 HP', healAmt: 300, atkMult: 0, desc: 'On dit que la cuisinière pleure dedans.', reqLv: 4, stackable: true },
    { id: 'c4',  name: 'Soupe Magique',            icon: '🍲',  type: 'consumable', price: 200, stat: 'HP MAX restauré', healAmt: 9999, atkMult: 0, desc: 'La mère de toutes les soupes.', reqLv: 5, stackable: false },
    { id: 'c12', name: 'Sérum d\'Invincibilité',   icon: '💉',  type: 'consumable', price: 300, stat: '+60% ATK +50% DEF (3 tours)', healAmt: 0, atkMult: 0.6, defMult: 0.5, duration: 3, desc: 'Développé dans les labos secrets de la cantine.', reqLv: 6, stackable: false },
  ],
  specials: [
    { id: 's1',  name: 'Médaille de Goûteur',      icon: '🏅',  type: 'special', price: 500, stat: '+5% à tout', atkBonus: 5, defBonus: 5, desc: 'Pour les vrais connaisseurs.', reqLv: 5 },
    { id: 's2',  name: 'Toque du Grand Chef',      icon: '👨‍🍳', type: 'special', price: 800, stat: '+15% XP gagné', atkBonus: 0, defBonus: 0, desc: 'Le savoir s\'accumule plus vite.', reqLv: 7 },
  ]
};

const DEFAULT_CHAR_SAVE = () => ({
  level: 1, xp: 0, totalXp: 0, gold: 0,
  skillPoints: 0, skillPointsSpent: 0,
  unlockedSkills: {},
  unlockedAttacks: ['punch', 'combo', 'defend', 'special'],
  equippedLoadout: ['punch', 'combo', 'defend', 'special'],
  owned: [], equipped: { weapon: null, armor: null }, inventory: [],
});

function loadCharSave(charId) {
  try {
    const raw = localStorage.getItem('lunchboxe_char_' + charId);
    if (raw) return Object.assign(DEFAULT_CHAR_SAVE(), JSON.parse(raw));
  } catch(e) {}
  return DEFAULT_CHAR_SAVE();
}

function savePlayer() {
  if (!selectedHero) return;
  localStorage.setItem('lunchboxe_char_' + selectedHero, JSON.stringify(player));
}

function switchCharSave(charId) { player = loadCharSave(charId); }
let player = DEFAULT_CHAR_SAVE();

function getXpForLevel(lv) { return XP_CURVE[Math.min(lv, XP_CURVE.length - 1)] || XP_CURVE[XP_CURVE.length-1]; }
function getXpProgress() {
  const prev = player.level > 1 ? getXpForLevel(player.level - 1) : 0;
  const next = getXpForLevel(player.level);
  return Math.max(0, Math.min(100, ((player.xp - prev) / (next - prev)) * 100));
}

// Skill helpers
function getSkillLevel(id) { return player.unlockedSkills[id] || 0; }
function getSkillDef(id) {
  for (const branch of SKILL_BRANCHES) { const sk = branch.skills.find(s => s.id === id); if (sk) return sk; }
  return null;
}
function isSkillUnlocked(id) { return getSkillLevel(id) > 0; }
function isSkillPrereqMet(skill) { if (!skill.reqSkill) return true; return isSkillUnlocked(skill.reqSkill); }

function buySkill(id) {
  const sk = getSkillDef(id); if (!sk) return;
  if (!isSkillPrereqMet(sk)) { showToast('🔒 Prérequis non rempli !', 'error'); return; }
  const currentLv = getSkillLevel(id);
  if (currentLv >= sk.maxLevel) { showToast('✅ Compétence déjà au niveau max !', 'info'); return; }
  if (player.skillPoints < sk.costPerLevel) { showToast('✨ Pas assez de points de compétence !', 'error'); return; }
  player.skillPoints -= sk.costPerLevel;
  player.skillPointsSpent += sk.costPerLevel;
  player.unlockedSkills[id] = currentLv + 1;
  savePlayer(); renderSkillTree(); updateProfileUI();
  showToast(`${sk.emoji} ${sk.name} — niveau ${currentLv + 1} !`, 'skill');
}

function applyPassiveSkills(stats) {
  for (const branch of SKILL_BRANCHES) { for (const sk of branch.skills) { const lv = getSkillLevel(sk.id); if (lv > 0 && sk.effect) sk.effect(stats, lv); } }
  return stats;
}
function getPassiveMissReduction() { let r=0; for(const b of SKILL_BRANCHES) for(const sk of b.skills){const lv=getSkillLevel(sk.id);if(lv>0&&sk.missReduction)r+=sk.missReduction(lv);} return r; }
function getPassiveCritBonus() { let r=0; for(const b of SKILL_BRANCHES) for(const sk of b.skills){const lv=getSkillLevel(sk.id);if(lv>0&&sk.critDmgBonus)r+=sk.critDmgBonus(lv);} return r; }
function getPassiveRegenPerTurn() { let r=0; for(const b of SKILL_BRANCHES) for(const sk of b.skills){const lv=getSkillLevel(sk.id);if(lv>0&&sk.regenPerTurn)r+=sk.regenPerTurn(lv);} return r; }
function getPassiveSpecialBonus() { let r=0; for(const b of SKILL_BRANCHES) for(const sk of b.skills){const lv=getSkillLevel(sk.id);if(lv>0&&sk.specialBonus)r+=sk.specialBonus(lv);} return r; }
function getActiveTreeSkills() { const res=[]; for(const b of SKILL_BRANCHES) for(const sk of b.skills) if(sk.type==='active'&&getSkillLevel(sk.id)>0) res.push(sk); return res; }

function renderSkillTree() {
  document.getElementById('spAvailDisplay').textContent = player.skillPoints;
  document.getElementById('spTotalDisplay').textContent = player.skillPointsSpent + ' dépensés au total';
  const container = document.getElementById('skillBranches');
  container.innerHTML = '';
  for (const branch of SKILL_BRANCHES) {
    const branchEl = document.createElement('div');
    branchEl.className = 'skill-branch';
    branchEl.innerHTML = `<div class="branch-header"><span class="branch-icon">${branch.icon}</span><div class="branch-name">${branch.name}</div><div class="branch-desc">${branch.desc}</div></div>`;
    branch.skills.forEach((sk, idx) => {
      const currentLv = getSkillLevel(sk.id);
      const maxed = currentLv >= sk.maxLevel;
      const prereqMet = isSkillPrereqMet(sk);
      const canAfford = player.skillPoints >= sk.costPerLevel;
      const prevSkUnlocked = idx === 0 ? true : getSkillLevel(branch.skills[idx-1].id) > 0;
      const nodeEl = document.createElement('div');
      nodeEl.className = 'skill-node' + (prevSkUnlocked && idx > 0 ? ' prev-unlocked' : '');
      let cardCls = 'skill-card';
      if (maxed) cardCls += ' maxed' + (sk.type === 'active' ? ' active-skill' : '');
      else if (currentLv > 0) cardCls += ' unlocked' + (sk.type === 'active' ? ' active-skill' : '');
      else if (!prereqMet) cardCls += ' locked-skill';
      let badge = '';
      if (maxed) badge = `<span class="skill-badge sb-maxed">MAX</span>`;
      else if (currentLv > 0 && sk.type === 'active') badge = `<span class="skill-badge sb-active">ACTIF</span>`;
      else if (!prereqMet) badge = `<span class="skill-badge" style="background:rgba(122,122,110,0.1);color:var(--muted);border:1px solid var(--border)">🔒</span>`;
      else if (canAfford && !maxed) badge = `<span class="skill-badge sb-new">NOUVEAU</span>`;
      const dots = Array.from({length: sk.maxLevel}, (_,i) => {
        const filled = i < currentLv;
        const cls = filled ? (sk.type==='active'?'skill-dot filled-active':'skill-dot filled') : 'skill-dot';
        return `<div class="${cls}"></div>`;
      }).join('');
      const costLabel = maxed ? `<span class="skill-cost maxed-label">✅ Max</span>` : !prereqMet ? `<span class="skill-cost locked-label">🔒 Bloqué</span>` : `<span class="skill-cost">✨ ${sk.costPerLevel} pt${sk.costPerLevel>1?'s':''}</span>`;
      const typeCls = sk.type === 'active' ? 'type-active' : 'type-passive';
      const typeLabel = sk.type === 'active' ? '⚡ Actif' : '📊 Passif';
      const clickAttr = (!maxed && prereqMet) ? `onclick="buySkill('${sk.id}')"` : '';
      nodeEl.innerHTML = `<div class="${cardCls}" ${clickAttr}>${badge}<div class="skill-card-top"><span class="skill-emoji">${sk.emoji}</span><div class="skill-info"><div class="skill-name">${sk.name}</div><span class="skill-type-tag ${typeCls}">${typeLabel}</span></div></div><div class="skill-desc">${sk.desc}</div><div class="skill-effect">${sk.effectLabel(Math.max(currentLv,1))}</div><div class="skill-footer"><div class="skill-dots">${dots}</div>${costLabel}</div></div>`;
      branchEl.appendChild(nodeEl);
    });
    container.appendChild(branchEl);
  }
}

function updateProfileUI() {
  document.getElementById('profileLevelBadge').textContent = 'LV.' + player.level;
  document.getElementById('profileGold').textContent = player.gold;
  document.getElementById('profileTotalXp').textContent = player.totalXp;
  document.getElementById('profileSp').textContent = player.skillPoints;
  const pct = getXpProgress();
  document.getElementById('profileXpFill').style.width = pct + '%';
  const prev = player.level > 1 ? getXpForLevel(player.level-1) : 0;
  const next  = getXpForLevel(player.level);
  document.getElementById('profileXpLabel').textContent = (player.xp - prev) + ' / ' + (next - prev) + ' XP';
  const heroNames = { fraise: 'Fraise', poire: 'Poire', patate: 'Patate Hongroise' };
  const heroIcons = { fraise: '🍓', poire: '🍐', patate: '🥔' };
  if (selectedHero) {
    document.getElementById('profileName').textContent = heroNames[selectedHero] || 'Aventurier';
    document.getElementById('profileAvatar').textContent = heroIcons[selectedHero] || '⚔';
  } else {
    document.getElementById('profileName').textContent = 'Sélectionne un héros';
    document.getElementById('profileAvatar').textContent = '⚔';
  }
}

function getLevelStats(baseChar) {
  const bonus = player.level - 1;
  const weaponItem = player.equipped.weapon ? SHOP_CATALOG.weapons.find(w => w.id === player.equipped.weapon) : null;
  const armorItem  = player.equipped.armor  ? SHOP_CATALOG.armors.find(a => a.id === player.equipped.armor)  : null;
  let stats = {
    hp:  baseChar.hp  * 10 + bonus * STAT_GROWTH.hp,
    atk: baseChar.atk + bonus * STAT_GROWTH.atk + (weaponItem ? weaponItem.atkBonus : 0),
    def: baseChar.def + bonus * STAT_GROWTH.def + (armorItem  ? armorItem.defBonus  : 0),
    spd: baseChar.spd + bonus * STAT_GROWTH.spd,
  };
  return applyPassiveSkills(stats);
}

function addXpGold(xpAmt, goldAmt) {
  player.xp += xpAmt; player.totalXp += xpAmt; player.gold += goldAmt;
  let leveled = false;
  while (player.level < XP_CURVE.length && player.xp >= getXpForLevel(player.level)) {
    player.level++;
    player.skillPoints += 1;
    leveled = true;
    const unlock = LEVEL_UNLOCKS[player.level];
    if (unlock && !player.unlockedAttacks.includes(unlock.attack)) player.unlockedAttacks.push(unlock.attack);
  }
  savePlayer(); updateProfileUI();
  return leveled;
}

function showScreen(name) {
  // map screen stays visible in background when select would have been shown
  const displayName = (name === 'select') ? 'map' : name;
  ['map','shop','skills','loadout','battle','victory'].forEach(s => {
    const el = document.getElementById('screen-' + s);
    if (el) el.style.display = 'none';
  });
  const tabs = document.getElementById('screenTabs');
  const profile = document.getElementById('playerProfile');
  const lvBanner = document.getElementById('levelupBanner');
  ['map','shop','skills','loadout'].forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (btn) btn.classList.remove('active');
  });
  if (['map','select','shop','skills','loadout'].includes(displayName)) {
    tabs.style.display = ''; profile.style.display = ''; lvBanner.style.display = '';
    const btn = document.getElementById('tab-' + displayName);
    if (btn) btn.classList.add('active');
  } else {
    tabs.style.display = 'none'; profile.style.display = 'none';
  }
  const el = document.getElementById('screen-' + displayName);
  if (el) el.style.display = 'block';
  if (displayName === 'map') { renderWorldMap(); renderHeroGrid(); }
}

function switchTab(name) {
  showScreen(name);
  if (name === 'shop') renderShop();
  if (name === 'skills') renderSkillTree();
  if (name === 'map') { renderWorldMap(); renderHeroGrid(); }
  if (name === 'loadout') renderLoadout();
}

function renderShop() {
  renderLootboxGrid();
  renderShopSection('shopWeapons', SHOP_CATALOG.weapons);
  renderShopSection('shopArmors', SHOP_CATALOG.armors);
  renderShopSection('shopConsumables', SHOP_CATALOG.consumables);
  renderInventory();
}

function renderShopSection(containerId, items) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';
  items.forEach(item => {
    const owned = player.owned.includes(item.id);
    const equipped = player.equipped.weapon === item.id || player.equipped.armor === item.id;
    const inInv = player.inventory.find(i => i.id === item.id);
    const qty = inInv ? inInv.qty : 0;
    const cantAfford = player.gold < item.price;
    const locked = player.level < item.reqLv;
    const ownedOrInInv = owned || qty > 0;
    let cls = 'shop-item';
    if (equipped) cls += ' equipped';
    else if (owned && item.type !== 'consumable') cls += ' owned';
    else if (cantAfford && !ownedOrInInv) cls += ' cant-afford';
    let badge = '';
    if (locked) badge = `<span class="shop-item-badge badge-locked">🔒 LV.${item.reqLv}</span>`;
    else if (equipped) badge = `<span class="shop-item-badge badge-equipped-tag">ÉQUIPÉ</span>`;
    else if (owned && item.type !== 'consumable') badge = `<span class="shop-item-badge badge-owned">POSSÉDÉ</span>`;
    else if (qty > 0) badge = `<span class="shop-item-badge badge-owned">×${qty}</span>`;
    let btnAction = '';
    if (locked) btnAction = '';
    else if (item.type === 'consumable') btnAction = `onclick="buyConsumable('${item.id}')"`;
    else if (equipped) btnAction = `onclick="unequip('${item.id}','${item.type}')"`;
    else if (owned) btnAction = `onclick="equipItem('${item.id}','${item.type}')"`;
    else btnAction = `onclick="buyItem('${item.id}','${item.type}')"`;
    const priceLabel = owned && item.type !== 'consumable' ? (equipped ? 'Déséquiper' : 'Équiper') : `🪙 ${item.price}`;
    el.innerHTML += `<div class="${cls}" ${btnAction}>${badge}<div class="shop-item-icon">${item.icon}</div><div class="shop-item-name">${item.name}</div><div class="shop-item-stat">${item.stat}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-footer"><span class="shop-item-price">${priceLabel}</span><span class="shop-item-type">${item.type==='weapon'?'ARME':item.type==='armor'?'ARMURE':'CONSOMMABLE'}</span></div></div>`;
  });
}

function renderInventory() {
  const weaponSlot = document.getElementById('equippedWeapon');
  const armorSlot  = document.getElementById('equippedArmor');
  const w = player.equipped.weapon ? SHOP_CATALOG.weapons.find(x => x.id === player.equipped.weapon) : null;
  const a = player.equipped.armor  ? SHOP_CATALOG.armors.find(x => x.id === player.equipped.armor)   : null;
  if (w) { weaponSlot.className='equipped-slot filled'; weaponSlot.innerHTML=`<span class="slot-icon">${w.icon}</span><div class="slot-name">${w.name}</div><div class="slot-stat">${w.stat}</div>`; }
  else   { weaponSlot.className='equipped-slot'; weaponSlot.innerHTML=`<span class="slot-icon">🗡️</span><div class="slot-name">Aucune</div><div class="slot-stat">—</div>`; }
  if (a) { armorSlot.className='equipped-slot filled'; armorSlot.innerHTML=`<span class="slot-icon">${a.icon}</span><div class="slot-name">${a.name}</div><div class="slot-stat">${a.stat}</div>`; }
  else   { armorSlot.className='equipped-slot'; armorSlot.innerHTML=`<span class="slot-icon">🛡️</span><div class="slot-name">Aucune</div><div class="slot-stat">—</div>`; }
  const invEl = document.getElementById('invSlots');
  invEl.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const item = player.inventory[i];
    if (item) { const cat = SHOP_CATALOG.consumables.find(c => c.id === item.id); invEl.innerHTML += `<div class="inv-slot" title="${cat?cat.name:''}">${cat?cat.icon:'?'}<span class="slot-count">${item.qty>1?item.qty:''}</span></div>`; }
    else invEl.innerHTML += `<div class="inv-slot empty">·</div>`;
  }
}

function buyItem(id, type) {
  const cat = type==='weapon'?SHOP_CATALOG.weapons:SHOP_CATALOG.armors;
  const item = cat.find(i=>i.id===id); if(!item) return;
  if(player.level<item.reqLv){showToast('🔒 Niveau '+item.reqLv+' requis !','error');return;}
  if(player.gold<item.price){showToast('🪙 Pas assez de pièces !','error');return;}
  player.gold-=item.price; player.owned.push(id);
  player.equipped[type==='weapon'?'weapon':'armor']=id;
  savePlayer(); renderShop(); updateProfileUI();
  showToast(item.icon+' '+item.name+' acheté & équipé !','success');
}

function buyConsumable(id) {
  const item=SHOP_CATALOG.consumables.find(i=>i.id===id); if(!item) return;
  if(player.level<item.reqLv){showToast('🔒 Niveau '+item.reqLv+' requis !','error');return;}
  if(player.gold<item.price){showToast('🪙 Pas assez de pièces !','error');return;}
  const totalItems=player.inventory.reduce((sum,i)=>sum+i.qty,0);
  if(totalItems>=8){showToast('🎒 Inventaire plein (8 max) !','error');return;}
  player.gold-=item.price;
  const existing=player.inventory.find(i=>i.id===id);
  if(existing&&item.stackable) existing.qty++;
  else player.inventory.push({id,qty:1});
  savePlayer(); renderShop(); updateProfileUI();
  showToast(item.icon+' '+item.name+' ajouté à l\'inventaire !','success');
}

function equipItem(id, type) {
  player.equipped[type==='weapon'?'weapon':'armor']=id;
  savePlayer(); renderShop(); updateProfileUI();
  renderInvWeapons(); renderInvArmors();
  const cat=type==='weapon'?SHOP_CATALOG.weapons:SHOP_CATALOG.armors;
  const item=cat.find(i=>i.id===id);
  showToast((item?item.icon:'')+' Équipé !','success');
}

function unequip(id, type) {
  player.equipped[type==='weapon'?'weapon':'armor']=null;
  savePlayer(); renderShop(); updateProfileUI();
  renderInvWeapons(); renderInvArmors();
  showToast('Déséquipé.','info');
}

// ============================================
// ENEMIES & HEROES
// ============================================
// ============================================
// REGIONS & ENEMIES
// ============================================
const REGIONS = [
  {
    id: 'foret_epices', name: 'La Forêt des Épices', num: 1,
    icon: '🌿', color: '#639922', colorBg: 'rgba(99,153,34,0.12)', colorBorder: 'rgba(99,153,34,0.4)',
    biome: 'Jungle tropicale — parfumée et traîtresse',
    story: 'Les épices se sont révoltées. Depuis que le Grand Poivrier a été renversé de son piédestal par des forces obscures, ses lieutenants règnent sur la forêt et empoisonnent les récoltes. La cantine commence à manquer de saveur — et c\'est une catastrophe sans précédent.',
    enemies: ['piment_sauvage','cannelle_corrompue','grand_poivrier']
  },
  {
    id: 'desert_sel', name: 'Le Désert du Sel', num: 2,
    icon: '🏜️', color: '#BA7517', colorBg: 'rgba(186,117,23,0.12)', colorBorder: 'rgba(186,117,23,0.4)',
    biome: 'Plaines arides — cristaux de sel à perte de vue',
    story: 'Jadis terres de préservation et de conservation, le Désert du Sel est tombé sous le joug du Seigneur Anchois — une créature marinée depuis si longtemps qu\'elle est devenue immortelle. Quiconque s\'aventure ici finit… salé.',
    enemies: ['sardine_errante','cornichon_ennemi','seigneur_anchois']
  },
  {
    id: 'marais_vinaigre', name: 'Les Marais du Vinaigre', num: 3,
    icon: '🌫️', color: '#7F77DD', colorBg: 'rgba(127,119,221,0.12)', colorBorder: 'rgba(127,119,221,0.4)',
    biome: 'Zones humides et acides — brume permanente',
    story: 'Un endroit où tout est aigre — l\'air, l\'eau, les habitants. Le Maître du Dojo Fermenté est né ici, formé par les vapeurs du vinaigre de riz. Ses disciples sont invisibles, rapides, et ne pardonnent jamais une attaque ratée.',
    enemies: ['algue_fantome','sushi_ninja','maitre_dojo']
  },
  {
    id: 'pics_sorbet', name: 'Les Pics Glacés du Sorbet', num: 4,
    icon: '🧊', color: '#378ADD', colorBg: 'rgba(55,138,221,0.12)', colorBorder: 'rgba(55,138,221,0.4)',
    biome: 'Montagnes enneigées — cristaux de sucre gelé',
    story: 'Là-haut, le froid conserve tout — y compris les rancœurs. La Reine Glace, ancienne cheffe pâtissière de la cantine, a été renvoyée il y a dix ans pour avoir surgelé un élève par mégarde. Elle n\'a pas oublié. Elle n\'a pas pardonné.',
    enemies: ['esquimau_maudit','yeti_meringue','reine_glace']
  },
  {
    id: 'volcan_cantine', name: 'Le Volcan de la Cantine', num: 5,
    icon: '🌋', color: '#D85A30', colorBg: 'rgba(216,90,48,0.12)', colorBorder: 'rgba(216,90,48,0.4)',
    biome: 'Caldeira en fusion — laves de sauce tomate',
    story: 'Au cœur du monde, là où la chaleur des fourneaux a tout consumé. Banane s\'est autoproclamé Seigneur Suprême de la Cantine depuis sa citadelle de lave. Pour le vaincre, il faudra avoir tout traversé — et s\'en souvenir.',
    enemies: ['garde_tomate','banane_corrompue','banane']
  }
];

const ALL_ENEMIES = {
  // === RÉGION 1 : Forêt des Épices ===
  piment_sauvage: { id:'piment_sauvage', name:'Piment Sauvage', type:'villain', class:'Éclaireur de la Forêt', sprite:'piment', isBoss:false, hp:75, atk:55, def:40, spd:82, quote:'"Tu vas brûler."', special:{name:'🌶️ Flamme Épicée',fn:(v)=>{const dmg=Math.floor(v.atk*1.2+Math.random()*18);return{dmg,log:'🌶️ FLAMME ÉPICÉE — '+dmg+' dégâts brûlants !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"La forêt m'appartient !",taunted:false},{threshold:0.4,taunt:"Impossible… je suis trop épicé pour ça !",taunted:false}], narratorLines:{taunt:["Le Piment Sauvage crache ses flammes.","L'air devient irrespirable.","Ça brûle même à distance."]}},
  cannelle_corrompue: { id:'cannelle_corrompue', name:'Cannelle Corrompue', type:'villain', class:'Lieutenante Parfumée', sprite:'cannelle', isBoss:false, hp:95, atk:65, def:52, spd:70, quote:'"Mon parfum est mon poison."', special:{name:'🍂 Volute Toxique',fn:(v)=>{const dmg=Math.floor(v.atk*1.35+Math.random()*20);return{dmg,log:'🍂 VOLUTE TOXIQUE — '+dmg+' dégâts ensorcelants !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Tu trouveras cette odeur… inoubliable.",taunted:false},{threshold:0.4,taunt:"Ma corruption s'étend. Tu ne peux pas gagner.",taunted:false}], narratorLines:{taunt:["La Cannelle Corrompue ondule dans les airs.","Un parfum doux-amer envahit l'arène.","Quelque chose de beau peut-il être si dangereux ?"]}},
  grand_poivrier: { id:'grand_poivrier', name:'Grand Poivrier Noir', type:'villain', class:'Boss de la Forêt des Épices', sprite:'poivre', isBoss:true, hp:145, atk:78, def:62, spd:60, quote:'"J\'ai régné sur ces forêts depuis l\'éternité. Tu n\'es qu\'un grain de poussière."', special:{name:'⚫ Tempête de Poivre',fn:(v)=>{const dmg=Math.floor(v.atk*1.7+Math.random()*35);return{dmg,log:'⚫ TEMPÊTE DE POIVRE — '+dmg+' dégâts cataclysmiques !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Approche, petit intrus…",taunted:false},{threshold:0.6,taunt:"Tu oses me provoquer ? Bien.",taunted:false},{threshold:0.25,taunt:"IMPOSSIBLE. Je suis NOIR. Je suis ÉTERNEL !",taunted:false}], narratorLines:{taunt:["Le Grand Poivrier Noir domine l'arène de sa stature imposante.","L'air se remplit d'une odeur piquante et suffocante.","Le roi des épices n'a pas encore montré sa vraie force."]}},

  // === RÉGION 2 : Désert du Sel ===
  sardine_errante: { id:'sardine_errante', name:'Sardine Errante', type:'villain', class:'Égarée du Désert', sprite:'sardine', isBoss:false, hp:80, atk:58, def:44, spd:75, quote:'"Je suis perdue… mais je mords quand même."', special:{name:'🐟 Nageoire Acérée',fn:(v)=>{const dmg=Math.floor(v.atk*1.15+Math.random()*16);return{dmg,log:'🐟 NAGEOIRE ACÉRÉE — '+dmg+' dégâts !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Je ne sais même plus pourquoi je me bats.",taunted:false},{threshold:0.4,taunt:"Peu importe. Je finis ce que j'ai commencé.",taunted:false}], narratorLines:{taunt:["La Sardine Errante se contorsionne dans le sable salé.","Une odeur de mer morte flotte dans l'air brûlant.","Elle est perdue. Mais les animaux perdus sont les plus dangereux."]}},
  cornichon_ennemi: { id:'cornichon_ennemi', name:'Cornichon Raté', type:'villain', class:'Cornichon Avancé de la Cantine', sprite:'cornichon', isBoss:false, hp:90, atk:62, def:48, spd:88, quote:'"Tu croyais que j\'étais de ton côté ?"', special:{name:'🥒 Spray Acide',fn:(v)=>{const dmg=Math.floor(v.atk*1.3+Math.random()*22);return{dmg,log:'🥒 SPRAY ACIDE — '+dmg+' dégâts corrosifs !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"On se retrouve, cousin…",taunted:false},{threshold:0.55,taunt:"Tu pensais vraiment gagner ? Pathétique.",taunted:false},{threshold:0.2,taunt:"IMPOSSIBLE. Je suis FERMENTÉ. Je suis ÉTERNEL !",taunted:false}], narratorLines:{taunt:["Le Cornichon Raté révèle sa vraie nature acide.","Une trahison marinée dans la cantine.","L'air sent le vinaigre…"]}},
  seigneur_anchois: { id:'seigneur_anchois', name:'Seigneur Anchois', type:'villain', class:'Boss du Désert du Sel', sprite:'anchois', isBoss:true, hp:150, atk:80, def:65, spd:55, quote:'"Mariné depuis cent ans. J\'ai vu des héros comme toi disparaître dans ce sel."', special:{name:'🧂 Vague Salée',fn:(v)=>{const dmg=Math.floor(v.atk*1.75+Math.random()*32);return{dmg,log:'🧂 VAGUE SALÉE — '+dmg+' dégâts corrosifs !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Bienvenue dans mon désert, jeune naïf.",taunted:false},{threshold:0.6,taunt:"Résistance inutile. Le sel préserve tout… y compris la défaite.",taunted:false},{threshold:0.25,taunt:"CENT ANS DE SAUMURE. TU NE PEUX PAS ME VAINCRE !",taunted:false}], narratorLines:{taunt:["Le Seigneur Anchois émerge des cristaux de sel.","Une puanteur noble et ancienne emplit l'air du désert.","Il attend. Il a tout son temps. Il a toujours eu tout son temps."]}},

  // === RÉGION 3 : Marais du Vinaigre ===
  algue_fantome: { id:'algue_fantome', name:'Algue Fantôme', type:'villain', class:'Spectre des Marais', sprite:'algue', isBoss:false, hp:70, atk:60, def:38, spd:95, quote:'"Tu ne peux pas frapper ce que tu ne vois pas."', special:{name:'👻 Étreinte Visqueuse',fn:(v)=>{const dmg=Math.floor(v.atk*1.1+Math.random()*20);return{dmg,log:'👻 ÉTREINTE VISQUEUSE — '+dmg+' dégâts spectraux !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Rejoins-moi dans la brume…",taunted:false},{threshold:0.4,taunt:"Tu commences à me voir. Trop tard.",taunted:false}], narratorLines:{taunt:["L'Algue Fantôme glisse entre les vapeurs acides.","Quelque chose remue dans la brume du marais.","Elle est là. Elle n'est plus là. Elle est partout."]}},
  sushi_ninja: { id:'sushi_ninja', name:'Sushi Ninja', type:'villain', class:'Ombre de la Cantine', sprite:'sushi', isBoss:false, hp:115, atk:72, def:55, spd:98, quote:'"Tu ne m\'as pas vu venir… et tu ne le verras jamais."', special:{name:'🍣 Lame de Riz',fn:(v)=>{const hits=[Math.floor(v.atk*0.7+Math.random()*15),Math.floor(v.atk*0.7+Math.random()*15),Math.floor(v.atk*0.8+Math.random()*20)];const dmg=hits.reduce((a,b)=>a+b,0);return{dmg,log:'🍣 LAME DE RIZ — '+hits.join(' + ')+' = '+dmg+' dégâts furtifs !',type:'multi'};}}, phases:[{threshold:1.0,taunt:"Je suis partout. Je suis nulle part.",taunted:false},{threshold:0.5,taunt:"Impressionnant… Tu mérites de voir ma vraie vitesse !",taunted:false},{threshold:0.15,taunt:"Impossible. Un ninja ne perd JAMAIS !",taunted:false}], narratorLines:{taunt:["Le Sushi Ninja disparaît dans l'ombre de la cantine.","Un frisson. Le sushi a bougé… mais où ?","L'odeur du wasabi emplit l'air. Le danger approche."]}},
  maitre_dojo: { id:'maitre_dojo', name:'Maître du Dojo Fermenté', type:'villain', class:'Boss des Marais du Vinaigre', sprite:'fermente', isBoss:true, hp:155, atk:82, def:68, spd:88, quote:'"Mes élèves t\'ont ralenti. Moi, je t\'arrêterai."', special:{name:'⚡ Kata du Vinaigre',fn:(v)=>{const hits=[Math.floor(v.atk*0.8+Math.random()*18),Math.floor(v.atk*0.8+Math.random()*18),Math.floor(v.atk*1.0+Math.random()*22)];const dmg=hits.reduce((a,b)=>a+b,0);return{dmg,log:'⚡ KATA DU VINAIGRE — '+hits.join(' + ')+' = '+dmg+' dégâts !',type:'multi'};}}, phases:[{threshold:1.0,taunt:"Je t'attendais. Mes élèves m'ont dit que tu étais tenace.",taunted:false},{threshold:0.6,taunt:"Bien. Maintenant nous commençons vraiment.",taunted:false},{threshold:0.25,taunt:"IMPENSABLE. Personne ne défait le Maître dans ses propres marais !",taunted:false}], narratorLines:{taunt:["Le Maître du Dojo Fermenté s'incline avant le combat — une formalité.",'"Dans ce marais, je suis le seul maître."',"Il attend. Il observe. Il calcule."]}},

  // === RÉGION 4 : Pics Glacés du Sorbet ===
  esquimau_maudit: { id:'esquimau_maudit', name:'Esquimau Maudit', type:'villain', class:'Garde des Hauteurs', sprite:'esquimau', isBoss:false, hp:85, atk:60, def:58, spd:65, quote:'"Le froid préserve. Et toi, je vais te préserver ici pour toujours."', special:{name:'🧊 Pointe Glaciale',fn:(v)=>{const dmg=Math.floor(v.atk*1.25+Math.random()*20);return{dmg,log:'🧊 POINTE GLACIALE — '+dmg+' dégâts gelés !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"La montagne est ma demeure. Tu es un intrus.",taunted:false},{threshold:0.4,taunt:"La Reine sera informée de ton arrivée… trop tard pour toi.",taunted:false}], narratorLines:{taunt:["L'Esquimau Maudit craque sous l'effet du froid éternel.","Le vent glacial amplifie ses cris de guerre.","Quelque chose de sucré et de mortel à la fois."]}},
  yeti_meringue: { id:'yeti_meringue', name:'Yéti Meringué', type:'villain', class:'Colosse des Neiges Sucrées', sprite:'yeti', isBoss:false, hp:120, atk:70, def:75, spd:45, quote:'"ROAAAAH… (il a l\'air en colère. Et recouvert de sucre.)"', special:{name:'🤍 Avalanche Meringuée',fn:(v)=>{const dmg=Math.floor(v.atk*1.5+Math.random()*28);return{dmg,log:'🤍 AVALANCHE MERINGUÉE — '+dmg+' dégâts écrasants !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"ROOAR.",taunted:false},{threshold:0.45,taunt:"ROOAAR !!!",taunted:false}], narratorLines:{taunt:["Le Yéti Meringué secoue la montagne de son passage.","Une créature de neige et de sucre… plus redoutable qu'elle n'y paraît.","Il ne parle pas. Il frappe."]}},
  reine_glace: { id:'reine_glace', name:'Reine Glace', type:'villain', class:'Boss des Pics Glacés — Ancienne Cheffe Pâtissière', sprite:'glace', isBoss:true, hp:160, atk:83, def:70, spd:72, quote:'"Dix ans d\'exil dans le froid. Et maintenant tu oses venir ici ? Je vais te geler sur place."', special:{name:'❄️ Blizzard Royal',fn:(v)=>{const dmg=Math.floor(v.atk*1.8+Math.random()*38);return{dmg,log:'❄️ BLIZZARD ROYAL — '+dmg+' dégâts dévastateurs !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Dix ans. Dix ans que j'attends ce moment.",taunted:false},{threshold:0.6,taunt:"Tu es meilleur que je ne le pensais. Cela ne changera rien.",taunted:false},{threshold:0.25,taunt:"NON. Cette cantine m'APPARTIENT. Je reviendrai ! Le froid ne meurt JAMAIS !",taunted:false}], narratorLines:{taunt:["La Reine Glace descend de son trône de cristal.",'"La chaleur de tes convictions ne te protégera pas du froid."',"Elle est belle. Elle est dangereuse. Elle est brisée."]}},

  // === RÉGION 5 : Volcan de la Cantine ===
  garde_tomate: { id:'garde_tomate', name:'Garde Tomate', type:'villain', class:'Sentinelle du Volcan', sprite:'tomate', isBoss:false, hp:90, atk:65, def:55, spd:70, quote:'"Nul ne passe. Ordres du Seigneur Banane."', special:{name:'🍅 Jet de Sauce',fn:(v)=>{const dmg=Math.floor(v.atk*1.2+Math.random()*18);return{dmg,log:'🍅 JET DE SAUCE — '+dmg+' dégâts brûlants !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Le Seigneur Banane a prévu ta venue.",taunted:false},{threshold:0.4,taunt:"Tu ne vas pas plus loin. Je te le jure.",taunted:false}], narratorLines:{taunt:["Le Garde Tomate poste sa position avec discipline.","Rouge sang, prêt à mourir pour son maître.","La lave derrière lui rougeoie de la même couleur que lui."]}},
  banane_corrompue: { id:'banane_corrompue', name:'Banane Corrompue', type:'villain', class:'Champion Déchu du Volcan', sprite:'banane1', isBoss:false, hp:125, atk:75, def:60, spd:68, quote:'"J\'étais comme toi. Avant que Banane m\'offre quelque chose de mieux."', special:{name:'🍌 Coup du Renégat',fn:(v)=>{const dmg=Math.floor(v.atk*1.45+Math.random()*25);return{dmg,log:'🍌 COUP DU RENÉGAT — '+dmg+' dégâts traîtres !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Ne le prends pas personnellement.",taunted:false},{threshold:0.45,taunt:"Il est trop tard pour reculer maintenant. Pour l'un de nous deux.",taunted:false}], narratorLines:{taunt:["La Banane Corrompue sourit — un sourire qu'elle a appris du Seigneur.","Elle connaît tes forces. Elle les retournera contre toi.","Une âme perdue. Un adversaire redoutable."]}},
  banane: { id:'banane', name:'Banane, Seigneur Suprême', type:'villain', class:'Boss Final — Seigneur Suprême de la Cantine', sprite:'banane2', isBoss:true, hp:180, atk:90, def:72, spd:65, quote:'"Tu as traversé cinq régions pour arriver jusqu\'à moi. Impressionnant. Inutile."', special:{name:'🍌 Potassium Furie Absolue',fn:(v)=>{const dmg=Math.floor(v.atk*2.0+Math.random()*45);return{dmg,log:'🍌 POTASSIUM FURIE ABSOLUE — '+dmg+' dégâts cataclysmiques !',type:'crit'};}}, phases:[{threshold:1.0,taunt:"Bienvenue au bout du monde, petit champion.",taunted:false},{threshold:0.6,taunt:"Cinq régions… mais tu n'es toujours qu'une collation.",taunted:false},{threshold:0.3,taunt:"IMPOSSIBLE. Je suis BANANE. Je suis ÉTERNEL. LA CANTINE M'APPARTIENT !!!",taunted:false}], narratorLines:{taunt:["Banane ricane depuis son trône de lave solidifiée.","Le Seigneur Suprême de la Cantine n'a jamais perdu.","Cinq régions. Et voilà le dernier obstacle entre toi et la légende."]}}
};

// Construire ENEMIES dynamiquement depuis la région active
let ENEMIES = [];
function setEnemiesFromRegion(regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  ENEMIES = region.enemies.map(eid => ALL_ENEMIES[eid]).filter(Boolean);
}

const HEROES = {
  fraise: {
    id: 'fraise', name: 'Fraise', type: 'hero', class: 'Guerrière Fruitée', sprite: 'fraise',
    hp: 110, atk: 75, def: 55, spd: 90,
    quote: '"Je suis douce… jusqu\'à ce que ça crame."',
    special: { name: '🍓 Rafale Rouge', fn: (hero) => { const hits=[Math.max(1,Math.floor(hero.atk*0.5+Math.random()*15)),Math.max(1,Math.floor(hero.atk*0.5+Math.random()*15)),Math.max(1,Math.floor(hero.atk*0.6+Math.random()*20))]; return { dmg: hits.reduce((a,b)=>a+b,0), log: '🍓 RAFALE ROUGE — '+hits.join(' + ')+' dégâts !', type: 'multi' }; } },
    narratorLines: { win: ["La cantine appartient aux petits fruits rouges !","Fraise prouve que le plus fort n'est pas toujours le plus grand.","La victoire a un goût sucré… exactement comme elle."], lose: ["Fraise tombe. Mais elle se relèvera.","Même les meilleurs fruits tombent parfois."], attack: ["Fraise bondit comme une balle de flipper !","La guerrière fruitée frappe sans pitié.","Coup direct ! La cantine tremble."] }
  },
  poire: {
    id: 'poire', name: 'Poire', type: 'hero', class: 'Mage de la Fraîcheur', sprite: 'poire',
    hp: 95, atk: 65, def: 70, spd: 75,
    quote: '"La patience, c\'est ma plus grande arme."',
    special: { name: '🍐 Onde Juteuse', fn: (hero) => { const heal=Math.floor(18+Math.random()*12); const dmg=Math.max(1,Math.floor(hero.atk*0.9+Math.random()*25)); return { dmg, heal, log: '🍐 ONDE JUTEUSE — +'+heal+' PV soignés, '+dmg+' dégâts !', type: 'heal' }; } },
    narratorLines: { win: ["La Poire, calme jusqu'au bout.","Patience et ténacité — les vrais champions attendent leur heure.","Un combat maîtrisé de bout en bout."], lose: ["La Poire s'incline avec dignité.","Défaite, mais la tête haute."], attack: ["La Poire frappe avec une précision chirurgicale !","Coup stratégique ! La Poire ne laisse rien au hasard.","Attaque calculée de la Mage de la Fraîcheur."] }
  },
  patate: {
    id: 'patate', name: 'Patate Hongroise', type: 'hero', class: 'Colosse du Goulash', sprite: 'patate',
    hp: 130, atk: 70, def: 85, spd: 55,
    quote: '"Je suis lente… mais quand j\'arrive, tu le regrettes."',
    special: { name: '🥔 Frappe du Goulash', fn: (hero) => { const dmg=Math.max(1,Math.floor(hero.atk*3.5+Math.random()*60)); return { dmg, log: '🥔 FRAPPE DU GOULASH — '+dmg+' dégâts CATACLYSMIQUES !', type: 'crit' }; } },
    narratorLines: { win: ["La Patate Hongroise prouve que la lenteur est une force !","Solide, implacable, victorieuse — comme un bon goulash.","Personne ne s'attendait à ça. Personne."], lose: ["La Patate retombe. Elle rebondira.","Une défaite épicée. La revanche sera plus épicée encore."], attack: ["La Patate s'élance avec une force tellurique !","Le sol tremble sous les coups de la Colosse du Goulash !","Lente mais imparable — la Patate frappe !"] }
  }
};

function buildSelectStageDots() {
  const container = document.getElementById('stagesDisplay');
  container.innerHTML = '';
  if (!ENEMIES.length) return;
  ENEMIES.forEach((e, i) => {
    const step = document.createElement('div');
    step.className = 'stage-step';
    const dotEmoji = e.isBoss ? '🍌' : (e.id==='sushi_ninja'?'🍣':'🥒');
    step.innerHTML = `<div class="stage-dot locked" id="stage-dot-${i}">${dotEmoji}</div><div class="stage-label">${e.name}</div>`;
    container.appendChild(step);
    if (i < ENEMIES.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'stage-connector'; conn.id = `stage-conn-${i}`;
      container.appendChild(conn);
    }
  });
}

function buildBattlePips() {
  const container = document.getElementById('battlePips');
  container.innerHTML = '';
  if (!ENEMIES.length) return;
  ENEMIES.forEach((e, i) => {
    const pip = document.createElement('div');
    pip.className = 'stage-pip locked'; pip.id = `pip-${i}`;
    container.appendChild(pip);
  });
}

function updateStageIndicators() {
  const cur = state.currentEnemyIndex;
  if (!ENEMIES.length) return;
  ENEMIES.forEach((e, i) => {
    const dot  = document.getElementById(`stage-dot-${i}`);
    const conn = document.getElementById(`stage-conn-${i}`);
    const pip  = document.getElementById(`pip-${i}`);
    const cls  = i < cur ? 'done' : i === cur ? 'active' : 'locked';
    if (dot)  dot.className  = 'stage-dot ' + cls;
    if (conn) conn.className = 'stage-connector' + (i < cur ? ' done' : '');
    if (pip)  pip.className  = 'stage-pip ' + cls;
  });
  const stageText = document.getElementById('battleStageText');
  if (stageText) {
    const e = ENEMIES[cur];
    stageText.textContent = e.isBoss ? `💀 BOSS FINAL — ${e.name}` : `⚔ ÉTAPE ${cur+1}/${ENEMIES.length} — ${e.name}`;
  }
}

buildSelectStageDots(); buildBattlePips();

let state = {
  heroChar: null, currentEnemyIndex: 0, villainChar: null,
  heroHp: 0, heroMaxHp: 0, heroHpPersist: 0,
  villainHp: 0, villainMaxHp: 0,
  heroSpecial: 0, villainSpecial: 0,
  turn: 1, heroDefending: false, villainDefending: false,
  battleRunning: false, playerTurn: true,
  heroStats: null, atkBuff: 0, atkBuffTurns: 0,
  fortressActive: false, fortressTurns: 0, fortressCounter: false,
  pendingLevelUp: null,
  heroStatuses: [],
};

updateStageIndicators();

function buildCharCard(char, onclickStr, isSelected) {
  const clickAttr = onclickStr ? 'onclick="' + onclickStr + '"' : '';
  const isVillain = char.type === 'villain';
  const isInterm  = isVillain && !char.isBoss;
  const cardCls = isInterm ? 'intermediate-villain' : (isVillain ? 'villain' : '');
  const badgeCls = isInterm ? 'badge-intermediate' : (isVillain ? 'badge-villain' : 'badge-hero');
  const badgeLbl = isInterm ? '⚔ ENNEMI' : (isVillain ? '👿 BOSS' : '⚔ HÉROS');
  let progressBadge = '';
  if (!isVillain && char.id) {
    const save = loadCharSave(char.id);
    const prev = save.level > 1 ? (XP_CURVE[save.level-1]||0) : 0;
    const next = XP_CURVE[Math.min(save.level, XP_CURVE.length-1)]||1;
    const range = next - prev;
    const xpPct = range<=0 ? 100 : Math.max(0,Math.min(100,((save.xp-prev)/range)*100));
    progressBadge = '<div style="margin-top:0.8rem;border-top:1px solid var(--border);padding-top:0.7rem;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">'
      +'<span style="font-family:monospace;font-size:0.6rem;color:var(--muted)">LV.'+save.level+'</span>'
      +'<span style="font-family:monospace;font-size:0.6rem;color:var(--gold)">🪙 '+save.gold+'</span>'
      +'<span style="font-family:monospace;font-size:0.6rem;color:var(--purple)">✨ '+save.skillPoints+' pts</span>'
      +'</div>'
      +'<div style="height:4px;background:var(--surface2);border-radius:2px;overflow:hidden;">'
      +'<div style="width:'+xpPct+'%;height:100%;background:linear-gradient(90deg,var(--xp-blue),#93c5fd);border-radius:2px"></div>'
      +'</div></div>';
  }
  const selectedCls = isSelected ? ' selected' : '';
  return '<div class="char-card '+cardCls+selectedCls+'" '+clickAttr+'>'
    +'<span class="char-type-badge '+badgeCls+'">'+badgeLbl+'</span>'
    +'<div class="char-sprite"><img src="https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/'+char.sprite+'.png" alt="'+char.name+'" /></div>'
    +'<div class="char-name">'+char.name+'</div>'
    +'<div class="char-class">'+char.class+'</div>'
    +'<div class="char-stats">'
    +'<div class="stat-bar-row"><span class="stat-bar-label">ATK</span><div class="stat-bar-track"><div class="stat-bar-fill fill-atk" style="width:'+char.atk+'%"></div></div></div>'
    +'<div class="stat-bar-row"><span class="stat-bar-label">DEF</span><div class="stat-bar-track"><div class="stat-bar-fill fill-def" style="width:'+char.def+'%"></div></div></div>'
    +'<div class="stat-bar-row"><span class="stat-bar-label">VIT</span><div class="stat-bar-track"><div class="stat-bar-fill fill-spd" style="width:'+char.spd+'%"></div></div></div>'
    +'<div class="stat-bar-row"><span class="stat-bar-label">HP</span><div class="stat-bar-track"><div class="stat-bar-fill fill-hp" style="width:'+char.hp+'%"></div></div></div>'
    +'</div>'
    +'<div class="char-quote">'+char.quote+'</div>'
    +progressBadge
    +'</div>';
}

let selectedHero = null;

function renderSelect() {
  // heroGrid is now on the map screen — handled by renderHeroGrid()
  renderHeroGrid();
}

function selectHero(id) {
  selectedHero = id;
  switchCharSave(id);
  state.currentEnemyIndex = 0;
  state.heroHpPersist = 0;
  updateStageIndicators();
  updateProfileUI();
  renderHeroGrid();
  renderWorldMap();
  updateSelectedHeroBadge();
  // Rafraîchir le panel région si ouvert, pour débloquer le bouton
  if (selectedRegion && document.getElementById('regionDetailPanel').style.display !== 'none') {
    showRegionDetail(selectedRegion);
  }
  const shopEl = document.getElementById('screen-shop');
  if (shopEl && shopEl.style.display !== 'none') renderShop();
  const skillEl = document.getElementById('screen-skills');
  if (skillEl && skillEl.style.display !== 'none') renderSkillTree();
}

function renderHeroGrid() {
  const grid = document.getElementById('heroGrid');
  if (!grid) return;
  const heroes = Object.values(HEROES);
  grid.innerHTML = heroes.map(c => buildCharCard(c, `selectHero('${c.id}')`, selectedHero === c.id)).join('');
  updateSelectedHeroBadge();
}

function updateSelectedHeroBadge() {
  const badge = document.getElementById('selectedHeroBadge');
  if (!badge) return;
  if (selectedHero && HEROES[selectedHero]) {
    const heroNames = {fraise:'Fraise',poire:'Poire',patate:'Patate Hongroise'};
    const heroIcons = {fraise:'🍓',poire:'🍐',patate:'🥔'};
    badge.textContent = heroIcons[selectedHero] + ' ' + heroNames[selectedHero] + ' sélectionné·e';
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}

function getAttacks(heroChar) {
  const allAttacks = [
    { id: 'punch', name: 'Punch', icon: '👊', desc: 'Coup direct', reqLv: 1, cls: '', cooldown: 0,
      fn: (hero, villain) => {
        const missChance = Math.max(0.01, 0.08 - getPassiveMissReduction());
        if (Math.random() < missChance) return { miss: true };
        const crit = isCrit();
        const critMult = crit ? 1.8 + getPassiveCritBonus() : 1;
        const dmg = crit ? Math.floor(calcDmg(hero.atk, villain.def) * critMult) : calcDmg(hero.atk, villain.def);
        return { dmg, crit, spBonus: 15, log: (crit ? '💥 CRITIQUE ! ' : '👊 ') + hero.name + ' frappe pour ' + dmg + ' dégâts !' };
      }
    },
    { id: 'combo', name: 'Combo', icon: '🔥', desc: '2 coups rapides', reqLv: 1, cls: '', cooldown: 2,
      fn: (hero, villain) => { const d1=calcDmg(hero.atk,villain.def,0.65);const d2=calcDmg(hero.atk,villain.def,0.65); return { dmg:d1+d2, spBonus:20, log:'🔥 Combo — '+(d1+d2)+' dégâts !' }; }
    },
    { id: 'defend', name: 'Garde', icon: '🛡️', desc: 'Réduit les dégâts', reqLv: 1, cls: '', cooldown: 0,
      fn: (hero) => { return { defend: true, spBonus: 8, log: '🛡️ ' + hero.name + ' se met en garde…' }; }
    },
    { id: 'special', name: 'SPÉCIAL', icon: '⚡', desc: 'Charge 0%', reqLv: 1, cls: 'special', cooldown: 0,
      fn: (hero, villain) => { if (state.heroSpecial < 100) return null; state.heroSpecial = 0; return heroChar.special.fn(hero, villain); }
    },
    { id: 'combo_plus', name: 'Combo+', icon: '🌀', desc: '3 coups + stun', reqLv: 2, cls: 'unlocked-atk', cooldown: 3,
      fn: (hero, villain) => { const hits=[calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.6),calcDmg(hero.atk,villain.def,0.7)]; const total=hits.reduce((a,b)=>a+b,0); return { dmg:total, spBonus:25, log:'🌀 Combo+ — '+hits.join('+')+' = '+total+' dégâts !' }; }
    },
    { id: 'piercing', name: 'Perforant', icon: '🗡️', desc: 'Ignore 50% DEF', reqLv: 3, cls: 'unlocked-atk', cooldown: 3,
      fn: (hero, villain) => { const dmg=calcDmg(hero.atk,villain.def*0.5,1.2); return { dmg, spBonus:20, log:'🗡️ Frappe Perforante — '+dmg+' dégâts (DEF ignorée) !' }; }
    },
    { id: 'counter', name: 'Contre', icon: '↩️', desc: 'Parade + riposte', reqLv: 4, cls: 'unlocked-atk', cooldown: 4,
      fn: (hero, villain) => { const dmg=calcDmg(hero.atk,villain.def,1.5); return { dmg, defend:true, spBonus:30, log:'↩️ Contre-attaque — '+dmg+' dégâts + garde activée !' }; }
    },
    { id: 'ultimate', name: 'DÉVASTA.', icon: '💥', desc: 'Dégâts massifs', reqLv: 5, cls: 'unlocked-atk', cooldown: 5,
      fn: (hero, villain) => { const dmg=calcDmg(hero.atk,villain.def,2.8); return { dmg, spBonus:0, log:'💥 DÉVASTATION — '+dmg+' dégâts cataclysmiques !' }; }
    },
  ];
  const treeActives = [
    { id: 'sk_atk3', name: 'Tornade', icon: '🍜', desc: '6 frappes / ignore DEF', reqLv: 1, cls: 'unlocked-atk tree-skill', cooldown: 4,
      fn: (hero, villain) => {
        const reducedDef = villain.def * 0.6;
        const hits = [calcDmg(hero.atk,reducedDef,0.6),calcDmg(hero.atk,reducedDef,0.6),calcDmg(hero.atk,reducedDef,0.65),calcDmg(hero.atk,reducedDef,0.65),calcDmg(hero.atk,reducedDef,0.7),calcDmg(hero.atk,reducedDef,0.8)];
        const total = hits.reduce((a,b)=>a+b,0);
        state.heroSpecial = Math.min(100, state.heroSpecial + 40);
        return { dmg:total, spBonus:0, log:'🍜 TORNADE DE NOUILLES — '+hits.length+' coups, '+total+' dégâts ! (DEF réduite, +40% spéciale)' };
      }
    },
    { id: 'sk_def3', name: 'Forteresse', icon: '🥖', desc: 'Bouclier 3t + riposte', reqLv: 1, cls: 'unlocked-atk tree-skill', cooldown: 5,
      fn: (hero, villain) => {
        state.fortressActive = true; state.fortressTurns = 3; state.fortressCounter = true;
        const dmg = calcDmg(hero.atk, villain.def, 0.7);
        state.villainHp -= dmg; spawnDmg('villainSprite', dmg, 'dmg');
        return { defend:true, spBonus:20, log:'🥖 FORTERESSE DE BAGUETTE — '+dmg+' dmg + bouclier 85% pendant 3 tours ! Toute attaque sera ripostée.' };
      }
    },
    { id: 'sk_spd3', name: 'Coup du Chef', icon: '👨‍🍳', desc: 'x2.5 ATK, vol 35% HP', reqLv: 1, cls: 'unlocked-atk tree-skill', cooldown: 4,
      fn: (hero, villain) => {
        const dmg = Math.floor(calcDmg(hero.atk, villain.def*0.2, 2.5+getPassiveCritBonus()));
        const stolen = Math.floor(dmg * 0.35);
        state.heroHp = Math.min(state.heroMaxHp, state.heroHp + stolen); spawnDmg('heroSprite', stolen, 'heal');
        state.heroSpecial = Math.min(100, state.heroSpecial + 35);
        return { dmg, spBonus:0, log:'👨‍🍳 COUP DU CHEF — '+dmg+' dégâts (DEF ignorée) + '+stolen+' HP volés + spéciale chargée !', crit:true };
      }
    }
  ];
  const baseList = allAttacks.filter(a => player.unlockedAttacks.includes(a.id));
  const treeList = treeActives.filter(a => isSkillUnlocked(a.id));
  return [...baseList, ...treeList];
}

// ============================================
// UNIFIED INVENTORY SYSTEM
// ============================================

let currentInvTab = 'weapons';

function switchInvTab(tab) {
  currentInvTab = tab;
  ['weapons','armors','abilities'].forEach(t => {
    const panel = document.getElementById('invPanel-' + t);
    const btn   = document.getElementById('invTab-' + t);
    if (panel) panel.style.display = t === tab ? 'block' : 'none';
    if (btn) {
      if (t === tab) {
        btn.style.background = 'var(--card-bg)';
        btn.style.color = 'var(--accent)';
      } else {
        btn.style.background = 'var(--surface)';
        btn.style.color = 'var(--muted)';
      }
    }
  });
  if (tab === 'weapons') renderInvWeapons();
  if (tab === 'armors')  renderInvArmors();
  if (tab === 'abilities') renderLoadoutAbilities();
}

function getSellPrice(item) {
  return Math.max(5, Math.floor(item.price * 0.4));
}

function sellItem(id, type) {
  const cat = type === 'weapon' ? SHOP_CATALOG.weapons : SHOP_CATALOG.armors;
  const item = cat.find(i => i.id === id);
  if (!item) return;
  // Can only sell duplicates (if more than 1 in owned, or if equipped + owned)
  const ownedCount = player.owned.filter(o => o === id).length;
  if (ownedCount <= 0) { showToast('Tu ne possèdes pas cet objet.', 'error'); return; }
  // If it's equipped and we only have 1, unequip first
  const equippedKey = type === 'weapon' ? 'weapon' : 'armor';
  const isEquipped = player.equipped[equippedKey] === id;
  if (isEquipped && ownedCount <= 1) {
    player.equipped[equippedKey] = null;
  }
  // Remove one from owned
  const idx = player.owned.indexOf(id);
  if (idx >= 0) player.owned.splice(idx, 1);
  const gain = getSellPrice(item);
  player.gold += gain;
  savePlayer();
  updateProfileUI();
  renderInvWeapons();
  renderInvArmors();
  showToast(`${item.icon} ${item.name} vendu — +${gain} 🪙`, 'success');
}

function renderInvWeapons() {
  const grid = document.getElementById('invWeaponsGrid');
  if (!grid) return;
  const allWeapons = SHOP_CATALOG.weapons;
  grid.innerHTML = '';
  // Show all weapons the player owns (including dupes)
  const ownedIds = player.owned.filter(id => allWeapons.find(w => w.id === id));
  if (ownedIds.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;font-family:\'DM Mono\',monospace;font-size:0.72rem;color:var(--muted);">Aucune arme possédée. Achète-en à la boutique !</div>';
    return;
  }
  // Count occurrences
  const counts = {};
  ownedIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  Object.entries(counts).forEach(([id, count]) => {
    const item = allWeapons.find(w => w.id === id);
    if (!item) return;
    const isEquipped = player.equipped.weapon === id;
    const isDupe = count > 1;
    const sellPrice = getSellPrice(item);
    const card = document.createElement('div');
    card.style.cssText = `background:${isEquipped ? 'rgba(200,245,66,0.08)' : 'var(--card-bg)'};border:2px solid ${isEquipped ? 'rgba(200,245,66,0.5)' : isDupe ? 'rgba(245,166,35,0.4)' : 'var(--border)'};border-radius:8px;padding:1rem 0.8rem;text-align:center;position:relative;transition:all 0.2s;`;
    let badges = '';
    if (isEquipped) badges += `<span style="position:absolute;top:0.4rem;left:0.4rem;font-family:'DM Mono',monospace;font-size:0.5rem;background:rgba(200,245,66,0.15);color:var(--accent);border:1px solid rgba(200,245,66,0.3);border-radius:2px;padding:0.1rem 0.35rem;letter-spacing:0.06em;">ÉQUIPÉ</span>`;
    if (count > 1) badges += `<span style="position:absolute;top:0.4rem;right:0.4rem;font-family:'DM Mono',monospace;font-size:0.52rem;background:rgba(245,166,35,0.15);color:var(--gold);border:1px solid rgba(245,166,35,0.3);border-radius:2px;padding:0.1rem 0.35rem;">×${count}</span>`;
    card.innerHTML = `${badges}<div style="font-size:2rem;margin:${badges?'1rem':'.3rem'} 0 0.4rem;">${item.icon}</div><div style="font-family:'Playfair Display',serif;font-size:0.8rem;font-weight:700;margin-bottom:0.2rem;line-height:1.2;">${item.name}</div><div style="font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--hp-green);margin-bottom:0.7rem;">${item.stat}</div><div style="display:flex;flex-direction:column;gap:0.35rem;">${!isEquipped ? `<button onclick="equipItem('${id}','weapon')" style="background:var(--accent);color:#0e0f0c;border:none;border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;font-weight:600;cursor:pointer;letter-spacing:0.04em;transition:all 0.15s;" onmouseover="this.style.background='#d9ff55'" onmouseout="this.style.background='var(--accent)'">⚔ Équiper</button>` : `<button onclick="unequip('${id}','weapon')" style="background:none;color:var(--accent3);border:1px solid rgba(232,69,69,0.4);border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;cursor:pointer;transition:all 0.15s;">↩ Déséquiper</button>`}<button onclick="sellItem('${id}','weapon')" style="background:none;color:var(--gold);border:1px solid rgba(245,166,35,0.35);border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='rgba(245,166,35,0.1)'" onmouseout="this.style.background='none'">🪙 Vendre (${sellPrice})</button></div>`;
    grid.appendChild(card);
  });
}

function renderInvArmors() {
  const grid = document.getElementById('invArmorsGrid');
  if (!grid) return;
  const allArmors = SHOP_CATALOG.armors;
  grid.innerHTML = '';
  const ownedIds = player.owned.filter(id => allArmors.find(a => a.id === id));
  if (ownedIds.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;font-family:\'DM Mono\',monospace;font-size:0.72rem;color:var(--muted);">Aucune armure possédée. Achète-en à la boutique !</div>';
    return;
  }
  const counts = {};
  ownedIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  Object.entries(counts).forEach(([id, count]) => {
    const item = allArmors.find(a => a.id === id);
    if (!item) return;
    const isEquipped = player.equipped.armor === id;
    const isDupe = count > 1;
    const sellPrice = getSellPrice(item);
    const card = document.createElement('div');
    card.style.cssText = `background:${isEquipped ? 'rgba(96,165,250,0.08)' : 'var(--card-bg)'};border:2px solid ${isEquipped ? 'rgba(96,165,250,0.5)' : isDupe ? 'rgba(245,166,35,0.4)' : 'var(--border)'};border-radius:8px;padding:1rem 0.8rem;text-align:center;position:relative;transition:all 0.2s;`;
    let badges = '';
    if (isEquipped) badges += `<span style="position:absolute;top:0.4rem;left:0.4rem;font-family:'DM Mono',monospace;font-size:0.5rem;background:rgba(96,165,250,0.15);color:var(--xp-blue);border:1px solid rgba(96,165,250,0.3);border-radius:2px;padding:0.1rem 0.35rem;letter-spacing:0.06em;">ÉQUIPÉ</span>`;
    if (count > 1) badges += `<span style="position:absolute;top:0.4rem;right:0.4rem;font-family:'DM Mono',monospace;font-size:0.52rem;background:rgba(245,166,35,0.15);color:var(--gold);border:1px solid rgba(245,166,35,0.3);border-radius:2px;padding:0.1rem 0.35rem;">×${count}</span>`;
    card.innerHTML = `${badges}<div style="font-size:2rem;margin:${badges?'1rem':'.3rem'} 0 0.4rem;">${item.icon}</div><div style="font-family:'Playfair Display',serif;font-size:0.8rem;font-weight:700;margin-bottom:0.2rem;line-height:1.2;">${item.name}</div><div style="font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--xp-blue);margin-bottom:0.7rem;">${item.stat}</div><div style="display:flex;flex-direction:column;gap:0.35rem;">${!isEquipped ? `<button onclick="equipItem('${id}','armor')" style="background:var(--xp-blue);color:#0e0f0c;border:none;border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;font-weight:600;cursor:pointer;transition:all 0.15s;">🛡 Équiper</button>` : `<button onclick="unequip('${id}','armor')" style="background:none;color:var(--accent3);border:1px solid rgba(232,69,69,0.4);border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;cursor:pointer;transition:all 0.15s;">↩ Déséquiper</button>`}<button onclick="sellItem('${id}','armor')" style="background:none;color:var(--gold);border:1px solid rgba(245,166,35,0.35);border-radius:3px;padding:0.35rem 0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='rgba(245,166,35,0.1)'" onmouseout="this.style.background='none'">🪙 Vendre (${sellPrice})</button></div>`;
    grid.appendChild(card);
  });
}

function renderLoadoutAbilities() {
  if (!selectedHero) {
    document.getElementById('loadoutPool').innerHTML = '<div style="grid-column:1/-1;text-align:center;font-family:\'DM Mono\',monospace;font-size:0.75rem;color:var(--muted);padding:2rem;">Sélectionne d\'abord un héros sur la carte.</div>';
    document.getElementById('loadoutSlots').innerHTML = '';
    document.getElementById('loadoutCounter').textContent = '0 / 4';
    return;
  }
  const loadout = getLoadout();
  const count = loadout.length;
  document.getElementById('loadoutCounter').textContent = count + ' / ' + MAX_LOADOUT;
  document.getElementById('loadoutCounter').style.borderColor = count === MAX_LOADOUT ? 'rgba(200,245,66,0.6)' : 'rgba(200,245,66,0.3)';

  // --- SLOTS ---
  const slotsEl = document.getElementById('loadoutSlots');
  slotsEl.innerHTML = '';
  const allAvail = getAllAvailableAttacks();
  for (let i = 0; i < MAX_LOADOUT; i++) {
    const id = loadout[i];
    const slot = document.createElement('div');
    if (id) {
      const def = allAvail.find(a => a.id === id) || { name: id, icon: '⚡', desc: '' };
      slot.style.cssText = 'background:rgba(200,245,66,0.08);border:2px solid rgba(200,245,66,0.4);border-radius:8px;padding:1rem 0.8rem;text-align:center;cursor:pointer;transition:all 0.2s;';
      slot.innerHTML = `<div style="font-size:1.6rem;margin-bottom:0.4rem;">${def.icon}</div><div style="font-family:'Playfair Display',serif;font-size:0.85rem;font-weight:700;margin-bottom:0.3rem;">${def.name}</div><div style="font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--muted);line-height:1.4;">${def.desc}</div><div style="margin-top:0.6rem;font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--accent3);">✕ Retirer</div>`;
      slot.onmouseenter = () => slot.style.borderColor = 'rgba(232,69,69,0.6)';
      slot.onmouseleave = () => slot.style.borderColor = 'rgba(200,245,66,0.4)';
      slot.onclick = () => toggleLoadout(id);
    } else {
      slot.style.cssText = 'background:var(--surface);border:2px dashed var(--border);border-radius:8px;padding:1rem 0.8rem;text-align:center;opacity:0.5;';
      slot.innerHTML = `<div style="font-size:1.4rem;margin-bottom:0.4rem;color:var(--muted);">＋</div><div style="font-family:'DM Mono',monospace;font-size:0.62rem;color:var(--muted);">Slot libre</div>`;
    }
    slotsEl.appendChild(slot);
  }

  // --- POOL ---
  const poolEl = document.getElementById('loadoutPool');
  poolEl.innerHTML = '';
  allAvail.forEach(atk => {
    const selected = loadout.includes(atk.id);
    const card = document.createElement('div');
    card.style.cssText = `background:${selected ? 'rgba(200,245,66,0.08)' : 'var(--card-bg)'};border:2px solid ${selected ? 'rgba(200,245,66,0.5)' : 'var(--border)'};border-radius:8px;padding:1rem;cursor:pointer;transition:all 0.2s;position:relative;`;
    const treeBadge = atk.treeSkill ? `<span style="position:absolute;top:0.5rem;right:0.5rem;font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.06em;background:rgba(167,139,250,0.12);color:var(--purple);border:1px solid rgba(167,139,250,0.3);border-radius:2px;padding:0.12rem 0.4rem;">COMPÉTENCE</span>` : '';
    const selBadge = selected ? `<span style="position:absolute;top:0.5rem;left:0.5rem;font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.06em;background:rgba(200,245,66,0.15);color:var(--accent);border:1px solid rgba(200,245,66,0.3);border-radius:2px;padding:0.12rem 0.4rem;">✓ ÉQUIPÉ</span>` : '';
    const cdBadge = atk.cooldown > 0 ? `<div style="margin-top:0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--accent3);text-align:center;">⏳ CD : ${atk.cooldown} tour${atk.cooldown>1?'s':''}</div>` : `<div style="margin-top:0.5rem;font-family:'DM Mono',monospace;font-size:0.58rem;color:var(--accent);text-align:center;">✓ Pas de cooldown</div>`;
    card.innerHTML = `${treeBadge}${selBadge}<div style="font-size:1.8rem;margin-bottom:0.4rem;text-align:center;">${atk.icon}</div><div style="font-family:'Playfair Display',serif;font-size:0.9rem;font-weight:700;margin-bottom:0.3rem;text-align:center;">${atk.name}</div><div style="font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--muted);line-height:1.5;text-align:center;">${atk.desc}</div>${cdBadge}`;
    card.onmouseenter = () => { if (!selected) card.style.borderColor = 'rgba(200,245,66,0.3)'; };
    card.onmouseleave = () => { if (!selected) card.style.borderColor = 'var(--border)'; };
    card.onclick = () => toggleLoadout(atk.id);
    poolEl.appendChild(card);
  });

  // Special note
  const note = document.createElement('div');
  note.style.cssText = 'grid-column:1/-1;background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.2);border-radius:6px;padding:0.8rem 1rem;display:flex;align-items:center;gap:0.6rem;';
  note.innerHTML = '<span style="font-size:1.2rem;">⚡</span><div style="font-family:\'DM Mono\',monospace;font-size:0.62rem;color:var(--muted);line-height:1.5;"><strong style="color:var(--xp-blue);">SPÉCIAL</strong> — Attaque ultime de ton personnage, toujours présente en combat. Se charge en frappant. N\'occupe pas de slot.</div>';
  poolEl.appendChild(note);
}


const MAX_LOADOUT = 4;

function getAllAvailableAttacks(heroChar) {
  // Returns all attacks that could be equipped (excludes 'special' which is always present)
  const baseAttacks = [
    { id: 'punch',     name: 'Punch',      icon: '👊', desc: 'Coup direct, peut critiquer',    reqLv: 1, cooldown: 0 },
    { id: 'combo',     name: 'Combo',      icon: '🔥', desc: '2 coups rapides',                reqLv: 1, cooldown: 2 },
    { id: 'defend',    name: 'Garde',      icon: '🛡️', desc: 'Réduit les dégâts reçus',       reqLv: 1, cooldown: 0 },
    { id: 'combo_plus',name: 'Combo+',     icon: '🌀', desc: '3 coups + étourdissement',       reqLv: 2, cooldown: 3 },
    { id: 'piercing',  name: 'Perforant',  icon: '🗡️', desc: 'Ignore 50% de la DEF ennemie',  reqLv: 3, cooldown: 3 },
    { id: 'counter',   name: 'Contre',     icon: '↩️', desc: 'Parade + riposte puissante',    reqLv: 4, cooldown: 4 },
    { id: 'ultimate',  name: 'DÉVASTA.',   icon: '💥', desc: 'Dégâts cataclysmiques x2.8',    reqLv: 5, cooldown: 5 },
  ];
  const treeAttacks = [
    { id: 'sk_atk3', name: 'Tornade',     icon: '🍜', desc: '6 frappes / ignore DEF / +spéciale', reqLv: 1, treeSkill: true, cooldown: 4 },
    { id: 'sk_def3', name: 'Forteresse',  icon: '🥖', desc: 'Bouclier 3 tours + riposte auto',     reqLv: 1, treeSkill: true, cooldown: 5 },
    { id: 'sk_spd3', name: 'Coup du Chef',icon: '👨‍🍳', desc: 'x2.5 ATK · vol HP · DEF ignorée',   reqLv: 1, treeSkill: true, cooldown: 4 },
  ];
  const available = baseAttacks.filter(a => player.unlockedAttacks.includes(a.id));
  const treeAvail = treeAttacks.filter(a => isSkillUnlocked(a.id));
  return [...available, ...treeAvail];
}

function getLoadout() {
  if (!player.equippedLoadout) player.equippedLoadout = ['punch','combo','defend','special'];
  // Ensure loadout only contains currently available attacks (or special)
  const avail = getAllAvailableAttacks().map(a => a.id);
  avail.push('special');
  player.equippedLoadout = player.equippedLoadout.filter(id => avail.includes(id));
  // Ensure at most 4 (excluding special)
  const noSpecial = player.equippedLoadout.filter(id => id !== 'special');
  if (noSpecial.length > MAX_LOADOUT) player.equippedLoadout = noSpecial.slice(0, MAX_LOADOUT);
  return player.equippedLoadout;
}

function toggleLoadout(id) {
  if (!player.equippedLoadout) player.equippedLoadout = [];
  const idx = player.equippedLoadout.indexOf(id);
  if (idx >= 0) {
    // Remove
    player.equippedLoadout.splice(idx, 1);
  } else {
    // Add — max 4
    if (player.equippedLoadout.length >= MAX_LOADOUT) {
      showToast('⚠️ Tu as déjà 4 capacités ! Retire-en une d\'abord.', 'error');
      return;
    }
    player.equippedLoadout.push(id);
  }
  savePlayer();
  renderLoadoutAbilities();
}

function renderLoadout() {
  // Reset to weapons tab on open, then render current tab
  switchInvTab(currentInvTab || 'weapons');
}

function buildActionRow() {
  const hero = state.heroChar; if (!hero) return;
  const allAttackDefs = getAttacks(hero);
  const loadout = getLoadout();
  const specialDef = allAttackDefs.find(a => a.id === 'special');
  const chosenAttacks = loadout
    .map(id => allAttackDefs.find(a => a.id === id))
    .filter(Boolean);
  if (!loadout.includes('special') && specialDef) chosenAttacks.push(specialDef);

  const row = document.getElementById('actionRow');
  row.innerHTML = '';

  // Check if ALL non-special attacks are on cooldown
  const nonSpecial = chosenAttacks.filter(a => a.id !== 'special');
  const allOnCd = nonSpecial.length > 0 && nonSpecial.every(a => (state.cooldowns && state.cooldowns[a.id] || 0) > 0);
  const specialReady = state.heroSpecial >= 100;

  if (allOnCd && !specialReady && state.battleRunning && state.playerTurn) {
    // Auto-pass: show a locked panel and trigger automatically
    const panel = document.createElement('div');
    panel.style.cssText = 'width:100%;padding:0.8rem 1rem;background:rgba(232,69,69,0.06);border:1px solid rgba(232,69,69,0.25);border-radius:6px;font-family:"DM Mono",monospace;font-size:0.7rem;color:var(--muted);text-align:center;letter-spacing:0.06em;';
    panel.textContent = '⏳ Toutes les capacités en recharge — tour automatique…';
    row.appendChild(panel);
    setTimeout(() => autoPassTurn(), 1200);
    buildItemRow();
    return;
  }

  chosenAttacks.forEach(atk => {
    const btn = document.createElement('button');
    const cd = (state.cooldowns && state.cooldowns[atk.id]) || 0;
    const onCd = cd > 0;
    btn.className = 'action-btn ' + atk.cls + (onCd ? ' on-cooldown' : '');
    btn.id = 'btn-' + atk.id;
    if (atk.id === 'special') btn.disabled = true;
    if (onCd) btn.disabled = true;
    const cdOverlay = onCd ? `<span class="cd-overlay">${cd}</span>` : '';
    btn.innerHTML = `${cdOverlay}<span class="action-icon">${atk.icon}</span><span class="action-name">${atk.name}</span><span class="action-desc" id="desc-${atk.id}">${onCd ? '⏳ '+cd+' tour'+(cd>1?'s':'') : atk.desc}</span>`;
    btn.onclick = () => playerAction(atk.id);
    row.appendChild(btn);
  });
  buildItemRow();
}

function autoPassTurn() {
  if (!state.battleRunning) return;
  const hero = state.heroChar;
  // Hero does a weak automatic counter-tap
  const dmg = Math.max(1, Math.floor(state.heroStats.atk * 0.25 * (0.8 + Math.random() * 0.4)));
  state.villainHp -= dmg;
  anim('heroSprite', 'punch-right');
  setTimeout(() => spawnDmg('villainSprite', dmg, 'dmg'), 200);
  addLog(`😤 ${hero.name} riposte faiblement — ${dmg} dégâts (recharge en cours…)`, 'hero-action');
  state.heroSpecial = Math.min(100, state.heroSpecial + 5);
  updateBattleUI();
  if (!checkBattleEnd()) setTimeout(() => villainTurn(), 900);
}

function buildItemRow() {
  const row = document.getElementById('itemRow');
  row.innerHTML = '';
  if (player.inventory.length === 0) return;
  player.inventory.forEach(inv => {
    const cat = SHOP_CATALOG.consumables.find(c => c.id === inv.id); if (!cat) return;
    const btn = document.createElement('button');
    btn.className = 'action-btn item-btn';
    btn.id = 'item-btn-' + inv.id;
    btn.innerHTML = `<span class="action-icon">${cat.icon}</span><span class="action-name">${cat.name}</span><span class="action-desc">×${inv.qty} — ${cat.stat}</span>`;
    btn.onclick = () => useItem(inv.id);
    row.appendChild(btn);
  });
}

function startBattle(newGame = false) {
  if (!selectedHero) return;
  state.heroChar = HEROES[selectedHero];
  state.villainChar = ENEMIES[state.currentEnemyIndex];
  state.heroStats = getLevelStats(state.heroChar);
  state.atkBuff = 0; state.atkBuffTurns = 0;
  state.fortressActive = false; state.fortressTurns = 0;
  state.cooldowns = {};
  if (newGame || state.heroHpPersist === 0) {
    state.heroHp = state.heroMaxHp = state.heroStats.hp; state.heroHpPersist = 0;
  } else {
    state.heroMaxHp = state.heroStats.hp; state.heroHp = state.heroHpPersist;
  }
  state.villainHp = state.villainMaxHp = state.villainChar.hp * 10;
  state.heroSpecial = 0; state.villainSpecial = 0;
  state.turn = 1; state.heroDefending = false; state.villainDefending = false;
  state.battleRunning = true; state.playerTurn = true; state.pendingLevelUp = null;
  if (state.villainChar.phases) state.villainChar.phases.forEach(p => p.taunted = false);
  document.getElementById('heroHpName').textContent = state.heroChar.name;
  document.getElementById('villainHpName').textContent = state.villainChar.name;
  document.getElementById('heroNameBadge').textContent = state.heroChar.name.toUpperCase();
  document.getElementById('villainNameBadge').textContent = state.villainChar.name.toUpperCase();
  document.getElementById('heroLvlBadge').textContent = 'LV.' + player.level;
  document.getElementById('villainLvlBadge').textContent = state.villainChar.isBoss ? 'LV.MAX' : 'LV.' + (state.currentEnemyIndex * 5 + 5);
  document.getElementById('heroSprite').innerHTML = `<img src="https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/${state.heroChar.sprite}.png" alt="${state.heroChar.name}" />`;
  document.getElementById('villainSprite').innerHTML = `<img src="https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/${state.villainChar.sprite}.png" alt="${state.villainChar.name}" />`;
  updateStageIndicators();
  // Fond d'arène spécifique à la région
  const arenaEl = document.querySelector('.arena');
  if (arenaEl) {
    arenaEl.className = 'arena';
    const currentRegion = REGIONS.find(r => r.enemies.includes(state.villainChar.id));
    if (currentRegion) arenaEl.classList.add('region-' + currentRegion.id);
  }
  clearLog(); showScreen('battle'); buildActionRow(); updateBattleUI();
  // Update difficulty badge
  const diffBadgeEl = document.getElementById('battleDiffBadge');
  if (diffBadgeEl) diffBadgeEl.innerHTML = getDiffBadgeHtml();
  // Spawn arena particles
  spawnArenaParticles();
  // Boss fight mode
  const arenaEl2 = document.getElementById('battleArena');
  if(arenaEl2 && state.villainChar.isBoss) arenaEl2.classList.add('boss-fight');
  else if(arenaEl2) arenaEl2.classList.remove('boss-fight');
  const activeTreeSkills = getActiveTreeSkills();
  if (activeTreeSkills.length > 0) addLog(`✨ Compétences actives : ${activeTreeSkills.map(s=>s.emoji+' '+s.name).join(', ')}`, 'skill-line');
  const regen = getPassiveRegenPerTurn();
  if (regen > 0) addLog(`🫙 Régénération active : +${regen} HP/tour`, 'skill-line');
  const tag = state.villainChar.isBoss ? '💀 BOSS FINAL' : `⚔ COMBAT ${state.currentEnemyIndex+1}/${ENEMIES.length}`;
  addLog(`${tag} : ${state.heroChar.name} (LV.${player.level}) vs ${state.villainChar.name}`, 'system');
  if (state.heroHpPersist > 0 && !newGame) addLog(`❤️ HP conservés : ${state.heroHp}/${state.heroMaxHp}`, 'heal-line');
  addLog(`🎙 "${pick(state.villainChar.narratorLines.taunt)}"`, state.villainChar.isBoss ? 'villain-action' : 'intermediate-action');
  // Show opening narrator line
  setTimeout(() => showNarrator(pick(state.villainChar.narratorLines.taunt), 4000), 600);
  state.heroStatuses = [];
  addAntiStatusItems();
  if (state.heroStats.spd < state.villainChar.spd || isSlowed()) {
    addLog('⚡ ' + state.villainChar.name + ' attaque en premier !', 'system');
    setPlayerTurn(false); setTimeout(() => villainTurn(), 800);
  } else { setPlayerTurn(true); }
}

function clearLog() { document.getElementById('battleLog').innerHTML = ''; }
function addLog(msg, cls='') { const log=document.getElementById('battleLog'); const d=document.createElement('div'); d.className='log-line '+cls; d.textContent=msg; log.appendChild(d); log.scrollTop=log.scrollHeight; }

function updateBattleUI() {
  const pct=(v,m)=>Math.max(0,v/m*100)+'%';
  const cls=(v,m)=>{ const r=v/m; return 'hp-fill'+(r<0.2?' critical':r<0.4?' low':''); };
  const sb=document.getElementById('btn-special');
  const heroStatusEl=document.getElementById('heroStatus');
  document.getElementById('heroHpFill').style.width=pct(state.heroHp,state.heroMaxHp);
  document.getElementById('heroHpFill').className=cls(state.heroHp,state.heroMaxHp);
  document.getElementById('heroHpVal').textContent=Math.max(0,state.heroHp)+'/'+state.heroMaxHp;
  document.getElementById('villainHpFill').style.width=pct(state.villainHp,state.villainMaxHp);
  document.getElementById('villainHpFill').className=cls(state.villainHp,state.villainMaxHp);
  document.getElementById('villainHpVal').textContent=Math.max(0,state.villainHp)+'/'+state.villainMaxHp;
  document.getElementById('heroSpecialFill').style.width=state.heroSpecial+'%';
  document.getElementById('heroSpecialLabel').textContent='SPÉCIAL '+state.heroSpecial+'%';
  document.getElementById('villainSpecialFill').style.width=state.villainSpecial+'%';
  document.getElementById('villainSpecialLabel').textContent='SPÉCIAL '+state.villainSpecial+'%';
  if(sb){
    sb.disabled=state.heroSpecial<100||!state.playerTurn;
    const desc=document.getElementById('desc-special');
    if(state.heroSpecial>=100){
      sb.classList.add('special-ready');
      if(desc)desc.textContent='PRÊT !';
    } else {
      sb.classList.remove('special-ready');
      if(desc)desc.textContent='Charge '+state.heroSpecial+'%';
    }
  }
  // Special fill ready class
  const sf=document.getElementById('heroSpecialFill');
  if(sf){if(state.heroSpecial>=100)sf.classList.add('ready');else sf.classList.remove('ready');}
  const vsf=document.getElementById('villainSpecialFill');
  if(vsf){if(state.villainSpecial>=100)vsf.classList.add('ready');else vsf.classList.remove('ready');}
  document.getElementById('turnLabel').textContent='Tour '+state.turn;
  renderStatusBadges();
}

function setPlayerTurn(val) {
  state.playerTurn=val;
  // Rebuild with cooldown state instead of just toggling disabled
  if (val && state.heroChar) {
    buildActionRow();
    const sb=document.getElementById('btn-special');
    if(sb)sb.disabled=!val||state.heroSpecial<100;
  } else {
    document.querySelectorAll('.action-btn').forEach(b=>b.disabled=!val);
    const sb=document.getElementById('btn-special');
    if(sb)sb.disabled=!val||state.heroSpecial<100;
  }
  const tl=document.getElementById('turnLabel');
  if(tl){
    if(val){tl.textContent='Tour '+state.turn+' — Ton tour';tl.style.color='var(--accent)';}
    else{tl.textContent='Tour '+state.turn+' — Ennemi';tl.style.color='var(--accent3)';}
  }
}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function spawnDmg(id,val,type){
  const wrap=document.getElementById(id);if(!wrap)return;
  const el=document.createElement('div');
  el.className='dmg-float'+(type==='crit'?' crit':type==='heal'?' heal':type==='miss'?' miss':'');
  el.textContent=type==='miss'?'ESQUIVÉ':type==='heal'?'+'+val:'-'+val;
  wrap.appendChild(el);
  setTimeout(()=>el.remove(),1000);
  // Impact ripple on damage
  if(type!=='miss'&&type!=='heal'){
    const ripple=document.createElement('div');
    ripple.className='impact-ripple';
    ripple.style.cssText=`border-color:${type==='crit'?'rgba(245,166,35,0.8)':'rgba(255,255,255,0.5)'};width:${type==='crit'?'80px':'60px'};height:${type==='crit'?'80px':'60px'};`;
    wrap.appendChild(ripple);
    setTimeout(()=>ripple.remove(),500);
    // Flash arena
    const arena=document.getElementById('battleArena');
    if(arena){arena.style.background='';void arena.offsetWidth;}
  }
}
function anim(id,cls,ms=500){const el=document.getElementById(id);if(!el)return;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),ms);}

function showToast(msg, type='info') {
  const t=document.getElementById('toast');
  t.textContent=msg; t.className='toast '+type;
  void t.offsetWidth; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

function showLevelUpOverlay(newLevel, unlockMsg) {
  state.battleRunning=false; setPlayerTurn(false);
  document.getElementById('lvOverlayNum').textContent='Niveau '+newLevel;
  const grid=document.getElementById('statGainsGrid');
  grid.innerHTML=`<div class="stat-gain-item"><span>HP</span>+${STAT_GROWTH.hp}</div><div class="stat-gain-item"><span>ATK</span>+${STAT_GROWTH.atk}</div><div class="stat-gain-item"><span>DEF</span>+${STAT_GROWTH.def}</div><div class="stat-gain-item"><span>VIT</span>+${STAT_GROWTH.spd}</div>`;
  const umsg=document.getElementById('unlockMsg');
  if(unlockMsg){umsg.textContent=unlockMsg;umsg.classList.remove('hidden');}else{umsg.classList.add('hidden');}
  document.getElementById('levelupOverlay').classList.add('show');
}

function closeLevelUp() {
  document.getElementById('levelupOverlay').classList.remove('show');
  state.heroStats=getLevelStats(state.heroChar);
  state.heroMaxHp=state.heroStats.hp;
  if(state.heroHp>state.heroMaxHp)state.heroHp=state.heroMaxHp;
  document.getElementById('heroLvlBadge').textContent='LV.'+player.level;
  buildActionRow(); updateBattleUI();
  state.battleRunning=true; setPlayerTurn(true);
  addLog('⭐ Tu es maintenant niveau '+player.level+' ! (+1 point de compétence)','level-line');
}

function useItem(id) {
  if(!state.playerTurn||!state.battleRunning)return;
  const cat=SHOP_CATALOG.consumables.find(c=>c.id===id); if(!cat)return;
  const invItem=player.inventory.find(i=>i.id===id); if(!invItem||invItem.qty<=0)return;
  invItem.qty--; if(invItem.qty<=0)player.inventory=player.inventory.filter(i=>i.id!==id);
  savePlayer();
  if(cat.healAmt>0){const healed=Math.min(cat.healAmt,state.heroMaxHp-state.heroHp);state.heroHp=Math.min(state.heroMaxHp,state.heroHp+cat.healAmt);spawnDmg('heroSprite',healed,'heal');addLog(`${cat.icon} ${cat.name} utilisé — +${healed} HP soignés !`,'heal-line');}
  if(cat.atkMult>0){state.atkBuff=Math.floor(state.heroStats.atk*cat.atkMult);state.atkBuffTurns=cat.duration||2;addLog(`${cat.icon} ATK augmentée de +${state.atkBuff} pendant ${state.atkBuffTurns} tours !`,'hero-action');}
  if(cat.cureStatus){
    if(cat.cureStatus==='all'){
      const count=state.heroStatuses?state.heroStatuses.length:0;
      cureAllStatuses();
      addLog(`${cat.icon} ${cat.name} — tous les statuts éliminés !`,'heal-line');
    } else {
      const cured=cureStatus(cat.cureStatus);
      if(cured) addLog(`${cat.icon} ${cat.name} — ${STATUS_DEFS[cat.cureStatus].label} soignée !`,'heal-line');
      else addLog(`${cat.icon} ${cat.name} — aucun statut à soigner.`,'system');
    }
  }
  updateBattleUI(); buildItemRow();
  setPlayerTurn(false); setTimeout(()=>villainTurn(),600);
}

function calcDmg(atk,def,mult=1){return Math.max(1,Math.floor(atk*mult*(0.85+Math.random()*0.3)*Math.max(0.3,1-def*0.003)));}
const isCrit=()=>Math.random()<0.15;
const isMiss=()=>Math.random()<Math.max(0.01,0.08-getPassiveMissReduction());
function getEffectiveAtk(){return state.heroStats.atk+(state.atkBuffTurns>0?state.atkBuff:0);}

// ============================================
// STATUS EFFECTS SYSTEM
// ============================================
// state.heroStatuses = [ { type, turnsLeft, stacks } ]

function initStatuses() {
  if (!state.heroStatuses) state.heroStatuses = [];
}

function applyStatus(type, turns, stacks=1) {
  initStatuses();
  const existing = state.heroStatuses.find(s => s.type === type);
  if (existing) {
    // Refresh duration and stack (poison stacks, others just refresh)
    existing.turnsLeft = Math.max(existing.turnsLeft, turns);
    if (type === 'poison') existing.stacks = Math.min(existing.stacks + stacks, 5);
    addLog(STATUS_DEFS[type].refreshLog, 'villain-action');
  } else {
    state.heroStatuses.push({ type, turnsLeft: turns, stacks });
    addLog(STATUS_DEFS[type].applyLog, 'crit-line');
    showNarrator(STATUS_DEFS[type].narratorMsg, 2500);
  }
  updateBattleUI();
}

function cureStatus(type) {
  initStatuses();
  const idx = state.heroStatuses.findIndex(s => s.type === type);
  if (idx >= 0) { state.heroStatuses.splice(idx, 1); return true; }
  return false;
}

function cureAllStatuses() {
  initStatuses();
  state.heroStatuses = [];
}

function tickStatuses() {
  initStatuses();
  const toRemove = [];
  for (const s of state.heroStatuses) {
    const def = STATUS_DEFS[s.type];
    if (def && def.onTick) def.onTick(s);
    s.turnsLeft--;
    if (s.turnsLeft <= 0) toRemove.push(s.type);
  }
  toRemove.forEach(t => {
    cureStatus(t);
    addLog(STATUS_DEFS[t].expireLog, 'system');
  });
}

const STATUS_DEFS = {
  burn: {
    icon: '🔥', label: 'Brûlure',
    applyLog:   '🔥 Brûlure infligée ! Tu perdras des HP chaque tour.',
    refreshLog: '🔥 Brûlure ravivée !',
    expireLog:  '🔥 La Brûlure s\'éteint.',
    narratorMsg: 'Les flammes te consumment lentement…',
    onTick: (s) => {
      const dmg = Math.max(3, Math.floor(state.heroMaxHp * 0.06));
      state.heroHp = Math.max(1, state.heroHp - dmg);
      spawnDmg('heroSprite', dmg, 'dmg');
      addLog(`🔥 Brûlure — ${dmg} dégâts de feu !`, 'crit-line');
    }
  },
  poison: {
    icon: '☠️', label: 'Poison',
    applyLog:   '☠️ Empoisonné ! Les dégâts augmentent chaque tour.',
    refreshLog: '☠️ Le poison s\'intensifie !',
    expireLog:  '☠️ Le poison se dissipe.',
    narratorMsg: 'Le venin se répand dans tes veines…',
    onTick: (s) => {
      const dmg = Math.max(2, Math.floor(state.heroMaxHp * 0.03 * s.stacks));
      state.heroHp = Math.max(1, state.heroHp - dmg);
      spawnDmg('heroSprite', dmg, 'dmg');
      addLog(`☠️ Poison (x${s.stacks}) — ${dmg} dégâts !`, 'villain-action');
      if (s.stacks < 5) s.stacks++; // escalade chaque tick
    }
  },
  slow: {
    icon: '🧊', label: 'Ralentissement',
    applyLog:   '🧊 Ralenti ! L\'ennemi agit en premier pendant quelques tours.',
    refreshLog: '🧊 Ralentissement prolongé !',
    expireLog:  '🧊 Tu retrouves ta vitesse normale.',
    narratorMsg: 'Tes mouvements se figent comme de la glace…',
    onTick: null // l'effet est géré dans setPlayerTurn
  }
};

function isSlowed() {
  initStatuses();
  return state.heroStatuses.some(s => s.type === 'slow');
}

function renderStatusBadges() {
  initStatuses();
  const el = document.getElementById('heroStatus');
  if (!el) return;
  let html = '';
  // Existing buffs
  if (state.atkBuffTurns > 0) html += `<span class="status-icon" style="background:rgba(245,166,35,0.15);color:var(--accent2);border:1px solid rgba(245,166,35,0.3);">⚡ ATK+ (${state.atkBuffTurns}t)</span>`;
  if (state.fortressActive) html += `<span class="status-icon" style="background:rgba(96,165,250,0.15);color:var(--xp-blue);border:1px solid rgba(96,165,250,0.3);">🥖 FORTERESSE (${state.fortressTurns}t)</span>`;
  // Status effects
  for (const s of state.heroStatuses) {
    const def = STATUS_DEFS[s.type];
    if (!def) continue;
    const stackStr = s.type === 'poison' ? ` x${s.stacks}` : '';
    html += `<span class="status-icon status-${s.type}">${def.icon} ${def.label}${stackStr} (${s.turnsLeft}t)</span>`;
  }
  el.innerHTML = html;
}

// Probability of inflicting a status per attack type (villain)
function maybeInflictStatus(villain, attackType) {
  // Boss = higher chance, scaled by difficulty
  const diffBonus = currentDifficulty === 'infernal' ? 0.18 : currentDifficulty === 'epicee' ? 0.09 : 0;
  const baseChance = villain.isBoss ? 0.28 + diffBonus : 0.14 + diffBonus;
  if (Math.random() > baseChance) return;

  // Pick status based on villain archetype (id keywords) or random
  const id = villain.id;
  let pool = [];
  if (/piment|cannelle|tomate|banane|volcan/.test(id)) pool = ['burn','burn','poison'];
  else if (/glace|sorbet|esquimau|yeti/.test(id)) pool = ['slow','slow','burn'];
  else if (/algue|vinaigre|ferment|anchois|cornichon/.test(id)) pool = ['poison','poison','slow'];
  else pool = ['burn','poison','slow'];

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const turns = villain.isBoss ? 3 : 2;
  applyStatus(chosen, turns);
}

function addAntiStatusItems() {
  // Ensure antidote items exist in shop catalog
  if (!SHOP_CATALOG.consumables.find(c => c.id === 'cure_burn')) {
    SHOP_CATALOG.consumables.push(
      { id:'cure_burn',  name:'Eau Glacée',    icon:'💧', type:'consumable', price:18, stat:'Soigne Brûlure', healAmt:0, atkMult:0, cureStatus:'burn',   desc:'Éteint instantanément la Brûlure.', reqLv:1, stackable:true },
      { id:'cure_poison',name:'Lait Antidote', icon:'🥛', type:'consumable', price:22, stat:'Soigne Poison',  healAmt:0, atkMult:0, cureStatus:'poison', desc:'Neutralise le Poison, même empilé.', reqLv:1, stackable:true },
      { id:'cure_slow',  name:'Café Double',   icon:'☕', type:'consumable', price:20, stat:'Soigne Ralentissement', healAmt:0, atkMult:0, cureStatus:'slow', desc:'Remet ta vitesse à la normale.', reqLv:1, stackable:true },
      { id:'cure_all',   name:'Remède Universel', icon:'🍵', type:'consumable', price:55, stat:'Soigne tous statuts', healAmt:30, atkMult:0, cureStatus:'all', desc:'Élimine tout statut + soigne 30 HP.', reqLv:2, stackable:true }
    );
  }
}

function playerAction(id) {
  if(!state.playerTurn||!state.battleRunning)return;
  const hero=state.heroChar; const villain=state.villainChar;
  const heroEffective={...state.heroStats,atk:getEffectiveAtk()};
  const attacks=getAttacks(hero);
  const atk=attacks.find(a=>a.id===id);
  if(!atk){setPlayerTurn(true);return;}
  if(id==='special'&&state.heroSpecial<100){setPlayerTurn(true);return;}
  // Cooldown check
  if(atk.cooldown > 0 && (state.cooldowns[id]||0) > 0){
    showToast(`⏳ ${atk.name} — encore ${state.cooldowns[id]} tour(s) !`, 'error');
    return;
  }
  setPlayerTurn(false);
  const result=atk.fn(heroEffective,villain);
  if(!result){setPlayerTurn(true);return;}
  // Set cooldown after use
  if(atk.cooldown > 0) state.cooldowns[id] = atk.cooldown;
  state.heroDefending=false;
  if(result.miss){anim('heroSprite','punch-right');setTimeout(()=>spawnDmg('villainSprite',0,'miss'),300);addLog(`💨 ${hero.name} rate son coup !`,'hero-action');setTimeout(()=>villainTurn(),900);return;}

  // ---- PATATE SPECIAL CINEMATIC ----
  if(id==='special' && hero.id==='patate') {
    state.heroSpecial=0;
    updateBattleUI();
    triggerPatateSpecial(heroEffective, villain, result, (res) => {
      // Apply damage after cinematic
      if(res.dmg){anim('villainSprite','hit-shake');spawnDmg('villainSprite',res.dmg,'crit');state.villainHp-=res.dmg;}
      addLog(res.log,'crit-line');
      addLog('🎙 "'+pick(hero.narratorLines.attack)+'"','system');
      // Arena quake on battle screen
      const arena=document.querySelector('.arena');
      if(arena){arena.classList.add('arena-quake');setTimeout(()=>arena.classList.remove('arena-quake'),500);}
      updateBattleUI();
      checkBattleEnd()||setTimeout(()=>villainTurn(),900);
    });
    return;
  }
  // ---- END PATATE SPECIAL ----

  anim('heroSprite','punch-right');
  setTimeout(()=>{
    if(result.heal){state.heroHp=Math.min(state.heroMaxHp,state.heroHp+result.heal);spawnDmg('heroSprite',result.heal,'heal');}
    if(result.dmg){anim('villainSprite','hit-shake');spawnDmg('villainSprite',result.dmg,result.crit?'crit':'dmg');state.villainHp-=result.dmg;}
    if(result.defend)state.heroDefending=true;
    if(result.spBonus){const spBonus=getPassiveSpecialBonus();state.heroSpecial=Math.min(100,state.heroSpecial+result.spBonus+(spBonus/10));}
    addLog(result.log,result.crit?'crit-line':'hero-action');
    if(result.crit)addLog('🎙 "'+pick(hero.narratorLines.attack)+'"','system');
    updateBattleUI();
    checkBattleEnd()||setTimeout(()=>villainTurn(),900);
  },350);
}

function villainTurn() {
  if(!state.battleRunning)return;
  const villain=state.villainChar; const hero=state.heroChar;
  state.turn++;
  // Tick status effects (burn, poison)
  tickStatuses();
  if(checkBattleEnd())return; // status might kill hero
  const regen=getPassiveRegenPerTurn();
  if(regen>0&&state.heroHp<state.heroMaxHp){const healed=Math.min(regen,state.heroMaxHp-state.heroHp);state.heroHp+=healed;spawnDmg('heroSprite',healed,'heal');addLog(`🫙 Régénération — +${healed} HP`,'heal-line');}
  if(state.atkBuffTurns>0){state.atkBuffTurns--;if(state.atkBuffTurns===0){state.atkBuff=0;addLog('⚡ Boost ATK terminé.','system');}}
  if(state.fortressActive){state.fortressTurns--;if(state.fortressTurns<=0){state.fortressActive=false;addLog('🥖 Forteresse de Baguette s\'effondre…','system');}}
  // Decrement cooldowns
  for (const id in state.cooldowns) { if (state.cooldowns[id] > 0) state.cooldowns[id]--; }
  state.villainSpecial=Math.min(100,state.villainSpecial+18);
  const hpRatio=state.villainHp/state.villainMaxHp;
  if(villain.phases){const phase=villain.phases.slice().reverse().find(p=>hpRatio<=p.threshold&&!p.taunted);if(phase){phase.taunted=true;addLog('😈 '+villain.name+' : "'+phase.taunt+'"',villain.isBoss?'villain-action':'intermediate-action');if(villain.isBoss){showPhaseBanner('⚡ NOUVELLE PHASE', phase.taunt.substring(0,40)+'…');}else{showNarrator(phase.taunt,2500);}}}
  let action;
  if(state.villainSpecial>=100&&Math.random()<0.7)action='special';
  else if(hpRatio<0.35)action=Math.random()<0.6?'special':'punch';
  else if(hpRatio<0.6)action=Math.random()<0.4?'combo':'punch';
  else{const r=Math.random();action=r<0.5?'punch':r<0.75?'combo':'defend';}
  anim('villainSprite','punch-left');
  const logCls=villain.isBoss?'villain-action':'intermediate-action';
  setTimeout(()=>{
    const blockRate=state.fortressActive?0.8:0.5;
    if(action==='punch'){
      if(isMiss()){addLog('💨 '+villain.name+' rate son coup !',logCls);spawnDmg('heroSprite',0,'miss');}
      else{
        const crit=isCrit();let dmg=crit?Math.floor(calcDmg(villain.atk,state.heroStats.def)*1.7):calcDmg(villain.atk,state.heroStats.def);
        if(state.heroDefending||state.fortressActive)dmg=Math.floor(dmg*(1-blockRate));
        anim('heroSprite','hit-shake');
        spawnDmg('heroSprite',dmg,crit?'crit':'dmg');
        state.heroHp-=dmg;
        // Arena flash on villain crit
        if(crit){const arena=document.getElementById('battleArena');if(arena){arena.classList.add('arena-quake');setTimeout(()=>arena.classList.remove('arena-quake'),500);}}
        addLog((crit?'💥 CRITIQUE ! ':'😈 ')+villain.name+' frappe '+hero.name+' pour '+dmg+(state.heroDefending?' (garde !)':state.fortressActive?' (forteresse !)':'')+' !',crit?'crit-line':logCls);
        maybeInflictStatus(villain, 'punch');
        if(state.fortressActive&&state.fortressCounter){const riposteDmg=calcDmg(state.heroStats.atk,villain.def,0.6);state.villainHp-=riposteDmg;spawnDmg('villainSprite',riposteDmg,'dmg');addLog('🥖 Riposte de la Forteresse — '+riposteDmg+' dégâts !','hero-action');}
      }
    }else if(action==='combo'){
      let dmg=calcDmg(villain.atk,state.heroStats.def,1.2);if(state.heroDefending||state.fortressActive)dmg=Math.floor(dmg*(1-blockRate*0.6));
      anim('heroSprite','hit-shake');spawnDmg('heroSprite',dmg,'dmg');state.heroHp-=dmg;
      addLog('🔥 '+villain.name+' combo furieux — '+dmg+' dégâts !',logCls);
      maybeInflictStatus(villain, 'combo');
    }else if(action==='defend'){
      state.villainDefending=true;addLog('🛡️ '+villain.name+' se barricade…',logCls);
    }else if(action==='special'){
      state.villainSpecial=0;const result=villain.special.fn(villain,hero);
      let dmg=result.dmg;if(state.heroDefending||state.fortressActive)dmg=Math.floor(dmg*(state.fortressActive?0.25:0.55));
      anim('heroSprite','hit-shake');spawnDmg('heroSprite',dmg,'crit');state.heroHp-=dmg;
      const arena2=document.getElementById('battleArena');if(arena2){arena2.classList.add('arena-quake');setTimeout(()=>arena2.classList.remove('arena-quake'),500);}
      addLog('⚡ '+result.log,'crit-line');
      maybeInflictStatus(villain, 'special');
    }
    updateBattleUI();
    if(!checkBattleEnd())setPlayerTurn(true);
  },400);
}

function checkBattleEnd() {
  if(state.heroHp<=0){state.battleRunning=false;setTimeout(()=>endBattle(false),500);return true;}
  if(state.villainHp<=0){state.battleRunning=false;setTimeout(()=>endBattle(true),500);return true;}
  return false;
}

function endBattle(won) {
  // Tracking région
  if (won && selectedRegion && state.villainChar) {
    markEnemyBeaten(selectedRegion, state.villainChar.id);
  }
  // Défaite : toute la progression de la région repart à zéro
  if (!won && selectedRegion) {
    const p = loadRegionProgress();
    p[selectedRegion] = { beaten: [], completed: false };
    saveRegionProgress(p);
  }
  const hero=state.heroChar; const villain=state.villainChar;
  const isLastEnemy=state.currentEnemyIndex>=ENEMIES.length-1;
  const baseXp=won?(villain.isBoss?200:80):20;
  const earnedXpRaw=Math.floor(baseXp+state.turn*(won?8:3)+Math.random()*40);
  const diffMult = won ? (DIFFICULTIES[currentDifficulty]||DIFFICULTIES.normal).xpMult : 1.0;
  const earnedXp=Math.floor(earnedXpRaw * diffMult);
  const baseGold=won?(villain.isBoss?60:20):5;
  const earnedGoldRaw=Math.floor(baseGold+Math.random()*(won?30:8));
  const earnedGold=Math.floor(earnedGoldRaw * (won ? (DIFFICULTIES[currentDifficulty]||DIFFICULTIES.normal).rewardMult : 1.0));
  const didLevelUp=addXpGold(earnedXp,earnedGold);
  const newLevel=player.level;
  if(didLevelUp){const unlock=LEVEL_UNLOCKS[newLevel];document.getElementById('levelupBannerTitle').textContent=`🎉 Niveau ${newLevel} atteint !`;document.getElementById('levelupBannerSub').textContent=(unlock?unlock.msg+' · ':'')+`✨ +1 point de compétence disponible !`;document.getElementById('levelupBanner').classList.add('show');}
  // Difficulty badge on victory
  const vdb = document.getElementById('victoryDiffBadge');
  if (vdb) vdb.innerHTML = getDiffBadgeHtml();
  if(won&&!isLastEnemy){
    state.heroHpPersist=state.heroHp; state.currentEnemyIndex++; updateStageIndicators();
    state.heroStatuses = []; // clear statuses between fights
    document.getElementById('victoryIcon').textContent='⚔';
    const t=document.getElementById('victoryTitle'); t.textContent=villain.name+' vaincu !'; t.className='victory-title intermediate';
    document.getElementById('victorySub').textContent=`Bien joué ! Le prochain adversaire t'attend : ${ENEMIES[state.currentEnemyIndex].name}.`;
    const banner=document.getElementById('hpCarryBanner'); banner.classList.remove('hidden');
    document.getElementById('hpCarryVal').textContent=`${state.heroHp}/${state.heroMaxHp} HP`;
    document.getElementById('xpGained').textContent='+'+earnedXp;
    document.getElementById('goldGained').textContent='+'+earnedGold;
    document.getElementById('turnsUsed').textContent=state.turn;
    const q=pick(hero.narratorLines.win);
    document.getElementById('victoryQuote').innerHTML=`"${q}"<cite>— Narrateur</cite>`;
    const nextEnemy=ENEMIES[state.currentEnemyIndex];
    const btnR=document.getElementById('btnRematch');
    btnR.textContent=nextEnemy.isBoss?'💀 Affronter le Boss !':`⚔ Combat suivant : ${nextEnemy.name}`;
    btnR.className='btn-rematch next-stage'; btnR.onclick=()=>startBattle(false);
    const btnB=document.getElementById('btnBackSelect');
    btnB.textContent='← Abandonner (remet à zéro)';
    btnB.onclick=()=>{if(selectedRegion){const p=loadRegionProgress();p[selectedRegion]={beaten:[],completed:false};saveRegionProgress(p);}state.currentEnemyIndex=0;state.heroHpPersist=0;updateStageIndicators();backToSelect();};
    showScreen('victory'); return;
  }
  document.getElementById('hpCarryBanner').classList.add('hidden');
  document.getElementById('victoryIcon').textContent=won?'🏆':'💀';
  const t=document.getElementById('victoryTitle'); t.textContent=won?'Champion de la Cantine !':'Défaite…'; t.className='victory-title '+(won?'win':'lose');
  document.getElementById('victorySub').textContent=won
    ? `Incroyable ! ${ENEMIES.length} combats, ${villain.name} vaincu en ${state.turn} tours !`
    : `${villain.name} t'a eu… La progression de la région est remise à zéro. Il faut tout recommencer depuis le début !`;
  document.getElementById('xpGained').textContent=(won?'+':'')+earnedXp;
  document.getElementById('goldGained').textContent=(won?'+':'')+earnedGold;
  document.getElementById('turnsUsed').textContent=state.turn;
  const q=pick(won?hero.narratorLines.win:hero.narratorLines.lose);
  document.getElementById('victoryQuote').innerHTML=`"${q}"<cite>— Narrateur</cite>`;
  const btnR=document.getElementById('btnRematch');
  if(won && selectedRegion){
    const allDone=REGIONS.every(r=>{const p=loadRegionProgress();return p[r.id]&&p[r.id].completed;});
    if(allDone){btnR.textContent='🏆 Retour à la Carte';btnR.className='btn-rematch';btnR.onclick=()=>switchTab('map');}
    else{btnR.textContent='🗺 Retour à la Carte';btnR.className='btn-rematch next-stage';btnR.onclick=()=>switchTab('map');}
  } else if(!won && selectedRegion){
    btnR.textContent='🔄 Réessayer depuis le début'; btnR.className='btn-rematch';
    btnR.onclick=()=>{state.currentEnemyIndex=0;state.heroHpPersist=0;updateStageIndicators();enterRegionWithDifficulty(selectedRegion);};
  } else {
    btnR.textContent=won?'🔄 Rejouer la région':'🔄 Revanche'; btnR.className='btn-rematch';
    btnR.onclick=()=>{state.currentEnemyIndex=0;state.heroHpPersist=0;updateStageIndicators();if(selectedRegion){enterRegion();}else{startBattle(true);}};
  }
  const btnB=document.getElementById('btnBackSelect');
  btnB.textContent='← Carte du monde'; btnB.onclick=()=>{state.currentEnemyIndex=0;state.heroHpPersist=0;updateStageIndicators();renderHeroGrid();renderWorldMap();switchTab('map');};
  showScreen('victory');
}

function backToSelect() {
  if(selectedHero)switchCharSave(selectedHero);
  renderHeroGrid();
  renderWorldMap();
  showScreen('map');
  updateProfileUI();
}

function openMobileMenu(){document.getElementById('mobileMenu').classList.add('open');document.body.style.overflow='hidden';}
function closeMobileMenu(){document.getElementById('mobileMenu').classList.remove('open');document.body.style.overflow='';}

function getResetCost(){const spent=player.skillPointsSpent||0;return Math.min(500,Math.max(20,spent*10));}

function confirmResetSkills() {
  if(!selectedHero){showToast('Sélectionne un héros d\'abord !','error');return;}
  const spent=player.skillPointsSpent||0;
  if(spent===0){showToast('Aucune compétence à réinitialiser.','info');return;}
  const cost=getResetCost();
  document.getElementById('resetCostLabel').textContent=cost+' 🪙';
  document.getElementById('resetSkillsModal').style.display='flex';
}

function doResetSkills() {
  document.getElementById('resetSkillsModal').style.display='none';
  const cost=getResetCost();
  if(player.gold<cost){showToast('Pas assez de pièces ! ('+cost+' 🪙 requis)','error');return;}
  player.gold-=cost;
  player.skillPoints+=player.skillPointsSpent;
  player.skillPointsSpent=0; player.unlockedSkills={};
  savePlayer(); renderSkillTree(); updateProfileUI(); renderSelect();
  showToast('✨ Compétences réinitialisées ! Points remboursés.','skill');
}

// ============================================
// WORLD MAP SYSTEM
// ============================================
function getRegionProgressKey() {
  return 'lunchboxe_region_progress_' + (selectedHero || 'default');
}

function loadRegionProgress() {
  try { return JSON.parse(localStorage.getItem(getRegionProgressKey())) || {}; } catch(e) { return {}; }
}
function saveRegionProgress(prog) {
  localStorage.setItem(getRegionProgressKey(), JSON.stringify(prog));
}
function getRegionProgress() { return loadRegionProgress(); }

function isRegionUnlocked(regionIdx) {
  if (regionIdx === 0) return true;
  const prog = getRegionProgress();
  const prevRegion = REGIONS[regionIdx - 1];
  return prog[prevRegion.id] && prog[prevRegion.id].completed;
}

function getRegionEnemiesBeaten(regionId) {
  const prog = getRegionProgress();
  return (prog[regionId] && prog[regionId].beaten) || [];
}

function markEnemyBeaten(regionId, enemyId) {
  const prog = loadRegionProgress();
  if (!prog[regionId]) prog[regionId] = { beaten: [], completed: false };
  if (!prog[regionId].beaten.includes(enemyId)) prog[regionId].beaten.push(enemyId);
  const region = REGIONS.find(r => r.id === regionId);
  const wasCompleted = prog[regionId].completed;
  if (region && prog[regionId].beaten.length >= region.enemies.length) {
    prog[regionId].completed = true;
  }
  saveRegionProgress(prog);

  // Animation de révélation : transition douce vers la nouvelle image de carte
  if (!wasCompleted && prog[regionId].completed) {
    const nextRegionIdx = REGIONS.findIndex(r => r.id === regionId) + 1;
    const nextRegion = REGIONS[nextRegionIdx];
    if (nextRegion) {
      setTimeout(() => {
        // Flash lumineux d'abord
        const svgWrap = document.getElementById('worldMapSvgWrap');
        if (svgWrap) {
          svgWrap.style.transition = 'filter 0.15s ease-out';
          svgWrap.style.filter = 'brightness(2.5) saturate(0)';
          setTimeout(() => {
            svgWrap.style.filter = '';
            // Puis transition douce : réafficher la carte avec nouvelle image
            setTimeout(() => {
              svgWrap.style.transition = 'opacity 0.6s ease';
              svgWrap.style.opacity = '0.3';
              setTimeout(() => {
                renderWorldMap(); // Rechargement avec la nouvelle image
                svgWrap.style.opacity = '1';
                svgWrap.style.transition = '';
              }, 300);
            }, 100);
          }, 150);
        }
        showToast(`🗺 ${nextRegion.icon} ${nextRegion.name} débloquée !`, 'success');
      }, 1200);
    }
  }
}

let selectedRegion = null;

// ─── MAP LAYOUT DATA ─────────────────────────────────────────────────────────
// Full-coverage territories that tile together. viewBox: 0 0 700 440
const MAP_LAYOUT = [
  { // 1 – Forêt des Épices — top-left quadrant, lush jungle
    id: 'foret_epices',
    territory: 'M 0,0 L 230,0 L 245,30 C 230,60 210,90 195,120 C 180,150 170,175 155,195 C 135,215 110,220 90,215 C 65,208 40,195 20,175 C 5,160 0,140 0,110 Z',
    cx: 110, cy: 105,
    gradStop1: '#2d5a0a', gradStop2: '#0f2204',
    strokeColor: '#6aaa18',
    // Tree symbols (cx, cy, r)
    trees: [[40,60,7],[80,45,9],[130,35,8],[175,50,7],[200,75,6],[55,150,6],[95,165,7],[140,170,6],[170,145,5]],
    // River path
    river: 'M 180,0 C 170,40 155,80 140,120 C 125,160 100,185 80,200',
    riverColor: 'rgba(80,180,80,0.25)',
    mountains: [],
  },
  { // 2 – Désert du Sel — top-right quadrant, sandy wastes
    id: 'desert_sel',
    territory: 'M 230,0 L 700,0 L 700,160 C 660,170 620,175 580,170 C 545,165 510,150 480,135 C 455,122 430,108 405,100 C 375,90 350,85 330,80 C 305,74 270,55 245,30 Z',
    cx: 560, cy: 110,
    gradStop1: '#5c3208', gradStop2: '#1e0e02',
    strokeColor: '#c8801a',
    trees: [],
    river: '',
    riverColor: '',
    // Dune arcs
    dunes: [
      'M 340,50 Q 380,38 420,55','M 440,70 Q 490,55 535,72','M 550,45 Q 600,32 645,50',
      'M 360,100 Q 410,88 460,105','M 480,120 Q 535,108 580,125','M 600,90 Q 650,78 690,92',
    ],
    mountains: [
      {x:590,y:155,h:30},{x:620,y:148,h:38},{x:650,y:153,h:28},
    ],
  },
  { // 3 – Marais du Vinaigre — center, murky wetlands
    id: 'marais_vinaigre',
    territory: 'M 195,120 C 220,95 260,85 300,82 C 340,79 375,88 405,100 C 430,108 455,122 470,142 C 485,162 488,188 480,212 C 472,235 455,255 430,268 C 405,280 375,285 345,282 C 310,278 275,265 248,248 C 220,230 195,205 185,178 C 176,155 178,138 195,120 Z',
    cx: 335, cy: 185,
    gradStop1: '#1e2848', gradStop2: '#0a0e20',
    strokeColor: '#5855bb',
    trees: [[210,200,5],[230,230,6],[255,250,5],[290,258,4],[325,255,5],[360,248,4],[395,235,5],[415,215,4]],
    river: 'M 300,82 C 305,120 310,150 320,180 C 330,210 335,240 330,268',
    riverColor: 'rgba(100,90,200,0.2)',
    mountains: [],
    // mist wisps
    mist: [
      'M 210,155 Q 240,145 270,158 Q 300,168 330,155','M 230,178 Q 265,168 295,178 Q 325,188 355,175',
      'M 250,200 Q 285,192 310,202 Q 340,212 370,200',
    ],
  },
  { // 4 – Pics Glacés du Sorbet — top-center-right, icy peaks
    id: 'pics_sorbet',
    territory: 'M 245,30 C 270,55 305,74 330,80 C 350,85 375,90 405,100 C 380,88 355,70 335,50 C 318,35 295,18 270,8 Z',
    // expand it to be bigger
    territory: 'M 245,30 C 255,10 280,0 310,0 L 470,0 C 490,8 505,22 510,42 C 515,62 505,82 490,95 C 470,108 445,115 420,118 C 395,120 368,115 345,108 C 318,100 292,88 270,72 C 252,58 244,44 245,30 Z',
    cx: 390, cy: 58,
    gradStop1: '#0a2f58', gradStop2: '#030d1e',
    strokeColor: '#48aae8',
    trees: [],
    river: '',
    riverColor: '',
    mountains: [
      {x:300,y:105,h:50},{x:335,y:92,h:62},{x:368,y:85,h:70},{x:403,y:88,h:58},{x:435,y:98,h:44},
    ],
    snowcap: 'M 285,82 C 302,60 320,48 338,58 C 350,45 368,36 385,48 C 400,35 418,30 435,44 C 448,34 462,32 474,45',
  },
  { // 5 – Volcan de la Cantine — bottom-center
    id: 'volcan_cantine',
    territory: 'M 185,178 C 195,205 220,230 248,248 C 275,265 310,278 345,282 C 375,285 405,280 430,268 C 455,255 472,235 480,212 C 488,188 485,162 470,142 C 465,160 460,190 455,215 C 448,240 435,262 415,278 C 393,295 360,305 325,308 C 290,310 255,305 228,292 C 205,280 188,260 182,238 C 176,218 178,198 185,178 Z',
    // make it fill bottom
    territory: 'M 130,215 C 140,240 165,268 195,288 C 225,308 265,322 308,326 C 350,330 392,325 428,310 C 462,295 488,272 500,245 C 512,218 508,188 492,165 C 480,212 472,235 455,255 C 430,268 405,280 375,285 C 345,282 310,278 275,265 C 248,248 220,230 195,178 Z',
    territory: 'M 0,215 L 0,440 L 700,440 L 700,215 C 660,210 620,210 580,215 C 555,218 530,225 505,232 C 490,238 475,248 455,258 C 430,272 405,282 375,288 C 345,292 308,292 275,285 C 248,277 220,262 198,244 C 175,228 155,210 130,205 C 85,198 40,205 0,215 Z',
    cx: 340, cy: 340,
    gradStop1: '#5a1508', gradStop2: '#1c0502',
    strokeColor: '#e04818',
    trees: [],
    river: '',
    riverColor: '',
    mountains: [
      {x:200,y:310,h:55},{x:245,y:295,h:70},{x:295,y:280,h:88},{x:345,y:275,h:95},{x:395,y:280,h:80},{x:440,y:292,h:65},{x:485,y:308,h:50},
    ],
    lava: [
      'M 310,300 C 318,315 325,332 330,348','M 345,295 C 350,310 352,328 348,345',
      'M 365,302 C 370,318 372,335 368,350',
    ],
  },
  { // 6 — Sea / ocean edges (decorative fill — not a region)
    id: '_sea',
    territory: null, // handled separately
  }
];

// Trail path connecting region centers
const MAP_TRAIL_D = 'M 110,105 C 200,92 270,110 335,185 C 355,155 370,105 390,58 C 430,65 470,70 510,85 M 335,185 C 335,240 338,290 340,340';

// Cloud shapes for fog of war (each region has its own cloud cluster)
// Clouds are large and overlapping to fully blanket the unexplored region
const REGION_CLOUDS = {
  foret_epices: [
    // Bottom-layer large base clouds
    {cx:30,  cy:60,  rx:90, ry:60, layer:0},
    {cx:150, cy:40,  rx:100,ry:65, layer:0},
    {cx:220, cy:90,  rx:85, ry:58, layer:0},
    {cx:70,  cy:145, rx:95, ry:60, layer:0},
    {cx:185, cy:165, rx:90, ry:55, layer:0},
    // Mid-layer puffier clouds
    {cx:55,  cy:85,  rx:72, ry:48, layer:1},
    {cx:155, cy:70,  rx:80, ry:52, layer:1},
    {cx:100, cy:160, rx:75, ry:46, layer:1},
    {cx:200, cy:135, rx:68, ry:42, layer:1},
    // Top highlights
    {cx:80,  cy:50,  rx:55, ry:36, layer:2},
    {cx:175, cy:48,  rx:60, ry:38, layer:2},
    {cx:130, cy:125, rx:58, ry:34, layer:2},
  ],
  desert_sel: [
    // Large base
    {cx:360, cy:30,  rx:110,ry:68, layer:0},
    {cx:490, cy:20,  rx:120,ry:72, layer:0},
    {cx:620, cy:30,  rx:100,ry:62, layer:0},
    {cx:420, cy:115, rx:105,ry:60, layer:0},
    {cx:570, cy:108, rx:110,ry:62, layer:0},
    {cx:688, cy:100, rx:85, ry:55, layer:0},
    // Mid
    {cx:395, cy:55,  rx:85, ry:52, layer:1},
    {cx:520, cy:50,  rx:90, ry:55, layer:1},
    {cx:660, cy:60,  rx:78, ry:48, layer:1},
    {cx:450, cy:135, rx:80, ry:46, layer:1},
    {cx:610, cy:140, rx:82, ry:48, layer:1},
    // Top
    {cx:440, cy:28,  rx:65, ry:40, layer:2},
    {cx:590, cy:20,  rx:70, ry:42, layer:2},
    {cx:520, cy:95,  rx:60, ry:36, layer:2},
  ],
  marais_vinaigre: [
    // Base
    {cx:230, cy:128, rx:95, ry:62, layer:0},
    {cx:340, cy:118, rx:105,ry:65, layer:0},
    {cx:455, cy:135, rx:88, ry:58, layer:0},
    {cx:220, cy:215, rx:100,ry:62, layer:0},
    {cx:355, cy:230, rx:105,ry:60, layer:0},
    {cx:468, cy:215, rx:88, ry:55, layer:0},
    // Mid
    {cx:260, cy:155, rx:78, ry:50, layer:1},
    {cx:380, cy:148, rx:85, ry:52, layer:1},
    {cx:440, cy:175, rx:72, ry:44, layer:1},
    {cx:245, cy:238, rx:78, ry:46, layer:1},
    {cx:400, cy:255, rx:80, ry:48, layer:1},
    // Top
    {cx:305, cy:132, rx:62, ry:38, layer:2},
    {cx:420, cy:130, rx:58, ry:36, layer:2},
    {cx:310, cy:228, rx:64, ry:38, layer:2},
  ],
  pics_sorbet: [
    // Base
    {cx:270, cy:18,  rx:88, ry:55, layer:0},
    {cx:370, cy:8,   rx:100,ry:60, layer:0},
    {cx:468, cy:18,  rx:88, ry:55, layer:0},
    {cx:295, cy:78,  rx:80, ry:52, layer:0},
    {cx:400, cy:85,  rx:85, ry:52, layer:0},
    {cx:490, cy:72,  rx:75, ry:48, layer:0},
    // Mid
    {cx:320, cy:35,  rx:68, ry:44, layer:1},
    {cx:430, cy:28,  rx:72, ry:46, layer:1},
    {cx:345, cy:90,  rx:60, ry:38, layer:1},
    {cx:455, cy:95,  rx:62, ry:38, layer:1},
    // Top
    {cx:360, cy:20,  rx:55, ry:34, layer:2},
    {cx:415, cy:62,  rx:50, ry:32, layer:2},
  ],
  volcan_cantine: [
    // Base — wide region, need lots of coverage
    {cx:60,  cy:260, rx:110,ry:70, layer:0},
    {cx:195, cy:248, rx:120,ry:72, layer:0},
    {cx:340, cy:240, rx:125,ry:75, layer:0},
    {cx:480, cy:248, rx:118,ry:70, layer:0},
    {cx:625, cy:258, rx:105,ry:65, layer:0},
    {cx:100, cy:355, rx:115,ry:68, layer:0},
    {cx:250, cy:365, rx:120,ry:70, layer:0},
    {cx:400, cy:368, rx:125,ry:72, layer:0},
    {cx:560, cy:358, rx:118,ry:68, layer:0},
    {cx:670, cy:345, rx:100,ry:62, layer:0},
    // Mid
    {cx:140, cy:290, rx:90, ry:56, layer:1},
    {cx:285, cy:278, rx:95, ry:58, layer:1},
    {cx:430, cy:275, rx:98, ry:58, layer:1},
    {cx:575, cy:285, rx:88, ry:54, layer:1},
    {cx:180, cy:390, rx:90, ry:55, layer:1},
    {cx:340, cy:400, rx:95, ry:58, layer:1},
    {cx:500, cy:392, rx:90, ry:55, layer:1},
    // Top
    {cx:220, cy:262, rx:72, ry:44, layer:2},
    {cx:370, cy:255, rx:78, ry:46, layer:2},
    {cx:520, cy:265, rx:70, ry:42, layer:2},
    {cx:290, cy:375, rx:74, ry:44, layer:2},
    {cx:460, cy:380, rx:72, ry:44, layer:2},
  ],
};

function renderWorldMap() {
  const wrap = document.getElementById('worldMapSvgWrap');
  if (!wrap) return;

  const prog = getRegionProgress();

  // ── ZONES CLIQUABLES pour la nouvelle carte (map5.png, viewBox 700x434) ──
  // Nouvelle disposition : Forêt haut-gauche, Désert haut-droite,
  //                        Marais centre, Pics Glacés bas-gauche, Volcan bas-droite
  const territories = {
    foret_epices:    'M 0,0 L 310,0 L 280,100 L 200,160 L 100,200 L 0,180 Z',
    desert_sel:      'M 310,0 L 700,0 L 700,220 L 500,200 L 420,160 L 300,120 Z',
    marais_vinaigre: 'M 200,160 L 420,160 L 500,200 L 480,300 L 380,320 L 200,300 L 100,240 Z',
    pics_sorbet:     'M 0,180 L 100,200 L 200,300 L 200,434 L 0,434 Z',
    volcan_cantine:  'M 380,320 L 480,300 L 700,220 L 700,434 L 200,434 L 200,300 Z',
  };

  // Centres calés sur les gants de boxe de la nouvelle carte (map5.png, viewBox 700x434)
  // Ordre sur la carte : Forêt (haut-gauche), Désert du Sel (haut-droite),
  //                      Marais du Vinaigre (centre), Pics Glacés (bas-gauche), Volcan (bas-droite)
  const regionCenters = {
    foret_epices:    { cx: 220, cy: 200 },
    desert_sel:      { cx: 555, cy: 168 },
    marais_vinaigre: { cx: 340, cy: 258 },
    pics_sorbet:     { cx: 248, cy: 365 },
    volcan_cantine:  { cx: 452, cy: 388 },
  };

  // ── DEFS ──────────────────────────────────────────────────────────────────
  let defs = `<defs>`;

  // Active region glow filter (for selected pin halo)
  defs += `<filter id="activeglow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;

  // Vignette gradient
  defs += `<radialGradient id="vign" cx="50%" cy="50%" r="70%"><stop offset="40%" stop-color="transparent"/><stop offset="100%" stop-color="rgba(0,0,0,0.35)"/></radialGradient>`;

  defs += `</defs>`;

    let svg = defs;

  // Image de fond personnalisée (carte.png)
  // ── BACKGROUND IMAGE (dynamique selon progression) ────────────────────
  // Sélectionner l'image en fonction du nombre de régions complétées
  const completedCount = REGIONS.filter(r => prog[r.id] && prog[r.id].completed).length;
  
  const MAP_IMAGES = [
    'maps/map1.png',   // 0 région complétée : seulement Forêt visible
    'maps/map2.png',  // 1 région complétée : Forêt + Désert
    'maps/map3.png', // 2 régions complétées : Forêt + Désert + Marais
    'maps/map4.png', // 3 régions complétées : + Pics Glacés du Sorbet
    'maps/map5.png',  // 4 régions complétées : carte complète avec Volcan
  ];
  
  // Choisir l'image : min entre completedCount et longueur tableau - 1
  const bgImgIdx = Math.min(completedCount, MAP_IMAGES.length - 1);
  svg += `<image href="${MAP_IMAGES[bgImgIdx]}" x="0" y="0" width="700" height="434" preserveAspectRatio="xMidYMid slice"/>`;

  // Légère vignette par-dessus pour l'ambiance
  // Trier regions normalement (volcan en premier pour le fog)
  const sortedRegions = [...REGIONS].sort((a, b) => {
    if (a.id === 'volcan_cantine') return -1;
    if (b.id === 'volcan_cantine') return 1;
    return 0;
  });

  sortedRegions.forEach((region) => {
    const idx = REGIONS.indexOf(region);
    const unlocked = isRegionUnlocked(idx);
    const beaten   = getRegionEnemiesBeaten(region.id);
    const completed = prog[region.id] && prog[region.id].completed;
    const isActive  = selectedRegion === region.id;

    const rc = regionCenters[region.id];
    if (!rc) return;
    const { cx, cy } = rc;

    svg += `<g class="map-region-zone ${unlocked?'unlocked':'locked'}${isActive?' active-zone':''}">`;

    if (unlocked) {
      // ── MARQUEUR ROND TRANSPARENT ────────────────────────────────────────
      const ringColor  = completed ? '#c8f542' : (isActive ? (region.color || '#c8f542') : 'rgba(255,255,255,0.85)');
      const glowColor  = completed ? '#c8f542' : (isActive ? (region.color || '#c8f542') : 'rgba(255,255,255,0.5)');

      // Halo animé externe (pulse) — toujours visible, subtil
      svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${glowColor}" stroke-width="1" opacity="${isActive ? '0.5' : '0.2'}"/>`;

      // Anneau de sélection active (tirets)
      if (isActive) {
        svg += `<circle cx="${cx}" cy="${cy}" r="26" fill="none" stroke="${ringColor}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.9" class="region-glow"/>`;
      }

      // Cercle principal semi-transparent
      const fillOpacity  = completed ? '0.25' : (isActive ? '0.2' : '0.08');
      const strokeOpacity = completed ? '0.9'  : (isActive ? '0.95' : '0.55');
      svg += `<circle cx="${cx}" cy="${cy}" r="16" fill="${ringColor}" fill-opacity="${fillOpacity}" stroke="${ringColor}" stroke-width="${isActive ? '2' : '1.5'}" stroke-opacity="${strokeOpacity}" style="cursor:pointer" onclick="selectRegion('${region.id}')"/>`;

      // Reflet intérieur (arc de lumière en haut du cercle)
      svg += `<path d="M ${cx-7},${cy-9} Q ${cx},${cy-14} ${cx+7},${cy-9}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round" pointer-events="none"/>`;

      // Icône / checkmark centré
      if (completed) {
        svg += `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#c8f542" font-weight="900" opacity="0.95" pointer-events="none">✓</text>`;
      } else {
        svg += `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="white" opacity="${isActive ? '1' : '0.8'}" pointer-events="none">${region.icon}</text>`;
      }

      // Zone de clic élargie invisible
      svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="transparent" style="cursor:pointer" onclick="selectRegion('${region.id}')"/>`;

    } else {
      // Région verrouillée : anneau très discret
      svg += `<circle cx="${cx}" cy="${cy}" r="16" fill="rgba(0,0,0,0.3)" stroke="rgba(180,180,180,0.2)" stroke-width="1.5"/>`;
      svg += `<text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle" font-size="11" opacity="0.5">🔒</text>`;
    }

    svg += `</g>`;
  });

    // ── OVERLAY ELEMENTS ──────────────────────────────────────────────────────
  // Trail path
  // Compass rose
  svg += `<g transform="translate(658,416)" opacity="0.22" stroke="#c8f542" stroke-width="1" fill="none">
    <circle r="14"/>
    <line x1="0" y1="-13" x2="0" y2="13"/>
    <line x1="-13" y1="0" x2="13" y2="0"/>
    <polygon points="0,-8 3,-3 -3,-3" fill="#c8f542" stroke="none"/>
    <text x="0" y="-17" text-anchor="middle" fill="#c8f542" font-size="7" font-family="DM Mono,monospace" stroke="none">N</text>
  </g>`;

  // Scale bar + watermark
  svg += `<text x="14" y="432" fill="rgba(200,245,66,0.07)" font-size="8" font-family="DM Mono,monospace" letter-spacing="2.5">CARTE DU MONDE DE LA CANTINE</text>`;
  svg += `<line x1="14" y1="420" x2="74" y2="420" stroke="rgba(200,245,66,0.12)" stroke-width="1"/>`;
  svg += `<text x="44" y="418" text-anchor="middle" fill="rgba(200,245,66,0.1)" font-size="6.5" font-family="DM Mono,monospace">60 unités</text>`;

  // Vignette (pointer-events:none pour ne pas bloquer les clics sur les régions)
  svg += `<rect width="700" height="434" fill="url(#vign)" pointer-events="none"/>`;

  const fullSvg = `<svg id="worldMapSVG" viewBox="0 0 700 434" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">${svg}</svg>`;
  wrap.innerHTML = fullSvg;
  updateMapProgressLabel();
}

function updateMapProgressLabel() {
  const prog = getRegionProgress();
  const completed = REGIONS.filter(r => prog[r.id] && prog[r.id].completed).length;
  const el = document.getElementById('mapProgressLabel');
  if (!el) return;
  if (completed === 0) el.textContent = 'Sélectionne une région pour commencer ton épopée';
  else if (completed === REGIONS.length) el.textContent = '🏆 Épopée complète ! Tu es le Champion de la Cantine !';
  else el.textContent = `${completed} / ${REGIONS.length} régions maîtrisées — continue ton épopée`;
}

function selectRegion(regionId) {
  selectedRegion = regionId;
  renderWorldMap();
  showRegionDetail(regionId);
}

function showRegionDetail(regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  const panel = document.getElementById('regionDetailPanel');
  const beaten = getRegionEnemiesBeaten(regionId);
  const prog = getRegionProgress();
  const completed = prog[regionId] && prog[regionId].completed;

  document.getElementById('rdpBiomeTag').textContent = region.biome;
  document.getElementById('rdpBiomeTag').style.cssText = `background:${region.colorBg};color:${region.color};border:1px solid ${region.colorBorder}`;
  document.getElementById('rdpTitle').textContent = region.icon + ' ' + region.name;
  document.getElementById('rdpStory').textContent = region.story;

  const enemiesEl = document.getElementById('rdpEnemies');
  enemiesEl.innerHTML = region.enemies.map(eid => {
    const e = ALL_ENEMIES[eid];
    if (!e) return '';
    const isBeaten = beaten.includes(eid);
    return `<div class="rdp-enemy-chip ${e.isBoss ? 'boss-chip' : ''} ${isBeaten ? 'beaten-chip' : ''}">
      ${isBeaten ? '✓' : (e.isBoss ? '👑' : '⚔')} ${e.name}
      <span style="font-size:0.55rem;opacity:0.6">${e.isBoss ? 'BOSS' : 'SOUS-BOSS'}</span>
    </div>`;
  }).join('');

  const btn = document.getElementById('rdpEnterBtn');
  const heroWarning = document.getElementById('rdpHeroWarning');
  if (!selectedHero) {
    if (heroWarning) heroWarning.style.display = 'flex';
    btn.disabled = true;
    btn.textContent = '⚠ Choisis un héros d\'abord';
    btn.className = 'rdp-enter-btn';
  } else {
    if (heroWarning) heroWarning.style.display = 'none';
    if (completed) {
      btn.textContent = '🔄 Rejouer la région';
      btn.className = 'rdp-enter-btn completed-btn';
      btn.disabled = false;
      btn.onclick = () => openDiffModal(regionId);
    } else {
      const nextEnemy = region.enemies.find(eid => !beaten.includes(eid));
      const nextE = nextEnemy ? ALL_ENEMIES[nextEnemy] : null;
      btn.textContent = nextE ? `⚔ Affronter : ${nextE.name}` : '⚔ Entrer dans la région';
      btn.className = 'rdp-enter-btn resume-btn';
      btn.disabled = false;
      btn.onclick = () => openDiffModal(regionId);
    }
  }

  panel.style.display = 'block';
}

function closeRegionDetail() {
  document.getElementById('regionDetailPanel').style.display = 'none';
  selectedRegion = null;
  renderWorldMap();
}

function startBattleWithDialogue(newGame=false) {
  if(!selectedHero) return;
  const villainId = ENEMIES[state.currentEnemyIndex] ? ENEMIES[state.currentEnemyIndex].id : null;
  if(!villainId) { startBattle(newGame); return; }
  openDialogue(villainId, selectedHero, () => startBattle(newGame));
}

// ============================================
// DIFFICULTY SYSTEM
// ============================================

const DIFFICULTIES = {
  normal:   { label: 'Normal',   icon: '🍃', hpMult: 1.0, atkMult: 1.0, rewardMult: 1.0, xpMult: 1.0 },
  epicee:   { label: 'Épicé',    icon: '🌶️', hpMult: 1.3, atkMult: 1.3, rewardMult: 1.5, xpMult: 1.5 },
  infernal: { label: 'Infernal', icon: '🔥', hpMult: 1.65, atkMult: 1.65, rewardMult: 2.5, xpMult: 2.5 },
};

let currentDifficulty = 'normal';
let pendingDifficultyRegion = null;

function openDiffModal(regionId) {
  pendingDifficultyRegion = regionId;
  const region = REGIONS.find(r => r.id === regionId);
  if (region) {
    document.getElementById('diffModalRegionName').textContent = region.icon + ' ' + region.name.toUpperCase();
  }
  // Reset selection to normal
  selectDifficulty('normal');
  document.getElementById('diffModalOverlay').classList.add('show');
}

function closeDiffModal() {
  document.getElementById('diffModalOverlay').classList.remove('show');
  pendingDifficultyRegion = null;
}

function selectDifficulty(diff) {
  currentDifficulty = diff;
  ['normal','epicee','infernal'].forEach(d => {
    const card = document.getElementById('diffCard-' + d);
    if (card) {
      card.classList.remove('diff-selected');
      if (d === diff) card.classList.add('diff-selected');
    }
  });
  const btn = document.getElementById('diffConfirmBtn');
  const d = DIFFICULTIES[diff];
  if (btn) btn.textContent = d.icon + ' Lancer en ' + d.label;
}

function confirmDifficulty() {
  if (!pendingDifficultyRegion) return;
  const regionId = pendingDifficultyRegion;
  closeDiffModal();
  enterRegionWithDifficulty(regionId);
}

function applyDifficultyToEnemy(enemy) {
  const d = DIFFICULTIES[currentDifficulty];
  if (d.hpMult === 1.0 && d.atkMult === 1.0) return enemy; // Normal: no change
  return Object.assign({}, enemy, {
    hp:  Math.round(enemy.hp  * d.hpMult),
    atk: Math.round(enemy.atk * d.atkMult),
    // Keep same special fn but wrap it to scale dmg
    special: {
      name: enemy.special.name,
      fn: (v) => {
        const base = enemy.special.fn(v);
        return Object.assign({}, base, { dmg: Math.round(base.dmg * d.atkMult) });
      }
    }
  });
}

function getDiffBadgeHtml() {
  const d = DIFFICULTIES[currentDifficulty];
  return `<span class="diff-badge-battle ${currentDifficulty}">${d.icon} ${d.label}</span>`;
}

function enterRegionWithDifficulty(regionId) {
  selectedRegion = regionId;
  if (!selectedHero) {
    showToast('Sélectionne d\'abord un héros ci-dessus !', 'error');
    document.getElementById('heroSelectSection').scrollIntoView({behavior:'smooth'});
    return;
  }
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return;
  const prog = getRegionProgress();
  const completed = prog[regionId] && prog[regionId].completed;

  if (completed) {
    const p = loadRegionProgress();
    p[regionId] = { beaten: [], completed: false };
    saveRegionProgress(p);
  }

  setEnemiesFromRegion(regionId);
  // Apply difficulty multipliers to enemy copies
  ENEMIES = ENEMIES.map(e => applyDifficultyToEnemy(e));

  buildSelectStageDots();
  buildBattlePips();

  const beatenNow = getRegionEnemiesBeaten(regionId);
  const nextIdx = region.enemies.findIndex(eid => !beatenNow.includes(eid));
  state.currentEnemyIndex = Math.max(0, nextIdx);
  state.heroHpPersist = 0;
  updateStageIndicators();

  startBattleWithDialogue(true);
}

function enterRegion() {
  if (!selectedRegion) return;
  if (!selectedHero) {
    showToast('Sélectionne d\'abord un héros ci-dessus !', 'error');
    document.getElementById('heroSelectSection').scrollIntoView({behavior:'smooth'});
    return;
  }
  const region = REGIONS.find(r => r.id === selectedRegion);
  if (!region) return;
  const beaten = getRegionEnemiesBeaten(selectedRegion);
  const prog = getRegionProgress();
  const completed = prog[selectedRegion] && prog[selectedRegion].completed;

  // Reset if completed (replay)
  if (completed) {
    const p = loadRegionProgress();
    p[selectedRegion] = { beaten: [], completed: false };
    saveRegionProgress(p);
  }

  setEnemiesFromRegion(selectedRegion);
  buildSelectStageDots();
  buildBattlePips();

  // Find where to resume
  const beatenNow = getRegionEnemiesBeaten(selectedRegion);
  const nextIdx = region.enemies.findIndex(eid => !beatenNow.includes(eid));
  state.currentEnemyIndex = Math.max(0, nextIdx);
  state.heroHpPersist = 0;
  updateStageIndicators();

  // Launch battle directly with dialogue
  startBattleWithDialogue(true);
}

// region tracking intégré directement dans endBattle ci-dessous

// ============================================
// DIALOGUES (updated with new enemies)
// ============================================

// ============================================
// SYSTÈME DE DIALOGUE CINÉMATIQUE
// ============================================

const DIALOGUES = {
  // === RÉGION 1 : Forêt des Épices ===
  piment_sauvage: {
    hero: {
      fraise: [
        {speaker:'fraise', text:'Cette forêt sent bon. Mais toi, tu pues la trahison.'},
        {speaker:'piment_sauvage', text:'Brave petite fraise… Tu vas brûler comme les autres.'},
        {speaker:'fraise', text:'J\'ai survécu à pire. En avant.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu bloques le passage. Je préférerais qu\'on règle ça calmement.'},
        {speaker:'piment_sauvage', text:'Calme ? Dans cette forêt ? Rien n\'est calme ici.'},
        {speaker:'poire', text:'Comme tu veux.'},
      ],
      patate: [
        {speaker:'piment_sauvage', text:'Une Patate ? Sérieusement ? T\'as pas peur de moi ?'},
        {speaker:'patate', text:'Non.'},
        {speaker:'piment_sauvage', text:'Tu aurais dû.'},
      ],
    }
  },
  cannelle_corrompue: {
    hero: {
      fraise: [
        {speaker:'cannelle_corrompue', text:'Quel parfum adorable tu as, petite fraise. Dommage que ça s\'arrête ici.'},
        {speaker:'fraise', text:'Épargne-moi le discours. Attaque ou dégage.'},
        {speaker:'cannelle_corrompue', text:'Quelle impatience… Je vais prendre mon temps, moi.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu étais du bon côté, autrefois. Qu\'est-ce qui t\'a corrompue ?'},
        {speaker:'cannelle_corrompue', text:'Le pouvoir, ma chère. Le Grand Poivrier m\'a offert quelque chose que la cantine ne m\'aurait jamais donné.'},
        {speaker:'poire', text:'C\'était une erreur. Je vais te le prouver.'},
      ],
      patate: [
        {speaker:'cannelle_corrompue', text:'Ah… La Patate Hongroise. J\'ai entendu parler de toi.'},
        {speaker:'patate', text:'Bonne chose. Ça m\'évite de me présenter.'},
      ],
    }
  },
  grand_poivrier: {
    hero: {
      fraise: [
        {speaker:'grand_poivrier', text:'Tu as vaincu mes lieutenants. Impressionnant… pour une fraise.'},
        {speaker:'fraise', text:'Et je vais faire pareil avec toi. Moins de discours, plus de combat.'},
        {speaker:'grand_poivrier', text:'Soit. La Forêt des Épices sera ton tombeau, petite.'},
        {speaker:'fraise', text:'On verra ça.'},
      ],
      poire: [
        {speaker:'grand_poivrier', text:'J\'ai régné sur ces forêts depuis l\'éternité. Toi, tu es née il y a quoi — quelques saisons ?'},
        {speaker:'poire', text:'La sagesse ne se mesure pas en années, Grand Poivrier. Elle se mesure en choix.'},
        {speaker:'grand_poivrier', text:'Philosophique. Mais les philosophes ne survivent pas longtemps dans mon domaine.'},
      ],
      patate: [
        {speaker:'grand_poivrier', text:'Une Patate. Mes lieutenants ont été vaincus… par une Patate.'},
        {speaker:'patate', text:'C\'est souvent comme ça que ça finit.'},
        {speaker:'grand_poivrier', text:'Pas aujourd\'hui.'},
        {speaker:'patate', text:'Si.'},
      ],
    }
  },

  // === RÉGION 2 : Désert du Sel ===
  sardine_errante: {
    hero: {
      fraise: [
        {speaker:'sardine_errante', text:'Je cherche juste une sortie de ce désert… mais si tu veux te battre, très bien.'},
        {speaker:'fraise', text:'Je suis désolée. Mais tu bloques mon chemin.'},
        {speaker:'sardine_errante', text:'Tout le monde bloque le chemin de quelqu\'un dans ce monde.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu n\'as pas l\'air de vouloir vraiment te battre.'},
        {speaker:'sardine_errante', text:'Non. Mais le Seigneur Anchois me surveille. Je n\'ai pas le choix.'},
        {speaker:'poire', text:'Tu as toujours le choix. Je te le prouverai après.'},
      ],
      patate: [
        {speaker:'sardine_errante', text:'Tu viens d\'où, toi ? La Forêt des Épices ?'},
        {speaker:'patate', text:'Oui.'},
        {speaker:'sardine_errante', text:'Alors tu sais ce que c\'est d\'être loin de chez soi.'},
        {speaker:'patate', text:'Oui. Et je sais aussi comment rentrer.'},
      ],
    }
  },
  cornichon_ennemi: {
    hero: {
      fraise: [
        {speaker:'fraise', text:'Toi encore. Je croyais qu\'on en avait fini.'},
        {speaker:'cornichon_ennemi', text:'Le Désert du Sel conserve tout, petite fraise. Moi y compris.'},
        {speaker:'fraise', text:'Alors je vais devoir t\'écraser une deuxième fois.'},
      ],
      poire: [
        {speaker:'cornichon_ennemi', text:'Tu croyais que j\'étais de ton côté. Erreur.'},
        {speaker:'poire', text:'Je n\'ai jamais pensé ça. J\'ai toujours senti le vinaigre sur toi.'},
        {speaker:'cornichon_ennemi', text:'...Malin. Ça ne changera rien.'},
      ],
      patate: [
        {speaker:'cornichon_ennemi', text:'La Patate Hongroise. Je t\'attendais.'},
        {speaker:'patate', text:'C\'est une erreur d\'attendre quelqu\'un qui arrive quand même.'},
      ],
    }
  },
  seigneur_anchois: {
    hero: {
      fraise: [
        {speaker:'seigneur_anchois', text:'Mariné depuis cent ans. Et toi ? Fraîche d\'hier. Quelle différence…'},
        {speaker:'fraise', text:'La fraîcheur, justement. C\'est ce qui me donne l\'avantage.'},
        {speaker:'seigneur_anchois', text:'Ha. Ha. Ha. Tu es charmante, petite. Ce sera vite terminé.'},
        {speaker:'fraise', text:'Pareil.'},
      ],
      poire: [
        {speaker:'seigneur_anchois', text:'La Poire. Douce, patiente… et inutile dans ce désert.'},
        {speaker:'poire', text:'L\'immortalité ne t\'a pas rendu plus intelligent, je vois.'},
        {speaker:'seigneur_anchois', text:'Insolente. Cent ans d\'ici, tu ne seras plus qu\'un souvenir.'},
        {speaker:'poire', text:'Dans cent ans, ce désert sera libre. Je commence maintenant.'},
      ],
      patate: [
        {speaker:'seigneur_anchois', text:'Une Patate… dans mon désert. C\'est presque touchant.'},
        {speaker:'patate', text:'Je ne suis pas venue pour être touchante.'},
        {speaker:'seigneur_anchois', text:'Non ? Alors pourquoi ?'},
        {speaker:'patate', text:'Pour te battre.'},
      ],
    }
  },

  // === RÉGION 3 : Marais du Vinaigre ===
  algue_fantome: {
    hero: {
      fraise: [
        {speaker:'algue_fantome', text:'Rejoins-moi dans la brume, petite fraise…'},
        {speaker:'fraise', text:'Très peu pour moi. Montre-toi d\'abord.'},
        {speaker:'algue_fantome', text:'Comme tu voudras.'},
      ],
      poire: [
        {speaker:'poire', text:'Je t\'entends. Tu es juste à gauche, dans la vapeur.'},
        {speaker:'algue_fantome', text:'Comment…? Personne ne me voit jamais.'},
        {speaker:'poire', text:'Je n\'ai pas besoin de te voir. Je t\'écoute.'},
      ],
      patate: [
        {speaker:'algue_fantome', text:'Tu ne peux pas frapper ce que tu ne vois pas.'},
        {speaker:'patate', text:'Je frappe fort. Peu importe où tu es, ça va faire mal.'},
      ],
    }
  },
  sushi_ninja: {
    hero: {
      fraise: [
        {speaker:'fraise', text:'Je ne t\'entends pas… mais je te sens, Ninja.'},
        {speaker:'sushi_ninja', text:'Impressionnant. La plupart ne remarquent même pas ma présence.'},
        {speaker:'fraise', text:'La plupart ne sont pas moi.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu te caches dans les ombres. Mais les ombres ont une forme.'},
        {speaker:'sushi_ninja', text:'Philosophique. Pour quelqu\'un qui va perdre.'},
        {speaker:'poire', text:'Nous verrons lequel de nous deux a raison.'},
      ],
      patate: [
        {speaker:'sushi_ninja', text:'Une Patate ? Vraiment ? Ils t\'ont envoyée, toi ?'},
        {speaker:'patate', text:'Ils ne m\'ont pas envoyée. Je suis venue de moi-même.'},
      ],
    }
  },
  maitre_dojo: {
    hero: {
      fraise: [
        {speaker:'maitre_dojo', text:'Mes élèves t\'ont dit que j\'étais dangereux. Tu es venue quand même.'},
        {speaker:'fraise', text:'On m\'a dit beaucoup de choses. Ça ne m\'arrête jamais.'},
        {speaker:'maitre_dojo', text:'Tu mourras courageusement, au moins.'},
        {speaker:'fraise', text:'Non. Je gagnerai courageusement.'},
      ],
      poire: [
        {speaker:'maitre_dojo', text:'La Mage de la Fraîcheur… dans mes marais acides. Tu dois souffrir.'},
        {speaker:'poire', text:'L\'adaptation, c\'est ce qui sépare les vrais combattants des imposteurs.'},
        {speaker:'maitre_dojo', text:'Bien dit. Prouve-le.'},
      ],
      patate: [
        {speaker:'maitre_dojo', text:'Je t\'observe depuis que tu as mis le pied dans mes marais.'},
        {speaker:'patate', text:'Je sais. Tu fais beaucoup de bruit pour quelqu\'un qui se dit discret.'},
        {speaker:'maitre_dojo', text:'...Intéressante remarque.'},
        {speaker:'patate', text:'Commençons.'},
      ],
    }
  },

  // === RÉGION 4 : Pics Glacés du Sorbet ===
  esquimau_maudit: {
    hero: {
      fraise: [
        {speaker:'esquimau_maudit', text:'La montagne est ma demeure. Tu es une intruse.'},
        {speaker:'fraise', text:'Je ne fais que passer. Mais si tu veux te battre, sois-en sûr.'},
        {speaker:'esquimau_maudit', text:'La Reine Glace sera informée de ton arrivée. Trop tard pour toi.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu sers la Reine Glace de ton plein gré ?'},
        {speaker:'esquimau_maudit', text:'Je la sers parce qu\'elle seule comprend ce que c\'est d\'être oublié.'},
        {speaker:'poire', text:'Elle t\'a menti. La solitude n\'est pas une identité. C\'est une prison.'},
        {speaker:'esquimau_maudit', text:'Assez parlé.'},
      ],
      patate: [
        {speaker:'esquimau_maudit', text:'Tu viens de loin pour mourir de froid ici.'},
        {speaker:'patate', text:'Je viens de plus loin que tu ne crois. Et je suis encore là.'},
      ],
    }
  },
  yeti_meringue: {
    hero: {
      fraise: [
        {speaker:'yeti_meringue', text:'ROOAR.'},
        {speaker:'fraise', text:'Vraiment ? C\'est tout ce que t\'as à dire ?'},
        {speaker:'yeti_meringue', text:'ROOAAR !!!'},
        {speaker:'fraise', text:'Bon. On fait ça à la dure alors.'},
      ],
      poire: [
        {speaker:'yeti_meringue', text:'ROOAR.'},
        {speaker:'poire', text:'Je vois. Tu es un Yéti de peu de mots. Soit.'},
      ],
      patate: [
        {speaker:'yeti_meringue', text:'ROOAR.'},
        {speaker:'patate', text:'Ouais.'},
      ],
    }
  },
  reine_glace: {
    hero: {
      fraise: [
        {speaker:'reine_glace', text:'Dix ans d\'exil. Dix ans dans ce froid. Et maintenant tu oses venir ici ?'},
        {speaker:'fraise', text:'Quelqu\'un devait le faire.'},
        {speaker:'reine_glace', text:'Cette cantine m\'a tout pris. Je vais reprendre ce qui m\'appartient.'},
        {speaker:'fraise', text:'La cantine n\'appartient à personne. C\'est pour ça qu\'on se bat.'},
      ],
      poire: [
        {speaker:'reine_glace', text:'La Mage de la Fraîcheur. Quelle ironie de se battre dans le froid.'},
        {speaker:'poire', text:'La fraîcheur et le froid sont deux choses différentes. Toi, tu es froide. Moi, je suis fraîche.'},
        {speaker:'reine_glace', text:'Distinction poétique. Elle ne te sauvera pas.'},
        {speaker:'poire', text:'On verra.'},
      ],
      patate: [
        {speaker:'reine_glace', text:'Une Patate Hongroise a traversé quatre régions pour arriver jusqu\'ici ?'},
        {speaker:'patate', text:'Oui.'},
        {speaker:'reine_glace', text:'Pourquoi ?'},
        {speaker:'patate', text:'Parce que quelqu\'un devait.'},
        {speaker:'reine_glace', text:'…Respectueux. Mais insuffisant.'},
      ],
    }
  },

  // === RÉGION 5 : Volcan de la Cantine ===
  garde_tomate: {
    hero: {
      fraise: [
        {speaker:'garde_tomate', text:'Nul ne passe. Ordres du Seigneur Banane.'},
        {speaker:'fraise', text:'Je passe quand même.'},
        {speaker:'garde_tomate', text:'Alors tu mourras ici.'},
        {speaker:'fraise', text:'C\'est toi qui mourras. Mais pas littéralement — tu vas juste perdre.'},
      ],
      poire: [
        {speaker:'poire', text:'Tu n\'es pas obligé de te battre pour lui.'},
        {speaker:'garde_tomate', text:'Le Seigneur Banane a prévu ta venue. Il savait que tu dirais ça.'},
        {speaker:'poire', text:'Et tu te bats quand même. Triste.'},
      ],
      patate: [
        {speaker:'garde_tomate', text:'Quatre régions traversées. Impressionnant. Mais ça s\'arrête ici.'},
        {speaker:'patate', text:'Non.'},
      ],
    }
  },
  banane_corrompue: {
    hero: {
      fraise: [
        {speaker:'banane_corrompue', text:'J\'étais comme toi. Un champion. Avant que Banane m\'offre… autre chose.'},
        {speaker:'fraise', text:'Il t\'a corrompue. Tu appelles ça "autre chose" ?'},
        {speaker:'banane_corrompue', text:'Ne le prends pas personnellement. C\'est juste du business.'},
        {speaker:'fraise', text:'Si. Je le prends personnellement.'},
      ],
      poire: [
        {speaker:'banane_corrompue', text:'Tu sais ce qui m\'attend si je te laisse passer ? Banane me détruira.'},
        {speaker:'poire', text:'Et si tu me laisses gagner, je t\'aiderai à t\'en sortir. C\'est ma promesse.'},
        {speaker:'banane_corrompue', text:'Les promesses ne survivent pas au Volcan.'},
        {speaker:'poire', text:'Celles-là, si.'},
      ],
      patate: [
        {speaker:'banane_corrompue', text:'La Colosse du Goulash. Tu es arrivée jusqu\'ici. C\'est… réel.'},
        {speaker:'patate', text:'Tu peux encore choisir ton camp.'},
        {speaker:'banane_corrompue', text:'Il est trop tard pour moi.'},
        {speaker:'patate', text:'Il n\'est jamais trop tard.'},
      ],
    }
  },
  banane: {
    hero: {
      fraise: [
        {speaker:'banane', text:'Cinq régions. Tu as vaincu tous mes champions. Petite Fraise… quelle touchante ambition.'},
        {speaker:'fraise', text:'Je ne suis pas venue faire de l\'ambition. Je suis venue finir ça.'},
        {speaker:'banane', text:'Ha. Ha. Ha. Alors finissons.'},
        {speaker:'fraise', text:'Avec plaisir.'},
      ],
      poire: [
        {speaker:'banane', text:'La Poire. Douce, posée, patiente… Tu as traversé tout ça avec ton calme légendaire ?'},
        {speaker:'poire', text:'La patience est pourquoi je suis encore debout. Et toi, tu te demandes déjà si tu vas tomber.'},
        {speaker:'banane', text:'Insolente.'},
        {speaker:'poire', text:'Réaliste.'},
      ],
      patate: [
        {speaker:'banane', text:'La Patate Hongroise. Je dois admettre… je ne m\'y attendais pas. Pas toi.'},
        {speaker:'patate', text:'Personne ne s\'y attend jamais.'},
        {speaker:'banane', text:'Tu sais ce qui arrive aux patates, n\'est-ce pas ? On les écrase.'},
        {speaker:'patate', text:'Tu confonds. On nous cuit. Et après… on est irrésistibles.'},
        {speaker:'banane', text:'…Bien dit. Mais ça ne changera rien.'},
      ],
    }
  }
};

function getDialogueLines(villainId, heroId) {
  const dlg = DIALOGUES[villainId];
  if (!dlg) return null;
  if (dlg.hero && dlg.hero[heroId]) return dlg.hero[heroId];
  return dlg.fallback || null;
}

function openDialogue(villainId, heroId, onComplete) {
  const lines = getDialogueLines(villainId, heroId);
  if (!lines || lines.length === 0) { onComplete(); return; }
  const hero = HEROES[heroId];
  const villain = ALL_ENEMIES[villainId] || ENEMIES.find(e => e.id === villainId);
  if (!hero || !villain) { onComplete(); return; }
  const resolvedLines = lines.map(l => ({...l, speaker: l.speaker === 'hero' ? heroId : l.speaker}));
  dlgState.lines = resolvedLines;
  dlgState.current = 0;
  dlgState.onComplete = onComplete;
  dlgState.canAdvance = false;
  document.getElementById('dlgHeroSprite').innerHTML = `<img src="https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/${hero.sprite}.png" alt="${hero.name}"/>`;
  document.getElementById('dlgVillainSprite').innerHTML = `<img src="https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/${villain.sprite}.png" alt="${villain.name}"/>`;
  document.getElementById('dlgHeroName').textContent = hero.name.toUpperCase();
  document.getElementById('dlgVillainName').textContent = villain.name.toUpperCase();
  const regionIdx = selectedRegion ? REGIONS.findIndex(r => r.id === selectedRegion) : -1;
  const region = regionIdx >= 0 ? REGIONS[regionIdx] : null;
  document.getElementById('dlgStageLabel').textContent = region ? `${region.icon} ${region.name}` : '⚔ COMBAT';
  renderDlgPips();
  document.getElementById('dialogueOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  showDlgLine(0);
}

let dlgState = { lines:[], current:0, typing:false, typeInterval:null, onComplete:null, canAdvance:false };

function renderDlgPips() {
  const container = document.getElementById('dlgPips');
  container.innerHTML = '';
  dlgState.lines.forEach((_,i) => {
    const pip = document.createElement('div');
    pip.className = 'dlg-pip' + (i===0?' active':'');
    pip.id = `dlg-pip-${i}`;
    container.appendChild(pip);
  });
}
function updateDlgPips(idx) {
  dlgState.lines.forEach((_,i) => {
    const pip = document.getElementById(`dlg-pip-${i}`);
    if(!pip) return;
    pip.className = 'dlg-pip' + (i<idx?' done':i===idx?' active':'');
  });
}
function showDlgLine(idx) {
  if(idx >= dlgState.lines.length) { closeDlgAndStart(); return; }
  const line = dlgState.lines[idx];
  dlgState.current = idx; dlgState.typing = true; dlgState.canAdvance = false;
  const box = document.getElementById('dlgBox');
  const speakerEl = document.getElementById('dlgSpeaker');
  const textEl = document.getElementById('dlgText');
  const hint = document.getElementById('dlgHint');
  hint.classList.remove('visible');
  const heroKeys = Object.keys(HEROES);
  const isHero = heroKeys.includes(line.speaker);
  const speakerChar = isHero ? HEROES[line.speaker] : (ALL_ENEMIES[line.speaker] || ENEMIES.find(e=>e.id===line.speaker));
  const speakerName = speakerChar ? speakerChar.name.toUpperCase() : line.speaker.toUpperCase();
  box.className = 'dlg-box' + (isHero ? '' : ' villain-speaking');
  speakerEl.textContent = speakerName;
  document.getElementById('dlgHeroChar').className = 'dlg-character hero' + (isHero ? '' : ' dim');
  document.getElementById('dlgVillainChar').className = 'dlg-character villain' + (!isHero ? '' : ' dim');
  updateDlgPips(idx);
  if(dlgState.typeInterval) clearInterval(dlgState.typeInterval);
  let charIdx = 0; const fullText = line.text; textEl.innerHTML = '';
  dlgState.typeInterval = setInterval(() => {
    if(charIdx < fullText.length) { textEl.innerHTML = fullText.substring(0, charIdx+1) + '<span class="dlg-cursor"></span>'; charIdx++; }
    else { clearInterval(dlgState.typeInterval); dlgState.typing=false; dlgState.canAdvance=true; textEl.innerHTML=fullText; hint.classList.add('visible'); }
  }, 28);
}
function advanceDlg() {
  if(dlgState.typing) {
    clearInterval(dlgState.typeInterval); dlgState.typing=false; dlgState.canAdvance=true;
    document.getElementById('dlgText').innerHTML = dlgState.lines[dlgState.current].text;
    document.getElementById('dlgHint').classList.add('visible'); return;
  }
  if(!dlgState.canAdvance) return;
  showDlgLine(dlgState.current + 1);
}
function skipDialogue() {
  if(dlgState.typeInterval) clearInterval(dlgState.typeInterval);
  closeDlgAndStart();
}
function closeDlgAndStart() {
  document.getElementById('dialogueOverlay').classList.remove('show');
  document.body.style.overflow = '';
  if(dlgState.onComplete) { const cb=dlgState.onComplete; dlgState.onComplete=null; setTimeout(cb,120); }
}



// ============================================
// PATATE HONGROISE — SPECIAL CINEMATIC
// ============================================

function triggerPatateSpecial(heroEffective, villain, dmgResult, onComplete) {
  const heroChar = state.heroChar;
  const cin = document.getElementById('patateCinematic');

  // Set sprites
  document.getElementById('patateCinHeroImg').src = 'https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/' + heroChar.sprite + '.png';
  document.getElementById('patateCinHeroSlamImg').src = 'https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/' + heroChar.sprite + '.png';
  document.getElementById('patateCinVillainChargeImg').src = 'https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/' + villain.sprite + '.png';
  document.getElementById('patateCinVillainRecoilImg').src = 'https://raw.githubusercontent.com/S4YD0U/lunchboxd/main/sprite/' + villain.sprite + '.png';

  // Hide all phases
  ['patatePhaseCharge','patatePhaseTitle','patatePhaseImpact'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });

  cin.classList.add('show');
  document.body.style.overflow = 'hidden';

  // --- PHASE 1: CHARGE (0 → 3000ms) ---
  setTimeout(() => {
    document.getElementById('patatePhaseCharge').classList.add('active');
    spawnPatateSteem();
    // Quote
    setTimeout(() => {
      const q = document.getElementById('patateChargeQuote');
      q.style.transition = 'opacity 0.6s'; q.style.opacity = '1';
    }, 500);
    // Ground crack
    setTimeout(() => {
      document.getElementById('patateCinGround').classList.add('cracking');
    }, 900);
    // First quake
    setTimeout(() => {
      const arena = document.getElementById('screen-battle');
      if (arena) { arena.classList.add('arena-quake'); setTimeout(() => arena.classList.remove('arena-quake'), 500); }
    }, 1200);
    // Second steam burst
    setTimeout(() => spawnPatateSteem(), 1600);
    // Second quake
    setTimeout(() => {
      cin.style.animation = 'none';
      cin.style.transform = 'translate(-3px,2px)';
      setTimeout(() => { cin.style.transform = 'translate(3px,-2px)'; }, 80);
      setTimeout(() => { cin.style.transform = 'translate(-2px,3px)'; }, 160);
      setTimeout(() => { cin.style.transform = 'translate(0,0)'; }, 240);
    }, 2200);
    // Third steam burst
    setTimeout(() => spawnPatateSteem(), 2500);
  }, 80);

  // --- PHASE 2: TITLE / FLAG (3000ms → 6500ms) ---
  setTimeout(() => {
    document.getElementById('patatePhaseCharge').classList.remove('active');
    // Flash tricolore
    const flash = document.getElementById('patateCinFlash');
    flash.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(206,41,57,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(71,112,80,0.6) 60%, transparent 80%)';
    flash.style.animation = 'none'; void flash.offsetWidth;
    flash.style.animation = 'patateFlash 1s ease forwards';
    // Spawn scan lines hongroises
    spawnHungaryScanLines();
    setTimeout(() => {
      document.getElementById('patatePhaseTitle').classList.add('active');
    }, 200);
    // Multiple quakes pendant le drapeau
    [800, 1600, 2800].forEach(delay => {
      setTimeout(() => {
        cin.style.transform = 'translate(-4px,3px) rotate(-0.3deg)';
        setTimeout(() => { cin.style.transform = 'translate(4px,-2px) rotate(0.2deg)'; }, 80);
        setTimeout(() => { cin.style.transform = 'translate(0,0) rotate(0deg)'; }, 160);
      }, delay);
    });
  }, 3000);

  // --- PHASE 3: IMPACT (6500ms → 9000ms) ---
  setTimeout(() => {
    document.getElementById('patatePhaseTitle').classList.remove('active');

    // Flash blanc intense
    const flash2 = document.getElementById('patateCinFlash');
    flash2.style.background = 'rgba(255,255,255,0.95)';
    flash2.style.animation = 'none'; void flash2.offsetWidth;
    flash2.style.animation = 'patateFlash 0.6s ease forwards';

    // Reset slam/recoil animations
    ['patateCinHeroSlam','patateCinVillainRecoil'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const clone = el.cloneNode(true);
      el.parentNode.replaceChild(clone, el);
    });

    const ring = document.getElementById('patateImpactRing');
    const ring2 = document.getElementById('patateImpactRing2');
    if (ring) { ring.style.animation = 'none'; void ring.offsetWidth; }
    if (ring2) { ring2.style.animation = 'none'; void ring2.offsetWidth; }

    document.getElementById('patatePhaseImpact').classList.add('active');

    // Compteur de dégâts qui monte dramatiquement
    const dmgEl = document.getElementById('patateDmgNum');
    dmgEl.textContent = '0';
    let current = 0;
    const target = dmgResult.dmg;
    const steps = 28;
    const stepTime = 55;
    const increment = target / steps;
    const counter = setInterval(() => {
      current = Math.min(current + increment + Math.random() * increment * 0.5, target);
      dmgEl.textContent = Math.floor(current);
      if (current >= target) { clearInterval(counter); dmgEl.textContent = target; }
    }, stepTime);

    spawnPotatoRain();

    // Impact flash
    setTimeout(() => {
      const iFlash = document.getElementById('patateCinImpactFlash');
      if (iFlash) { iFlash.style.animation = 'none'; void iFlash.offsetWidth; iFlash.style.animation = 'patateFlash 0.7s ease forwards'; }
      if (ring) { ring.style.animation = 'patateImpactRing 0.8s ease forwards'; }
      if (ring2) { ring2.style.animation = 'patateImpactRing 0.8s 0.18s ease forwards'; }
    }, 350);

    // Second pluie de patates
    setTimeout(() => spawnPotatoRain(), 900);

    // Quakes répétés sur l'impact
    [400, 750, 1100].forEach(d => {
      setTimeout(() => {
        cin.style.transform = 'translate(-5px,4px) rotate(-0.4deg)';
        setTimeout(() => { cin.style.transform = 'translate(5px,-3px) rotate(0.3deg)'; }, 70);
        setTimeout(() => { cin.style.transform = 'translate(0,0) rotate(0deg)'; }, 140);
      }, d);
    });

  }, 6500);

  // --- CLOSE & APPLY (9000ms) ---
  setTimeout(() => {
    cin.classList.remove('show');
    cin.style.transform = '';
    document.body.style.overflow = '';
    const q = document.getElementById('patateChargeQuote');
    if (q) q.style.opacity = '0';
    const ground = document.getElementById('patateCinGround');
    if (ground) ground.classList.remove('cracking');
    // Clear scan lines
    const sl = document.getElementById('hungaryScanLines');
    if (sl) sl.innerHTML = '';
    onComplete(dmgResult);
  }, 9000);
}

function spawnPotatoRain() {
  const container = document.getElementById('patateRainContainer');
  if (!container) return;
  const emojis = ['🥔','🥔','🥔','🥔','🥔','🥔','🥔','🍟','🍲','🥔','🥔','🥔'];
  const count = 55;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'patate-raindrop';
      const sz = (1.5 + Math.random() * 3.5).toFixed(1);
      const left = (Math.random() * 105 - 2).toFixed(1);
      const dur = (0.7 + Math.random() * 1.1).toFixed(2);
      const delay = (Math.random() * 0.3).toFixed(2);
      const spin = Math.random() < 0.5 ? 1 : -1;
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `left:${left}%;--sz:${sz}rem;--dur:${dur}s;--delay:${delay}s;--spin:${spin};`;
      container.appendChild(el);
      setTimeout(() => el.remove(), (parseFloat(dur) + parseFloat(delay) + 0.3) * 1000);
    }, i * 38);
  }
}

function spawnHungaryScanLines() {
  const container = document.getElementById('hungaryScanLines');
  if (!container) return;
  container.innerHTML = '';
  const colors = [
    'linear-gradient(90deg,transparent,rgba(206,41,57,0.9),rgba(255,100,100,0.6),transparent)',
    'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),rgba(200,200,200,0.5),transparent)',
    'linear-gradient(90deg,transparent,rgba(71,112,80,0.9),rgba(100,180,100,0.5),transparent)',
  ];
  for (let i = 0; i < 9; i++) {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'hungary-scan-line';
      const startY = 5 + Math.random() * 80;
      const dur = (1.0 + Math.random() * 0.8).toFixed(2);
      const delay = (Math.random() * 0.2).toFixed(2);
      line.style.cssText = `top:${startY}%;background:${colors[i % 3]};--dur:${dur}s;--delay:${delay}s;`;
      container.appendChild(line);
      setTimeout(() => line.remove(), (parseFloat(dur) + parseFloat(delay) + 0.2) * 1000 + 500);
    }, i * 220);
  }
}

function spawnPatateSteem() {
  const container = document.getElementById('patateSteamContainer');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['rgba(245,166,35,0.7)', 'rgba(232,69,69,0.5)', 'rgba(255,200,50,0.6)', 'rgba(200,245,66,0.4)'];
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'patate-steam-particle';
      const size = 20 + Math.random() * 40;
      p.style.cssText = `
        left: ${10 + Math.random() * 30}%;
        bottom: ${5 + Math.random() * 20}%;
        width: ${size}px; height: ${size}px;
        background: radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 0%, transparent 70%);
        animation-duration: ${0.9 + Math.random() * 0.8}s;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }, i * 80);
  }
}

// ============================================

function showNarrator(msg, duration=3000) {
  const box = document.getElementById('narratorBox');
  if (!box) return;
  box.textContent = '"' + msg + '"';
  box.classList.add('show');
  setTimeout(() => box.classList.remove('show'), duration);
}

function showPhaseBanner(title, sub, duration=1800) {
  const banner = document.getElementById('phaseBanner');
  if (!banner) return;
  document.getElementById('phaseBannerTitle').textContent = title;
  document.getElementById('phaseBannerSub').textContent = sub;
  banner.classList.add('show');
  setTimeout(() => banner.classList.remove('show'), duration);
}

function spawnArenaParticles() {
  const container = document.getElementById('arenaParticles');
  if (!container) return;
  container.innerHTML = '';
  const region = selectedRegion ? REGIONS.find(r => r.id === selectedRegion) : null;
  const colors = region ? [region.colorBg.replace('0.12','0.5'), 'rgba(255,255,255,0.3)'] : ['rgba(200,245,66,0.4)', 'rgba(232,69,69,0.3)'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'arena-particle';
    const size = 3 + Math.random() * 5;
    const x = 10 + Math.random() * 80;
    const tx = (Math.random() - 0.5) * 60;
    p.style.cssText = `left:${x}%;bottom:${5+Math.random()*25}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};--dur:${3+Math.random()*4}s;--delay:${Math.random()*4}s;--tx:${tx}px;--ty:${-60-Math.random()*80}px;`;
    container.appendChild(p);
  }
}

// INIT
updateProfileUI();
renderHeroGrid();
renderWorldMap();
showScreen('map');
