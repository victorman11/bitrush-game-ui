import { format } from 'date-fns'

import { useAuthStore } from '@/commons/stores'
import Avatar from '@/components/Avatar/Avatar.tsx'

const ProfileHeader = () => {
  const { user } = useAuthStore()
  return (
    <div className="mb-6 mt-4 flex flex-col items-center justify-between">
      <Avatar size={32} alt={user?.userName} src={user?.avatarUrl} />
      <div className="text-title font-bold text-bitrush-neutral-0">
        {user?.userName}
      </div>
      <div className="typography-xs font-normal text-bitrush-neutral-500">
        {user?.joinedAt &&
          `Member since ${format(user.joinedAt, 'dd/MM/yyyy')}`}
      </div>
    </div>
  )
}

export default ProfileHeader
