import { useEffect, useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';
import SearchableDropdown from '@components/dropdowns/SearchableDropdown';

import useCanModifyData from '@hooks/useCanModifyData';

import { agregarFacturaEmitida, editarFacturaEmitida } from '@services/cobranzaService';
import { listarUsuarios } from '@services/userService';

const FacturasEmitidasForm = ({ selectedItemData = {}, isEditing = false }) => {
    const canModify = useCanModifyData();

    const [formData, setFormData] = useState({});
    const [usuariosData, setUsuariosData] = useState([]);

    const dtoName = 'DtoFacturaEmitida';
    const dtoNameRequest = 'DtoFacturaEmitidaRequest';

    useEffect(() => {
        if (canModify) {
            fetchUsuariosDisponibles();
        }
    }, []);

    const fetchUsuariosDisponibles = async () => {
        const usuarios = await listarUsuarios();
        const usuariosVentas = usuarios.filter((user) => (user.role === 'ROLE_VENTAS' && user.username != 'admin') || (user.role === 'ROLE_SYSADMIN' && user.username != 'admin'));
        setUsuariosData(usuariosVentas);
    };

    const getFieldOverrides = () => {
        const overrides = {};

        overrides.cobrador = (formData, onChange) => (
            <SearchableDropdown
                dropdownData={usuariosData}
                handleChange={onChange}
                dataValue="username"
                dataLabel="username"
                label="Adjudicar Usuario Receptor"
                name="cobrador"
                value={formData.cobrador}
                placeholder="Seleccione un usuario receptor"
                required={true}
                isInvalid={!formData.cobrador}
                isValidated={formData.cobrador}
            />
        );

        return overrides;
    };

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            getFieldOverrides={getFieldOverrides()}
            editarEndpoint={editarFacturaEmitida}
            agregarEndpoint={agregarFacturaEmitida}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default FacturasEmitidasForm;
