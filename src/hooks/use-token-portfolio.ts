// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'
import type { TokenPortfolio } from '@microcosmmoney/auth-core'

export function useTokenPortfolio(address?: string, options?: { refetchInterval?: number }) {
  return useApiQuery<TokenPortfolio>({
    path: `/wallets/${address}/tokens`,
    skip: !address,
    refetchInterval: options?.refetchInterval ?? 0,
  })
}
