import { Modal } from '@mui/material'
import { ModalContent } from './styled'

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
