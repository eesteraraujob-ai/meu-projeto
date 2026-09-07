export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  inputBackground: string;
  chipBackground: string;
  chipActiveBackground: string;
  chipText: string;
  chipActiveText: string;
  primaryButtonBackground: string;
  primaryButtonText: string;
  dangerBackground: string;
  dangerText: string;
}

export const lightColors: ThemeColors = {
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  mutedText: '#64748b',
  inputBackground: '#f1f5f9',
  chipBackground: '#e2e8f0',
  chipActiveBackground: '#2563eb',
  chipText: '#0f172a',
  chipActiveText: '#ffffff',
  primaryButtonBackground: '#2563eb',
  primaryButtonText: '#ffffff',
  dangerBackground: '#fecaca',
  dangerText: '#7f1d1d',
};

export const darkColors: ThemeColors = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f1f5f9',
  mutedText: '#94a3b8',
  inputBackground: '#334155',
  chipBackground: '#334155',
  chipActiveBackground: '#3b82f6',
  chipText: '#f1f5f9',
  chipActiveText: '#ffffff',
  primaryButtonBackground: '#3b82f6',
  primaryButtonText: '#ffffff',
  dangerBackground: '#7f1d1d',
  dangerText: '#fecaca',
};

export function getThemeColors(theme: ThemeName): ThemeColors {
  return theme === 'dark' ? darkColors : lightColors;
}
