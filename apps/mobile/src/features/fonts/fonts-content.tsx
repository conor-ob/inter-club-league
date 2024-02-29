import { Text, View } from 'react-native'

export function FontsContent() {
  const fonts = [
    'font-inter-thin',
    'font-inter-extralight',
    'font-inter-light',
    'font-inter-regular',
    'font-inter-medium',
    'font-inter-semibold',
    'font-inter-bold',
    'font-inter-extrabold',
    'font-inter-black'
  ]

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {fonts.map((f) => (
        <Text key={f} className={`${f} text-xl text-black dark:text-white`}>
          Hello World
        </Text>
        // <Text style={{ fontFamily: 'font-inter-thin', fontSize: 20 }}>
        //   This work fine
        // </Text>
      ))}
    </View>
  )
}
