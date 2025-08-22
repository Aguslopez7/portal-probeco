import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

import EditableTable from './EditableTable';

export default function ComisionesTable({ show = false, onHide = true }) {
    // 🔹 Opciones para el dropdown
    const conceptosOptions = [
        { label: 'Comisión Salon', value: 'Comisión Salon' },
        { label: 'Comision Organizador', value: 'Comision Organizador' },
        { label: 'Otra Comision', value: 'Otra Comision' }
    ];

    // ✅ Inicialización usando las opciones del dropdown
    const [comisionesData, setComisionesData] = useState([
        { id: 1, conceptoComision: conceptosOptions[0].value, montoComision: 500 },
        { id: 2, conceptoComision: conceptosOptions[1].value, montoComision: 700 },
        { id: 3, conceptoComision: conceptosOptions[2].value, montoComision: 300 }
    ]);

    const columns = [
        {
            field: 'conceptoComision',
            header: 'Concepto',
            editor: (options, requiredClass) => (
                <Dropdown
                    value={options.value}
                    options={conceptosOptions}
                    onChange={(e) => options.editorCallback(e.value)}
                    placeholder="Seleccionar"
                    className={requiredClass(options.rowData, 'conceptoComision')}
                />
            ),
            body: (row) => row.conceptoComision || '—'
        },
        {
            field: 'montoComision',
            header: 'Importe',
            editor: (options, requiredClass) => (
                <InputNumber
                    value={options.value}
                    onValueChange={(e) => options.editorCallback(e.value)}
                    mode="currency"
                    currency="UYU"
                    locale="es-UY"
                    minimumFractionDigits={0}
                    maximumFractionDigits={0}
                    placeholder='Ingresar'
                    className={requiredClass(options.rowData, 'montoComision')}
                />
            ),
            body: (row) =>
                (row.montoComision || 0).toLocaleString('es-UY', {
                    style: 'currency',
                    currency: 'UYU',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })
        }
    ];

    const requiredFields = ['conceptoComision', 'montoComision'];

    const newRowTemplate = () => ({
        id: Date.now(),
        conceptoComision: '',
        montoComision: null
    });

    return (
        <EditableTable
            show={show}
            onHide={onHide}
            title="Comisiones"
            data={comisionesData}
            setData={setComisionesData}
            columns={columns}
            requiredFields={requiredFields}
            newRowTemplate={newRowTemplate}
            sumColumn="montoComision"
        />
    );
}