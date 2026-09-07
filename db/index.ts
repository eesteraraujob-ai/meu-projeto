import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('task-manager.db');

export function initializeDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      start_date TEXT,
      start_time TEXT,
      due_date TEXT,
      priority TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);

  const columns = db.getAllSync<{ name: string }>('PRAGMA table_info(tasks)');
  const columnNames = new Set(columns.map((column) => column.name));
  for (const column of ['start_date', 'start_time']) {
    if (!columnNames.has(column)) {
      db.execSync(`ALTER TABLE tasks ADD COLUMN ${column} TEXT`);
    }
  }
}

initializeDb();
