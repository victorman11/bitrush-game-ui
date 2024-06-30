import './styles.css'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Card } from '@/components/Card'
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
      <Card.Container
        borderless={states.isMobile}
        className="flex flex-col justify-between"
      >
        <Card.Header
          headerRight={
            <ChatroomSelectRoom
              room={states.room}
              rooms={states.rooms}
              onRoomChange={functions.handleChangeRoom}
            />
          }
        >
          <Card.Title>Chatroom</Card.Title>
        </Card.Header>
        <Card.Content className="flex h-full flex-col justify-end">
          <div
            className="thin-scrollbar my-2 flex h-full max-h-[35vw] flex-col-reverse overflow-y-auto lg:max-h-[10.41vw]"
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
                        <svg
                          fill="none"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.87976 18.0385C7.17704 17.7854 6.39469 17.8932 5.79036 18.3384C5.40621 18.6196 4.74566 19.032 3.94456 19.4023C4.20691 18.7133 4.40835 17.9354 4.47394 17.0871C4.52079 16.4826 4.31934 15.8827 3.92114 15.4235C2.82959 14.1909 2.24868 12.7475 2.24868 11.2478C2.24868 7.52209 6.15108 3.7495 11.993 3.7495C17.8349 3.7495 21.7373 7.52209 21.7373 11.2478C21.7373 14.9736 17.8349 18.7462 11.993 18.7462C10.5126 18.7462 9.12122 18.4884 7.87976 18.0385ZM1.23209 19.8615C1.15713 19.9881 1.07749 20.1146 0.993168 20.2411L0.979114 20.2646C0.904158 20.3723 0.829202 20.4801 0.754246 20.5879C0.590279 20.8082 0.412258 21.0238 0.224868 21.2206C0.00936952 21.4362 -0.0515323 21.7549 0.0655866 22.036C0.182705 22.3172 0.454421 22.5 0.75893 22.5C0.997853 22.5 1.23678 22.4859 1.4757 22.4625L1.50849 22.4578C1.71462 22.4344 1.92075 22.4063 2.12688 22.3688C2.16436 22.3641 2.20183 22.3547 2.23931 22.3453C3.0732 22.1813 3.87429 21.9001 4.58638 21.5908C5.65918 21.1222 6.57271 20.5645 7.1302 20.1568C8.61995 20.6957 10.269 20.9956 12.007 20.9956C18.6313 20.9956 24 16.6326 24 11.2478C24 5.86309 18.6172 1.5 11.993 1.5C5.36873 1.5 0 5.86309 0 11.2478C0 13.3614 0.829202 15.3157 2.23463 16.9137C2.14562 18.0619 1.70057 19.0836 1.23209 19.8615ZM6.74605 12.7475C7.14364 12.7475 7.52495 12.5895 7.80609 12.3082C8.08723 12.027 8.24517 11.6456 8.24517 11.2478C8.24517 10.8501 8.08723 10.4686 7.80609 10.1874C7.52495 9.90616 7.14364 9.74816 6.74605 9.74816C6.34846 9.74816 5.96715 9.90616 5.68601 10.1874C5.40487 10.4686 5.24693 10.8501 5.24693 11.2478C5.24693 11.6456 5.40487 12.027 5.68601 12.3082C5.96715 12.5895 6.34846 12.7475 6.74605 12.7475ZM13.4921 11.2478C13.4921 10.8501 13.3342 10.4686 13.053 10.1874C12.7719 9.90616 12.3906 9.74816 11.993 9.74816C11.5954 9.74816 11.2141 9.90616 10.9329 10.1874C10.6518 10.4686 10.4939 10.8501 10.4939 11.2478C10.4939 11.6456 10.6518 12.027 10.9329 12.3082C11.2141 12.5895 11.5954 12.7475 11.993 12.7475C12.3906 12.7475 12.7719 12.5895 13.053 12.3082C13.3342 12.027 13.4921 11.6456 13.4921 11.2478ZM17.2399 12.7475C17.6375 12.7475 18.0188 12.5895 18.2999 12.3082C18.5811 12.027 18.739 11.6456 18.739 11.2478C18.739 10.8501 18.5811 10.4686 18.2999 10.1874C18.0188 9.90616 17.6375 9.74816 17.2399 9.74816C16.8423 9.74816 16.461 9.90616 16.1799 10.1874C15.8987 10.4686 15.7408 10.8501 15.7408 11.2478C15.7408 11.6456 15.8987 12.027 16.1799 12.3082C16.461 12.5895 16.8423 12.7475 17.2399 12.7475Z"
                            fill="currentColor"
                          />
                        </svg>
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
