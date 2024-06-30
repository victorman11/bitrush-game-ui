import { useCallback } from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/helpers/tailwindMerge'

import Button from '../Button/Button'
import RenderIf from '../RenderIf/RenderIf'
import Caption from './Caption'

export type CalendarProps = {
  visible: boolean
  onSelect(): void
} & React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  onSelect,
  visible,
  ...props
}: CalendarProps) {
  const handleOnConfirm = useCallback(() => {
    onSelect()
  }, [onSelect])

  return (
    <RenderIf isTrue={visible}>
      <DayPicker
        hideHead
        className={cn('p-3', className)}
        classNames={{
          root: 'border border-bitrush-blue-500 bg-bitrush-neutral-800 shadow-glow-blue-hovered p-4 md:p-8 bg-bitrush-neutral-800 z-50 absolute top-1/2 md:top-[30px] -translate-y-1/2 md:translate-y-0 inset-x-8 md:inset-x-0',
          month: 'space-y-4 w-full',
          table: 'w-full border-collapse space-y-1',
          row: 'flex w-full mt-2',
          cell: 'h-9 flex w-full text-center typography-sm p-0 relative  [&:has([aria-selected].day-outside)]:bg-bitrush-green-500',
          day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
          day_selected: 'border border-bitrush-blue-700 text-bitrush-blue-500',
          day_today: 'bg-accent text-accent-foreground',
          day_outside: 'opacity-50',
          day_disabled: 'opacity-50',
          day_hidden: 'text-bitrush-blue-500',
          vhidden: 'hidden',
          ...classNames,
        }}
        components={{
          Footer: (props) => (
            <Button
              {...props}
              onClick={() => handleOnConfirm()}
              label="Confirm date of birth"
            />
          ),
          Caption: (props) => <Caption {...props} />,
        }}
        {...props}
        // toDate={eighteenYearsAgo}
      />
    </RenderIf>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
