import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeProvider = ({
  children
}: {
  children: React.ReactElement
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <NextThemeProvider attribute='media'>{children}</NextThemeProvider>
}
