// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { TerritorySummary } from '@microcosmmoney/auth-core'

export function useTerritorySummary(options?: { refetchInterval?: number }) {
  return useApiQuery<TerritorySummary>({
    path: '/territories/summary',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
