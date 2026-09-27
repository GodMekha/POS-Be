import { Button } from "./Button.jsx";
import { Modal } from "./Modal.jsx";

/** Modal ຢືນຢັນ (ລຶບ ແລະ ອື່ນໆ) */
export const ConfirmModal = ({ open, title, children, confirmLabel = "ຢືນຢັນ", loading, onConfirm, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    footer={
      <>
        <Button variant="ghost" onClick={onClose}>
          ຍົກເລີກ
        </Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    {children}
  </Modal>
);
