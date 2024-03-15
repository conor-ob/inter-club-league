import { NativewindProvider } from 'app/provider/theme/nativewind-provider'
import { ApolloClientProvider } from './apollo/apollo-client-provider'
import { SafeArea } from './safe-area'
import { ThemeProvider } from './theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <NativewindProvider>
          <SafeArea>{children}</SafeArea>
        </NativewindProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}
