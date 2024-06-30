import { copyStringToClipboard } from '@/helpers/clipboard'

const statusColor = {
  failed: '!text-bitrush-neutral-400',
  completed: '!text-bitrush-green-500',
  pending: '!text-bitrush-yellow-500',
  swapping: '!text-bitrush-purple-400',
}

const statusName = {
  failed: 'failed',
  completed: 'confirmed',
  pending: 'pending',
  swapping: 'swapping',
}

const getStatusColor = (status: string) => {
  const useStatus = status.toLowerCase()
  if (!statusColor[useStatus as keyof typeof statusColor]) {
    return '!text-bitrush-neutral-0'
  }
  return statusColor[useStatus as keyof typeof statusColor]
}

const getStatusName = (status: string) => {
  const useStatus = status.toLowerCase()
  if (!statusName[useStatus as keyof typeof statusName]) {
    return '!text-bitrush-neutral-0'
  }
  return statusName[useStatus as keyof typeof statusName]
}

const formatAmount = (amount: number) => {
  const asset = Object.keys(amount)[0]
  const value = Object.values(amount)[0]
  if (asset === 'usdc') {
    return `${Number(value).toFixed(2)} ${asset.toUpperCase()}`
  }
  return `${value} ${asset.toUpperCase()}`
}

const copyAddress = (address: string) => {
  copyStringToClipboard(address, 'Address has been copied')
}

const copyToClipboard = (
  value: string,
  message: string = 'Text has been copied',
) => {
  copyStringToClipboard(value, message)
}

export {
  copyAddress,
  copyToClipboard,
  statusColor,
  getStatusColor,
  formatAmount,
  statusName,
  getStatusName,
}
