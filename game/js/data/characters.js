// ============================================================
// data/characters.js — Héros, ennemis, régions, dialogues
// ============================================================

export const HEROES = {
  fraise: {
    id:'fraise', name:'Fraise', type:'hero', class:'Guerrière Fruitée', sprite:'fraise',
    hp:110, atk:75, def:55, spd:90,
    quote: '\"Je suis douce… jusqu\'à ce que ça crame.\"',
    special: {
      name:'🍓 Rafale Rouge',
      fn:(hero)=>{
        const hits=[
          Math.max(1,Math.floor(hero.atk*0.5+Math.random()*15)),
          Math.max(1,Math.floor(hero.atk*0.5+Math.random()*15)),
          Math.max(1,Math.floor(hero.atk*0.6+Math.random()*20)),
        ];
        return { dmg:hits.reduce((a,b)=>a+b,0), log:'🍓 RAFALE ROUGE — '+hits.join(' + ')+' dégâts !', type:'multi' };
      },
    },
    narratorLines: {
      win:    ['La cantine appartient aux petits fruits rouges !','Fraise prouve que le plus fort n\'est pas toujours le plus grand.','La victoire a un goût sucré… exactement comme elle.'],
      lose:   ['Fraise tombe. Mais elle se relèvera.','Même les meilleurs fruits tombent parfois.'],
      attack: ['Fraise bondit comme une balle de flipper !','La guerrière fruitée frappe sans pitié.','Coup direct ! La cantine tremble.'],
    },
  },
  poire: {
    id:'poire', name:'Poire', type:'hero', class:'Mage de la Fraîcheur', sprite:'poire',
    hp:95, atk:65, def:70, spd:75,
    quote: '\"La patience, c\'est ma plus grande arme.\"',
    special: {
      name:'🍐 Onde Juteuse',
      fn:(hero)=>{
        const heal=Math.floor(18+Math.random()*12);
        const dmg=Math.max(1,Math.floor(hero.atk*0.9+Math.random()*25));
        return { dmg, heal, log:'🍐 ONDE JUTEUSE — +'+heal+' PV soignés, '+dmg+' dégâts !', type:'heal' };
      },
    },
    narratorLines: {
      win:    ["La Poire, calme jusqu'au bout.",'Patience et ténacité — les vrais champions attendent leur heure.','Un combat maîtrisé de bout en bout.'],
      lose:   ["La Poire s'incline avec dignité.",'Défaite, mais la tête haute.'],
      attack: ['La Poire frappe avec une précision chirurgicale !','Coup stratégique ! La Poire ne laisse rien au hasard.','Attaque calculée de la Mage de la Fraîcheur.'],
    },
  },
  patate: {
    id:'patate', name:'Patate Hongroise', type:'hero', class:'Colosse du Goulash', sprite:'patate',
    hp:130, atk:70, def:85, spd:55,
    quote: '\"Je suis lente… mais quand j\'arrive, tu le regrettes.\"',
    special: {
      name:'🥔 Frappe du Goulash',
      fn:(hero)=>{
        const dmg=Math.max(1,Math.floor(hero.atk*3.5+Math.random()*60));
        return { dmg, log:'🥔 FRAPPE DU GOULASH — '+dmg+' dégâts CATACLYSMIQUES !', type:'crit' };
      },
    },
    narratorLines: {
      win:    ['La Patate Hongroise prouve que la lenteur est une force !','Solide, implacable, victorieuse — comme un bon goulash.','Personne ne s\'attendait à ça. Personne.'],
      lose:   ['La Patate retombe. Elle rebondira.','Une défaite épicée. La revanche sera plus épicée encore.'],
      attack: ['La Patate s\'élance avec une force tellurique !','Le sol tremble sous les coups de la Colosse du Goulash !','Lente mais imparable — la Patate frappe !'],
    },
  },
};

// ─── Helpers de génération d'ennemis ────────────────────────────────────────
const special = (name, fn) => ({ name, fn });

const mkSpecial = (name, mult, rand, label='dégâts') =>
  special(name, (v) => {
    const dmg = Math.floor(v.atk * mult + Math.random() * rand);
    return { dmg, log: `${name} — ${dmg} ${label} !`, type:'crit' };
  });

const mkMultiSpecial = (name, hits) =>
  special(name, (v) => {
    const h = hits.map(m => Math.floor(v.atk * m + Math.random() * 20));
    const dmg = h.reduce((a,b)=>a+b,0);
    return { dmg, log: `${name} — ${h.join(' + ')} = ${dmg} dégâts !`, type:'multi' };
  });

