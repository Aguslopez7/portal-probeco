// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import Sidebar from '../sidebar/Sidebar';
import useResponsive from '../../hooks/useResponsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/Logo-ProBeCo-Color.png';
import MainModuleLayout from './MainModuleLayout';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    const { isSmallDevice } = useResponsive();

    return (
        <div>
            <CustomNavbar brand={"Portal ProBeco"} brandLogo={Logo} />
            {!isSmallDevice && <Sidebar />}
            <MainModuleLayout>
                <Outlet />
            </MainModuleLayout>
            <Toaster 
                position='top-center' 
                toastOptions={{
                    style: { border: "2px solid #2a2a2a", fontWeight: "bold", textAlign: "center" },
                    success: {
                        style: {
                            background: '#baffc9',
                            border: '2px solid green',
                        },
                    },
                    error: {
                        style: {
                            background: '#ffb3ba',
                            border: '2px solid red',
                        },
                    },
                }} 
            />
        </div>
    );
};

export default Layout;
