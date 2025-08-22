import React, { useState } from 'react';



import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';



import UrlPreviewBtn from '@components/UrlPreviewBtn';
import SearchableDropdown from '@components/dropdowns/SearchableDropdown';



import { uploadFileToCloudinary } from '@utils/cloudinaryHelper';
import { camelCaseToLabel } from '@utils/helperMethods';





/* -------------------- helpers -------------------- */

const groupFieldsBySection = (keys, schema) => {
    const grouped = { _default: [] };

    keys.forEach((key) => {
        try {
            const extra = schema.properties[key].description ? JSON.parse(schema.properties[key].description) : {};
            const section = extra.section;

            if (section) {
                if (!grouped[section]) grouped[section] = [];
                grouped[section].push(key);
            } else {
                grouped._default.push(key);
            }
        } catch {
            grouped._default.push(key);
        }
    });

    return grouped;
};

const isLeftOnly = (key, schema) => {
    try {
        const meta = schema.properties[key].description ? JSON.parse(schema.properties[key].description) : {};
        return meta.leftOnly === true;
    } catch {
        return false;
    }
};

/* ✅ FIX: incluir handleCurrencyChange en la firma y al invocar renderField */
const renderFieldRows = (
    fieldKeys,
    schema,
    formData,
    handleChange,
    handleCurrencyChange, // <- agregado
    selectedFile,
    requiredFields,
    validated,
    fieldOverrides
) => {
    const rows = [];

    for (let i = 0; i < fieldKeys.length; ) {
        const key = fieldKeys[i];
        const nextKey = fieldKeys[i + 1];

        const leftOnly = isLeftOnly(key, schema);
        const rightAvailable = nextKey && !isLeftOnly(nextKey, schema);

        rows.push(
            <Row key={key}>
                <Col md={6}>
                    {renderField(
                        key,
                        schema.properties[key],
                        formData,
                        handleChange,
                        handleCurrencyChange, // <- pasar
                        selectedFile,
                        requiredFields,
                        validated,
                        fieldOverrides
                    )}
                </Col>
                <Col md={6}>
                    {!leftOnly &&
                        rightAvailable &&
                        renderField(
                            nextKey,
                            schema.properties[nextKey],
                            formData,
                            handleChange,
                            handleCurrencyChange, // <- pasar
                            selectedFile,
                            requiredFields,
                            validated,
                            fieldOverrides
                        )}
                </Col>
            </Row>
        );

        i += leftOnly || !rightAvailable ? 1 : 2;
    }

    return rows;
};

/* -------------------- componente principal -------------------- */

