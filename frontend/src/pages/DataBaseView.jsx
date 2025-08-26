import { useEffect, useMemo, useState } from 'react';

import { Button, ListGroup, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import ImportExcelButton from '@components/ImportExcelButton';
import ModuleTable from '@components/table/ModuleTable';

import BancosForm from '@modules/base-de-datos/BancosForms';
import ProveedoresForm from '@modules/base-de-datos/ProveedoresForm';
import CentroCostosForm from '@modules/base-de-datos/CentroCostosForm';

import axiosInstance from '@utils/axiosConfig';

import { BsDatabaseCheck } from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';

const DataBaseView = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalKey, setModalKey] = useState('');
    const [isListView, setIsListView] = useState(false);

    const [bancosData, setBancosData] = useState([]);
    const [proveedoresData, setProveedoresData] = useState([]);
    const [centroCostosData, setCentroCostosData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBancosData();
        fetchProveedores();
        fetchCentroCostos();
    }, []);

    const fetchBancosData = async () => {
        try {
            const response = await axiosInstance.get('/bancos');
            setBancosData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProveedores = async () => {
        try {
            const response = await axiosInstance.get('/proveedores/r');
            setProveedoresData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCentroCostos = async () => {
        try {
            const response = await axiosInstance.get('/centro-costos');
            setCentroCostosData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteEntry = async (rowId) => {
        let endpoint = '';

        if (modalKey === 'bancos') {
            endpoint = 'bancos';
        } else if (modalKey === 'centroDeCostos') {
            endpoint = 'centro-costos';
        } else if (modalKey === 'proveedores') {
            endpoint = 'proveedores';
        } else {
            console.error('No se ha reconocido la Base de Datos');
            return;
        }

        try {
            const response = await axiosInstance.delete(`/${endpoint}/${rowId}`);
            if (response) {
                toast.success('Se ha eliminado con éxito!');
                return true;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            setModalContent(isListView ? renderList() : renderForm());
        }
    }, [showModal]);

    const handleShowModal = (key, action, title, listView = false) => {
        setModalKey(key);
        setModalTitle(title);
        setIsListView(listView);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalKey('');
        setModalTitle('');
        setIsListView(false);
    };

    const dbData = {
        centroDeCostos: centroCostosData,
        proveedores: proveedoresData,
        bancos: bancosData
    };

    const databases = [
        { key: 'proveedores', name: 'Proveedores' },
        { key: 'bancos', name: 'Bancos ProBeco' },
        { key: 'centroDeCostos', name: 'Centro de Costos' }
    ];

    const formComponents = {
        proveedores: ProveedoresForm,
        bancos: BancosForm,
        centroDeCostos: CentroCostosForm
    };

    const columnKeysMap = useMemo(() => {
        const map = {};
        Object.entries(dbData).forEach(([key, value]) => {
            map[key] = Array.isArray(value) && value.length > 0 ? Object.keys(value[0]) : [];
        });
        return map;
    }, [dbData]);

    const renderForm = () => {
        const FormComponent = formComponents[modalKey];
        return FormComponent ? <FormComponent /> : <p>Seleccione una opción válida.</p>;
    };

    const renderList = () => {
        const data = dbData[modalKey];
        if (!data || data.length === 0) return <>No hay datos cargados en esta base de datos.</>;

        return (
            <ModuleTable
                editableForm={formComponents[modalKey]}
                deleteEndpoint={handleDeleteEntry}
                data={data}
                columnKeys={columnKeysMap[modalKey]}
                filename={modalKey}
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
                {databases.map(({ key, name }) => (
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
                            <ImportExcelButton
                                currentColumnKey={key}
                                name={name}
                                columnKeys={columnKeysMap[key]}
                            />
                            <Button
                                size="sm"
                                style={{backgroundColor: 'var(--button-bg-color)'}}
                                onClick={() => handleShowModal(key, 'add', `Agregar ${name}`)}
                            >
                                <IoMdAddCircleOutline size={22} />
                            </Button>
                            <Button
                                size="sm"
                                style={{backgroundColor: 'var(--button-bg-color)'}}
                                onClick={() => handleShowModal(key, 'list', `Lista de ${name}`, true)}
                            >
                                <TiThMenu size={20} />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                scrollable
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
            </Modal>
        </div>
    );
};

export default DataBaseView;
