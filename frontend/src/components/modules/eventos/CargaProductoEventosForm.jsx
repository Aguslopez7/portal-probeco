import { useEffect, useState } from 'react';

import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { useModalManager } from '@hooks/useModalManager';
import ProductosManager from './ProductosManager';

import { FaEdit } from 'react-icons/fa';

const CargaProductosEventoForm = ({ selectedItemData = {}, isEditing = false, initialData, onClose, onGuardar, onEditOverride }) => {
    const [productoForm, setProductoForm] = useState(initialData || {});
    const modal = useModalManager();
    const productos = ProductosManager({ formData: productoForm, setFormData: setProductoForm, openModal: modal.openModal, closeModal: modal.closeModal });

    // Calcula precioTotalSinIva dinámicamente
    useEffect(() => {
        if (!productoForm) return;
        const { cantidad, precioUnitarioSinIva } = productoForm;

        const cantidadNum = Number(cantidad);
        const precioUnitNum = Number(precioUnitarioSinIva);

        if (!isNaN(cantidadNum) && !isNaN(precioUnitNum)) {
            const precioTotal = cantidadNum * precioUnitNum;
            setProductoForm((prev) => ({
                ...prev,
                precioTotalSinIva: precioTotal
            }));
        }
    }, [productoForm?.cantidad, productoForm?.precioUnitarioSinIva]);

    // Si cambia el descuentoMonto, calcula porcentaje y precio final
    useEffect(() => {
        if (!productoForm) return;
        const { precioTotalSinIva, descuentoMonto } = productoForm;

        const precioTotalNum = Number(precioTotalSinIva);
        const descuentoNum = Number(descuentoMonto);

        if (!isNaN(precioTotalNum) && !isNaN(descuentoNum)) {
            const porcentaje = (descuentoNum / precioTotalNum) * 100;
            const precioFinal = precioTotalNum - descuentoNum;

            setProductoForm((prev) => ({
                ...prev,
                descuentoPorcentaje: porcentaje,
                precioFinalSinIva: precioFinal
            }));
        }
    }, [productoForm?.descuentoMonto, productoForm?.precioTotalSinIva]);

    // Si cambia el descuentoPorcentaje, calcula monto y precio final
    useEffect(() => {
        if (!productoForm) return;
        const { precioTotalSinIva, descuentoPorcentaje } = productoForm;

        const precioTotalNum = Number(precioTotalSinIva);
        const porcentajeNum = Number(descuentoPorcentaje);

        if (!isNaN(precioTotalNum) && !isNaN(porcentajeNum)) {
            const monto = (precioTotalNum * porcentajeNum) / 100;
            const precioFinal = precioTotalNum - monto;

            setProductoForm((prev) => ({
                ...prev,
                descuentoMonto: monto,
                precioFinalSinIva: precioFinal
            }));
        }
    }, [productoForm?.descuentoPorcentaje, productoForm?.precioTotalSinIva]);

    const getFieldOverrides = () => {
        const overrides = {};

        overrides.detalleComponentesOpcionales = (formData, onChange) => (
            <>
                <Form.Label>Detalle Componentes</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        style={{ textAlign: 'center' }}
                        disabled
                        //value={"Cantidad: " + (productoForm.detalleComponentes || []).length}
                        value="Cantidad: 5"
                    />
                    <Button
                        onClick={productos.handleModifyComponents}
                        variant="light"
                        style={{ border: '1px solid black' }}
                    >
                        Modificar <FaEdit size={18} />
                    </Button>
                </InputGroup>
            </>
        );

        return overrides;
    };

    return (
        <>
            <SchemaFormWrapper
                dtoName="DtoProductosEvento"
                dtoNameRequest="DtoProductosEvento" // cambiar por request con id
                selectedItemData={selectedItemData}
                isEditing={isEditing}
                formData={productoForm}
                setFormData={setProductoForm}
                onSubmitOverride={!isEditing ? () => onGuardar(productoForm) : undefined}
                onEditOverride={isEditing ? onEditOverride : undefined}
                onClose={onClose}
                getFieldOverrides={getFieldOverrides()}
            />

            <Modal
                show={modal.showModal}
                onHide={modal.closeModal}
                centered
                scrollable
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modal.modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal.modalContent}</Modal.Body>
            </Modal>
        </>
    );
};

export default CargaProductosEventoForm;
