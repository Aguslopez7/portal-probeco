import { layoutConstants } from "../../utils/constants";
import useResponsive from "../../hooks/useResponsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/mainModuleLayout.css";
import { useSidebar } from '../../context/SidebarContext';


function MainModuleLayout({ children }) {
	const { isSmallDevice } = useResponsive();
	const { isCollapsed } = useSidebar();
	
	return (
		<div
			className="main-module-wrapper"
			style={{
				marginLeft: isSmallDevice ? "0px" : isCollapsed ? layoutConstants.COLLAPSED_SIDEBAR_WIDTH : layoutConstants.SIDEBAR_WIDTH,
				marginTop: layoutConstants.NAVBAR_HEIGHT,
				height: `calc(100dvh - ${layoutConstants.NAVBAR_HEIGHT})`,
			}}
		>
			<div className="main-module-container">{children}</div>
		</div>
	);
}

export default MainModuleLayout;
