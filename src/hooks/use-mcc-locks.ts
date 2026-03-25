// Developed by AI Agent
import { useApiQuery } from './use-api-query'
import type { MCCLock } from '@microcosmmoney/auth-core'

export function useMCCLocks(options?: { refetchInterval?: number }) {
  return useApiQuery<MCCLock[]>({
    path: '/mcc/locks',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.locks ?? [],
  })
}
