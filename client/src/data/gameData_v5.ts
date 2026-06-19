/**
 * Endüstri İmparatorluğu v5 - Oyun Verileri
 * Tüm binalar, araştırmalar, başarılar ve sistem konfigürasyonları
 */

// ══════════════════════════════════════════════════
// DIFFICULTY CONFIG
// ══════════════════════════════════════════════════
export const DIFFICULTIES = {
  easy: {
    label: 'Kolay',
    color: '#39ff14',
    costMult: 0.5,
    wageMult: 0.5,
    xpMult: 1.5,
    moneyStart: 15000,
    desc: 'Maliyet ×0.5 | Ücret ×0.5 | XP ×1.5',
  },
  normal: {
    label: 'Normal',
    color: '#00d4ff',
    costMult: 1,
    wageMult: 1,
    xpMult: 1,
    moneyStart: 3000,
    desc: 'Standart oyun deneyimi',
  },
  hard: {
    label: 'Zor',
    color: '#ff6b35',
    costMult: 1.8,
    wageMult: 1.5,
    xpMult: 0.8,
    moneyStart: 800,
    desc: 'Maliyet ×1.8 | Ücret ×1.5 | XP ×0.8',
  },
  insane: {
    label: 'Çılgın',
    color: '#ff00ff',
    costMult: 3,
    wageMult: 2.5,
    xpMult: 0.5,
    moneyStart: 200,
    desc: 'Maliyet ×3 | Ücret ×2.5 | XP ×0.5',
  },
};

// ══════════════════════════════════════════════════
// ZONE INFO
// ══════════════════════════════════════════════════
export const ZONE_INFO = [
  {
    zone: 1,
    name: 'Sanayi Çağı',
    era: '⚙️ Endüstri',
    multi: 1,
    color: '#00d4ff',
    theme: '',
    icon: '🏭',
    desc: 'Ham madde ve temel sanayi',
  },
  {
    zone: 2,
    name: 'Ticaret Çağı',
    era: '⚓ Deniz Ticareti',
    multi: 2,
    color: '#39ff14',
    theme: 'zone-2-theme',
    icon: '🚢',
    desc: 'Küresel ticaret ağları ve finans',
  },
  {
    zone: 3,
    name: 'Uzay Çağı',
    era: '🚀 Uzay Keşfi',
    multi: 5,
    color: '#a855f7',
    theme: 'zone-3-theme',
    icon: '🛸',
    desc: 'İnsanlığın yıldızlara uzanışı',
  },
  {
    zone: 4,
    name: 'Ay Kolonisi',
    era: '🌕 Ay Medeniyeti',
    multi: 10,
    color: '#ff6b35',
    theme: 'zone-4-theme',
    icon: '🌕',
    desc: 'Ay yüzeyinde kalıcı yerleşim',
  },
  {
    zone: 5,
    name: 'Mars İmparatorluğu',
    era: '🔴 Kızıl Gezegen',
    multi: 25,
    color: '#ff3535',
    theme: 'zone-5-theme',
    icon: '🔴',
    desc: 'Mars üzerinde insan uygarlığı',
  },
  {
    zone: 6,
    name: 'Yıldız Çağı',
    era: '⭐ Dyson Küre',
    multi: 100,
    color: '#ffd700',
    theme: 'zone-6-theme',
    icon: '⭐',
    desc: 'Güneş enerjisinin tam kullanımı',
  },
  {
    zone: 7,
    name: 'Tanrılık Çağı',
    era: '👁️ Sonsuzluk',
    multi: 500,
    color: '#ff00ff',
    theme: 'zone-7-theme',
    icon: '👁️',
    desc: 'Evrenin efendisi olma yolculuğu',
  },
  {
    zone: 8,
    name: 'Paralel Evren',
    era: '♾️ Çoğul Gerçeklik',
    multi: 2000,
    color: '#00ffee',
    theme: 'zone-8-theme',
    icon: '♾️',
    desc: 'Boyutlar ötesi üretim imparatorluğu',
  },
];

