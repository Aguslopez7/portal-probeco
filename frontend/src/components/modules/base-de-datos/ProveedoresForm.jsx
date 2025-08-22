import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarProveedor, editarProveedor } from '@services/proveedorService';

const ProveedoresForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoProveedor';
    const dtoNameRequest = 'DtoProveedorRequest';

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarProveedor}
            agregarEndpoint={agregarProveedor}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default ProveedoresForm;
