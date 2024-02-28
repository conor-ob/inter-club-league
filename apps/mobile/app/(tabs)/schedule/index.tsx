import { ScheduleContent } from '@/features/schedule/schedule-content'
import { ScrollView } from 'react-native'

export default function Schedule() {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <ScheduleContent />
    </ScrollView>
  )
}
