import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import ModuleTable from '@components/table/ModuleTable';

import PagosForm from '@modules/pagos/PagosForm';

import useCanModifyData from '@hooks/useCanModifyData';

import { listarPagos, listarPagosByUsername, eliminarPagoById } from '@services/pagoService';

const PagosTable = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const canModify = useCanModifyData();

    const [data, setData] = useState([]);

    const currentUsername = JSON.parse(localStorage.getItem('tokenPayload')).username;

    useEffect(() => {
        const fetchPagosData = async () => {
            const responseData = canModify ? await listarPagos() : await listarPagosByUsername(currentUsername);

            if (responseData) {
                const formattedData = responseData.map((item) => {
                    return {
                        ...item,
                        monto: item.moneda === 'UYU' ? `$${item.monto}` : `USD ${item.monto}`,
                        factura: item.factura || 'No Aplica'
                    };
                });
                setData(formattedData);
            }
        };

        fetchPagosData();
    }, []);

    const MobileFilteredColumns = ['ordenanteDelPago', 'fechaSolicitudPago', 'conceptoPago', 'monto', 'estadoPago', 'comprobantePago'];

    const columnKeys = data.length > 0 ? Object.keys(data[0]) : null;

    const filteredColumnKeys = isMobile ? MobileFilteredColumns : columnKeys;

    return (
        <ModuleTable
            editableForm={PagosForm}
            deleteEndpoint={eliminarPagoById}
            data={data}
            columnKeys={filteredColumnKeys}
            filename="pagos-data"
        />
    );
};

export default PagosTable;
