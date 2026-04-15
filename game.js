'use strict';

// ══════════════════════════════════
//  NAV DRAWER (burger menu)
// ══════════════════════════════════
const TAB_META={
  World:{icon:'🗺️',label:'Monde',navId:'navWorld'},
  Farm:{icon:'🌱',label:'Ferme',navId:'navFarm'},
  Cook:{icon:'🍳',label:'Cuisine',navId:'navCook'},
  Fight:{icon:'⚔️',label:'Combat',navId:'navFight'},
  Quests:{icon:'📜',label:'Quêtes',navId:'navQuests'},
  Shop:{icon:'🏪',label:'Marché',navId:'navShop'},
  Inv:{icon:'🎒',label:'Sac',navId:'navInv'},
};

function toggleNavDrawer(){
  const drawer=document.getElementById('navDrawer');
  const burger=document.getElementById('burgerBtn');
  const backdrop=document.getElementById('drawerBackdrop');
  const isOpen=drawer.classList.contains('open');
  if(isOpen){closeNavDrawer();}
  else{drawer.classList.add('open');burger.classList.add('open');backdrop.classList.add('show');}
}
function closeNavDrawer(){
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('burgerBtn').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.remove('show');
}


// ══════════════════════════════════
//  NARRATOR
// ══════════════════════════════════
const CHARS={
  fraise:{svgFile:'fraise.svg',fallbackEmoji:'🍓',tag:'fraise',name:'Fraise',villain:false},
  poire:{svgFile:'poire.svg',fallbackEmoji:'🍐',tag:'poire',name:'Poire',villain:false},
  banane:{svgFile:'banane.svg',fallbackEmoji:'🍌',tag:'banane',name:'Banane',villain:true},
  narrateur:{svgFile:null,fallbackEmoji:'📖',tag:'narrateur',name:'Narrateur',villain:false},
};
const SVG_STATUS={};
function preloadSVGs(){['fraise','poire','banane'].forEach(id=>{const c=CHARS[id];if(!c.svgFile)return;const img=new Image();img.onload=()=>{SVG_STATUS[id]='ok';};img.onerror=()=>{SVG_STATUS[id]='fail';};img.src=c.svgFile;});}
function getCharSpriteHTML(charId){const c=CHARS[charId];if(!c)return`<span class="emoji-fallback">❓</span>`;if(c.svgFile&&SVG_STATUS[charId]!=='fail')return`<img src="${c.svgFile}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'" style="width:72px;height:72px;object-fit:contain;display:block;"><span class="emoji-fallback" style="display:none;font-size:3.8rem;line-height:1;">${c.fallbackEmoji}</span>`;return`<span class="emoji-fallback" style="font-size:3.8rem;line-height:1;">${c.fallbackEmoji}</span>`;}

const STORY_SEQUENCES={
  intro:[
    {char:'fraise',text:'Enfin ! Un combattant courageux qui ose affronter ce monde devenu fou... Je suis Fraise, et j\'ai besoin de ton aide !'},
    {char:'poire',text:'Moi c\'est Poire. Écoute ce que Fraise a à dire, c\'est sérieux. Depuis que Banane a pris le contrôle du Donjon de la Friture, tous les fruits et légumes tremblent.'},
    {char:'fraise',text:'La Banane nous a réduits en esclavage ! Elle vole nos récoltes, corrompt les monstres... Tu dois cultiver, cuisiner, et devenir assez fort pour la vaincre !'},
    {char:'banane',text:'Hahaha ! Un nouveau petit guerrier ? Tes légumes m\'appartiennent. Tes cuisines m\'appartiennent. TOI tu m\'appartiens. Ou tu seras écrasé en purée !'},
    {char:'poire',text:'Ne t\'inquiète pas ! On est là pour toi. Commence par cultiver dans la ferme, puis cuisine des plats pour te renforcer. On se bat ensemble !'},
  ],
  firstHarvest:[{char:'fraise',text:'Tu as réussi ta première récolte ! Je savais que tu y arriverais.'},{char:'poire',text:'Bien joué ! Maintenant cuisine ces ingrédients. Un bon plat peut doubler ta force en combat !'}],
  firstCook:[{char:'fraise',text:'Mmh, ça sent BON ! Tu es vraiment doué en cuisine. Mange ça avant de combattre !'},{char:'poire',text:'La Banane ne cuisine jamais elle-même. C\'est pour ça qu\'elle perdra...'}],
  firstFight:[{char:'poire',text:'Ton premier combat approche ! Rappelle-toi : Défense réduit les dégâts de 62%.'},{char:'fraise',text:'Et si tu accumules de la Rage, le coup Ultime ⚡ est dévastateur !'}],
  firstVictory:[{char:'fraise',text:'VICTOIRE ! Tu as vaincu ton premier ennemi ! La Banane va grincer des dents.'},{char:'poire',text:'Excellent combat ! Continue à progresser vers le Donjon de la Friture.'}],
  firstDefeat:[{char:'poire',text:'Aïe... Tu t\'es battu courageusement. Mais ce n\'est pas une défaite — c\'est une leçon.'},{char:'fraise',text:'Mange et repose-toi ! Cuisine quelque chose de bon et reviens.'},{char:'banane',text:'Hahaha ! Le petit guerrier est tombé ! Reste chez toi !'}],
  dangerZone:[{char:'banane',text:'Tu t\'aventures dans mes terres ? Mes serviteurs vont s\'occuper de toi...'},{char:'fraise',text:'Fais attention ! Cette zone est dangereuse. Cuisine des plats puissants avant de te battre ici.'}],
  reachDungeon:[{char:'fraise',text:'Le Donjon de la Friture... On y est enfin.'},{char:'poire',text:'Prépare tes meilleurs plats, équipe-toi au maximum. C\'est le combat final.'},{char:'banane',text:'Vous osez pénétrer dans MON donjon ?! Vous êtes fous !'},{char:'fraise',text:'On n\'a plus peur de toi, Banane ! Allons-y !'}],
  bossWarning:[{char:'banane',text:'Mon champion, le Bento Bakemono, n\'a jamais connu la défaite !'},{char:'poire',text:'Utilise TOUT — ton meilleur équipement, tes meilleures recettes.'}],
  level5:[{char:'poire',text:'Niveau 5 ! Tu es maintenant bien plus fort. La Banane commence à s\'inquiéter.'},{char:'fraise',text:'Des zones encore plus dangereuses s\'ouvrent à toi !'}],
  level10:[{char:'banane',text:'Niveau 10 ?! Impossible !'},{char:'fraise',text:'La Banane a PEUR ! Continue comme ça.'},{char:'poire',text:'Tu es prêt pour le Marais de l\'Ail et le Pic du Piment !'}],
  lootboxLegendary:[{char:'fraise',text:'Une Banane Secrète ?! C\'est la plus rare des lootboxes... On dit que la Banane y cache ses plus grands secrets !'},{char:'banane',text:'Espèce de... Comment tu as mis la main sur ça ?! Ces ressources m\'APPARTIENNENT !'}],
};

let NAR={queue:[],currentSeq:null,currentIdx:0,isTyping:false,typeTimer:null,seenSeqs:new Set(),enabled:true};
function loadNarratorState(){try{const r=localStorage.getItem('lunchboxe_nar_v1');if(r)NAR.seenSeqs=new Set(JSON.parse(r));}catch(e){}}
function saveNarratorState(){try{localStorage.setItem('lunchboxe_nar_v1',JSON.stringify([...NAR.seenSeqs]));}catch(e){}}
function triggerStory(seqId,force=false){if(!NAR.enabled)return;if(!force&&NAR.seenSeqs.has(seqId))return;const seq=STORY_SEQUENCES[seqId];if(!seq)return;NAR.seenSeqs.add(seqId);saveNarratorState();if(document.getElementById('narratorOverlay').classList.contains('show')){NAR.queue.push(seqId);return;}startNarratorSeq(seq,seqId);}
function startNarratorSeq(seq){NAR.currentSeq=seq;NAR.currentIdx=0;showNarratorLine(0);}
function showNarratorLine(idx){const seq=NAR.currentSeq;if(!seq||idx>=seq.length){closeNarrator();return;}const line=seq[idx];const charId=line.char;const char=CHARS[charId]||CHARS.narrateur;const spriteEl=document.getElementById('narratorSprite');spriteEl.innerHTML=getCharSpriteHTML(charId);spriteEl.className='char-sprite'+(char.villain?' villain':'');const tag=document.getElementById('narratorNameTag');tag.textContent=char.name;tag.className='char-name-tag '+char.tag;const dots=document.getElementById('narratorDots');dots.innerHTML=seq.map((_,i)=>`<div class="ndot ${i<idx?'done':i===idx?'active':''}"></div>`).join('');const nextBtn=document.getElementById('narratorNextBtn');nextBtn.textContent=idx===seq.length-1?'Fermer ✕':'Suivant ▶';document.getElementById('narratorOverlay').classList.add('show');typeNarratorText(line.text);addLog(`💬 <b>${char.name}</b> : ${line.text}`,'story');}
function typeNarratorText(text){clearTimeout(NAR.typeTimer);NAR.isTyping=true;const el=document.getElementById('narratorText');el.innerHTML='';let i=0;function tick(){if(i<text.length){el.innerHTML=text.slice(0,i+1)+'<span class="narrator-cursor"></span>';i++;NAR.typeTimer=setTimeout(tick,22);}else{el.innerHTML=text;NAR.isTyping=false;}}tick();}
function narratorTap(){if(NAR.isTyping){clearTimeout(NAR.typeTimer);NAR.isTyping=false;const line=NAR.currentSeq[NAR.currentIdx];document.getElementById('narratorText').innerHTML=line?line.text:'';}}
function narratorNext(){clearTimeout(NAR.typeTimer);NAR.isTyping=false;NAR.currentIdx++;if(!NAR.currentSeq||NAR.currentIdx>=NAR.currentSeq.length){closeNarrator();}else{showNarratorLine(NAR.currentIdx);}}
function skipNarrator(){clearTimeout(NAR.typeTimer);NAR.isTyping=false;closeNarrator();}
function closeNarrator(){document.getElementById('narratorOverlay').classList.remove('show');NAR.currentSeq=null;NAR.currentIdx=0;if(NAR.queue.length>0){const nextId=NAR.queue.shift();const seq=STORY_SEQUENCES[nextId];if(seq)setTimeout(()=>startNarratorSeq(seq,nextId),400);}}

// ══════════════════════════════════
//  DATA
// ══════════════════════════════════
const WORLD_REGIONS=[
  {id:'village_potage',name:'Village du Potage',emoji:'🏘️',dot:'#00c030',x:20,y:22,minLevel:1,desc:'Le point de départ. Marchands, légumes, herbes fraîches.'},
  {id:'plaines_tomate',name:'Plaines de la Tomate',emoji:'🍅',dot:'#e04050',x:42,y:35,minLevel:1,desc:'Vastes champs rouges. Les tomates poussent à toute allure.'},
  {id:'foret_champignon',name:'Forêt des Champignons',emoji:'🍄',dot:'#e07020',x:65,y:25,minLevel:3,desc:'Forêt sombre et humide. Champignons magiques — et créatures.'},
  {id:'pic_piment',name:'Pic du Piment Rouge',emoji:'🌋',dot:'#c02030',x:75,y:55,minLevel:5,desc:'Volcans, piments brûlants. Zone dangereuse.'},
  {id:'marais_ail',name:'Marais de l\'Ail',emoji:'🧄',dot:'#00a030',x:30,y:60,minLevel:7,desc:'Vapeurs d\'ail repoussant les non-initiés. Ingrédients précieux.'},
  {id:'cite_epicier',name:'Cité de l\'Épicier',emoji:'🏛️',dot:'#e0c000',x:52,y:75,minLevel:1,desc:'La grande ville marchande. Le Grand Échange y est actif.'},
  {id:'donjon_friture',name:'Donjon de la Friture',emoji:'🏰',dot:'#d05000',x:82,y:82,minLevel:10,desc:'La dungeon finale. Le Bento Bakemono attend.'},
];

