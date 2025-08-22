// hooks/useCanModifyData.js
const useCanModifyData = () => {
    let tokenPayload = null;

    try {
        tokenPayload = JSON.parse(localStorage.getItem('tokenPayload'));
    } catch (error) {
        // Manejo opcional del error
        console.warn('Token inválido o malformado:', error);
    }

    const role = tokenPayload?.role?.[0]?.authority;

    // Roles autorizados a modificar datos
    const allowedRoles = ['ROLE_CONTABLE', 'ROLE_SYSADMIN'];

    return allowedRoles.includes(role);
};

export default useCanModifyData;