export const ALL_ENEMIES = {
  // ── Région 1 : Forêt des Épices ───────────────────────────────────────────
  piment_sauvage: {
    id:'piment_sauvage', name:'Piment Sauvage', type:'villain', class:'Éclaireur de la Forêt',
    sprite:'piment', isBoss:false, hp:75, atk:55, def:40, spd:82,
    quote:'"Tu vas brûler."',
    special: mkSpecial('🌶️ FLAMME ÉPICÉE', 1.2, 18, 'dégâts brûlants'),
    phases:[
      {threshold:1.0, taunt:"La forêt m'appartient !", taunted:false},
      {threshold:0.4, taunt:"Impossible… je suis trop épicé pour ça !", taunted:false},
    ],
    narratorLines:{taunt:["Le Piment Sauvage crache ses flammes.","L'air devient irrespirable.","Ça brûle même à distance."]},
  },
  cannelle_corrompue: {
    id:'cannelle_corrompue', name:'Cannelle Corrompue', type:'villain', class:'Lieutenante Parfumée',
    sprite:'cannelle', isBoss:false, hp:95, atk:65, def:52, spd:70,
    quote:'"Mon parfum est mon poison."',
    special: mkSpecial('🍂 VOLUTE TOXIQUE', 1.35, 20, 'dégâts ensorcelants'),
    phases:[
      {threshold:1.0, taunt:'Tu trouveras cette odeur… inoubliable.', taunted:false},
      {threshold:0.4, taunt:'Ma corruption s\'étend. Tu ne peux pas gagner.', taunted:false},
    ],
    narratorLines:{taunt:['La Cannelle Corrompue ondule dans les airs.','Un parfum doux-amer envahit l\'arène.','Quelque chose de beau peut-il être si dangereux ?']},
  },
  grand_poivrier: {
    id:'grand_poivrier', name:'Grand Poivrier Noir', type:'villain', class:'Boss de la Forêt des Épices',
    sprite:'poivre', isBoss:true, hp:145, atk:78, def:62, spd:60,
    quote:'"J\'ai régné sur ces forêts depuis l\'éternité. Tu n\'es qu\'un grain de poussière."',
    special: mkSpecial('⚫ TEMPÊTE DE POIVRE', 1.7, 35, 'dégâts cataclysmiques'),
    phases:[
      {threshold:1.0, taunt:'Approche, petit intrus…', taunted:false},
      {threshold:0.6, taunt:'Tu oses me provoquer ? Bien.', taunted:false},
      {threshold:0.25,taunt:'IMPOSSIBLE. Je suis NOIR. Je suis ÉTERNEL !', taunted:false},
    ],
    narratorLines:{taunt:['Le Grand Poivrier Noir domine l\'arène de sa stature imposante.','L\'air se remplit d\'une odeur piquante et suffocante.','Le roi des épices n\'a pas encore montré sa vraie force.']},
  },

  // ── Région 2 : Désert du Sel ──────────────────────────────────────────────
  sardine_errante: {
    id:'sardine_errante', name:'Sardine Errante', type:'villain', class:'Égarée du Désert',
    sprite:'sardine', isBoss:false, hp:80, atk:58, def:44, spd:75,
    quote:'"Je suis perdue… mais je mords quand même."',
    special: mkSpecial('🐟 NAGEOIRE ACÉRÉE', 1.15, 16),
    phases:[
      {threshold:1.0, taunt:"Je ne sais même plus pourquoi je me bats.", taunted:false},
      {threshold:0.4, taunt:"Peu importe. Je finis ce que j'ai commencé.", taunted:false},
    ],
    narratorLines:{taunt:['La Sardine Errante se contorsionne dans le sable salé.','Une odeur de mer morte flotte dans l\'air brûlant.','Elle est perdue. Mais les animaux perdus sont les plus dangereux.']},
  },
  cornichon_ennemi: {
    id:'cornichon_ennemi', name:'Cornichon Raté', type:'villain', class:'Cornichon Avancé de la Cantine',
    sprite:'cornichon', isBoss:false, hp:90, atk:62, def:48, spd:88,
    quote:'"Tu croyais que j\'étais de ton côté ?"',
    special: mkSpecial('🥒 SPRAY ACIDE', 1.3, 22, 'dégâts corrosifs'),
    phases:[
      {threshold:1.0, taunt:'On se retrouve, cousin…', taunted:false},
      {threshold:0.55,taunt:'Tu pensais vraiment gagner ? Pathétique.', taunted:false},
      {threshold:0.2, taunt:'IMPOSSIBLE. Je suis FERMENTÉ. Je suis ÉTERNEL !', taunted:false},
    ],
    narratorLines:{taunt:['Le Cornichon Raté révèle sa vraie nature acide.','Une trahison marinée dans la cantine.','L\'air sent le vinaigre…']},
  },
  seigneur_anchois: {
    id:'seigneur_anchois', name:'Seigneur Anchois', type:'villain', class:'Boss du Désert du Sel',
    sprite:'anchois', isBoss:true, hp:150, atk:80, def:65, spd:55,
    quote:'"Mariné depuis cent ans. J\'ai vu des héros comme toi disparaître dans ce sel."',
    special: mkSpecial('🧂 VAGUE SALÉE', 1.75, 32, 'dégâts corrosifs'),
    phases:[
      {threshold:1.0, taunt:'Bienvenue dans mon désert, jeune naïf.', taunted:false},
      {threshold:0.6, taunt:'Résistance inutile. Le sel préserve tout… y compris la défaite.', taunted:false},
      {threshold:0.25,taunt:'CENT ANS DE SAUMURE. TU NE PEUX PAS ME VAINCRE !', taunted:false},
    ],
    narratorLines:{taunt:['Le Seigneur Anchois émerge des cristaux de sel.','Une puanteur noble et ancienne emplit l\'air du désert.','Il attend. Il a tout son temps. Il a toujours eu tout son temps.']},
  },

  // ── Région 3 : Marais du Vinaigre ────────────────────────────────────────
  algue_fantome: {
    id:'algue_fantome', name:'Algue Fantôme', type:'villain', class:'Spectre des Marais',
    sprite:'algue', isBoss:false, hp:70, atk:60, def:38, spd:95,
    quote:'"Tu ne peux pas frapper ce que tu ne vois pas."',
    special: mkSpecial('👻 ÉTREINTE VISQUEUSE', 1.1, 20, 'dégâts spectraux'),
    phases:[
      {threshold:1.0, taunt:'Rejoins-moi dans la brume…', taunted:false},
      {threshold:0.4, taunt:'Tu commences à me voir. Trop tard.', taunted:false},
    ],
    narratorLines:{taunt:['L\'Algue Fantôme glisse entre les vapeurs acides.','Quelque chose remue dans la brume du marais.','Elle est là. Elle n\'est plus là. Elle est partout.']},
  },
  sushi_ninja: {
    id:'sushi_ninja', name:'Sushi Ninja', type:'villain', class:'Ombre de la Cantine',
    sprite:'sushi', isBoss:false, hp:115, atk:72, def:55, spd:98,
    quote:'"Tu ne m\'as pas vu venir… et tu ne le verras jamais."',
    special: mkMultiSpecial('🍣 LAME DE RIZ', [0.7, 0.7, 0.8]),
    phases:[
      {threshold:1.0, taunt:'Je suis partout. Je suis nulle part.', taunted:false},
      {threshold:0.5, taunt:'Impressionnant… Tu mérites de voir ma vraie vitesse !', taunted:false},
      {threshold:0.15,taunt:'Impossible. Un ninja ne perd JAMAIS !', taunted:false},
    ],
    narratorLines:{taunt:['Le Sushi Ninja disparaît dans l\'ombre de la cantine.','Un frisson. Le sushi a bougé… mais où ?','L\'odeur du wasabi emplit l\'air. Le danger approche.']},
  },
  maitre_dojo: {
    id:'maitre_dojo', name:'Maître du Dojo Fermenté', type:'villain', class:'Boss des Marais du Vinaigre',
    sprite:'fermente', isBoss:true, hp:155, atk:82, def:68, spd:88,
    quote:'"Mes élèves t\'ont ralenti. Moi, je t\'arrêterai."',
    special: mkMultiSpecial('⚡ KATA DU VINAIGRE', [0.8, 0.8, 1.0]),
    phases:[
      {threshold:1.0, taunt:"Je t'attendais. Mes élèves m'ont dit que tu étais tenace.", taunted:false},
      {threshold:0.6, taunt:'Bien. Maintenant nous commençons vraiment.', taunted:false},
      {threshold:0.25,taunt:'IMPENSABLE. Personne ne défait le Maître dans ses propres marais !', taunted:false},
    ],
    narratorLines:{taunt:["Le Maître du Dojo Fermenté s'incline avant le combat — une formalité.",'"Dans ce marais, je suis le seul maître."','Il attend. Il observe. Il calcule.']},
  },

  // ── Région 4 : Pics Glacés du Sorbet ────────────────────────────────────
  esquimau_maudit: {
    id:'esquimau_maudit', name:'Esquimau Maudit', type:'villain', class:'Garde des Hauteurs',
    sprite:'esquimau', isBoss:false, hp:85, atk:60, def:58, spd:65,
    quote:'"Le froid préserve. Et toi, je vais te préserver ici pour toujours."',
    special: mkSpecial('🧊 POINTE GLACIALE', 1.25, 20, 'dégâts gelés'),
    phases:[
      {threshold:1.0, taunt:'La montagne est ma demeure. Tu es un intrus.', taunted:false},
      {threshold:0.4, taunt:'La Reine sera informée de ton arrivée… trop tard pour toi.', taunted:false},
    ],
    narratorLines:{taunt:["L'Esquimau Maudit craque sous l'effet du froid éternel.",'Le vent glacial amplifie ses cris de guerre.','Quelque chose de sucré et de mortel à la fois.']},
  },
  yeti_meringue: {
    id:'yeti_meringue', name:'Yéti Meringué', type:'villain', class:'Colosse des Neiges Sucrées',
    sprite:'yeti', isBoss:false, hp:120, atk:70, def:75, spd:45,
    quote:'"ROAAAAH… (il a l\'air en colère. Et recouvert de sucre.)"',
    special: mkSpecial('🤍 AVALANCHE MERINGUÉE', 1.5, 28, 'dégâts écrasants'),
    phases:[
      {threshold:1.0, taunt:'ROOAR.', taunted:false},
      {threshold:0.45,taunt:'ROOAAR !!!', taunted:false},
    ],
    narratorLines:{taunt:['Le Yéti Meringué secoue la montagne de son passage.','Une créature de neige et de sucre… plus redoutable qu\'elle n\'y paraît.','Il ne parle pas. Il frappe.']},
  },
  reine_glace: {
    id:'reine_glace', name:'Reine Glace', type:'villain', class:'Boss des Pics Glacés — Ancienne Cheffe Pâtissière',
    sprite:'glace', isBoss:true, hp:160, atk:83, def:70, spd:72,
    quote:'"Dix ans d\'exil dans le froid. Et maintenant tu oses venir ici ? Je vais te geler sur place."',
    special: mkSpecial('❄️ BLIZZARD ROYAL', 1.8, 38, 'dégâts dévastateurs'),
    phases:[
      {threshold:1.0, taunt:"Dix ans. Dix ans que j'attends ce moment.", taunted:false},
      {threshold:0.6, taunt:'Tu es meilleur que je ne le pensais. Cela ne changera rien.', taunted:false},
      {threshold:0.25,taunt:"NON. Cette cantine m'APPARTIENT. Je reviendrai ! Le froid ne meurt JAMAIS !", taunted:false},
    ],
    narratorLines:{taunt:['La Reine Glace descend de son trône de cristal.','"La chaleur de tes convictions ne te protégera pas du froid."','Elle est belle. Elle est dangereuse. Elle est brisée.']},
  },

  // ── Région 5 : Volcan de la Cantine ──────────────────────────────────────
  garde_tomate: {
    id:'garde_tomate', name:'Garde Tomate', type:'villain', class:'Sentinelle du Volcan',
    sprite:'tomate', isBoss:false, hp:90, atk:65, def:55, spd:70,
    quote:'"Nul ne passe. Ordres du Seigneur Banane."',
    special: mkSpecial('🍅 JET DE SAUCE', 1.2, 18, 'dégâts brûlants'),
    phases:[
      {threshold:1.0, taunt:'Le Seigneur Banane a prévu ta venue.', taunted:false},
      {threshold:0.4, taunt:'Tu ne vas pas plus loin. Je te le jure.', taunted:false},
    ],
    narratorLines:{taunt:['Le Garde Tomate poste sa position avec discipline.','Rouge sang, prêt à mourir pour son maître.','La lave derrière lui rougeoie de la même couleur que lui.']},
  },
  banane_corrompue: {
    id:'banane_corrompue', name:'Banane Corrompue', type:'villain', class:'Champion Déchu du Volcan',
    sprite:'banane1', isBoss:false, hp:125, atk:75, def:60, spd:68,
    quote:'"J\'étais comme toi. Avant que Banane m\'offre quelque chose de mieux."',
    special: mkSpecial('🍌 COUP DU RENÉGAT', 1.45, 25, 'dégâts traîtres'),
    phases:[
      {threshold:1.0, taunt:'Ne le prends pas personnellement.', taunted:false},
      {threshold:0.45,taunt:'Il est trop tard pour reculer maintenant. Pour l\'un de nous deux.', taunted:false},
    ],
    narratorLines:{taunt:['La Banane Corrompue sourit — un sourire qu\'elle a appris du Seigneur.','Elle connaît tes forces. Elle les retournera contre toi.','Une âme perdue. Un adversaire redoutable.']},
  },
  banane: {
    id:'banane', name:'Banane, Seigneur Suprême', type:'villain', class:'Boss Final — Seigneur Suprême de la Cantine',
    sprite:'banane2', isBoss:true, hp:180, atk:90, def:72, spd:65,
    quote:'"Tu as traversé cinq régions pour arriver jusqu\'à moi. Impressionnant. Inutile."',
    special: special('🍌 POTASSIUM FURIE ABSOLUE', (v)=>{
      const dmg = Math.floor(v.atk*2.0+Math.random()*45);
      return { dmg, log:'🍌 POTASSIUM FURIE ABSOLUE — '+dmg+' dégâts cataclysmiques !', type:'crit' };
    }),
    phases:[
      {threshold:1.0, taunt:'Bienvenue au bout du monde, petit champion.', taunted:false},
      {threshold:0.6, taunt:"Cinq régions… mais tu n'es toujours qu'une collation.", taunted:false},
      {threshold:0.3, taunt:'IMPOSSIBLE. Je suis BANANE. Je suis ÉTERNEL. LA CANTINE M\'APPARTIENT !!!', taunted:false},
    ],
    narratorLines:{taunt:['Banane ricane depuis son trône de lave solidifiée.','Le Seigneur Suprême de la Cantine n\'a jamais perdu.','Cinq régions. Et voilà le dernier obstacle entre toi et la légende.']},
  },
};

