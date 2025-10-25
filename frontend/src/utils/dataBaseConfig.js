// databaseConfig.js
import BancosForm from '@modules/base-de-datos/BancosForms';
import CuentasContablesForm from '@modules/base-de-datos/CuentasContablesForm';
import PropietarioTarjetaForm from '@modules/base-de-datos/PropietarioTarjetaForm';
import ProveedoresForm from '@modules/base-de-datos/ProveedoresForm';
import CentroCostosForm from '@modules/base-de-datos/CentroCostosForm';

export const databaseConfig = {
    bancos: {
        name: 'Bancos ProBeco',
        endpoint: '/bancos',
        form: BancosForm,
        importExcel: true,
        importConfig: {
            headers: ["id", "name", "sucursal", "moneda", "numeroCuenta"],
            notes: [
                'El id debe estar vacío.',
                'Si ya existe un banco con el mismo nombre y nro. de cuenta ingresado se ignora ese nuevo registro.'
            ]
        }
    },
    tarjetas: {
        name: 'Propietarios Tarjetas',
        endpoint: '/propietarios-tarjetas',
        form: PropietarioTarjetaForm,
        importExcel: false
    },
    centroDeCostos: {
        name: 'Centros de Costos',
        endpoint: '/centro-costos',
        form: CentroCostosForm,
        importExcel: false
    },
    proveedores: {
        name: 'Proveedores',
        endpoint: '/proveedores',
        form: ProveedoresForm,
        importExcel: true,
        importConfig: {
            headers: ["id", "name", "banco", "numeroCuenta", "sucursal", "moneda"],
            notes: [
                'El id debe estar vacío.',
                'Si ya existe un proveedor con el mismo nombre ingresado se ignora ese nuevo registro.'
            ]
        }
    },
    cuentasContables: {
        name: 'Cuentas Contables',
        endpoint: '/cuentas-contables',
        form: CuentasContablesForm,
        importExcel: true,
        importConfig: {
            headers: ["nombre", "grupoContable", "subGrupoContable", "tipoCuentaContable", "tipoCosto"],
            notes: [
                'Si ya existe una cuenta contable con el mismo nombre ingresado se ignora ese nuevo registro.'
            ]
        }
    }
};
