import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

export const listarUsuarios = async () => {
    try {
        const response = await axiosInstance.get('/usuarios');
        return response.data;
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        toast.error('No se pudo obtener la lista de usuarios');
        return [];
    }
};