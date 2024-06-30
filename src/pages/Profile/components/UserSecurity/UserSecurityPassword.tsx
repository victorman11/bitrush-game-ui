import { useRef } from 'react'

import { Card } from '@/components/Card'
import { Modal, ModalHandles } from '@/components/Modal'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { PasswordModalContent } from './components/PasswordModalContent'
import { UserSecurityItem } from './UserSecurityItem'

const UserSecurityPassword = () => {
  const { isDesktop } = useDeviceWidth()
  const modalRef = useRef<ModalHandles>(null)

  const handleClick = () => {
    modalRef.current?.openModal()
  }

  return (
    <>
      <Modal
        ref={modalRef}
        header={!isDesktop ? <Card.Title>Edit password</Card.Title> : null}
      >
        <PasswordModalContent />
      </Modal>
      <UserSecurityItem
        description="********"
        title="Password"
        onClick={handleClick}
      />
    </>
  )
}

export { UserSecurityPassword }
