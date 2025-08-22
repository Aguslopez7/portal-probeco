import React, { useEffect, useState } from 'react';

import axiosInstance from '@utils/axiosConfig';

import SearchableDropdown from './SearchableDropdown';

const CuentasContablesDropdown = ({ handleChange, formData }) => {
    const [cuentasContablesData, setCuentasContablesData] = useState([]);

    useEffect(() => {
        fetchCuentasContables();
    }, []);

    const fetchCuentasContables = async () => {
        try {
            const response = await axiosInstance.get('/cuentas-contables');
            setCuentasContablesData(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="mb-3">
            <SearchableDropdown
                dropdownData={cuentasContablesData}
                dataValue={'nombre'}
                dataLabel={'nombre'}
                handleChange={handleChange}
                label="Cuenta Contable"
                name="nombreCuentaContable"
                value={formData.nombreCuentaContable}
                placeholder="Seleccione una cuenta contable"
            />
        </div>
    );
};

export default CuentasContablesDropdown;
