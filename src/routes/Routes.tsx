import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const CashierPage = lazy(() => import('@/pages/Cashier/Cashier'))
const CashierPageV2 = lazy(() => import('@/pages/CashierV2/CashierV2'))
// const HomePage = lazy(() => import("@/pages/Home/Home"));
const ProfilePage = lazy(() => import('@/pages/Profile/Profile'))
const SignInPage = lazy(() => import('@/pages/SignIn/SignIn'))
const SignUpPage = lazy(() => import('@/pages/SignUp/SignUp'))
const StatsPage = lazy(() => import('@/pages/Stats/Stats'))
const HomeV2 = lazy(() => import('@/pages/HomeV2/Home'))
const LeaderboardPage = lazy(
  () => import('@/pages/Leaderboard/Leaderboard.tsx'),
)

const PrivateRoutes = lazy(
  () => import('@/components/PrivateRoutes/PrivateRoutes'),
)
const ForgotPassword = lazy(
  () => import('@/pages/forgotPassword/ForgotPassword'),
)
const ResetPassword = lazy(() => import('@/pages/resetPassword/ResetPassword'))
const SettingsPage = lazy(() => import('@/pages/Settings/Settings'))
const NetworkPage = lazy(() => import('@/pages/Network/Network'))
const AffiliatePage = lazy(() => import('@/pages/AffiliateCode/AffiliateCode'))

export default function App() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        {/* <Route path="/homev2" element={<HomeV2 />} /> */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/affiliate-code" element={<AffiliatePage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/cashier" element={<CashierPage />} />
          <Route path="/cashierv2" element={<CashierPageV2 />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
