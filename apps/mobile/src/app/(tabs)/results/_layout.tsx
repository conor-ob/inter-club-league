import { colors } from '@/design/color-theme'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'

export default function Layout() {
  const { categoryGroupId } = useGlobalSearchParams<{
    categoryGroupId: string
  }>()
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Results',
          headerLargeTitle: true
          // headerSearchBarOptions:
          //   Platform.OS === 'android'
          //     ? {
          //         placeholder: 'Search',
          //         hintTextColor:
          //           colors[colorScheme ?? 'light'].textColorSecondary,
          //         headerIconColor: colors[colorScheme ?? 'light'].brandDefault,
          //         textColor: colors[colorScheme ?? 'light'].textColorPrimary,
          //         shouldShowHintSearchIcon: false
          //       }
          //     : {
          //         placeholder: 'Search'
          //       }
        }}
      />
      <Stack.Screen
        name='category'
        options={{
          title: parseCategoryGroupId(categoryGroupId),
          headerLargeTitle: false,
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

function parseCategoryGroupId(categoryGroupId?: string): string | undefined {
  if (categoryGroupId === undefined) {
    return undefined
  }

  const categoryIds = categoryGroupId.split('+')
  return categoryIds
    .map((it) => {
      switch (it) {
        case 'S':
          return 'Scratch'
        case 'SS':
          return 'Semi Scratch'
        case 'SL':
          return 'Semi Limit'
        case 'L':
          return 'Limit'
        default:
          return it
      }
    })
    .join(' & ')
}
