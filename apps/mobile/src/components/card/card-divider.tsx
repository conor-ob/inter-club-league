import { colors } from '@/design/color-theme'
import { StyleSheet, View, useColorScheme } from 'react-native'

export function CardDivider() {
  const colorScheme = useColorScheme()

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors[colorScheme ?? 'light'].cardDivider
      }}
    />
  )
}
