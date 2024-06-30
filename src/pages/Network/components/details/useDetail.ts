import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/commons/consts'

import { getAffiliatesInfo } from '../../store/actions'

export function useDetail() {
  const { data } = useQuery({
    queryFn: () => getAffiliatesInfo(),
    queryKey: [QueryKeys.GET_NETWORK_AFFILIATES],
  })

  return {
    states: {
      networkInfoDetails: data,
    },
  }
}
