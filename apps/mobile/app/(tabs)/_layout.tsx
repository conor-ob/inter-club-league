import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='gc'
        options={{
          title: 'GC',
          tabBarIcon: ({ color, focused }) => (
            <Ionicon
              name={focused ? 'trophy' : 'trophy-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='results'
        options={{
          title: 'Results',
          tabBarIcon: ({ color, focused }) => (
            <Ionicon
              name={focused ? 'podium' : 'podium-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <Ionicon
              name={focused ? 'calendar' : 'calendar-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}

type IoniconProps = {
  size?: number
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}

export function Ionicon({ size, name, color }: IoniconProps) {
  return <Ionicons size={size ?? 28} name={name} color={color} />
}
