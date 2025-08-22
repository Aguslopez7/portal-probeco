import ModuleViewLayout from '@layouts/ModuleViewLayout';

import CobranzaForm from '@modules/cobranzas/CobranzaForm';
import CobranzasPendientes from '@modules/cobranzas/CobranzasPendientes';
import CobranzaTable from '@modules/cobranzas/CobranzasTable';
import FacturasEmitidas from '@modules/cobranzas/FacturasEmitidas';

import { FaFileInvoiceDollar } from 'react-icons/fa';

const CobranzasView = () => {
    const tabData = [
        { eventKey: 'form', title: 'Formulario', Component: CobranzaForm },
        { eventKey: 'table', title: 'Planilla', Component: CobranzaTable },
        { eventKey: 'cobranzas-pendientes', title: 'Cobranzas Pendientes', Component: CobranzasPendientes },
        { eventKey: 'facturas-emitidas', title: 'Facturas Emitidas', Component: FacturasEmitidas }
    ];

    return (
        <ModuleViewLayout
            title="Cobranzas"
            icon={FaFileInvoiceDollar}
            tabs={tabData}
        />
    );
};

export default CobranzasView;
