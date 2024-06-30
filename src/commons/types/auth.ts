type AuthType = {
  accessToken: string
  refreshToken: string
  isLoggedIn: boolean
}

enum WalletSymbols {
  SOL = 'sol',
  USDT = 'usdt',
  USDC = 'usdc',
  ETH = 'eth',
}

export type Wallet = {
  address: string
  symbol: `${WalletSymbols}`
  blockchain: string
  name: string
}

type UserType = {
  affiliateCode: string
  id: number
  userName: string
  email: string
  referralToken: number
  bits: number
  avatarUrl?: string
  badgeUrl: string
  hasDeposit: boolean
  joinedAt: Date
  wallets: Array<Wallet>
  isCountryDisclaimer: boolean
  balance: {
    gaming_wallet: { bits: number }
    hot_wallet: { [network: string]: { [currency: string]: number } }
  }
}

type AuthRequestType = {
  userName: string
  password: string
}

type AuthResponseType = {
  data: {
    accessToken: string
    refreshToken: string
  }
}

type SignUpRequestType = {
  userName: string
  password: string
  email: string
  birth: string
  country: string
}

export type {
  AuthType,
  AuthRequestType,
  AuthResponseType,
  SignUpRequestType,
  UserType,
}
