import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

const CargaProductosTerciarizadosEventoForm = ({ selectedItemData = {}, isEditing = false, initialData, onClose, onGuardar, onEditOverride }) => {
    const [productoTerciarizadoForm, setProductoTerciarizadoForm] = useState(initialData);

    return (
        <SchemaFormWrapper
            dtoName="DtoProductoTerciarizadoEvento"
            dtoNameRequest="DtoProductoTerciarizadoEvento" // cambiar por request con id
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={productoTerciarizadoForm}
            setFormData={setProductoTerciarizadoForm}
            onSubmitOverride={!isEditing ? () => onGuardar(productoTerciarizadoForm) : undefined}
            onEditOverride={isEditing ? onEditOverride : undefined}
            onClose={onClose}
        />
    );
};

export default CargaProductosTerciarizadosEventoForm;
