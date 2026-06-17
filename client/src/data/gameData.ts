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
];

export const RESEARCH_TREE = [
  { id: 'r_root', tier: 0, icon: '🌱', name: 'Araştırma Kökü', desc: 'Araştırmaların başlangıcı', cost: 0, effect: 'none', value: 0, zone: 1 },
  { id: 'r_prod1', tier: 1, icon: '📈', name: 'Üretim I', desc: 'Üretim +10%', cost: 100, effect: 'prodMulti', value: 0.1, zone: 1, req: 'r_root' },
  { id: 'r_energy1', tier: 1, icon: '⚡', name: 'Enerji I', desc: 'Enerji +10%', cost: 150, effect: 'energyMulti', value: 0.1, zone: 1, req: 'r_root' },
  { id: 'r_wage1', tier: 1, icon: '🤖', name: 'Otomasyon I', desc: 'İşçi ücreti -10%', cost: 120, effect: 'wageMulti', value: -0.1, zone: 1, req: 'r_root' },
];

export const RPOS: Record<string, { col: number; row: number }> = {
  r_root: { col: 3, row: 0 },
  r_prod1: { col: 0, row: 1 },
  r_energy1: { col: 1, row: 1 },
  r_wage1: { col: 2, row: 1 },
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
