export const DIFFICULTIES = {
  easy: { label: 'Kolay', color: '#39ff14', costMult: 0.5, wageMult: 0.5, xpMult: 1.5, moneyStart: 15000, desc: 'Maliyet ×0.5 | Ücret ×0.5 | XP ×1.5' },
  normal: { label: 'Normal', color: '#00d4ff', costMult: 1, wageMult: 1, xpMult: 1, moneyStart: 3000, desc: 'Standart oyun deneyimi' },
  hard: { label: 'Zor', color: '#ff6b35', costMult: 1.8, wageMult: 1.5, xpMult: 0.8, moneyStart: 800, desc: 'Maliyet ×1.8 | Ücret ×1.5 | XP ×0.8' },
  insane: { label: 'Çılgın', color: '#ff00ff', costMult: 3, wageMult: 2.5, xpMult: 0.5, moneyStart: 200, desc: 'Maliyet ×3 | Ücret ×2.5 | XP ×0.5' },
};

export const ZONE_INFO = [
  { zone: 1, name: 'Sanayi Çağı', era: '⚙️ Endüstri', multi: 1, color: '#00d4ff', theme: '', icon: '🏭', desc: 'Ham madde ve temel sanayi' },
  { zone: 2, name: 'Ticaret Çağı', era: '⚓ Deniz Ticareti', multi: 2, color: '#39ff14', theme: 'zone-2-theme', icon: '🚢', desc: 'Küresel ticaret ağları ve finans' },
  { zone: 3, name: 'Uzay Çağı', era: '🚀 Uzay Keşfi', multi: 5, color: '#a855f7', theme: 'zone-3-theme', icon: '🛸', desc: 'İnsanlığın yıldızlara uzanışı' },
  { zone: 4, name: 'Ay Kolonisi', era: '🌕 Ay Medeniyeti', multi: 10, color: '#ff6b35', theme: 'zone-4-theme', icon: '🌕', desc: 'Ay yüzeyinde kalıcı yerleşim' },
  { zone: 5, name: 'Mars İmparatorluğu', era: '🔴 Kızıl Gezegen', multi: 25, color: '#ff3535', theme: 'zone-5-theme', icon: '🔴', desc: 'Mars üzerinde insan uygarlığı' },
  { zone: 6, name: 'Yıldız Çağı', era: '⭐ Dyson Küre', multi: 100, color: '#ffd700', theme: 'zone-6-theme', icon: '⭐', desc: 'Güneş enerjisinin tam kullanımı' },
  { zone: 7, name: 'Tanrılık Çağı', era: '👁️ Sonsuzluk', multi: 500, color: '#ff00ff', theme: 'zone-7-theme', icon: '👁️', desc: 'Evrenin efendisi olma yolculuğu' },
  { zone: 8, name: 'Paralel Evren', era: '♾️ Çoğul Gerçeklik', multi: 2000, color: '#00ffee', theme: 'zone-8-theme', icon: '♾️', desc: 'Boyutlar ötesi üretim imparatorluğu' },
];

export interface Building {
  id: string;
  zone: number;
  icon: string;
  name: string;
  cost: number;
  workers: number;
  energyUse: number;
  energyProd: number;
  inputs: (string | number)[];
  output: string;
  rate: number;
  desc: string;
  workerWage: number;
}

