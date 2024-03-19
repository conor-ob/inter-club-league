import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { View } from 'react-native'

export function ScheduleFeature() {
  return (
    <View className='bg-background h-80 flex-1 p-6'>
      <SegmentedControl values={['One', 'Two']} />
    </View>
  )
}
