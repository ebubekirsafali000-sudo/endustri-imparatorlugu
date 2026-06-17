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
  contractsCompleted?: string[];
  expeditionsCompleted?: string[];
  achievementsUnlocked?: string[];
  theme?: string;
  soundEnabled?: boolean;
  leaderboardEntries?: Array<{ name: string; money: number; level: number; prestige: number }>;
  activeEvent?: { id: string; endTime: number };
  eventHistory?: string[];
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
    contractsCompleted: [],
    expeditionsCompleted: [],
    achievementsUnlocked: [],
    theme: 'dark',
    soundEnabled: true,
    leaderboardEntries: [],
    activeEvent: undefined,
    eventHistory: [],
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


export function toggleTheme(s: GameState): void {
  const themes = ['light', 'dark', 'auto'];
  const currentIndex = themes.indexOf(s.theme || 'dark');
  const nextIndex = (currentIndex + 1) % themes.length;
  s.theme = themes[nextIndex];
  doSave(s);
}

export function getTheme(s: GameState): string {
  return s.theme || 'dark';
}


export function updateLeaderboard(s: GameState, playerName: string = 'Oyuncu'): void {
  if (!s.leaderboardEntries) s.leaderboardEntries = [];
  
  const entry = {
    name: playerName,
    money: s.money,
    level: s.level,
    prestige: s.prestigeCount || 0,
  };
  
  s.leaderboardEntries.push(entry);
  s.leaderboardEntries.sort((a, b) => b.money - a.money);
  s.leaderboardEntries = s.leaderboardEntries.slice(0, 10);
  doSave(s);
}

export function triggerRandomEvent(s: GameState): void {
  if (s.activeEvent && s.activeEvent.endTime > Date.now()) return;
  
  const SPECIAL_EVENTS = [
    { id: 'event_double_money', name: '💰 2x Para', bonus: 2, type: 'money', duration: 300 },
    { id: 'event_triple_xp', name: '📈 3x XP', bonus: 3, type: 'xp', duration: 300 },
    { id: 'event_production_boost', name: '🏭 2x Üretim', bonus: 2, type: 'production', duration: 180 },
  ];
  
  if (Math.random() < 0.005) {
    const event = SPECIAL_EVENTS[Math.floor(Math.random() * SPECIAL_EVENTS.length)];
    s.activeEvent = { id: event.id, endTime: Date.now() + event.duration * 1000 };
    s.eventHistory = s.eventHistory || [];
    s.eventHistory.push(`${event.name} başladı!`);
    doSave(s);
  }
}
