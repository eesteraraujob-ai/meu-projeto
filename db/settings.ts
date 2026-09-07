import { db } from './index';

export function getSetting(key: string): string | null {
  const row = db.getFirstSync<{ value: string }>('SELECT value FROM app_settings WHERE key = ?', key);
  return row ? row.value : null;
}

export function setSetting(key: string, value: string): void {
  db.runSync(
    'INSERT INTO app_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key,
    value
  );
}
