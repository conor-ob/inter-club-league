import useScreenSize from '../hooks/use-screen-size'
import { Navigation } from './web-navigation'

export function Layout({ children }: { children: React.ReactNode }) {
  const screenSize = useScreenSize()
  console.log(screenSize)
  if (screenSize.width > 600) {
    return (
      <div className='bg-background flex min-h-screen w-full justify-center'>
        <div className='w-full max-w-3xl'>
          <Navigation />
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Navigation />
        {children}
      </>
    )
  }
}
