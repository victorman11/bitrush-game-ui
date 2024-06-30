import BigNumber from 'bignumber.js'

export function formatNumber(
  value: number | string | BigNumber,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  ending?: string,
): string {
  const number = new BigNumber(value)

  // Initially format the number with maximumFractionDigits
  const formattedNumber = number.toFixed(
    maximumFractionDigits,
    BigNumber.ROUND_HALF_UP,
  )

  // Identify if there's a need to adjust the decimal part based on minimumFractionDigits
  let [integerPart, decimalPart] = formattedNumber.split('.')

  // Adjust decimal part based on minimumFractionDigits and maximumFractionDigits
  if (decimalPart) {
    // Remove unnecessary trailing zeros
    decimalPart = decimalPart.replace(/0+$/, '')
    if (decimalPart.length < minimumFractionDigits) {
      // Pad with zeros if the decimal part is shorter than minimumFractionDigits
      decimalPart = decimalPart.padEnd(minimumFractionDigits, '0')
    } else if (decimalPart.length === 0 && minimumFractionDigits === 0) {
      // If after trimming zeros, there's no decimal part left, and minimumFractionDigits is 0, discard the decimal part

      decimalPart = ''
    }
  } else if (minimumFractionDigits > 0) {
    // If there was no decimal part but minimumFractionDigits > 0, add a decimal part padded with zeros
    decimalPart = '0'.repeat(minimumFractionDigits)
  }

  // Reconstruct the formatted number string
  let result = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // Add comma separators to the integer part
  if (decimalPart) {
    result += '.' + decimalPart
  }

  // Append the optional ending string if provided
  if (ending) {
    result += ending
  }

  return result
}

export function formatCompact(number: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}

export function formatCurrency(
  number: string | number | BigNumber,
  alwaysNoDecimals: boolean = false,
) {
  const bigNumber = new BigNumber(number)

  if (alwaysNoDecimals) {
    return bigNumber.integerValue(BigNumber.ROUND_DOWN).toFormat()
  }

  // if the number should have decimal places
  const hasDecimalPlaces = bigNumber.isLessThan(1_000_000)

  if (hasDecimalPlaces) {
    // round to 2 decimal places
    const roundedNumber = bigNumber.decimalPlaces(2, BigNumber.ROUND_HALF_UP)

    // Convert to string and split into integer and decimal parts
    const parts = roundedNumber.toString().split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') // Add commas for thousands separator
    const decimalPart = parts[1] ? parts[1].padEnd(2, '0').slice(0, 2) : '00' // Ensure exactly 2 decimal places

    // Combine formatted integer and decimal parts
    return `${integerPart}.${decimalPart}`
  }

  // For numbers greater than or equal to 1000000, format without decimal places
  return bigNumber.integerValue(BigNumber.ROUND_DOWN).toFormat()
}
