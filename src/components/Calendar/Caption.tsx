import { add, format, sub } from 'date-fns'
import React from 'react'
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Caption({ displayMonth }: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth, goToDate } = useNavigation()
  const nextYear = add(displayMonth, {
    years: 1,
  })

  const previousYear = sub(displayMonth, {
    years: 1,
  })

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-row items-center justify-between">
        <a onClick={() => previousYear && goToDate(previousYear)}>
          <FaChevronLeft className="h-4 w-4 text-bitrush-blue-500" />
        </a>
        <p className="typography-sm to-bitrush-neutral-0">
          {format(displayMonth, 'yyyy')}
        </p>

        <a onClick={() => nextYear && goToMonth(nextYear)}>
          <FaChevronRight className="h-4 w-4 text-bitrush-blue-500" />
        </a>
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <a onClick={() => previousMonth && goToMonth(previousMonth)}>
          <FaChevronLeft className="h-4 w-4 text-bitrush-blue-500" />
        </a>
        <p className="typography-sm to-bitrush-neutral-0">
          {format(displayMonth, 'MMMM')}
        </p>

        <a onClick={() => nextMonth && goToMonth(nextMonth)}>
          <FaChevronRight className="h-4 w-4 text-bitrush-blue-500" />
        </a>
      </div>
    </div>
  )
}
export default Caption
