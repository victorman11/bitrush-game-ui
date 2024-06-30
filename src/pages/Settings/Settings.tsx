import useAuth from '@/hooks/useAuth'

function Settings() {
  const { doLogOut } = useAuth()
  return (
    <div className="w-full">
      <button className="text-bitrush-neutral-0" onClick={doLogOut}>
        Sign out
      </button>
    </div>
  )
}

export default Settings
