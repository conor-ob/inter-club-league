import { Stack, useGlobalSearchParams } from 'expo-router'

export default function Layout() {
  const { id } = useGlobalSearchParams<{ id: string }>()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Schedule'
          // headerLargeTitle: true
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: `Stage ${id?.split('-')[1]}`
        }}
      />
    </Stack>
  )
}
