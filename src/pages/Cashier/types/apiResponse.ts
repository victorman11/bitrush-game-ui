type DepositBTCPay = {
  url: string
  value: number
  currency: string
  userName: string
  invoiceId: string
}

type DepositResponseType = {
  data: DepositBTCPay
}

type Deposit = {
  status: string
  id: string
  type: string
  invoice_id: string
  value: string
  bits: string
  currency: string
  createdAt: string
  updatedAt: string
  address: string
  asset: {
    amount: number
    converted: number
  }
}

type Withdrawal = {
  id: string
  userName: string
  type: string
  value: string
  bits: string
  currency: string
  address: string
  transactionHash: string
  status: string
  createdAt: string
  updatedAt: string
  asset: {
    amount: number
    converted: number
  }
}

type DepositRequestType = {
  bits: number
  btc: number
}

type WithdrawRequestType = {
  bits: number
  feeInBits: number
  address: string
  password: string
}

export enum CashierDepositStatus {
  new = 'new',
  paid = 'paid',
  processing = 'processing',
  confirmed = 'confirmed',
  complete = 'complete',
  expired = 'expired',
  invalid = 'invalid',
}

export enum CashierWithdrawStatus {
  new = 'new',
  unconfirmed = 'unconfirmed',
  confirmed = 'confirmed',
  replaced = 'replaced',
}

type GetDepositResponseType = {
  data: Array<Deposit>
}

type GetWithdrawalResponseType = {
  data: Array<Withdrawal>
}

type WithdrawalsTotal = {
  bits: string
  btc: string
}

type GetWithdrawalTotalResponseType = {
  data: WithdrawalsTotal
}

type MinimumDepositItem = {
  minimum: {
    symbol: string
    amount: number
  }
  converted: {
    symbol: string
    amount: number
  }
}

export type MinimumDeposit = {
  btc: MinimumDepositItem
  usdc: MinimumDepositItem
  usdt: MinimumDepositItem
  sol: MinimumDepositItem
}

type GetMinimumDepositsResponseType = MinimumDeposit

export type {
  DepositResponseType,
  DepositRequestType,
  GetDepositResponseType,
  GetMinimumDepositsResponseType,
  GetWithdrawalResponseType,
  GetWithdrawalTotalResponseType,
  Deposit,
  Withdrawal,
  WithdrawalsTotal,
  WithdrawRequestType,
}
