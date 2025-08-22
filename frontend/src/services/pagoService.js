import axiosInstance from '@utils/axiosConfig';
import toast from 'react-hot-toast';

export const listarPagos = async () => {
    try {
        const response = await axiosInstance.get('/pagos');
        return response.data;
    } catch (error) {
        console.error('Error al listar pagos:', error);
        toast.error('No se pudo obtener la lista de pagos');
        return [];
    }
};

export const listarPagosByUsername = async (currentUsername) => {
    try {
        const response = await axiosInstance.get(`/pagos/${currentUsername}`);
        return response.data;
    } catch (error) {
        console.error(`Error al listar pagos de ${currentUsername}:`, error);
        toast.error('No se pudieron obtener los pagos del usuario');
        return [];
    }
};

export const agregarPago = async (pagosData) => {
    try {
        const response = await axiosInstance.post('/pagos', pagosData);
        toast.success('Pago agregado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar el pago:', pagosData);
        toast.error('No se pudo agregar el pago');
        return null;
    }
};

export const editarPago = async (id, pagosData) => {
    try {
        const response = await axiosInstance.put(`/pagos/${id}`, pagosData);
        toast.success('Pago editado correctamente');
        return response.data;
    } catch (error) {
        console.error(`Error al editar el pago con ID ${id}:`, error);
        toast.error('No se pudo editar el pago');
        return null;
    }
};

export const eliminarPagoById = async (id) => {
    try {
        const response = await axiosInstance.delete(`/pagos/${id}`);
        toast.success('Pago eliminado correctamente');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el pago con ID ${id}:`, error);
        toast.error('No se pudo eliminar el pago');
        return false;
    }
};
