import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

import EditableTable from './EditableTable';

export default function TerciarizadosTable({ show = false, onHide = true }) {
    const opcionesTerciarizados = [
        { label: 'Carpas Terciarizadas', value: 'Carpas Terciarizadas' },
        { label: 'Piso Terciarizado', value: 'Piso Terciarizado' },
        { label: 'Mobiliario Terciarizados', value: 'Mobiliario Terciarizados' },
        { label: 'Otros', value: 'Otros' }
    ];

    const [terciarizadosData, setTerciarizadosData] = useState([
        { id: 1, conceptoGastoTerciarizado: opcionesTerciarizados[0].value, importeSubcontratacion: 500, descripcion: 'Detalles carpas' },
        { id: 2, conceptoGastoTerciarizado: opcionesTerciarizados[1].value, importeSubcontratacion: 700, descripcion: 'Detalles piso' },
        { id: 3, conceptoGastoTerciarizado: opcionesTerciarizados[2].value, importeSubcontratacion: 900, descripcion: 'Detalles mobiliario' },
        { id: 4, conceptoGastoTerciarizado: opcionesTerciarizados[3].value, importeSubcontratacion: 300, descripcion: 'Detalles otros' }
    ]);

    const dropdownEditor = (options, requiredClass) => (
        <Dropdown
            filter
            value={options.value}
            options={opcionesTerciarizados}
            onChange={(e) => options.editorCallback(e.value)}
            placeholder="Seleccionar"
            style={{ width: '100%' }}
            className={requiredClass(options.rowData, options.field)}
        />
    );

    const columns = [
        {
            field: 'conceptoGastoTerciarizado',
            header: 'Concepto',
            editor: dropdownEditor
        },
        {
            field: 'descripcion',
            header: 'Descripción',
            editor: (options) => (
                <InputText
                    value={options.value}
                    onChange={(e) => options.editorCallback(e.target.value)}
                    placeholder="ingresar"
                />
            )
        },
        {
            field: 'importeSubcontratacion',
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
                    className={requiredClass(options.rowData, 'importeSubcontratacion')}
                    placeholder="ingresar"
                />
            ),
            body: (row) =>
                (row.importeSubcontratacion || 0).toLocaleString('es-UY', {
                    style: 'currency',
                    currency: 'UYU',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })
        }
    ];

    const requiredFields = ['conceptoGastoTerciarizado', 'importeSubcontratacion'];

    const newRowTemplate = () => ({
        id: Date.now(),
        conceptoGastoTerciarizado: '',
        descripcion: '',
        importeSubcontratacion: null
    });

    return (
        <EditableTable
            show={show}
            onHide={onHide}
            title="Terciarizados"
            data={terciarizadosData}
            setData={setTerciarizadosData}
            columns={columns}
            requiredFields={requiredFields}
            newRowTemplate={newRowTemplate}
            sumColumn="importeSubcontratacion"
        />
    );
}