export function timePassedSince(date?: Date): string {
  if (!date) return '0s';

  const now = new Date();
  const delta = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { unit: 'y', seconds: 31536000 },
    { unit: 'mo', seconds: 2592000 },
    { unit: 'd', seconds: 86400 },
    { unit: 'h', seconds: 3600 },
    { unit: 'm', seconds: 60 },
    { unit: 's', seconds: 1 },
  ];

  for (const interval of intervals) {
    const value = Math.floor(delta / interval.seconds);
    if (value >= 1) {
      return `${value}${interval.unit}`;
    }
  }

  return '0s';
}
