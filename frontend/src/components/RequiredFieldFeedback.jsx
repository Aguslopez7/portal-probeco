import React from 'react';
import { Form } from 'react-bootstrap';

const RequiredFieldFeedback = () => {
    const validationMessage = "Campo requerido (*)";

    return (
        <Form.Control.Feedback type="invalid">{validationMessage}</Form.Control.Feedback>
    );
};

export default RequiredFieldFeedback;