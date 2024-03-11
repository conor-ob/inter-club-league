import { Stack, useGlobalSearchParams } from 'expo-router'

export default function Layout() {
  const { categoryGroupId } = useGlobalSearchParams<{
    categoryGroupId: string
  }>()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Results',
          headerLargeTitle: false
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: 'Results',
          headerLargeTitle: false,
          animation: 'none'
        }}
      />
      <Stack.Screen
        name='category'
        options={{
          title: parseCategoryGroupId(categoryGroupId)
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
