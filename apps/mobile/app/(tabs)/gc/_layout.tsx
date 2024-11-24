import { stageNumberFromStageId } from '@inter-club-league/utils'
import { GcBadge } from 'app/components/gc/gc-badge'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function Layout() {
  const { id } = useGlobalSearchParams<{ id: string }>()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'GC',
          headerTitle: ({ children, tintColor }) => <GcBadge />
          // headerLargeTitle: true,
          // headerShadowVisible: true,
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
          //         placeholder: 'Search',
          //         onChangeText(e) {
          //           router.navigate({
          //             pathname: '/(tabs)/gc',
          //             params: { id: id, search: e.nativeEvent.text }
          //           })
          //         }
          //       }
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: id ? `Stage ${stageNumberFromStageId(id)}` : 'GC',
          headerTitle: ({ children, tintColor }) => (
            <View className='flex flex-row items-center'>
              <GcBadge />
              {id && (
                <Text className='text-primary ml-2 text-lg font-semibold'>{`Stage ${stageNumberFromStageId(id)}`}</Text>
              )}
            </View>
          ),
          animation: 'fade'
        }}
      />
    </Stack>
  )
}
