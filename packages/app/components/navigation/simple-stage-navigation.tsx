import { colors } from '@inter-club-league/app/design/colors'
import { useStagesQuery } from '@inter-club-league/app/graphql/use-stages-query'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { SvgIcon } from '../icons/svg-icon'

type SimpleStageNavigationProps = {
  baseUrl: string
}

const { useParams } = createParam<{
  id: string
}>()

export function SimpleStageNavigation({ baseUrl }: SimpleStageNavigationProps) {
  const { params } = useParams()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const { push } = useRouter()

  const stageId = params.id

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
      <View className='bg-background flex flex-row'>
        <View className='flex flex-1 items-center p-4'>
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
              {/* <ChevronLeft
                height={20}
                width={20}
                color={colors[colorScheme ?? 'light'].brandDefault}
              /> */}
              <SvgIcon
                name='chevron-left'
                size={20}
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
              <View className='w-2' />
              <Text className='text-brand font-inter-regular text-base'>{`Stage ${previousStageId.split('-')[1]}`}</Text>
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
              {/* <ChevronRight
                height={20}
                width={20}
                color={colors[colorScheme ?? 'light'].brandDefault}
              /> */}
              <View className='w-2' />
              <SvgIcon
                name='chevron-right'
                size={20}
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
