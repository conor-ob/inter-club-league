import {
  SafeAreaProvider as ReactNativeSafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'

type SafeAreaProviderProps = {
  children: React.ReactNode
}

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
  return (
    <ReactNativeSafeAreaProvider initialMetrics={initialWindowMetrics}>
      {children}
    </ReactNativeSafeAreaProvider>
  )
}
