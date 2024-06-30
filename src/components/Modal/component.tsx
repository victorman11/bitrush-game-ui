import {
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import ReactDOM from 'react-dom'

import { Header } from './components/Header'

type ModalHandles = {
  openModal: () => void
  closeModal: () => void
}

type ModalProps = {
  header?: React.ReactNode
} & PropsWithChildren

const Modal: ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children, header },
  ref,
) => {
  const [isVisible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false),
  }))

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setVisible(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleClose = () => {
    setVisible(false)
  }

  if (!isVisible) {
    return false
  }

  const component = (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex flex-col bg-bitrush-neutral-850">
      <Header content={header} onClose={handleClose} />
      <div className="thin-scrollbar flex flex-1 flex-col items-center overflow-y-auto">
        {children}
      </div>
    </div>
  )

  return ReactDOM.createPortal(component, document.body)
}

const ModalRef = forwardRef(Modal)

export { ModalRef as Modal }
export type { ModalHandles }
