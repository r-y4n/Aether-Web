'use client'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'

const convex = new ConvexReactClient("https://bright-wildebeest-803.convex.cloud")

export function Providers({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    /* 
     * If you have changed your storageKey in your <ThemeProvider storageKey="" />,
     * make sure you change it in the localStorage.getItem too.
     * default key is "theme"
     */
    const actualTheme = localStorage.getItem('theme')
    setTheme(actualTheme || 'system')
  }, [setTheme])

  return (
    <ClerkProvider
      publishableKey={"pk_test_Z2VuZXJvdXMtcmFtLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ"}
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined
      }}
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}