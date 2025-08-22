import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';
import CuentasContablesDropdown from '@components/dropdowns/CuentasContablesDropdown';
import PropietariosTarjetasDropdown from '@components/dropdowns/PropietariosTarjetasDropdown';

import useCanModifyData from '@hooks/useCanModifyData';

import { agregarTarjeta, editarTarjeta } from '@services/tarjetaService';

const TarjetasForm = ({ selectedItemData = {}, isEditing = false }) => {
    const canModify = useCanModifyData();

    const [formData, setFormData] = useState({});

    const dtoName = 'DtoTarjeta';
    const dtoNameRequest = 'DtoTarjetaRequest';

    const getFieldOverrides = () => {
        const overrides = {};

        overrides.propietarioTarjeta = (formData, onChange) => (
            <PropietariosTarjetasDropdown
                handleChange={onChange}
                formData={formData}
                required
                isInvalid={!formData.propietarioTarjeta}
                isValidated={formData.propietarioTarjeta}
                setFormData={setFormData}
            />
        );

        if (canModify) {
            overrides.nombreCuentaContable = (formData, onChange) => (
                <CuentasContablesDropdown
                    handleChange={onChange}
                    formData={formData}
                />
            );
        }

        return overrides;
    };

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            getFieldOverrides={getFieldOverrides()}
            editarEndpoint={editarTarjeta}
            agregarEndpoint={agregarTarjeta}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default TarjetasForm;
