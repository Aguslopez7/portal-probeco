import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarCobranzaPendiente, editarCobranzaPendiente } from '@services/cobranzaService';

const CobranzaPendienteForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoCobranzaPendiente';
    const dtoNameRequest = 'DtoCobranzaPendienteRequest';

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarCobranzaPendiente}
            agregarEndpoint={agregarCobranzaPendiente}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default CobranzaPendienteForm;
