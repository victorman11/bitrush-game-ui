import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/commons/stores'

import Layout from '../Layout/Layout'

const PrivateRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  return isLoggedIn ? <Layout /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
