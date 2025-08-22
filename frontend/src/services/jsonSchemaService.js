import axiosInstance from '@utils/axiosConfig';
import { getSchemaDefaultsValues } from '@utils/jsonSchemaUtils';

export const getSchema = async (dtoName) => {
    try {
        const response = await axiosInstance.get(`/schemas/${dtoName}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching schema:', error);
        throw error;
    }
};

export const getSchemaWithDefaults = async (dtoName) => {
    try {
        const schema = await getSchema(dtoName);
        const defaultValues = getSchemaDefaultsValues(schema);
        return { schema, defaultValues };
    } catch (error) {
        console.error(`Error al obtener esquema y valores por defecto para ${dtoName}:`, error);
        throw error;
    }
};
