import { Providers } from '@/providers/providers'
import { Stack } from 'expo-router'

import '../global.css'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </Providers>
  )
}
