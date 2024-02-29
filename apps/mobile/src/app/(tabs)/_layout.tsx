import { Ionicon } from '@/components/ionicon'
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
