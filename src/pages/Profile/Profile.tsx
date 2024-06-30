import { Tabs } from '@/components/Tabs/Tabs.tsx'
import ProfileHeader from '@/pages/Profile/components/ProfileHeader.tsx'
import UserOverview from '@/pages/Profile/components/UserOverview/UserOverview.tsx'
import UserSecurity from '@/pages/Profile/components/UserSecurity/UserSecurity.tsx'
import UserStats from '@/pages/Profile/components/UserStats/UserStats.tsx'

function Profile() {
  const tabsData = [
    {
      label: 'Overview',
      content: <UserOverview />,
    },
    {
      label: 'Stats',
      content: <UserStats />,
    },
    {
      label: 'Security',
      content: <UserSecurity />,
    },
  ]

  return (
    <>
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <ProfileHeader />
        <Tabs tabs={tabsData} />
      </div>
    </>
  )
}

export default Profile
