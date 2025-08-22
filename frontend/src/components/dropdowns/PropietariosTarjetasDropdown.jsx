import { useEffect, useState } from 'react';

import { listarPropietariosTarjetas, getPropietarioByName } from '@services/tarjetaService';

import SearchableDropdown from './SearchableDropdown';

const PropietariosTarjetasDropdown = ({ handleChange, setFormData, formData, required = false, isInvalid = false, isValidated = false }) => {
    const [propietariosTarjetasData, setPropietariosTarjetasData] = useState([]);

    useEffect(() => {
        fetchPropietariosTarjetas();
    }, []);

    const handlePropietarioTarjeta = (propietario) => {
        if (propietario) {
            setFormData((prev) => ({
                ...prev,
                ultimosDigitos: propietario.ultimosDigitos,
                tipoTarjeta: propietario.tipoTarjeta
            }));
        }
    };

    const fetchPropietariosTarjetas = async () => {
        try {
            const proveedores = await listarPropietariosTarjetas();
            setPropietariosTarjetasData(proveedores);
        } catch (err) {
            console.error('Error fetching propietarios tarjetas:', err);
        }
    };

    const onChange = async (e) => {
        const { value } = e.target;
        if (value) {
            const propietario = await getPropietarioByName(value);
            if (propietario) {
                handlePropietarioTarjeta(propietario);
                handleChange(e); // prop
            }   
        } else {
            handleExistingProveedor(null);
        }
    };

    return (
        <div className="mb-3">
            <SearchableDropdown
                dropdownData={propietariosTarjetasData}
                handleChange={onChange}
                dataValue={'nombrePropietarioTarjeta'}
                dataLabel={'nombrePropietarioTarjeta'}
                label="Propietario Tarjeta"
                name="propietarioTarjeta"
                value={formData.propietarioTarjeta}
                placeholder="Seleccione un Propietario"
                required={required}
                isInvalid={isInvalid}
                isValidated={isValidated}
            />
        </div>
    );
};

export default PropietariosTarjetasDropdown;