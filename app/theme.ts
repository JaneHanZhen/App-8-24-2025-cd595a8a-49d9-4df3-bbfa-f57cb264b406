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

export const lightTheme = {
  // Base colors
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#4a6ee0',
  secondary: '#0099cc',
  accent: '#4a6ee0',
  error: '#b00020',
  
  // Text colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9e9e9e',
  textDisabled: '#bdbdbd',
  
  // UI element colors
  cardBackground: '#ffffff',
  divider: '#e0e0e0',
  tabBarBackground: '#ffffff',
  tabBarActive: '#4a6ee0',
  tabBarInactive: '#9e9e9e',
  inputBackground: '#f0f0f0',
  shadow: '#cccccc',
  favorite: '#ff4a6e',
  favoriteInactive: '#dddddd',
  filterBackground: '#e6ecff',
  
  // Status bar
  statusBarStyle: 'dark',
};

// Function to get the current theme
export const getTheme = () => {
  // Now returning light theme
  return lightTheme;
};