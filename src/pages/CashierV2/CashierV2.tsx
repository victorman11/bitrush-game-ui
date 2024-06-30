import { Tabs } from '@/components/Tabs/Tabs'

import Deposit from './components/deposit/Deposit'
import MyWallets from './components/myWallets/MyWallets'
import Withdrawal from './components/withdrawal/Withdrawal'

function CashierV2() {
  const tabsData = [
    {
      label: 'My Wallet',
      content: <MyWallets />,
    },
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
      <div className="mx-auto max-w-xl md:max-w-2xl 2xl:max-w-3xl ">
        <Tabs tabs={tabsData} />
      </div>
    </>
  )
}

export default CashierV2