export const ALL_BUILDINGS: Building[] = [
  // ZONE 1
  { id: 'demir_ocagi', zone: 1, icon: '🪨', name: 'Demir Ocağı', cost: 150, workers: 1, energyUse: 1, energyProd: 0, inputs: [], output: 'demir', rate: 1, desc: 'Ham demir çıkarır', workerWage: 5 },
  { id: 'komur_ocagi', zone: 1, icon: '⛏️', name: 'Kömür Ocağı', cost: 120, workers: 1, energyUse: 1, energyProd: 0, inputs: [], output: 'komur', rate: 1.2, desc: 'Kömür üretir', workerWage: 5 },
  { id: 'kereste_fab', zone: 1, icon: '🌲', name: 'Kereste Fabrikası', cost: 100, workers: 1, energyUse: 1, energyProd: 0, inputs: [], output: 'kereste', rate: 1.5, desc: 'Orman kerestesi', workerWage: 5 },
  { id: 'bakir_madeni', zone: 1, icon: '🟤', name: 'Bakır Madeni', cost: 180, workers: 2, energyUse: 2, energyProd: 0, inputs: [], output: 'bakir', rate: 0.8, desc: 'Bakır madeni', workerWage: 8 },
  { id: 'tas_ocagi', zone: 1, icon: '🪨', name: 'Taş Ocağı', cost: 80, workers: 1, energyUse: 1, energyProd: 0, inputs: [], output: 'tas', rate: 2, desc: 'Ham taş çıkarır', workerWage: 4 },
  { id: 'kil_ocagi', zone: 1, icon: '🟫', name: 'Kil Ocağı', cost: 95, workers: 1, energyUse: 1, energyProd: 0, inputs: [], output: 'kil', rate: 1.8, desc: 'Kil çıkarır', workerWage: 4 },
  { id: 'ruzgar_turbini', zone: 1, icon: '💨', name: 'Rüzgar Türbini', cost: 200, workers: 1, energyUse: 0, energyProd: 4, inputs: [], output: '', rate: 0, desc: 'Temiz enerji üretir', workerWage: 6 },
  { id: 'gunes_paneli', zone: 1, icon: '☀️', name: 'Güneş Paneli', cost: 150, workers: 1, energyUse: 0, energyProd: 3, inputs: [], output: '', rate: 0, desc: 'Güneş enerjisi', workerWage: 6 },
  { id: 'buhar_makinesi', zone: 1, icon: '🔩', name: 'Buhar Makinesi', cost: 350, workers: 2, energyUse: 0, energyProd: 6, inputs: ['komur', 0.5], output: '', rate: 0, desc: 'Kömürle güçlü enerji', workerWage: 8 },
  { id: 'demir_firini', zone: 1, icon: '🔥', name: 'Demir Fırını', cost: 300, workers: 2, energyUse: 2, energyProd: 0, inputs: ['demir', 2, 'komur', 1], output: 'celik', rate: 0.5, desc: 'Çelik üretir', workerWage: 10 },
  { id: 'kablo_fab', zone: 1, icon: '🔌', name: 'Kablo Fabrikası', cost: 280, workers: 2, energyUse: 2, energyProd: 0, inputs: ['bakir', 1], output: 'kablo', rate: 0.7, desc: 'Kablo üretir', workerWage: 10 },
  { id: 'marangoz', zone: 1, icon: '🪚', name: 'Marangoz', cost: 200, workers: 1, energyUse: 1, energyProd: 0, inputs: ['kereste', 2], output: 'tahta', rate: 0.9, desc: 'Tahta üretir', workerWage: 7 },
  { id: 'cimento_fab', zone: 1, icon: '🏗️', name: 'Çimento Fabrikası', cost: 420, workers: 2, energyUse: 2, energyProd: 0, inputs: ['kil', 2, 'komur', 1], output: 'cimento', rate: 0.4, desc: 'Çimento üretir', workerWage: 11 },
  { id: 'altin_madeni', zone: 1, icon: '🥇', name: 'Altın Madeni', cost: 600, workers: 2, energyUse: 2, energyProd: 0, inputs: [], output: 'altin', rate: 0.2, desc: 'Altın çıkarır', workerWage: 15 },
  // ZONE 2
  { id: 'petrol_rafin', zone: 2, icon: '🛢️', name: 'Petrol Rafinerisi', cost: 800, workers: 3, energyUse: 3, energyProd: 0, inputs: [], output: 'petrol', rate: 0.6, desc: 'Petrol üretir', workerWage: 20 },
  { id: 'kimya_fab', zone: 2, icon: '🧪', name: 'Kimya Fabrikası', cost: 1000, workers: 3, energyUse: 3, energyProd: 0, inputs: ['petrol', 1], output: 'plastik', rate: 0.5, desc: 'Plastik üretir', workerWage: 25 },
  { id: 'dev_liman', zone: 2, icon: '⚓', name: 'Dev Liman', cost: 1200, workers: 4, energyUse: 4, energyProd: 0, inputs: [], output: 'lojistik', rate: 0.3, desc: 'Lojistik üretir', workerWage: 22 },
  { id: 'ihracat_merkezi', zone: 2, icon: '📦', name: 'İhracat Merkezi', cost: 1500, workers: 3, energyUse: 3, energyProd: 0, inputs: ['lojistik', 1], output: 'TL', rate: 200, desc: 'Para üretir', workerWage: 30 },
  { id: 'akilli_depo', zone: 2, icon: '🏭', name: 'Akıllı Depo', cost: 2000, workers: 2, energyUse: 2, energyProd: 0, inputs: [], output: '', rate: 0, desc: '+500 kaynak kapasitesi', workerWage: 15 },
  { id: 'arastirma_lab', zone: 2, icon: '🔬', name: 'Araştırma Labı', cost: 1800, workers: 3, energyUse: 3, energyProd: 0, inputs: [], output: 'RP', rate: 2, desc: 'RP üretir', workerWage: 35 },
  { id: 'gaz_santrali', zone: 2, icon: '🔥', name: 'Doğalgaz Santrali', cost: 2200, workers: 2, energyUse: 0, energyProd: 15, inputs: [], output: '', rate: 0, desc: 'Enerji üretir', workerWage: 18 },
  { id: 'nukleer_reaktor', zone: 2, icon: '☢️', name: 'Nükleer Reaktör', cost: 5000, workers: 4, energyUse: 0, energyProd: 40, inputs: [], output: '', rate: 0, desc: 'Nükleer dev enerji', workerWage: 50 },
  { id: 'tersane', zone: 2, icon: '🚢', name: 'Tersane', cost: 2800, workers: 4, energyUse: 4, energyProd: 0, inputs: ['tahta', 2, 'celik', 1], output: 'lojistik', rate: 0.6, desc: 'Gemi üretir', workerWage: 28 },
  { id: 'finans_merkezi', zone: 2, icon: '🏦', name: 'Finans Merkezi', cost: 3500, workers: 3, energyUse: 2, energyProd: 0, inputs: ['altin', 0.1], output: 'TL', rate: 500, desc: 'Altın yatırımı', workerWage: 45 },
  // ZONE 3
  { id: 'uydu_fab', zone: 3, icon: '🛸', name: 'Uydu Fabrikası', cost: 3000, workers: 5, energyUse: 10, energyProd: 0, inputs: ['celik', 20, 'kablo', 10], output: 'uydu', rate: 0.05, desc: 'Uydu üretir', workerWage: 80 },
  { id: 'roket_silosu', zone: 3, icon: '🚀', name: 'Roket Silosu', cost: 5000, workers: 8, energyUse: 15, energyProd: 0, inputs: ['celik', 50, 'kablo', 20], output: 'roket', rate: 0.02, desc: 'Roket üretir', workerWage: 120 },
  { id: 'yorunge_ist', zone: 3, icon: '🛰️', name: 'Yörünge İstasyonu', cost: 4000, workers: 4, energyUse: 8, energyProd: 0, inputs: [], output: 'RP', rate: 5, desc: 'RP üretir', workerWage: 100 },
  { id: 'fuzyon_reaktoru', zone: 3, icon: '💥', name: 'Füzyon Reaktörü', cost: 8000, workers: 3, energyUse: 0, energyProd: 200, inputs: ['helyum3', 0.5], output: '', rate: 0, desc: 'Dev enerji üretir', workerWage: 150 },
  { id: 'orbital_solar', zone: 3, icon: '🌞', name: 'Orbital Güneş', cost: 12000, workers: 4, energyUse: 0, energyProd: 350, inputs: [], output: '', rate: 0, desc: 'Yörüngeden güneş enerjisi', workerWage: 200 },
  { id: 'uzay_ihale', zone: 3, icon: '🌌', name: 'Uzay İhale Merkezi', cost: 7000, workers: 6, energyUse: 8, energyProd: 0, inputs: ['uydu', 0.1], output: 'TL', rate: 1000, desc: 'Para üretir', workerWage: 110 },
  { id: 'kuantum_bilgisayar', zone: 4, icon: '💻', name: 'Kuantum Bilgisayar', cost: 15000, workers: 10, energyUse: 50, energyProd: 0, inputs: [], output: 'veri', rate: 0.1, desc: 'Veri üretir', workerWage: 300 },
  { id: 'yapay_zeka_lab', zone: 4, icon: '🤖', name: 'YZ Laboratuvarı', cost: 20000, workers: 15, energyUse: 60, energyProd: 0, inputs: ['veri', 10], output: 'RP', rate: 10, desc: 'RP üretir', workerWage: 400 },
  { id: 'karadelik_reaktor', zone: 4, icon: '⚫', name: 'Kara Delik Reaktörü', cost: 50000, workers: 5, energyUse: 0, energyProd: 1000, inputs: [], output: '', rate: 0, desc: 'Sonsuz enerji', workerWage: 500 },
  { id: 'multiverzum_portal', zone: 4, icon: '🔭', name: 'Multiverzum Portalı', cost: 100000, workers: 20, energyUse: 200, energyProd: 0, inputs: ['veri', 50], output: 'TL', rate: 10000, desc: 'Mega para', workerWage: 1000 },
  { id: 'tanri_makine', zone: 5, icon: '🔥', name: 'İlahiyat Makinesi', cost: 500000, workers: 50, energyUse: 500, energyProd: 0, inputs: [], output: 'TL', rate: 100000, desc: 'Tanrısal para', workerWage: 5000 },
];

