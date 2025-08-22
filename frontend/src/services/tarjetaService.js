import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

/** Propietarios Tarjetas **/

export const listarPropietariosTarjetas = async () => {
    try {
        const response = await axiosInstance.get('/propietarios-tarjetas');
        return response.data;
    } catch (error) {
        console.error('Error al listar propietarios de tarjetas:', error);
        toast.error('No se pudo obtener la lista de propietarios de tarjetas');
        return [];
    }
};

export const getPropietarioByName = async (nombrePropietario) => {
    const encodedProveedor = encodeURIComponent(nombrePropietario);
    try {
        const response = await axiosInstance.get(`/propietarios-tarjetas/${encodedProveedor}`);
        console.log('Response data:', response.data);
        const propietario = response.data;
        return propietario;
    } catch (err) {
        console.error('Error al obtener los datos del propietario')
        toast.error('No se pudo obtener los datos del propietario');
    }
};

export const agregarPropietarioTarjeta = async (propietario) => {
    try {
        const response = await axiosInstance.post('/propietarios-tarjetas', propietario);
        toast.success('Propietario Tarjeta creado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al crear el Propietario Trajeta', error);
        toast.error('No se pudo crear el Propietario Trajeta');
        return null;
    }
};

export const editarPropietarioTarjeta = async (id, propietario) => {
    try {
        const response = await axiosInstance.put(`/propietarios-tarjetas/${id}`, propietario);
        toast.success('Propietario Trajeta editado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al editar el Propietario Trajeta', error);
        toast.error('No se pudo editar el Propietario Trajeta');
        return null;
    }
};

/** Gastos Tarjetas **/

export const listarTarjetas = async () => {
    try {
        const response = await axiosInstance.get('/tarjetas');
        return response.data;
    } catch (error) {
        console.error('Error al listar tarjetas:', error);
        toast.error('No se pudo obtener la lista de tarjetas');
        return [];
    }
};

export const listarTarjetasByUsername = async (currentUsername) => {
    try {
        const response = await axiosInstance.get(`/tarjetas/${currentUsername}`);
        return response.data;
    } catch (error) {
        console.error(`Error al listar gastos de la tarjeta de ${currentUsername}:`, error);
        toast.error('No se pudieron obtener los datos del gasto de la tarjeta del usuario');
        return [];
    }
};

export const agregarTarjeta = async (tarjeta) => {
    try {
        const response = await axiosInstance.post('/tarjetas', tarjeta);
        toast.success('Gasto Tarjeta subido correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al crear gasto tarjeta', error);
        toast.error('No se pudo crear el gasto tarjeta');
        return null;
    }
};

export const editarTarjeta = async (id, tarjeta) => {
    try {
        const response = await axiosInstance.put(`/tarjetas/${id}`, tarjeta);
        toast.success('Gasto tarajeta editado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al editar gasto trajeta', error);
        toast.error('No se pudo editar gasto trajeta');
        return null;
    }
};

export const eliminarTarjeta = async (id) => {
    try {
        const response = await axiosInstance.delete(`/tarjetas/${id}`);
        toast.success('Gasto tarjeta eliminado correctamente');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el gasto tarjeta con ID ${id}:`, error);
        toast.error('No se pudo eliminar el gasto tarjeta');
        return false;
    }
};