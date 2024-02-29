import { themes } from '@/design/color-theme'
import { useColorScheme } from 'nativewind'
import React, { createContext } from 'react'
import { View } from 'react-native'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<{
  theme: 'light' | 'dark'
}>({
  theme: 'light'
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme()
  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[colorScheme]} className='flex-1'>
        {children}
      </View>
    </ThemeContext.Provider>
  )
}
