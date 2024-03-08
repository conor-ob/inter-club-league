import { colors } from '@/design/color-theme'
import { ScheduleListCard } from '@/features/schedule/schedule-list-card'
import { useStagesQuery } from '@/graphql/use-stages-query'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Card } from '../card/card'
import { Ionicon } from '../ionicon'
import { Skeleton } from '../loaders/skeleton'

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
  const router = useRouter()

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
      <Card>
        <View>
          <ScheduleListCard stages={[currentStage]} />
          <View className='flex flex-row'>
            <View className='border-quarternary flex flex-1 items-center border-r border-t p-4'>
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
            <View className='border-quarternary flex flex-1 items-center border-t p-4'>
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
        </View>
      </Card>
    )
  }

  return <Skeleton className='h-56' />
}
