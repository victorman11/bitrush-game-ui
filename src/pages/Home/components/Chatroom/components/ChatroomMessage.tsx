import { format } from 'date-fns'

export interface Message {
  id: string
  userName: string
  userId: number
  text: string
  createdAt: Date
}

type ChatroomMessageProps = {
  message: Message
  handleNameClick?: (userId: number | string) => void
  userId?: number
  userName?: string
}

const ChatroomMessage = ({
  message,
  handleNameClick,
  userId,
  userName,
}: ChatroomMessageProps) => {
  const parseMessage = (text: string) => {
    return text
      .replace(new RegExp(`(\\S{${50}})`, 'g'), '$1 ')
      .split(/(\s+)/)
      .map((segment, index) => {
        const isMention = segment.startsWith('@')
        const isMentioningSelf =
          segment.toLocaleLowerCase() === `@${userName?.toLocaleLowerCase()}`
        return isMention ? (
          <button
            key={index}
            className={
              isMentioningSelf
                ? 'text-bitrush-yellow-500 hover:text-bitrush-yellow-400'
                : 'text-bitrush-purple-500 hover:text-bitrush-purple-400'
            }
            onClick={() => {
              handleNameClick && handleNameClick(segment.replace('@', ''))
            }}
          >
            {segment}
          </button>
        ) : (
          segment
        )
      })
  }

  return (
    <div className="mb-1 flex flex-row items-start">
      <div className="typography-xs mr-5 font-light">
        {format(message.createdAt, 'hh:mma').toLowerCase()}
      </div>
      <button
        className={`typography-xs mr-2 font-bold ${
          message.userId === userId
            ? 'text-bitrush-yellow-400 hover:text-bitrush-yellow-300'
            : 'text-bitrush-purple-400 hover:text-bitrush-purple-300'
        }`}
        onClick={() => {
          handleNameClick && handleNameClick(message.userId)
        }}
      >
        {message.userName}
      </button>
      <div className="typography-xs">{parseMessage(message.text)}</div>
    </div>
  )
}

export default ChatroomMessage
