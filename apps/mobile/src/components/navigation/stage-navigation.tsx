import { colors } from '@/design/color-theme'
import { useStagesQuery } from '@/graphql/use-stages-query'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Ionicon } from '../ionicon'

type StageNavigationProps = {
  baseUrl: string
  stageId?: string
  search?: string
}

export function StageNavigation({
  baseUrl,
  stageId,
  search
}: StageNavigationProps) {
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()

  if (data && stageId) {
    const stageIds = data.stages.map((it) => it.id)
    const currentStage = data.stages.find((it) => it.id === stageId)! // TODO !
    const currentStageIndex = stageIds.indexOf(stageId)

    const previousStageId =
      currentStageIndex > 0 ? stageIds[currentStageIndex - 1] : null
    const nextStageId =
      currentStageIndex >= 0 && currentStageIndex < stageIds.length - 1
        ? stageIds[currentStageIndex + 1]
        : null

    return (
      <View>
        <View className='flex items-center justify-center'>
          <Text className='text-primary mx-2 text-lg'>{currentStage.name}</Text>
        </View>

        <View className='flex flex-row justify-between'>
          {previousStageId ? (
            // <Button
            //   color={colors[colorScheme ?? 'light'].brandDefault}
            //   title={`Stage ${previousStageId.split('-')[1]}`}
            //   onPress={() =>
            //     router.navigate(`/(tabs)/schedule/${previousStageId}`)
            //   }
            // />
            <TouchableOpacity
              className='flex flex-row items-center'
              onPress={() =>
                router.navigate({
                  pathname: `${baseUrl}`,
                  params: { id: previousStageId, search: search }
                })
              }
            >
              <Ionicon
                name='chevron-back-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
              <Text className='text-brand font-inter-regular text-lg'>{`Stage ${previousStageId.split('-')[1]}`}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {nextStageId ? (
            <TouchableOpacity
              className='flex flex-row items-center'
              onPress={() =>
                router.navigate({
                  pathname: `${baseUrl}`,
                  params: { id: nextStageId, search: search }
                })
              }
            >
              <Text className='text-brand font-inter-regular text-lg'>{`Stage ${nextStageId.split('-')[1]}`}</Text>
              <Ionicon
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
  }

  return null
}
