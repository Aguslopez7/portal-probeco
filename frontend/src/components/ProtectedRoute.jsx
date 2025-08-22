import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const tokenPayload = JSON.parse(localStorage.getItem('tokenPayload'));

    if (!tokenPayload) {
        return <Navigate to="/login" replace />;
    }

    // Handle both object and array
    const allowedRoleList = Array.isArray(allowedRoles)
        ? allowedRoles
        : Object.values(allowedRoles);

    const userRoles = tokenPayload?.role?.map(role => role.authority) || [];

    const isAuthorized = userRoles.some(role => allowedRoleList.includes(role));

    return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