const MONSTERS=[
  {id:'radis_rebelle',name:'Radis Rebelle',emoji:'🥬',region:'plaines_tomate',level:1,hp:60,atk:[4,9],def:2,xp:15,gold:[8,18],loot:{lettuce:0.6,tomato:0.3},desc:'Un légume récalcitrant qui refuse d\'être cuisiné.',special:null},
  {id:'oignon_pleureur',name:'Oignon Pleureur',emoji:'🧅',region:'plaines_tomate',level:2,hp:85,atk:[6,13],def:3,xp:22,gold:[12,25],loot:{onion:0.7,carrot:0.4},desc:'Ses pleurs aveuglent les combattants imprudents.',special:{name:'Larmes Acres',eff:'blind',chance:0.25}},
  {id:'carotte_karate',name:'Carotte Karaté',emoji:'🥕',region:'plaines_tomate',level:3,hp:100,atk:[8,16],def:4,xp:30,gold:[15,30],loot:{carrot:0.8,berry:0.3},desc:'Maître des arts martiaux des légumes-racines.',special:{name:'Coup d\'Orange',eff:'stun',chance:0.2}},
  {id:'nugget_ninja',name:'Nugget Ninja',emoji:'🍗',region:'plaines_tomate',level:4,hp:120,atk:[10,18],def:5,xp:40,gold:[20,38],loot:{egg:0.5,rice:0.4},desc:'Aussi rapide qu\'une frite tombant dans l\'huile.',special:{name:'Double Frappe',eff:'doubleHit',chance:0.2}},
  {id:'fantome_fromage',name:'Fantôme du Fromage',emoji:'🧀',region:'foret_champignon',level:5,hp:180,atk:[13,22],def:8,xp:65,gold:[35,65],loot:{mushroom:0.6,garlic:0.3},desc:'Personne ne sait d\'où vient son odeur...',special:{name:'Phase Camembert',eff:'armorPierce',chance:0.22}},
  {id:'champignon_sage',name:'Champignon Sage',emoji:'🍄',region:'foret_champignon',level:6,hp:160,atk:[12,20],def:9,xp:58,gold:[30,55],loot:{mushroom:0.8,avocado:0.25},desc:'Ancien et sage, il frappe quand il le faut.',special:{name:'Spore Toxique',eff:'poison',chance:0.28}},
  {id:'baguette_berserk',name:'Baguette Berserk',emoji:'🥖',region:'foret_champignon',level:7,hp:220,atk:[16,26],def:10,xp:88,gold:[50,90],loot:{garlic:0.4,onion:0.5},desc:'Jean-Baptiste "Pain Dur" Croûton. Inarrêtable.',special:{name:'Fournée Ardente',eff:'burn',chance:0.22}},
  {id:'chili_diable',name:'Démon Piment',emoji:'🌶️',region:'pic_piment',level:8,hp:260,atk:[18,30],def:11,xp:105,gold:[65,110],loot:{chili:0.7,pepper:0.4},desc:'La chaleur incarnée en légume furieux.',special:{name:'Flammes Infernales',eff:'burnHeavy',chance:0.3}},
  {id:'curry_kaiser',name:'Curry Kaiser',emoji:'🍛',region:'pic_piment',level:9,hp:320,atk:[20,34],def:13,xp:130,gold:[80,135],loot:{chili:0.5,steak:0.3},desc:'Masque de curcuma. Chaque coup dégaze de la vapeur.',special:{name:'Madras Infernal',eff:'blindBurn',chance:0.28}},
  {id:'avocat_avocat',name:'Avocat l\'Avocat',emoji:'🥑',region:'marais_ail',level:10,hp:380,atk:[22,36],def:14,xp:155,gold:[100,165],loot:{avocado:0.7,lemon:0.4},desc:'Maître du Barreau Vert.',special:{name:'Recours en Grasse',eff:'selfHeal',chance:0.28}},
  {id:'ramen_ronin',name:'Ramen Rônin',emoji:'🍜',region:'marais_ail',level:11,hp:420,atk:[24,40],def:12,xp:180,gold:[115,185],loot:{rice:0.5,mushroom:0.4,egg:0.3},desc:'Exilé du clan Tonkotsu.',special:{name:'Umami Flambé',eff:'burnDebuff',chance:0.28}},
  {id:'taco_titan',name:'Taco Titan',emoji:'🌮',region:'donjon_friture',level:14,hp:600,atk:[28,45],def:20,xp:280,gold:[200,320],loot:{steak:0.5,pepper:0.5,chili:0.4},desc:'148kg de maïs et de colère.',special:{name:'Fold en Acier',eff:'pierceHeavy',chance:0.25},boss:true},
  {id:'donut_diable',name:'Donut Diable',emoji:'🍩',region:'donjon_friture',level:16,hp:750,atk:[32,52],def:18,xp:360,gold:[280,420],loot:{steak:0.6,avocado:0.4},desc:'Il lévite légèrement.',special:{name:'Spirale Satanique',eff:'poisonStun',chance:0.3},boss:true},
  {id:'bento_bakemono',name:'Bento Bakemono',emoji:'🍱',region:'donjon_friture',level:20,hp:1200,atk:[42,65],def:28,xp:600,gold:[500,800],loot:{steak:0.8,avocado:0.6,mushroom:0.7},desc:'Le Démon Suprême des Lunchs.',special:{name:'Explosion de Laque',eff:'statsNuke',chance:0.3},boss:true},
];

const SEEDS=[
  {id:'lettuce',emoji:'🥬',name:'Salade',cost:8,time:18,sell:14,heal:8,atk:0,farmXp:12,cookXp:5,unlockLevel:1},
  {id:'tomato',emoji:'🍅',name:'Tomate',cost:10,time:22,sell:18,heal:6,atk:2,farmXp:15,cookXp:7,unlockLevel:1},
  {id:'carrot',emoji:'🥕',name:'Carotte',cost:12,time:28,sell:22,heal:14,atk:0,farmXp:18,cookXp:8,unlockLevel:1},
  {id:'lemon',emoji:'🍋',name:'Citron',cost:18,time:38,sell:30,heal:5,atk:4,farmXp:22,cookXp:10,unlockLevel:2},
  {id:'berry',emoji:'🫐',name:'Myrtille',cost:16,time:28,sell:28,heal:12,atk:2,farmXp:20,cookXp:9,unlockLevel:2},
  {id:'onion',emoji:'🧅',name:'Oignon',cost:18,time:35,sell:34,heal:0,atk:6,farmXp:24,cookXp:10,unlockLevel:2},
  {id:'chili',emoji:'🌶️',name:'Piment',cost:22,time:50,sell:42,heal:0,atk:9,farmXp:30,cookXp:15,unlockLevel:3},
  {id:'rice',emoji:'🌾',name:'Riz',cost:14,time:40,sell:28,heal:10,atk:1,farmXp:20,cookXp:9,unlockLevel:2},
  {id:'egg',emoji:'🥚',name:'Œuf',cost:12,time:25,sell:20,heal:16,atk:1,farmXp:16,cookXp:8,unlockLevel:2},
  {id:'pepper',emoji:'🫑',name:'Poivron',cost:25,time:45,sell:48,heal:0,atk:10,farmXp:32,cookXp:15,unlockLevel:4},
  {id:'mushroom',emoji:'🍄',name:'Champignon',cost:28,time:65,sell:60,heal:22,atk:0,farmXp:40,cookXp:18,unlockLevel:3},
  {id:'garlic',emoji:'🧄',name:'Ail',cost:20,time:42,sell:36,heal:0,atk:12,farmXp:28,cookXp:13,unlockLevel:3},
  {id:'avocado',emoji:'🥑',name:'Avocat',cost:30,time:60,sell:60,heal:20,atk:5,farmXp:38,cookXp:17,unlockLevel:5},
  {id:'steak',emoji:'🥩',name:'Bœuf',cost:55,time:100,sell:110,heal:40,atk:12,farmXp:65,cookXp:30,unlockLevel:6},
];

const RECIPES=[
  {id:'salade_boxeur',emoji:'🥗',name:'Salade du Boxeur',level:1,desc:'Soigne 55 HP et +8 ATK pour 4 rounds.',ings:{lettuce:1,tomato:1,lemon:1},eff:{heal:55,atkBuff:8,buffRounds:4},cookXp:40},
  {id:'soupe_energie',emoji:'🍲',name:'Soupe Énergie',level:2,desc:'Soigne 35 HP, restaure 20 Faim.',ings:{tomato:2,onion:1,carrot:1},eff:{heal:35,hunger:20},cookXp:55},
  {id:'omelette_furie',emoji:'🍳',name:'Omelette Furie',level:3,desc:'+30 DEF pour 5 rounds.',ings:{egg:2,mushroom:1},eff:{defBuff:30,buffRounds:5},cookXp:65},
  {id:'piment_rage',emoji:'🔥',name:'Purée Enflammée',level:3,desc:'Rage max + prochain coup CRIT garanti.',ings:{chili:2,tomato:1},eff:{rageMax:true,nextCrit:true},cookXp:70},
  {id:'rizotto',emoji:'🍚',name:'Rizotto Champion',level:4,desc:'Soigne 80 HP + +8 ATK permanents.',ings:{rice:2,mushroom:1,garlic:1},eff:{heal:80,atkPerm:8},cookXp:90},
  {id:'poivronade',emoji:'🌶️',name:'Poivronade Infernale',level:5,desc:'+20 ATK 7 rounds + CRIT prochain.',ings:{pepper:2,chili:1,onion:1},eff:{atkBuff:20,buffRounds:7,nextCrit:true},cookXp:110},
  {id:'smoothie_vert',emoji:'🥤',name:'Smoothie Vert',level:5,desc:'Soigne 90 HP immédiatement.',ings:{avocado:1,berry:2,lemon:1},eff:{heal:90},cookXp:100},
  {id:'bruschetta',emoji:'🥖',name:'Bruschetta Explosive',level:4,desc:'+30 HP Max permanents.',ings:{tomato:2,garlic:1},eff:{maxHpBonus:30},cookXp:80},
  {id:'burger_maison',emoji:'🍔',name:'Burger Maison',level:7,desc:'Soigne 120 HP + +18 ATK pour 6 rounds.',ings:{steak:1,lettuce:1,tomato:1},eff:{heal:120,atkBuff:18,buffRounds:6},cookXp:150},
  {id:'festin_boxeur',emoji:'🍱',name:'Festin du Boxeur',level:10,desc:'Soigne HP max + tous stats +10%.',ings:{steak:2,avocado:1,mushroom:1,rice:1},eff:{healFull:true,statsBoost:0.10,buffRounds:8},cookXp:250},
];

const SKILLS_DEF=[
  {id:'farming',icon:'🌱',name:'Farming',xpPerLevel:[0,50,120,220,360,550,800,1120,1520,2020]},
  {id:'cooking',icon:'🍳',name:'Cooking',xpPerLevel:[0,60,140,260,420,640,920,1280,1720,2280]},
  {id:'attack',icon:'⚔️',name:'Attack',xpPerLevel:[0,80,180,320,500,740,1040,1420,1900,2500]},
  {id:'defence',icon:'🛡️',name:'Defence',xpPerLevel:[0,80,180,320,500,740,1040,1420,1900,2500]},
  {id:'strength',icon:'💪',name:'Strength',xpPerLevel:[0,80,180,320,500,740,1040,1420,1900,2500]},
  {id:'hitpoints',icon:'❤️',name:'Hitpoints',xpPerLevel:[0,100,230,400,620,900,1260,1720,2300,3000]},
  {id:'prayer',icon:'✨',name:'Prayer',xpPerLevel:[0,60,140,260,420,640,920,1280,1720,2280]},
];

const SHOP_ITEMS=[
  {id:'gloves',emoji:'🥊',name:'Gants Pro',desc:'+12 ATK permanents',cost:120,type:'equip',stat:'atk',val:12},
  {id:'helmet',emoji:'⛑️',name:'Casque Cuir',desc:'+16 DEF permanents',cost:100,type:'equip',stat:'def',val:16},
  {id:'boots',emoji:'👟',name:'Bottes Rapides',desc:'+14 SPD permanents',cost:110,type:'equip',stat:'spd',val:14},
  {id:'apron',emoji:'👘',name:'Tablier Renforcé',desc:'+10 DEF permanents',cost:90,type:'equip',stat:'def',val:10},
  {id:'bandage',emoji:'🩹',name:'Bandage',desc:'Soigne 70 HP',cost:25,type:'item',heal:70},
  {id:'potion',emoji:'🧪',name:'Élixir Rouge',desc:'Soigne 180 HP',cost:80,type:'item',heal:180},
  {id:'rage_drink',emoji:'⚡',name:'Boisson Rage',desc:'Rage max instantanée',cost:55,type:'item',rageMax:true},
  {id:'antidote',emoji:'💊',name:'Antidote',desc:'Soigne poison et brûlure',cost:35,type:'item',cure:true},
  {id:'plot5',emoji:'🟫',name:'4 Parcelles',desc:'Débloquer 4 parcelles',cost:150,type:'plot',val:4},
];

const LOOTBOXES=[
  {id:'bento_box',emoji:'📦',name:'Bento Box',rarity:'common',cost:100,desc:'Une boîte mystérieuse remplie de légumes et d\'ingrédients de base.',contents:'Graines · Ingrédients · Or',rewards:[{type:'gold',id:null,qty:[20,50],weight:30,rarity:'common',emoji:'💰',name:'Or'},{type:'seed',id:'lettuce',qty:[2,4],weight:20,rarity:'common',emoji:'🥬',name:'Salade'},{type:'seed',id:'tomato',qty:[2,3],weight:20,rarity:'common',emoji:'🍅',name:'Tomate'},{type:'seed',id:'carrot',qty:[1,3],weight:15,rarity:'common',emoji:'🥕',name:'Carotte'},{type:'seed',id:'onion',qty:[1,2],weight:10,rarity:'common',emoji:'🧅',name:'Oignon'},{type:'seed',id:'rice',qty:[1,2],weight:10,rarity:'common',emoji:'🌾',name:'Riz'},{type:'seed',id:'mushroom',qty:[1,2],weight:5,rarity:'rare',emoji:'🍄',name:'Champignon'},{type:'item',id:'bandage',qty:[1,2],weight:8,rarity:'common',emoji:'🩹',name:'Bandage'},{type:'item',id:'antidote',qty:[1,1],weight:5,rarity:'common',emoji:'💊',name:'Antidote'},{type:'seed',id:'chili',qty:[1,2],weight:4,rarity:'rare',emoji:'🌶️',name:'Piment'}],drawCount:3},
  {id:'lunchbox_rare',emoji:'🍱',name:'Lunchbox Légendaire',rarity:'rare',cost:300,desc:'Une boîte de haute qualité avec du matériel rare.',contents:'Équipement · Ingrédients rares · Bonus stats',rewards:[{type:'gold',id:null,qty:[80,180],weight:15,rarity:'common',emoji:'💰',name:'Or'},{type:'item',id:'potion',qty:[1,2],weight:15,rarity:'rare',emoji:'🧪',name:'Élixir Rouge'},{type:'item',id:'rage_drink',qty:[1,1],weight:10,rarity:'rare',emoji:'⚡',name:'Boisson Rage'},{type:'seed',id:'avocado',qty:[1,3],weight:15,rarity:'rare',emoji:'🥑',name:'Avocat'},{type:'seed',id:'steak',qty:[1,2],weight:10,rarity:'rare',emoji:'🥩',name:'Bœuf'},{type:'seed',id:'pepper',qty:[2,4],weight:12,rarity:'rare',emoji:'🫑',name:'Poivron'},{type:'seed',id:'garlic',qty:[2,3],weight:10,rarity:'common',emoji:'🧄',name:'Ail'},{type:'equip',id:'apron',qty:[1,1],weight:5,rarity:'rare',emoji:'👘',name:'Tablier Renforcé'},{type:'equip',id:'helmet',qty:[1,1],weight:5,rarity:'rare',emoji:'⛑️',name:'Casque Cuir'},{type:'equip',id:'boots',qty:[1,1],weight:4,rarity:'rare',emoji:'👟',name:'Bottes Rapides'},{type:'equip',id:'gloves',qty:[1,1],weight:4,rarity:'legendary',emoji:'🥊',name:'Gants Pro'},{type:'hpbonus',id:null,qty:[15,30],weight:3,rarity:'legendary',emoji:'💖',name:'Bonus HP Max'},{type:'atkbonus',id:null,qty:[5,10],weight:3,rarity:'legendary',emoji:'🗡️',name:'Bonus ATK'}],drawCount:4},
  {id:'banane_secrete',emoji:'🍌',name:'Banane Secrète',rarity:'legendary',cost:150,desc:'La boîte maudite de la Banane. Risquée — mais les récompenses peuvent être EXTRAORDINAIRES.',contents:'Jackpot possible · Malédiction possible · Butin unique',rewards:[{type:'gold',id:null,qty:[0,500],weight:20,rarity:'common',emoji:'💰',name:'Or volé'},{type:'curse',id:null,qty:[1,1],weight:15,rarity:'debuff',emoji:'💀',name:'Malédiction (-10 HP Max)'},{type:'seed',id:'chili',qty:[3,6],weight:10,rarity:'rare',emoji:'🌶️',name:'Piments Enragés'},{type:'seed',id:'avocado',qty:[2,4],weight:10,rarity:'rare',emoji:'🥑',name:'Avocats Volés'},{type:'seed',id:'steak',qty:[1,3],weight:8,rarity:'rare',emoji:'🥩',name:'Bœuf Dérobé'},{type:'item',id:'potion',qty:[2,3],weight:8,rarity:'rare',emoji:'🧪',name:'Élixirs'},{type:'item',id:'rage_drink',qty:[2,2],weight:6,rarity:'rare',emoji:'⚡',name:'Rage Banane'},{type:'equip',id:'gloves',qty:[1,1],weight:5,rarity:'legendary',emoji:'🥊',name:'Gants Pro'},{type:'hpbonus',id:null,qty:[20,50],weight:4,rarity:'legendary',emoji:'💖',name:'Jackpot HP'},{type:'atkbonus',id:null,qty:[8,15],weight:3,rarity:'legendary',emoji:'🗡️',name:'Jackpot ATK'},{type:'gold',id:null,qty:[300,800],weight:2,rarity:'legendary',emoji:'💰',name:'Trésor de la Banane'}],drawCount:3},
];

