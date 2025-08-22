import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import SectionModules from './sidebar/ModulesLinksWrapper';
import '../styles/navbar.css'
import { FaUserCircle } from "react-icons/fa";
/** Hooks **/
import useResponsive from '../hooks/useResponsive';
import { useAuth } from '../context/AuthContext';

function CustomNavbar({ brand, brandLogo }) {
    const { isSmallDevice } = useResponsive();
    const { logout } = useAuth();
    const tokenPayload = JSON.parse(localStorage.getItem('tokenPayload'));
    return (
        <Navbar expand="lg" className="navbar" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/" className='nav-brand'>
                    <img
                        alt=""
                        src={brandLogo}
                        className="nav-logo"
                    />
                    {brand}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Dropdown className="user-dropdown" drop="down-centered" align="end">
                            <Dropdown.Toggle
                                variant="dark"
                                id="dropdown-basic"
                                style={{ backgroundColor: "transparent", border: "none" }}
                            >
                                <FaUserCircle style={{ marginRight: "10px" }} size={30} />{tokenPayload?.username}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="nav-dropdown-menu">
                                <Dropdown.Header>{tokenPayload?.role[0].authority}</Dropdown.Header>
                                <Dropdown.Header>{tokenPayload?.email}</Dropdown.Header>
                                <Dropdown.Item onClick={logout}><FaSignOutAlt className='icon-margin' />Cerrar Sesion</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {isSmallDevice && <SectionModules />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;