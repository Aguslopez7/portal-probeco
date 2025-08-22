import { useState, useEffect } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';
import CuentasContablesDropdown from '@components//dropdowns/CuentasContablesDropdown';
import BancosGPDropdown from '@components/dropdowns/BancosGPDropdown';
import ProveedoresDropdown from '@components/dropdowns/ProveedoresDropdown';

import { agregarPago, editarPago } from '@services/pagoService';
import { getProveedorByName } from '@services/proveedorService';

const PagosForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});
    const [proveedorExistente, setProveedorExistente] = useState(null);

    const dtoName = 'DtoPago';
    const dtoNameRequest = 'DtoPagoRequest';

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    
    useEffect(() => {
        if (selectedItemData && isEditing) {
            verifyProveedorExistente();
        }
    }, [selectedItemData]);

    const verifyProveedorExistente = async () => {
        const proveedor = await getProveedorByName(selectedItemData.proveedor);
        proveedor ? setProveedorExistente(proveedor) : setProveedorExistente(null);
        ;
    }
    
    const getFieldOverrides = () => {
        const overrides = {};

        if (formData.existeProveedor === 'SI' || proveedorExistente) {
            overrides.proveedor = (formData, onChange) => (
                <ProveedoresDropdown
                    handleChange={onChange}
                    formData={formData}
                    required
                    isInvalid={!formData.proveedor}
                    isValidated={formData.proveedor}
                    setFormData={setFormData}
                />
            );
        }

        overrides.bancoEmisor = (formData, onChange) => (
            <BancosGPDropdown
                name="bancoEmisor"
                value={formData.bancoEmisor}
                handleChange={onChange}
                required={false}
            />
        );

        overrides.nombreCuentaContable = (formData, onChange) => (
            <CuentasContablesDropdown
                handleChange={onChange}
                formData={formData}
            />
        );

        return overrides;
    };

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            getFieldOverrides={getFieldOverrides()}
            editarEndpoint={editarPago}
            agregarEndpoint={agregarPago}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default PagosForm;
