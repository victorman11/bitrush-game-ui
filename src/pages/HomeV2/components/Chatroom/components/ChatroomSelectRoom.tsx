import { useRef, useState } from 'react'

import { useOutsideClickAlerter } from '@/commons/hooks/useOutsideClickAlerter.ts'

type ChatroomSelectLangProps = {
  room: string
  rooms: string[]
  onRoomChange: (lang: string) => void
}

const ChatroomSelectRoom = ({
  room,
  onRoomChange,
  rooms,
}: ChatroomSelectLangProps) => {
  const [opened, setOpened] = useState(false)
  const dropdownRef = useRef(null)
  useOutsideClickAlerter(dropdownRef, () => setOpened(false))
  return (
    <div
      ref={dropdownRef}
      className="relative inline-block rounded border border-transparent p-2 text-left transition-shadow hover:border-bitrush-blue-700 hover:shadow-glow-blue-hovered"
    >
      <div
        onClick={() => setOpened(!opened)}
        className="flex cursor-pointer flex-row items-center gap-1"
      >
        <img src={`lang/${room.toLowerCase()}.svg`} className="w-6" alt="" />
        <img src={`dropdown.svg`} className="w-2" alt="" />
      </div>
      {opened && (
        <div className="absolute -m-2 mt-4 flex w-full flex-col items-center gap-3 rounded-md border border-bitrush-neutral-500 bg-bitrush-neutral-700 p-2 py-3">
          {rooms.map((item) => (
            <div
              key={item}
              className="cursor-pointer hover:opacity-80"
              onClick={() => {
                setOpened(false)
                onRoomChange(item)
              }}
            >
              <img
                src={`lang/${item.toLowerCase()}.svg`}
                className="w-6"
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChatroomSelectRoom
