import React from 'react'
import { useAuth } from './provider'

interface RequireRoleProps {
  roles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleGate({ roles, children, fallback }: RequireRoleProps) {
  const { user } = useAuth()

  if (!user || !roles.includes(user.role)) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}

export const RequireRole = RoleGate
