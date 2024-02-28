import { colors } from '@/design/color-theme'
import {
  default as FontAwesome,
  default as FontAwesomeIcons
} from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'

// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';
// import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name']
//   color: string
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
// }

function IoniconIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={28} {...props} />
}

function FontAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesomeIcons>['name']
  color: string
}) {
  return <FontAwesome size={28} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].brand,
        tabBarInactiveTintColor: colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='gc'
        options={{
          title: 'GC',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon name='trophy' color={color} />
          )
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           // color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name='results'
        options={{
          title: 'Results',
          tabBarIcon: ({ color, focused }) => (
            <IoniconIcon name='podium' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <IoniconIcon name='calendar' color={color} />
          )
        }}
      />
    </Tabs>
  )
}
