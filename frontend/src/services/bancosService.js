import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

export const agregarBanco = async (banco) => {
    try {
        const response = await axiosInstance.post('/bancos', banco);
        toast.success('Banco creado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al crear el banco', error);
        toast.error('No se pudo crear el banco');
        return null;
    }
};

export const editarBanco = async (id, banco) => {
    try {
        const response = await axiosInstance.put(`/bancos/${id}`, banco);
        toast.success('Banco editado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al editar el banco', error);
        toast.error('No se pudo editar el banco');
        return null;
    }
};
