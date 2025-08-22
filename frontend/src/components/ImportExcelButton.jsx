import React, { useEffect, useState } from 'react';

import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';

import axiosInstance from '@utils/axiosConfig';

import { FaInfoCircle } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { TbTableImport } from 'react-icons/tb';

const ImportExcelButton = ({ currentColumnKey, name, columnKeys, data }) => {
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [responseMsg, setResponseMsg] = useState(null);

    const [content, setContent] = useState([]);

    const handleClose = () => {
        setShowModal(false);
        setFile(null);
        setResponseMsg(null);
    };

    const handleShow = () => {
        setShowModal(true);
        setContent(columnKeys.length);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setResponseMsg({ type: 'danger', text: 'Seleccioná un archivo Excel antes de subir.' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const controllerName = currentColumnKey === 'cuentasContables' ? 'cuentas-contables' : currentColumnKey;
            const response = await axiosInstance.post(`/${controllerName}/import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponseMsg({ type: 'success', text: 'Importación exitosa.', data: response.data });
        } catch (error) {
            const msg = error.response?.data || error.message;
            setResponseMsg({ type: 'danger', text: 'Error al importar: ', data: msg });
        } finally {
            setUploading(false);
        }
    };

    const getCustomContent = (key) => {
        switch (key) {
            case 'cuentasContables':
                return (
                    <>
                        <code style={{ whiteSpace: 'pre-line' }}>{`"nombre" | "grupoContable" | "subGrupoContable" | "tipoCuentaContable" | "tipoCosto"`}</code>
                        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
                            (*) Si ya existe una cuenta contable con el mismo <strong>nombre</strong> ingresado se ignora ese nuevo registro.
                        </p>
                    </>
                );
            case 'proveedores':
                return (
                    <>
                        <code style={{ whiteSpace: 'pre-line' }}>{`"id" | "name" | "banco" | "numeroCuenta" | "sucursal" | "moneda"`}</code>
                        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
                            (*) El <strong>id</strong> debe estar vacío.
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            (*) Si ya existe un proveedor con el mismo <strong>nombre</strong> ingresado se ignora ese nuevo registro.
                        </p>
                    </>
                );
            case 'bancos':
                return (
                    <>
                        <code style={{ whiteSpace: 'pre-line' }}>{`"id" | "name" | "sucursal" | "moneda" | "numeroCuenta"`}</code>
                        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
                            (*) El <strong>id</strong> debe estar vacío.
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            (*) Si ya existe un banco con el mismo <strong>nombre</strong> y <strong>nro. de cuenta</strong> ingresado se ignora ese nuevo registro.
                        </p>
                    </>
                );
            default:
                return <p style={{ fontStyle: 'italic' }}>Base de datos desconocida</p>;
        }
    };

    return (
        <>
            <Button
                style={{backgroundColor: 'var(--button-bg-color)'}}
                onClick={handleShow}
                disabled={currentColumnKey != 'proveedores' && currentColumnKey != 'cuentasContables'}
            >
                <TbTableImport size={22} />
            </Button>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Importar {name} desde Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body className="import-excel-modal">
                    <Alert
                        variant="warning"
                        className="mt-3"
                    >
                        <p className="mb-2">
                            <IoIosWarning
                                size={22}
                                className="icon-margin"
                            />
                            <strong>IMPORTANTE: Se debe respetar el siguiente orden y nomenclatura de columnas:</strong>
                        </p>
                        {/* {Array.isArray(columnKeys) && columnKeys.length > 0 && (
                            <p>
                                {columnKeys.map((key, i) => (
                                    <span key={key}>
                                        "{key}"{i < columnKeys.length - 1 && ' | '}
                                    </span>
                                ))}
                            </p>
                        )} */}
                        {getCustomContent(currentColumnKey)}
                    </Alert>
                    <Form.Group controlId="formFile">
                        <Form.Label>Selecciona archivo Excel (.xlsx)</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    {responseMsg && (
                        <Alert
                            variant={responseMsg.type}
                            className="mt-3"
                        >
                            {Array.isArray(responseMsg.data) ? (
                                <ul>
                                    {responseMsg.data.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span>{responseMsg.data}</span>
                            )}
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{backgroundColor: 'var(--button-bg-color)'}}
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <Spinner
                                size="sm"
                                animation="border"
                            />
                        ) : (
                            'Subir'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImportExcelButton;