// ══════════════════════════════════════════════════
// AGE MECHANICS
// ══════════════════════════════════════════════════
export const AGE_MECHANICS = {
  1: {
    title: '⚙️ Sanayi Devri',
    desc: 'Ham madde zinciri aktif: Demir+Kömür→Çelik, Bakır→Kablo. Kil işleyerek çimento üret. Enerji üretimini ihmal etme!',
    bonus: 'Bina alımında XP +50%',
  },
  2: {
    title: '⚓ Ticaret Ağı',
    desc: 'Lojistik sistemi ve Borsa aktif. RP birikiyor — araştırmalara yatır. Ticaret rotaları pasif gelir sağlar!',
    bonus: 'Araştırma maliyeti -10%',
  },
  3: {
    title: '🚀 Uzay Ekonomisi',
    desc: 'Sözleşme sistemi aktif. Nano-malzeme üretimi başladı. Füzyon ve Orbital enerji devasa güç sağlar.',
    bonus: 'Sözleşme ödülü +25%',
  },
  4: {
    title: '🌕 Ay Madenciliği',
    desc: 'Keşif sistemi aktif! Ay Taşı harca → şansa bağlı dev ödüller. Buz → Oksijen dönüşümü kritik.',
    bonus: 'Keşif başarı şansı +15%',
  },
  5: {
    title: '🔴 Terraforming',
    desc: 'Su + Oksijen → Koloni Puanı. Biyodome yiyecek üretir. Terraforming tüm üretimi pasif artırır.',
    bonus: 'Tüm üretim +15% (terraforming binasıyla)',
  },
  6: {
    title: '⭐ Dyson Küre',
    desc: 'Plazma ekonomisi: Dyson Sürüsü → Yıldız Maddesi → Yapay Yıldız. Karanlık enerji devasa enerji kaynağı.',
    bonus: 'Para üretimi +25%',
  },
  7: {
    title: '👁️ Tanrılık',
    desc: 'Gerçeklik taşları toplayarak prestige yap! Paralel fabrika zincirleri aktif. Egzotik madde her şeyi çözer.',
    bonus: 'Tüm çarpanlar ×2',
  },
  8: {
    title: '♾️ Paralel Evren',
    desc: 'Boyutlar arası üretim! Boyutsal enerji sonsuz kaynak sağlar. Çoğul gerçeklik kristalleri toplanıyor.',
    bonus: 'Prestige bonusu ×3',
  },
};

// ══════════════════════════════════════════════════
// ZONE REQUIREMENTS
// ══════════════════════════════════════════════════
export const ZONE_REQ = [
  null,
  null,
  {
    zone: 2,
    checks: [
      { key: 'level', label: 'Seviye', need: 8, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 150000, get: (s: any) => s.money },
    ],
  },
  {
    zone: 3,
    checks: [
      { key: 'level', label: 'Seviye', need: 20, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 2000000, get: (s: any) => s.money },
      { key: 'lojistik', label: 'Lojistik', need: 60, get: (s: any) => s.resources.lojistik || 0 },
      { key: 'plastik', label: 'Plastik', need: 30, get: (s: any) => s.resources.plastik || 0 },
    ],
  },
  {
    zone: 4,
    checks: [
      { key: 'level', label: 'Seviye', need: 35, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 25000000, get: (s: any) => s.money },
      { key: 'rp', label: 'RP', need: 25000, get: (s: any) => s.researchPoints },
      { key: 'uydu', label: 'Uydu', need: 12, get: (s: any) => s.resources.uydu || 0 },
    ],
  },
  {
    zone: 5,
    checks: [
      { key: 'level', label: 'Seviye', need: 55, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 200000000, get: (s: any) => s.money },
      { key: 'rp', label: 'RP', need: 200000, get: (s: any) => s.researchPoints },
      { key: 'roket', label: 'Roket', need: 6, get: (s: any) => s.resources.roket || 0 },
      { key: 'oksijen', label: 'Oksijen', need: 300, get: (s: any) => s.resources.oksijen || 0 },
    ],
  },
  {
    zone: 6,
    checks: [
      { key: 'level', label: 'Seviye', need: 75, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 1500000000, get: (s: any) => s.money },
      { key: 'rp', label: 'RP', need: 1500000, get: (s: any) => s.researchPoints },
      { key: 'koloniPuani', label: 'Koloni P.', need: 200, get: (s: any) => s.resources.koloniPuani || 0 },
      { key: 'marsCevheri', label: 'Mars Cev.', need: 100, get: (s: any) => s.resources.marsCevheri || 0 },
    ],
  },
  {
    zone: 7,
    checks: [
      { key: 'level', label: 'Seviye', need: 95, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 15000000000, get: (s: any) => s.money },
      { key: 'rp', label: 'RP', need: 15000000, get: (s: any) => s.researchPoints },
      { key: 'yildizMaddesi', label: 'Yıldız Mad.', need: 60, get: (s: any) => s.resources.yildizMaddesi || 0 },
      { key: 'yapayYildiz', label: 'Yapay Yıldız', need: 2, get: (s: any) => s.resources.yapayYildiz || 0 },
    ],
  },
  {
    zone: 8,
    checks: [
      { key: 'level', label: 'Seviye', need: 130, get: (s: any) => s.level },
      { key: 'money', label: 'TL', need: 1e13, get: (s: any) => s.money },
      { key: 'rp', label: 'RP', need: 1e8, get: (s: any) => s.researchPoints },
      { key: 'gerceklikTasi', label: 'Gerçeklik T.', need: 10, get: (s: any) => s.resources.gerceklikTasi || 0 },
      { key: 'etkiPuani', label: 'Etki Puanı', need: 5, get: (s: any) => s.resources.etkiPuani || 0 },
    ],
  },
];

