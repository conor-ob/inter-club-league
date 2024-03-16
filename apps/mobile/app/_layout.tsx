import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts
} from '@expo-google-fonts/inter'
import { Provider } from '@turbostack/app/provider'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

import '../global.css'

export default function Root() {
  const [loaded, error] = useFonts({
    'inter-thin': Inter_100Thin,
    'inter-extralight': Inter_200ExtraLight,
    'inter-light': Inter_300Light,
    'inter-regular': Inter_400Regular,
    'inter-medium': Inter_500Medium,
    'inter-semibold': Inter_600SemiBold,
    'inter-bold': Inter_700Bold,
    'inter-extrabold': Inter_800ExtraBold,
    'inter-black': Inter_900Black
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'poo' }} />
      </Stack>
    </Provider>
  )
}
