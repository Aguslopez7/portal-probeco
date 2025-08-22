import { useEffect, useMemo, useState } from 'react';

import { addLocale } from 'primereact/api';
//import { Calendar } from 'primereact/calendar';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { Badge, Button, Card, Col, Form, ListGroup, Offcanvas, Row, Tab, Tabs } from 'react-bootstrap';

import PieChartCustom from '@components/PieChart';
import StackedBarChart from '@components/StackedBarChart';
import ModuleTable from '@components/table/ModuleTable';

import EventosForm from '@modules/eventos/EventosForm';

import useResponsive from '@hooks/useResponsive';

import { formatDate } from '@utils/helperMethods';

import { FaFilter } from 'react-icons/fa6';
import { IoStatsChartSharp } from 'react-icons/io5';
import { RxReset } from 'react-icons/rx';

const EventosTable = () => {
    const { isSmallDevice } = useResponsive();

    const [eventosOriginal] = useState([
        {
            id: 1,
            fechaEvento: '2025-08-10',
            marca: 'Inside Group',
            nombreCliente: 'Cliente A',
            nombreContactoPrincipal: 'Ana Gómez',
            telefonoContactoPrincipal: '099123456',
            tipoEvento: 'CUMPLEAÑOS',
            ubicacionEvento: '-34.9011, -56.1645',
            departamentoEvento: 'MONTEVIDEO',
            nombreVendedor: 'Juan Pérez',
            precioNetoSinIva: '15000',
            saldoPendiente: '10000',
            productos: [
                {
                    id: 'p1',
                    nombreProducto: 'Carpa Premium',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 2,
                    precioUnitarioSinIva: 5000.0,
                    precioTotalSinIva: 10000.0,
                    descuentoPorcentaje: 10,
                    descuentoMonto: 1000.0,
                    precioFinalSinIva: 9000.0,
                    detalleComponentes: 'Estructura + Lona + Iluminación'
                },
                {
                    id: 'p1b',
                    nombreProducto: 'Mesa Rectangular',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 10,
                    precioUnitarioSinIva: 300.0,
                    precioTotalSinIva: 3000.0,
                    descuentoPorcentaje: 5,
                    descuentoMonto: 150.0,
                    precioFinalSinIva: 2850.0,
                    detalleComponentes: 'Madera barnizada'
                },
                {
                    id: 'p1c',
                    nombreProducto: 'Sillas Blancas',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 100,
                    precioUnitarioSinIva: 120.0,
                    precioTotalSinIva: 12000.0,
                    descuentoPorcentaje: 10,
                    descuentoMonto: 1200.0,
                    precioFinalSinIva: 10800.0,
                    detalleComponentes: 'Plástico reforzado con funda blanca'
                }
            ],
            requiereTerciarizados: 'NO',
            terciarizados: [],
            notasAdministrativas: 'Evento familiar con montaje el día anterior.',
            carpa: 'SI',
            notasDeposito: 'Preparar envío desde depósito central.',
            notasCampo: 'Instalación desde las 07:00 AM.',
            tipoSuperficie: 'PASTO'
        },
        {
            id: 2,
            fechaEvento: '2025-09-15',
            marca: 'Blink',
            nombreCliente: 'Cliente B',
            nombreContactoPrincipal: 'Carlos Ruiz',
            telefonoContactoPrincipal: '098654321',
            tipoEvento: 'EVENTO_EMPRESARIAL',
            ubicacionEvento: '-34.7333, -56.2167',
            departamentoEvento: 'CANELONES',
            nombreVendedor: 'Laura Méndez',
            productos: [
                {
                    id: 'p2',
                    nombreProducto: 'Escenario Modular',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 1,
                    precioUnitarioSinIva: 15000.0,
                    precioTotalSinIva: 15000.0,
                    descuentoPorcentaje: 5,
                    descuentoMonto: 750.0,
                    precioFinalSinIva: 14250.0,
                    detalleComponentes: 'Plataforma + Truss + Backing'
                },
                {
                    id: 'p2b',
                    nombreProducto: 'Luces LED',
                    familiaProducto: 'Poligonal 15m',
                    cantidad: 20,
                    precioUnitarioSinIva: 250.0,
                    precioTotalSinIva: 5000.0,
                    descuentoPorcentaje: 0,
                    descuentoMonto: 0.0,
                    precioFinalSinIva: 5000.0,
                    detalleComponentes: 'Iluminación blanca y cálida'
                }
            ],
            requiereTerciarizados: 'SI',
            terciarizados: [
                {
                    nombreServicio: 'Sonido profesional',
                    proveedor: 'AudioMax',
                    costo: 8000.0
                }
            ],
            notasAdministrativas: 'Se requiere factura electrónica para empresa.',
            carpa: 'NO',
            notasDeposito: 'No aplicar, productos se entregan en el lugar.',
            notasCampo: 'Coordinar acceso con seguridad del predio.',
            tipoSuperficie: 'SUPERFICIE_DURA'
        },
        {
            id: 3,
            fechaEvento: '2025-10-05',
            marca: 'Blink',
            nombreCliente: 'Cliente C',
            nombreContactoPrincipal: 'Martín Silva',
            telefonoContactoPrincipal: '098111222',
            tipoEvento: 'EXPOSICIONES_Y_FERIAS',
            ubicacionEvento: '-34.8411, -56.1711',
            departamentoEvento: 'MONTEVIDEO',
            nombreVendedor: 'Valentina López',
            productos: [
                {
                    id: 'p3',
                    nombreProducto: 'Pagoda 5x5',
                    familiaProducto: 'Pagodas Blink',
                    cantidad: 3,
                    precioUnitarioSinIva: 4200.0,
                    precioTotalSinIva: 12600.0,
                    descuentoPorcentaje: 5,
                    descuentoMonto: 630.0,
                    precioFinalSinIva: 11970.0,
                    detalleComponentes: 'Estructura de aluminio + lona blanca + ventanas'
                }
            ],
            requiereTerciarizados: 'NO',
            terciarizados: [],
            notasAdministrativas: 'Ferias del barrio con acceso libre.',
            carpa: 'SI',
            notasDeposito: 'Enviar stock desde depósito 2.',
            notasCampo: 'Instalación en Rambla Gandhi.',
            tipoSuperficie: 'SUPERFICIE_DURA'
        },
        {
            id: 4,
            fechaEvento: '2025-11-20',
            marca: 'Inside Group',
            nombreCliente: 'Cliente D',
            nombreContactoPrincipal: 'Sofía Rodríguez',
            telefonoContactoPrincipal: '091333444',
            tipoEvento: 'FIESTAS',
            ubicacionEvento: '-34.9234, -56.1412',
            departamentoEvento: 'MONTEVIDEO',
            nombreVendedor: 'Gonzalo Núñez',
            productos: [
                {
                    id: 'p4',
                    nombreProducto: 'Estructura Básica',
                    familiaProducto: 'Caño Galvanizado',
                    cantidad: 4,
                    precioUnitarioSinIva: 2000.0,
                    precioTotalSinIva: 8000.0,
                    descuentoPorcentaje: 0,
                    descuentoMonto: 0.0,
                    precioFinalSinIva: 8000.0,
                    detalleComponentes: 'Caño galvanizado 2 pulgadas + amarres'
                }
            ],
            requiereTerciarizados: 'SI',
            terciarizados: [
                {
                    nombreServicio: 'Transporte especial',
                    proveedor: 'Logística Sur',
                    costo: 3500.0
                }
            ],
            notasAdministrativas: 'Cliente requiere boleta con RUT.',
            carpa: 'NO',
            notasDeposito: 'Stock debe salir directamente del cliente.',
            notasCampo: 'Superficie inclinada, usar niveladores.',
            tipoSuperficie: 'PASTO'
        },
        {
            id: 5,
            fechaEvento: '2025-09-15',
            marca: 'Inside Group',
            nombreCliente: 'Cliente E',
            nombreContactoPrincipal: 'Diego Torres',
            telefonoContactoPrincipal: '091111111',
            tipoEvento: 'CONFERENCIAS',
            ubicacionEvento: '-34.9012, -56.1635',
            departamentoEvento: 'MONTEVIDEO',
            nombreVendedor: 'Sofía Méndez',
            productos: [
                {
                    id: 'p5',
                    nombreProducto: 'Pagoda 5x5',
                    familiaProducto: 'Pagodas Blink',
                    cantidad: 2,
                    precioUnitarioSinIva: 4500,
                    precioTotalSinIva: 9000,
                    descuentoPorcentaje: 5,
                    descuentoMonto: 450,
                    precioFinalSinIva: 8550,
                    detalleComponentes: 'Estructura de aluminio y lona'
                },
                {
                    id: 'p5b',
                    nombreProducto: 'Sillas Acolchadas',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 30,
                    precioUnitarioSinIva: 150,
                    precioTotalSinIva: 4500,
                    descuentoPorcentaje: 10,
                    descuentoMonto: 450,
                    precioFinalSinIva: 4050,
                    detalleComponentes: 'Tela negra + patas reforzadas'
                }
            ],
            requiereTerciarizados: 'NO',
            terciarizados: [],
            notasAdministrativas: '',
            carpa: 'SI',
            notasDeposito: '',
            notasCampo: '',
            tipoSuperficie: 'PASTO'
        },
        {
            id: 6,
            fechaEvento: '2025-09-16',
            marca: 'Blink',
            nombreCliente: 'Cliente F',
            nombreContactoPrincipal: 'Lucía Fernández',
            telefonoContactoPrincipal: '098222333',
            tipoEvento: 'FIESTAS',
            ubicacionEvento: '-34.7891, -56.1921',
            departamentoEvento: 'CANELONES',
            nombreVendedor: 'Andrés Gómez',
            productos: [
                {
                    id: 'p6',
                    nombreProducto: 'Carpa Premium',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 1,
                    precioUnitarioSinIva: 5500,
                    precioTotalSinIva: 5500,
                    descuentoPorcentaje: 0,
                    descuentoMonto: 0,
                    precioFinalSinIva: 5500,
                    detalleComponentes: 'Incluye estructura y lona blanca'
                }
            ],
            requiereTerciarizados: 'SI',
            terciarizados: [
                {
                    nombreServicio: 'Catering',
                    proveedor: 'Delicias SA',
                    costo: 12000
                }
            ],
            notasAdministrativas: '',
            carpa: 'SI',
            notasDeposito: '',
            notasCampo: '',
            tipoSuperficie: 'SUPERFICIE_DURA'
        },
        {
            id: 7,
            fechaEvento: '2025-09-17',
            marca: 'Blink',
            nombreCliente: 'Cliente G',
            nombreContactoPrincipal: 'Marco Díaz',
            telefonoContactoPrincipal: '097555666',
            tipoEvento: 'CUMPLEAÑOS',
            ubicacionEvento: '-34.8222, -56.1313',
            departamentoEvento: 'MONTEVIDEO',
            nombreVendedor: 'Camila Techera',
            productos: [
                {
                    id: 'p7',
                    nombreProducto: 'Pagoda 4x4',
                    familiaProducto: 'Pagodas Blink',
                    cantidad: 1,
                    precioUnitarioSinIva: 4000,
                    precioTotalSinIva: 4000,
                    descuentoPorcentaje: 0,
                    descuentoMonto: 0,
                    precioFinalSinIva: 4000,
                    detalleComponentes: 'Modelo compacto'
                },
                {
                    id: 'p7b',
                    nombreProducto: 'Mesas y Sillas',
                    familiaProducto: 'Estructural 8m',
                    cantidad: 5,
                    precioUnitarioSinIva: 1000,
                    precioTotalSinIva: 5000,
                    descuentoPorcentaje: 5,
                    descuentoMonto: 250,
                    precioFinalSinIva: 4750,
                    detalleComponentes: 'Combo mobiliario'
                }
            ],
            requiereTerciarizados: 'NO',
            terciarizados: [],
            notasAdministrativas: '',
            carpa: 'NO',
            notasDeposito: '',
            notasCampo: '',
            tipoSuperficie: 'PASTO'
        }
    ]);

    const [data, setData] = useState([]);

    const [filtros, setFiltros] = useState({
        empresa: 'Grupo Planeta',
        familiaProducto: []
    });

    const familiaOptions = [
        { value: 'Estructural 8m', label: 'Estructural 8m' },
        { value: 'Poligonal 15m', label: 'Poligonal 15m' },
        { value: 'Pagodas Blink', label: 'Pagodas Blink' },
        { value: 'Caño Galvanizado', label: 'Caño Galvanizado' }
    ];

    const [filtroAplicado, setFiltroAplicado] = useState(false);

    const [fechaAplicada, setFechaAplicada] = useState(null);

    const formatLocalDate = (date) => {
        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return offsetDate.toISOString().split('T')[0];
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    // ---- Helpers de fechas ----
    const isRangeComplete = (d) => Array.isArray(d) && d?.[0] && d?.[1];

    const [dates, setDates] = useState(null);

    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    const aplicarFiltros = () => {
        const familiasSeleccionadas = filtros.familiaProducto;
        const [startDate, endDate] = dates || [null, null];

        // Claves de comparación en local (YYYY-MM-DD)
        const startKey = startDate ? formatLocalDate(startDate) : null;
        const endKey = endDate ? formatLocalDate(endDate) : null;

        const filtrado = eventosOriginal
            .map((evento) => {
                // Empresa
                const coincideEmpresa = filtros.empresa
                    ? filtros.empresa === 'Grupo Planeta'
                        ? ['inside group', 'blink'].includes((evento.marca || '').toLowerCase())
                        : (evento.marca || '').toLowerCase() === (filtros.empresa || '').toLowerCase()
                    : true;

                // ¡No parsees fechaEvento! ya es 'YYYY-MM-DD'
                const eventoKey = evento.fechaEvento;

                // Rango inclusivo
                const coincideFecha = startKey && endKey ? eventoKey >= startKey && eventoKey <= endKey : true;

                if (!coincideEmpresa || !coincideFecha) return null;

                const productosFiltrados =
                    familiasSeleccionadas.length > 0 ? (evento.productos || []).filter((p) => familiasSeleccionadas.includes(p.familiaProducto)) : evento.productos || [];

                if (productosFiltrados.length === 0) return null;

                return { ...evento, productos: productosFiltrados };
            })
            .filter(Boolean);

        setData(filtrado);

        const hasEmpresa = filtros.empresa && filtros.empresa !== 'Grupo Planeta';
        const hasFamilias = (filtros.familiaProducto?.length || 0) > 0;
        const hasDates = Array.isArray(dates) && dates?.[0] && dates?.[1];
        setFiltroAplicado(hasEmpresa || hasFamilias || hasDates);

        // Mostrar el rango aplicado (en local)
        if (startDate && endDate) {
            setFechaAplicada(`${formatLocalDate(startDate)} - ${formatLocalDate(endDate)}`);
        } else {
            setFechaAplicada(null);
        }
    };

    // Aplicar filtros automáticamente al cambiar cualquier input
    useEffect(() => {
        const hasEmpresa = filtros.empresa && filtros.empresa !== 'Grupo Planeta';
        const hasFamilias = (filtros.familiaProducto?.length || 0) > 0;
        const hasDates = isRangeComplete(dates);

        if (!hasEmpresa && !hasFamilias && !hasDates) {
            setData(eventosOriginal);
            setFiltroAplicado(false);
            setFechaAplicada(null);
            return;
        }

        aplicarFiltros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtros, dates]);

    const clearFiltersButton = () => (
        <Button
            size="sm"
            variant="light"
            style={{ backgroundColor: 'transparent', color: 'white', border: 'none', width: '60px' }}
            onClick={limpiarFiltros}
            title="Limpiar filtros"
        >
            <div>
                <RxReset size={22} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Limpiar</div>
        </Button>
    );

    useEffect(() => {
        setData(eventosOriginal); // carga inicial
    }, [eventosOriginal]);

    useEffect(() => {
        const hasEmpresa = filtros.empresa && filtros.empresa !== 'Grupo Planeta';
        const hasFamilias = (filtros.familiaProducto?.length || 0) > 0;
        const hasDates = isRangeComplete(dates);

        // Sin criterios => limpia
        if (!hasEmpresa && !hasFamilias && !hasDates) {
            setData(eventosOriginal);
            setFiltroAplicado(false);
            setFechaAplicada(null);
            return;
        }

        // Con criterios => aplica
        aplicarFiltros();
    }, [filtros, dates]); // eslint-disable-line react-hooks/exhaustive-deps

    const limpiarFiltros = () => {
        setFiltros({
            empresa: 'Grupo Planeta',
            familiaProducto: []
        });
        setDates(null);
        setData(eventosOriginal);
        setFiltroAplicado(false);
        setFechaAplicada(null);
    };

    const visibleColumns = ['id', 'fechaEvento', 'marca', 'nombreCliente', 'nombreVendedor', 'productos', 'precioNetoSinIva', 'saldoPendiente', 'departamentoEvento'];

    const chartsButton = () => {
        return (
            <Button
                size="sm"
                variant="light"
                //className="small-btn m-1"
                onClick={handleShow}
                style={{ backgroundColor: 'transparent', color: 'white', border: 'none', width: '60px' }}
            >
                <div>
                    <IoStatsChartSharp
                        style={{ marginRight: '5px' }}
                        size={22}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Graficas</div>
            </Button>
        );
    };

    const advancedFilterToggle = () => (
        <Button
            size="sm"
            variant="light"
            style={{ backgroundColor: 'transparent', color: 'white', border: 'none', width: '60px' }}
            onClick={() => {
                if (filtroAplicado) {
                    limpiarFiltros();
                    setFiltroAplicado(false);
                } else {
                    aplicarFiltros();
                    setFiltroAplicado(true);
                }
            }}
        >
            <div>
                {filtroAplicado ? (
                    <RxReset
                        // color="red"
                        size={22}
                    />
                ) : (
                    <FaFilter size={22} />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{!filtroAplicado ? 'Filtrar' : 'Remover'}</div>
        </Button>
    );

    const advancedFilter = () => {
        return (
            <Form style={{ fontSize: isSmallDevice ? '12px' : '15px', padding: '15px', backgroundColor: '#696969', minWidth: '80%' }}>
                <Row className="align-items-end g-3">
                    <Col md={3}>
                        <Form.Group style={{ display: 'flex', flexDirection: 'column' }}>
                            <Form.Label style={{ color: 'white' }}>Fecha Evento</Form.Label>
                            {/* <DateRangePicker
                                className="react-daterange-picker"
                                onChange={setDateRange}
                                value={dateRange}
                                locale="es-ES"
                                format="dd/MM/yyyy"
                                clearIcon={null}
                            /> */}
                            <DateRangePicker
                            placeholder=""
                                className="react-daterange-picker"
                                onChange={setDates}
                                value={dates}              // null o [Date, Date]
                                locale="es-ES"
                                format="dd/MM/yyyy"
                                clearIcon={null}
                                calendarIcon={null}
                                // dayPlaceholder=""
                                // monthPlaceholder=""
                                // yearPlaceholder=""
                                // rangeDivider="–"               // sin espacios: dd/mm/aa–dd/mm/aa
                                // calendarIcon={true}
                            />
                            
                            {/* <Calendar
                                placeholder="--/--/----  -  --/--/----"
                                className="pr-range-date-picker"
                                value={dates}
                                onChange={(e) => setDates(e.value)}
                                selectionMode="range"
                                readOnlyInput
                                hideOnRangeSelection
                                locale="es"
                                dateFormat="dd/mm/yy"
                            /> */}
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Empresa</Form.Label>
                            <Form.Select
                                name="empresa"
                                value={filtros.empresa}
                                onChange={handleChange}
                            >
                                <option value="Grupo Planeta">Grupo Planeta</option>
                                <option value="Blink">Blink</option>
                                <option value="Inside Group">Inside Group</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Familia Producto</Form.Label>
                            <MultiSelect
                                value={filtros.familiaProducto}
                                options={familiaOptions}
                                optionLabel="label"
                                optionValue="value"
                                onChange={(e) => setFiltros((prev) => ({ ...prev, familiaProducto: e.value || [] }))}
                                display="chip" // chips visibles
                                filter // input de búsqueda
                                filterPlaceholder="Buscar..."
                                placeholder="N/A"
                                showClear
                                appendTo={document.body} // evita problemas de overlay/z-index
                                maxSelectedLabels={1} // muestra “+N más” si hay muchos
                            />
                        </Form.Group>
                    </Col>
                    <Col
                        md="auto"
                        style={{ display: 'flex', gap: '8px', width: 'auto', flex: '0 0 auto' }}
                    >
                        {clearFiltersButton()}
                        {chartsButton()}
                    </Col>
                </Row>
            </Form>
        );
    };

    const PopoverTabsByFamilia = ({ productos }) => {
        const familias = useMemo(() => {
            return productos.reduce((acc, prod) => {
                const key = prod.familiaProducto || 'Sin Familia';
                if (!acc[key]) acc[key] = [];
                acc[key].push(prod);
                return acc;
            }, {});
        }, [productos]);

        const familiaKeys = Object.keys(familias);
        const [activeTab, setActiveTab] = useState(familiaKeys[0]);

        return (
            <Tabs
                activeKey={activeTab}
                onSelect={setActiveTab}
                className="m-2"
            >
                {familiaKeys.map((familia, idx) => (
                    <Tab
                        eventKey={familia}
                        title={idx + 1}
                        key={familia}
                        style={{ padding: '0px 0px 5px' }}
                    >
                        <Card>
                            <Card.Header style={{ backgroundColor: '#6c757d', color: 'white' }}>
                                <strong>{familia}</strong>
                            </Card.Header>
                            <Card.Body style={{ padding: '10px', backgroundColor: 'slategray' }}>
                                <ListGroup style={{ margin: '0' }}>
                                    {familias[familia].map((producto, i) => (
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            {' '}
                                            <div className="fw-bold">
                                                <strong>{producto.nombreProducto}</strong>
                                            </div>
                                            <Badge
                                                bg="secondary"
                                                pill
                                                style={{ minWidth: '50px', fontSize: 'smaller' }}
                                            >
                                                <strong>{producto.cantidad}</strong>
                                            </Badge>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
        );
    };

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="top"
                style={{ height: '100dvh' }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <IoStatsChartSharp
                            style={{ marginRight: '5px' }}
                            size={22}
                        />
                        Filtro Avanzado
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div style={{ display: 'flex', flexDirection: isSmallDevice ? 'column' : 'row', gap: '15px' }}>
                        <StackedBarChart />
                        <PieChartCustom
                            eventos={filtroAplicado ? data : []}
                            fecha={dates && dates[0] && dates[1] && `${formatDate(dates[0].toISOString().split('T')[0])} - ${formatDate(dates[1].toISOString().split('T')[0])}`}
                        />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <ModuleTable
                editableForm={EventosForm}
                data={data}
                columnKeys={visibleColumns}
                filename="eventos-data"
                customButtons={[advancedFilter]}
                headerWidth={285}
                renderPopoverContent={(productos) => <PopoverTabsByFamilia productos={productos} />}
            />
        </>
    );
};

export default EventosTable;