const DynamicBootstrapForm = ({ schema, formData, setFormData, handleSubmit, fieldOverrides, isLoading = false, onSubmitOverride }) => {
    if (!schema) return <h3>Cargando Formulario...</h3>;

    const keys = Object.keys(schema.properties || {});
    const groupedFields = groupFieldsBySection(keys, schema);

    const [selectedFile, setSelectedFile] = useState();
    const [validated, setValidated] = useState(false);

    const handleChange = async (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            const fileUrl = await uploadFileToCloudinary(file, name);
            setSelectedFile(file);
            setFormData((prevData) => ({
                ...prevData,
                [name]: fileUrl
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Handler específico para currency: log + normalización a punto
    const handleCurrencyChange = (name, val) => {
        setFormData((prev) => ({ ...prev, [name]: val })); // siempre con punto
    };

    const normalizeMonto = (m) => {
        if (m == null || m === '') return null;
        const s = String(m).replace(/\./g, '').replace(',', '.'); // quita miles y usa punto
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // normalizá SOLO monto justo antes de enviar
        const nextData = {
            ...formData,
            monto: normalizeMonto(formData.monto)
        };

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (typeof onSubmitOverride === 'function') {
                onSubmitOverride(nextData); // pasá el formData actualizado
            } else {
                handleSubmit(nextData); // tu handleSubmit ya no debe esperar el evento
            }
        }

        setValidated(true);
    };

    return (
        <Container className="form-wrapper">
            <Form
                noValidate
                validated={validated}
                className="form-container"
                onSubmit={handleFormSubmit}
            >
                {Object.entries(groupedFields).map(([section, fieldKeys]) => (
                    <div key={section}>
                        {section !== '_default' && (
                            <>
                                <br />
                                <h4>{section}</h4>
                                <hr />
                                <br />
                            </>
                        )}
                        {renderFieldRows(
                            fieldKeys,
                            schema,
                            formData,
                            handleChange,
                            handleCurrencyChange, // <- pasar aquí
                            selectedFile,
                            schema.required,
                            validated,
                            fieldOverrides
                        )}
                    </div>
                ))}

                <Button
                    className="main-btn"
                    type="submit"
                    disabled={isLoading}
                >
                    Enviar
                </Button>
            </Form>
        </Container>
    );
};

/* -------------------- renderField -------------------- */

const renderField = (
    key,
    fieldSchema,
    formData,
    handleChange,
    handleCurrencyChange, // <- ya en la firma
    selectedFile,
    requiredFields = [],
    validated,
    fieldOverrides
) => {
    const type = fieldSchema.type;
    const isRequired = requiredFields?.includes(key);

    let extraMeta = {};
    try {
        extraMeta = fieldSchema.description ? JSON.parse(fieldSchema.description) : {};
    } catch (e) {
        console.warn(`Descripción inválida en campo ${key}:`, fieldSchema.description);
    }

    const value = formData[key] !== undefined ? formData[key] : (extraMeta['default'] ?? '');
    const isSearchable = extraMeta.searchable === true;
    const isReadOnly = extraMeta.readOnly === true;
    const isFile = extraMeta.type === 'file';
    const isDate = extraMeta.format === 'date';
    const isCurrency = extraMeta.format === 'currency';

    const condition = extraMeta['x-conditional'];
    if (condition) {
        const dependeDe = condition.field;
        const esperado = condition.equals;
        const valorActual = formData[dependeDe];
        if (valorActual !== esperado) return null;
    }

    // ✅ fieldOverrides vuelve a funcionar porque los parámetros ya no están corridos
    if (fieldOverrides?.[key]) {
        return fieldOverrides[key](formData, handleChange);
    }

    return (
        <Form.Group
            className="mb-3"
            controlId={`form-${key}`}
        >
            <Form.Label>
                {camelCaseToLabel(key)} {isRequired && <span style={{ color: 'red' }}>*</span>}
            </Form.Label>

            {type === 'string' && isSearchable ? (
                <SearchableDropdown
                    dropdownData={fieldSchema.enum ? fieldSchema.enum.map((val) => ({ name: val })) : (extraMeta.options || []).map((val) => ({ name: val }))}
                    handleChange={handleChange}
                    label=""
                    name={key}
                    value={value}
                    required={isRequired}
                    isInvalid={validated && isRequired && !value}
                    isValidated={validated}
                    placeholder={`Selecciona ${camelCaseToLabel(key)}`}
                />
            ) : type === 'string' && fieldSchema.enum ? (
                <>
                    <Form.Select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required={isRequired}
                        isInvalid={validated && isRequired && !value}
                    >
                        <option
                            disabled
                            value=""
                        >
                            Selecciona una opción
                        </option>
                        {fieldSchema.enum.map((option) => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                </>
            ) : isFile ? (
                <>
                    <Form.Control
                        type="file"
                        name={key}
                        onChange={handleChange}
                        required={isRequired}
                        isInvalid={validated && isRequired && !value}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                    <UrlPreviewBtn
                        url={value}
                        file={selectedFile}
                    />
                </>
            ) : isCurrency ? (
                <>
                    <CurrencyInput
                        name={key}
                        className="form-control"
                        // Usa Intl: coma como decimal y punto como miles (UY/ES/DE)
                        // Si querés símbolo: intlConfig={{ locale: 'es-UY', currency: 'UYU' }}
                        intlConfig={{ locale: 'es-UY' }}
                        allowDecimals
                        decimalsLimit={2}
                        inputMode="decimal"
                        value={value ?? ''}
                        onValueChange={(val) => handleCurrencyChange(key, val)} // val viene sin separadores y con punto
                        placeholder={isReadOnly ? '🚫 Campo No Editable' : `Ingrese ${camelCaseToLabel(key)}`}
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {validated && isRequired && !value && <div className="invalid-feedback d-block">Este campo es requerido</div>}
                </>
            ) : (
                <>
                    <Form.Control
                        type={isDate ? 'date' : type === 'integer' || type === 'number' ? 'number' : 'text'}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required={isRequired}
                        placeholder={isReadOnly ? '🚫 Campo No Editable' : `Ingrese ${camelCaseToLabel(key)}`}
                        isInvalid={validated && isRequired && !value}
                        readOnly={isReadOnly}
                        disabled={isReadOnly}
                        min={type === 'number' ? 0 : undefined}
                    />
                    <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
                </>
            )}
        </Form.Group>
    );
};

export default DynamicBootstrapForm;