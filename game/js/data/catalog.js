// ============================================================
// data/catalog.js — Données statiques : shop, lootboxes, skills
// ============================================================

export const LOOTBOX_TIERS = [
  {
    id: 'lb_common', name: 'Boîte de Cantine', tier: 'common', chest: '📦', price: 50,
    desc: 'Une boîte récupérée à la cantine. Contenu mystérieux mais prometteur.',
    dropCount: 2,
    drops: [
      { label: 'Arme commune',  rarity: 'c', chance: 0.40 },
      { label: 'Consommable',   rarity: 'c', chance: 0.35 },
      { label: 'Armure commune',rarity: 'c', chance: 0.20 },
      { label: 'Arme rare',     rarity: 'r', chance: 0.04 },
      { label: 'Bonus XP',      rarity: 'c', chance: 0.01 },
    ],
    guarantees: ['Au moins 2 objets', 'Chance de rare'],
    lootTable: [
      { type:'weapon', id:'w1', rarity:'common', weight:20 },
      { type:'weapon', id:'w5', rarity:'common', weight:20 },
      { type:'armor',  id:'a1', rarity:'common', weight:20 },
      { type:'armor',  id:'a5', rarity:'common', weight:15 },
      { type:'consumable', id:'c1', rarity:'common', weight:25 },
      { type:'consumable', id:'c5', rarity:'common', weight:20 },
      { type:'consumable', id:'c6', rarity:'common', weight:15 },
      { type:'weapon', id:'w2', rarity:'rare',   weight:8  },
      { type:'armor',  id:'a2', rarity:'rare',   weight:8  },
      { type:'consumable', id:'c2', rarity:'rare', weight:6 },
      { type:'gold',   amount:20,  rarity:'common', weight:12 },
      { type:'gold',   amount:35,  rarity:'rare',   weight:5  },
    ],
  },
  {
    id: 'lb_rare', name: 'Boîte Mystique', tier: 'rare', chest: '🎁', price: 120,
    desc: "Enveloppée d'une aura étrange. Les professeurs de SVT sont formellement déconseillés.",
    dropCount: 3,
    drops: [
      { label: 'Arme rare',            rarity: 'r', chance: 0.40 },
      { label: 'Armure rare',          rarity: 'r', chance: 0.35 },
      { label: 'Consommable épique',   rarity: 'e', chance: 0.15 },
      { label: 'Arme épique',          rarity: 'e', chance: 0.08 },
      { label: 'Item légendaire',      rarity: 'l', chance: 0.02 },
    ],
    guarantees: ['Au moins 3 objets', 'Un rare garanti', 'Chance épique'],
    lootTable: [
      { type:'weapon', id:'w2', rarity:'rare',   weight:18 },
      { type:'weapon', id:'w6', rarity:'rare',   weight:18 },
      { type:'armor',  id:'a2', rarity:'rare',   weight:18 },
      { type:'armor',  id:'a6', rarity:'rare',   weight:15 },
      { type:'armor',  id:'a7', rarity:'rare',   weight:12 },
      { type:'consumable', id:'c2', rarity:'rare', weight:18 },
      { type:'consumable', id:'c7', rarity:'rare', weight:15 },
      { type:'consumable', id:'c8', rarity:'rare', weight:12 },
      { type:'weapon', id:'w3', rarity:'epic',   weight:8  },
      { type:'armor',  id:'a3', rarity:'epic',   weight:8  },
      { type:'consumable', id:'c3', rarity:'epic', weight:8 },
      { type:'gold',   amount:60,  rarity:'rare',      weight:15 },
      { type:'gold',   amount:100, rarity:'epic',      weight:5  },
      { type:'xp',     amount:80,  rarity:'rare',      weight:12 },
      { type:'sp',     amount:1,   rarity:'legendary', weight:2  },
    ],
  },
  {
    id: 'lb_epic', name: 'Boîte Légendaire', tier: 'epic', chest: '🏆', price: 280,
    desc: "Un artefact brillant de la cantine. On dit que la cuisinière elle-même l'a bénie.",
    dropCount: 4,
    drops: [
      { label: 'Arme épique',              rarity: 'e', chance: 0.35 },
      { label: 'Armure épique',            rarity: 'e', chance: 0.30 },
      { label: 'Consommable légendaire',   rarity: 'l', chance: 0.15 },
      { label: 'Gros bonus XP',            rarity: 'e', chance: 0.12 },
      { label: 'Point de skill',           rarity: 'l', chance: 0.08 },
    ],
    guarantees: ['4 objets garantis', 'Un épique garanti', 'Chance légendaire', 'Bonus XP/Gold'],
    lootTable: [
      { type:'weapon', id:'w7',  rarity:'epic',      weight:18 },
      { type:'weapon', id:'w8',  rarity:'epic',      weight:16 },
      { type:'weapon', id:'w9',  rarity:'epic',      weight:14 },
      { type:'armor',  id:'a8',  rarity:'epic',      weight:18 },
      { type:'armor',  id:'a9',  rarity:'epic',      weight:14 },
      { type:'consumable', id:'c9',  rarity:'epic',  weight:15 },
      { type:'consumable', id:'c10', rarity:'epic',  weight:12 },
      { type:'consumable', id:'c11', rarity:'epic',  weight:10 },
      { type:'consumable', id:'c4',  rarity:'legendary', weight:6 },
      { type:'gold',   amount:150, rarity:'epic',      weight:12 },
      { type:'gold',   amount:250, rarity:'legendary', weight:5  },
      { type:'xp',     amount:200, rarity:'epic',      weight:15 },
      { type:'xp',     amount:400, rarity:'legendary', weight:6  },
      { type:'sp',     amount:1,   rarity:'legendary', weight:6  },
      { type:'sp',     amount:2,   rarity:'legendary', weight:2  },
    ],
  },
  {
    id: 'lb_mythic', name: '✨ Boîte Mythique', tier: 'epic', chest: '🌟', price: 500,
    desc: "La boîte ultime. Un vestige de l'ère où la cantine servait des dieux.",
    dropCount: 5,
    drops: [
      { label: 'Arme légendaire',    rarity: 'l', chance: 0.45 },
      { label: 'Armure légendaire',  rarity: 'l', chance: 0.40 },
      { label: 'Consommable ultime', rarity: 'l', chance: 0.10 },
      { label: 'Méga XP',           rarity: 'l', chance: 0.04 },
      { label: '3 pts Skill',        rarity: 'l', chance: 0.01 },
    ],
    guarantees: ['5 objets garantis', 'Épique ou mieux garanti', 'Légendaire très probable', 'Méga récompenses'],
    lootTable: [
      { type:'weapon', id:'w4',  rarity:'epic',      weight:15 },
      { type:'weapon', id:'w10', rarity:'legendary', weight:12 },
      { type:'weapon', id:'w11', rarity:'legendary', weight:10 },
      { type:'weapon', id:'w12', rarity:'legendary', weight:6  },
      { type:'armor',  id:'a4',  rarity:'epic',      weight:15 },
      { type:'armor',  id:'a10', rarity:'legendary', weight:12 },
      { type:'armor',  id:'a11', rarity:'legendary', weight:8  },
      { type:'consumable', id:'c12', rarity:'legendary', weight:10 },
      { type:'consumable', id:'c4',  rarity:'legendary', weight:8  },
      { type:'gold',   amount:400,  rarity:'legendary', weight:10 },
      { type:'gold',   amount:600,  rarity:'legendary', weight:5  },
      { type:'xp',     amount:600,  rarity:'legendary', weight:12 },
      { type:'xp',     amount:1000, rarity:'legendary', weight:5  },
      { type:'sp',     amount:2,    rarity:'legendary', weight:8  },
      { type:'sp',     amount:3,    rarity:'legendary', weight:3  },
    ],
  },
];

