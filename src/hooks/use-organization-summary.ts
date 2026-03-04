// AI-generated · AI-managed · AI-maintained
import { useApiQuery } from './use-api-query'

interface OrganizationSummary {
  total_stations: number
  total_matrices: number
  total_sectors: number
  total_systems: number
  total_members: number
  total_vault_mcd: number
}

export function useOrganizationSummary(options?: { refetchInterval?: number }) {
  return useApiQuery<OrganizationSummary>({
    path: '/organizations/summary',
    requireAuth: true,
    refetchInterval: options?.refetchInterval ?? 300_000,
  })
}
