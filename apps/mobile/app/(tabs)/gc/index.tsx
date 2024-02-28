import { FontsContent } from '@/features/fonts/fonts-content'
import { ScrollView } from 'react-native'

export default function Gc() {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <FontsContent />
    </ScrollView>
  )
}