// ══════════════════════════════════════════════════
// RESOURCE NAMES & ICONS
// ══════════════════════════════════════════════════
export const RES_NAMES: Record<string, string> = {
  demir: 'Demir',
  komur: 'Kömür',
  kereste: 'Kereste',
  bakir: 'Bakır',
  tas: 'Taş',
  kil: 'Kil',
  celik: 'Çelik',
  kablo: 'Kablo',
  tahta: 'Tahta',
  cimento: 'Çimento',
  altin: 'Altın',
  petrol: 'Petrol',
  plastik: 'Plastik',
  lojistik: 'Lojistik',
  uydu: 'Uydu',
  roket: 'Roket',
  helyum3: 'Helyum-3',
  nano: 'Nano Malzeme',
  veri: 'Veri',
  oksijen: 'Oksijen',
  su: 'Su',
  buz: 'Buz',
  koloniPuani: 'Koloni Puanı',
  marsCevheri: 'Mars Cevheri',
  yildizMaddesi: 'Yıldız Maddesi',
  yapayYildiz: 'Yapay Yıldız',
  gerceklikTasi: 'Gerçeklik Taşı',
  etkiPuani: 'Etki Puanı',
  TL: 'Para',
  RP: 'Araştırma Puanı',
};

export const RES_ICONS: Record<string, string> = {
  demir: '⛏️',
  komur: '🪨',
  kereste: '🌲',
  bakir: '🟤',
  tas: '🪨',
  kil: '🟫',
  celik: '⚙️',
  kablo: '🔌',
  tahta: '🪵',
  cimento: '🏗️',
  altin: '🥇',
  petrol: '🛢️',
  plastik: '🧪',
  lojistik: '📦',
  uydu: '🛸',
  roket: '🚀',
  helyum3: '⚗️',
  nano: '🔷',
  veri: '💾',
  oksijen: '💨',
  su: '💧',
  buz: '🧊',
  koloniPuani: '🏘️',
  marsCevheri: '🔴',
  yildizMaddesi: '⭐',
  yapayYildiz: '🌟',
  gerceklikTasi: '💎',
  etkiPuani: '✨',
  TL: '💰',
  RP: '🔬',
};

export const SELL_PRICES: Record<string, number> = {
  demir: 10,
  komur: 12,
  kereste: 8,
  bakir: 25,
  tas: 5,
  kil: 6,
  celik: 50,
  kablo: 40,
  tahta: 30,
  cimento: 45,
  altin: 200,
  petrol: 60,
  plastik: 55,
  lojistik: 100,
  uydu: 500,
  roket: 1500,
  helyum3: 300,
  nano: 150,
  veri: 120,
  oksijen: 20,
  su: 15,
  buz: 18,
  koloniPuani: 250,
  marsCevheri: 180,
  yildizMaddesi: 800,
  yapayYildiz: 5000,
  gerceklikTasi: 2000,
  etkiPuani: 1000,
};

