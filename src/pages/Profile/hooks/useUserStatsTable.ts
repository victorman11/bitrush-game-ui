import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { getUserStats } from '@/pages/Profile/store/actions.ts'
import { useProfileStore } from '@/pages/Profile/store/store.ts'

const useUserStatsTable = (userId?: number) => {
  const { user } = useAuthStore()
  const { setUserStats, userStats } = useProfileStore()

  const useUserId = userId ?? user?.id

  const { data } = useQuery({
    queryFn: () => getUserStats(Number(useUserId)),
    queryKey: [QueryKeys.GET_USER_STATS],
    enabled: !!useUserId,
  })

  useEffect(() => {
    if (data) {
      setUserStats(data.data.user.id, data.data)
    }
  }, [data, setUserStats])

  return {
    states: {
      userStats: useUserId ? userStats[useUserId] : undefined,
    },
  }
}
export default useUserStatsTable
