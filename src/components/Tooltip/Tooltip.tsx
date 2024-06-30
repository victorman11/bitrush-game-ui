import React, { PropsWithChildren, ReactElement } from 'react'
import { Tooltip as RTooltip } from 'react-tooltip'

import { cn } from '@/helpers/tailwindMerge'

type TooltipProps = {
  description?: string
  title?: string
} & PropsWithChildren

const Tooltip = ({ children, description, title }: TooltipProps) => {
  const childrenWithProp = React.Children.map(
    children as React.ReactElement,
    (child: ReactElement) => {
      return React.cloneElement(child, {
        className: cn('anchor-element', child.props.className),
      })
    },
  )

  return (
    <>
      <RTooltip
        anchorSelect=".anchor-element"
        className="border border-bitrush-blue-500"
        style={{ padding: 0 }}
        noArrow
        opacity={1}
      >
        <div className="flex w-[20vw] min-w-[250px] flex-row gap-2 bg-bitrush-neutral-800 px-[0.83vw] py-[1.43vh]">
          <img src="info-alert.svg" alt="info" />
          <div>
            <span className="typography-xs font-bold">{title}</span>
            <br />
            <span className="typography-xs">{description}</span>
          </div>
        </div>
      </RTooltip>
      {childrenWithProp}
    </>
  )
}

export { Tooltip }
