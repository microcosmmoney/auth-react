// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { Wallet } from '@microcosmmoney/auth-core'

export function useWallets(options?: { refetchInterval?: number }) {
  return useApiQuery<Wallet[]>({
    path: '/wallets',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 0,
    select: (d: any) => Array.isArray(d) ? d : d?.wallets ?? [],
  })
}
