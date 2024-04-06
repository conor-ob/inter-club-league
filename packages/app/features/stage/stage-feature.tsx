import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import { View, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'
import { useStageFeatureQuery } from '../../graphql/use-stage-feature-query'
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
          <Skeleton className='h-64 rounded-xl' />
        </View>
      ) : data ? (
        <View>
          <StageCard stage={data.stage} />
          <View className='h-6' />
          <StageNavigation baseUrl='/schedule/stage' disabled={loading} />
          <View className='h-12' />
        </View>
      ) : error ? (
        <View></View>
      ) : (
        <View />
      )}
    </RefreshScrollView>
  )
}
