import cx from 'classnames'
import { View } from 'react-native'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'

export function ResultsFeatureSkeleton() {
  return (
    <View>
      <Skeleton className={cx('h-40 rounded-xl', 'sm:h-32')} />
      <View className='h-6' />
      <StageNavigation baseUrl='/results' disabled={true} />
      <View className='h-12' />
      <Skeleton className='h-64 rounded-xl' />
    </View>
  )
}
