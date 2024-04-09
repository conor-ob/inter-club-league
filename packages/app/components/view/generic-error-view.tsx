import { Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'solito/link'
import { Card } from '../card/card'

export function GenericErrorView({ basePath }: { basePath: string }) {
  return (
    <Card>
      <TouchableOpacity className='p-4'>
        <Link href={basePath}>
          <Text className='text-primary font-inter-regular text-center text-base'>
            Something went wrong
          </Text>
          <View className='h-2' />
          <Text className='text-primary font-inter-regular text-center text-base'>
            Try <Text className='text-brand-blue'>reloading the page</Text>
          </Text>
        </Link>
      </TouchableOpacity>
    </Card>
  )
}
