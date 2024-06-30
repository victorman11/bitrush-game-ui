import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { formatCurrency, formatNumber } from '@/helpers/numbers.ts'
import { cn } from '@/helpers/tailwindMerge'

type DataDisplayRowProps = {
  title: string
  value?: string | number | BigNumber
  valueUnit?: string
  formatValue?: boolean
  emptyValue?: string
  fracDigits?: number
  coloredValue?: boolean
  icon?: JSX.Element | null
}

const DataDisplayRow = ({
  title,
  value,
  valueUnit,
  formatValue = true,
  fracDigits,
  emptyValue = '-',
  coloredValue = false,
  icon = null,
  ...rest
}: DataDisplayRowProps & React.ComponentProps<'view'>) => {
  const { useValue, valueColorClass } = useMemo(() => {
    const valueIsEmpty =
      !value || BigNumber(value).isNaN() || BigNumber(value).isZero()
    if (valueIsEmpty) {
      return {
        useValue: emptyValue,
        valueColorClass: 'text-bitrush-neutral-0',
      }
    }

    const useValue = BigNumber(value)
    const valueColorClass = coloredValue
      ? useValue.isNegative()
        ? 'text-bitrush-red-500'
        : 'text-bitrush-green-500'
      : 'text-bitrush-neutral-0'
    if (formatValue) {
      return {
        useValue: fracDigits
          ? formatNumber(useValue, 0, fracDigits, valueUnit)
          : `${formatCurrency(useValue)} ${valueUnit || ''}`,
        valueColorClass,
      }
    }
    return { useValue: value, valueEmpty: false, valueColorClass }
  }, [value, formatValue, fracDigits, valueUnit, emptyValue, coloredValue])

  return (
    <div
      className={cn(
        'mb-2 flex flex-row items-center justify-between',
        rest.className,
      )}
    >
      <div className="flex flex-row gap-2">
        <p className="typography-xs text-bitrush-neutral-0">{title}</p>
        {icon}
      </div>
      <p className={`typography-xs font-bold ${valueColorClass}`}>
        {String(useValue ?? '')}
      </p>
    </div>
  )
}

export default DataDisplayRow
