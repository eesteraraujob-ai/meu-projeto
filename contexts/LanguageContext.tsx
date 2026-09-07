import React, { createContext, useContext, useState } from 'react';
import { getSetting, setSetting } from '../db/settings';
import { Language, translations, TranslationKey } from '../lib/i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function loadInitialLanguage(): Language {
  return getSetting('language') === 'en' ? 'en' : 'pt';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(loadInitialLanguage);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    setSetting('language', next);
  };

  const t = (key: TranslationKey) => translations[language][key];

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
