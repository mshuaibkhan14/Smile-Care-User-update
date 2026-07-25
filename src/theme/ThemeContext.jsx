import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme } from './themeConfig';

// Context API used here instead of prop-drilling the shade + toggle function
// through every layout/page that needs it (matches context/index.jsx pattern
// taught in class: create context -> provide at top -> consume with useContext).
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [shade, setShade] = useState('light'); // 'light' | 'dark'

  const toggleShade = () => setShade((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Reflect the active shade on <html> so plain-CSS variables in theme.css
  // switch alongside the Ant Design tokens.
  useEffect(() => {
    document.documentElement.setAttribute('data-shade', shade);
  }, [shade]);

  const antdTheme = useMemo(() => (shade === 'light' ? lightTheme : darkTheme), [shade]);

  const value = useMemo(() => ({ shade, toggleShade }), [shade]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useShade() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useShade must be used within ThemeProvider');
  return ctx;
}
