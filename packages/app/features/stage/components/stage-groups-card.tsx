import { Card } from 'app/components/card/card'
import { CardDivider } from 'app/components/card/card-divider'
import { Column } from 'app/components/layout/column'
import { Stage } from 'app/generated/graphql'
import { FlatList, Text, View } from 'react-native'

export function StageGroupsCard({ stage }: { stage: Stage }) {
  return (
    <Column>
      <Text className='text-primary font-inter-medium ml-4 text-xl'>
        Race Groups
      </Text>
      <View className='h-2' />
      <Card>
        <FlatList
          data={stage.categoryGroups}
          // scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <Column className='p-4'>
              <Text className='text-primary font-inter-medium text-base'>
                {item.categories.map((it) => it.name).join(' & ')}
              </Text>
            </Column>
          )}
        />
      </Card>
    </Column>
  )
}
