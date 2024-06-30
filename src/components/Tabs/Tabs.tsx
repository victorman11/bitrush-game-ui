import { useEffect, useRef, useState } from 'react'

import { cn } from '@/helpers/tailwindMerge'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

type TabsData = {
  tabs: Array<{ label: string; content: JSX.Element | null }>
}

export function Tabs(props: TabsData) {
  const { isDesktop } = useDeviceWidth()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex]
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()
    window.addEventListener('resize', setTabPosition)

    return () => window.removeEventListener('resize', setTabPosition)
  }, [activeTabIndex])

  return (
    <>
      <div className="relative">
        <div className="flex justify-evenly border-b">
          {props.tabs.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className={`typography-sm w-full pb-2 pt-1 lg:pb-3 lg:pt-2 ${
                  idx === activeTabIndex
                    ? 'text-bitrush-blue-500'
                    : 'text-bitrush-neutral-0'
                }`}
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="absolute bottom-0 block h-[1px] w-full bg-bitrush-neutral-500 transition-all duration-300" />
        <div
          className="absolute bottom-0 block h-[1px] bg-bitrush-blue-500 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className={cn(isDesktop ? 'py-4' : 'flex flex-1 flex-col')}>
        {props.tabs[activeTabIndex].content}
      </div>
    </>
  )
}
