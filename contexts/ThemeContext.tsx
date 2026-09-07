import React, { createContext, useContext, useState } from 'react';
import { getSetting, setSetting } from '../db/settings';
import { getThemeColors, ThemeColors, ThemeName } from '../lib/theme';

interface ThemeContextValue {
  theme: ThemeName;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function loadInitialTheme(): ThemeName {
  return getSetting('theme') === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(loadInitialTheme);

  const setTheme = (next: ThemeName) => {
    setThemeState(next);
    setSetting('theme', next);
  };

  return <ThemeContext.Provider value={{ theme, colors: getThemeColors(theme), setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
