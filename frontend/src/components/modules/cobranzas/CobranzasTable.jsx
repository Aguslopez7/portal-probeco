import { useEffect, useState } from 'react';

import ModuleTable from '@components/table/ModuleTable';

import CobranzasForm from '@modules/cobranzas/CobranzaForm';

import useCanModifyData from '@hooks/useCanModifyData';

import { eliminarCobranzaById, listarCobranzas, listarCobranzasByUsername } from '@services/cobranzaService';

const CobranzasTable = () => {
    const canModify = useCanModifyData();

    const [data, setData] = useState([]);

    const currentUsername = JSON.parse(localStorage.getItem('tokenPayload')).username;

    useEffect(() => {
        const fetchCobranzasData = async () => {
            const responseData = canModify ? await listarCobranzas() : await listarCobranzasByUsername(currentUsername);

            if (responseData) {
                const formattedData = responseData.map((item) => {
                    return {
                        ...item,
                        monto: item.moneda === 'UYU' ? `$${item.monto}` : `USD ${item.monto}`
                    };
                });

                setData(formattedData);
            }
        };

        fetchCobranzasData();
    }, []);

    const columnKeys = data.length > 0 ? Object.keys(data[0]) : null;

    return (
        <ModuleTable
            editableForm={CobranzasForm}
            deleteEndpoint={eliminarCobranzaById}
            data={data}
            columnKeys={columnKeys}
            filename="cobranzas-data"
        />
    );
};

export default CobranzasTable;
