import { useAuthStore } from '@/commons/stores'

const withFirstDepositVerification = <
  T extends (...args: Parameters<T>) => void,
>(
  fn: T,
  ...args: Parameters<T>
): void => {
  const user = useAuthStore.getState().user

  if (!user?.hasDeposit) {
    useAuthStore.getState().setShowFirstDeposit(true)
    return
  }

  fn(...args)
}

export { withFirstDepositVerification }
