export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export const PRIORITY_LABELS: Record<(typeof TASK_PRIORITIES)[number], string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};