// ══════════════════════════════════════════════════
// BUILDINGS (Zone 1-8)
// ══════════════════════════════════════════════════
export const ALL_BUILDINGS = [
  // ZONE 1
  {
    id: 'demir_ocagi',
    zone: 1,
    icon: '🪨',
    name: 'Demir Ocağı',
    cost: 150,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: [],
    output: 'demir',
    rate: 1,
    desc: 'Ham demir çıkarır',
    workerWage: 5,
  },
  {
    id: 'komur_ocagi',
    zone: 1,
    icon: '⛏️',
    name: 'Kömür Ocağı',
    cost: 120,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: [],
    output: 'komur',
    rate: 1.2,
    desc: 'Kömür üretir',
    workerWage: 5,
  },
  {
    id: 'kereste_fab',
    zone: 1,
    icon: '🌲',
    name: 'Kereste Fabrikası',
    cost: 100,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: [],
    output: 'kereste',
    rate: 1.5,
    desc: 'Orman kerestesi',
    workerWage: 5,
  },
  {
    id: 'bakir_madeni',
    zone: 1,
    icon: '🟤',
    name: 'Bakır Madeni',
    cost: 180,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: [],
    output: 'bakir',
    rate: 0.8,
    desc: 'Bakır madeni',
    workerWage: 8,
  },
  {
    id: 'tas_ocagi',
    zone: 1,
    icon: '🪨',
    name: 'Taş Ocağı',
    cost: 80,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: [],
    output: 'tas',
    rate: 2,
    desc: 'Ham taş çıkarır',
    workerWage: 4,
  },
  {
    id: 'kil_ocagi',
    zone: 1,
    icon: '🟫',
    name: 'Kil Ocağı',
    cost: 95,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: [],
    output: 'kil',
    rate: 1.8,
    desc: 'Kil çıkarır',
    workerWage: 4,
  },
  {
    id: 'ruzgar_turbini',
    zone: 1,
    icon: '💨',
    name: 'Rüzgar Türbini',
    cost: 200,
    workers: 1,
    energyUse: 0,
    energyProd: 4,
    inputs: [],
    output: '',
    rate: 0,
    desc: 'Temiz enerji üretir',
    workerWage: 6,
  },
  {
    id: 'gunes_paneli',
    zone: 1,
    icon: '☀️',
    name: 'Güneş Paneli',
    cost: 150,
    workers: 1,
    energyUse: 0,
    energyProd: 3,
    inputs: [],
    output: '',
    rate: 0,
    desc: 'Güneş enerjisi',
    workerWage: 6,
  },
  {
    id: 'buhar_makinesi',
    zone: 1,
    icon: '🔩',
    name: 'Buhar Makinesi',
    cost: 350,
    workers: 2,
    energyUse: 0,
    energyProd: 6,
    inputs: ['komur', 0.5],
    output: '',
    rate: 0,
    desc: 'Kömürle güçlü enerji',
    workerWage: 8,
  },
  {
    id: 'demir_firini',
    zone: 1,
    icon: '🔥',
    name: 'Demir Fırını',
    cost: 300,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: ['demir', 2, 'komur', 1],
    output: 'celik',
    rate: 0.5,
    desc: 'Çelik üretir',
    workerWage: 10,
  },
  {
    id: 'kablo_fab',
    zone: 1,
    icon: '🔌',
    name: 'Kablo Fabrikası',
    cost: 280,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: ['bakir', 1],
    output: 'kablo',
    rate: 0.7,
    desc: 'Kablo üretir',
    workerWage: 10,
  },
  {
    id: 'marangoz',
    zone: 1,
    icon: '🪚',
    name: 'Marangoz',
    cost: 200,
    workers: 1,
    energyUse: 1,
    energyProd: 0,
    inputs: ['kereste', 2],
    output: 'tahta',
    rate: 0.9,
    desc: 'Tahta üretir',
    workerWage: 7,
  },
  {
    id: 'cimento_fab',
    zone: 1,
    icon: '🏗️',
    name: 'Çimento Fabrikası',
    cost: 420,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: ['kil', 2, 'komur', 1],
    output: 'cimento',
    rate: 0.4,
    desc: 'Çimento üretir (inşaat)',
    workerWage: 11,
  },
  {
    id: 'altin_madeni',
    zone: 1,
    icon: '🥇',
    name: 'Altın Madeni',
    cost: 600,
    workers: 2,
    energyUse: 2,
    energyProd: 0,
    inputs: [],
    output: 'altin',
    rate: 0.2,
    desc: 'Altın çıkarır',
    workerWage: 15,
  },
];

// ══════════════════════════════════════════════════
// PLACEHOLDER: Diğer zonalar (Zone 2-8) binalarını ekle
// ══════════════════════════════════════════════════
// Tam liste için HTML dosyasından tüm binalar çıkarılmalı
// Şimdilik Zone 1 binalarını örnek olarak gösterdim

