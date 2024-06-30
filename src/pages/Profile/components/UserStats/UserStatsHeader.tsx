import CustomIcon from '@/components/CustomIcon/CustomIcon'

type UserStatsHeaderProps = {
  userName: string
  joinedAt: Date
}

function UserStatsHeader({ userName, joinedAt }: UserStatsHeaderProps) {
  return (
    <div className="flex flex-row justify-between text-bitrush-neutral-0">
      <div className="flex flex-row gap-2">
        <CustomIcon.UserIcon className="w-4" />
        <div>{userName}</div>
      </div>
      <div>Joined: {new Date(joinedAt).toLocaleDateString()}</div>
    </div>
  )
}

export default UserStatsHeader
