import { stageNumberFromStageId } from '@inter-club-league/utils'
import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import { StatefulView } from 'app/components/view/stateful-view'
import cx from 'classnames'
import { FlatList, Text, View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Card } from '../../components/card/card'
import { CardDivider } from '../../components/card/card-divider'
import { YellowJersey } from '../../components/image/yellow-jersey'
import { Column } from '../../components/layout/column'
import { Row } from '../../components/layout/row'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { GcStatus, ResultsStatus } from '../../generated/graphql'
import { useGcQuery } from '../../graphql/use-gc-query'
import { StageCard } from '../stage/stage-card'
import { GcFeatureSkeleton } from './gc-feature-skeleton'
import { GcHeader } from './gc-header'
import { GcRiderComponent } from './gc-rider-component'

const { useParams } = createParam<{
  id: string
}>()

export function GcFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useGcQuery({
    stageId: params.id
  })

  return (
    <RefreshScrollView
      contentContainerClassName='px-4 py-6'
      loading={loading}
      onRefresh={() => refetch()}
    >
      <StatefulView
        displayLoading={loading}
        displayError={error !== undefined}
        displayData={data !== undefined}
        loadingView={<GcFeatureSkeleton />}
        errorView={<View />}
        dataView={
          data ? (
            <View>
              <StageCard stage={data.stage} />
              <View className='h-6' />
              <StageNavigation baseUrl='/gc' disabled={loading} />
              <View className='h-12' />
              {data.gc.gcStatus === GcStatus.Completed && (
                <Column>
                  <Text className='text-primary font-inter-medium ml-2 text-xl'>
                    GC Winner
                  </Text>
                  <View className='h-2' />
                  <Card>
                    <Row className='items-center justify-between px-4 py-4'>
                      <Row className='flex-1 items-center'>
                        <YellowJersey />
                        <View className='w-3' />
                        <Column className='flex-1'>
                          <Text className='text-primary font-inter-medium text-base'>
                            {data.gc.gcRiders[0]!.rider.name}
                          </Text>
                          <View className='h-0' />
                          <Text className='text-secondary font-inter-regular text-sm'>{`${data.gc.gcRiders[0]!.club.code} • ${data.gc.gcRiders[0]!.category.name}`}</Text>
                        </Column>
                      </Row>
                      <Column>
                        <Text className='text-primary font-inter-medium text-right text-base'>
                          {data.gc.gcRiders[0]!.gcPoints}
                        </Text>
                        <View className='h-0' />
                        <Text className='text-secondary font-inter-regular text-sm uppercase tracking-tight'>
                          Points
                        </Text>
                      </Column>
                    </Row>
                  </Card>
                  <View className='h-12' />
                </Column>
              )}
              {data.gc.resultsStatus === ResultsStatus.Upcoming && (
                <Card>
                  <Text className='text-secondary font-inter-regular p-4 text-center text-base'>
                    {`Stage ${stageNumberFromStageId(data.stage.id)} not yet started`}
                  </Text>
                </Card>
              )}
              {data.gc.resultsStatus === ResultsStatus.AwaitingResults && (
                <Card>
                  <Text className='text-primary font-inter-regular p-4 text-center text-base'>
                    {`Results will be available after Stage ${stageNumberFromStageId(data.stage.id)}`}
                  </Text>
                </Card>
              )}
              {data.gc.resultsStatus === ResultsStatus.Completed && (
                <View>
                  <GcHeader />
                  <View className='h-2' />
                  <FlatList
                    contentContainerClassName={cx({
                      'bg-card rounded-xl': colorScheme === 'light'
                    })}
                    data={data.gc.gcRiders}
                    renderItem={({ item }) => (
                      <GcRiderComponent gcRider={item} />
                    )}
                    ItemSeparatorComponent={() => <CardDivider />}
                  />
                </View>
              )}
            </View>
          ) : (
            <View />
          )
        }
      />
    </RefreshScrollView>
  )
}