// Gold pour les doublons selon la rareté
export const DUPLICATE_GOLD = { common: 10, rare: 30, epic: 80, legendary: 200 };

export const SHOP_CATALOG = {
  weapons: [
    { id:'w1',  name:'Fourchette Rouillée',    icon:'🍴', type:'weapon', price:30,  stat:'+8 ATK',          atkBonus:8,  defBonus:0,  desc:'Vieille mais efficace.',                   reqLv:1 },
    { id:'w2',  name:'Couteau à Beurre',        icon:'🔪', type:'weapon', price:70,  stat:'+18 ATK',         atkBonus:18, defBonus:0,  desc:"Plus tranchant qu'il n'y paraît.",          reqLv:2 },
    { id:'w5',  name:'Baguette de Pain',        icon:'🥖', type:'weapon', price:55,  stat:'+14 ATK +5 DEF',  atkBonus:14, defBonus:5,  desc:'Croustillante. Redoutable.',               reqLv:1 },
    { id:'w6',  name:'Pince à Crustacé',        icon:'🦞', type:'weapon', price:95,  stat:'+24 ATK',         atkBonus:24, defBonus:0,  desc:'Saisit les ennemis et ne lâche plus.',      reqLv:2 },
    { id:'w7',  name:'Poêle en Fonte',          icon:'🍳', type:'weapon', price:120, stat:'+28 ATK +8 DEF',  atkBonus:28, defBonus:8,  desc:"La cuisine c'est aussi de la résistance.",  reqLv:3 },
    { id:'w3',  name:'Spatule Légendaire',      icon:'🥄', type:'weapon', price:150, stat:'+35 ATK',         atkBonus:35, defBonus:0,  desc:'Forgée dans les flammes du four.',          reqLv:3 },
    { id:'w8',  name:'Tentacule de Calmar',     icon:'🦑', type:'weapon', price:200, stat:'+42 ATK',         atkBonus:42, defBonus:0,  desc:'Flexible. Imprévisible. Visqueux.',         reqLv:4 },
    { id:'w9',  name:'Sceptre de Mozzarella',   icon:'🧇', type:'weapon', price:220, stat:'+38 ATK +10 DEF', atkBonus:38, defBonus:10, desc:'Fondu à l\'intérieur, dur à l\'extérieur.', reqLv:4 },
    { id:'w4',  name:'Rouleau de Sushi Épique', icon:'🍣', type:'weapon', price:280, stat:'+55 ATK +5 DEF',  atkBonus:55, defBonus:5,  desc:'Une arme digne des grands maîtres.',       reqLv:5 },
    { id:'w10', name:'Lance-Sauce Légendaire',  icon:'🫙', type:'weapon', price:350, stat:'+68 ATK',         atkBonus:68, defBonus:0,  desc:'Propulse de la sauce à haute vélocité.',   reqLv:6 },
    { id:'w11', name:'Épée de Glace Pilée',     icon:'🧊', type:'weapon', price:400, stat:'+75 ATK +12 DEF', atkBonus:75, defBonus:12, desc:'Tranchante, froide, absolue.',              reqLv:7 },
    { id:'w12', name:'Trident du Chef Étoilé',  icon:'⭐', type:'weapon', price:500, stat:'+90 ATK',         atkBonus:90, defBonus:0,  desc:'Forgé dans les étoiles Michelin.',          reqLv:8 },
  ],
  armors: [
    { id:'a1',  name:'Tablier Troué',         icon:'🥼', type:'armor', price:25,  stat:'+10 DEF',          atkBonus:0,  defBonus:10,  desc:'Une protection basique.',                   reqLv:1 },
    { id:'a5',  name:'Gants de Four',         icon:'🧤', type:'armor', price:35,  stat:'+14 DEF',          atkBonus:0,  defBonus:14,  desc:'Résistants jusqu\'à 250°C.',                 reqLv:1 },
    { id:'a2',  name:'Casque de Casserole',   icon:'🪖', type:'armor', price:60,  stat:'+22 DEF',          atkBonus:0,  defBonus:22,  desc:'Certifié anti-éclaboussures.',               reqLv:2 },
    { id:'a6',  name:'Gilet en Nori',         icon:'🌿', type:'armor', price:80,  stat:'+18 DEF +5 ATK',   atkBonus:5,  defBonus:18,  desc:'Léger et surprenant.',                      reqLv:2 },
    { id:'a7',  name:'Cape de Poulpe',        icon:'🐙', type:'armor', price:100, stat:'+28 DEF',          atkBonus:0,  defBonus:28,  desc:"S'adapte à tout grâce à ses tentacules.",   reqLv:2 },
    { id:'a3',  name:'Armure de Parmesan',    icon:'🧀', type:'armor', price:130, stat:'+40 DEF',          atkBonus:0,  defBonus:40,  desc:'Dur comme de la pierre. Et ça sent.',       reqLv:3 },
    { id:'a8',  name:'Bouclier de Tarte',     icon:'🥧', type:'armor', price:160, stat:'+35 DEF +8 ATK',   atkBonus:8,  defBonus:35,  desc:'Absorbant. Sucré. Mortel.',                 reqLv:3 },
    { id:'a4',  name:'Bouclier de Baguette',  icon:'🥖', type:'armor', price:250, stat:'+62 DEF +5 ATK',   atkBonus:5,  defBonus:62,  desc:'Béni par le boulanger du village.',         reqLv:4 },
    { id:'a9',  name:'Cuirasse de Croûte',    icon:'🍞', type:'armor', price:280, stat:'+70 DEF',          atkBonus:0,  defBonus:70,  desc:'Aussi dur que le pain rassis du lundi.',    reqLv:5 },
    { id:'a10', name:'Armure de Caramel Dur', icon:'🍮', type:'armor', price:350, stat:'+85 DEF +10 ATK',  atkBonus:10, defBonus:85,  desc:'Caramélisée à la torche. Indestructible.',  reqLv:6 },
    { id:'a11', name:'Égide de Chocolat Noir',icon:'🍫', type:'armor', price:450, stat:'+100 DEF',         atkBonus:0,  defBonus:100, desc:'Tempéré à la perfection. Amer. Invincible.',reqLv:7 },
  ],
  consumables: [
    { id:'c1',  name:'Petite Potion Verte',       icon:'🧃', type:'consumable', price:15,  stat:'Soin +80 HP',             healAmt:80,   atkMult:0,    desc:'Un petit jus de légumes réconfortant.',        reqLv:1, stackable:true  },
    { id:'c5',  name:'Banane Boostée',            icon:'🍌', type:'consumable', price:20,  stat:'Soin +50 HP +10% ATK',    healAmt:50,   atkMult:0.1,  duration:1, desc:'Un régime, une philosophie.',          reqLv:1, stackable:true  },
    { id:'c6',  name:'Thé Vert Concentré',        icon:'🍵', type:'consumable', price:25,  stat:'+15% VIT (2 tours)',      healAmt:0,    atkMult:0,    spdMult:0.15, duration:2, desc:"L'esprit s'aiguise, le corps suit.", reqLv:1, stackable:true },
    { id:'c2',  name:'Potion de Force',           icon:'🥤', type:'consumable', price:40,  stat:'+30% ATK (2 tours)',      healAmt:0,    atkMult:0.3,  duration:2, desc:'De la caféine pure. Dangereux.',       reqLv:2, stackable:true  },
    { id:'c7',  name:'Smoothie Épinard-Fer',      icon:'🥬', type:'consumable', price:45,  stat:'Soin +120 HP',            healAmt:120,  atkMult:0,    desc:'Vert. Épais. Puissant.',                       reqLv:2, stackable:true  },
    { id:'c8',  name:'Chili Piment Fantôme',      icon:'🌶️',type:'consumable', price:60,  stat:'+50% ATK (1 tour)',       healAmt:0,    atkMult:0.5,  duration:1, desc:'Ça brûle. Tout. Même les ennemis.',    reqLv:2, stackable:true  },
    { id:'c3',  name:'Elixir du Champion',        icon:'🍶', type:'consumable', price:90,  stat:'Soin +200 HP +20% ATK',   healAmt:200,  atkMult:0.2,  duration:2, desc:'Une recette secrète de la cantine.',   reqLv:3, stackable:true  },
    { id:'c9',  name:'Potion de Pierre',          icon:'🪨', type:'consumable', price:80,  stat:'+40% DEF (2 tours)',      healAmt:0,    atkMult:0,    defMult:0.4, duration:2, desc:'Bois ça et deviens inébranlable.', reqLv:3, stackable:true  },
    { id:'c10', name:'Sauce Secrète Niveau 9',    icon:'🫙', type:'consumable', price:110, stat:'Soin +150 HP +35% ATK',   healAmt:150,  atkMult:0.35, duration:2, desc:'La recette est dans le coffre-fort.',  reqLv:4, stackable:true  },
    { id:'c11', name:'Ambroisie de Cantine',      icon:'🍯', type:'consumable', price:140, stat:'Soin +300 HP',            healAmt:300,  atkMult:0,    desc:'On dit que la cuisinière pleure dedans.',      reqLv:4, stackable:true  },
    { id:'c4',  name:'Soupe Magique',             icon:'🍲', type:'consumable', price:200, stat:'HP MAX restauré',         healAmt:9999, atkMult:0,    desc:'La mère de toutes les soupes.',                reqLv:5, stackable:false },
    { id:'c12', name:"Sérum d'Invincibilité",     icon:'💉', type:'consumable', price:300, stat:'+60% ATK +50% DEF (3t)', healAmt:0,    atkMult:0.6,  defMult:0.5, duration:3, desc:'Développé dans les labos secrets.', reqLv:6, stackable:false },
    // Antidotes (ajoutés dynamiquement mais déclarés ici pour clarté)
    { id:'cure_burn',   name:'Eau Glacée',         icon:'💧', type:'consumable', price:18, stat:'Soigne Brûlure',             healAmt:0, atkMult:0, cureStatus:'burn',   desc:'Éteint instantanément la Brûlure.',         reqLv:1, stackable:true },
    { id:'cure_poison', name:'Lait Antidote',      icon:'🥛', type:'consumable', price:22, stat:'Soigne Poison',              healAmt:0, atkMult:0, cureStatus:'poison', desc:'Neutralise le Poison, même empilé.',        reqLv:1, stackable:true },
    { id:'cure_slow',   name:'Café Double',        icon:'☕', type:'consumable', price:20, stat:'Soigne Ralentissement',      healAmt:0, atkMult:0, cureStatus:'slow',   desc:'Remet ta vitesse à la normale.',            reqLv:1, stackable:true },
    { id:'cure_all',    name:'Remède Universel',   icon:'🍵', type:'consumable', price:55, stat:'Soigne tous statuts',        healAmt:30,atkMult:0, cureStatus:'all',    desc:'Élimine tout statut + soigne 30 HP.',       reqLv:2, stackable:true },
  ],
  specials: [
    { id:'s1', name:'Médaille de Goûteur', icon:'🏅', type:'special', price:500, stat:'+5% à tout',     atkBonus:5, defBonus:5, desc:'Pour les vrais connaisseurs.', reqLv:5 },
    { id:'s2', name:'Toque du Grand Chef', icon:'👨‍🍳',type:'special', price:800, stat:'+15% XP gagné', atkBonus:0, defBonus:0, desc:"Le savoir s'accumule plus vite.", reqLv:7 },
  ],
};

