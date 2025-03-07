'use client'
import React, { ReactNode, Suspense } from 'react'
import GuestGuard from './GuestGuard'
import AuthGuard from './AuthGuard'

// ** Spinner Import
import { AUTH_ROUTES, GUEST_ROUTES } from '@/constant/routes'
import AuthSpinner from '@/components/common/AuthSpinner'

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const isRouteMatch = (path: string, routes: string[]) => {
  return routes.some(route => {
    // Split route into segments
    const routeSegments = route.split('/')
    const pathSegments = path.split('/')

    // If the length doesn't match, it's not a valid match
    if (routeSegments.length !== pathSegments.length) return false

    return routeSegments.every((segment, index) => {
      // Allow dynamic segments (e.g., ":id" in "/profile/:id")
      return segment.startsWith(':') || segment === pathSegments[index]
    })
  })
}

export const getProperGuestGuardType = (path: string) => isRouteMatch(path, GUEST_ROUTES)
export const getProperAuthGuardType = (path: string) => !isRouteMatch(path, AUTH_ROUTES)

const GuardProvider = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<AuthSpinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return (
      <Suspense fallback={<AuthSpinner />}>
        <AuthGuard fallback={<AuthSpinner />}>{children}</AuthGuard>
      </Suspense>
    )
  }
}

export default GuardProvider
