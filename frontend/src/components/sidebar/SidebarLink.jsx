import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

const SidebarLink = ({ to, icon: Icon, label, isDisabled = false }) => {
    const { isCollapsed } = useSidebar();
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Nav.Link
            title={label}
            as={Link}
            to={to}
            className={`${isDisabled ? 'disabled-sidebar-link' : 'sidebar-link'} ${isActive ? 'active-sidebar-link' : ''}`} 
            style={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: isCollapsed ? 0 : '10px',
                pointerEvents: isDisabled ? 'none' : 'auto',
                opacity: isDisabled ? 0.85 : 1,
                padding: isCollapsed ? '10px' : '10px 10px 10px 15px',
                fontSize: isCollapsed ? 'larger' : 'medium',
            }}
        >
            <Icon />{!isCollapsed && <span>{label}</span>}
        </Nav.Link>
    );
};

export default SidebarLink;
