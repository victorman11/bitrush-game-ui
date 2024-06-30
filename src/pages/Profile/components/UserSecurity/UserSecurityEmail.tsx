import { useRef } from 'react'

import { useAuthStore } from '@/commons/stores'
import { Card } from '@/components/Card'
import { Modal, ModalHandles } from '@/components/Modal'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { EmailModalContent } from './components/EmailModalContent'
import { UserSecurityItem } from './UserSecurityItem'

const UserSecurityEmail = () => {
  const { user } = useAuthStore()
  const { isDesktop } = useDeviceWidth()
  const modalRef = useRef<ModalHandles>(null)

  const handleClick = () => {
    modalRef.current?.openModal()
  }

  return (
    <>
      <Modal
        ref={modalRef}
        header={!isDesktop ? <Card.Title>Edit email address</Card.Title> : null}
      >
        <EmailModalContent />
      </Modal>
      <UserSecurityItem
        description={user?.email}
        title="Email address"
        onClick={handleClick}
      />
    </>
  )
}

export { UserSecurityEmail }
