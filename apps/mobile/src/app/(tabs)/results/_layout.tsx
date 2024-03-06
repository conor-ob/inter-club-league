import { Stack, useGlobalSearchParams } from 'expo-router'

export default function Layout() {
  const { category } = useGlobalSearchParams<{ category: string }>()

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
          title: category ?? '',
          headerLargeTitle: true
        }}
      />
    </Stack>
  )
}
