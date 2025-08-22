import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axiosInstance from '@utils/axiosConfig';

const BancosGPDropdown = ({ value = "", handleChange, name, required = false }) => {
    const [bancosGPData, setBancosGPData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBancosData = async () => {
            try {
                const response = await axiosInstance.get('/bancos');
                const bancos = response.data;

                // Agregar campo displayName para evitar nombres repetidos visuales
                const bancosConDisplayName = bancos.map((bancoData) => ({
                    ...bancoData,
                    displayName: bancoData.sucursal ? `${bancoData.name} - ${bancoData.sucursal}` : bancoData.name,
                }));

                setBancosGPData(bancosConDisplayName);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBancosData();
    }, []);

    return (
        <div className='mb-3'>
            <Form.Label>Banco ProBeco <span className="text-danger">{required ? "*" : ""}</span></Form.Label>
            <Form.Select
                required={required}
                name={name}
                onChange={handleChange}
                disabled={loading}
                value={value}
            >
                <option disabled value="">
                    {loading ? 'Cargando bancos...' : 'Seleccione Banco ProBeco'}
                </option>
                {bancosGPData.map((banco) => (
                    <option key={banco.id} value={banco.displayName}>
                        {banco.displayName}
                    </option>
                ))}
            </Form.Select>
            {error && <small className="text-danger">Error: {error}</small>}
        </div>
    );
};

export default BancosGPDropdown;
