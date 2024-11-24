import { Text, useColorScheme } from 'react-native'
import { Row } from '../../components/layout/row'

export function ResultsHeader() {
  const colorScheme = useColorScheme()
  return (
    <Row className='justify-between px-2'>
      <Row>
        <Text className='text-primary w-12 text-center text-sm font-semibold tracking-tight'>
          POS
        </Text>
        <Text className='text-primary px-2 text-center text-sm font-semibold tracking-tight'>
          RIDER
        </Text>
      </Row>
      <Text className='text-primary w-16 text-center text-sm font-semibold tracking-tight'>
        POINTS
      </Text>
    </Row>
  )
}
