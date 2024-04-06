import { FlatList, View } from 'react-native'
import { CardDivider } from '../../components/card/card-divider'
import { Row } from '../../components/layout/row'
import { Skeleton } from '../../components/loading/skeleton'
import { StageNavigation } from '../../components/navigation/stage-navigation'

export function GcFeatureSkeleton() {
  return (
    <View>
      <Skeleton className='h-20 rounded-t-xl' />
      <Skeleton className='h-1' />
      <Skeleton className='h-20 rounded-b-xl' />
      <View className='h-6' />
      <StageNavigation baseUrl='/gc' disabled={true} />
      <View className='h-12' />
      <Row className='justify-between px-2'>
        <Row>
          <View className='w-10 items-center'>
            <Skeleton className='h-5 w-8 rounded-md' />
          </View>
          <View className='px-2'>
            <Skeleton className='h-5 w-10 rounded-md' />
          </View>
        </Row>
        <Row>
          <View className='w-10 items-center'>
            <Skeleton className='h-5 w-6 rounded-md' />
          </View>
          <View className='w-10 items-center'>
            <Skeleton className='h-5 w-6 rounded-md' />
          </View>
          <View className='w-10 items-center'>
            <Skeleton className='h-5 w-8 rounded-md' />
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
  )
}
