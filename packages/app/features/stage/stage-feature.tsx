import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import cx from 'classnames'
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
          <Skeleton className={cx('h-40 rounded-xl', 'sm:h-32')} />
          <View className='h-6' />
          <StageNavigation baseUrl='/results' disabled={true} />
          <View className='h-12' />
          <Skeleton className='h-64 rounded-xl' />
        </View>
      ) : data ? (
        <View>
          <StageCard stage={data.stage} />
          <View className='h-6' />
          <StageNavigation baseUrl='/schedule' disabled={loading} />
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
