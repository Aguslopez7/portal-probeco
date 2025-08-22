import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

let logoutTimer;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenPayload, setTokenPayload] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');        
        const jwtPayload = JSON.parse(localStorage.getItem('tokenPayload'));
    
        if (token) {
            try {
                const currentTime = Date.now() / 1000; // in seconds
                const isTokenExpired =jwtPayload.exp < currentTime;
                
                if (isTokenExpired) {
                    alert("Ha expirado la sesion, por favor ingrese nuevamente!");
                    logout();
                }
            } catch (e) {
                console.error("Invalid token format", e);
                logout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        localStorage.setItem('tokenPayload', JSON.stringify(decoded));

        setIsAuthenticated(true);
        setTokenPayload(decoded);
        scheduleAutoLogout(decoded.exp);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenPayload');

        setIsAuthenticated(false);
        setTokenPayload(null);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        navigate("/login");
    };

    const scheduleAutoLogout = (exp) => {
        const expirationDate = new Date(exp * 1000);
        console.log("La sesion expira:", expirationDate.toLocaleString());
        
        const remainingTime = exp * 1000 - Date.now(); // exp is in seconds
        logoutTimer = setTimeout(() => {
            alert("Ha expirado la sesion, por favor ingrese nuevamente!");
            logout();
        }, remainingTime);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, tokenPayload, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
