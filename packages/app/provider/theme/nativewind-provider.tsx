import { themes } from '@inter-club-league/app/design/colors'
import { useColorScheme } from 'nativewind'
import React, { createContext } from 'react'
import { View } from 'react-native'

interface NativewindProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<{
  theme: 'light' | 'dark'
}>({
  theme: 'light'
})

export const NativewindProvider = ({ children }: NativewindProviderProps) => {
  const { colorScheme } = useColorScheme()

  return (
    <ThemeContext.Provider value={{ theme: colorScheme ?? 'light' }}>
      <View style={themes[colorScheme ?? 'light']} className='flex-1'>
        {children}
      </View>
    </ThemeContext.Provider>
  )
}
