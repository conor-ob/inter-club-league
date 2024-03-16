import { darkTheme, lightTheme } from '@inter-club-league/app/design/colors'
import { ThemeProvider as ReactNativeThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

type ThemeProviderProps = {
  children: React.ReactElement
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme()

  return (
    <ReactNativeThemeProvider
      value={colorScheme === 'dark' ? darkTheme : lightTheme}
    >
      {children}
    </ReactNativeThemeProvider>
  )
}
