import { View } from 'react-native'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'

export function ResultsFeatureSkeleton() {
  return (
    <View>
      <Skeleton className='h-20 rounded-t-xl' />
      <Skeleton className='h-1' />
      <Skeleton className='h-20 rounded-b-xl' />
      <View className='h-6' />
      <StageNavigation baseUrl='/results' disabled={true} />
      <View className='h-12' />
      <Skeleton className='h-64 rounded-xl' />
    </View>
  )
}
