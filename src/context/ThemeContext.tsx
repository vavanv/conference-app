import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeMode } from '../theme';

type ThemeContextType = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
