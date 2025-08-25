// Theme configuration for the app
export const darkTheme = {
  // Base colors
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#4a6ee0',
  secondary: '#0099cc',
  accent: '#4a6ee0',
  error: '#cf6679',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b3b3b3',
  textTertiary: '#8c8c8c',
  textDisabled: '#666666',
  
  // UI element colors
  cardBackground: '#2c2c2c',
  divider: '#383838',
  tabBarBackground: '#1a1a1a',
  tabBarActive: '#4a6ee0',
  tabBarInactive: '#8c8c8c',
  inputBackground: '#333333',
  shadow: '#000000',
  favorite: '#ff4a6e',
  favoriteInactive: '#555555',
  filterBackground: '#333f6e',
  
  // Status bar
  statusBarStyle: 'light',
};

// Function to get the current theme
export const getTheme = () => {
  // For now, we're only returning dark theme
  // This could be expanded to support light/dark toggle
  return darkTheme;
};