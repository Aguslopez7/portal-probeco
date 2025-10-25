import { useEffect, useMemo, useState } from 'react';

import { Button, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import toast from 'react-hot-toast';

import ImportExcelButton from '@components/ImportExcelButton';
import ModuleTable from '@components/table/ModuleTable';

import axiosInstance from '@utils/axiosConfig';
import { databaseConfig } from '@utils/dataBaseConfig';

import useResponsive from '../hooks/useResponsive';

import { BsDatabaseCheck } from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';

const DataBaseView = () => {
    const { isSmallDevice } = useResponsive();

    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState('');
    const [activeTab, setActiveTab] = useState('add'); // tab por defecto

    const [dbData, setDbData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 fetch genérico
    const fetchData = async (key, endpoint) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(endpoint);
            setDbData((prev) => ({ ...prev, [key]: response.data }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Object.entries(databaseConfig).forEach(([key, { endpoint }]) => {
            fetchData(key, endpoint);
        });
    }, []);

    const handleDeleteEntry = async (key, rowId) => {
        const { endpoint } = databaseConfig[key];
        try {
            await axiosInstance.delete(`${endpoint}/${rowId}`);
            toast.success('Se ha eliminado con éxito!');
            fetchData(key, endpoint);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleOpenModal = (key) => {
        setModalKey(key);
        setActiveTab('add'); // siempre arranca en la tab "Listar"
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        //setModalKey('');
        //setActiveTab('add');
    };

    const columnKeysMap = useMemo(() => {
        const map = {};
        Object.entries(dbData).forEach(([key, value]) => {
            map[key] = Array.isArray(value) && value.length > 0 ? Object.keys(value[0]) : [];
        });
        return map;
    }, [dbData]);

    const renderForm = (key) => {
        const FormComponent = databaseConfig[key]?.form;
        return FormComponent ? <FormComponent /> : <p>No existe formulario asociado.</p>;
    };

    const renderList = (key) => {
        const data = dbData[key];
        if (!data || data.length === 0) return <>No hay datos cargados.</>;

        const FormComponent = databaseConfig[key]?.form;
        return (
            <ModuleTable
                editableForm={FormComponent}
                deleteEndpoint={(rowId) => handleDeleteEntry(key, rowId)}
                data={data}
                columnKeys={columnKeysMap[key]}
                filename={key}
            />
        );
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h1>
                <FaDatabase style={{ marginRight: '10px' }} />
                Base de Datos
            </h1>
            <br />
            <hr />
            <br />
            <ListGroup>
                {Object.entries(databaseConfig).map(([key, { name }]) => (
                    <ListGroup.Item
                        key={key}
                        style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}
                    >
                        <BsDatabaseCheck
                            size={25}
                            className="icon-margin"
                        />
                        {name}
                        <div className="ms-auto d-flex gap-2">
                            <Button
                                size="sm"
                                variant="dark"
                                onClick={() => handleOpenModal(key)}
                            >
                                <TiThMenu
                                    size={20}
                                    style={{ marginRight: isSmallDevice ? '0px' : '6px' }}
                                />
                                {isSmallDevice ? '' : 'Administrar'}
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Modal con Tabs */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                scrollable
                size="lg"
                enforceFocus={false} 
            >
                <Modal.Header closeButton>
                    <Modal.Title>Administrar {modalKey && databaseConfig[modalKey]?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="db-tabs"
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-3"
                    >
                        <Tab
                            eventKey="add"
                            title="Agregar"
                        >
                            {modalKey && renderForm(modalKey)}
                        </Tab>
                        <Tab
                            eventKey="list"
                            title="Listar"
                        >
                            {modalKey && renderList(modalKey)}
                        </Tab>
                        {databaseConfig[modalKey]?.importExcel && (
                            <Tab
                                eventKey="import"
                                title="Importar"
                            >
                                <ImportExcelButton
                                    currentColumnKey={modalKey}
                                    name={databaseConfig[modalKey]?.name}
                                    columnKeys={columnKeysMap[modalKey]}
                                />
                            </Tab>
                        )}
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DataBaseView;
