import { useState } from 'react';

import SchemaFormWrapper from '@components/SchemaFormWrapper';
import BancosGPDropdown from '@components/dropdowns/BancosGPDropdown';

import { agregarCobranza, editarCobranza } from '@services/cobranzaService';

const ProductosEventoForm = ({ selectedItemData = {}, isEditing = false }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoProductosEvento';
    const dtoNameRequest = 'DtoProductosEvento';

    // const getFieldOverrides = () => {
    //     const overrides = {};

    //     overrides.bancoReceptor = (formData, onChange) => (
    //         <BancosGPDropdown
    //             name="bancoReceptor"
    //             value={formData.bancoReceptor || formData.bancoGrupoPlaneta}
    //             handleChange={onChange}
    //             required={true}
    //         />
    //     );

    //     return overrides;
    // };

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            //getFieldOverrides={getFieldOverrides()}
            editarEndpoint={editarCobranza}
            agregarEndpoint={agregarCobranza}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default ProductosEventoForm;
