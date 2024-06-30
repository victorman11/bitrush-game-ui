import { useRef } from 'react'

import { Card } from '@/components/Card'
import { Modal, ModalHandles } from '@/components/Modal'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { DeleteAccountModalContent } from './components/DeleteAccountModalContent'

const UserSecurityDelete = () => {
  const { isDesktop } = useDeviceWidth()
  const modalRef = useRef<ModalHandles>(null)

  const handleClick = () => {
    modalRef.current?.openModal()
  }

  return (
    <>
      <Modal
        ref={modalRef}
        header={!isDesktop ? <Card.Title>Delete account</Card.Title> : null}
      >
        <DeleteAccountModalContent />
      </Modal>
      <div
        className="typography-sm cursor-pointer text-bitrush-red-500 "
        onClick={handleClick}
      >
        <span>Delete Account</span>
      </div>
    </>
  )
}

export { UserSecurityDelete }
