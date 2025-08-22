import React from 'react';
import ModulesLinksWrapper from './ModulesLinksWrapper';
import '../../styles/sidebar.css';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { useSidebar } from '../../context/SidebarContext';
import { layoutConstants, devConstants } from '../../utils/constants';

const Sidebar = () => {
	const { isCollapsed, sidebarWidth, toggleCollapse } = useSidebar();

	return (
		<div
			className='sidebar-container'
			style={{
				width: sidebarWidth,
				height: `calc(100dvh - ${layoutConstants.NAVBAR_HEIGHT})`,
				top: layoutConstants.NAVBAR_HEIGHT,
			}}
		>
			<div className='m-2' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				{!isCollapsed && <h3 style={{ color: 'white' }}>Módulos</h3>}
				{isCollapsed
					? <TbLayoutSidebarRightCollapse style={{cursor: 'pointer'}} size={30} onClick={toggleCollapse} color='white' />
					: <TbLayoutSidebarLeftCollapse style={{cursor: 'pointer'}} size={30} onClick={toggleCollapse} color='white' />}
			</div>
			<hr style={{ color: 'white' }} />
			<ModulesLinksWrapper />
			<small style={{ color: 'gray' }}>{devConstants.version}</small>
		</div>
	);
};

export default Sidebar;
