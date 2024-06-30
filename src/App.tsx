import 'react-tooltip/dist/react-tooltip.css'
import './calendar.css'

import { ToastContainer } from 'react-toastify'

import useApp from '@/hooks/useApp.ts'
import Routes from '@/routes/Routes'

import Providers from './components/Providers/Providers'

function App() {
  useApp()
  return (
    <Providers>
      <div className="lg:mx-auto">
        <Routes />
      </div>
      <ToastContainer
        limit={3}
        theme="dark"
        autoClose={4000}
        hideProgressBar
        toastClassName="border border-bitrush-blue-700"
      />
    </Providers>
  )
}

export default App
