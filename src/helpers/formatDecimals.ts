export function formatInputNumber(value: string, onlyInteger: boolean = false) {
  if (onlyInteger) {
    return value.replace(/\D/g, '')
  }

  value = value.replace(/[^0-9.,]/g, '')

  value = value.replace(/,/g, '.')

  value = value.replace(/(\..*)\./g, '$1')

  value = value.replace(/(\.\d{2})\d+/g, '$1')

  return value
}

export function formatInputNumberWithSixDecimals(value: string) {
  value = value.replace(/[^0-9.,]/g, '')

  value = value.replace(/,/g, '.')

  value = value.replace(/(\..*)\./g, '$1')

  value = value.replace(/(\.\d{6})\d+/g, '$1')

  return value
}
