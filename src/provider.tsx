import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import {
  MicrocosmAuthClient,
  MicrocosmAuthConfig,
  User,
  AuthState,
  LoginOptions,
} from '@microcosmmoney/auth-core'
import { MicrocosmProvider } from './microcosm-context'

interface AuthContextType extends AuthState {
  login: (options?: LoginOptions) => void
  logout: () => Promise<void>
  getAccessToken: () => Promise<string | null>
  client: MicrocosmAuthClient
}

const AuthContext = createContext<AuthContextType | null>(null)

export function MicrocosmAuthProvider({
  children,
  ...config
}: MicrocosmAuthConfig & { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  const client = useMemo(
    () => new MicrocosmAuthClient(config),
    [config.clientId]
  )

  useEffect(() => {
    const user = client.getUser()
    setState({
      user,
      isAuthenticated: client.isAuthenticated(),
      isLoading: false,
      error: null,
    })

    const unsubscribe = client.onAuthStateChange((updatedUser) => {
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isAuthenticated: !!updatedUser,
      }))
    })

    return unsubscribe
  }, [client])

  const login = useCallback(
    (options?: LoginOptions) => client.login(options),
    [client]
  )

  const logout = useCallback(
    () => client.logout(),
    [client]
  )

  const getAccessToken = useCallback(
    () => client.getAccessToken(),
    [client]
  )

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    getAccessToken,
    client,
  }

  return (
    <AuthContext.Provider value={value}>
      <MicrocosmProvider getAccessToken={getAccessToken}>
        {children}
      </MicrocosmProvider>
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuth must be used within <MicrocosmAuthProvider>. ' +
      'If using <MicrocosmProvider>, use useMicrocosmApi() instead.'
    )
  }
  return context
}

export function useAuthOptional(): AuthContextType | null {
  return useContext(AuthContext)
}
