export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  mutedText: string;
  divider: string;
  inputBackground: string;
  chipBackground: string;
  chipActiveBackground: string;
  chipText: string;
  chipActiveText: string;
  primaryButtonBackground: string;
  primaryButtonText: string;
  outlineButtonBackground: string;
  outlineButtonBorder: string;
  outlineButtonText: string;
  dangerBackground: string;
  dangerBorder: string;
  dangerText: string;
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  statusPendingBackground: string;
  statusPendingText: string;
  statusInProgressBackground: string;
  statusInProgressText: string;
  statusCompletedBackground: string;
  statusCompletedText: string;
}

export const lightColors: ThemeColors = {
  background: '#f6f3ee',
  card: '#ffffff',
  cardBorder: '#ede9e2',
  text: '#221f1b',
  mutedText: '#8c8880',
  divider: '#ede9e2',
  inputBackground: '#f1ede6',
  chipBackground: '#efebe3',
  chipActiveBackground: '#1f1d1b',
  chipText: '#3a3733',
  chipActiveText: '#ffffff',
  primaryButtonBackground: '#1f1d1b',
  primaryButtonText: '#ffffff',
  outlineButtonBackground: '#ffffff',
  outlineButtonBorder: '#e7e3db',
  outlineButtonText: '#221f1b',
  dangerBackground: '#fbeaea',
  dangerBorder: '#f3cfce',
  dangerText: '#d0453f',
  priorityLow: '#3e8e52',
  priorityMedium: '#c98a2e',
  priorityHigh: '#d0453f',
  statusPendingBackground: '#efebe3',
  statusPendingText: '#5b564c',
  statusInProgressBackground: '#e4ecf5',
  statusInProgressText: '#3e5e85',
  statusCompletedBackground: '#e3efe1',
  statusCompletedText: '#3f7a45',
};

export const darkColors: ThemeColors = {
  background: '#171512',
  card: '#211f1c',
  cardBorder: '#332f2a',
  text: '#f3f1ec',
  mutedText: '#a39d93',
  divider: '#332f2a',
  inputBackground: '#2a2723',
  chipBackground: '#2a2723',
  chipActiveBackground: '#f3f1ec',
  chipText: '#d8d3ca',
  chipActiveText: '#171512',
  primaryButtonBackground: '#f3f1ec',
  primaryButtonText: '#171512',
  outlineButtonBackground: '#211f1c',
  outlineButtonBorder: '#3a362f',
  outlineButtonText: '#f3f1ec',
  dangerBackground: '#3b2323',
  dangerBorder: '#5a3232',
  dangerText: '#f0928d',
  priorityLow: '#6fcb85',
  priorityMedium: '#e3a857',
  priorityHigh: '#f0928d',
  statusPendingBackground: '#2a2723',
  statusPendingText: '#c9c3b8',
  statusInProgressBackground: '#22334a',
  statusInProgressText: '#9dbee0',
  statusCompletedBackground: '#243b27',
  statusCompletedText: '#8fc998',
};

export function getThemeColors(theme: ThemeName): ThemeColors {
  return theme === 'dark' ? darkColors : lightColors;
}
