import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UnauthorizedView = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer); // cleanup on unmount
    }, [navigate]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1><span><FaLock className='m-3' size={50} /></span>403 - No autorizado</h1>
            <h4 className='m-3'>No tienes permisos para acceder a esta página.</h4>
            <p className='m-3'>Serás redirigido al inicio en 5 segundos...</p>
        </div>
    );
};

export default UnauthorizedView;
