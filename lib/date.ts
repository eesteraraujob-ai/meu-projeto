export function normalizeDateInput(value: string): string | null {
  const cleaned = value.trim();
  if (!cleaned) return null;

  const isoMatch = cleaned.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const brMatch = cleaned.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);

  let year: number;
  let month: number;
  let day: number;
  if (isoMatch) {
    [year, month, day] = [Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3])];
  } else if (brMatch) {
    [day, month, year] = [Number(brMatch[1]), Number(brMatch[2]), Number(brMatch[3])];
  } else {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  const isRealCalendarDate =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  if (!isRealCalendarDate) return null;

  return date.toISOString().slice(0, 10);
}

export function formatDateLabel(value: string | null): string {
  if (!value) return 'Sem data';
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

export type DueDateScope = 'all' | 'today' | 'this_week' | 'overdue' | 'none';

function localIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function matchesDueDateScope(dueDate: string | null, scope: DueDateScope): boolean {
  if (scope === 'all') return true;
  if (scope === 'none') return dueDate === null;
  if (!dueDate) return false;

  const today = localIsoDate(new Date());
  if (scope === 'overdue') return dueDate < today;
  if (scope === 'today') return dueDate === today;

  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekEndIso = localIsoDate(weekEnd);
  return dueDate >= today && dueDate <= weekEndIso;
}
