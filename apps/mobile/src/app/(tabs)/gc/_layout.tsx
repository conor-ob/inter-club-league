import { colors } from '@/design/color-theme'
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
          headerSearchBarOptions:
            Platform.OS === 'android'
              ? {
                  placeholder: 'Search',
                  hintTextColor:
                    colors[colorScheme ?? 'light'].textColorSecondary,
                  headerIconColor: colors[colorScheme ?? 'light'].brandDefault,
                  textColor: colors[colorScheme ?? 'light'].textColorPrimary,
                  shouldShowHintSearchIcon: false
                }
              : {
                  placeholder: 'Search'
                }
        }}
      />
    </Stack>
  )
}
