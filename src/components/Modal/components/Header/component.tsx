import { FaArrowLeft } from 'react-icons/fa'

type HeaderProps = {
  content?: React.ReactNode
  onClose: () => void
}

const Header = ({ content, onClose }: HeaderProps) => {
  return (
    <div className="flex h-24 p-5">
      <div className="flex w-6 items-center">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center"
        >
          <FaArrowLeft className="h-5 w-5 text-bitrush-neutral-0" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {content || <img src="logo.svg" alt="logo" />}
      </div>
      <div className="w-6" />
    </div>
  )
}

export { Header }
