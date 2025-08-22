import { useState } from 'react';

import { Form } from 'react-bootstrap';

import SchemaFormWrapper from '@components/SchemaFormWrapper';

import { agregarPropietarioTarjeta, editarPropietarioTarjeta } from '@services/tarjetaService';

const PropietarioTarjetaForm = ({ selectedItemData = {}, isEditing }) => {
    const [formData, setFormData] = useState({});

    const dtoName = 'DtoPropietarioTarjeta';
    const dtoNameRequest = 'DtoPropietarioTarjetaRequest';

    const handleChange = (e) => {
        const val = e.target.value;
        if (/^\d{0,4}$/.test(val)) {
            setFormData({ ...formData, ultimosDigitos: val });
        }
    };

    const getFieldOverrides = () => {
        const overrides = {};

        overrides.ultimosDigitos = (formData, onChange) => (
            <Form.Group controlId="ultimos4Digitos">
                <Form.Label>Últimos 4 dígitos</Form.Label>
                <Form.Control
                    type="text"
                    inputMode="numeric"
                    pattern="\d{4}"
                    maxLength={4}
                    placeholder="Ingresa los ultimos 4 digitos"
                    value={formData.ultimosDigitos}
                    onChange={handleChange}
                    required
                />
                <br />
            </Form.Group>
        );

        return overrides;
    };

    return (
        <SchemaFormWrapper
            dtoName={dtoName}
            dtoNameRequest={dtoNameRequest}
            editarEndpoint={editarPropietarioTarjeta}
            agregarEndpoint={agregarPropietarioTarjeta}
            selectedItemData={selectedItemData}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            getFieldOverrides={getFieldOverrides()}
        />
    );
};

export default PropietarioTarjetaForm;
