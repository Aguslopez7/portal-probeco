import toast from 'react-hot-toast';

import axiosInstance from '@utils/axiosConfig';

export const agregarCuentaContable = async (cuentaContable) => {
    try {
        const response = await axiosInstance.post('/cuentas-contables', cuentaContable);
        toast.success('Cuenta Contable agregada correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al crear la cuenta contable', error);
        toast.error('No se pudo editar el cuenta contable');
        return null;
    }
};

export const editarCuentaContable = async (id, cuentaContable) => {
    try {
        const response = await axiosInstance.put(`/cuentas-contables/${id}`, cuentaContable);
        toast.success('Cuenta Contable editada correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al editar la cuenta contable', error);
        toast.error('No se pudo editar el cuenta contable');
        return null;
    }
};
