import React, { useEffect, useState } from 'react';

import { getProveedorByName, listarProveedores } from '@services/proveedorService';

import SearchableDropdown from './SearchableDropdown';

const ProveedoresDropdown = ({ handleChange, setFormData, formData, required = false, isInvalid = false, isValidated = false }) => {
    const [proveedoresData, setProveedoresData] = useState([]);

    useEffect(() => {
        fetchProveedores();
    }, []);

    const handleExistingProveedor = (proveedor) => {
        if (proveedor) {
            setFormData((prev) => ({
                ...prev,
                bancoProveedor: proveedor.banco,
                numeroCuenta: proveedor.numeroCuenta,
                sucursal: proveedor.sucursal
            }));
        }
    };

    const fetchProveedores = async () => {
        try {
            const proveedores = await listarProveedores();
            setProveedoresData(proveedores);
        } catch (err) {
            console.error('Error fetching proveedores:', err);
        }
    };

    const onChange = async (e) => {
        const { value } = e.target;
        if (value) {
            const proveedor = await getProveedorByName(value);
            if (proveedor) {
                handleExistingProveedor(proveedor);
                handleChange(e); // prop
            }
        } else {
            handleExistingProveedor(null);
        }
    };

    return (
        <div className="mb-3">
            <SearchableDropdown
                dropdownData={proveedoresData}
                handleChange={onChange}
                label="Proveedor"
                name="proveedor"
                value={formData.proveedor}
                placeholder="Seleccione un Proveedor"
                required={required}
                isInvalid={isInvalid}
                isValidated={isValidated}
            />
        </div>
    );
};

export default ProveedoresDropdown;