export const REGIONS = [
  {
    id:'foret_epices', name:'La Forêt des Épices', num:1,
    icon:'🌿', color:'#639922', colorBg:'rgba(99,153,34,0.12)', colorBorder:'rgba(99,153,34,0.4)',
    biome:'Jungle tropicale — parfumée et traîtresse',
    story:"Les épices se sont révoltées. Depuis que le Grand Poivrier a été renversé de son piédestal par des forces obscures, ses lieutenants règnent sur la forêt et empoisonnent les récoltes. La cantine commence à manquer de saveur — et c'est une catastrophe sans précédent.",
    enemies:['piment_sauvage','cannelle_corrompue','grand_poivrier'],
  },
  {
    id:'desert_sel', name:'Le Désert du Sel', num:2,
    icon:'🏜️', color:'#BA7517', colorBg:'rgba(186,117,23,0.12)', colorBorder:'rgba(186,117,23,0.4)',
    biome:'Plaines arides — cristaux de sel à perte de vue',
    story:"Jadis terres de préservation et de conservation, le Désert du Sel est tombé sous le joug du Seigneur Anchois — une créature marinée depuis si longtemps qu'elle est devenue immortelle. Quiconque s'aventure ici finit… salé.",
    enemies:['sardine_errante','cornichon_ennemi','seigneur_anchois'],
  },
  {
    id:'marais_vinaigre', name:'Les Marais du Vinaigre', num:3,
    icon:'🌫️', color:'#7F77DD', colorBg:'rgba(127,119,221,0.12)', colorBorder:'rgba(127,119,221,0.4)',
    biome:'Zones humides et acides — brume permanente',
    story:"Un endroit où tout est aigre — l'air, l'eau, les habitants. Le Maître du Dojo Fermenté est né ici, formé par les vapeurs du vinaigre de riz. Ses disciples sont invisibles, rapides, et ne pardonnent jamais une attaque ratée.",
    enemies:['algue_fantome','sushi_ninja','maitre_dojo'],
  },
  {
    id:'pics_sorbet', name:'Les Pics Glacés du Sorbet', num:4,
    icon:'🧊', color:'#378ADD', colorBg:'rgba(55,138,221,0.12)', colorBorder:'rgba(55,138,221,0.4)',
    biome:'Montagnes enneigées — cristaux de sucre gelé',
    story:"Là-haut, le froid conserve tout — y compris les rancœurs. La Reine Glace, ancienne cheffe pâtissière de la cantine, a été renvoyée il y a dix ans pour avoir surgelé un élève par mégarde. Elle n'a pas oublié. Elle n'a pas pardonné.",
    enemies:['esquimau_maudit','yeti_meringue','reine_glace'],
  },
  {
    id:'volcan_cantine', name:'Le Volcan de la Cantine', num:5,
    icon:'🌋', color:'#D85A30', colorBg:'rgba(216,90,48,0.12)', colorBorder:'rgba(216,90,48,0.4)',
    biome:'Caldeira en fusion — laves de sauce tomate',
    story:"Au cœur du monde, là où la chaleur des fourneaux a tout consumé. Banane s'est autoproclamé Seigneur Suprême de la Cantine depuis sa citadelle de lave. Pour le vaincre, il faudra avoir tout traversé — et s'en souvenir.",
    enemies:['garde_tomate','banane_corrompue','banane'],
  },
];

