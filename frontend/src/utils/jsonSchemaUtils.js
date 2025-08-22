import { reverseFormatDate } from "./helperMethods";

export const mapSelectedItemToFormData = (selectedItemData) => {
    if (!selectedItemData || Object.keys(selectedItemData).length === 0) return {};

    const newFormData = {};

    for (const key in selectedItemData) {
        const value = selectedItemData[key];

        if (key.toLowerCase().includes('fecha') && value) {
            newFormData[key] = reverseFormatDate(value);
        } else if (typeof value === 'string' && (value.includes('$') || value.includes('USD'))) {
            newFormData[key] = parseFloat(value.replace(/[^0-9.,-]+/g, '').replace(',', '.'));
        } else {
            newFormData[key] = value ?? '';
        }
    }

    return newFormData;
};


export const getSchemaDefaultsValues = (schema) => {
    const defaultData = {};
    const properties = schema.properties || {};

    //console.log('Propiedades del esquema:', properties);

    for (const key in properties) {
        const desc = properties[key].description;

        if (desc && desc.includes('"default"')) {
            try {
                const parsedDesc = JSON.parse(desc);
                if (parsedDesc.default !== undefined) {
                    defaultData[key] = parsedDesc.default;
                    //console.log(`Default value for ${key}:`, parsedDesc.default);
                }
            } catch (err) {
                console.warn(`No se pudo parsear el description de "${key}"`, err);
            }
        }
    }

    return defaultData;
};