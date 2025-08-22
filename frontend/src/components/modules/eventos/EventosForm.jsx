// EventosForm.jsx (refactorizado)
import { useEffect, useState } from 'react';



import { Button, Card, CardBody, Col, Form, InputGroup, ListGroup, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';



import MapaSeleccion from '@components/Mapa';
import SchemaFormWrapper from '@components/SchemaFormWrapper';



import { useModalManager } from '@hooks/useModalManager';
import useResponsive from '@hooks/useResponsive';



import { agregarCobranzaPendiente, editarCobranzaPendiente } from '@services/cobranzaService';



import ComisionesTable from './ComisionesTable';
import EstadoCuentaEvento from './EstadoCuentaEvento';
import ProductosTable from './ProductosTable';
import TerciarizadosTable from './TerciarizadosTable';



import { FaEdit } from 'react-icons/fa';
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineLocationOn } from 'react-icons/md';





const EventosForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});
    const modal = useModalManager();
    const {isSmallDevice} = useResponsive();

    // Se deben obtener desde la base de datos
    const clientes = [{ name: 'Cliente 1' }, { name: 'Cliente 2' }, { name: 'Cliente 3' }, { name: 'Cliente 4' }, { name: 'Cliente 5' }];
    const vendedores = [{ name: 'Vendedor 1' }, { name: 'Vendedor 2' }, { name: 'Vendedor 3' }, { name: 'Vendedor 4' }, { name: 'Vendedor 5' }];

    const [showProductosTable, setShowProductosTable] = useState(false);
    const [showTerciarizadosTable, setShowTerciarizadosTable] = useState(false);
    const [showComisionesTable, setShowComisionesTable] = useState(false);

    const [precioNetoSinIva, setPrecioNetoSinIva] = useState(0);

    // Calcula el precioNetoSinIva dinamicamente
    useEffect(() => {
        const total = formData?.productos?.reduce((acc, p) => acc + (p.precioTotalSinIva || 0), 0);
        setPrecioNetoSinIva(total);
    }, [formData.productos]);

    // Actualiza el precioNetoSinIva en formData cuando cambia
    useEffect(() => {
        if (precioNetoSinIva > 0) {
            setFormData((prev) => ({
                ...prev,
                precioNetoSinIva
            }));
        }
    }, [precioNetoSinIva]);

    const handleAddUbicacion = () => {
        modal.openModal(
            'Agregar Ubicación',
            <MapaSeleccion
                direccionInicial={formData.ubicacionEvento}
                onDireccionSeleccionada={(direccion) => {
                    setFormData((prev) => ({
                        ...prev,
                        ubicacionEvento: direccion
                    }));
                }}
            />
        );
    };

    const datos = [
        { label: 'Precio Neto Evento (sin iva)', valor: 20000 },
        { label: 'IVA', valor: 20000 },
        { label: 'Total IVA Incluido', valor: 20000 }
    ];

    const formatCurrency = (value) => new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const getFieldOverrides = () => {
        const overrides = {};

        overrides.nombreCliente = (formData, onChange) => (
            <Form.Group controlId="clienteSelect">
                <Form.Label>Nombre Cliente</Form.Label>
                <Form.Select
                    onChange={onChange}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Seleccionar Cliente
                    </option>
                    {clientes.map((cliente, index) => (
                        <option
                            key={index}
                            value={formData.nombreCliente || cliente.name}
                        >
                            {cliente.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        );

        overrides.nombreVendedor = (formData, onChange) => (
            <Form.Group controlId="clienteSelect">
                <Form.Label>Nombre Vendedor</Form.Label>
                <Form.Select
                    onChange={onChange}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Seleccionar Vendedor
                    </option>
                    {vendedores.map((vendedor, index) => (
                        <option
                            key={index}
                            value={formData.nombreVendedor || vendedor.name}
                        >
                            {vendedor.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        );

        overrides.ubicacionEvento = () => (
            <>
                <Form.Label htmlFor="ubicacionEvento">Ubicación</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="ubicacionEvento"
                        //disabled={!formData.ubicacionEvento}
                        value={formData.ubicacionEvento || ''}
                        placeholder="Ingrese Ubicación"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                ubicacionEvento: e.target.value
                            }))
                        }
                    />
                    <Button
                        onClick={handleAddUbicacion}
                        variant="light"
                        style={{ border: '1px solid black' }}
                    >
                        Seleccionar <MdOutlineLocationOn size={22} />
                    </Button>
                </InputGroup>
            </>
        );

        overrides.precioNetoSinIvaEvento = () => (
            <Row className="mb-3 g-3" style={{width: isSmallDevice ? 'auto' : '110dvh'}}> {}
                {datos.map((item, i) => (
                    <Col
                        key={i}
                        xs={12}
                        md={4}
                    >
                        <Card
                            className="h-100 shadow-sm"
                            style={{ backgroundColor: 'lightgray' }}
                        >
                            <Card.Header style={{textAlign:'center'}} className="d-flex align-items-center gap-2 fw-bold">
                                <FaInfoCircle size={18} className="text-secondary" />
                                {item.label}
                            </Card.Header>
                            <Card.Body style={{padding:'5px'}} className="d-flex justify-content-center align-items-center">
                                <div style={{ fontFamily: 'monospace', fontSize: 'x-large' }}>{formatCurrency(item.valor)}</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );

        overrides.totalSinIvaTerciarizados = () => (
            <h6 style={{padding:'5px', fontSize:'large'}}><FaInfoCircle className='icon-margin'/><strong>Total Terciarizados:</strong> <span style={{fontFamily:'monospace', fontSize:'x-large', marginLeft: !isSmallDevice &&'35px'}}>$20.000</span> <small>(sin iva)</small></h6>
        );

        overrides.totalComisonVenta = () => (
            <h6 style={{padding:'5px', fontSize:'large'}}><FaInfoCircle className='icon-margin'/><strong>Total Comision Venta:</strong> <span style={{fontFamily:'monospace', fontSize:'x-large', marginLeft: !isSmallDevice && '15px'}}>$20.000</span> <small>(sin iva)</small></h6>
        );

        overrides.productos = () => (
            <>
                <Form.Label>Detalles Productos Evento</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        style={{ textAlign: 'center' }}
                        disabled
                        value={'Cantidad: ' + (formData.productos || []).length}
                    />
                    <Button
                        onClick={() => setShowProductosTable(true)}
                        variant="light"
                        style={{ border: '1px solid black' }}
                    >
                        Modificar <FaEdit size={18} />
                    </Button>
                </InputGroup>
            </>
        );

        overrides.terciarizados = () => (
            <>
                <Form.Label>Detalle Tercerización</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        style={{ textAlign: 'center' }}
                        disabled
                        value={'Cantidad: ' + (formData.terciarizados || []).length}
                    />
                    <Button
                        onClick={() => setShowTerciarizadosTable(true)}
                        variant="light"
                        style={{ border: '1px solid black' }}
                    >
                        Modificar <FaEdit size={18} />
                    </Button>
                </InputGroup>
            </>
        );

        overrides.comisionVentas = () => (
            <>
                <Form.Label>Detalle Comisión por Ventas</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        style={{ textAlign: 'center' }}
                        disabled
                        value={'Cantidad: ' + (formData.terciarizados || []).length}
                    />
                    <Button
                        onClick={() => setShowComisionesTable(true)}
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
            {isEditing ? (
                <Tabs
                    defaultActiveKey="evento"
                    id="evento-form-tab"
                    className="mb-3"
                >
                    <Tab
                        eventKey="evento"
                        title="Eventos"
                    >
                        <SchemaFormWrapper
                            key="eventoForm"
                            dtoName="DtoEvento"
                            dtoNameRequest="DtoEventoRequest"
                            // editarEndpoint={editarCobranzaPendiente}
                            // agregarEndpoint={agregarCobranzaPendiente}
                            selectedItemData={selectedItemData}
                            isEditing={isEditing}
                            formData={formData}
                            setFormData={setFormData}
                            getFieldOverrides={getFieldOverrides()}
                        />
                    </Tab>
                    <Tab
                        eventKey="estadoCuenta"
                        title="Estado de Cuenta"
                    >
                        <EstadoCuentaEvento />
                    </Tab>
                    <Tab
                        eventKey="facturacion"
                        title="Facturación"
                    >
                        Facturación Evento
                    </Tab>
                </Tabs>
            ) : (
                <SchemaFormWrapper
                    key="eventoForm"
                    dtoName="DtoEvento"
                    dtoNameRequest="DtoEventoRequest"
                    // editarEndpoint={editarCobranzaPendiente}
                    // agregarEndpoint={agregarCobranzaPendiente}
                    selectedItemData={selectedItemData}
                    isEditing={isEditing}
                    formData={formData}
                    setFormData={setFormData}
                    getFieldOverrides={getFieldOverrides()}
                />
            )}

            <Modal
                show={modal.showModal}
                onHide={modal.closeModal}
                centered
                //scrollable
                size="lg"
                fullscreen
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modal.modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal.modalContent}</Modal.Body>
            </Modal>

            <ProductosTable
                show={showProductosTable}
                onHide={() => setShowProductosTable(false)}
            />
            <TerciarizadosTable
                show={showTerciarizadosTable}
                onHide={() => setShowTerciarizadosTable(false)}
            />
            <ComisionesTable
                show={showComisionesTable}
                onHide={() => setShowComisionesTable(false)}
            />
        </>
    );
};

export default EventosForm;