export interface ResearchNode {
  id: string;
  tier: number;
  icon: string;
  name: string;
  desc: string;
  cost: number;
  effect: string;
  value: number;
  zone: number;
  req?: string;
  branch?: string;
  secretCond?: (s: any) => boolean;
}

export const RESEARCH_TREE: ResearchNode[] = [
  // ── Kök (Tier 0 · zone 2 · ücretsiz) ─────────────────────────
  {id:'r_root',    tier:0,icon:'🧪',name:'Araştırma Merkezi', desc:'Araştırma ağacını aktive eder.',            cost:0,        effect:'none',       value:0,     zone:2},
  // ── Tier 1  ·  req: r_root ────────────────────────────────────
  {id:'r_prod1',   tier:1,icon:'⚙️',name:'Verimli Üretim I',      desc:'Tüm üretim +10%',             cost:500,      effect:'prodMulti',  value:0.10,  zone:2, req:'r_root'},
  {id:'r_energy1', tier:1,icon:'⚡',name:'Enerji Opt. I',          desc:'Enerji tüketimi -10%',         cost:800,      effect:'energyMulti',value:-0.10, zone:2, req:'r_root'},
  {id:'r_wage1',   tier:1,icon:'💸',name:'Otomasyon I',            desc:'İşçi ücretleri -10%',          cost:1200,     effect:'wageMulti',  value:-0.10, zone:2, req:'r_root'},
  {id:'r_cap1',    tier:1,icon:'📦',name:'Depo Gen. I',            desc:'Kaynak kapasitesi +2000',       cost:1500,     effect:'capBonus',   value:2000,  zone:2, req:'r_root'},
  {id:'r_xp1',     tier:1,icon:'⭐',name:'Hızlı Öğrenme',          desc:'XP kazanımı +25%',              cost:2000,     effect:'xpMulti',    value:0.25,  zone:2, req:'r_root'},
  {id:'r_money1',  tier:1,icon:'💰',name:'Pazarlama I',            desc:'Para üretimi +20%',             cost:3000,     effect:'moneyMulti', value:0.20,  zone:2, req:'r_root'},
  {id:'r_rp1',     tier:1,icon:'🔬',name:'Araştırma Hız. I',       desc:'RP üretimi +25%',               cost:4000,     effect:'rpMulti',    value:0.25,  zone:2, req:'r_root'},
  // ── Tier 2 ────────────────────────────────────────────────────
  {id:'r_prod2',   tier:2,icon:'⚙️',name:'Verimli Üretim II',      desc:'Tüm üretim +15%',             cost:5000,     effect:'prodMulti',  value:0.15,  zone:2, req:'r_prod1'},
  {id:'r_energy2', tier:2,icon:'⚡',name:'Enerji Opt. II',          desc:'Enerji tüketimi -15%',         cost:6000,     effect:'energyMulti',value:-0.15, zone:2, req:'r_energy1'},
  {id:'r_wage2',   tier:2,icon:'💸',name:'Otomasyon II',            desc:'İşçi ücretleri -15%',          cost:7000,     effect:'wageMulti',  value:-0.15, zone:2, req:'r_wage1'},
  {id:'r_cap2',    tier:2,icon:'🏗️',name:'Depo Gen. II',           desc:'Kaynak kapasitesi +5000',       cost:9000,     effect:'capBonus',   value:5000,  zone:2, req:'r_cap1'},
  {id:'r_xp2',     tier:2,icon:'🌟',name:'Süper Hafıza',            desc:'XP kazanımı +40%',              cost:11000,    effect:'xpMulti',    value:0.40,  zone:2, req:'r_xp1'},
  {id:'r_money2',  tier:2,icon:'💵',name:'Küresel Pazar',           desc:'Para üretimi +30%',             cost:14000,    effect:'moneyMulti', value:0.30,  zone:2, req:'r_money1'},
  {id:'r_rp2',     tier:2,icon:'🧬',name:'Araştırma Hız. II',       desc:'RP üretimi +50%',               cost:16000,    effect:'rpMulti',    value:0.50,  zone:3, req:'r_rp1'},
  // ── Tier 3 ────────────────────────────────────────────────────
  {id:'r_prod3',   tier:3,icon:'🏭',name:'Verimli Üretim III',      desc:'Tüm üretim +25%',             cost:25000,    effect:'prodMulti',  value:0.25,  zone:3, req:'r_prod2'},
  {id:'r_energy3', tier:3,icon:'⚡',name:'Süper İletkenlik',         desc:'Enerji tüketimi -25%',         cost:28000,    effect:'energyMulti',value:-0.25, zone:3, req:'r_energy2'},
  {id:'r_wage3',   tier:3,icon:'🤖',name:'Tam Otomasyon',           desc:'İşçi ücretleri -30%',          cost:32000,    effect:'wageMulti',  value:-0.30, zone:3, req:'r_wage2'},
  {id:'r_cap3',    tier:3,icon:'🌐',name:'Sonsuz Depo',             desc:'Kaynak kapasitesi +15000',      cost:40000,    effect:'capBonus',   value:15000, zone:3, req:'r_cap2'},
  {id:'r_rp3',     tier:3,icon:'🔭',name:'Kuantum Araştırma I',     desc:'RP üretimi +80%',               cost:35000,    effect:'rpMulti',    value:0.80,  zone:3, req:'r_rp2'},
  // ── Tier 4 ────────────────────────────────────────────────────
  {id:'r_prod4',   tier:4,icon:'🚀',name:'Verimli Üretim IV',       desc:'Tüm üretim +35%',             cost:80000,    effect:'prodMulti',  value:0.35,  zone:4, req:'r_prod3'},
  {id:'r_wage4',   tier:4,icon:'🤖',name:'Nano-Otomasyon',          desc:'İşçi ücretleri -40%',          cost:120000,   effect:'wageMulti',  value:-0.40, zone:4, req:'r_wage3'},
  {id:'r_cap4',    tier:4,icon:'🌌',name:'Boyutsuz Depo',           desc:'Kaynak kapasitesi +50000',      cost:150000,   effect:'capBonus',   value:50000, zone:4, req:'r_cap3'},
  {id:'r_money3',  tier:4,icon:'💎',name:'Galaktik Finans',         desc:'Para üretimi +50%',             cost:100000,   effect:'moneyMulti', value:0.50,  zone:4, req:'r_money2'},
  {id:'r_rp4',     tier:4,icon:'🧪',name:'Kuantum Araştırma II',    desc:'RP üretimi +120%',              cost:130000,   effect:'rpMulti',    value:1.20,  zone:4, req:'r_rp3'},
  // ── Tier 5 ────────────────────────────────────────────────────
  {id:'r_prod5',   tier:5,icon:'🌟',name:'Verimli Üretim V',        desc:'Tüm üretim +50%',             cost:500000,   effect:'prodMulti',  value:0.50,  zone:5, req:'r_prod4'},
  {id:'r_energy4', tier:5,icon:'♾️',name:'Sonsuz Enerji Opt.',      desc:'Enerji tüketimi -40%',         cost:600000,   effect:'energyMulti',value:-0.40, zone:5, req:'r_energy3'},
  {id:'r_money4',  tier:5,icon:'💰',name:'Kozmik Finans',           desc:'Para üretimi +75%',             cost:700000,   effect:'moneyMulti', value:0.75,  zone:5, req:'r_money3'},
  {id:'r_rp5',     tier:5,icon:'🌌',name:'Kuantum Araştırma III',   desc:'RP üretimi +200%',              cost:800000,   effect:'rpMulti',    value:2.00,  zone:5, req:'r_rp4'},
  // ── Tier 6 ────────────────────────────────────────────────────
  {id:'r_prod6',   tier:6,icon:'👁️',name:'Tanrısal Üretim',         desc:'Tüm üretim +100%',            cost:5000000,  effect:'prodMulti',  value:1.00,  zone:6, req:'r_prod5'},
  {id:'r_wage5',   tier:6,icon:'♾️',name:'Mutlak Otomasyon',        desc:'İşçi ücretleri -60%',          cost:9000000,  effect:'wageMulti',  value:-0.60, zone:6, req:'r_wage4'},
  {id:'r_cap5',    tier:6,icon:'🕳️',name:'Karadelik Deposu',        desc:'Kaynak kapasitesi +200000',     cost:7000000,  effect:'capBonus',   value:200000,zone:7, req:'r_cap4'},
  {id:'r_xp3',     tier:6,icon:'💫',name:'Tanrısal Öğrenme',        desc:'XP kazanımı +100%',             cost:12000000, effect:'xpMulti',    value:1.00,  zone:6, req:'r_xp2'},
  {id:'r_money5',  tier:6,icon:'🌌',name:'Evren Ekonomisi',         desc:'Para üretimi +100%',            cost:8000000,  effect:'moneyMulti', value:1.00,  zone:6, req:'r_money4'},
  {id:'r_rp6',     tier:6,icon:'👁️',name:'Tanrısal Araştırma',      desc:'RP üretimi +500%',              cost:15000000, effect:'rpMulti',    value:5.00,  zone:7, req:'r_rp5'},
  {id:'r_prod7',   tier:7,icon:'♾️',name:'Paralel Üretim',          desc:'Tüm üretim +200%',            cost:50000000, effect:'prodMulti',  value:2.00,  zone:8, req:'r_prod6'},
  // ── GİZLİ ARAŞTIRMALAR ─────────────────────────────────────────
  {id:'r_gizli1',  tier:7,icon:'🌑',name:'Karanlık Madde',
   desc:'Tüm üretim +150%. Karanlık enerji akışını hissediyorsun...',
   cost:3000000, effect:'prodMulti', value:1.50, zone:5,
   secretCond:(s)=>(s.zone||1)>=5 && (s.level||1)>=12},
  {id:'r_gizli2',  tier:7,icon:'💀',name:'Sonsuz Birikim',
   desc:'Para üretimi +250%. Ekonominin ötesinde bir güç var.',
   cost:8000000, effect:'moneyMulti',value:2.50, zone:6,
   secretCond:(s)=>(s.money||0)>=50000000 && (s.researchUnlocked||[]).length>=15},
  {id:'r_gizli3',  tier:8,icon:'🌌',name:'Omega Sentezi',
   desc:'Tüm çarpanlar +300%. İmparatorluğunun nihai ve gizli formu.',
   cost:50000000,effect:'prodMulti', value:3.00, zone:7,
   secretCond:(s)=>(s.researchUnlocked||[]).includes('r_gizli1')&&(s.researchUnlocked||[]).includes('r_gizli2')},
];

