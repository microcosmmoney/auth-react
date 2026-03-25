// Developed by AI Agent
import { useState, useEffect, useCallback } from 'react'
import { User } from '@microcosmmoney/auth-core'
import { useMicrocosmApi, useMicrocosmContext, OPEN_API_BASE } from '../microcosm-context'
import { useAuthOptional } from '../provider'

interface UseProfileResult {
  profile: User | null
  loading: boolean
  error: Error | null
  updateProfile: (data: { display_name?: string }) => Promise<void>
  uploadAvatar: (file: File) => Promise<string | null>
  refresh: () => Promise<void>
}

export function useProfile(): UseProfileResult {
  const api = useMicrocosmApi()
  const { getAccessToken } = useMicrocosmContext()
  const authCtx = useAuthOptional()
  const user = authCtx?.user ?? null
  const [profile, setProfile] = useState<User | null>(user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setProfile(user)
  }, [user])

  const syncUser = useCallback((updated: User) => {
    setProfile(updated)
    if (authCtx?.client) authCtx.client.setUser(updated)
  }, [authCtx])

  const refresh = useCallback(async () => {
    const token = await getAccessToken()
    if (!token) return

    try {
      setLoading(true)
      const data = await api.get<{ user?: Record<string, unknown> } & Record<string, unknown>>(
        '/users/me/profile'
      )
      const raw = (data as Record<string, unknown>).user || data
      const updated: User = {
        uid: (raw as Record<string, unknown>).uid as string || profile?.uid || '',
        email: (raw as Record<string, unknown>).email as string || profile?.email || '',
        displayName: (raw as Record<string, unknown>).display_name as string || null,
        avatarUrl: (raw as Record<string, unknown>).avatar_url as string || null,
        role: ((raw as Record<string, unknown>).role as User['role']) || 'user',
        level: (raw as Record<string, unknown>).level as User['level'],
        title: (raw as Record<string, unknown>).title as User['title'],
        stationId: (raw as Record<string, unknown>).station_id as number || null,
      }
      syncUser(updated)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'))
    } finally {
      setLoading(false)
    }
  }, [api, getAccessToken, syncUser, profile])

  const updateProfile = useCallback(async (data: { display_name?: string }) => {
    try {
      setLoading(true)
      await api.patch('/users/me/profile', data)

      if (profile && data.display_name !== undefined) {
        syncUser({ ...profile, displayName: data.display_name })
      }
      setError(null)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update profile')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [api, syncUser, profile])

  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    try {
      setLoading(true)
      const token = await getAccessToken()
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch(`${OPEN_API_BASE}/users/me/avatar`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload avatar')

      const data = await response.json()
      const avatarUrl = data.avatar_url || null

      if (profile && avatarUrl) {
        syncUser({ ...profile, avatarUrl })
      }

      setError(null)
      return avatarUrl
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to upload avatar')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [getAccessToken, syncUser, profile])

  return { profile, loading, error, updateProfile, uploadAvatar, refresh }
}
