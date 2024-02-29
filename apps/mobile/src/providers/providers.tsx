import { ApolloClientProvider } from '@/providers/apollo/apollo-client-provider'
import { ThemeProvider as TailwindThemeProvider } from '@/providers/theme/theme-provider'
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
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as ReactNativeThemeProvider
} from '@react-navigation/native'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const colorScheme = useColorScheme()
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
    <ApolloClientProvider>
      <ReactNativeThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <TailwindThemeProvider>{children}</TailwindThemeProvider>
      </ReactNativeThemeProvider>
    </ApolloClientProvider>
  )
}
