import axiosInstance from '@utils/axiosConfig';
import toast from 'react-hot-toast';

const cobranzasEndpoint = '/cobranzas';
const cobranzaPendientesEndpoint = '/cobranza-pendientes';
const facturasEmitidasEndpoint = '/facturas-emitidas';

/** Cobranzas **/

export const listarCobranzas = async () => {
    try {
        const response = await axiosInstance.get('/cobranzas');
        return response.data;
    } catch (error) {
        console.error('Error al listar cobranzas:', error);
        toast.error('No se pudo obtener la lista de cobranzas');
        return [];
    }
};

export const listarCobranzasByUsername = async (currentUsername) => {
    try {
        const response = await axiosInstance.get(`/cobranzas/${currentUsername}`);
        return response.data;
    } catch (error) {
        console.error(`Error al listar cobranzas de ${currentUsername}:`, error);
        toast.error('No se pudieron obtener los cobranzas del usuario');
        return [];
    }
};

export const agregarCobranza = async (cobranzasData) => {
    try {
        const response = await axiosInstance.post('/cobranzas', cobranzasData);
        toast.success('Cobranza agregado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar el cobranza:', error);
        toast.error('No se pudo agregar el cobranza');
        return null;
    }
};

export const editarCobranza = async (id, cobranzasData) => {
    try {
        const response = await axiosInstance.put(`/cobranzas/${id}`, cobranzasData);
        toast.success('Cobranza editado correctamente');
        return response.data;
    } catch (error) {
        console.error(`Error al editar el cobranza con ID ${id}:`, error);
        toast.error('No se pudo editar el cobranza');
        return null;
    }
};

export const eliminarCobranzaById = async (id) => {
    try {
        await axiosInstance.delete(`/cobranzas/${id}`);
        toast.success('Cobranza eliminado correctamente');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el cobranza con ID ${id}:`, error);
        toast.error('No se pudo eliminar el cobranza');
        return false;
    }
};

/** Cobranzas Pendiente **/

export const listarCobranzasPendientes = async () => {
    try {
        const response = await axiosInstance.get('/cobranza-pendientes');
        return response.data;
    } catch (error) {
        console.error('Error al listar cobranzas:', error);
        toast.error('No se pudo obtener la lista de cobranzas');
        return [];
    }
};

export const agregarCobranzaPendiente = async (cobranzasData) => {
    try {
        const response = await axiosInstance.post('/cobranza-pendientes', cobranzasData);
        toast.success('Cobranza agregado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar el cobranza:', error);
        toast.error('No se pudo agregar el cobranza');
        return null;
    }
};

export const editarCobranzaPendiente = async (id, cobranzasData) => {
    try {
        const response = await axiosInstance.put(`/cobranza-pendientes/${id}`, cobranzasData);
        toast.success('Cobranza editado correctamente');
        return response.data;
    } catch (error) {
        console.error(`Error al editar el cobranza con ID ${id}:`, error);
        toast.error('No se pudo editar el cobranza');
        return null;
    }
};

export const eliminarCobranzaPendienteById = async (id) => {
    try {
        await axiosInstance.delete(`/cobranza-pendientes/${id}`);
        toast.success('Cobranza eliminado correctamente');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el cobranza con ID ${id}:`, error);
        toast.error('No se pudo eliminar el cobranza');
        return false;
    }
};

/** Facturas Emitidas **/

export const listarFacturasEmitidas = async () => {
    try {
        const response = await axiosInstance.get(facturasEmitidasEndpoint);
        return response.data;
    } catch (error) {
        console.error('Error al listar facturas emitidas:', error);
        toast.error('No se pudo obtener la lista de facturas emitidas');
        return [];
    }
};

export const listarFacturasEmitidasByUsername = async (currentUsername) => {
    try {
        const response = await axiosInstance.get(`${facturasEmitidasEndpoint}/${currentUsername}`);
        return response.data;
    } catch (error) {
        console.error(`Error al listar pagos de ${currentUsername}:`, error);
        toast.error('No se pudieron obtener los pagos del usuario');
        return [];
    }
};

export const agregarFacturaEmitida = async (facturaData) => {
    try {
        const response = await axiosInstance.post(facturasEmitidasEndpoint, facturaData);
        toast.success('Factura emitida agregado correctamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar el factura emitida:', error);
        toast.error('No se pudo agregar el factura emitida');
        return null;
    }
};

export const editarFacturaEmitida = async (id, facturaData) => {
    try {
        const response = await axiosInstance.put(`${facturasEmitidasEndpoint}/${id}`, facturaData);
        toast.success('Factura emitida editado correctamente');
        return response.data;
    } catch (error) {
        console.error(`Error al editar el Factura emitida con ID ${id}:`, error);
        toast.error('No se pudo editar el Factura emitida');
        return null;
    }
};

export const eliminarFacturaEmitidaById = async (id) => {
    try {
        await axiosInstance.delete(`${facturasEmitidasEndpoint}/${id}`);
        toast.success('Factura emitida eliminado correctamente');
        return true;
    } catch (error) {
        console.error(`Error al eliminar la factura emitida con ID ${id}:`, error);
        toast.error('No se pudo eliminar la factura emitida');
        return false;
    }
};