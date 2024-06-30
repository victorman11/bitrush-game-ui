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
  id: number
  type: string
  invoice_id: string
  value: string
  bits: string
  currency: string
  createdAt: string
  updatedAt: string
  address: string
}

type Withdrawal = {
  id: number
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
}

type DepositRequestType = {
  bits: number
  btc: number
}

type WithdrawRequestType = {
  wallet: {
    symbol: string
    address: string
    blockchain: string
  }
  to: {
    address: string
  }
  password: string
  amount: number
}

type DepositTotalAmountResponseType = {
  deposit: {
    symbol: string
    total: number
  }
}

type WithdrawTotalAmountResponseType = {
  withdraw: {
    symbol: string
    total: number
  }
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

export type {
  DepositResponseType,
  DepositRequestType,
  DepositTotalAmountResponseType,
  GetDepositResponseType,
  GetWithdrawalResponseType,
  GetWithdrawalTotalResponseType,
  Deposit,
  Withdrawal,
  WithdrawalsTotal,
  WithdrawTotalAmountResponseType,
  WithdrawRequestType,
}
