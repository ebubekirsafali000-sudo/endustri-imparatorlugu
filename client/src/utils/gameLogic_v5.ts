/**
 * Endüstri İmparatorluğu v5 - Oyun Mantığı
 * Bina satın alma, kaynak üretimi, araştırma, bölge ilerlemesi vb.
 */

import { ALL_BUILDINGS, ZONE_REQ, DIFFICULTIES } from '../data/gameData_v5';

export interface GameState {
  money: number;
  level: number;
  xp: number;
  zone: number;
  energy: number;
  maxEnergy: number;
  researchPoints: number;
  buildings: Record<string, number>;
  resources: Record<string, number>;
  researched: string[];
  achievements: string[];
  difficulty: string;
  musicOn: boolean;
  sfxOn: boolean;
  audioVolume: number;
  totalBuildings: number;
  totalEarned: number;
  lastSave: number;
}

/**
 * Varsayılan oyun durumunu oluştur
 */
export function makeDefault(difficulty: string = 'normal'): GameState {
  const diff = DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES] || DIFFICULTIES.normal;

  return {
    money: diff.moneyStart,
    level: 1,
    xp: 0,
    zone: 1,
    energy: 100,
    maxEnergy: 100,
    researchPoints: 0,
    buildings: {},
    resources: {},
    researched: [],
    achievements: [],
    difficulty,
    musicOn: true,
    sfxOn: true,
    audioVolume: 0.5,
    totalBuildings: 0,
    totalEarned: diff.moneyStart,
    lastSave: Date.now(),
  };
}

/**
 * Bina satın al
 */
export function buyBuilding(state: GameState, buildingId: string): boolean {
  const building = ALL_BUILDINGS.find((b) => b.id === buildingId);
  if (!building) return false;

  const diff = DIFFICULTIES[state.difficulty as keyof typeof DIFFICULTIES] || DIFFICULTIES.normal;
  const cost = building.cost * diff.costMult;

  if (state.money < cost) return false;

  state.money -= cost;
  state.buildings[buildingId] = (state.buildings[buildingId] || 0) + 1;
  state.totalBuildings++;
  state.xp += Math.floor(10 * diff.xpMult);

  // Level up kontrol
  const xpPerLevel = 100;
  while (state.xp >= xpPerLevel) {
    state.xp -= xpPerLevel;
    state.level++;
    state.maxEnergy += 10;
  }

  return true;
}

/**
 * Bina sat
 */
export function sellBuilding(state: GameState, buildingId: string): boolean {
  const building = ALL_BUILDINGS.find((b) => b.id === buildingId);
  if (!building || !state.buildings[buildingId]) return false;

  const diff = DIFFICULTIES[state.difficulty as keyof typeof DIFFICULTIES] || DIFFICULTIES.normal;
  const sellPrice = (building.cost * diff.costMult * 0.5) / 2; // 25% geri dönüş

  state.money += sellPrice;
  state.buildings[buildingId]--;
  if (state.buildings[buildingId] <= 0) delete state.buildings[buildingId];

  return true;
}

/**
 * Araştırma aç
 */
export function unlockResearch(state: GameState, researchId: string): boolean {
  if (state.researched.includes(researchId)) return false;

  // Basit maliyet: 1000 RP
  if (state.researchPoints < 1000) return false;

  state.researchPoints -= 1000;
  state.researched.push(researchId);

  return true;
}

/**
 * Bölge ilerlemesi kontrol et
 */
export function checkZoneAdvance(state: GameState): boolean {
  if (state.zone >= 8) return false;

  const req = ZONE_REQ[state.zone + 1];
  if (!req) return false;

  const canAdvance = req.checks.every((check) => check.get(state) >= check.need);

  if (canAdvance) {
    state.zone++;
    state.researchPoints += 5000;
    return true;
  }

  return false;
}

/**
 * Prestige (Sıfırla ve bonus al)
 */