export const RPOS: Record<string, { col: number; row: number }> = {
  r_root:   {col:3,row:0},
  r_prod1:  {col:0,row:1}, r_energy1:{col:1,row:1}, r_wage1: {col:2,row:1},
  r_cap1:   {col:3,row:1}, r_xp1:    {col:4,row:1}, r_money1:{col:5,row:1}, r_rp1:   {col:6,row:1},
  r_prod2:  {col:0,row:2}, r_energy2:{col:1,row:2}, r_wage2: {col:2,row:2},
  r_cap2:   {col:3,row:2}, r_xp2:    {col:4,row:2}, r_money2:{col:5,row:2}, r_rp2:   {col:6,row:2},
  r_prod3:  {col:0,row:3}, r_energy3:{col:1,row:3}, r_wage3: {col:2,row:3},
  r_cap3:   {col:3,row:3},                                                   r_rp3:   {col:6,row:3},
  r_prod4:  {col:0,row:4},                           r_wage4: {col:2,row:4},
  r_cap4:   {col:3,row:4},                           r_money3:{col:5,row:4}, r_rp4:   {col:6,row:4},
  r_prod5:  {col:0,row:5}, r_energy4:{col:1,row:5},
                                                      r_money4:{col:5,row:5}, r_rp5:   {col:6,row:5},
  r_prod6:  {col:0,row:6},                           r_wage5: {col:2,row:6},
  r_cap5:   {col:3,row:6}, r_xp3:    {col:4,row:6}, r_money5:{col:5,row:6}, r_rp6:   {col:6,row:6},
  r_prod7:  {col:0,row:7},
  r_gizli1: {col:1,row:7},
  r_gizli2: {col:5,row:7},
  r_gizli3: {col:3,row:8},
};

