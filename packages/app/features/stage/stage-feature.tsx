import { GenericErrorView } from 'app/components/view/generic-error-view'
import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import { View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { useStageFeatureQuery } from '../../graphql/use-stage-feature-query'
import { MarshallsCard } from './components/marshalls-card'
import { StageInfoCard } from './components/stage-info-card'
import { StageMap } from './components/stage-map/stage-map'
import { StageRoutes } from './components/stage-routes'
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
      contentContainerClassName='px-4 py-6'
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
          <Skeleton className='ml-4 h-6 w-20 rounded-md' />
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

          <View className='h-12' />
          <StageInfoCard stage={data.stage} />

          {/* <View className='h-12' />
          <StageGroupsCard stage={data.stage} /> */}

          {data?.stage.coordinates && (
            <View>
              <View className='h-12' />
              <StageMap stage={data.stage} />
            </View>
          )}

          {data.routes.length > 0 && (
            <View>
              <View className='h-12' />
              <StageRoutes routes={data.routes} />
            </View>
          )}

          <View className='h-12' />
          <MarshallsCard marshalls={data.marshalls.marshalls} />
        </View>
      ) : error ? (
        <GenericErrorView basePath='/schedule' />
      ) : (
        <View />
      )}
    </RefreshScrollView>
  )
}
