import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import { View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { useStageFeatureQuery } from '../../graphql/use-stage-feature-query'
import { MarshallsCard } from './components/marshalls-card'
import { StageGroupsCard } from './components/stage-groups-card'
import { StageInfoCard } from './components/stage-info-card'
import { StageMap } from './components/stage-map/stage-map'
import { StageCard } from './stage-card'

const { useParams } = createParam<{
  id: string
}>()

export function StageFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useStageFeatureQuery({
    stageId: params.id
  })

  return (
    <RefreshScrollView
      contentContainerClassName='px-4 pt-6 pb-12'
      loading={loading}
      onRefresh={() => refetch()}
    >
      {loading ? (
        <View>
          <Skeleton className='h-20 rounded-t-xl' />
          <Skeleton className='h-1' />
          <Skeleton className='h-20 rounded-b-xl' />
          <View className='h-6' />
          <StageNavigation baseUrl='/schedule/stage' disabled={true} />
          <View className='h-12' />
          <Skeleton className='ml-4 h-6 w-16 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-40 rounded-xl' />
          <View className='h-12' />
          <Skeleton className='ml-4 h-6 w-24 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-80 rounded-xl' />
        </View>
      ) : data ? (
        <View>
          <StageCard stage={data.stage} />
          <View className='h-6' />
          <StageNavigation baseUrl='/schedule/stage' disabled={loading} />

          <View>
            <View className='h-12' />
            <StageInfoCard stage={data.stage} />
          </View>

          <View className='h-12' />
          <StageGroupsCard stage={data.stage} />

          {data?.stage.coordinates && (
            <View>
              <View className='h-12' />
              <StageMap stage={data.stage} />
            </View>
          )}
          {data.marshalls.marshalls.length > 0 && (
            <View>
              <View className='h-12' />
              <MarshallsCard marshalls={data.marshalls.marshalls} />
            </View>
          )}
        </View>
      ) : error ? (
        <View></View>
      ) : (
        <View />
      )}
    </RefreshScrollView>
  )
}
