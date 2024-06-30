import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QueryKeys } from '@/commons/consts'
import { getStats } from '@/pages/Stats/store/actions.ts'
import { useStatsStore } from '@/pages/Stats/store/store.ts'

const useStats = () => {
  const { setStats, stats } = useStatsStore()

  const { data } = useQuery({
    queryFn: () => getStats(),
    queryKey: [QueryKeys.GET_STATS],
  })

  useEffect(() => {
    if (data) {
      setStats(data.data)
    }
  }, [data, setStats])

  return {
    states: {
      stats,
    },
  }
}
export default useStats
