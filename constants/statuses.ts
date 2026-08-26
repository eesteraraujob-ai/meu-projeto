export const TASK_STATUSES = ['pending', 'in_progress', 'completed'] as const;

export const STATUS_LABELS: Record<(typeof TASK_STATUSES)[number], string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluída',
};
