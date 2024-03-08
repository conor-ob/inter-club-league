import { colors } from '@/design/color-theme'
import { useStagesQuery } from '@/graphql/use-stages-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Ionicon } from '../ionicon'

type SimpleStageNavigationProps = {
  baseUrl: string
}

export function SimpleStageNavigation({ baseUrl }: SimpleStageNavigationProps) {
  const { id } = useLocalSearchParams<{ id: string }>()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const router = useRouter()

  const stageId = id

  if (data) {
    const stageIds = data.stages.map((it) => it.id)

    const currentStageIndex = stageIds.indexOf(stageId)

    const previousStageId =
      currentStageIndex > 0 ? stageIds[currentStageIndex - 1] : null
    const nextStageId =
      currentStageIndex >= 0 && currentStageIndex < stageIds.length - 1
        ? stageIds[currentStageIndex + 1]
        : null

    return (
      <View className='flex flex-row'>
        <View className='flex flex-1 items-center p-4'>
          {previousStageId ? (
            <TouchableOpacity
              className='flex flex-row items-center'
              onPress={() =>
                router.navigate({
                  pathname: `${baseUrl}/${previousStageId}`
                })
              }
            >
              <Ionicon
                size={24}
                name='chevron-back-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
              <Text className='text-brand font-inter-regular text-lg'>{`Stage ${previousStageId.split('-')[1]}`}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View className='flex flex-1 items-center p-4'>
          {nextStageId ? (
            <TouchableOpacity
              className='flex flex-row items-center'
              onPress={() =>
                router.navigate({
                  pathname: `${baseUrl}/${nextStageId}`
                })
              }
            >
              <Text className='text-brand font-inter-regular text-lg'>{`Stage ${nextStageId.split('-')[1]}`}</Text>
              <Ionicon
                size={24}
                name='chevron-forward-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    )
  } else {
    return <View></View>
  }
}
