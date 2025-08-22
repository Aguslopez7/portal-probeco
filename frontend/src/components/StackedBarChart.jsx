import React, { useMemo, useState } from 'react';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Chart } from 'react-charts';

import useResponsive from '../hooks/useResponsive';

import { FaInfoCircle } from 'react-icons/fa';

export default function BarStacked() {
    const { isSmallDevice } = useResponsive();

    const allData = [
        {
            label: 'Blink',
            data: [
                { primary: '01/07', secondary: 3 },
                { primary: '02/07', secondary: 5 },
                { primary: '03/07', secondary: 2 },
                { primary: '04/07', secondary: 4 },
                { primary: '05/07', secondary: 1 },
                { primary: '06/07', secondary: 6 },
                { primary: '07/07', secondary: 3 },
                { primary: '08/07', secondary: 4 },
                { primary: '09/07', secondary: 2 },
                { primary: '10/07', secondary: 5 },
                { primary: '11/07', secondary: 3 },
                { primary: '12/07', secondary: 2 }
            ]
        },
        {
            label: 'Inside Group',
            data: [
                { primary: '01/07', secondary: 2 },
                { primary: '02/07', secondary: 3 },
                { primary: '03/07', secondary: 4 },
                { primary: '04/07', secondary: 2 },
                { primary: '05/07', secondary: 5 },
                { primary: '06/07', secondary: 1 },
                { primary: '07/07', secondary: 3 },
                { primary: '08/07', secondary: 5 },
                { primary: '09/07', secondary: 2 },
                { primary: '10/07', secondary: 3 },
                { primary: '11/07', secondary: 4 },
                { primary: '12/07', secondary: 1 }
            ]
        }
    ];

    // 📅 Estado del rango
    const [dateRange, setDateRange] = useState([
        new Date(2025, 6, 1), // 01/07
        new Date(2025, 6, 12) // 12/07
    ]);

    // 🔍 Función para convertir 'dd/MM' a Date
    const parseDate = (str) => {
        const [day, month] = str.split('/').map(Number);
        return new Date(2025, month - 1, day);
    };

    // 🔎 Filtrar los datos según rango
    const filteredData = useMemo(() => {
        return allData.map((dataset) => ({
            ...dataset,
            data: dataset.data.filter(({ primary }) => {
                const date = parseDate(primary);
                return date >= dateRange[0] && date <= dateRange[1];
            })
        }));
    }, [dateRange]);

    const totals = filteredData.map((dataset) => dataset.data.reduce((acc, d) => acc + d.secondary, 0));

    const totalGeneral = totals.reduce((acc, val) => acc + val, 0);

    const colors = ['#229954', '#2a2a2a'];

    const primaryAxis = useMemo(
        () => ({
            getValue: (datum) => datum.primary
        }),
        []
    );

    const secondaryAxes = useMemo(
        () => [
            {
                getValue: (datum) => datum.secondary,
                stacked: true
            }
        ],
        []
    );

    const hasData = filteredData.some((dataset) => dataset.data.length > 0);

    return (
        <div style={{ width: '100%', backgroundColor: 'white', border: '1px solid gray', borderRadius: '8px', padding: '1rem', maxHeight:'450px' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h6 className='mb-3'>
                    <strong>Cantidad de eventos</strong> ({filteredData[0].data.length} días)
                </h6>
                <DateRangePicker
                    className="react-daterange-picker"
                    onChange={setDateRange}
                    value={dateRange}
                    locale="es-ES"
                    format="dd/MM/yyyy"
                    clearIcon={null}
                />
            </div>
            
            <div style={{ height: isSmallDevice ? '230px' : '265px' }}>
                {hasData ? (
                    <Chart
                        options={{
                            data: filteredData,
                            primaryAxis,
                            secondaryAxes,
                            defaultColors: colors,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: '#888'
                        }}
                    >
                        <em>No hay datos en el rango seleccionado.</em>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', fontSize: isSmallDevice && '0.9rem' }}>
                {filteredData.map((dataset, index) => (
                    <div
                        key={dataset.label}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: colors[index],
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}
                        />
                        <strong>{dataset.label}:</strong>
                        <span>{totals[index]}</span>
                    </div>
                ))}
                <div style={{ marginLeft: 'auto' }}>
                    <FaInfoCircle className="icon-margin" /> <strong>Total:</strong> {totalGeneral}
                </div>
            </div>
        </div>
    );
}
