import { create } from 'zustand'

import { Message } from '@/pages/Home/components/Chatroom/components/ChatroomMessage.tsx'

type useChatroomStoreType = {
  room: string
  messages: Message[]
  setMessages: (messages: Array<Message>) => void
  addMessage: (message: Message) => void
  setRoom: (room: string) => void
}

const useChatroomStore = create<useChatroomStoreType>((set) => ({
  room: 'EN',
  messages: [],
  setRoom: (room: string) => set({ room, messages: [] }),
  setMessages: (messages: Array<Message>) => set({ messages }),
  addMessage: (message: Message) =>
    set((state) => ({ messages: [message, ...state.messages] })),
}))

export { useChatroomStore }
