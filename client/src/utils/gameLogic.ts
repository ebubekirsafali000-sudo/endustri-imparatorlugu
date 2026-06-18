import { GameState } from './gameState';
import { ALL_BUILDINGS, ZONE_INFO } from '../data/gameData';

export function getResearchBonuses(s: GameState) {
  let prodMulti = 0, energyMulti = 0, wageMulti = 0, xpMulti = 0, moneyMulti = 0, rpMulti = 0, capBonus = 0;
  
  (s.researchUnlocked || []).forEach(rid => {
    // Production bonuses
    if (rid === 'r_prod1') prodMulti += 0.1;
    if (rid === 'r_prod2') prodMulti += 0.15;
    if (rid === 'r_prod3') prodMulti += 0.25;
    if (rid === 'r_prod4') prodMulti += 0.35;
    if (rid === 'r_prod5') prodMulti += 0.5;
    if (rid === 'r_prod6') prodMulti += 1.0;
    if (rid === 'r_prod7') prodMulti += 2.0;
    if (rid === 'r_gizli1') prodMulti += 1.5;
    if (rid === 'r_gizli3') prodMulti += 3.0;
    
    // Energy bonuses
    if (rid === 'r_energy1') energyMulti += 0.1;
    if (rid === 'r_energy2') energyMulti += 0.2;
    if (rid === 'r_energy3') energyMulti += 0.3;
    if (rid === 'r_energy4') energyMulti += 0.5;
    
    // Wage reduction (negative = better)
    if (rid === 'r_wage1') wageMulti -= 0.1;
    if (rid === 'r_wage2') wageMulti -= 0.15;
    if (rid === 'r_wage3') wageMulti -= 0.3;
    if (rid === 'r_wage4') wageMulti -= 0.4;
    if (rid === 'r_wage5') wageMulti -= 0.6;
    
    // XP bonuses
    if (rid === 'r_xp1') xpMulti += 0.25;
    if (rid === 'r_xp2') xpMulti += 0.4;
    if (rid === 'r_xp3') xpMulti += 1.0;
    
    // Money bonuses
    if (rid === 'r_money1') moneyMulti += 0.2;
    if (rid === 'r_money2') moneyMulti += 0.3;
    if (rid === 'r_money3') moneyMulti += 0.5;
    if (rid === 'r_money4') moneyMulti += 0.75;
    if (rid === 'r_money5') moneyMulti += 1.0;
    if (rid === 'r_gizli2') moneyMulti += 2.5;
    
    // Research points bonuses
    if (rid === 'r_rp1') rpMulti += 0.25;
    if (rid === 'r_rp2') rpMulti += 0.5;
    if (rid === 'r_rp3') rpMulti += 0.8;
    if (rid === 'r_rp4') rpMulti += 1.2;
    if (rid === 'r_rp5') rpMulti += 2.0;
    if (rid === 'r_rp6') rpMulti += 5.0;
    
    // Capacity bonuses
    if (rid === 'r_cap1') capBonus += 2000;
    if (rid === 'r_cap2') capBonus += 5000;
    if (rid === 'r_cap3') capBonus += 15000;
    if (rid === 'r_cap4') capBonus += 50000;
    if (rid === 'r_cap5') capBonus += 200000;
  });

  return { prodMulti, energyMulti, wageMulti, xpMulti, moneyMulti, rpMulti, capBonus };
}

export function getBuildingUpgradeMult(s: GameState, buildingId: string): number {
  const upgLevel = s.bldUpgrades[buildingId] || 0;
  return 1 + upgLevel * 0.1;
}

export function getMarketPrice(s: GameState, res: string): number {
  return 100;
}

export function getActiveEventMultipliers(s: GameState) {
  let prod = 1, wage = 1, xp = 1, rp = 1;
  
  if (s.activeEvent && s.activeEvent.endTime > Date.now()) {
    if (s.activeEvent.id === 'event_double_money') prod = 2;
    if (s.activeEvent.id === 'event_triple_xp') xp = 3;
    if (s.activeEvent.id === 'event_production_boost') prod = 2;
  }
  
  return { prod, wage, xp, rp, stopProd: false };
}

