import { colors } from '@/design/color-theme'
import { Stack, router, useGlobalSearchParams } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'

export default function Layout() {
  const { id, search } = useGlobalSearchParams<{ id: string; search: string }>()
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'GC',
          headerLargeTitle: true,
          headerShadowVisible: true,
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
                  placeholder: 'Search',
                  onChangeText(e) {
                    router.navigate({
                      pathname: '/(tabs)/gc',
                      params: { id: id, search: e.nativeEvent.text }
                    })
                  }
                }
        }}
      />
    </Stack>
  )
}
