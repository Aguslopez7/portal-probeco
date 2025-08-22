import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarBanco, editarBanco } from '@services/bancosService';

const BancosForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoBanco';
    const dtoNameRequest = 'DtoBancoRequest';

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarBanco}
            agregarEndpoint={agregarBanco}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default BancosForm;
