import { StyleSheet, View, useColorScheme } from 'react-native'
import { colors } from '../../design/colors'

export function CardDivider() {
  const colorScheme = useColorScheme()

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        // backgroundColor: colors[colorScheme ?? 'light'].cardDivider
        backgroundColor: colors[colorScheme ?? 'light'].textColorQuarternary
      }}
    />
  )
}
