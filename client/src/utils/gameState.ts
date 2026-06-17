import { DIFFICULTIES, ALL_BUILDINGS } from '../data/gameData';

export interface GameState {
  money: number;
  resources: Record<string, number>;
  resRates: Record<string, number>;
  energyProd: number;
  energyCons: number;
  researchPoints: number;
  xp: number;
  level: number;
  zone: number;
  bldCounts: Record<string, number>;
  bldUnlocked: Record<string, boolean>;
  bldUpgrades: Record<string, number>;
  totalEarned: number;
  totalBuildings: number;
  playTime: number;
  achievements: string[];
  researchUnlocked: string[];
  difficulty: string;
  messages: Array<{ id: number; type: string; text: string; time: string }>;
  prestigeCount?: number;
  prestigeBonus?: number;
}

const SAVE_KEY = 'endInc_v6';

export function makeDefault(diff: string = 'normal'): GameState {
  const d = DIFFICULTIES[diff as keyof typeof DIFFICULTIES] || DIFFICULTIES.normal;
  const bc: Record<string, number> = {};
  const bu: Record<string, boolean> = {};
  const upg: Record<string, number> = {};

  ALL_BUILDINGS.forEach(b => {
    bc[b.id] = 0;
    bu[b.id] = b.zone === 1;
    upg[b.id] = 0;
  });

  return {
    money: d.moneyStart,
    resources: {},
    resRates: {},
    energyProd: 0,
    energyCons: 0,
    researchPoints: 0,
    xp: 0,
    level: 1,
    zone: 1,
    bldCounts: bc,
    bldUnlocked: bu,
    bldUpgrades: upg,
    totalEarned: 0,
    totalBuildings: 0,
    playTime: 0,
    achievements: [],
    researchUnlocked: [],
    difficulty: diff,
    messages: [
      {
        id: Date.now(),
        type: 'info',
        text: '🏭 Endüstri İmparatorluğu v6 başladı! Haydi inşa edelim!',
        time: new Date().toLocaleTimeString('tr-TR'),
      },
    ],
    prestigeCount: 0,
    prestigeBonus: 1,
  };
}

export function doSave(s: GameState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...s, messages: s.messages.slice(0, 50) }));
  } catch (e) {
    // Silently fail
  }
}

export function doLoad(): GameState | null {
  try {
    const r = localStorage.getItem(SAVE_KEY);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}
