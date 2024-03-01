import { Stack, useGlobalSearchParams } from 'expo-router'

export default function Layout() {
  const params = useGlobalSearchParams()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Schedule',
          headerLargeTitle: true
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: parseTitle(params.id)
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
