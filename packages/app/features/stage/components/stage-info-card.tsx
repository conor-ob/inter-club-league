import { Card } from 'app/components/card/card'
import { Column } from 'app/components/layout/column'
import { Stage } from 'app/generated/graphql'
import { FlatList, Text, View, useColorScheme } from 'react-native'

export function StageInfoCard({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()

  return (
    <Column>
      <Text className='text-primary ml-4 text-xl font-medium'>Stage Info</Text>
      <View className='h-2' />
      <Card>
        <Column className='p-4'>
          <FlatList
            data={stage.info}
            // scrollEnabled={false}
            ItemSeparatorComponent={() => <View className='h-2' />}
            renderItem={({ item }) => (
              <Text className='text-primary font-regular text-base'>
                {item}
              </Text>
            )}
          />
        </Column>
      </Card>
    </Column>
  )
}
