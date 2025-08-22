import { useState } from 'react';

import Slider from '@mui/material/Slider';
import { Form, InputGroup } from 'react-bootstrap';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

const ModificarComponentesEventosForm = ({ selectedItemData = {}, isEditing = false, initialData, onClose, onGuardar, onEditOverride }) => {
    const [compuestoProductoEvento, setCompuestoProductoEvento] = useState(initialData || {});

    const marks = [
        { value: 1, label: 'min' },
        { value: 100, label: 'max' }
    ];

    const getFieldOverrides = () => {
        const overrides = {};

        // overrides.cantidad = (formData, onChange) => (
        //     <>
        //         <Form.Label htmlFor="ubicacionEvento">Cantidad</Form.Label>
        //         <InputGroup className="mb-3">
        //             <Form.Control
        //                 style={{ textAlign: 'center' }}
        //                 disabled
        //                 value={(compuestoProductoEvento.cantidad || []).length}
        //             />
        //             <Slider
        //                 value={compuestoProductoEvento.cantidad}
        //                 onChange={onChange}
        //                 aria-label="Slider"
        //                 valueLabelDisplay="auto"
        //                 defaultValue={1}
        //                 min={1}
        //                 max={100}
        //                 marks={marks}
        //             />
        //         </InputGroup>
        //     </>
        // );

        return overrides;
    };

    return (
        <SchemaFormWrapper
            dtoName="DtoCompuestoProductoEvento"
            dtoNameRequest="DtoCompuestoProductoEvento" // cambiar por request con id
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={compuestoProductoEvento}
            setFormData={setCompuestoProductoEvento}
            onSubmitOverride={!isEditing ? () => onGuardar(compuestoProductoEvento) : undefined}
            onEditOverride={isEditing ? onEditOverride : undefined}
            onClose={onClose}
            getFieldOverrides={getFieldOverrides()}
        />
    );
};

export default ModificarComponentesEventosForm;
