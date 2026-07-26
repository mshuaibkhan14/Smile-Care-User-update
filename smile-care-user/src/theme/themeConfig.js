// ============================================================================
// THEME CONFIG — the single source of truth for the whole site.
//
// Every Ant Design component (Button, Card, Menu, Form...) reads its colors
// and fonts from here automatically via <ConfigProvider theme={...}>.
// To re-skin the entire site (e.g. green -> blue), you only ever need to
// change the values in `brand` below, plus the mirrored CSS variables in
// theme.css. Nothing else in the codebase should hardcode a color.
// ============================================================================

export const brand = {
  // Core brand color + shades
  primary: '#2D9E6B',      // main green
  primaryHover: '#268A5D', // slightly darker, used for hover states
  primaryLight: '#bff6db', // light shade — chips, hover backgrounds
  bgTint: '#F5FBF8',       // near-white green tint — section backgrounds
  dark: '#132A22',         // deep shadow green — footer, headings, shadows
  darkSecondary: '#1E3B31',// secondary dark shade

  // Neutral text
  textPrimary: '#152420',
  textSecondary: '#5B6B65',

  // Fonts
  fontHeading: `'Poppins', sans-serif`,
  fontBody: `'Inter', sans-serif`,
};

// Light theme tokens fed into antd's ConfigProvider
export const lightTheme = {
  token: {
    colorPrimary: brand.primary,
    colorPrimaryHover: brand.primaryHover,
    colorPrimaryBg: brand.primaryLight,
    colorInfo: brand.primary,
    colorText: brand.textPrimary,
    colorTextSecondary: brand.textSecondary,
    colorBgLayout: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    fontFamily: brand.fontBody,
    borderRadius: 12,
    controlHeight: 42,
  },
  components: {
    Button: {
      controlHeight: 44,
      fontWeight: 600,
      borderRadius: 10,
    },
    Menu: {
      itemSelectedColor: brand.primary,
      horizontalItemSelectedColor: brand.primary,
    },
    Card: {
      borderRadiusLG: 16,
    },
  },
};

// Dark theme tokens — same brand primary, inverted surfaces.
// Demonstrates the "one file, whole site updates" requirement: the shade
// toggle below only swaps which of these two objects is active.
export const darkTheme = {
  token: {
    colorPrimary: brand.primary,
    colorPrimaryHover: '#38B67C',
    colorPrimaryBg: '#173028',
    colorInfo: brand.primary,
    colorText: '#EAF3EF',
    colorTextSecondary: '#A9BDB5',
    colorBgLayout: brand.dark,
    colorBgContainer: brand.darkSecondary,
    fontFamily: brand.fontBody,
    borderRadius: 12,
    controlHeight: 42,
  },
  components: {
    Button: {
      controlHeight: 44,
      fontWeight: 600,
      borderRadius: 10,
    },
  },
};
