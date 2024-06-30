import { create } from 'zustand'

import { Auth } from '../types'
import { UserType } from '../types/auth'

type AuthStateType = {
  isLoggedIn: boolean
  logIn: () => void
  logOut: () => void
  user: Auth.UserType | null
  setUser: (user: Auth.UserType) => void
  setShowFirstDeposit: (showFirstDeposit: boolean) => void
  showFirstDeposit: boolean | null
}

const useAuthStore = create<AuthStateType>((set, get) => ({
  isLoggedIn: false,
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false, user: null, showFirstDeposit: false }),
  setUser: (user: UserType) => {
    if (get().showFirstDeposit === null) {
      return set({ user, showFirstDeposit: !user.hasDeposit })
    }
    return set({ user })
  },
  setShowFirstDeposit: (showFirstDeposit: boolean) => set({ showFirstDeposit }),
  showFirstDeposit: null,
  user: null,
}))

export { useAuthStore }
