import React from 'react';

import { Nav } from 'react-bootstrap';

import { bdRoles, cobranzasRoles, pagosRoles, tarjetasRoles } from '@utils/constants';

import SidebarLink from './SidebarLink';

import { MdReport } from "react-icons/md";

import {
    FaBroom,
    FaBusinessTime,
    FaCertificate,
    FaCheckCircle,
    FaClock,
    FaCreditCard,
    FaDatabase,
    FaDollarSign,
    FaFileInvoiceDollar,
    FaHandPaper,
    FaTools,
    FaTruck,
    FaUserPlus
} from 'react-icons/fa';
import { FaBoxArchive } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { MdCreateNewFolder } from 'react-icons/md';
import { MdAddToPhotos } from 'react-icons/md';
import { IoCalendarSharp } from "react-icons/io5";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { useSidebar } from '../../context/SidebarContext';

const ModulesLinksWrapper = () => {
    const tokenPayload = JSON.parse(localStorage.getItem('tokenPayload'));
    const role = tokenPayload?.role[0].authority;

    const isAdmin = Object.values(["ROLE_SYSADMIN"]).includes(role);

    const isBdRoles = Object.values(bdRoles).includes(role);
    const isPagosRoles = Object.values(pagosRoles).includes(role);
    const isCobranzasRoles = Object.values(cobranzasRoles).includes(role);
    const isTarjetasRoles = Object.values(tarjetasRoles).includes(role);

    const { isCollapsed } = useSidebar();

    return (
        <Nav className="modules-links-wrapper">
            {/* <SidebarLink
                to="/dashboard"
                icon={FaMagnifyingGlassChart}
                label="Panel de Control"
                isDisabled={!isAdmin}
            />

            <hr style={{ border: '1px solid gray' }} /> */}

            <SidebarLink
                to="/pagos"
                icon={FaDollarSign}
                label="Pagos"
                isDisabled={!isPagosRoles}
            />
            {/*<SidebarLink
                to="/cobranzas"
                icon={FaFileInvoiceDollar}
                label="Cobranzas"
                isDisabled={!isCobranzasRoles}
            />
            <SidebarLink
                to="/tarjetas"
                icon={FaCreditCard}
                label="Tarjetas"
                isDisabled={!isTarjetasRoles}
            />
            <SidebarLink
                to="/eventos"
                icon={IoCalendarSharp}
                label="Eventos"
                isDisabled={!isAdmin}
            />
            <SidebarLink
                isDisabled={true}
                to=""
                icon={IoDocumentText}
                label="Faltas y Certificados"
            />
            <SidebarLink
                isDisabled={true}
                to=""
                icon={FaUserPlus}
                label="Pruebas y Alta Personal"
            />
            <SidebarLink
                isDisabled={true}
                to=""
                icon={FaTools}
                label="Armados y Desarmados"
            />*/}

            {/** <INSERT_SIDEBAR_LINKS> **/}

            <hr style={{ border: '1px solid gray' }} />
            
            {isBdRoles && (
                <>
                    <SidebarLink
                        to="/bd"
                        icon={FaDatabase}
                        label="Base de Datos"
                    />
                    {/* <SidebarLink
                        to="/module-creator"
                        icon={MdAddToPhotos}
                        label="Crear Modulo"
                    /> */}
                </>
            )}

            {isAdmin && (
                <>
                {/*<a 
                    className='feedback-btn' 
                    href='https://prickly-cairnsmore-395.notion.site/24667f0025d780938626f42c1ccd4adf' 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    style={{ textAlign: 'left', padding:'10px', textDecoration:'none' }}
                    >
                    <MdReport style={{ marginRight: '8px' }} size={isCollapsed ? 25 : 22} />
                    {!isCollapsed && 'Reportar Feedback'}
                </a>}
                    {/* <SidebarLink
                        to="/module-creator"
                        icon={MdAddToPhotos}
                        label="Crear Modulo"
                    /> */}
                </>
            )}
        </Nav>
    );
};

export default ModulesLinksWrapper;
