import {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react'
import ReactDOM from 'react-dom'

import { Card } from '../Card'

type ModalDialogHandles = {
  closeModal: () => void
  openModal: () => void
}

type ModalDialogProps = {
  contentRef?: ForwardedRef<HTMLDivElement>
} & PropsWithChildren

const ModalDialog: ForwardRefRenderFunction<
  ModalDialogHandles,
  ModalDialogProps
> = ({ children, contentRef }, ref) => {
  const [isVisible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false),
  }))

  if (!isVisible) {
    return false
  }

  const component = (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center bg-[#ffffff00] backdrop-blur-[4px]">
      <div ref={contentRef} className="m-4">
        <Card.Container className="border-bitrush-blue-700 p-6 shadow-glow-blue-modal">
          {children}
        </Card.Container>
      </div>
    </div>
  )

  return ReactDOM.createPortal(component, document.body)
}

const ModalDialogRef = forwardRef(ModalDialog)

export { ModalDialogRef as ModalDialog }
export type { ModalDialogHandles }
