import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { Settings } from '../types';

interface SettingsContextValue extends Settings {
  setLanguage: (language: Settings['language']) => void;
  setCurrency: (currency: Settings['currency']) => void;
}

const defaultSettings: Settings = {
  language: 'English',
  currency: 'USD',
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Settings['language']>(defaultSettings.language);
  const [currency, setCurrency] = useState<Settings['currency']>(defaultSettings.currency);

  const value = useMemo(
    () => ({
      language,
      currency,
      setLanguage,
      setCurrency,
    }),
    [language, currency]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
