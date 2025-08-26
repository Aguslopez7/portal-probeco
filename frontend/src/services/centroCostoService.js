import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

export const agregarCentroCosto = async (cc) => {
    try {
        const response = await axiosInstance.post('/centro-costos', cc);
        toast.success('Centro de costo creado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al crear el centro de costo', error);
        toast.error('No se pudo crear el centro de costo');
        return null;
    }
};

export const editarCentroCosto = async (id, cc) => {
    try {
        const response = await axiosInstance.put(`/centro-costos/${id}`, cc);
        toast.success('Centro de costo editado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al editar el centro de costo', error);
        toast.error('No se pudo editar el centro de costo');
        return null;
    }
};