// ── Dialogues ─────────────────────────────────────────────────────────────────
// Format : DIALOGUES[villainId].hero[heroId] = [ {speaker, text}, … ]
export const DIALOGUES = {
  piment_sauvage: { hero: {
    fraise: [
      {speaker:'fraise',         text:"Cette forêt sent bon. Mais toi, tu pues la trahison."},
      {speaker:'piment_sauvage', text:"Brave petite fraise… Tu vas brûler comme les autres."},
      {speaker:'fraise',         text:"J'ai survécu à pire. En avant."},
    ],
    poire: [
      {speaker:'poire',          text:"Tu bloques le passage. Je préférerais qu'on règle ça calmement."},
      {speaker:'piment_sauvage', text:"Calme ? Dans cette forêt ? Rien n'est calme ici."},
      {speaker:'poire',          text:"Comme tu veux."},
    ],
    patate: [
      {speaker:'piment_sauvage', text:"Une Patate ? Sérieusement ? T'as pas peur de moi ?"},
      {speaker:'patate',         text:"Non."},
      {speaker:'piment_sauvage', text:"Tu aurais dû."},
    ],
  }},

  cannelle_corrompue: { hero: {
    fraise: [
      {speaker:'cannelle_corrompue', text:"Quel parfum adorable tu as, petite fraise. Dommage que ça s'arrête ici."},
      {speaker:'fraise',             text:"Épargne-moi le discours. Attaque ou dégage."},
      {speaker:'cannelle_corrompue', text:"Quelle impatience… Je vais prendre mon temps, moi."},
    ],
    poire: [
      {speaker:'poire',              text:"Tu étais du bon côté, autrefois. Qu'est-ce qui t'a corrompue ?"},
      {speaker:'cannelle_corrompue', text:"Le pouvoir, ma chère. Le Grand Poivrier m'a offert quelque chose que la cantine ne m'aurait jamais donné."},
      {speaker:'poire',              text:"C'était une erreur. Je vais te le prouver."},
    ],
    patate: [
      {speaker:'cannelle_corrompue', text:"Ah… La Patate Hongroise. J'ai entendu parler de toi."},
      {speaker:'patate',             text:"Bonne chose. Ça m'évite de me présenter."},
    ],
  }},

  grand_poivrier: { hero: {
    fraise: [
      {speaker:'grand_poivrier', text:"Tu as vaincu mes lieutenants. Impressionnant… pour une fraise."},
      {speaker:'fraise',         text:"Et je vais faire pareil avec toi. Moins de discours, plus de combat."},
      {speaker:'grand_poivrier', text:"Soit. La Forêt des Épices sera ton tombeau, petite."},
      {speaker:'fraise',         text:"On verra ça."},
    ],
    poire: [
      {speaker:'grand_poivrier', text:"J'ai régné sur ces forêts depuis l'éternité. Toi, tu es née il y a quoi — quelques saisons ?"},
      {speaker:'poire',          text:"La sagesse ne se mesure pas en années, Grand Poivrier. Elle se mesure en choix."},
      {speaker:'grand_poivrier', text:"Philosophique. Mais les philosophes ne survivent pas longtemps dans mon domaine."},
    ],
    patate: [
      {speaker:'grand_poivrier', text:"Une Patate. Mes lieutenants ont été vaincus… par une Patate."},
      {speaker:'patate',         text:"C'est souvent comme ça que ça finit."},
      {speaker:'grand_poivrier', text:"Pas aujourd'hui."},
      {speaker:'patate',         text:"Si."},
    ],
  }},

  sardine_errante: { hero: {
    fraise: [
      {speaker:'sardine_errante', text:"Je cherche juste une sortie de ce désert… mais si tu veux te battre, très bien."},
      {speaker:'fraise',          text:"Je suis désolée. Mais tu bloques mon chemin."},
      {speaker:'sardine_errante', text:"Tout le monde bloque le chemin de quelqu'un dans ce monde."},
    ],
    poire: [
      {speaker:'poire',           text:"Tu n'as pas l'air de vouloir vraiment te battre."},
      {speaker:'sardine_errante', text:"Non. Mais le Seigneur Anchois me surveille. Je n'ai pas le choix."},
      {speaker:'poire',           text:"Tu as toujours le choix. Je te le prouverai après."},
    ],
    patate: [
      {speaker:'sardine_errante', text:"Tu viens d'où, toi ? La Forêt des Épices ?"},
      {speaker:'patate',          text:"Oui."},
      {speaker:'sardine_errante', text:"Alors tu sais ce que c'est d'être loin de chez soi."},
      {speaker:'patate',          text:"Oui. Et je sais aussi comment rentrer."},
    ],
  }},

  cornichon_ennemi: { hero: {
    fraise: [
      {speaker:'fraise',          text:"Toi encore. Je croyais qu'on en avait fini."},
      {speaker:'cornichon_ennemi',text:"Le Désert du Sel conserve tout, petite fraise. Moi y compris."},
      {speaker:'fraise',          text:"Alors je vais devoir t'écraser une deuxième fois."},
    ],
    poire: [
      {speaker:'cornichon_ennemi',text:"Tu croyais que j'étais de ton côté. Erreur."},
      {speaker:'poire',           text:"Je n'ai jamais pensé ça. J'ai toujours senti le vinaigre sur toi."},
      {speaker:'cornichon_ennemi',text:"...Malin. Ça ne changera rien."},
    ],
    patate: [
      {speaker:'cornichon_ennemi',text:"La Patate Hongroise. Je t'attendais."},
      {speaker:'patate',          text:"C'est une erreur d'attendre quelqu'un qui arrive quand même."},
    ],
  }},

  seigneur_anchois: { hero: {
    fraise: [
      {speaker:'seigneur_anchois',text:"Mariné depuis cent ans. Et toi ? Fraîche d'hier. Quelle différence…"},
      {speaker:'fraise',          text:"La fraîcheur, justement. C'est ce qui me donne l'avantage."},
      {speaker:'seigneur_anchois',text:"Ha. Ha. Ha. Tu es charmante, petite. Ce sera vite terminé."},
      {speaker:'fraise',          text:"Pareil."},
    ],
    poire: [
      {speaker:'seigneur_anchois',text:"La Poire. Douce, patiente… et inutile dans ce désert."},
      {speaker:'poire',           text:"L'immortalité ne t'a pas rendu plus intelligent, je vois."},
      {speaker:'seigneur_anchois',text:"Insolente. Cent ans d'ici, tu ne seras plus qu'un souvenir."},
      {speaker:'poire',           text:"Dans cent ans, ce désert sera libre. Je commence maintenant."},
    ],
    patate: [
      {speaker:'seigneur_anchois',text:"Une Patate… dans mon désert. C'est presque touchant."},
      {speaker:'patate',          text:"Je ne suis pas venue pour être touchante."},
      {speaker:'seigneur_anchois',text:"Non ? Alors pourquoi ?"},
      {speaker:'patate',          text:"Pour te battre."},
    ],
  }},

  algue_fantome: { hero: {
    fraise: [
      {speaker:'algue_fantome',text:"Rejoins-moi dans la brume, petite fraise…"},
      {speaker:'fraise',       text:"Très peu pour moi. Montre-toi d'abord."},
      {speaker:'algue_fantome',text:"Comme tu voudras."},
    ],
    poire: [
      {speaker:'poire',        text:"Je t'entends. Tu es juste à gauche, dans la vapeur."},
      {speaker:'algue_fantome',text:"Comment…? Personne ne me voit jamais."},
      {speaker:'poire',        text:"Je n'ai pas besoin de te voir. Je t'écoute."},
    ],
    patate: [
      {speaker:'algue_fantome',text:"Tu ne peux pas frapper ce que tu ne vois pas."},
      {speaker:'patate',       text:"Je frappe fort. Peu importe où tu es, ça va faire mal."},
    ],
  }},

  sushi_ninja: { hero: {
    fraise: [
      {speaker:'fraise',      text:"Je ne t'entends pas… mais je te sens, Ninja."},
      {speaker:'sushi_ninja', text:"Impressionnant. La plupart ne remarquent même pas ma présence."},
      {speaker:'fraise',      text:"La plupart ne sont pas moi."},
    ],
    poire: [
      {speaker:'poire',       text:"Tu te caches dans les ombres. Mais les ombres ont une forme."},
      {speaker:'sushi_ninja', text:"Philosophique. Pour quelqu'un qui va perdre."},
      {speaker:'poire',       text:"Nous verrons lequel de nous deux a raison."},
    ],
    patate: [
      {speaker:'sushi_ninja', text:"Une Patate ? Vraiment ? Ils t'ont envoyée, toi ?"},
      {speaker:'patate',      text:"Ils ne m'ont pas envoyée. Je suis venue de moi-même."},
    ],
  }},

  maitre_dojo: { hero: {
    fraise: [
      {speaker:'maitre_dojo',text:"Mes élèves t'ont dit que j'étais dangereux. Tu es venue quand même."},
      {speaker:'fraise',     text:"On m'a dit beaucoup de choses. Ça ne m'arrête jamais."},
      {speaker:'maitre_dojo',text:"Tu mourras courageusement, au moins."},
      {speaker:'fraise',     text:"Non. Je gagnerai courageusement."},
    ],
    poire: [
      {speaker:'maitre_dojo',text:"La Mage de la Fraîcheur… dans mes marais acides. Tu dois souffrir."},
      {speaker:'poire',      text:"L'adaptation, c'est ce qui sépare les vrais combattants des imposteurs."},
      {speaker:'maitre_dojo',text:"Bien dit. Prouve-le."},
    ],
    patate: [
      {speaker:'maitre_dojo',text:"Je t'observe depuis que tu as mis le pied dans mes marais."},
      {speaker:'patate',     text:"Je sais. Tu fais beaucoup de bruit pour quelqu'un qui se dit discret."},
      {speaker:'maitre_dojo',text:"...Intéressante remarque."},
      {speaker:'patate',     text:"Commençons."},
    ],
  }},

  esquimau_maudit: { hero: {
    fraise: [
      {speaker:'esquimau_maudit',text:"La montagne est ma demeure. Tu es une intruse."},
      {speaker:'fraise',         text:"Je ne fais que passer. Mais si tu veux te battre, sois-en sûr."},
      {speaker:'esquimau_maudit',text:"La Reine Glace sera informée de ton arrivée. Trop tard pour toi."},
    ],
    poire: [
      {speaker:'poire',          text:"Tu sers la Reine Glace de ton plein gré ?"},
      {speaker:'esquimau_maudit',text:"Je la sers parce qu'elle seule comprend ce que c'est d'être oublié."},
      {speaker:'poire',          text:"Elle t'a menti. La solitude n'est pas une identité. C'est une prison."},
      {speaker:'esquimau_maudit',text:"Assez parlé."},
    ],
    patate: [
      {speaker:'esquimau_maudit',text:"Tu viens de loin pour mourir de froid ici."},
      {speaker:'patate',         text:"Je viens de plus loin que tu ne crois. Et je suis encore là."},
    ],
  }},

  yeti_meringue: { hero: {
    fraise: [
      {speaker:'yeti_meringue',text:"ROOAR."},
      {speaker:'fraise',       text:"Vraiment ? C'est tout ce que t'as à dire ?"},
      {speaker:'yeti_meringue',text:"ROOAAR !!!"},
      {speaker:'fraise',       text:"Bon. On fait ça à la dure alors."},
    ],
    poire: [
      {speaker:'yeti_meringue',text:"ROOAR."},
      {speaker:'poire',        text:"Je vois. Tu es un Yéti de peu de mots. Soit."},
    ],
    patate: [
      {speaker:'yeti_meringue',text:"ROOAR."},
      {speaker:'patate',       text:"Ouais."},
    ],
  }},

  reine_glace: { hero: {
    fraise: [
      {speaker:'reine_glace',text:"Dix ans d'exil. Dix ans dans ce froid. Et maintenant tu oses venir ici ?"},
      {speaker:'fraise',     text:"Quelqu'un devait le faire."},
      {speaker:'reine_glace',text:"Cette cantine m'a tout pris. Je vais reprendre ce qui m'appartient."},
      {speaker:'fraise',     text:"La cantine n'appartient à personne. C'est pour ça qu'on se bat."},
    ],
    poire: [
      {speaker:'reine_glace',text:"La Mage de la Fraîcheur. Quelle ironie de se battre dans le froid."},
      {speaker:'poire',      text:"La fraîcheur et le froid sont deux choses différentes. Toi, tu es froide. Moi, je suis fraîche."},
      {speaker:'reine_glace',text:"Distinction poétique. Elle ne te sauvera pas."},
      {speaker:'poire',      text:"On verra."},
    ],
    patate: [
      {speaker:'reine_glace',text:"Une Patate Hongroise a traversé quatre régions pour arriver jusqu'ici ?"},
      {speaker:'patate',     text:"Oui."},
      {speaker:'reine_glace',text:"Pourquoi ?"},
      {speaker:'patate',     text:"Parce que quelqu'un devait."},
      {speaker:'reine_glace',text:"…Respectueux. Mais insuffisant."},
    ],
  }},

  garde_tomate: { hero: {
    fraise: [
      {speaker:'garde_tomate',text:"Nul ne passe. Ordres du Seigneur Banane."},
      {speaker:'fraise',      text:"Je passe quand même."},
      {speaker:'garde_tomate',text:"Alors tu mourras ici."},
      {speaker:'fraise',      text:"C'est toi qui mourras. Mais pas littéralement — tu vas juste perdre."},
    ],
    poire: [
      {speaker:'poire',       text:"Tu n'es pas obligé de te battre pour lui."},
      {speaker:'garde_tomate',text:"Le Seigneur Banane a prévu ta venue. Il savait que tu dirais ça."},
      {speaker:'poire',       text:"Et tu te bats quand même. Triste."},
    ],
    patate: [
      {speaker:'garde_tomate',text:"Quatre régions traversées. Impressionnant. Mais ça s'arrête ici."},
      {speaker:'patate',      text:"Non."},
    ],
  }},

  banane_corrompue: { hero: {
    fraise: [
      {speaker:'banane_corrompue',text:"J'étais comme toi. Un champion. Avant que Banane m'offre… autre chose."},
      {speaker:'fraise',          text:"Il t'a corrompue. Tu appelles ça \"autre chose\" ?"},
      {speaker:'banane_corrompue',text:"Ne le prends pas personnellement. C'est juste du business."},
      {speaker:'fraise',          text:"Si. Je le prends personnellement."},
    ],
    poire: [
      {speaker:'banane_corrompue',text:"Tu sais ce qui m'attend si je te laisse passer ? Banane me détruira."},
      {speaker:'poire',           text:"Et si tu me laisses gagner, je t'aiderai à t'en sortir. C'est ma promesse."},
      {speaker:'banane_corrompue',text:"Les promesses ne survivent pas au Volcan."},
      {speaker:'poire',           text:"Celles-là, si."},
    ],
    patate: [
      {speaker:'banane_corrompue',text:"La Colosse du Goulash. Tu es arrivée jusqu'ici. C'est… réel."},
      {speaker:'patate',          text:"Tu peux encore choisir ton camp."},
      {speaker:'banane_corrompue',text:"Il est trop tard pour moi."},
      {speaker:'patate',          text:"Il n'est jamais trop tard."},
    ],
  }},

  banane: { hero: {
    fraise: [
      {speaker:'banane',text:"Cinq régions. Tu as vaincu tous mes champions. Petite Fraise… quelle touchante ambition."},
      {speaker:'fraise',text:"Je ne suis pas venue faire de l'ambition. Je suis venue finir ça."},
      {speaker:'banane',text:"Ha. Ha. Ha. Alors finissons."},
      {speaker:'fraise',text:"Avec plaisir."},
    ],
    poire: [
      {speaker:'banane',text:"La Poire. Douce, posée, patiente… Tu as traversé tout ça avec ton calme légendaire ?"},
      {speaker:'poire', text:"La patience est pourquoi je suis encore debout. Et toi, tu te demandes déjà si tu vas tomber."},
      {speaker:'banane',text:"Insolente."},
      {speaker:'poire', text:"Réaliste."},
    ],
    patate: [
      {speaker:'banane', text:"La Patate Hongroise. Je dois admettre… je ne m'y attendais pas. Pas toi."},
      {speaker:'patate', text:"Personne ne s'y attend jamais."},
      {speaker:'banane', text:"Tu sais ce qui arrive aux patates, n'est-ce pas ? On les écrase."},
      {speaker:'patate', text:"Tu confonds. On nous cuit. Et après… on est irrésistibles."},
      {speaker:'banane', text:"…Bien dit. Mais ça ne changera rien."},
    ],
  }},
};
