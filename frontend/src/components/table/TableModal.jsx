import React from "react";
import { Form } from "react-bootstrap";
import CustomModal from "../Modal";

const TableModal = ({ showModal, onClose, onSave, selectedRow, columnNames = {}, hideFooter }) => {
    return (
        <CustomModal showModal={showModal} title={"Detalles"} handleConfirmation={onSave} onClose={onClose} hideFooter>
            {columnNames ? Object.keys(columnNames).map((column) => (
                <Form.Group key={column} className="mb-3">
                    <Form.Label>{columnNames[column]}</Form.Label>
                    <Form.Control
                        type="text"
                        value={selectedRow?.[column] || ""}
                        readOnly
                        disabled
                    />
                </Form.Group>
            )) : <h3>Error al cargar la informacion, por favor intente nuevamente!</h3>}
        </CustomModal>
    );
};

export default TableModal;
