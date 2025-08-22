import { useEffect, useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

import ModuleTable from '@components/table/ModuleTable';

import useCanModifyData from '@hooks/useCanModifyData';

import { listarFacturasEmitidas, listarFacturasEmitidasByUsername, eliminarFacturaEmitidaById } from '@services/cobranzaService';

import { IoDocumentAttachOutline } from 'react-icons/io5';
import FacturasEmitidasForm from './FacturasEmitidasForm';

const FacturasEmitidas = () => {
    const canModify = useCanModifyData();

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const currentUsername = JSON.parse(localStorage.getItem('tokenPayload')).username;

    useEffect(() => {
        const fetchCobranzasData = async () => {
            const responseData = canModify ? await listarFacturasEmitidas() : await listarFacturasEmitidasByUsername(currentUsername);

            if (responseData) {
                setData(responseData);
            }
        };

        fetchCobranzasData();
    }, []);

    const columnKeys = data.length > 0 ? Object.keys(data[0]) : null;

    const nuevaFacturaButton = () => (
        <Button
            className="small-btn m-1"
            variant="success"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setShowModal(true)}
        >
            <IoDocumentAttachOutline
                className="icon-margin"
                size={18}
            />
            Nueva Factura
        </Button>
    );

    return (
        <>
            <ModuleTable
                editableForm={FacturasEmitidasForm}
                deleteEndpoint={eliminarFacturaEmitidaById}
                data={data}
                columnKeys={columnKeys}
                filename="factura-emitida-data"
                enablePagination={false}
                customButtons={canModify && [nuevaFacturaButton]}
            />
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                scrollable
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FacturasEmitidasForm />
                </Modal.Body>
            </Modal>
        </>
    );
};
export default FacturasEmitidas;
