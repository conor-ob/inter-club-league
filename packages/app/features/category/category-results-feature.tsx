import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native'
import { createParam } from 'solito'
import { Card } from '../../components/card/card'
import { YellowJersey } from '../../components/image/yellow-jersey'
import { Column } from '../../components/layout/column'
import { Row } from '../../components/layout/row'
import { Skeleton } from '../../components/loading/skeleton'
import { useStageResultsQuery } from '../../graphql/use-stage-results-query'

const { useParams } = createParam<{
  id: string
  group: string
}>()

export function CategoryResultsFeature() {
  const { params } = useParams()

  const { loading, data, error, refetch } = useStageResultsQuery({
    stageId: params.id
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  const results = data?.stageResults.categoryResults
    .filter((it) => it.categoryGroup.id === params.group)
    .flatMap((it) => it.stageRiders)
    .filter((it) => it.points >= 5)

  return (
    <ScrollView
      contentContainerClassName={cx({
        'px-4 pt-2 pb-6': Platform.OS === 'web',
        'px-3 py-6': Platform.OS !== 'web'
      })}
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      {results ? (
        <Column>
          <Text className='text-primary font-inter-medium ml-2 text-xl'>
            {`${parseCategoryGroupId(params.group)} Winner`}
          </Text>
          <View className='h-2' />
          <Card>
            <Row className='items-center justify-between px-4 py-4'>
              <Row className='flex-1 items-center'>
                <YellowJersey />
                <View className='w-3' />
                <Column className='flex-1'>
                  <Text className='text-primary font-inter-medium text-base'>
                    {results[0]!.rider.name}
                  </Text>
                  <View className='h-0' />
                  <Text className='text-secondary font-inter-regular text-sm'>{`${results[0]!.club.code} • ${results[0]!.category.name}`}</Text>
                </Column>
              </Row>
              <Column>
                <Text className='text-primary font-inter-medium text-right text-base'>
                  {results[0]!.points}
                </Text>
                <View className='h-0' />
                <Text className='text-secondary font-inter-regular text-sm uppercase tracking-tight'>
                  Points
                </Text>
              </Column>
            </Row>
          </Card>
        </Column>
      ) : error ? (
        <View></View>
      ) : (
        <View>
          <Skeleton className='ml-2 h-6 w-40 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-8 rounded-t-xl' />
          <Skeleton className='h-3' />
          <Skeleton className='h-8 rounded-b-xl' />
        </View>
      )}
    </ScrollView>
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
