import React, { useEffect, useState } from 'react';

import axiosInstance from '@utils/axiosConfig';

import SearchableDropdown from './SearchableDropdown';

const CentroCostosDropdown = ({ handleChange, formData }) => {
    const [centroCostosData, setCentroCostosData] = useState([]);

    useEffect(() => {
        fetchCentroCostos();
    }, []);

    const fetchCentroCostos = async () => {
        try {
            const response = await axiosInstance.get('/centro-costos');
            setCentroCostosData(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="mb-3">
            <SearchableDropdown
                dropdownData={centroCostosData}
                dataValue={'nombre'}
                dataLabel={'nombre'}
                handleChange={handleChange}
                label="Centro de Costos"
                name="centroCosto"
                value={formData.centroCosto}
                placeholder="Seleccione un centro de costos"
            />
        </div>
    );
};

export default CentroCostosDropdown;
