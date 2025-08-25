import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getTheme } from './theme';

export default function RootLayout() {
  const theme = getTheme();
  
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.surface,
          },
          headerTintColor: theme.textPrimary,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme.statusBarStyle} />
    </>
  );
}