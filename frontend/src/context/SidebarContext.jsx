import React, { createContext, useState, useContext, useEffect } from 'react';
import { layoutConstants } from '../utils/constants';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(layoutConstants.SIDEBAR_WIDTH);

    useEffect(() => {
        setSidebarWidth(isCollapsed ? layoutConstants.COLLAPSED_SIDEBAR_WIDTH : layoutConstants.SIDEBAR_WIDTH);
    }, [isCollapsed]);

    const toggleCollapse = () => setIsCollapsed(prev => !prev);

    return (
        <SidebarContext.Provider value={{ isCollapsed, sidebarWidth, toggleCollapse }}>
            {children}
        </SidebarContext.Provider>
    );
};
