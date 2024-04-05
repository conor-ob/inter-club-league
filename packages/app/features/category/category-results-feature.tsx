import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import cx from 'classnames'
import { FlatList, Platform, Text, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Card } from '../../components/card/card'
import { CardDivider } from '../../components/card/card-divider'
import { YellowJersey } from '../../components/image/yellow-jersey'
import { Column } from '../../components/layout/column'
import { Row } from '../../components/layout/row'
import { Skeleton } from '../../components/loading/skeleton'
import { Stage } from '../../generated/graphql'
import { useStageResultsQuery } from '../../graphql/use-stage-results-query'
import { ResultsHeader } from './results-header'
import { StageRiderComponent } from './stage-rider-component'

const { useParams } = createParam<{
  id: string
  group: string
}>()

export function CategoryResultsFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useStageResultsQuery({
    stageId: params.id
  })

  const results = data?.stageResults.categoryResults
    .filter((it) => it.categoryGroup.id === params.group)
    .flatMap((it) => it.stageRiders)
    .filter((it) => it.points >= 5)

  return (
    <RefreshScrollView
      contentContainerClassName={cx({
        'px-4 pt-2 pb-6': Platform.OS === 'web',
        'px-3 py-6': Platform.OS !== 'web'
      })}
      loading={loading}
      onRefresh={() => refetch()}
    >
      {loading ? (
        <View>
          <Skeleton className='ml-2 h-6 w-40 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-8 rounded-t-xl' />
          <Skeleton className='h-3' />
          <Skeleton className='h-8 rounded-b-xl' />
          <View className='h-6' />
          <Row className='justify-between px-2'>
            <Row>
              <View className='w-12 items-center'>
                <Skeleton className='h-5 w-8 rounded-md' />
              </View>
              <View className='px-2'>
                <Skeleton className='h-5 w-10 rounded-md' />
              </View>
            </Row>
            <Row>
              <View className='w-16 items-center'>
                <Skeleton className='h-5 w-12 rounded-md' />
              </View>
            </Row>
          </Row>
          <View className='h-2' />
          <FlatList
            data={[1, 2, 3, 4, 5]}
            // scrollEnabled={false}
            renderItem={({ item }) => (
              <View className='py-7'>
                <Skeleton className='mx-2 h-3 rounded-md' />
              </View>
            )}
            ItemSeparatorComponent={() => <CardDivider />}
          />
        </View>
      ) : results ? (
        <Column>
          <Text className='text-primary font-inter-medium ml-2 text-xl'>
            {`${parseCategoryGroupId(data?.stage, params.group)} Winner`}
          </Text>
          <View className='h-2' />
          <Card>
            <Row className='items-center justify-between px-4 py-4'>
              <Row className='flex-1 items-center'>
                {results[0]!.rider.id === data?.stageResults.gcLeaderId ? (
                  <YellowJersey />
                ) : (
                  <View className='w-8 items-center'>
                    <Text className='text-primary font-inter-medium text-base'>
                      1st
                    </Text>
                  </View>
                )}
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
          <View className='h-6' />
          <ResultsHeader />
          <View className='h-2' />
          <FlatList
            contentContainerClassName={cx({
              'bg-card rounded-xl': colorScheme === 'light'
            })}
            data={results}
            renderItem={({ item }) => (
              <StageRiderComponent
                stageRider={item}
                gcLeaderId={data?.stageResults.gcLeaderId}
              />
            )}
            ItemSeparatorComponent={() => <CardDivider />}
          />
        </Column>
      ) : error ? (
        <View></View>
      ) : (
        <View />
      )}
    </RefreshScrollView>
  )
}

function parseCategoryGroupId(
  stage?: Stage,
  categoryGroupId?: string
): string | undefined {
  if (stage === undefined || categoryGroupId === undefined) {
    return undefined
  }

  return stage.categoryGroups
    .find((it) => it.id === categoryGroupId)
    ?.categories.map((it) => it.name)
    .join(' & ')
}
