import React from 'react';
import { Form } from 'react-bootstrap';
import RequiredFieldFeedback from '@components/RequiredFieldFeedback';

const RequiredInput = ({
    controlId,
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    as = 'input', // allows textarea if needed
    ...rest
}) => {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                as={as}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
            <RequiredFieldFeedback />
        </Form.Group>
    );
};

export default RequiredInput;
