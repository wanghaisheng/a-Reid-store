import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, PaletteMode, createTheme, responsiveFontSizes } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import getDesignTokens from './customTheme';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currentMode = localStorage.getItem('mode') as PaletteMode;
  const [mode, setMode] = useState<PaletteMode>(currentMode! ? currentMode : 'light');

  const colorMode = useMemo(
    () => ({
      mode,
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
      },
    }),
    [mode]
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode))), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Global reset = normalize.css */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
