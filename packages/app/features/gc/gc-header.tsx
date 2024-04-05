import { Text, View, useColorScheme } from 'react-native'
import { HeroIcon } from '../../components/icon/heroicon'
import { Row } from '../../components/layout/row'
import { colors } from '../../design/colors'

export function GcHeader() {
  const colorScheme = useColorScheme()

  return (
    <Row className='justify-between px-2'>
      <Row>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          POS
        </Text>
        <Text className='text-primary font-inter-semibold px-2 text-center text-sm tracking-tight'>
          RIDER
        </Text>
      </Row>
      <Row className='items-center'>
        <View className='w-10 items-center'>
          <HeroIcon
            name={'arrows-up-down'}
            color={colors[colorScheme ?? 'light'].textColorPrimary}
            size={18}
          />
        </View>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          GC
        </Text>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          TOT
        </Text>
      </Row>
    </Row>
  )
}
