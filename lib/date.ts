export function normalizeDateInput(value: string): string | null {
  if (!value) return null;
  const cleaned = value.trim();
  if (!cleaned) return null;

  const date = new Date(cleaned);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

export function formatDateLabel(value: string | null): string {
  if (!value) return 'Sem data';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export type DueDateScope = 'all' | 'today' | 'this_week' | 'overdue' | 'none';

export function matchesDueDateScope(dueDate: string | null, scope: DueDateScope): boolean {
  if (scope === 'all') return true;
  if (scope === 'none') return dueDate === null;
  if (!dueDate) return false;

  const today = new Date().toISOString().slice(0, 10);
  if (scope === 'overdue') return dueDate < today;
  if (scope === 'today') return dueDate === today;

  const weekEnd = new Date();
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekEndIso = weekEnd.toISOString().slice(0, 10);
  return dueDate >= today && dueDate <= weekEndIso;
}