export const EFFECT_META: Record<string, { color: string; label: string }> = {
  prodMulti: { color: '#00d4ff', label: 'Üretim' },
  energyMulti: { color: '#ffd700', label: 'Enerji' },
  wageMulti: { color: '#ff3535', label: 'Otomasyon' },
  capBonus: { color: '#ff6b35', label: 'Depo' },
  xpMulti: { color: '#a855f7', label: 'XP' },
  moneyMulti: { color: '#39ff14', label: 'Para' },
  rpMulti: { color: '#ff00ff', label: 'Araştırma' },
  none: { color: '#00d4ff', label: '' },
};


export interface Contract {
  id: string;
  name: string;
  desc: string;
  reward: number;
  icon: string;
  zone: number;
}

export interface Expedition {
  id: string;
  name: string;
  desc: string;
  reward: number;
  chance: number;
  icon: string;
  zone: number;
}

export const CONTRACTS: Contract[] = [
  { id: 'c1', name: 'Demir Siparişi', desc: '500 Demir Gönder', reward: 5000, icon: '📦', zone: 1 },
  { id: 'c2', name: 'Çelik Üretimi', desc: '100 Çelik Gönder', reward: 8000, icon: '🏗️', zone: 1 },
  { id: 'c3', name: 'Lojistik Ağı', desc: '50 Lojistik Gönder', reward: 15000, icon: '🚚', zone: 2 },
  { id: 'c4', name: 'Plastik Taşıması', desc: '75 Plastik Gönder', reward: 20000, icon: '🧪', zone: 2 },
];

