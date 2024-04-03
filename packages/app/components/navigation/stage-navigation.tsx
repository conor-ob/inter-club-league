import { stageNumberFromStageId } from '@inter-club-league/utils'
import cx from 'classnames'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import { colors } from '../../design/colors'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { Card } from '../card/card'
import { HeroIcon } from '../icons/heroicon'
import { Row } from '../layout/row'
import { Skeleton } from '../loading/skeleton'

const { useParams } = createParam<{
  id: string
}>()

export function StageNavigation({
  baseUrl,
  disabled
}: {
  baseUrl: string
  disabled: boolean
}) {
  const { params } = useParams()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const { push } = useRouter()

  const stageId = params.id

  let previousStageId: string | null | undefined = undefined
  let nextStageId: string | null | undefined = undefined
  if (data?.stages) {
    const stageIds = data.stages.map((it) => it.id)

    const currentStageIndex = stageIds.indexOf(stageId)

    previousStageId =
      currentStageIndex > 0 ? stageIds[currentStageIndex - 1] : null
    nextStageId =
      currentStageIndex >= 0 && currentStageIndex < stageIds.length - 1
        ? stageIds[currentStageIndex + 1]
        : null
  }

  // return (
  //   <Card>
  //     <Row className='px-4 py-3'>
  //       <Text
  //         className={cx('font-inter-medium text-primary text-base', {
  //           'text-quarternary': disabled
  //         })}
  //       >
  //         Stage 1
  //       </Text>
  //     </Row>
  //   </Card>
  // )

  return loading ||
    (previousStageId === undefined && nextStageId === undefined) ? (
    <Skeleton className='h-12 rounded-xl' />
  ) : (
    <Card>
      <Row>
        <TouchableOpacity
          className='flex-1 flex-row items-center justify-start px-4 py-3'
          disabled={disabled || previousStageId === undefined}
        >
          <Link href={`${baseUrl}/${previousStageId}`}>
            <Row className='items-center'>
              {previousStageId && (
                <HeroIcon
                  name='arrow-long-left'
                  size={20}
                  color={
                    disabled
                      ? colors[colorScheme ?? 'light'].textColorQuarternary
                      : colors[colorScheme ?? 'light'].textColorSecondary
                  }
                />
              )}
              <View className='w-2' />
              <Text
                className={cx('font-inter-medium text-primary text-base', {
                  'text-quarternary': disabled
                })}
              >
                {previousStageId
                  ? `Stage ${stageNumberFromStageId(previousStageId)}`
                  : ''}
              </Text>
            </Row>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          className='flex-1 flex-row items-center justify-end px-4 py-3'
          disabled={disabled || nextStageId === undefined}
        >
          <Link href={`${baseUrl}/${nextStageId}`}>
            <Row className='items-center'>
              <Text
                className={cx('font-inter-medium text-primary text-base', {
                  'text-quarternary': disabled
                })}
              >
                {nextStageId
                  ? `Stage ${stageNumberFromStageId(nextStageId)}`
                  : ''}
              </Text>
              <View className='w-2' />
              {nextStageId && (
                <HeroIcon
                  name='arrow-long-right'
                  size={20}
                  color={
                    disabled
                      ? colors[colorScheme ?? 'light'].textColorQuarternary
                      : colors[colorScheme ?? 'light'].textColorSecondary
                  }
                />
              )}
            </Row>
          </Link>
        </TouchableOpacity>
      </Row>
    </Card>
  )
}