export function calculateGameTick(s: GameState, deltaTime: number = 1) {
  const diff = s.difficulty || 'normal';
  const costMult = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.8 : diff === 'insane' ? 3 : 1;
  const wageMult = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.5 : diff === 'insane' ? 2.5 : 1;
  const xpMult = diff === 'easy' ? 1.5 : diff === 'hard' ? 0.8 : diff === 'insane' ? 0.5 : 1;

  const bonuses = getResearchBonuses(s);
  const events = getActiveEventMultipliers(s);

  // Calculate production
  let totalEnergyProd = 0;
  let totalEnergyCons = 0;
  let totalOutput: Record<string, number> = {};
  let totalWageCost = 0;

  ALL_BUILDINGS.forEach(b => {
    const count = s.bldCounts[b.id] || 0;
    if (count === 0) return;

    const upgMult = getBuildingUpgradeMult(s, b.id);
    const prodMult = 1 + bonuses.prodMulti;

    // Energy
    totalEnergyProd += b.energyProd * count * upgMult;
    totalEnergyCons += b.energyUse * count * upgMult;

    // Output
    if (b.output) {
      const rate = b.rate * count * upgMult * prodMult * events.prod;
      totalOutput[b.output] = (totalOutput[b.output] || 0) + rate * deltaTime;
    }

    // Wages
    const wage = b.workerWage * b.workers * count * wageMult * (1 + bonuses.wageMulti);
    totalWageCost += wage * deltaTime;
  });

  // Apply energy constraint
  const energyOK = totalEnergyProd >= totalEnergyCons;
  if (!energyOK) {
    Object.keys(totalOutput).forEach(k => {
      totalOutput[k] *= 0.5; // 50% reduction if not enough energy
    });
  }

  // Update state
  s.energyProd = totalEnergyProd;
  s.energyCons = totalEnergyCons;
  s.money += (totalOutput['TL'] || 0) - totalWageCost;
  s.researchPoints += totalOutput['RP'] || 0;

  // Update resources
  Object.entries(totalOutput).forEach(([res, amount]) => {
    if (res !== 'TL' && res !== 'RP') {
      s.resources[res] = (s.resources[res] || 0) + amount;
    }
  });

  // Apply RP multiplier
  if (totalOutput['RP']) {
    s.researchPoints += (totalOutput['RP'] * (1 + bonuses.rpMulti)) - (totalOutput['RP'] || 0);
  }

  // Passive XP gain
  s.xp += (0.1 * (s.bldCounts['arastirma_lab'] || 0)) * (1 + bonuses.xpMulti) * xpMult * deltaTime;

  // Level up
  const XP_PER_LEVEL = (level: number) => 100 * Math.pow(1.15, level - 1);
  while (s.xp >= XP_PER_LEVEL(s.level)) {
    s.xp -= XP_PER_LEVEL(s.level);
    s.level += 1;
  }

  // Play time
  s.playTime += deltaTime;
}

export function buyBuilding(s: GameState, buildingId: string): boolean {
  const building = ALL_BUILDINGS.find(b => b.id === buildingId);
  if (!building) return false;

  const diff = s.difficulty || 'normal';
  const costMult = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.8 : diff === 'insane' ? 3 : 1;
  const cost = building.cost * costMult;

  if (s.money < cost) return false;

  s.money -= cost;
  s.bldCounts[buildingId] = (s.bldCounts[buildingId] || 0) + 1;
  s.totalBuildings += 1;
  s.totalEarned += cost;

  return true;
}

export function sellBuilding(s: GameState, buildingId: string): boolean {
  if ((s.bldCounts[buildingId] || 0) === 0) return false;

  const building = ALL_BUILDINGS.find(b => b.id === buildingId);
  if (!building) return false;

  const diff = s.difficulty || 'normal';
  const costMult = diff === 'easy' ? 0.5 : diff === 'hard' ? 1.8 : diff === 'insane' ? 3 : 1;
  const refund = (building.cost * costMult) * 0.5; // 50% refund

  s.money += refund;
  s.bldCounts[buildingId] -= 1;
  s.totalBuildings -= 1;

  return true;
}

export function unlockResearch(s: GameState, researchId: string): boolean {
  if ((s.researchUnlocked || []).includes(researchId)) return false;

  // Import RESEARCH_TREE to get actual cost
  const { RESEARCH_TREE } = require('../data/gameData');
  const research = RESEARCH_TREE.find((r: any) => r.id === researchId);
  if (!research) return false;

  const cost = research.cost || 0;
  if (s.researchPoints < cost) return false;

  // Check prerequisites
  if (research.req && !s.researchUnlocked.includes(research.req)) return false;

  s.researchPoints -= cost;
  s.researchUnlocked.push(researchId);

  return true;
}


