import React from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import ProtectedRoute from '@components/ProtectedRoute';
import MainPageLayout from '@components/layouts/MainPageLayout';

import DataBaseView from '@pages/DataBaseView';
import HomePage from '@pages/HomePage';
import LoginView from '@pages/LoginView';
import PagosView from '@pages/PagosView';
import CobranzasView from '@pages/CobranzasView'
import UnauthorizedView from '@pages/UnauthorizedView';
import ModuleCreatorTool from '@pages/ModuleCreatorTool';
import TarjetasView from '@pages/TarjetasView';
import EventosView from '@pages/EventosView';

import ProductosTable from '../components/modules/eventos/ProductosTable';
{/** <IMPORT_PAGES> **/}

import CrearEvento from '../pages/EventosPage';
import DashboardView from '../pages/DashBoardView';
import { allRoles, bdRoles, cobranzasRoles, pagosRoles, tarjetasRoles } from '@utils/constants';

function AppRouter() {
    const location = useLocation();

    return (
        <Routes
            location={location}
            key={location.pathname}
        >
            {/* Public route */}
            <Route
                path="/login"
                element={<LoginView />}
            />
            <Route
                path="/unauthorized"
                element={<UnauthorizedView />}
            />
            <Route
                path="/pd"
                element={<ProductosTable />}
            />
            {/* Protected for any authenticated user */}
            <Route element={<ProtectedRoute allowedRoles={allRoles} />}>
                <Route
                    path="/"
                    element={<MainPageLayout />}
                >
                    <Route
                        id='home-page'
                        index
                        element={<HomePage />}
                    />

                    {/** <INSERT_ROUTES> **/}

                    <Route element={<ProtectedRoute allowedRoles={pagosRoles} />}>
                        <Route
                            path="pagos"
                            element={<PagosView />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={cobranzasRoles} />}>
                        <Route
                            path="cobranzas"
                            element={<CobranzasView />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={tarjetasRoles} />}>
                        <Route
                            path="tarjetas"
                            element={<TarjetasView />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={bdRoles} />}>
                        <Route
                            path="bd"
                            element={<DataBaseView />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["ROLE_SYSADMIN"]} />}>
                        <Route
                            path="module-creator"
                            element={<ModuleCreatorTool />}
                        />

                        <Route
                            path="dashboard"
                            element={<DashboardView />}
                        />

                        <Route
                            path="eventos"
                            element={<EventosView />}
                        />

                        <Route
                            path="crear-evento"
                            element={<CrearEvento />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRouter;
