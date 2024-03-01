import { RefreshControl, ScrollView } from 'react-native'

export function ResultsContent() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => console.log()} />
      }
    ></ScrollView>
  )
}
