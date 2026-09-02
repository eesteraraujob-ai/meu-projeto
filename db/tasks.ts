import { db } from './index';
import { Task, TaskInput, TaskPriority, TaskStatus } from '../types/task';

function mapRow(row: any): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    startDate: row.start_date ?? null,
    startTime: row.start_time ?? null,
    dueDate: row.due_date ?? null,
    priority: row.priority as TaskPriority,
    status: row.status as TaskStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function getAllTasks(): Task[] {
  const rows = db.getAllSync(
    'SELECT * FROM tasks ORDER BY CASE status WHEN ? THEN 0 WHEN ? THEN 1 WHEN ? THEN 2 ELSE 3 END, due_date IS NULL, due_date ASC, updated_at DESC',
    'pending',
    'in_progress',
    'completed'
  );

  return rows.map(mapRow);
}

export function getTaskById(id: string): Task | null {
  const row = db.getFirstSync('SELECT * FROM tasks WHERE id = ?', id);
  return row ? mapRow(row) : null;
}

export function createTask(input: TaskInput): Task {
  const now = new Date().toISOString();
  const task: Task = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: input.title,
    description: input.description ?? '',
    startDate: input.startDate ?? null,
    startTime: input.startTime ?? null,
    dueDate: input.dueDate ?? null,
    priority: input.priority,
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };

  db.runSync(
    'INSERT INTO tasks (id, title, description, start_date, start_time, due_date, priority, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    task.id,
    task.title,
    task.description,
    task.startDate,
    task.startTime,
    task.dueDate,
    task.priority,
    task.status,
    task.createdAt,
    task.updatedAt
  );

  return task;
}

export function updateTask(id: string, patches: Partial<TaskInput> & { status?: TaskStatus; priority?: TaskPriority }): Task | null {
  const current = getTaskById(id);
  if (!current) return null;

  const next: Task = {
    ...current,
    ...patches,
    updatedAt: new Date().toISOString(),
  };

  db.runSync(
    'UPDATE tasks SET title = ?, description = ?, start_date = ?, start_time = ?, due_date = ?, priority = ?, status = ?, updated_at = ? WHERE id = ?',
    next.title,
    next.description,
    next.startDate,
    next.startTime,
    next.dueDate,
    next.priority,
    next.status,
    next.updatedAt,
    id
  );

  return next;
}

export function deleteTask(id: string): void {
  db.runSync('DELETE FROM tasks WHERE id = ?', id);
}
