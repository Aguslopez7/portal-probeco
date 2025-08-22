export const camelCaseToLabel = (camel) => {
    return camel
        .replace(/([A-Z])/g, ' $1') // Inserta espacio antes de mayúsculas
        .replace(/^./, (str) => str.toUpperCase()); // Capitaliza la primera letra
};

// Función para reemplazar múltiples claves
export const replaceKeys = (obj, keyMap) => {
    const newObj = {};
    for (const key in obj) {
        const newKey = keyMap[key] || key;
        newObj[newKey] = obj[key];
    }
    return newObj;
};

export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
};

export const reverseFormatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
};

export const formatStringToEnum = (str) => {
    return str
        .split(' ')
        .map(word => word.toUpperCase())
        .join('_');
}

export const isDateFormat = (val) => /^\d{2}-\d{2}-\d{4}$/.test(val);

export const isAmountFormat = (val) => /[$,%\s]/.test(val);

export const isUrl = (value) => {
    return (
        typeof value === 'string' &&
        (value.trim().startsWith('http://') || value.trim().startsWith('https://'))
    );
};

export const isReverseDateFormat = (val) => /^\d{4}-\d{2}-\d{2}$/.test(val);