export function checkZoneAdvance(s: GameState): boolean {
  if (s.zone >= 8) return false;
  const nextZone = s.zone + 1;
  const levelReq = nextZone * 10;
  if (s.level >= levelReq) {
    s.zone = nextZone;
    return true;
  }
  return false;
}

export function doPrestige(s: GameState, makeDefault: any) {
  const prestigeBonus = 1 + (s.zone - 1) * 0.1;
  const newState = makeDefault(s.difficulty);
  newState.prestigeCount = (s.prestigeCount || 0) + 1;
  newState.prestigeBonus = prestigeBonus;
  return newState;
}


export function completeContract(s: GameState, contractId: string, reward: number): boolean {
  if ((s.contractsCompleted || []).includes(contractId)) return false;
  s.money += reward;
  s.contractsCompleted = [...(s.contractsCompleted || []), contractId];
  return true;
}

export function completeExpedition(s: GameState, expeditionId: string, reward: number, chance: number): boolean {
  if ((s.expeditionsCompleted || []).includes(expeditionId)) return false;
  if (Math.random() < chance) {
    s.money += reward;
    s.expeditionsCompleted = [...(s.expeditionsCompleted || []), expeditionId];
    return true;
  }
  return false;
}


export function checkAchievements(s: GameState): string[] {
  const newAchievements: string[] = [];
  
  if (s.totalBuildings >= 1 && !(s.achievementsUnlocked || []).includes('a_first_building')) {
    newAchievements.push('a_first_building');
  }
  if (s.totalBuildings >= 100 && !(s.achievementsUnlocked || []).includes('a_100_buildings')) {
    newAchievements.push('a_100_buildings');
  }
  if ((s.prestigeCount || 0) >= 1 && !(s.achievementsUnlocked || []).includes('a_first_prestige')) {
    newAchievements.push('a_first_prestige');
  }
  if (s.zone >= 2 && !(s.achievementsUnlocked || []).includes('a_zone_2')) {
    newAchievements.push('a_zone_2');
  }
  if (s.zone >= 3 && !(s.achievementsUnlocked || []).includes('a_zone_3')) {
    newAchievements.push('a_zone_3');
  }
  if (s.money >= 1000000 && !(s.achievementsUnlocked || []).includes('a_1m_money')) {
    newAchievements.push('a_1m_money');
  }
  
  return newAchievements;
}

export function unlockAchievements(s: GameState): void {
  const newAchievements = checkAchievements(s);
  newAchievements.forEach(a => {
    if (!(s.achievementsUnlocked || []).includes(a)) {
      s.achievementsUnlocked = [...(s.achievementsUnlocked || []), a];
      s.money += 5000; // Achievement reward
    }
  });
}


export function sellResource(s: GameState, resourceName: string, amount: number): boolean {
  const available = s.resources[resourceName] || 0;
  if (available < amount) return false;
  
  const price = getMarketPrice(s, resourceName);
  const totalMoney = amount * price;
  
  s.resources[resourceName] = available - amount;
  s.money += totalMoney;
  
  return true;
}

export function buyResource(s: GameState, resourceName: string, amount: number): boolean {
  const price = getMarketPrice(s, resourceName);
  const totalCost = amount * price;
  
  if (s.money < totalCost) return false;
  
  s.money -= totalCost;
  s.resources[resourceName] = (s.resources[resourceName] || 0) + amount;
  
  return true;
}

export function getMarketStats(s: GameState): Record<string, { price: number; trend: string }> {
  const resources = ['demir', 'komur', 'kereste', 'bakir', 'tas', 'kil', 'celik', 'kablo', 'tahta', 'cimento', 'altin', 'petrol', 'plastik', 'lojistik', 'RP'];
  const stats: Record<string, { price: number; trend: string }> = {};
  
  resources.forEach(res => {
    const price = getMarketPrice(s, res);
    const trend = Math.random() > 0.5 ? '📈' : '📉';
    stats[res] = { price, trend };
  });
  
  return stats;
}
