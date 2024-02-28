import Colours from '@/constants/Colours'
import { Stack } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'

export default function Layout() {
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'GC',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerSearchBarOptions:
            Platform.OS === 'android'
              ? {
                  placeholder: 'Search',
                  hintTextColor:
                    Colours[colorScheme ?? 'light'].textColourSecondary,
                  headerIconColor: Colours[colorScheme ?? 'light'].brand,
                  textColor: Colours[colorScheme ?? 'light'].textColourPrimary,
                  shouldShowHintSearchIcon: false
                }
              : {
                  placeholder: 'Search',
                  tintColor: Colours[colorScheme ?? 'light'].brand
                }
        }}
      />
    </Stack>
  )
}
