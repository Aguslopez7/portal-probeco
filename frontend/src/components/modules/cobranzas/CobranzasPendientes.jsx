import { useEffect, useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

import ModuleTable from '@components/table/ModuleTable';

import CobranzaPendienteForm from '@modules/cobranzas/CobranzasPendientesForm';

import useCanModifyData from '@hooks/useCanModifyData';

import { eliminarCobranzaPendienteById, listarCobranzasPendientes } from '@services/cobranzaService';

import { IoDocumentAttachOutline } from 'react-icons/io5';

const CobranzasPendientes = () => {
    const canModify = useCanModifyData();

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCobranzasData = async () => {
            const responseData = await listarCobranzasPendientes();

            if (responseData) {
                setData(responseData);
            }
        };

        fetchCobranzasData();
    }, []);

    const columnKeys = data.length > 0 ? Object.keys(data[0]) : null;

    const nuevoReporteButton = () => (
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
            Nuevo Reporte
        </Button>
    );

    return (
        <>
            <ModuleTable
                editableForm={CobranzaPendienteForm}
                deleteEndpoint={eliminarCobranzaPendienteById}
                data={data}
                columnKeys={columnKeys}
                filename="cobranzas-pendientes-data"
                enablePagination={false}
                customButtons={canModify && [nuevoReporteButton]}
            />
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                scrollable
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CobranzaPendienteForm />
                </Modal.Body>
            </Modal>
        </>
    );
};
export default CobranzasPendientes;