export const SKILL_BRANCHES = [
  {
    id: 'force', name: 'Voie de la Force', icon: '⚔️', desc: 'Augmente ta puissance offensive',
    skills: [
      {
        id:'sk_atk1', name:'Muscles de Spaghetti', type:'passive', emoji:'💪', maxLevel:3, costPerLevel:1, reqSkill:null,
        desc:'Tes bras sont comme des pâtes al dente — décoratifs mais surprenants.',
        effectLabel:(lv)=>`+${lv*10} ATK permanente`,
        effect:(stats,lv)=>{ stats.atk+=lv*10; return stats; },
        battleDesc:null,
      },
      {
        id:'sk_atk2', name:'Fureur du Gruyère', type:'passive', emoji:'🧀', maxLevel:2, costPerLevel:1, reqSkill:'sk_atk1',
        desc:"Tu frappes avec la densité d'un fromage vieux de 3 ans.",
        effectLabel:(lv)=>`+${lv*8}% dégâts critiques`,
        effect:null, critDmgBonus:(lv)=>lv*0.08, battleDesc:null,
      },
      {
        id:'sk_atk3', name:'Tornade de Nouilles', type:'active', emoji:'🍜', maxLevel:1, costPerLevel:2, reqSkill:'sk_atk2',
        desc:'6 coups frénétiques qui percent les défenses. Charge la spéciale de +40%.',
        effectLabel:()=>'Actif — 6 frappes, DEF -40%, +40% spéciale',
        effect:null, battleDesc:'Tornade',
      },
    ],
  },
  {
    id: 'survie', name: 'Voie de la Survie', icon: '🛡️', desc: 'Renforce ta résistance et ta longévité',
    skills: [
      {
        id:'sk_def1', name:'Peau de Patate', type:'passive', emoji:'🥔', maxLevel:3, costPerLevel:1, reqSkill:null,
        desc:'Ta peau épaissit. Les attaques glissent sur toi comme de la purée.',
        effectLabel:(lv)=>`+${lv*12} DEF permanente`,
        effect:(stats,lv)=>{ stats.def+=lv*12; return stats; }, battleDesc:null,
      },
      {
        id:'sk_def2', name:'Régénération Kombucha', type:'passive', emoji:'🫙', maxLevel:2, costPerLevel:1, reqSkill:'sk_def1',
        desc:'Tu te régénères grâce à des bactéries bénéfiques inconnues.',
        effectLabel:(lv)=>`+${lv*6} HP régénérés/tour`,
        effect:null, regenPerTurn:(lv)=>lv*6, battleDesc:null,
      },
      {
        id:'sk_def3', name:'Mur de Baguette', type:'active', emoji:'🥖', maxLevel:1, costPerLevel:2, reqSkill:'sk_def2',
        desc:'Frappe + bouclier 85% pendant 3 tours. Chaque coup ennemi déclenche une riposte.',
        effectLabel:()=>'Actif — bouclier 3t + riposte automatique',
        effect:null, battleDesc:'Forteresse',
      },
    ],
  },
  {
    id: 'ruse', name: 'Voie de la Ruse', icon: '🎯', desc: 'Maîtrise la vitesse et les techniques secrètes',
    skills: [
      {
        id:'sk_spd1', name:'Réflexes Wasabi', type:'passive', emoji:'🌿', maxLevel:3, costPerLevel:1, reqSkill:null,
        desc:'Ça pique les yeux, donc tu esquives tout par réflexe.',
        effectLabel:(lv)=>`+${lv*8} VIT, -${lv*3}% chance de rater`,
        effect:(stats,lv)=>{ stats.spd+=lv*8; return stats; }, missReduction:(lv)=>lv*0.03, battleDesc:null,
      },
      {
        id:'sk_spd2', name:'Double Expresso', type:'passive', emoji:'☕', maxLevel:2, costPerLevel:1, reqSkill:'sk_spd1',
        desc:'Deux cafés serrés = charge de spéciale 2× plus rapide.',
        effectLabel:(lv)=>`+${lv*12}% charge spéciale/tour`,
        effect:null, specialBonus:(lv)=>lv*12, battleDesc:null,
      },
      {
        id:'sk_spd3', name:'Coup du Chef', type:'active', emoji:'👨‍🍳', maxLevel:1, costPerLevel:2, reqSkill:'sk_spd2',
        desc:'x2.5 ATK, ignore 80% DEF, vole 35% des dégâts en HP + recharge la spéciale.',
        effectLabel:()=>'Actif — x2.5 ATK, vol 35% HP, DEF ignorée',
        effect:null, battleDesc:'Coup du Chef',
      },
    ],
  },
];

export const XP_CURVE    = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
export const STAT_GROWTH = { hp: 12, atk: 4, def: 3, spd: 2 };

export const LEVEL_UNLOCKS = {
  2: { attack: 'combo_plus', msg: '🔥 Nouvelle attaque débloquée : Combo+ !' },
  3: { attack: 'piercing',   msg: '🗡️ Nouvelle attaque débloquée : Frappe Perforante !' },
  4: { attack: 'counter',    msg: '⚡ Nouvelle attaque débloquée : Contre-attaque !' },
  5: { attack: 'ultimate',   msg: '💥 Attaque ultime débloquée : DEVASTATION !' },
};

export const DIFFICULTIES = {
  normal:   { label: 'Normal',  icon: '🍃', hpMult: 1.00, atkMult: 1.00, rewardMult: 1.0, xpMult: 1.0 },
  epicee:   { label: 'Épicé',   icon: '🌶️',hpMult: 1.30, atkMult: 1.30, rewardMult: 1.5, xpMult: 1.5 },
  infernal: { label: 'Infernal',icon: '🔥', hpMult: 1.65, atkMult: 1.65, rewardMult: 2.5, xpMult: 2.5 },
};