export const EXPEDITIONS: Expedition[] = [
  { id: 'e1', name: 'Yerel Keşif', desc: '%50 şansla 2000 TL', reward: 2000, chance: 0.5, icon: '🗺️', zone: 1 },
  { id: 'e2', name: 'Uzak Keşif', desc: '%30 şansla 8000 TL', reward: 8000, chance: 0.3, icon: '🧭', zone: 1 },
  { id: 'e3', name: 'Deniz Yolculuğu', desc: '%40 şansla 15000 TL', reward: 15000, chance: 0.4, icon: '⛵', zone: 2 },
  { id: 'e4', name: 'Hazine Avı', desc: '%25 şansla 50000 TL', reward: 50000, chance: 0.25, icon: '💎', zone: 2 },
];


export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  reward: number;
  condition: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a_first_building', name: 'İlk Bina', desc: 'İlk binayı inşa et', icon: '🏗️', reward: 500, condition: 'first_building' },
  { id: 'a_100_buildings', name: '100 Bina', desc: '100 bina inşa et', icon: '🏢', reward: 5000, condition: 'buildings_100' },
  { id: 'a_first_prestige', name: 'Prestige Ustası', desc: 'İlk prestige yap', icon: '✨', reward: 10000, condition: 'first_prestige' },
  { id: 'a_zone_2', name: 'Sanayi Çağı', desc: 'Bölge 2\'ye ulaş', icon: '🏭', reward: 3000, condition: 'zone_2' },
  { id: 'a_zone_3', name: 'Uzay Çağı', desc: 'Bölge 3\'e ulaş', icon: '🚀', reward: 10000, condition: 'zone_3' },
  { id: 'a_1m_money', name: 'Milyoner', desc: '1 milyon TL kazan', icon: '💰', reward: 20000, condition: 'money_1m' },
  { id: 'a_all_research', name: 'Bilim Ustası', desc: 'Tüm araştırmaları yap', icon: '🔬', reward: 15000, condition: 'all_research' },
];


