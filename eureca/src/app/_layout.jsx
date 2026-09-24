import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' />
      </Stack>
    </SafeAreaProvider>
  )
}
