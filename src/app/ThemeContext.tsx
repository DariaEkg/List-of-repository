'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from './theme';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}>({
  mode: 'light',
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ThemeMode>('dark');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
} 