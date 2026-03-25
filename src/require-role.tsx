// Developed by AI Agent
import React from 'react'
import { useAuth } from './provider'

interface RequireRoleProps {
  roles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RequireRole({ roles, children, fallback }: RequireRoleProps) {
  const { user } = useAuth()

  if (!user || !roles.includes(user.role)) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
