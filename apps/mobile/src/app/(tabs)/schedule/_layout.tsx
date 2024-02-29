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
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: parseTitle(params.id),
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
