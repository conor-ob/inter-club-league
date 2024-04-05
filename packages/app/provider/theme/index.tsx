import { ThemeProvider as ReactNativeThemeProvider } from '@react-navigation/native'
import { darkTheme, lightTheme } from 'app/design/colors'
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
