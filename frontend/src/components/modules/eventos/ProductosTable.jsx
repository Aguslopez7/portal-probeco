// ProductosTable.jsx
import { useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

import EditableTable from './EditableTable';

export default function ProductosTable({ show = false, onHide = () => {} }) {
    const productosLabels = [
        { label: 'Carpa Estructural 8x3 Transparente', value: 'Carpa Estructural 8x3 Transparente' },
        { label: 'Carpa Estructural 8x3 Blanca', value: 'Carpa Estructural 8x3 Blanca' }
    ];

    const [productos, setProductos] = useState([
        {
            id: 1,
            nombre: 'Carpa Estructural 8x3 Transparente',
            cantidad: 1,
            precioUnitarioSinIva: 15000,
            precioTotalSinIva: 15000,
            descuentoMonto: 0,
            descuentoPorcentaje: 0,
            precioFinalSinIva: 15000,
            detalleComponentesOpcionales: [
                { id: 'c1', nombre: 'Lateral Transparente', cantidad: 2, stock: 10 },
                { id: 'c2', nombre: 'Fondo Transparente', cantidad: 1, stock: 5 }
            ]
        },
        {
            id: 2,
            nombre: 'Carpa Estructural 8x3 Blanca',
            cantidad: 2,
            precioUnitarioSinIva: 12000,
            precioTotalSinIva: 24000,
            descuentoMonto: 1000,
            descuentoPorcentaje: 4.17,
            precioFinalSinIva: 23000,
            detalleComponentesOpcionales: [
                { id: 'c3', nombre: 'Lateral Blanco', cantidad: 2, stock: 8 },
                { id: 'c4', nombre: 'Fondo Blanco', cantidad: 1, stock: 6 }
            ]
        }
    ]);

    const [productoActual, setProductoActual] = useState(null);
    const [showOpcionalesDialog, setShowOpcionalesDialog] = useState(false);
    const productosRevisados = useRef(new Set());
    const [editingComponentes, setEditingComponentes] = useState({});
    // ✅ Nuevo estado para forzar re-render de los campos de edición
    const [editingData, setEditingData] = useState({});

    const verOpcionales = (producto) => {
        setProductoActual(producto);
        setShowOpcionalesDialog(true);
        productosRevisados.current.add(producto.id);
    };

    const handlePostRowEdit = (producto) => {
        if (producto?.detalleComponentesOpcionales?.length > 0 && !productosRevisados.current.has(producto.id)) {
            verOpcionales(producto);
        }
    };

    const onRowEditCompleteComponente = (e) => {
        const { newData, index } = e;
        const nuevaCantidad = parseInt(newData.cantidad) || 0;

        if (!productoActual) return;

        const nuevosProductos = productos.map((prod) =>
            prod.id === productoActual.id
                ? {
                      ...prod,
                      detalleComponentesOpcionales: prod.detalleComponentesOpcionales.map((comp, i) => (i === index ? { ...comp, cantidad: nuevaCantidad } : comp))
                  }
                : prod
        );

        setProductos(nuevosProductos);
        const actualizado = nuevosProductos.find((p) => p.id === productoActual.id);
        setProductoActual(actualizado);

        setEditingComponentes((prev) => ({ ...prev, [productoActual.id]: {} }));
    };

    // ✅ Función mejorada para cálculo en tiempo real con actualización bidireccional
    const applyLiveCalculation = (field, rowData, value, triggerField = field) => {
        const updatedRow = { ...rowData, [field]: value || 0 };
        const recalculated = calcularPrecios(updatedRow, triggerField);

        // ✅ Actualizar el estado principal
        setProductos((prev) => prev.map((r) => (r.id === rowData.id ? recalculated : r)));

        // ✅ Actualizar los datos de edición para forzar re-render
        setEditingData((prev) => ({
            ...prev,
            [rowData.id]: recalculated
        }));

        // ✅ Actualizar directamente rowData para los campos visibles
        Object.keys(recalculated).forEach((key) => {
            if (rowData.hasOwnProperty(key)) {
                rowData[key] = recalculated[key];
            }
        });

        // ✅ Forzar actualización después de un pequeño delay para asegurar el re-render
        setTimeout(() => {
            setEditingData((prev) => {
                const updated = { ...prev };
                delete updated[rowData.id];
                return updated;
            });
        }, 50);
    };

    const dropdownEditor = (options, requiredClass) => (
        <Dropdown
            filter
            value={options.rowData[options.field]}
            options={productosLabels}
            onChange={(e) => options.editorCallback(e.value)}
            placeholder="Seleccionar"
            style={{ width: '100%' }}
            className={requiredClass(options.rowData, options.field)}
        />
    );

    const currencyEditor = (options, requiredClass) => {
        // ✅ Usar datos de edición si están disponibles
        const currentValue = editingData[options.rowData.id]?.[options.field] ?? options.rowData[options.field];

        return (
            <InputNumber
                value={currentValue}
                onValueChange={(e) => {
                    options.editorCallback(e.value);
                    applyLiveCalculation(options.field, options.rowData, e.value, options.field);
                }}
                mode="currency"
                currency="UYU"
                locale="es-UY"
                minFractionDigits={0}
                maxFractionDigits={0}
                className={requiredClass(options.rowData, options.field)}
                placeholder="Ingresar"
            />
        );
    };

    const cantidadProductosEditor = (options, requiredClass) => {
        const validationClass = typeof requiredClass === 'function' ? requiredClass(options.rowData, options.field) : '';
        return (
            <InputNumber
                placeholder="Ingresar"
                required
                className={`cantidad-input ${validationClass}`}
                mode="decimal"
                showButtons
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                value={options.rowData[options.field]}
                onValueChange={(e) => {
                    options.editorCallback(e.value);
                    applyLiveCalculation(options.field, options.rowData, e.value);
                }}
                min={1}
            />
        );
    };

    const cantidadComponentesEditor = (options, requiredClass) => {
        const validationClass = typeof requiredClass === 'function' ? requiredClass(options.rowData, options.field) : '';
        return (
            <InputNumber
                placeholder="Ingresar"
                required
                className={`cantidad-input ${validationClass}`}
                mode="decimal"
                showButtons
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                value={options.rowData[options.field]}
                onValueChange={(e) => {
                    options.editorCallback(e.value);
                    applyLiveCalculation(options.field, options.rowData, e.value);
                }}
                min={0}
            />
        );
    };

    const percentageEditor = (options, requiredClass) => {
        // ✅ Usar datos de edición si están disponibles
        const currentValue = editingData[options.rowData.id]?.[options.field] ?? options.rowData[options.field];

        return (
            <InputNumber
                value={currentValue}
                onValueChange={(e) => {
                    options.editorCallback(e.value);
                    applyLiveCalculation(options.field, options.rowData, e.value, options.field);
                }}
                suffix="%"
                min={0}
                max={100}
                className={requiredClass(options.rowData, options.field)}
                placeholder="Ingresar"
                maxFractionDigits={2}
            />
        );
    };

    const currencyBody = (row, column) => (row[column.field] || 0).toLocaleString('es-UY', { style: 'currency', currency: 'UYU',minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const percentageBodyTemplate = (rowData, column) => `${(rowData[column.field] || 0).toFixed(2)} %`;

    const columns = [
        { field: 'nombre', header: 'Nombre Producto', editor: dropdownEditor },
        { field: 'cantidad', header: 'Cantidad', editor: cantidadProductosEditor },
        { field: 'precioUnitarioSinIva', header: 'Precio Unitario', editor: currencyEditor, body: currencyBody },
        { field: 'precioTotalSinIva', header: 'Precio Total', body: currencyBody },
        { field: 'descuentoMonto', header: 'Descuento (UYU)', editor: currencyEditor, body: currencyBody },
        { field: 'descuentoPorcentaje', header: 'Descuento (%)', editor: percentageEditor, body: percentageBodyTemplate },
        { field: 'precioFinalSinIva', header: 'Precio Final', body: currencyBody },
        {
            field: 'opcionales',
            header: 'Componentes Opcionales',
            body: (rowData) => (
                <Button
                    label="Opcionales"
                    icon="pi pi-list"
                    size="small"
                    className="p-button-sm p-button-secondary"
                    onClick={() => verOpcionales(rowData)}
                />
            )
        }
    ];

    const requiredFields = ['nombre', 'cantidad', 'precioUnitarioSinIva'];

    const newRowTemplate = () => ({
        id: Date.now(),
        nombre: '',
        cantidad: 1,
        precioUnitarioSinIva: null,
        precioTotalSinIva: null,
        descuentoMonto: 0,
        descuentoPorcentaje: 0,
        precioFinalSinIva: null,
        detalleComponentesOpcionales: [
            { id: 'c-test-1', nombre: 'Test Lateral', cantidad: 1, stock: 10 },
            { id: 'c-test-2', nombre: 'Test Fondo', cantidad: 2, stock: 5 }
        ]
    });

    // ✅ Función mejorada de cálculo con identificación del campo que disparó el cambio
    const calcularPrecios = (row, triggerField = null) => {
        const { cantidad = 0, precioUnitarioSinIva = 0 } = row;

        const precioTotal = cantidad * precioUnitarioSinIva;

        let descuentoMonto = parseFloat(row.descuentoMonto) || 0;
        let descuentoPorcentaje = parseFloat(row.descuentoPorcentaje) || 0;

        // ✅ Lógica mejorada para actualización bidireccional
        if (triggerField === 'descuentoMonto') {
            // Si se modificó el monto, recalcular el porcentaje
            descuentoPorcentaje = precioTotal > 0 ? (descuentoMonto / precioTotal) * 100 : 0;
        } else if (triggerField === 'descuentoPorcentaje') {
            // Si se modificó el porcentaje, recalcular el monto
            descuentoMonto = (precioTotal * descuentoPorcentaje) / 100;
        } else if (triggerField === 'cantidad' || triggerField === 'precioUnitarioSinIva') {
            // Si se modificó cantidad o precio unitario, mantener coherencia
            if (descuentoPorcentaje > 0) {
                descuentoMonto = (precioTotal * descuentoPorcentaje) / 100;
            } else if (descuentoMonto > 0) {
                descuentoPorcentaje = precioTotal > 0 ? (descuentoMonto / precioTotal) * 100 : 0;
            }
        }

        // ✅ Validar que el descuento no sea mayor al precio total
        if (descuentoMonto > precioTotal) {
            descuentoMonto = precioTotal;
            descuentoPorcentaje = 100;
        }

        const precioFinal = Math.max(0, precioTotal - descuentoMonto);

        console.log('[calcularPrecios] Trigger:', triggerField);
        console.log('[calcularPrecios] Input:', row);
        console.log('[calcularPrecios] Total:', precioTotal, 'Descuento:', descuentoMonto, '%:', descuentoPorcentaje.toFixed(2), 'Final:', precioFinal);

        return {
            ...row,
            precioTotalSinIva: precioTotal,
            precioFinalSinIva: precioFinal,
            descuentoMonto: Math.round(descuentoMonto * 100) / 100, // Redondear a 2 decimales
            descuentoPorcentaje: Math.round(descuentoPorcentaje * 100) / 100 // Redondear a 2 decimales
        };
    };

    return (
        <>
            <EditableTable
                show={show}
                onHide={onHide}
                title="Productos Evento"
                data={productos}
                setData={setProductos}
                columns={columns}
                requiredFields={requiredFields}
                newRowTemplate={newRowTemplate}
                sumColumn="precioFinalSinIva"
                initialInfoMessage="Los campos Precio Total, Precio Final y Descuentos se recalculan automáticamente durante la edición."
                expandable={false}
                onRowEditComplete={handlePostRowEdit}
            />

            <Dialog
                header={`Componentes Opcionales de "${productoActual?.nombre || ''}"`}
                visible={showOpcionalesDialog}
                style={{ width: '60vw' }}
                onHide={() => setShowOpcionalesDialog(false)}
            >
                {productoActual?.detalleComponentesOpcionales?.length > 0 ? (
                    <DataTable
                        value={productoActual.detalleComponentesOpcionales}
                        dataKey="id"
                        size="small"
                        editMode="row"
                        editingRows={editingComponentes[productoActual.id] || {}}
                        onRowEditChange={(e) =>
                            setEditingComponentes((prev) => ({
                                ...prev,
                                [productoActual.id]: e.data
                            }))
                        }
                        onRowEditComplete={onRowEditCompleteComponente}
                    >
                        <Column rowEditor headerStyle={{ width: '3rem' }} />
                        <Column field="id" header="Id" hidden />
                        <Column field="nombre" header="Nombre" />
                        <Column field="cantidad" header="Cantidad" editor={cantidadComponentesEditor} />
                        <Column field="stock" header="Stock" />
                    </DataTable>
                ) : (
                    <p>No hay componentes opcionales.</p>
                )}
            </Dialog>
        </>
    );
}
