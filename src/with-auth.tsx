import React from 'react'
import { useAuth } from './provider'

interface WithAuthOptions {
  redirectTo?: string
  loadingComponent?: React.ReactNode
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = '/login', loadingComponent } = options

  function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
      return loadingComponent ? <>{loadingComponent}</> : null
    }

    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo
      }
      return null
    }

    return <Component {...props} />
  }

  WithAuthComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`

  return WithAuthComponent
}
