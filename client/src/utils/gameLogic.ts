import { GameState } from './gameState';
import { ALL_BUILDINGS, ZONE_INFO } from '../data/gameData';

export function getResearchBonuses(s: GameState) {
  let prodMulti = 0, energyMulti = 0, wageMulti = 0, xpMulti = 0, moneyMulti = 0, rpMulti = 0;
  
  (s.researchUnlocked || []).forEach(rid => {
    if (rid === 'r_prod1') prodMulti += 0.1;
    if (rid === 'r_energy1') energyMulti += 0.1;
    if (rid === 'r_wage1') wageMulti -= 0.1;
    if (rid === 'r_xp1') xpMulti += 0.2;
  });

  return { prodMulti, energyMulti, wageMulti, xpMulti, moneyMulti, rpMulti, capBonus: 0 };
}

export function getBuildingUpgradeMult(s: GameState, buildingId: string): number {
  const upgLevel = s.bldUpgrades[buildingId] || 0;
  return 1 + upgLevel * 0.1;
}

export function getMarketPrice(s: GameState, res: string): number {
  return 100;
}

export function getActiveEventMultipliers(s: GameState) {
  return { prod: 1, wage: 1, xp: 1, rp: 1, stopProd: false };
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

  // Passive XP gain
  s.xp += (0.1 * (s.bldCounts['arastirma_lab'] || 0)) * xpMult * deltaTime;

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

  // Find cost (placeholder)
  const cost = 100;
  if (s.researchPoints < cost) return false;

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
