import { useRef } from 'react'

import { Modal, ModalHandles } from '@/components/Modal'

import { TermsAndConditionsContent } from './content'

const TermsAndConditions = () => {
  const modalRef = useRef<ModalHandles>(null)

  const handleClick = () => {
    modalRef.current?.openModal()
  }

  return (
    <>
      <Modal ref={modalRef}>
        <div className="flex w-[35%] flex-row">
          <TermsAndConditionsContent />
        </div>
      </Modal>
      <span className="typography-xs text-bitrush-neutral-0">
        I agree with{' '}
        <span
          className="typography-xs font-bold text-bitrush-blue-500"
          onClick={handleClick}
        >
          Terms & Conditions
        </span>
      </span>
    </>
  )
}

export { TermsAndConditions }