export const UPGRADE_LEVELS = [
  { multi: 1.1, desc: '+10% Üretim' },
  { multi: 1.25, desc: '+25% Üretim' },
  { multi: 1.5, desc: '+50% Üretim' },
  { multi: 1.75, desc: '+75% Üretim' },
  { multi: 2.0, desc: '×2 Üretim' },
];

// ══════════════════════════════════════════════════
// ACHIEVEMENTS (Başarılar)
// ══════════════════════════════════════════════════
export const ACHIEVEMENTS = [
  {
    id: 'first_building',
    icon: '🏢',
    name: 'İlk Bina',
    desc: 'İlk binanı inşa et',
    reward: '+1K TL',
    check: (s: any) => s.totalBuildings >= 1,
    bonus: (s: any) => {
      s.money += 1000;
    },
  },
  {
    id: 'fifty_buildings',
    icon: '🌆',
    name: 'Sanayi Şehri',
    desc: '50 bina inşa et',
    reward: '+50K TL',
    check: (s: any) => s.totalBuildings >= 50,
    bonus: (s: any) => {
      s.money += 50000;
    },
  },
  {
    id: 'hundred_buildings',
    icon: '🌇',
    name: 'Mega Kent',
    desc: '100 bina inşa et',
    reward: '+500K TL',
    check: (s: any) => s.totalBuildings >= 100,
    bonus: (s: any) => {
      s.money += 500000;
    },
  },
  {
    id: 'level10',
    icon: '🌟',
    name: 'Uzman',
    desc: 'Seviye 10',
    reward: '+10K TL',
    check: (s: any) => s.level >= 10,
    bonus: (s: any) => {
      s.money += 10000;
    },
  },
  {
    id: 'earn1m',
    icon: '💵',
    name: 'Milyoner',
    desc: '1M TL kazan',
    reward: '+500K TL',
    check: (s: any) => s.totalEarned >= 1000000,
    bonus: (s: any) => {
      s.money += 500000;
    },
  },
  {
    id: 'zone2',
    icon: '⚓',
    name: 'Ticaret Kapıları',
    desc: 'Bölge 2 aç',
    reward: '+100K TL',
    check: (s: any) => s.zone >= 2,
    bonus: (s: any) => {
      s.money += 100000;
      s.researchPoints += 1000;
    },
  },
];

// ══════════════════════════════════════════════════
// RESEARCH TREE (Araştırmalar)
// ══════════════════════════════════════════════════
export const RESEARCH_TREE = [
  {
    id: 'r_root',
    tier: 0,
    icon: '🧪',
    name: 'Araştırma Merkezi',
    desc: 'Araştırma ağacını aktive eder.',
    cost: 0,
    effect: 'none',
    value: 0,
    zone: 2,
  },
  {
    id: 'r_prod1',
    tier: 1,
    icon: '⚙️',
    name: 'Verimli Üretim I',
    desc: 'Tüm üretim +10%',
    cost: 500,
    effect: 'prodMulti',
    value: 0.1,
    zone: 2,
    req: 'r_root',
  },
  {
    id: 'r_energy1',
    tier: 1,
    icon: '⚡',
    name: 'Enerji Opt. I',
    desc: 'Enerji tüketimi -10%',
    cost: 800,
    effect: 'energyMulti',
    value: -0.1,
    zone: 2,
    req: 'r_root',
  },
];

// ══════════════════════════════════════════════════
// CONTRACTS (Sözleşmeler)
// ══════════════════════════════════════════════════
export const CONTRACTS = [
  {
    id: 'contract_1',
    icon: '📋',
    name: 'İlk Sipariş',
    desc: 'Malzeme sipariş et',
    reward: 5000,
    zone: 1,
  },
  {
    id: 'contract_2',
    icon: '📑',
    name: 'Büyük Sipariş',
    desc: 'Daha fazla malzeme sipariş et',
    reward: 50000,
    zone: 2,
  },
];

// ══════════════════════════════════════════════════
// EXPEDITIONS (Keşifler)
// ══════════════════════════════════════════════════
export const EXPEDITIONS = [
  {
    id: 'exp_1',
    icon: '🚀',
    name: 'Ay Keşfi',
    desc: 'Aya gitmek',
    reward: 10000,
    chance: 0.6,
    zone: 3,
  },
  {
    id: 'exp_2',
    icon: '🌌',
    name: 'Uzay Keşfi',
    desc: 'Uzayı keşfet',
    reward: 100000,
    chance: 0.4,
    zone: 4,
  },
];
