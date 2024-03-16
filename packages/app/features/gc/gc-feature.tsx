import { Text, View } from 'react-native'
import { createParam } from 'solito'
import { useGcQuery } from '../../graphql/use-gc-query'

const { useParams } = createParam<{
  id: string
}>()

export function GcFeature() {
  const { params } = useParams()
  const { loading, data, error, refetch } = useGcQuery({
    stageId: params.id
  })

  return (
    <View className='bg-background flex-1 items-center justify-center'>
      <Text className='text-brand'>{data?.gc.id}</Text>
    </View>
  )
}
