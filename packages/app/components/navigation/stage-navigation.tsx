import {
  seasonIdFromStageId,
  stageNumberFromStageId
} from '@inter-club-league/utils'
import { Stage } from 'app/generated/graphql'
import cx from 'classnames'
import { useEffect } from 'react'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import { colors } from '../../design/colors'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { Card } from '../card/card'
import { HeroIcon } from '../icon/heroicon'
import { Row } from '../layout/row'
import { Skeleton } from '../loading/skeleton'

const { useParams } = createParam<{
  id: string
}>()

export function StageNavigation({
  providedStageId,
  baseUrl,
  disabled
}: {
  providedStageId?: string
  baseUrl: string
  disabled: boolean
}) {
  const { params } = useParams()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const { replace } = useRouter()

  const stageId = providedStageId ?? params.id

  useEffect(() => {
    if (shouldRedirect({ id: stageId, stages: data?.stages })) {
      replace(`/`)
    }
  }, [stageId, data, replace])

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
  //         className={cx('font-medium text-primary text-base', {
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
          disabled={disabled || previousStageId === null}
        >
          <LinkButton
            href={`${baseUrl}/${previousStageId}`}
            disabled={disabled || previousStageId === null}
          >
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
                className={cx('font-medium text-primary text-base', {
                  'text-quarternary': disabled,
                  invisible: previousStageId === null
                })}
              >
                {previousStageId
                  ? `Stage ${stageNumberFromStageId(previousStageId)}`
                  : 'Previous'}
              </Text>
            </Row>
          </LinkButton>
        </TouchableOpacity>
        <TouchableOpacity
          className='flex-1 flex-row items-center justify-end px-4 py-3'
          disabled={disabled || nextStageId === null}
        >
          <LinkButton
            href={`${baseUrl}/${nextStageId}`}
            disabled={disabled || nextStageId === null}
          >
            <Row className='items-center'>
              <Text
                className={cx('font-medium text-primary text-base', {
                  'text-quarternary': disabled,
                  invisible: nextStageId === null
                })}
              >
                {nextStageId
                  ? `Stage ${stageNumberFromStageId(nextStageId)}`
                  : 'Next'}
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
          </LinkButton>
        </TouchableOpacity>
      </Row>
    </Card>
  )
}

function LinkButton({
  href,
  disabled,
  children
}: {
  href: string
  disabled: boolean
  children: React.ReactNode
}): React.ReactNode {
  return disabled ? children : <Link href={href}>{children}</Link>
}

function shouldRedirect({
  id,
  stages
}: {
  id?: string
  stages?: Stage[]
}): boolean {
  if (id === undefined || stages === undefined || stages.length === 0) {
    return false
  } else {
    return seasonIdFromStageId(stages[0]!.id) != seasonIdFromStageId(id)
  }
}
