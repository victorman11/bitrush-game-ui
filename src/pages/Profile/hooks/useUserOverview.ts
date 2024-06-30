import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QueryKeys } from '@/commons/consts'
import { useAuthStore } from '@/commons/stores'
import { getUserOverview } from '@/pages/Profile/store/actions.ts'
import { useProfileStore } from '@/pages/Profile/store/store.ts'

const useUserOverview = (userId?: number) => {
  const { user } = useAuthStore()
  const { setUserOverview, userOverview } = useProfileStore()

  const useUserId = userId ?? user?.id

  const { data } = useQuery({
    queryFn: () => getUserOverview(Number(useUserId)),
    queryKey: [QueryKeys.GET_USER_OVERVIEW],
    enabled: !!useUserId,
  })

  useEffect(() => {
    if (data) {
      setUserOverview(data.data.userId, data.data)
    }
  }, [data, setUserOverview])

  return {
    states: {
      userOverview: useUserId ? userOverview[useUserId] : undefined,
    },
  }
}
export default useUserOverview