function drawLootboxRewards(lb){const rewards=[];for(let d=0;d<lb.drawCount;d++){const totalWeight=lb.rewards.reduce((a,r)=>a+r.weight,0);let roll=Math.random()*totalWeight;let chosen=null;for(const r of lb.rewards){roll-=r.weight;if(roll<=0){chosen=r;break;}}if(!chosen)chosen=lb.rewards[0];const qty=Array.isArray(chosen.qty)?chosen.qty[0]+Math.floor(Math.random()*(chosen.qty[1]-chosen.qty[0]+1)):chosen.qty;rewards.push({...chosen,qty});}return rewards;}
function applyLootboxRewards(rewards){const p=G.player;rewards.forEach(r=>{if(r.type==='gold'){G.gold+=r.qty;addLog(`💰 +${r.qty} Or de lootbox !`,'loot');}else if(r.type==='seed'){G.inventory[r.id]=(G.inventory[r.id]||0)+r.qty;addLog(`${r.emoji} +${r.qty} ${r.name} !`,'loot');}else if(r.type==='item'){G.inventory[r.id]=(G.inventory[r.id]||0)+r.qty;addLog(`${r.emoji} +${r.qty} ${r.name} !`,'loot');}else if(r.type==='equip'){if(!G.equipped[r.id]){const item=SHOP_ITEMS.find(i=>i.id===r.id);if(item){G.equipped[r.id]=true;G.player[item.stat]=(G.player[item.stat]||0)+item.val;addLog(`⚔️ Équipé : ${r.name} !`,'skill');}}else{G.gold+=50;addLog(`⚔️ ${r.name} déjà possédé → +50 Or !`,'loot');}}else if(r.type==='hpbonus'){p.maxHp+=r.qty;p.hp+=r.qty;addLog(`💖 +${r.qty} HP Max !`,'heal');}else if(r.type==='atkbonus'){p.atk+=r.qty;addLog(`🗡️ +${r.qty} ATK permanent !`,'skill');}else if(r.type==='curse'){p.maxHp=Math.max(20,p.maxHp-10);p.hp=Math.min(p.hp,p.maxHp);addLog(`💀 Malédiction ! -10 HP Max !`,'damage');}});updateHUD();}

let pendingLootboxRewards=null;

