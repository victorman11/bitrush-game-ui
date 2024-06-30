import { zodResolver } from '@hookform/resolvers/zod'
import { FormEvent, useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import envVariables from '@/commons/consts/envVariables'
import SocketKeys, { ClientEvents } from '@/commons/consts/socketKeys'
import { useAuthStore } from '@/commons/stores'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import { useChatroomStore } from '@/pages/Home/components/Chatroom/useChatroomStore.ts'
import { wsEmit } from '@/services/socket'

import { SendMessageData, sendMessageSchema } from './schema'

const allowedChatrooms = envVariables.ALLOWED_CHATROOMS

const useChatroom = () => {
  const { isLoggedIn, user } = useAuthStore()
  const { messages, room, setRoom } = useChatroomStore()
  const { isMobile } = useDeviceWidth()

  const sendMessageForm = useForm<SendMessageData>({
    resolver: zodResolver(sendMessageSchema),
    mode: 'onChange',
  })

  const { userNames, userNameIds } = useMemo(() => {
    return {
      userNames: messages.map((message) => message.userName),
      userNameIds: messages.reduce(
        (ret, message) => {
          ret[message.userName] = message.userId
          return ret
        },
        {} as Record<string, number>,
      ),
    }
  }, [messages])

  useEffect(() => {
    wsEmit(ClientEvents.JOIN_CHAT_ROOM, room)
  }, [room])

  const handleSend = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const { message } = sendMessageForm.getValues()
      sendMessageForm.handleSubmit(() => {
        wsEmit(ClientEvents.SEND_MESSAGE_TO_CHAT_ROOM, {
          message,
          room,
        })
        sendMessageForm.reset()
      })()
    },
    [room, sendMessageForm],
  )

  const handleChangeRoom = useCallback(
    (newRoom: string) => {
      if (room !== newRoom) {
        if (room) {
          wsEmit(SocketKeys.LEAVE_CHAT_ROOM, room)
        }
        setRoom(newRoom)
      }
    },
    [room, setRoom],
  )

  return {
    form: { sendMessageForm },
    functions: { handleSend, handleChangeRoom },
    states: {
      isLoggedIn,
      messages,
      room,
      user,
      rooms: allowedChatrooms,
      isMobile,
      userNames,
      userNameIds,
    },
  }
}

export default useChatroom