export function doPrestige(state: GameState): boolean {
  if (state.zone < 2) return false;

  // Prestige puanı: level * 10
  const prestigePoints = state.level * 10;

  // Yeni oyun başlat ama bonus al
  const newState = makeDefault(state.difficulty);
  newState.money = newState.money * (1 + prestigePoints * 0.1);
  newState.researchPoints = prestigePoints * 100;

  Object.assign(state, newState);
  return true;
}

/**
 * Sözleşme tamamla
 */
export function completeContract(state: GameState, contractId: string): boolean {
  // Basit: para ekle
  state.money += 5000;
  return true;
}

/**
 * Keşif tamamla
 */
export function completeExpedition(state: GameState, expeditionId: string): boolean {
  // Basit: şansa bağlı ödül
  if (Math.random() < 0.6) {
    state.money += 10000;
    return true;
  }
  return false;
}

/**
 * Başarıları kontrol et ve aç
 */
export function unlockAchievements(state: GameState): void {
  // Basit başarı kontrolleri
  if (state.totalBuildings >= 1 && !state.achievements.includes('first_building')) {
    state.achievements.push('first_building');
    state.money += 1000;
  }

  if (state.level >= 10 && !state.achievements.includes('level10')) {
    state.achievements.push('level10');
    state.money += 10000;
  }

  if (state.zone >= 2 && !state.achievements.includes('zone2')) {
    state.achievements.push('zone2');
    state.money += 100000;
    state.researchPoints += 1000;
  }
}

/**
 * Kaynak sat
 */
export function sellResource(state: GameState, resourceId: string, amount: number): boolean {
  const available = state.resources[resourceId] || 0;
  if (available < amount) return false;

  // Basit fiyat: 10 TL per kaynak
  const price = amount * 10;
  state.money += price;
  state.resources[resourceId] -= amount;

  return true;
}

/**
 * Kaynak satın al
 */
export function buyResource(state: GameState, resourceId: string, amount: number): boolean {
  // Basit fiyat: 15 TL per kaynak
  const cost = amount * 15;
  if (state.money < cost) return false;

  state.money -= cost;
  state.resources[resourceId] = (state.resources[resourceId] || 0) + amount;

  return true;
}

/**
 * Pazar istatistikleri al
 */
export function getMarketStats(state: GameState): Record<string, any> {
  // Basit: her kaynağın fiyatı
  return {
    demir: 10,
    komur: 12,
    kereste: 8,
    bakir: 25,
    tas: 5,
    kil: 6,
    celik: 50,
    kablo: 40,
  };
}

/**
 * Oyun tick'i hesapla (0.1 saniye)
 */
export function calculateGameTick(state: GameState, speed: number = 1): void {
  // Enerji yenile
  state.energy = Math.min(state.maxEnergy, state.energy + 0.5 * speed);

  // Pasif gelir (binalardan)
  let passiveIncome = 0;
  for (const [buildingId, count] of Object.entries(state.buildings)) {
    const building = ALL_BUILDINGS.find((b) => b.id === buildingId);
    if (building && building.output === 'TL') {
      passiveIncome += building.rate * count * speed;
    }
  }

  state.money += passiveIncome;
  state.totalEarned += passiveIncome;

  // Araştırma puanları (binalardan)
  let rpIncome = 0;
  for (const [buildingId, count] of Object.entries(state.buildings)) {
    const building = ALL_BUILDINGS.find((b) => b.id === buildingId);
    if (building && building.output === 'RP') {
      rpIncome += building.rate * count * speed;
    }
  }

  state.researchPoints += rpIncome;

  // Kaynak üretimi
  for (const [buildingId, count] of Object.entries(state.buildings)) {
    const building = ALL_BUILDINGS.find((b) => b.id === buildingId);
    if (building && building.output && building.output !== 'TL' && building.output !== 'RP') {
      const produced = building.rate * count * speed;
      state.resources[building.output] = (state.resources[building.output] || 0) + produced;
    }
  }

  // Bölge ilerlemesi kontrol et
  checkZoneAdvance(state);

  // Başarıları kontrol et
  unlockAchievements(state);
}
