'use client'

import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/AuthContext'
import GuardProvider, { getProperAuthGuardType, getProperGuestGuardType } from '@/guards/GuardProvider'
import { usePathname } from 'next/navigation'
import { queryClient } from '@/lib/client'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const authGuard = getProperAuthGuardType(pathname)
  const guestGuard = getProperGuestGuardType(pathname)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GuardProvider authGuard={authGuard} guestGuard={guestGuard}>
          {children}
        </GuardProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
