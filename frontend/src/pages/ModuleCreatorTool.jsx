import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { IoMdAddCircleOutline } from 'react-icons/io';

const CrearModulo = () => {
    const [nombre, setNombre] = useState('');
    const [backend, setBackend] = useState(true);
    const [frontend, setFrontend] = useState(true);
    const [atributos, setAtributos] = useState({});
    const [nuevoAtributo, setNuevoAtributo] = useState({
        nombre: '',
        tipo: '',
        nullable: false
    });

    useEffect(() => {
        console.log('Estado actual de atributos:', atributos);
    }, [atributos]);

    const handleGenerateFrontend = async (nombreModulo) => {
        if (!nombreModulo.trim()) {
            alert('❌ El nombre del módulo no puede estar vacío.');
            return;
        }

        try {
            console.log(nombreModulo);
            const response = await axios.post(
                'http://127.0.0.1:5000/api/generar-frontend',
                {
                    nombreModulo
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('✅ Modulo', response.data.nombre);
            return response.data;
        } catch (error) {
            console.error('❌ Error al generar clase:', error.response?.data || error.message);
        }
    };

    const handleGenerateBackend = async (nombreModulo, atributos) => {
        if (!nombreModulo.trim()) {
            alert('❌ El nombre del módulo no puede estar vacío.');
            return;
        }

        if (Object.keys(atributos).length === 0) {
            alert('❌ Debés agregar al menos un atributo.');
            return;
        }

        try {
            console.log(nombreModulo);
            console.log(atributos);
            const response = await axios.post(
                'http://127.0.0.1:5000/api/generar-backend',
                {
                    nombreModulo,
                    atributos
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('✅ Modulo', response.data.nombre);
            return response.data;
        } catch (error) {
            console.error('❌ Error al generar clase:', error.response?.data || error.message);
        }
    };

    const agregarAtributo = () => {
        if (nuevoAtributo.nombre.trim()) {
            setAtributos((prev) => ({
                ...prev,
                [nuevoAtributo.nombre]: {
                    tipo: nuevoAtributo.tipo,
                    nullable: nuevoAtributo.nullable
                }
            }));
            setNuevoAtributo({ nombre: '', tipo: 'String', nullable: true });
        }
    };

    const eliminarAtributo = (key) => {
        const copia = { ...atributos };
        delete copia[key];
        setAtributos(copia);
    };

    const actualizarNombre = (keyAntiguo, nuevoNombre) => {
        if (!nuevoNombre.trim()) return;
        setAtributos((prev) => {
            const copia = { ...prev };
            const datos = copia[keyAntiguo];
            delete copia[keyAntiguo];
            copia[nuevoNombre] = datos;
            return copia;
        });
    };

    return (
        <Container
            className="p-4 border rounded h-100"
            style={{ backgroundColor: '#fff' }}
        >
            <h1 className="text-center mb-4">Crear Módulo</h1>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre del módulo"
                        />
                    </Form.Group>
                </Col>

                <Col
                    md={6}
                    style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '55px' }}
                >
                    <Form.Check
                        type="checkbox"
                        label="Backend"
                        checked={backend}
                        onChange={() => setBackend(!backend)}
                        className="mb-3"
                    />

                    <Form.Check
                        type="checkbox"
                        label="Frontend"
                        checked={frontend}
                        onChange={() => setFrontend(!frontend)}
                        className="mb-3"
                    />
                </Col>
            </Row>

            {/** Settings Row **/}
            <Row>
                {backend && (
                    <Col
                        md={6}
                        style={{ border: '1px solid rgba(1,1,1,0.2)', borderRadius: '8px', padding: '25px', boxSizing: 'border-box' }}
                    >
                        <h4>Config Backend</h4>
                        <Alert variant="info">
                            <strong>Capas creadas:</strong> <br />
                            - Entity <br />
                            - Dto <br />
                            - Service <br />
                            - Controller <br />
                            - Repository <br />
                            - Mapper
                        </Alert>
                        <h5>Atributos</h5>
                        <InputGroup className="mb-2">
                            <FormControl
                                placeholder="Nombre Atributo"
                                value={nuevoAtributo.nombre}
                                onChange={(e) => setNuevoAtributo({ ...nuevoAtributo, nombre: e.target.value })}
                            />
                            <Form.Select
                                value={nuevoAtributo.tipo}
                                onChange={(e) => setNuevoAtributo({ ...nuevoAtributo, tipo: e.target.value })}
                            >
                                <option
                                    disabled
                                    value=""
                                >
                                    Seleccionar tipo
                                </option>
                                <option value="String">String</option>
                                <option value="Long">Long</option>
                                <option value="Integer">Integer</option>
                                <option value="Float">Float</option>
                                <option value="BigDecimal">BigDecimal</option>
                                <option value="LocalDate">LocalDate</option>
                                <option value="Boolean">Boolean</option>
                                <option value="Enum">Enum</option>
                            </Form.Select>
                            <Form.Check
                                type="checkbox"
                                label="Nullable"
                                checked={nuevoAtributo.nullable}
                                onChange={(e) => setNuevoAtributo({ ...nuevoAtributo, nullable: e.target.checked })}
                                className="m-2"
                            />
                            <Button
                                variant="success"
                                onClick={agregarAtributo}
                            >
                                <IoMdAddCircleOutline size={30} />
                            </Button>
                        </InputGroup>

                        {Object.entries(atributos).map(([clave, { tipo, nullable }]) => (
                            <div
                                key={clave}
                                className="d-flex align-items-center mb-1"
                            >
                                <span className="me-2">•</span>
                                <FormControl
                                    value={clave}
                                    onChange={(e) => actualizarNombre(clave, e.target.value)}
                                    className="me-2 w-50"
                                />
                                <span className="text-info me-2">{tipo}</span>
                                <span className="me-2">{nullable ? 'nullable' : 'not null'}</span>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => eliminarAtributo(clave)}
                                >
                                    x
                                </Button>
                            </div>
                        ))}

                        <div className="text-center mt-4">
                            <Button
                                variant="success"
                                size="lg"
                                onClick={() => handleGenerateBackend(nombre, atributos)}
                            >
                                Generar Backend
                            </Button>
                        </div>
                    </Col>
                )}

                {frontend && (
                    <Col
                        md={6}
                        style={{ border: '1px solid rgba(1,1,1,0.2)', borderRadius: '8px', padding: '25px', boxSizing: 'border-box' }}
                    >
                        <h4>Config Frontend</h4>
                        <Alert variant="info">
                            <strong>Capas creadas:</strong> <br />
                            - Page <br />
                            - Form <br />
                            - Table <br />
                            - Route <br />
                            - Sidebar Link <br />
                            - Service
                        </Alert>
                        <div className="text-center mt-4">
                            <Button
                                variant="success"
                                size="lg"
                                onClick={() => handleGenerateFrontend(nombre)}
                            >
                                Generar Frontend
                            </Button>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default CrearModulo;
