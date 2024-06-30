import './styles.css'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Card } from '@/components/Card'
import CustomIcon from '@/components/CustomIcon/CustomIcon'
import { Form } from '@/components/Form'
import { Modal, ModalHandles } from '@/components/Modal'
import ChatroomMessage from '@/pages/Home/components/Chatroom/components/ChatroomMessage.tsx'
import ChatroomSelectRoom from '@/pages/Home/components/Chatroom/components/ChatroomSelectRoom.tsx'
import useChatroom from '@/pages/Home/components/Chatroom/useChatroom.ts'
import UserStatsChart from '@/pages/Profile/components/UserStats/UserStatsChart.tsx'
import UserStatsTable from '@/pages/Profile/components/UserStats/UserStatsTable.tsx'

const Chatroom = () => {
  const { functions, states, form } = useChatroom()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const modalRef = useRef<ModalHandles>(null)
  const [userId, setUserId] = useState<number>()

  const handleNameClick = useCallback(
    (userId: number | string) => {
      if (states.userNameIds[userId]) {
        setUserId(states.userNameIds[userId])
        modalRef.current?.openModal()
      } else if (typeof userId === 'number') {
        setUserId(userId)
        modalRef.current?.openModal()
      } else {
        setUserId(undefined)
      }
    },
    [states.userNameIds],
  )

  useEffect(() => {
    if (chatContainerRef.current) {
      const { current } = chatContainerRef
      current.scrollTop = current.scrollHeight
    }
  }, [states.messages])

  return (
    <>
      {/* <span className="text-white">{window.innerHeight}</span> */}
      <Card.Container
        borderless={states.isMobile}
        className="flex  flex-col  lg:h-full"
        style={{
          height: states.isMobile
            ? window.innerHeight * functions.getContainerRatio()
            : '',
        }}
      >
        <Card.Header
          headerRight={
            <ChatroomSelectRoom
              room={states.room}
              rooms={states.rooms}
              onRoomChange={functions.handleChangeRoom}
            />
          }
          className="mb-2"
        >
          <Card.Title>Chatroom</Card.Title>
        </Card.Header>
        <Card.Content className="mb-4 flex-1 overflow-hidden">
          <div
            className="thin-scrollbar flex h-full flex-grow flex-col-reverse overflow-y-scroll"
            ref={chatContainerRef}
          >
            {states.messages.map((message) => (
              <ChatroomMessage
                userId={states.user?.id}
                userName={states.user?.userName}
                message={message}
                key={message.id}
                handleNameClick={handleNameClick}
              />
            ))}
          </div>
        </Card.Content>
        <Card.Footer>
          {states.isLoggedIn ? (
            <FormProvider {...form.sendMessageForm}>
              <form
                onSubmit={functions.handleSend}
                className="flex w-full flex-col gap-6"
              >
                <Form.Container>
                  <Form.Field>
                    <Form.Label htmlFor="message">
                      <div className="mr-1 flex flex-shrink-0 flex-row items-center gap-2">
                        <CustomIcon.ChatBubbles className="fill-bitrush-blue-100" />
                        <span>Chat</span>
                      </div>
                    </Form.Label>
                    <Form.Input
                      type="text"
                      name="message"
                      placeholder="Enter your message..."
                      suggestions={states.userNames}
                    />
                  </Form.Field>
                  <Form.ErrorMessage field="bet" />
                </Form.Container>
              </form>
            </FormProvider>
          ) : (
            <div className="flex flex-row items-center justify-between">
              <div className="typography-xs font-thin text-bitrush-neutral-0">
                You need to login to chat
              </div>
              <Link
                to="/login"
                className="typography-sm cursor-pointer text-bitrush-blue-500 hover:underline"
              >
                Login
              </Link>
            </div>
          )}
        </Card.Footer>
      </Card.Container>
      <Modal ref={modalRef}>
        <div className="w-full p-8">
          <div className="mx-auto flex max-w-xl flex-col gap-4 md:max-w-2xl">
            <UserStatsTable userId={userId} withHeader={true} />
            <UserStatsChart userId={userId} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Chatroom
