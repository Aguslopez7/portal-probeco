import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarCentroCosto, editarCentroCosto } from '@services/centroCostoService';

const CentroCostosForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoCentroCosto';
    const dtoNameRequest = 'DtoCentroCostoRequest';

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarCentroCosto}
            agregarEndpoint={agregarCentroCosto}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default CentroCostosForm;
