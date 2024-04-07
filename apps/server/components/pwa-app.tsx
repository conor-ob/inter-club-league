import { ReactNode } from 'react'

export function PwaApp({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        id='header'
        className='border-b-quarternary bg-background fixed left-0 right-0 top-0 z-50 h-20 overflow-hidden border-b'
        // style='position:absolute; top:0px; left:0px; height:200px; right:0px;overflow:hidden;'
      />
      <div
        id='content'
        className='overflow-scroll py-20'
        // style='position:absolute; top:200px; bottom:200px; left:0px; right:0px; overflow:auto;'
      >
        {children}
      </div>
      <div
        id='footer'
        className='border-t-quarternary bg-background fixed bottom-0 left-0 right-0 z-50 h-20 overflow-hidden border-t'
        // style='position:absolute; bottom:0px; height:200px; left:0px; right:0px; overflow:hidden;'
      />
    </>
  )
}
