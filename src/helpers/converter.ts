import BigNumber from 'bignumber.js'
import { format, parseISO } from 'date-fns'

import envVariables from '@/commons/consts/envVariables'

const btcToBits = new BigNumber(envVariables.BTC_TO_BITS ?? 1000000)

function convertBtcToRush(value: number | string) {
  if (!value) {
    return '0'
  }
  const btc = new BigNumber(value)
  BigNumber.set({ EXPONENTIAL_AT: 25 })

  return btc.multipliedBy(btcToBits).toString()
}

function convertRushToBtc(value: number | string) {
  if (!value) {
    return '0'
  }

  const rush = new BigNumber(value)
  BigNumber.set({ EXPONENTIAL_AT: 25 })

  return rush.dividedBy(btcToBits).toString()
}

function formatDateDMY(date: string) {
  return format(parseISO(date), 'dd/MM/yy')
}

function formatDateHours(date: string) {
  return format(parseISO(date), 'p')
}

function formatDate(date: string) {
  return format(parseISO(date), 'dd/MM/yy')
}

function getFee(value: string | number) {
  if (!value) {
    return '0'
  }
  const val = new BigNumber(value)
  const percentage = new BigNumber(envVariables.WITHDRAW_COMMISSION)

  const feeValue = val.multipliedBy(percentage).toString()

  return feeValue
}

export {
  convertBtcToRush,
  convertRushToBtc,
  formatDate,
  formatDateHours,
  getFee,
  formatDateDMY,
}
