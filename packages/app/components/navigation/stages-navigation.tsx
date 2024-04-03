import { useStagesQuery } from '@inter-club-league/app/graphql/use-stages-query'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Card } from '../card/card'
// import { Ionicon } from '../ionicon'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { Skeleton } from '../loading/skeleton'

type StagesNavigationProps = {
  baseUrl: string
  search?: string
}

const { useParams } = createParam<{
  id: string
}>()

export function StageNavigations({ baseUrl, search }: StagesNavigationProps) {
  const { params } = useParams()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const { push } = useRouter()

  const stageId = params.id

  if (data) {
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
          {/* <ScheduleListCard stages={[currentStage]} /> */}
          <View className='flex flex-row'>
            <View className='border-quarternary flex flex-1 items-center border-r border-t p-4'>
              {previousStageId ? (
                <TouchableOpacity
                  className='flex flex-row items-center'
                  onPress={() =>
                    push({
                      pathname: `${baseUrl}/${previousStageId}`
                    })
                  }
                >
                  {/* <Ionicon
                    size={24}
                    name='chevron-back-outline'
                    color={colors[colorScheme ?? 'light'].brandDefault}
                  /> */}
                  <Text className='text-brand font-inter-regular text-base'>{`Stage ${previousStageId.split('-')[1]}`}</Text>
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
                    push({
                      pathname: `${baseUrl}/${nextStageId}`
                    })
                  }
                >
                  <Text className='text-brand font-inter-regular text-base'>{`Stage ${nextStageId.split('-')[1]}`}</Text>
                  {/* <Ionicon
                    size={24}
                    name='chevron-forward-outline'
                    color={colors[colorScheme ?? 'light'].brandDefault}
                  /> */}
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
