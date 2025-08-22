import React from 'react';
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({loading}) => {
    return (
        <div className='d-flex flex-column gap-3 justify-content-center align-items-center h-100'>
            <h3>Cargando...</h3>
            <ClipLoader
                //color={color}
                loading={loading}
                size={80}
                aria-label="Loading Spinner"
            />
    </div> 
    );
};

export default LoadingSpinner;