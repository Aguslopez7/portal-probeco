import { useEffect, useState } from 'react';



import DynamicFormLayout from '@layouts/DynamicFormLayout';



import { isDateFormat, reverseFormatDate } from '@utils/helperMethods';
import { mapSelectedItemToFormData } from '@utils/jsonSchemaUtils';



import { getSchemaWithDefaults } from '@services/jsonSchemaService';





const SchemaFormWrapper = ({
    dtoName,
    dtoNameRequest,
    formData,
    setFormData,
    getFieldOverrides,
    editarEndpoint,
    agregarEndpoint,
    selectedItemData = {},
    isEditing = false,
    onSubmitOverride,
    onAddOverride,
    onEditOverride,
    onClose
}) => {
    const [schema, setSchema] = useState(null);

    useEffect(() => {
        const currentSchema = isEditing ? dtoNameRequest : dtoName;
        fetchSchema(currentSchema);
    }, [isEditing]);

    useEffect(() => {
        if (selectedItemData && Object.keys(selectedItemData).length > 0) {
            setFormWithSelectedValues(selectedItemData);
        }
    }, [selectedItemData]);

    const setFormWithSelectedValues = (selectedItemData) => {
        const selectedData = mapSelectedItemToFormData(selectedItemData);
        const formattedData = Object.entries(selectedData).reduce((acc, [key, value]) => {
            if (isDateFormat(value)) {
                acc[key] = reverseFormatDate(value);
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});

        setFormData(formattedData);
    };

    const fetchSchema = async (dtoName) => {
        try {
            const { schema, defaultValues } = await getSchemaWithDefaults(dtoName);
            setSchema(schema);
            if (!isEditing) {
                setFormData(defaultValues);
            }
        } catch (error) {
            console.error('Error fetching schema:', error);
        }
    };

    const handleSubmit = async (data) => {
        if (typeof onSubmitOverride === 'function') {
            onSubmitOverride(data);
        } else {
            if (isEditing) {
                if (typeof onEditOverride === 'function') {
                    onEditOverride(data);
                    onClose?.();
                } else {
                    await editarEndpoint(selectedItemData.id, data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else {
                if (typeof onAddOverride === 'function') {
                    onAddOverride(data);
                } else {
                    await agregarEndpoint(data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }
        }
    };

    return (
        <DynamicFormLayout
            schema={schema}
            formData={formData}
            handleSubmit={handleSubmit}
            fieldOverrides={getFieldOverrides}
            setFormData={setFormData}
            onSubmitOverride={onSubmitOverride}
        />
    );
};

export default SchemaFormWrapper;