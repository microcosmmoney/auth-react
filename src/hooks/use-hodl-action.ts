import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'
import type { HodlEntryRequest, HodlEntryConfirm, HodlExitRequest } from '@microcosmmoney/auth-core'

function useMutation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)
  return { loading, setLoading, error, setError, mountedRef }
}

export function useHodlRequestEntry() {
  const api = useMicrocosmApi()
  const { loading, setLoading, error, setError, mountedRef } = useMutation()

  const requestEntry = useCallback(async (params: HodlEntryRequest) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/hodl-challenge/request-entry', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { requestEntry, loading, error }
}

export function useHodlConfirmEntry() {
  const api = useMicrocosmApi()
  const { loading, setLoading, error, setError, mountedRef } = useMutation()

  const confirmEntry = useCallback(async (params: HodlEntryConfirm) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/hodl-challenge/confirm-entry', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { confirmEntry, loading, error }
}

export function useHodlExit() {
  const api = useMicrocosmApi()
  const { loading, setLoading, error, setError, mountedRef } = useMutation()

  const exit = useCallback(async (params: HodlExitRequest) => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/hodl-challenge/exit', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { exit, loading, error }
}
