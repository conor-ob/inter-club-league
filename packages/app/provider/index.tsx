import { NativewindProvider } from 'app/provider/theme/nativewind-provider'
import { SolitoImageProvider } from 'solito/image'
import { ApolloClientProvider } from './apollo/apollo-client-provider'
import { SafeArea } from './safe-area'
import { ThemeProvider } from './theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider>
      <ThemeProvider>
        <NativewindProvider>
          <SolitoImageProvider nextJsURL='https://inter-club-league.vercel.app/'>
            <SafeArea>{children}</SafeArea>
          </SolitoImageProvider>
        </NativewindProvider>
      </ThemeProvider>
    </ApolloClientProvider>
  )
}
