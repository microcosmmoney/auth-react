import { useState, useCallback, useRef } from 'react'
import { useMicrocosmApi } from '../microcosm-context'

interface CreateProposalParams {
  title: string
  description: string
  proposal_type?: string
  voting_hours?: number
  options: string[]
}

export function useVoteAction() {
  const api = useMicrocosmApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  const createProposal = useCallback(async (params: CreateProposalParams): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.post<{ success: boolean; data: any }>('/voting/proposals', params)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  const castVote = useCallback(async (proposalId: string, optionIndex: number, voteCount?: number): Promise<any> => {
    try {
      setLoading(true)
      setError(null)
      const body: any = { option_index: optionIndex }
      if (voteCount !== undefined) body.vote_count = voteCount
      const res = await api.post<{ success: boolean; data: any }>(`/voting/proposals/${proposalId}/vote`, body)
      return res.data
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [api])

  return { createProposal, castVote, loading, error }
}
