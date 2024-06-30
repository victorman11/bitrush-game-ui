import { UserSecurityDelete } from './UserSecurityDelete'
import { UserSecurityEmail } from './UserSecurityEmail'
import { UserSecurityPassword } from './UserSecurityPassword'

function UserSecurity() {
  return (
    <div className="w-full py-4">
      <div className="mx-auto flex max-w-xl flex-col gap-5 text-bitrush-neutral-100 md:max-w-2xl">
        <UserSecurityEmail />
        <UserSecurityPassword />
        <UserSecurityDelete />
      </div>
    </div>
  )
}

export default UserSecurity
