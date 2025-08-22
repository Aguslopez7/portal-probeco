import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarCuentaContable, editarCuentaContable } from '@services/cuentaContableService';

const CuentasContablesForm = ({ selectedItemData = {}, isEditing }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoCuentaContable';
    const dtoNameRequest = 'DtoCuentaContableRequest';

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarCuentaContable}
            agregarEndpoint={agregarCuentaContable}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default CuentasContablesForm;