// ══════════════════════════════════
//  LOOTBOX — OVERLAY DYNAMIQUE (CORRIGÉ)
// ══════════════════════════════════
function ensureLootboxOverlay(){
  let overlay=document.getElementById('lbOpeningOverlay');
  if(overlay)return overlay;
  overlay=document.createElement('div');
  overlay.id='lbOpeningOverlay';
  overlay.style.cssText=[
    'position:fixed','inset:0','z-index:9500',
    'background:rgba(0,0,0,0.94)',
    'display:flex','flex-direction:column',
    'align-items:center','justify-content:center',
    'gap:0.9rem','padding:2rem 1.2rem',
    'opacity:0','pointer-events:none',
    'transition:opacity 0.3s ease',
  ].join(';');
  overlay.innerHTML=`
    <div id="lbBoxAnim" style="font-size:5rem;line-height:1;"></div>
    <div id="lbOpeningTitle" style="font-family:'Raleway',sans-serif;font-weight:900;font-size:1.5rem;color:#fff;text-align:center;letter-spacing:-0.01em;"></div>
    <div id="lbOpeningSub" style="font-size:0.75rem;color:#888;font-style:italic;text-align:center;"></div>
    <div id="lbRewardsGrid" style="display:flex;flex-direction:column;gap:0.45rem;width:100%;max-width:380px;max-height:52vh;overflow-y:auto;"></div>
    <button
      id="lbCollectBtn"
      onclick="collectLootbox()"
      style="margin-top:0.4rem;background:#00c030;border:none;color:#060e08;font-family:'Raleway',sans-serif;font-weight:700;font-size:0.9rem;padding:0.8rem 2.8rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.12em;display:none;">
      ✓ Récupérer les récompenses
    </button>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function openLootbox(lbId){
  const lb=LOOTBOXES.find(l=>l.id===lbId);
  if(!lb)return;
  if(G.gold<lb.cost){showToast('Pas assez d\'or !','bad');return;}
  G.gold-=lb.cost;
  updateHUD();

  const rewards=drawLootboxRewards(lb);
  pendingLootboxRewards=rewards;

  const overlay=ensureLootboxOverlay();
  const boxAnim=document.getElementById('lbBoxAnim');
  const title=document.getElementById('lbOpeningTitle');
  const sub=document.getElementById('lbOpeningSub');
  const grid=document.getElementById('lbRewardsGrid');
  const collectBtn=document.getElementById('lbCollectBtn');

  // Reset state
  boxAnim.textContent=lb.emoji;
  boxAnim.style.animation='crestFloat 0.8s ease-in-out infinite';
  title.textContent='Ouverture en cours...';
  sub.textContent=lb.name;
  grid.innerHTML='';
  collectBtn.style.display='none';

  // Show overlay
  overlay.style.opacity='1';
  overlay.style.pointerEvents='all';

  // Reveal rewards after animation delay
  setTimeout(()=>{
    boxAnim.style.animation='none';
    title.textContent='Tu as obtenu !';
    grid.innerHTML=rewards.map((r,i)=>{
      const rarityColors={
        common:'rgba(180,180,180,0.15)',
        rare:'rgba(0,120,220,0.18)',
        legendary:'rgba(220,160,0,0.18)',
        debuff:'rgba(200,30,30,0.18)',
      };
      const rarityBorder={
        common:'rgba(180,180,180,0.3)',
        rare:'rgba(80,160,255,0.5)',
        legendary:'rgba(255,200,0,0.6)',
        debuff:'rgba(255,60,60,0.5)',
      };
      const rarityLabel={common:'COMMUN',rare:'RARE',legendary:'LÉGENDAIRE',debuff:'MALÉDICTION'};
      const rarityTextColor={common:'#aaa',rare:'#60a8ff',legendary:'#ffd040',debuff:'#ff5555'};
      const bg=rarityColors[r.rarity]||rarityColors.common;
      const border=rarityBorder[r.rarity]||rarityBorder.common;
      const label=rarityLabel[r.rarity]||'COMMUN';
      const color=rarityTextColor[r.rarity]||'#aaa';
      return`<div style="
        display:flex;align-items:center;gap:0.7rem;
        background:${bg};border:1px solid ${border};
        padding:0.5rem 0.75rem;
        opacity:0;animation:lbItemReveal 0.4s ease forwards;
        animation-delay:${i*0.13}s;
      ">
        <span style="font-size:1.9rem;line-height:1;">${r.emoji}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-family:'Raleway',sans-serif;font-weight:700;font-size:0.82rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.name}</div>
          <div style="font-size:0.62rem;color:#999;margin-top:1px;">${r.type==='gold'?'💰 +'+r.qty+' Or':'×'+r.qty}</div>
        </div>
        <span style="font-size:0.48rem;font-family:'Raleway',sans-serif;font-weight:700;letter-spacing:0.08em;color:${color};border:1px solid ${color};padding:2px 6px;white-space:nowrap;">${label}</span>
      </div>`;
    }).join('');

    // Show collect button after all cards are revealed
    setTimeout(()=>{collectBtn.style.display='block';},rewards.length*130+300);
  },1400);

  // Inject keyframe if not already present
  if(!document.getElementById('lbKeyframes')){
    const style=document.createElement('style');
    style.id='lbKeyframes';
    style.textContent=`
      @keyframes lbItemReveal {
        from { opacity:0; transform:translateY(10px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  if(lbId==='banane_secrete')setTimeout(()=>triggerStory('lootboxLegendary'),3000);
}

function collectLootbox(){
  if(pendingLootboxRewards){
    applyLootboxRewards(pendingLootboxRewards);
    pendingLootboxRewards=null;
  }
  const overlay=document.getElementById('lbOpeningOverlay');
  if(overlay){
    overlay.style.opacity='0';
    overlay.style.pointerEvents='none';
  }
  showToast('Récompenses récupérées !','loot');
  if(document.getElementById('panelShop').classList.contains('active'))renderShop();
  saveGame();
}

const QUESTS=[
  {id:'first_harvest',name:'Les Premiers Pas',icon:'🌱',status:'active',desc:'Récolte ta première culture.',unlockAfter:null,tasks:[{id:'harvest1',label:'Récolter 1 légume',goal:1,progress:0,type:'harvest'}],reward:{gold:30,xp:50,cookXp:20},rewardDesc:'30 Or + 50 XP'},
  {id:'first_fight',name:'Baptême du Feu',icon:'⚔️',status:'locked',desc:'Vaincs ton premier monstre.',unlockAfter:'first_harvest',tasks:[{id:'fight1',label:'Vaincre 1 monstre',goal:1,progress:0,type:'kill'}],reward:{gold:50,xp:80,atkBonus:3},rewardDesc:'50 Or + 80 XP + +3 ATK'},
  {id:'chef_apprenti',name:'L\'Apprenti Chef',icon:'🍳',status:'locked',desc:'Cuisine 3 plats différents.',unlockAfter:'first_fight',tasks:[{id:'cook3',label:'Cuisiner 3 plats',goal:3,progress:0,type:'cook'}],reward:{gold:80,xp:120,maxHpBonus:20},rewardDesc:'80 Or + +20 HP Max'},
  {id:'conquerant',name:'Conquérant des Plaines',icon:'🏆',status:'locked',desc:'Élimine 5 monstres.',unlockAfter:'chef_apprenti',tasks:[{id:'kill5',label:'Vaincre 5 monstres',goal:5,progress:0,type:'kill'}],reward:{gold:150,xp:200,defBonus:5},rewardDesc:'150 Or + +5 DEF'},
  {id:'maitre_fermier',name:'Maître Fermier',icon:'🌾',status:'locked',desc:'Récolte 20 cultures.',unlockAfter:'conquerant',tasks:[{id:'harvest20',label:'Récolter 20 légumes',goal:20,progress:0,type:'harvest'}],reward:{gold:200,xp:300,farmingBonus:5},rewardDesc:'200 Or + +5 Farming'},
];

const COMBAT_MOVES=[
  {id:'slash',label:'Tranche',emoji:'⚔️',cat:'strike',mult:1.0,rage:0,gain:12,acc:0.90},
  {id:'crush',label:'Écrase',emoji:'🔨',cat:'strike',mult:1.6,rage:0,gain:16,acc:0.83},
  {id:'stab',label:'Perce',emoji:'🗡️',cat:'strike',mult:2.0,rage:0,gain:20,acc:0.76},
  {id:'smash',label:'Dévaste',emoji:'💥',cat:'strike',mult:2.8,rage:0,gain:25,acc:0.68},
  {id:'fireball',label:'Brasier',emoji:'🔥',cat:'magic',mult:1.8,rage:20,gain:0,acc:0.92},
  {id:'icespike',label:'Glacial',emoji:'❄️',cat:'magic',mult:1.5,rage:15,gain:0,acc:0.95},
  {id:'special',label:'Ultime',emoji:'⚡',cat:'special',mult:4.0,rage:40,gain:0,acc:0.95},
  {id:'defend',label:'Défense',emoji:'🛡️',cat:'defend',mult:0,rage:0,gain:10,acc:1},
];

const LEVEL_XP=[0,80,190,340,540,800,1150,1600,2200,2900,3800,5000,6500,8300,10500,13000,16000,19500,23500,28000];

// ══════════════════════════════════
//  GAME STATE
// ══════════════════════════════════
let G={
  playerName:'Champion',gold:80,day:1,tick:0,level:1,xp:0,
  player:{hp:100,maxHp:100,atk:20,def:6,spd:8,rage:0,maxRage:100,hunger:80,maxHunger:100,streak:0},
  skills:{farming:0,cooking:0,attack:0,defence:0,strength:0,hitpoints:0,prayer:0},
  skillLevels:{farming:1,cooking:1,attack:1,defence:1,strength:1,hitpoints:1,prayer:1},
  plots:Array.from({length:8},(_,i)=>({id:i,locked:false,crop:null,plantedAt:0,status:null})),
  inventory:{},cooked:{},equipped:{},
  wins:0,monstersKilled:0,totalHarvests:0,totalCooks:0,
  currentRegion:null,
  fightState:'select',
  currentMonster:null,enemyHp:0,enemyPatternIdx:0,enemySpecialUsed:{},
  buffs:{atk:0,def:0,rounds:0,nextCrit:false},
  debuffs:{atk:0,def:0,rounds:0,blind:0,burn:0,poison:0,stun:0},
  enemyDebuffs:{def:0,rounds:0,burn:0,poison:0},
  defending:false,
  combatLog:[],
  selectedSeed:null,
  quests:JSON.parse(JSON.stringify(QUESTS)),
  selectedShopTab:'equip',
  uniqueCooksToday:new Set(),
};

// ══════════════════════════════════
//  SAVE / LOAD
// ══════════════════════════════════
function saveGame(){try{const save={playerName:G.playerName,gold:G.gold,day:G.day,tick:G.tick,level:G.level,xp:G.xp,player:G.player,skills:G.skills,skillLevels:G.skillLevels,plots:G.plots,inventory:G.inventory,cooked:G.cooked,equipped:G.equipped,wins:G.wins,monstersKilled:G.monstersKilled,totalHarvests:G.totalHarvests,totalCooks:G.totalCooks,quests:G.quests,uniqueCooksToday:[...G.uniqueCooksToday]};localStorage.setItem('lunchboxe_woc_v2',JSON.stringify(save));}catch(e){}}
function loadGame(name){try{const raw=localStorage.getItem('lunchboxe_woc_v2')||localStorage.getItem('lunchboxe_woc_v1');if(!raw)return false;const save=JSON.parse(raw);Object.assign(G,save);if(name)G.playerName=name;G.fightState='select';G.currentMonster=null;G.enemyHp=0;G.buffs={atk:0,def:0,rounds:0,nextCrit:false};G.debuffs={atk:0,def:0,rounds:0,blind:0,burn:0,poison:0,stun:0};G.enemyDebuffs={def:0,rounds:0,burn:0,poison:0};G.defending=false;G.combatLog=[];G.uniqueCooksToday=new Set(G.uniqueCooksToday||[]);return true;}catch(e){return false;}}

// ══════════════════════════════════
//  INIT
// ══════════════════════════════════
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function handleStartGame(){const name=document.getElementById('playerNameInput').value.trim()||'Champion';G.playerName=name;showScreen('screenGame');document.getElementById('playerNameDisplay').textContent=name;loadNarratorState();initGame();setTimeout(()=>triggerStory('intro'),800);}
function handleLoadGame(){const name=document.getElementById('playerNameInput').value.trim();const loaded=loadGame(name||null);if(!loaded){showToast('Aucune sauvegarde trouvée !','bad');return;}showScreen('screenGame');document.getElementById('playerNameDisplay').textContent=G.playerName;loadNarratorState();initGame();addLog(`Partie chargée — Bienvenue, <b>${G.playerName}</b> !`,'sys');}
function initGame(){preloadSVGs();renderDrawerSkills();renderSidebarSkills();renderMinimap();updateHUD();renderWorld();setInterval(gameTick,1000);setInterval(saveGame,20000);setInterval(hungerTick,5000);checkQuestNotif();}

// ══════════════════════════════════
//  TICKS
// ══════════════════════════════════
function gameTick(){G.tick++;let anyReady=false;G.plots.forEach(p=>{if(p.crop&&!p.locked&&p.status!=='ready'){const elapsed=G.tick-p.plantedAt;const seed=SEEDS.find(s=>s.id===p.crop);if(seed&&elapsed>=seed.time){p.status='ready';anyReady=true;}}});if(anyReady){checkFarmNotif();if(document.getElementById('panelFarm').classList.contains('active'))renderFarm();}if(G.tick%5===0&&document.getElementById('panelFarm').classList.contains('active'))updateFarmProgress();}
function hungerTick(){G.player.hunger=Math.max(0,G.player.hunger-1);if(G.player.hunger<20){G.player.hp=Math.max(1,G.player.hp-2);}updateHUD();}

// ══════════════════════════════════
//  HUD
// ══════════════════════════════════
function updateHUD(){const p=G.player;document.getElementById('topbarGold').textContent=`💰 ${G.gold}`;document.getElementById('vitalHp').style.width=Math.max(0,(p.hp/p.maxHp)*100)+'%';document.getElementById('vitalHpVal').textContent=`${p.hp}/${p.maxHp}`;document.getElementById('vitalHunger').style.width=Math.max(0,(p.hunger/p.maxHunger)*100)+'%';document.getElementById('vitalHungerVal').textContent=`${p.hunger}/${p.maxHunger}`;const lvl=G.level;const xpNext=LEVEL_XP[lvl]||LEVEL_XP[LEVEL_XP.length-1];const xpBase=lvl>1?LEVEL_XP[lvl-1]:0;const prog=Math.min(100,((G.xp-xpBase)/(xpNext-xpBase))*100);document.getElementById('vitalXp').style.width=prog+'%';document.getElementById('vitalXpVal').textContent=`Niv.${lvl}`;}

function renderDrawerSkills(){
  const el=document.getElementById('drawerSkills');
  if(!el)return;
  el.innerHTML=SKILLS_DEF.map(s=>{
    const lvl=G.skillLevels[s.id]||1;
    return`<div style="background:var(--panel2);padding:0.4rem 0.25rem;display:flex;flex-direction:column;align-items:center;gap:2px;border:none;">
      <span style="font-size:0.9rem">${s.icon}</span>
      <span style="font-family:'DM Mono',monospace;font-size:0.75rem;color:var(--green)">${lvl}</span>
      <span style="font-family:'Raleway',sans-serif;font-size:0.38rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.04em">${s.name}</span>
    </div>`;
  }).join('');
}

function renderSidebarSkills(){document.getElementById('sidebarSkills').innerHTML=SKILLS_DEF.map(s=>{const lvl=G.skillLevels[s.id]||1;const xpHave=G.skills[s.id]||0;const xpBase=s.xpPerLevel[lvl-1]||0;const xpNext=s.xpPerLevel[lvl]||s.xpPerLevel[s.xpPerLevel.length-1];const prog=Math.min(100,((xpHave-xpBase)/(xpNext-xpBase))*100)||0;return`<div class="skill-entry"><div class="skill-entry-top"><span class="skill-icon">${s.icon}</span><span class="skill-level">${lvl}</span></div><span class="skill-name">${s.name}</span><div class="skill-xp-track"><div class="skill-xp-fill" style="width:${prog}%"></div></div></div>`;}).join('');}

function renderMinimap(){document.getElementById('minimap').innerHTML=WORLD_REGIONS.map(r=>{const isCurrent=G.currentRegion===r.id;const locked=r.minLevel>G.level;return`<div class="minimap-dot ${isCurrent?'current':''}" style="left:${r.x}%;top:${r.y}%;width:${isCurrent?10:7}px;height:${isCurrent?10:7}px;background:${locked?'#2a3d55':r.dot};opacity:${locked?0.3:1}" onclick="switchTab('World');selectRegion('${r.id}')" title="${r.name}"></div>`;}).join('');const cur=WORLD_REGIONS.find(r=>r.id===G.currentRegion);document.getElementById('minimapLabel').textContent=cur?cur.name:'Carte du Monde';}

// ══════════════════════════════════
//  TABS
// ══════════════════════════════════
function switchTab(tab){
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  const navId='nav'+tab;
  const navEl=document.getElementById(navId);
  if(navEl)navEl.classList.add('active');
  document.getElementById('panel'+tab).classList.add('active');
  const meta=TAB_META[tab];
  if(meta){document.getElementById('topbarCurrentTab').textContent=`${meta.icon} ${meta.label}`;}
  const renders={World:renderWorld,Farm:renderFarm,Cook:renderCook,Fight:renderFightPanel,Quests:renderQuests,Shop:renderShop,Inv:renderInv};
  if(renders[tab])renders[tab]();
}

// ══════════════════════════════════
//  WORLD
// ══════════════════════════════════
function renderWorld(){const panel=document.getElementById('panelWorld');let html=`<div style="position:relative;flex:1;overflow:hidden;min-height:200px;" id="worldMapInner"><div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 30% 40%,rgba(0,30,15,0.8) 0%,transparent 55%),radial-gradient(ellipse 50% 45% at 72% 62%,rgba(0,15,30,0.7) 0%,transparent 50%),#080f08;"></div><div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,192,48,0.012) 0px,rgba(0,192,48,0.012) 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,rgba(0,192,48,0.012) 0px,rgba(0,192,48,0.012) 1px,transparent 1px,transparent 48px);"></div>`;WORLD_REGIONS.forEach(r=>{const locked=r.minLevel>G.level;const isCurrent=G.currentRegion===r.id;html+=`<div class="map-region ${locked?'locked':''} ${isCurrent?'active':''}" style="left:${r.x}%;top:${r.y}%;transform:translate(-50%,-50%)" onclick="${locked?'':("selectRegion('"+r.id+"')")}"><div class="region-bubble" style="width:52px;height:52px"><span class="region-emoji">${r.emoji}</span></div><div class="region-label">${r.name.split(' ').slice(0,2).join(' ')}</div>${locked?`<div class="region-level">Niv.${r.minLevel}</div>`:''}</div>`;});html+='</div>';panel.innerHTML=html;if(G.currentRegion)showRegionPopup(G.currentRegion);}
function selectRegion(id){G.currentRegion=id;renderWorld();renderMinimap();if(id==='donjon_friture')triggerStory('reachDungeon');else if(id==='pic_piment'||id==='marais_ail')triggerStory('dangerZone');}
function showRegionPopup(regionId){const region=WORLD_REGIONS.find(r=>r.id===regionId);if(!region)return;const mapInner=document.getElementById('worldMapInner');if(!mapInner)return;const existing=mapInner.querySelector('.map-event-popup');if(existing)existing.remove();const popup=document.createElement('div');popup.className='map-event-popup';popup.innerHTML=`<div class="popup-title">${region.emoji} ${region.name}</div><div class="popup-desc">${region.desc}</div><button class="btn-popup" onclick="goFightRegion('${regionId}')">⚔ Combattre</button><button class="btn-popup secondary" onclick="closeRegionPopup()">✕ Fermer</button>`;mapInner.appendChild(popup);}
function closeRegionPopup(){const el=document.querySelector('.map-event-popup');if(el)el.remove();}
function goFightRegion(id){G.currentRegion=id;switchTab('Fight');}

// ══════════════════════════════════
//  FARM
// ══════════════════════════════════
function checkFarmNotif(){const ready=G.plots.filter(p=>p.status==='ready').length;const btn=document.getElementById('navFarm');const ex=btn.querySelector('.nav-item-notif');if(ready>0&&!ex){const n=document.createElement('span');n.className='nav-item-notif';btn.appendChild(n);}else if(ready===0&&ex)ex.remove();}
function renderFarm(){const panel=document.getElementById('panelFarm');const readyCount=G.plots.filter(p=>p.status==='ready').length;let plotsHtml='<div class="farm-grid">';G.plots.forEach((plot,i)=>{if(plot.locked){plotsHtml+=`<div class="plot-rs locked"><span style="font-size:0.9rem">🔒</span></div>`;return;}if(!plot.crop){plotsHtml+=`<div class="plot-rs empty" onclick="plantOnPlot(${i})"><span style="font-size:1rem;color:#1e3018">+</span></div>`;return;}const seed=SEEDS.find(s=>s.id===plot.crop);const elapsed=G.tick-plot.plantedAt;const prog=Math.min(1,elapsed/(seed?.time||30));if(plot.status==='ready'){plotsHtml+=`<div class="plot-rs ready" onclick="harvest(${i})" id="plot_${i}"><span class="plot-emoji">${seed?.emoji||'?'}</span><div class="plot-ready-tag">PRÊT</div><div class="plot-progress"><div class="plot-progress-fill" style="width:100%"></div></div></div>`;}else{const rem=Math.max(0,(seed?.time||30)-elapsed);plotsHtml+=`<div class="plot-rs growing" id="plot_${i}"><span class="plot-emoji" style="opacity:0.5;filter:grayscale(0.5)">${seed?.emoji||'?'}</span><span class="plot-time">${rem}s</span><div class="plot-progress"><div class="plot-progress-fill" id="plotbar_${i}" style="width:${prog*100}%"></div></div></div>`;}});plotsHtml+='</div>';const farmLvl=G.skillLevels.farming||1;let seedsHtml=`<div class="seeds-section"><div class="seeds-title">🌱 Graines — Farming Niv.${farmLvl}</div><div class="seeds-grid">`;SEEDS.forEach(seed=>{const locked=seed.unlockLevel>farmLvl;const sel=G.selectedSeed===seed.id;const qty=(G.inventory[seed.id]||0);const noStock=!locked&&qty===0;seedsHtml+=`<div class="seed-btn ${locked?'locked':''} ${noStock?'locked':''} ${sel&&!noStock?'selected':''}" onclick="${locked||noStock?'':("selectSeed('"+seed.id+"')")}"><span class="seed-emoji">${seed.emoji}</span><span class="seed-name">${seed.name}</span><span class="seed-cost" style="${noStock&&!locked?'color:#e05;':''}">📦${qty}</span><span class="seed-time">⏱${seed.time}s</span></div>`;});seedsHtml+='</div></div>';panel.innerHTML=`<div class="farm-panel"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;"><span class="section-title" style="margin:0;font-size:0.62rem">🌱 Ferme</span>${readyCount>0?`<span style="font-size:0.65rem;color:var(--green2);font-family:'DM Mono',monospace;">✓ ${readyCount} prête${readyCount>1?'s':''}</span>`:''}</div>${plotsHtml}${seedsHtml}</div>`;}
function updateFarmProgress(){G.plots.forEach((plot,i)=>{if(!plot.crop||plot.status==='ready'||plot.locked)return;const seed=SEEDS.find(s=>s.id===plot.crop);if(!seed)return;const elapsed=G.tick-plot.plantedAt;const prog=Math.min(1,elapsed/seed.time);const rem=Math.max(0,seed.time-elapsed);const bar=document.getElementById('plotbar_'+i);const pl=document.getElementById('plot_'+i);if(bar)bar.style.width=(prog*100)+'%';if(pl){const t=pl.querySelector('.plot-time');if(t)t.textContent=rem+'s';}});}
function selectSeed(id){G.selectedSeed=(G.selectedSeed===id)?null:id;renderFarm();}
function plantOnPlot(idx){if(!G.selectedSeed){showToast('Sélectionne une graine d\'abord !','bad');return;}const seed=SEEDS.find(s=>s.id===G.selectedSeed);if(!seed)return;const hasInInventory=(G.inventory[seed.id]||0)>0;if(!hasInInventory){showToast(`Pas de ${seed.name} en inventaire ! Achète-en au shop.`,'bad');return;}G.inventory[seed.id]--;G.plots[idx]={...G.plots[idx],crop:seed.id,plantedAt:G.tick,status:'growing'};updateHUD();renderFarm();addLog(`Planté ${seed.emoji} <b>${seed.name}</b> en parcelle ${idx+1}.`,'skill');}
function harvest(idx){const plot=G.plots[idx];if(!plot.crop||plot.status!=='ready')return;const seed=SEEDS.find(s=>s.id===plot.crop);if(!seed)return;G.inventory[seed.id]=(G.inventory[seed.id]||0)+1;G.gold+=seed.sell;G.totalHarvests++;gainSkillXp('farming',seed.farmXp);G.plots[idx]={id:idx,locked:false,crop:null,plantedAt:0,status:null};updateHUD();renderFarm();checkFarmNotif();checkQuestProgress('harvest',1);addLog(`${seed.emoji} Récolte ! <b>${seed.name}</b> → +${seed.sell}💰 +${seed.farmXp}XP`,'loot');showToast(`${seed.emoji} Récolté — +${seed.sell} Or !`,'loot');if(G.totalHarvests===1)setTimeout(()=>triggerStory('firstHarvest'),300);}

// ══════════════════════════════════
//  COOKING
// ══════════════════════════════════
function renderCook(){const panel=document.getElementById('panelCook');const cookLvl=G.skillLevels.cooking||1;const available=RECIPES.filter(r=>r.level<=cookLvl);const locked=RECIPES.filter(r=>r.level>cookLvl);let html=`<div class="recipes-panel"><div class="section-title">🍳 Cuisine — Niv.${cookLvl}</div>`;if(available.length===0)html+=`<div style="text-align:center;padding:2rem;color:var(--text3);font-style:italic;font-size:0.78rem;">Récolte des légumes pour débloquer les recettes.</div>`;available.forEach(r=>{const canCook=canMakeRecipe(r);let ingsHtml='';Object.entries(r.ings).forEach(([id,qty])=>{const seed=SEEDS.find(s=>s.id===id);const have=(G.inventory[id]||0)>=qty;ingsHtml+=`<span class="ing-chip ${have?'have':'missing'}">${seed?.emoji||'?'}×${qty}${have?' ✓':''}</span>`;});html+=`<div class="recipe-card-rs" onclick="${canCook?("cookRecipe('"+r.id+"')"):''}"><div class="recipe-header"><span class="recipe-emoji-big">${r.emoji}</span><div class="recipe-info-col"><div class="recipe-name-rs">${r.name}</div><div class="recipe-desc-rs">${r.desc}</div><div class="recipe-lvl-req">+${r.cookXp} XP · Stock: ${G.cooked[r.id]||0}</div></div></div><div class="recipe-ingredients">${ingsHtml}<button class="btn-cook-rs" ${canCook?'':'disabled'}>Cuisiner</button></div></div>`;});if(locked.length>0){html+=`<div class="section-title">🔒 Non débloquées</div>`;locked.forEach(r=>{html+=`<div class="recipe-card-rs locked"><div class="recipe-header"><span class="recipe-emoji-big" style="filter:grayscale(1)">🔒</span><div class="recipe-info-col"><div class="recipe-name-rs" style="color:var(--text3)">${r.name}</div><div class="recipe-desc-rs">Niveau Cuisine ${r.level} requis</div></div></div></div>`;});}html+='</div>';panel.innerHTML=html;}
function canMakeRecipe(r){return Object.entries(r.ings).every(([id,qty])=>(G.inventory[id]||0)>=qty);}
function cookRecipe(recipeId){const recipe=RECIPES.find(r=>r.id===recipeId);if(!recipe||!canMakeRecipe(recipe)){showToast('Ingrédients insuffisants !','bad');return;}Object.entries(recipe.ings).forEach(([id,qty])=>{G.inventory[id]-=qty;});G.cooked[recipeId]=(G.cooked[recipeId]||0)+1;G.totalCooks++;G.uniqueCooksToday.add(recipeId);gainSkillXp('cooking',recipe.cookXp);checkQuestProgress('cook',1);addLog(`${recipe.emoji} <b>${recipe.name}</b> cuisiné ! +${recipe.cookXp}XP`,'skill');showToast(`${recipe.emoji} ${recipe.name} cuisiné !`,'good');renderCook();updateHUD();if(G.totalCooks===1)setTimeout(()=>triggerStory('firstCook'),400);}
function useCookedDish(recipeId){const recipe=RECIPES.find(r=>r.id===recipeId);if(!recipe||(G.cooked[recipeId]||0)<=0)return;G.cooked[recipeId]--;applyRecipeEffect(recipe);addLog(`${recipe.emoji} <b>${recipe.name}</b> utilisé !`,'heal');showToast(`${recipe.emoji} Utilisé !`,'good');closeModal();updateHUD();if(G.fightState==='active')updateCombatDisplay();}
function applyRecipeEffect(recipe){const e=recipe.eff;const p=G.player;if(e.heal)p.hp=Math.min(p.maxHp,p.hp+e.heal);if(e.healFull)p.hp=p.maxHp;if(e.hunger)p.hunger=Math.min(p.maxHunger,p.hunger+e.hunger);if(e.rageMax)p.rage=p.maxRage;if(e.atkPerm)p.atk+=e.atkPerm;if(e.maxHpBonus){p.maxHp+=e.maxHpBonus;p.hp+=e.maxHpBonus;}if(e.statsBoost){p.atk=Math.round(p.atk*(1+e.statsBoost));p.def=Math.round(p.def*(1+e.statsBoost));}if(e.atkBuff&&e.buffRounds){G.buffs.atk=(G.buffs.atk||0)+e.atkBuff;G.buffs.rounds=Math.max(G.buffs.rounds||0,e.buffRounds);}if(e.defBuff&&e.buffRounds){G.buffs.def=(G.buffs.def||0)+e.defBuff;G.buffs.rounds=Math.max(G.buffs.rounds||0,e.buffRounds);}if(e.nextCrit)G.buffs.nextCrit=true;updateHUD();}

// ══════════════════════════════════
//  FIGHT
// ══════════════════════════════════
function renderFightPanel(){const panel=document.getElementById('panelFight');if(G.fightState==='select')renderMonsterSelect(panel);else if(G.fightState==='active')renderCombatActive(panel);else if(G.fightState==='victory')renderFightVictory(panel);else if(G.fightState==='defeat')renderFightDefeat(panel);}
function renderMonsterSelect(panel){const region=WORLD_REGIONS.find(r=>r.id===G.currentRegion);const regionMonsters=G.currentRegion?MONSTERS.filter(m=>m.region===G.currentRegion):MONSTERS.filter(m=>m.level<=G.level+2);let html=`<div style="padding:0.6rem;">`;if(region){html+=`<div style="background:var(--panel2);border:1px solid var(--border);padding:0.6rem 0.8rem;margin-bottom:0.7rem;display:flex;align-items:center;gap:0.6rem;"><span style="font-size:2rem">${region.emoji}</span><div><div style="font-family:'Raleway',sans-serif;font-weight:700;font-size:0.82rem;color:var(--white);">${region.name}</div><div style="font-size:0.62rem;color:var(--text3);font-style:italic;">${region.desc}</div></div></div>`;}else{html+=`<div style="text-align:center;padding:1rem;color:var(--text3);font-size:0.75rem;font-style:italic;margin-bottom:0.5rem;">Choisis une région sur la carte pour combattre.</div>`;}if(regionMonsters.length===0){html+=`<div style="text-align:center;padding:2rem;color:var(--text3);font-size:0.75rem;font-style:italic;">Aucun monstre ici. Explore d'autres régions.</div>`;}regionMonsters.forEach(m=>{const diff=m.boss?'boss':m.level<=G.level?'easy':m.level<=G.level+3?'med':'hard';const dc={easy:'var(--green)',med:'var(--amberbright)',hard:'var(--redbright)',boss:'var(--purplebright)'};const dl={easy:'Facile',med:'Moyen',hard:'Difficile',boss:'BOSS'};html+=`<div class="monster-card" onclick="startFight('${m.id}')"><span style="font-size:2rem">${m.emoji}</span><div style="flex:1"><div style="font-family:'Raleway',sans-serif;font-weight:700;font-size:0.8rem;color:var(--white);display:flex;align-items:center;gap:0.5rem;">${m.name}${m.boss?`<span style="font-size:0.48rem;background:rgba(128,64,208,0.2);border:1px solid var(--purplebright);color:var(--purplebright);padding:1px 5px;font-family:'Raleway',sans-serif;font-weight:700;letter-spacing:0.08em;">BOSS</span>`:''}</div><div style="font-size:0.58rem;color:var(--text3);font-style:italic;margin-top:1px;">${m.desc}</div><div style="font-size:0.56rem;color:var(--text3);margin-top:2px;font-family:'DM Mono',monospace;">❤${m.hp} ⚔${m.atk[0]}-${m.atk[1]} 💰${m.gold[0]}-${m.gold[1]} ⭐${m.xp}</div></div><span style="font-family:'Raleway',sans-serif;font-size:0.58rem;font-weight:700;color:${dc[diff]};padding:0.15rem 0.45rem;border:1px solid ${dc[diff]};letter-spacing:0.06em;">${dl[diff]}</span></div>`;});html+='</div>';panel.innerHTML=html;}

function startFight(monsterId){const m=MONSTERS.find(x=>x.id===monsterId);if(!m)return;G.currentMonster=JSON.parse(JSON.stringify(m));G.enemyHp=m.hp;G.enemyPatternIdx=0;G.enemySpecialUsed={};G.fightState='active';G.buffs={atk:0,def:0,rounds:0,nextCrit:false};G.debuffs={atk:0,def:0,rounds:0,blind:0,burn:0,poison:0,stun:0};G.enemyDebuffs={def:0,rounds:0,burn:0,poison:0};G.defending=false;G.combatLog=[];addLog(`⚔ Combat contre <b>${m.name}</b> !`,'combat');if(G.monstersKilled===0)triggerStory('firstFight');if(m.boss&&m.id==='bento_bakemono')triggerStory('bossWarning');renderFightPanel();}

function renderCombatActive(panel){const m=G.currentMonster;const p=G.player;const enemyPct=Math.max(0,(G.enemyHp/m.hp)*100);const playerPct=Math.max(0,(p.hp/p.maxHp)*100);let statusHtml='';if(G.buffs.rounds>0){if(G.buffs.atk>0)statusHtml+=`<span class="status-pill buff">+${G.buffs.atk}ATK(${G.buffs.rounds})</span>`;if(G.buffs.def>0)statusHtml+=`<span class="status-pill buff">+${G.buffs.def}DEF(${G.buffs.rounds})</span>`;}if(G.buffs.nextCrit)statusHtml+=`<span class="status-pill buff">💥CRIT</span>`;if(G.debuffs.burn>0)statusHtml+=`<span class="status-pill burn">🔥(${G.debuffs.burn})</span>`;if(G.debuffs.poison>0)statusHtml+=`<span class="status-pill poison">☠(${G.debuffs.poison})</span>`;if(G.debuffs.blind>0)statusHtml+=`<span class="status-pill debuff">👁(${G.debuffs.blind})</span>`;if(G.debuffs.stun>0)statusHtml+=`<span class="status-pill stun">⚡(${G.debuffs.stun})</span>`;const logLines=G.combatLog.slice(-2).map(l=>`<div class="chat-line ${l.type}">${l.text}</div>`).join('');let movesHtml=COMBAT_MOVES.map(mv=>{const tooLow=mv.rage>0&&p.rage<mv.rage;const dis=tooLow?' disabled':'';const cost=mv.rage>0?`<span class="cb-cost">${mv.rage}⚡</span>`:(mv.gain>0?`<span class="cb-cost">+${mv.gain}⚡</span>`:'');return`<button class="combat-btn ${mv.cat}" onclick="playerMove('${mv.id}')"${dis}><span class="cb-emoji">${mv.emoji}</span>${mv.label}${cost}</button>`;}).join('');panel.innerHTML=`<div class="combat-screen"><div class="combat-arena"><div class="arena-bg"></div><div class="arena-floor"></div><div class="combatant"><span class="combatant-sprite" id="enemySprite">${m.emoji}</span><div class="combatant-shadow"></div><div class="combatant-name">${m.name}</div></div><div class="combat-vs">VS</div><div class="combatant"><span class="combatant-sprite player" id="playerSprite">🥊</span><div class="combatant-shadow"></div><div class="combatant-name">Toi</div></div></div><div class="combat-bars"><div class="cbar-row"><span class="cbar-label">${m.name.split(' ')[0]}</span><div class="cbar-track"><div class="cbar-fill enemy-hp" id="cb_enemyHp" style="width:${enemyPct}%"></div></div><span class="cbar-val" id="cb_enemyHpVal">${G.enemyHp}/${m.hp}</span></div><div class="cbar-row"><span class="cbar-label">Ton HP</span><div class="cbar-track"><div class="cbar-fill player-hp" id="cb_playerHp" style="width:${playerPct}%"></div></div><span class="cbar-val" id="cb_playerHpVal">${p.hp}/${p.maxHp}</span></div><div class="cbar-row"><span class="cbar-label">⚡ Rage</span><div class="cbar-track"><div class="cbar-fill rage" id="cb_rage" style="width:${(p.rage/p.maxRage)*100}%"></div></div><span class="cbar-val" id="cb_rageVal">${p.rage}/${p.maxRage}</span></div></div><div class="status-row" id="statusRow">${statusHtml}</div><div style="background:rgba(0,0,0,0.5);padding:0.3rem 0.6rem;min-height:2.4rem;flex-shrink:0;border-bottom:1px solid var(--border);" id="combatLogDisplay">${logLines||'<div class="chat-line sys">Le combat commence !</div>'}</div><div class="combat-actions"><div class="combat-action-title">⚔ Actions</div><div class="combat-grid">${movesHtml}</div><div class="combat-actions-row2"><button class="combat-btn eat" onclick="openEatModal()"><span class="cb-emoji">🍖</span>Manger</button><button class="combat-btn flee" onclick="attemptFlee()"><span class="cb-emoji">🏃</span>Fuir</button></div></div></div>`;}

function renderFightVictory(panel){const m=G.currentMonster;const goldWon=m._goldWon||0;panel.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;gap:0.8rem;padding:2rem 1.5rem;text-align:center;flex:1;justify-content:center;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(0,60,20,0.3) 0%,transparent 60%),var(--bg);"><span style="font-size:4rem;filter:drop-shadow(0 0 24px rgba(0,192,48,0.5));animation:crestFloat 3s ease-in-out infinite;">🏆</span><div style="font-family:'Raleway',sans-serif;font-weight:900;font-size:1.8rem;color:var(--green);letter-spacing:-0.01em;">VICTOIRE !</div><div style="font-size:0.78rem;color:var(--text2);font-style:italic;">${m.name} est vaincu !</div><div style="display:flex;gap:1.5rem;margin:0.5rem 0;background:var(--panel2);border:1px solid var(--border);padding:0.8rem 1.5rem;"><div style="text-align:center;"><div style="font-family:'DM Mono',monospace;font-size:1.2rem;color:var(--amberbright)">💰${goldWon}</div><div style="font-size:0.52rem;color:var(--text3);">Or gagné</div></div><div style="text-align:center;"><div style="font-family:'DM Mono',monospace;font-size:1.2rem;color:var(--green)">⭐${m.xp}</div><div style="font-size:0.52rem;color:var(--text3);">XP</div></div><div style="text-align:center;"><div style="font-family:'DM Mono',monospace;font-size:1.2rem;color:var(--tealbright)">🔥${G.player.streak}</div><div style="font-size:0.52rem;color:var(--text3);">Série</div></div></div><button style="background:var(--green);border:none;color:#060e08;font-family:'Raleway',sans-serif;font-weight:700;font-size:0.95rem;padding:0.85rem 3rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.12em;" onclick="afterVictory()">▶ Continuer</button><button style="background:transparent;border:1px solid var(--border2);color:var(--text3);font-family:'Raleway',sans-serif;font-size:0.72rem;padding:0.55rem 1.5rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.08em;" onclick="switchTab('World')">← Retour à la carte</button></div>`;}
function renderFightDefeat(panel){panel.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;gap:0.8rem;padding:2rem 1.5rem;text-align:center;flex:1;justify-content:center;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(80,10,10,0.3) 0%,transparent 60%),var(--bg);"><span style="font-size:4rem;filter:drop-shadow(0 0 24px rgba(224,48,58,0.4));animation:crestFloat 3s ease-in-out infinite;">💀</span><div style="font-family:'Raleway',sans-serif;font-weight:900;font-size:1.8rem;color:var(--redbright);letter-spacing:-0.01em;">DÉFAITE</div><div style="font-size:0.78rem;color:var(--text2);font-style:italic;max-width:260px;">Tu as été vaincu... Récupère-toi et reviens plus fort.</div><div style="font-size:0.65rem;color:var(--text3);font-style:italic;background:var(--panel2);border:1px solid var(--border);padding:0.6rem 1rem;">Astuce : Cuisine des plats et utilise Défense pour encaisser.</div><button style="background:var(--panel2);border:1px solid var(--border2);color:var(--text2);font-family:'Raleway',sans-serif;font-weight:700;font-size:0.88rem;padding:0.8rem 2.5rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.08em;" onclick="afterDefeat()">↩ Réessayer</button><button style="background:transparent;border:1px solid var(--border);color:var(--text3);font-family:'Raleway',sans-serif;font-size:0.72rem;padding:0.55rem 1.5rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.08em;" onclick="switchTab('World')">← Retour à la carte</button></div>`;}

function playerMove(moveId){const move=COMBAT_MOVES.find(m=>m.id===moveId);const p=G.player;const m=G.currentMonster;if(G.debuffs.stun>0){G.debuffs.stun--;addCombatLog('Tu es étourdi(e) ! Tour perdu.','damage');updateCombatDisplay();setTimeout(()=>enemyTurn(),500);return;}if(move.rage>0&&p.rage<move.rage){showToast('Rage insuffisante !','bad');return;}G.defending=move.cat==='defend';document.querySelectorAll('.combat-btn').forEach(b=>b.disabled=true);if(move.cat==='defend'){addCombatLog('🛡 Position défensive.','sys');p.rage=Math.min(p.maxRage,p.rage+move.gain);updateCombatDisplay();setTimeout(()=>enemyTurn(),350);return;}if(move.cat==='pray'){p.hp=Math.min(p.maxHp,p.hp+15);addCombatLog('✨ Prière : +15 HP.','heal');updateCombatDisplay();updateHUD();setTimeout(()=>enemyTurn(),350);return;}const blindPenalty=G.debuffs.blind>0?0.65:1;if(Math.random()>move.acc*blindPenalty){addCombatLog(`Raté ! ${m.emoji} esquive.`,'sys');if(G.debuffs.blind>0)G.debuffs.blind--;p.rage=Math.min(p.maxRage,p.rage+Math.floor(move.gain*0.4));updateCombatDisplay();animEnemy('dodge');setTimeout(()=>enemyTurn(),500);return;}const buffAtk=G.buffs.rounds>0?G.buffs.atk:0;const debAtk=G.debuffs.rounds>0?G.debuffs.atk:0;const totalAtk=Math.max(1,p.atk+buffAtk-debAtk);const enemyDef=Math.max(0,(m.def||0)-(G.enemyDebuffs.def||0));const baseDmg=totalAtk*move.mult;const variance=0.85+Math.random()*0.3;let dmg=Math.max(1,Math.round(baseDmg*variance)-Math.floor(enemyDef*0.65));const isCrit=G.buffs.nextCrit||Math.random()<(0.05+(p.spd||8)*0.003);if(isCrit){dmg=Math.round(dmg*2.2);G.buffs.nextCrit=false;}if(move.rage>0)p.rage=Math.max(0,p.rage-move.rage);p.rage=Math.min(p.maxRage,p.rage+move.gain);if(G.buffs.rounds>0)G.buffs.rounds--;if(G.debuffs.blind>0)G.debuffs.blind--;G.enemyHp=Math.max(0,G.enemyHp-dmg);gainSkillXp('attack',Math.round(dmg*0.8));gainSkillXp('strength',Math.round(dmg*0.5));animPlayer('attack');setTimeout(()=>animEnemy('hit'),80);const enemyEl=document.getElementById('enemySprite');if(isCrit){spawnDmgAt(`💥${dmg}`,enemyEl,'crit-dmg');addCombatLog(`${move.emoji} CRITIQUE ! <b>${dmg}</b> dégâts !`,'combat');}else{spawnDmgAt(dmg,enemyEl,'enemy-dmg');addCombatLog(`${move.emoji} <b>${dmg}</b> dégâts.`,'combat');}if(G.enemyDebuffs.burn>0){const bd=6;G.enemyHp=Math.max(0,G.enemyHp-bd);G.enemyDebuffs.burn--;addCombatLog(`🔥 ${m.name} brûle : -${bd}HP`,'combat');}updateCombatDisplay();if(G.enemyHp<=0){setTimeout(()=>endFight(true),600);return;}setTimeout(()=>enemyTurn(),600);}
function enemyTurn(){if(G.fightState!=='active')return;const p=G.player;const m=G.currentMonster;if(G.debuffs.burn>0){const d=5;p.hp=Math.max(0,p.hp-d);G.debuffs.burn--;addCombatLog(`🔥 Brûlure : -${d}HP`,'damage');updateHUD();}if(G.debuffs.poison>0){const d=8;p.hp=Math.max(0,p.hp-d);G.debuffs.poison--;addCombatLog(`☠ Poison : -${d}HP`,'damage');updateHUD();}if(p.hp<=0){endFight(false);return;}let usedSpecial=false;const sp=m.special;if(sp&&!G.enemySpecialUsed[m.id+'_sp']&&Math.random()<sp.chance){usedSpecial=true;G.enemySpecialUsed[m.id+'_sp']=true;if(sp.eff==='blind'){G.debuffs.blind=2;addCombatLog(`💫 <b>${sp.name}</b> ! Aveuglé 2t.`,'damage');}else if(sp.eff==='stun'){if(Math.random()<0.5){G.debuffs.stun=1;addCombatLog(`⚡ <b>${sp.name}</b> ! Étourdi !`,'damage');}else usedSpecial=false;}else if(sp.eff==='doubleHit'){const d1=calcEDmg(m),d2=calcEDmg(m);p.hp=Math.max(0,p.hp-d1-d2);dealPlayerDmg(d1+d2);addCombatLog(`⚡ <b>${sp.name}</b> ! -${d1} et -${d2}HP !`,'damage');}else if(sp.eff==='poison'){G.debuffs.poison=4;addCombatLog(`☠ <b>${sp.name}</b> ! Poison 4t.`,'damage');}else if(sp.eff==='burn'){G.debuffs.burn=3;addCombatLog(`🔥 <b>${sp.name}</b> ! Brûlure 3t.`,'damage');}else if(sp.eff==='burnHeavy'){G.debuffs.burn=5;addCombatLog(`🔥 <b>${sp.name}</b> ! Brûlure intense !`,'damage');}else if(sp.eff==='blindBurn'){G.debuffs.blind=2;G.debuffs.burn=3;addCombatLog(`🌶 <b>${sp.name}</b> ! Aveuglé+Brûlure !`,'damage');}else if(sp.eff==='armorPierce'){const d=Math.round(calcEDmg(m)*1.5);p.hp=Math.max(0,p.hp-d);dealPlayerDmg(d);addCombatLog(`🧀 <b>${sp.name}</b> ! Perce armure -${d}HP !`,'damage');}else if(sp.eff==='selfHeal'){G.enemyHp=Math.min(m.hp,G.enemyHp+30);addCombatLog(`💚 <b>${sp.name}</b> ! +30HP ennemi.`,'sys');}else if(sp.eff==='burnDebuff'){G.debuffs.burn=4;G.debuffs.atk=8;G.debuffs.rounds=4;addCombatLog(`🍜 <b>${sp.name}</b> ! Brûlure+ATK-8.`,'damage');}else if(sp.eff==='pierceHeavy'){const d=Math.round(calcEDmg(m)*2.2);p.hp=Math.max(0,p.hp-d);dealPlayerDmg(d);addCombatLog(`🌮 <b>${sp.name}</b> ! -${d}HP !`,'damage');}else if(sp.eff==='poisonStun'){G.debuffs.poison=4;if(Math.random()<0.4)G.debuffs.stun=1;addCombatLog(`🍩 <b>${sp.name}</b> ! Poison+(étourdi?)`,'damage');}else if(sp.eff==='statsNuke'){G.debuffs.atk=Math.round(p.atk*0.1);G.debuffs.def=Math.round(p.def*0.1);G.debuffs.rounds=4;addCombatLog(`🍱 <b>${sp.name}</b> ! Stats réduits 4t.`,'damage');}else usedSpecial=false;}if(!usedSpecial){let dmg=calcEDmg(m);const defMult=G.defending?0.38:1;const buffDef=G.buffs.rounds>0?G.buffs.def:0;const netDef=Math.max(0,p.def+buffDef-(G.debuffs.def||0));const finalDmg=Math.max(1,Math.round((dmg-Math.floor(netDef*0.55))*defMult));p.hp=Math.max(0,p.hp-finalDmg);dealPlayerDmg(finalDmg);if(G.defending)addCombatLog(`🛡 Attaque bloquée : -${finalDmg}HP`,'damage');else addCombatLog(`${m.emoji} ${m.name} frappe : -<b>${finalDmg}</b>HP`,'damage');gainSkillXp('defence',Math.round(finalDmg*0.6));gainSkillXp('hitpoints',Math.round(finalDmg*0.3));}
G.defending=false;updateHUD();updateCombatDisplay();document.querySelectorAll('.combat-btn').forEach(b=>{const cls=b.className;const mv=COMBAT_MOVES.find(x=>cls.includes(x.cat));b.disabled=!!(mv&&mv.rage>0&&p.rage<mv.rage);});if(p.hp<=0){p.hp=0;endFight(false);}}
function calcEDmg(m){return m.atk[0]+Math.floor(Math.random()*(m.atk[1]-m.atk[0]+1));}
function dealPlayerDmg(dmg){const el=document.getElementById('playerSprite');if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');}spawnDmgAt(`-${dmg}`,el,'player-dmg');}
function endFight(won){const m=G.currentMonster;G.buffs={atk:0,def:0,rounds:0,nextCrit:false};G.debuffs={atk:0,def:0,rounds:0,blind:0,burn:0,poison:0,stun:0};G.enemyDebuffs={def:0,rounds:0,burn:0,poison:0};G.defending=false;if(won){const goldWon=m.gold[0]+Math.floor(Math.random()*(m.gold[1]-m.gold[0]+1));G.currentMonster._goldWon=goldWon;G.gold+=goldWon;G.player.streak++;G.wins++;G.monstersKilled++;gainXP(m.xp);gainSkillXp('attack',m.xp);gainSkillXp('hitpoints',Math.round(m.xp*0.5));if(m.loot){Object.entries(m.loot).forEach(([id,chance])=>{if(Math.random()<chance){G.inventory[id]=(G.inventory[id]||0)+1;const seed=SEEDS.find(s=>s.id===id);addLog(`💎 Loot : ${seed?.emoji||'?'} <b>${seed?.name||id}</b> !`,'loot');}});}G.fightState='victory';addLog(`🏆 <b>${m.name}</b> vaincu ! +${goldWon}💰 +${m.xp}XP`,'combat');checkQuestProgress('kill',1);if(G.monstersKilled===1)setTimeout(()=>triggerStory('firstVictory'),800);}else{G.player.streak=0;G.fightState='defeat';addLog(`💀 Défaite contre ${m.name}...`,'damage');setTimeout(()=>triggerStory('firstDefeat'),800);}updateHUD();renderFightPanel();saveGame();}
function afterVictory(){G.player.hp=Math.min(G.player.maxHp,G.player.hp+15);G.player.rage=0;G.fightState='select';G.currentMonster=null;updateHUD();renderFightPanel();}
function afterDefeat(){G.player.hp=Math.min(G.player.maxHp,Math.round(G.player.maxHp*0.35));G.player.rage=0;G.fightState='select';G.currentMonster=null;updateHUD();renderFightPanel();}
function attemptFlee(){const penalty=Math.round(G.player.maxHp*0.1);G.player.hp=Math.max(1,G.player.hp-penalty);G.player.streak=0;G.player.rage=0;G.fightState='select';G.currentMonster=null;updateHUD();renderFightPanel();addLog(`🏃 Fuite ! (-${penalty}HP)`,'damage');showToast(`Fuite ! -${penalty} HP`,'bad');}
function updateCombatDisplay(){const m=G.currentMonster;const p=G.player;if(!m)return;const ePct=Math.max(0,(G.enemyHp/m.hp)*100);const pPct=Math.max(0,(p.hp/p.maxHp)*100);const eH=document.getElementById('cb_enemyHp'),eHV=document.getElementById('cb_enemyHpVal'),pH=document.getElementById('cb_playerHp'),pHV=document.getElementById('cb_playerHpVal'),rEl=document.getElementById('cb_rage'),rV=document.getElementById('cb_rageVal');if(eH)eH.style.width=ePct+'%';if(eHV)eHV.textContent=`${Math.max(0,G.enemyHp)}/${m.hp}`;if(pH)pH.style.width=pPct+'%';if(pHV)pHV.textContent=`${p.hp}/${p.maxHp}`;if(rEl)rEl.style.width=(p.rage/p.maxRage*100)+'%';if(rV)rV.textContent=`${p.rage}/${p.maxRage}`;const ld=document.getElementById('combatLogDisplay');if(ld)ld.innerHTML=G.combatLog.slice(-2).map(l=>`<div class="chat-line ${l.type}">${l.text}</div>`).join('')||'';let sh='';if(G.buffs.rounds>0){if(G.buffs.atk>0)sh+=`<span class="status-pill buff">+${G.buffs.atk}ATK(${G.buffs.rounds})</span>`;if(G.buffs.def>0)sh+=`<span class="status-pill buff">+${G.buffs.def}DEF(${G.buffs.rounds})</span>`;}if(G.buffs.nextCrit)sh+=`<span class="status-pill buff">💥CRIT</span>`;if(G.debuffs.burn>0)sh+=`<span class="status-pill burn">🔥(${G.debuffs.burn})</span>`;if(G.debuffs.poison>0)sh+=`<span class="status-pill poison">☠(${G.debuffs.poison})</span>`;if(G.debuffs.blind>0)sh+=`<span class="status-pill debuff">👁(${G.debuffs.blind})</span>`;if(G.debuffs.stun>0)sh+=`<span class="status-pill stun">⚡(${G.debuffs.stun})</span>`;const sr=document.getElementById('statusRow');if(sr)sr.innerHTML=sh;}
function addCombatLog(text,type){G.combatLog.push({text,type});addLog(text,type);}
function animEnemy(type){const el=document.getElementById('enemySprite');if(!el)return;el.classList.remove('hit','dodge');void el.offsetWidth;el.classList.add(type);}
function animPlayer(){const el=document.getElementById('playerSprite');if(!el)return;el.classList.remove('attacking');void el.offsetWidth;el.classList.add('attacking');}

function openEatModal(){const dishes=RECIPES.filter(r=>(G.cooked[r.id]||0)>0);const rawItems=SEEDS.filter(s=>(G.inventory[s.id]||0)>0&&(s.heal>0||s.atk>0));const potions=SHOP_ITEMS.filter(s=>(G.inventory[s.id]||0)>0&&s.type==='item');if(!dishes.length&&!rawItems.length&&!potions.length){showToast('Rien à manger !','bad');return;}let html='<div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:0.4rem;">';if(dishes.length){html+=`<div class="section-title" style="font-size:0.58rem">👨‍🍳 Plats cuisinés</div>`;dishes.forEach(r=>{html+=`<button onclick="useCookedDish('${r.id}')" style="background:var(--panel2);border:1px solid var(--border2);color:var(--text);padding:0.6rem 0.7rem;font-family:'Libre Baskerville',serif;font-size:0.8rem;display:flex;align-items:center;gap:0.7rem;cursor:pointer;width:100%;text-align:left;"><span style="font-size:1.5rem">${r.emoji}</span><div style="flex:1"><b>${r.name}</b> <span style="color:var(--green);font-size:0.68rem">(×${G.cooked[r.id]})</span><br><span style="font-size:0.6rem;color:var(--text3);font-style:italic">${r.desc}</span></div></button>`;});}if(rawItems.length){html+=`<div class="section-title" style="font-size:0.58rem">🌱 Ingrédients bruts</div>`;rawItems.forEach(s=>{html+=`<button onclick="useRawSeed('${s.id}')" style="background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:0.5rem 0.7rem;font-family:'Libre Baskerville',serif;font-size:0.78rem;display:flex;align-items:center;gap:0.6rem;cursor:pointer;width:100%;text-align:left;"><span style="font-size:1.2rem">${s.emoji}</span><span style="flex:1">${s.name} ×${G.inventory[s.id]}</span><span style="color:var(--green2);font-size:0.62rem">${s.heal>0?'+'+s.heal+'HP ':''}${s.atk>0?'+'+s.atk+'ATK':''}</span></button>`;});}if(potions.length){html+=`<div class="section-title" style="font-size:0.58rem">🧪 Potions</div>`;potions.forEach(it=>{html+=`<button onclick="usePotion('${it.id}')" style="background:var(--panel2);border:1px solid var(--border);color:var(--text);padding:0.5rem 0.7rem;font-family:'Libre Baskerville',serif;font-size:0.78rem;display:flex;align-items:center;gap:0.6rem;cursor:pointer;width:100%;text-align:left;"><span style="font-size:1.2rem">${it.emoji}</span><span style="flex:1">${it.name} ×${G.inventory[it.id]}</span><span style="color:var(--green2);font-size:0.62rem">${it.heal?'+'+it.heal+'HP':''}${it.rageMax?'Rage MAX':''}${it.cure?'Soigne':''}</span></button>`;});}html+='</div>';showModal('🍖 Manger / Utiliser','Choisis un aliment à consommer.',html,[{label:'Fermer',action:'closeModal()'}]);}
function useRawSeed(id){const s=SEEDS.find(x=>x.id===id);if(!s||!G.inventory[id])return;G.inventory[id]--;if(s.heal>0){G.player.hp=Math.min(G.player.maxHp,G.player.hp+s.heal);addLog(`${s.emoji} +${s.heal}HP de ${s.name}`,'heal');}if(s.atk>0){G.player.atk+=s.atk;addLog(`${s.emoji} +${s.atk}ATK de ${s.name}`,'skill');}G.player.hunger=Math.min(G.player.maxHunger,G.player.hunger+8);closeModal();updateHUD();if(G.fightState==='active')updateCombatDisplay();}
function usePotion(id){const it=SHOP_ITEMS.find(x=>x.id===id);if(!it||!G.inventory[id])return;G.inventory[id]--;if(it.heal){G.player.hp=Math.min(G.player.maxHp,G.player.hp+it.heal);addLog(`${it.emoji} +${it.heal}HP`,'heal');}if(it.rageMax){G.player.rage=G.player.maxRage;addLog(`${it.emoji} Rage MAX !`,'combat');}if(it.cure){G.debuffs.burn=0;G.debuffs.poison=0;G.debuffs.stun=0;addLog(`${it.emoji} Effets soignés !`,'heal');}closeModal();updateHUD();if(G.fightState==='active')updateCombatDisplay();}

// ══════════════════════════════════
//  QUESTS
// ══════════════════════════════════
function checkQuestProgress(type,amount){let anyCompleted=false;G.quests.forEach(quest=>{if(quest.status!=='active')return;quest.tasks.forEach(task=>{if(task.type===type&&task.progress<task.goal)task.progress=Math.min(task.goal,task.progress+amount);});if(quest.tasks.every(t=>t.progress>=t.goal)){completeQuest(quest);anyCompleted=true;}});if(anyCompleted)unlockNextQuests();if(document.getElementById('panelQuests').classList.contains('active'))renderQuests();checkQuestNotif();}
function completeQuest(quest){quest.status='complete';const r=quest.reward;if(r.gold)G.gold+=r.gold;if(r.xp)gainXP(r.xp);if(r.cookXp)gainSkillXp('cooking',r.cookXp);if(r.atkBonus)G.player.atk+=r.atkBonus;if(r.defBonus)G.player.def+=r.defBonus;if(r.maxHpBonus){G.player.maxHp+=r.maxHpBonus;G.player.hp+=r.maxHpBonus;}if(r.farmingBonus)G.skillLevels.farming=(G.skillLevels.farming||1)+1;addLog(`📜 Quête <b>${quest.name}</b> accomplie ! ${quest.rewardDesc}`,'quest');showToast(`📜 ${quest.name} accomplie !`,'good');updateHUD();}
function unlockNextQuests(){G.quests.forEach(q=>{if(q.status==='locked'&&q.unlockAfter){const parent=G.quests.find(x=>x.id===q.unlockAfter);if(parent&&parent.status==='complete'){q.status='active';addLog(`📜 Nouvelle quête : <b>${q.name}</b>`,'quest');}}});}
function checkQuestNotif(){const active=G.quests.filter(q=>q.status==='active').length;const btn=document.getElementById('navQuests');if(!btn)return;const ex=btn.querySelector('.nav-item-notif');if(active>0&&!ex){const n=document.createElement('span');n.className='nav-item-notif';btn.appendChild(n);}else if(active===0&&ex)ex.remove();}
function renderQuests(){const panel=document.getElementById('panelQuests');const order=['active','locked','complete'];const sorted=[...G.quests].sort((a,b)=>order.indexOf(a.status)-order.indexOf(b.status));let html='<div class="quests-panel">';sorted.forEach(quest=>{const sl={active:'En cours',complete:'Terminée',locked:'Verrouillée'};html+=`<div class="quest-card"><div class="quest-header"><span class="quest-icon">${quest.icon}</span><div class="quest-info"><div class="quest-name">${quest.name}</div><div class="quest-desc">${quest.desc}</div>${quest.status==='active'?`<div style="font-size:0.6rem;color:var(--amberbright);margin-top:2px;font-family:'DM Mono',monospace;">🏆 ${quest.rewardDesc}</div>`:''}</div><span class="quest-status ${quest.status}">${sl[quest.status]}</span></div>${quest.status==='active'?`<div class="quest-progress">${quest.tasks.map(t=>`<div class="quest-task ${t.progress>=t.goal?'done':'todo'}">${t.progress>=t.goal?'✓':'○'} ${t.label} (${t.progress}/${t.goal})</div>`).join('')}</div>`:''}</div>`;});html+='</div>';panel.innerHTML=html;checkQuestNotif();}

// ══════════════════════════════════
//  SHOP
// ══════════════════════════════════
function renderShop(){const panel=document.getElementById('panelShop');const tab=G.selectedShopTab||'equip';let html=`<div class="shop-panel"><div class="section-title">🏪 Grand Échange</div><div class="shop-tabs"><div class="shop-tab ${tab==='equip'?'active':''}" onclick="setShopTab('equip')">⚔ Équip.</div><div class="shop-tab ${tab==='item'?'active':''}" onclick="setShopTab('item')">🧪 Potions</div><div class="shop-tab ${tab==='seed'?'active':''}" onclick="setShopTab('seed')">🌱 Graines</div><div class="shop-tab ${tab==='lootbox'?'active':''}" onclick="setShopTab('lootbox')">📦 Lootboxes</div></div>`;if(tab==='equip'){html+='<div class="shop-grid-2">';SHOP_ITEMS.filter(i=>i.type==='equip').forEach(item=>{const owned=!!G.equipped[item.id];const afford=G.gold>=item.cost;html+=`<div class="shop-item-card ${owned?'owned':''} ${!afford&&!owned?'cant-afford':''}" onclick="${owned?'':("buyItem('"+item.id+"')")}"><span class="shop-item-emoji">${item.emoji}</span><div class="shop-item-name">${item.name}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-price">💰 ${owned?'Possédé':item.cost}</div></div>`;});html+='</div>';}else if(tab==='item'){html+='<div class="shop-grid-2">';SHOP_ITEMS.filter(i=>i.type!=='equip').forEach(item=>{const qty=G.inventory[item.id]||0;const afford=G.gold>=item.cost;html+=`<div class="shop-item-card ${!afford?'cant-afford':''}" onclick="buyItem('${item.id}')"><span class="shop-item-emoji">${item.emoji}</span><div class="shop-item-name">${item.name}${qty>0?` <span style="color:var(--green);font-size:0.6rem">(×${qty})</span>`:''}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-price">💰 ${item.cost}</div></div>`;});html+='</div>';}else if(tab==='seed'){const farmLvl=G.skillLevels.farming||1;html+='<div class="shop-grid-2">';SEEDS.forEach(seed=>{const locked=seed.unlockLevel>farmLvl;const afford=G.gold>=seed.cost;html+=`<div class="shop-item-card ${!afford||locked?'cant-afford':''}" onclick="${locked?'':("buySeeds('"+seed.id+"')")}"><span class="shop-item-emoji">${seed.emoji}</span><div class="shop-item-name">${seed.name}${locked?` <span style="font-size:0.52rem;color:var(--text3)">(Niv.${seed.unlockLevel})</span>`:''}</div><div class="shop-item-desc">⏱${seed.time}s · Vend ${seed.sell}💰</div><div class="shop-item-price">💰 ${seed.cost}</div></div>`;});html+='</div>';}else if(tab==='lootbox'){html+=`<div style="margin-bottom:0.6rem;font-size:0.65rem;color:var(--text3);font-style:italic;line-height:1.5;padding:0.5rem;background:var(--panel2);border:1px solid var(--border);">📦 Les lootboxes contiennent des récompenses aléatoires. La <b style="color:var(--amberbright)">Banane Secrète</b> peut aussi te maudire !</div><div class="lootbox-grid">`;LOOTBOXES.forEach(lb=>{const afford=G.gold>=lb.cost;const rarityClass={common:'lb-common',rare:'lb-rare',legendary:'lb-legendary'}[lb.rarity]||'lb-common';const badgeClass={common:'lb-badge-common',rare:'lb-badge-rare',legendary:'lb-badge-legendary'}[lb.rarity]||'lb-badge-common';html+=`<div class="lootbox-card ${rarityClass} ${!afford?'cant-afford':''}"><div class="lootbox-header"><div class="lootbox-emoji-wrap"><span class="lootbox-emoji-big">${lb.emoji}</span><span class="lootbox-rarity-badge ${badgeClass}">${lb.rarity.toUpperCase()}</span></div><div class="lootbox-info"><div class="lootbox-name">${lb.name}</div><div class="lootbox-desc">${lb.desc}</div><div class="lootbox-contents">🎁 ${lb.drawCount} récompenses · ${lb.contents}</div></div></div><div class="lootbox-footer"><div class="lootbox-price">💰 ${lb.cost}</div><button class="btn-open-lb" ${!afford?'disabled':''} onclick="${afford?("openLootbox('"+lb.id+"')"):''}"> ${!afford?'Manque d\'or':'Ouvrir 📦'}</button></div></div>`;});html+='</div>';}html+='</div>';panel.innerHTML=html;}
function setShopTab(tab){G.selectedShopTab=tab;renderShop();}
function buyItem(id){const item=SHOP_ITEMS.find(i=>i.id===id);if(!item)return;if(G.gold<item.cost){showToast('Pas assez d\'or !','bad');return;}if(item.type==='equip'&&G.equipped[id]){showToast('Déjà équipé !','bad');return;}G.gold-=item.cost;if(item.type==='equip'){G.equipped[id]=true;G.player[item.stat]=(G.player[item.stat]||0)+item.val;addLog(`⚔ Équipé : <b>${item.name}</b> (+${item.val} ${item.stat})`,'skill');showToast(`${item.emoji} ${item.name} équipé !`,'good');}else if(item.type==='plot'){let added=0;for(let i=0;i<G.plots.length&&added<item.val;i++){if(G.plots[i].locked){G.plots[i].locked=false;added++;}}if(added===0){const s=G.plots.length;for(let j=0;j<item.val;j++)G.plots.push({id:s+j,locked:false,crop:null,plantedAt:0,status:null});}showToast(`🟫 ${item.val} nouvelles parcelles !`,'good');if(document.getElementById('panelFarm').classList.contains('active'))renderFarm();}else{G.inventory[id]=(G.inventory[id]||0)+1;showToast(`${item.emoji} Acheté !`,'good');}updateHUD();renderShop();}
function buySeeds(id){const seed=SEEDS.find(s=>s.id===id);if(!seed)return;if(G.gold<seed.cost){showToast('Pas assez d\'or !','bad');return;}G.gold-=seed.cost;G.inventory[id]=(G.inventory[id]||0)+1;showToast(`${seed.emoji} ${seed.name} acheté !`,'good');updateHUD();renderShop();}

// ══════════════════════════════════
//  INVENTORY
// ══════════════════════════════════
function renderInv(){const panel=document.getElementById('panelInv');const p=G.player;const allItems=[...SEEDS.filter(s=>(G.inventory[s.id]||0)>0).map(s=>({...s,qty:G.inventory[s.id],src:'seed'})),...RECIPES.filter(r=>(G.cooked[r.id]||0)>0).map(r=>({...r,qty:G.cooked[r.id],src:'recipe'})),...SHOP_ITEMS.filter(s=>(G.inventory[s.id]||0)>0).map(s=>({...s,qty:G.inventory[s.id],src:'shop'}))];const slots=[...allItems];while(slots.length<20)slots.push(null);const skillRows=SKILLS_DEF.map(s=>{const lvl=G.skillLevels[s.id]||1;const xpHave=G.skills[s.id]||0;const xpBase=s.xpPerLevel[Math.min(lvl-1,s.xpPerLevel.length-1)]||0;const xpNext=s.xpPerLevel[Math.min(lvl,s.xpPerLevel.length-1)]||s.xpPerLevel[s.xpPerLevel.length-1];const prog=Math.min(100,((xpHave-xpBase)/(xpNext-xpBase))*100)||0;return`<div style="display:flex;align-items:center;gap:0.4rem;padding:0.2rem 0;"><span style="font-size:0.9rem">${s.icon}</span><span style="font-family:'Raleway',sans-serif;font-size:0.5rem;color:var(--text3);flex:1;text-transform:uppercase;letter-spacing:0.06em;">${s.name}</span><span style="font-family:'DM Mono',monospace;font-size:0.78rem;color:var(--green)">${lvl}</span><div style="width:45px;height:3px;background:rgba(255,255,255,0.04)"><div style="height:100%;width:${prog}%;background:var(--green)"></div></div></div>`;}).join('');panel.innerHTML=`<div class="inv-panel"><div style="background:var(--panel2);border:1px solid var(--border);padding:0.7rem;margin-bottom:0.6rem;"><div class="section-title" style="font-size:0.6rem">📊 ${G.playerName}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-bottom:0.5rem;"><div style="font-size:0.65rem;color:var(--text2);">⚔️ ATK : <b style="color:var(--green)">${p.atk}</b></div><div style="font-size:0.65rem;color:var(--text2);">🛡️ DEF : <b style="color:var(--green)">${p.def}</b></div><div style="font-size:0.65rem;color:var(--text2);">👟 SPD : <b style="color:var(--green)">${p.spd}</b></div><div style="font-size:0.65rem;color:var(--text2);">🏆 Victoires : <b style="color:var(--green)">${G.wins}</b></div><div style="font-size:0.65rem;color:var(--text2);">🔥 Série : <b style="color:var(--green)">${p.streak}</b></div><div style="font-size:0.65rem;color:var(--text2);">💰 Or : <b style="color:var(--amberbright)">${G.gold}</b></div></div><div style="border-top:1px solid var(--border);padding-top:0.4rem">${skillRows}</div></div><div class="section-title" style="font-size:0.6rem">🎒 Sac à dos</div><div class="inv-grid">${slots.map(item=>!item?`<div class="inv-slot empty"></div>`:`<div class="inv-slot" onclick="useItemModal('${item.id}','${item.src}')"><span class="inv-slot-emoji">${item.emoji}</span><span class="inv-slot-qty">${item.qty}</span><span class="inv-slot-name">${item.name.split(' ')[0]}</span></div>`).join('')}</div>${allItems.length===0?'<div style="text-align:center;padding:1.5rem;color:var(--text3);font-style:italic;font-size:0.75rem;">Ton sac est vide.</div>':''}</div>`;}
function useItemModal(id,src){let obj=null;if(src==='seed')obj=SEEDS.find(s=>s.id===id);else if(src==='recipe')obj=RECIPES.find(r=>r.id===id);else obj=SHOP_ITEMS.find(s=>s.id===id);if(!obj)return;showModal(`${obj.emoji} ${obj.name}`,obj.desc||'',[],[{label:'Utiliser',primary:true,action:`${src==='recipe'?("useCookedDish('"+id+"')"):(src==='seed'?("useRawSeed('"+id+"')"):"usePotion('"+id+"')")}`},{label:'Fermer',action:'closeModal()'}]);}

// ══════════════════════════════════
//  XP / LEVELING
// ══════════════════════════════════
function gainXP(amount){G.xp+=amount;const maxLvl=LEVEL_XP.length;while(G.level<maxLvl&&G.xp>=LEVEL_XP[G.level]){G.level++;G.player.maxHp+=10;G.player.hp+=10;G.player.atk+=2;if(G.level%2===0)G.player.def+=2;const bonuses=['+10 HP Max','+2 ATK'];if(G.level%2===0)bonuses.push('+2 DEF');document.getElementById('luTitle').textContent=`NIVEAU ${G.level} !`;document.getElementById('luIcon').textContent='⭐';document.getElementById('luSub').textContent='Tu deviens plus puissant !';document.getElementById('luBonuses').innerHTML=bonuses.map(b=>`<div class="lu-bonus">${b}</div>`).join('');document.getElementById('levelupOverlay').classList.add('show');if(G.level===5)setTimeout(()=>triggerStory('level5'),1200);if(G.level===10)setTimeout(()=>triggerStory('level10'),1200);}updateHUD();}
function gainSkillXp(skillId,amount){const def=SKILLS_DEF.find(s=>s.id===skillId);if(!def)return;G.skills[skillId]=(G.skills[skillId]||0)+amount;const curLvl=G.skillLevels[skillId]||1;const maxSkillLvl=def.xpPerLevel.length-1;if(curLvl<maxSkillLvl&&G.skills[skillId]>=def.xpPerLevel[curLvl]){G.skillLevels[skillId]=curLvl+1;document.getElementById('luTitle').textContent=`${def.name.toUpperCase()} ${curLvl+1} !`;document.getElementById('luIcon').textContent=def.icon;document.getElementById('luSub').textContent=`Niveau ${def.name} augmente !`;document.getElementById('luBonuses').innerHTML=`<div class="lu-bonus">Niveau ${curLvl+1}</div>`;document.getElementById('levelupOverlay').classList.add('show');addLog(`${def.icon} <b>${def.name}</b> → Niveau ${curLvl+1} !`,'skill');showToast(`${def.icon} ${def.name} Niv.${curLvl+1} !`,'level');}renderDrawerSkills();renderSidebarSkills();}
function closeLevelUp(){document.getElementById('levelupOverlay').classList.remove('show');updateHUD();}

// ══════════════════════════════════
//  MODAL
// ══════════════════════════════════
function showModal(title,desc,extra,actions){document.getElementById('modalTitle').textContent=title;document.getElementById('modalDesc').textContent=desc;document.getElementById('modalExtra').innerHTML=extra||'';const el=document.getElementById('modalActions');el.innerHTML='';(actions||[]).forEach(a=>{const btn=document.createElement('button');btn.innerHTML=a.label;btn.className=a.primary?'btn-modal':'btn-modal secondary';btn.setAttribute('onclick',a.action);el.appendChild(btn);});document.getElementById('modalOverlay').classList.add('open');}
function closeModal(){document.getElementById('modalOverlay').classList.remove('open');}
function onModalBgClick(e){if(e.target===document.getElementById('modalOverlay'))closeModal();}

// ══════════════════════════════════
//  FX
// ══════════════════════════════════
let _toastTimer;
function showToast(msg,type=''){const el=document.getElementById('toast');el.textContent=msg;el.className=`toast show ${type}`;clearTimeout(_toastTimer);_toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
function addLog(msg,type='sys'){const log=document.getElementById('chatLog');if(!log)return;const line=document.createElement('div');line.className=`chat-line ${type}`;line.innerHTML=msg;log.appendChild(line);log.scrollTop=log.scrollHeight;if(log.children.length>60)log.removeChild(log.firstChild);}
function spawnDmgAt(text,relEl,cls){const el=document.createElement('div');el.className=`dmg-float ${cls}`;el.textContent=text;if(relEl){const r=relEl.getBoundingClientRect();el.style.left=(r.left+r.width/2-20)+'px';el.style.top=(r.top-10)+'px';}document.body.appendChild(el);setTimeout(()=>el.remove(),950);}

// ══════════════════════════════════
//  EVENTS
// ══════════════════════════════════
document.addEventListener('touchmove',e=>{if(document.getElementById('screenGame').classList.contains('active')){const scrollable=e.target.closest('.tab-panel,.seeds-grid,.shop-panel,.inv-panel,.recipes-panel,.quests-panel,.modal-box,.chat-log,.lootbox-grid,.nav-drawer');if(!scrollable)e.preventDefault();}},{passive:false});
document.addEventListener('DOMContentLoaded',()=>{checkQuestNotif();});
