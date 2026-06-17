export function fmtNum(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return Math.floor(n).toString();
}

export function fmtRate(n: number): string {
  if (n === 0) return '0/s';
  if (n < 0) return fmtNum(n) + '/s';
  return '+' + fmtNum(n) + '/s';
}

export function XP_PER_LEVEL(level: number): number {
  return 100 * Math.pow(1.15, level - 1);
}
