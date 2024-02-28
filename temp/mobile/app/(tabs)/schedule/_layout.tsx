import Colours from '@/constants/Colours'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { useColorScheme } from 'react-native'

export default function Layout() {
  const params = useGlobalSearchParams()
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Schedule',
          headerLargeTitle: true,
          headerShadowVisible: false
          // headerStyle: { backgroundColor: '#121212' },
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: parseTitle(params.id),
          headerTitleStyle: {
            color: Colours[colorScheme ?? 'light'].textColourPrimary
          },
          headerTintColor: Colours[colorScheme ?? 'light'].brand,
          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}

function parseTitle(id: string | string[] | undefined): string | undefined {
  if (typeof id === 'string') {
    return `Stage ${id.split('-')[1]}`
  }
  return undefined
}