// Leaderboard types
export const LEADERBOARD_TYPES = {
  money: { label: 'Para', icon: '💰' },
  level: { label: 'Seviye', icon: '📊' },
  prestige: { label: 'Prestige', icon: '✨' },
  totalBuildings: { label: 'Toplam Bina', icon: '🏭' },
  playTime: { label: 'Oynama Süresi', icon: '⏱️' },
};

// Special events (random bonuses)
export const SPECIAL_EVENTS = [
  { id: 'event_double_money', name: '💰 2x Para', bonus: { money: 2 }, duration: 300, chance: 0.01 },
  { id: 'event_triple_xp', name: '📈 3x XP', bonus: { xp: 3 }, duration: 300, chance: 0.01 },
  { id: 'event_free_energy', name: '⚡ Sınırsız Enerji', bonus: { energy: 999 }, duration: 120, chance: 0.005 },
  { id: 'event_production_boost', name: '🏭 2x Üretim', bonus: { production: 2 }, duration: 180, chance: 0.015 },
];

// Zone 6+ buildings
export const ZONE_6_BUILDINGS: Building[] = [
  { id: 'dyson_sphere', zone: 6, icon: '⭐', name: 'Dyson Küre', cost: 1000000, workers: 100, energyUse: 0, energyProd: 10000, inputs: [], output: '', rate: 0, desc: 'Yıldız enerjisinin %100\'ü', workerWage: 10000 },
  { id: 'matter_converter', zone: 6, icon: '⚛️', name: 'Madde Dönüştürücü', cost: 500000, workers: 50, energyUse: 1000, energyProd: 0, inputs: [], output: 'TL', rate: 50000, desc: 'Maddeyi paraya dönüştür', workerWage: 5000 },
  { id: 'time_manipulator', zone: 7, icon: '⏰', name: 'Zaman Manipülatörü', cost: 10000000, workers: 200, energyUse: 5000, energyProd: 0, inputs: [], output: 'TL', rate: 1000000, desc: 'Zamanı kontrol et', workerWage: 50000 },
  { id: 'universe_factory', zone: 8, icon: '🌌', name: 'Evren Fabrikası', cost: 100000000, workers: 500, energyUse: 10000, energyProd: 0, inputs: [], output: 'TL', rate: 10000000, desc: 'Evrenleri üret', workerWage: 100000 },
];


// Tournament system
export interface Tournament {
  id: string;
  name: string;
  desc: string;
  icon: string;
  duration: number; // seconds
  rewards: { money: number; xp: number };
}

export const TOURNAMENTS: Tournament[] = [
  { id: 't_weekly_money', name: 'Haftalık Para Yarışı', desc: 'En fazla para kazananlar', icon: '💰', duration: 604800, rewards: { money: 50000, xp: 1000 } },
  { id: 't_monthly_level', name: 'Aylık Seviye Yarışı', desc: 'En yüksek seviyeye ulaşanlar', icon: '📊', duration: 2592000, rewards: { money: 100000, xp: 5000 } },
  { id: 't_daily_production', name: 'Günlük Üretim Yarışı', desc: 'En fazla bina yapanlar', icon: '🏭', duration: 86400, rewards: { money: 10000, xp: 500 } },
];
