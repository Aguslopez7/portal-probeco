import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ showModal, title, handleConfirmation, onClose, children, size = "lg", hideHeader = false, hideFooter = false }) => {
    return (
        <Modal show={showModal} onHide={onClose} centered scrollable size={size}>
            {/* Modal Header */}
            {!hideHeader && <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>}
            <Modal.Body>{children}</Modal.Body>
            {!hideFooter && <Modal.Footer>
                <Button className="main-btn" onClick={onClose}>
                    Cancelar
                </Button>
                <Button className="main-btn" onClick={handleConfirmation}>
                    Confirmar
                </Button>
            </Modal.Footer>}
        </Modal>
    );
};

export default CustomModal;
