import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

export const listarProveedores = async () => {
    try {
        const response = await axiosInstance.get('/proveedores/r');
        const proveedores = response.data;
        return proveedores;
    } catch (err) {
        console.error('Error al obtener la lista de proveedores')
        toast.error('Error al obtener la lista de proveedores');
    }
};

export const getProveedorByName = async (nombreProveedor) => {
    const encodedProveedor = encodeURIComponent(nombreProveedor);
    try {
        const response = await axiosInstance.get(`/proveedores/${encodedProveedor}`);
        console.log('Response data:', response.data);
        const proveedor = response.data;
        return proveedor;
    } catch (err) {
        console.error('Error al obtener los datos del proveedor')
        toast.error('No se pudo obtener los datos del proveedor');
    }
};

export const agregarProveedor = async (proveedor) => {
    try {
        const response = await axiosInstance.post('/proveedores', proveedor);
        toast.success("Proveedor agregado correctamente");
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('No se pudo agregar el proveedor');
    }
};

export const editarProveedor = async (id, proveedor) => {
    try {
        const response = await axiosInstance.put(`/proveedores/${id}`, proveedor);
        toast.success("Proveedor editado correctamente");
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('No se pudo editar el proveedor');
    }
};
