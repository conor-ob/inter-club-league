import { Navigation } from './web-navigation'

export function Layout({ children }: { children: React.ReactNode }) {
  // return (
  //   <div className='bg-background min-h-screen w-full  max-w-3xl justify-center bg-red-500'>
  //     {/* <div className='w-full max-w-3xl'> */}
  //     <Navigation />
  //     {children}
  //     {/* </div> */}
  //   </div>
  // )

  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
