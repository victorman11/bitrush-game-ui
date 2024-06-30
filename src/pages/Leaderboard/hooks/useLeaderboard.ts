import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import {
  LeaderboardFilter,
  leaderboardSchema,
} from '@/pages/Leaderboard/schema.ts'
import { getLeaderboard } from '@/pages/Leaderboard/store/actions.ts'
import { useLeaderboardStore } from '@/pages/Leaderboard/store/store.ts'

const filters = [
  { name: 'Top 10', key: '10' },
  { name: 'Top 30', key: '30' },
  { name: 'Top 100', key: '100' },
]

const useLeaderboard = () => {
  const { user, isLoggedIn } = useAuthStore()
  const { leaderboard, setLeaderboard, setFilter, filter } =
    useLeaderboardStore()

  const { data } = useQuery({
    queryFn: () => getLeaderboard(filter),
    queryKey: [QueryKeys.GET_LEADERBOARD, filter],
    enabled: isLoggedIn,
  })

  useEffect(() => {
    if (data) {
      setLeaderboard(data.data)
    }
  }, [data, setLeaderboard])

  const form = useForm<LeaderboardFilter>({
    resolver: zodResolver(leaderboardSchema),
  })

  return {
    states: {
      leaderboard,
      userId: user?.id,
      filter,
      filters,
    },
    actions: {
      setFilter,
    },
    form,
  }
}
export default useLeaderboard
