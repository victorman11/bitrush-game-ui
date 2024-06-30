import { Tabs } from '@/components/Tabs/Tabs'

import Deposit from './components/deposit/Deposit'
import Withdrawal from './components/withdrawal/Withdrawal'

function Cashier() {
  const tabsData = [
    {
      label: 'Deposit',
      content: <Deposit />,
    },
    {
      label: 'Withdrawal',
      content: <Withdrawal />,
    },
  ]

  return (
    <>
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <Tabs tabs={tabsData} />
      </div>
    </>
  )
}

export default Cashier
