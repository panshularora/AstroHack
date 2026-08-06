export function formatTime(
  date: Date,
  format: '12h' | '24h' = '12h',
  showSeconds: boolean = false
): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  if (format === '12h') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, '0');
    return showSeconds
      ? `${formattedHours}:${minutes}:${seconds} ${ampm}`
      : `${formattedHours}:${minutes} ${ampm}`;
  } else {
    const formattedHours = hours.toString().padStart(2, '0');
    return showSeconds
      ? `${formattedHours}:${minutes}:${seconds}`
      : `${formattedHours}:${minutes}`;
  }
}

export function formatDateString(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDayProgress(date: Date): number {
  const secondsInDay = 86400;
  const currentSeconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return Math.min(100, Math.max(0, (currentSeconds / secondsInDay) * 100));
}

export function getDateFromDayProgress(progress: number, baseDate: Date = new Date()): Date {
  const totalSeconds = Math.floor((progress / 100) * 86400);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const newDate = new Date(baseDate);
  newDate.setHours(hours, minutes, seconds, 0);
  return newDate;
}

export function getMonthProgress(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = date.getDate() - 1 + date.getHours() / 24;
  return Math.min(100, Math.max(0, (currentDay / daysInMonth) * 100));
}

export function getYearProgress(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const end = new Date(date.getFullYear() + 1, 0, 1);
  const total = end.getTime() - start.getTime();
  const current = date.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (current / total) * 100));
}

export function getRemainingDayTime(date: Date): { hours: number; minutes: number } {
  const totalMinutesLeft = 1440 - (date.getHours() * 60 + date.getMinutes());
  const hours = Math.floor(totalMinutesLeft / 60);
  const minutes = totalMinutesLeft % 60;
  return { hours, minutes };
}
