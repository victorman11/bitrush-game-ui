import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/Header'

import Footer from '../Footer/Footer'

function Layout() {
  return (
    <div className="w-full px-4">
      <Header />
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  )
}

function LayoutUnauthorized({ children }: PropsWithChildren) {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col px-4 lg:justify-between">
        <Header />
        <div className="flex flex-1 justify-center lg:items-center">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export { LayoutUnauthorized }

export default Layout
