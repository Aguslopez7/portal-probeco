import { useEffect, useState } from 'react';

import ModuleTable from '@components/table/ModuleTable';

import TarjetasForm from '@modules/tarjetas/TarjetasForm';

import useCanModifyData from '@hooks/useCanModifyData';

import { listarTarjetas, listarTarjetasByUsername, eliminarTarjeta } from '@services/tarjetaService';

const TarjetasTable = () => {
    const canModify = useCanModifyData();

    const [data, setData] = useState([]);

    const currentUsername = JSON.parse(localStorage.getItem('tokenPayload')).username;

    useEffect(() => {
        const fetchTablesData = async () => {
            const responseData = canModify ? await listarTarjetas() : await listarTarjetasByUsername(currentUsername);

            if (responseData) {
                const formattedData = responseData.map((item) => {
                    return {
                        ...item,
                        montoTotal: item.moneda === 'UYU' ? `$${item.montoTotal}` : `USD ${item.montoTotal}`
                    };
                });
                setData(formattedData);
            }
        };

        fetchTablesData();
    }, []);

    const columnKeys = data.length > 0 ? Object.keys(data[0]) : null;

    return (
        <ModuleTable
            editableForm={TarjetasForm}
            deleteEndpoint={eliminarTarjeta}
            data={data}
            columnKeys={columnKeys}
            filename="tarjetas-data"
        />
    );
};

export default TarjetasTable;
