import ModuleViewLayout from '@layouts/ModuleViewLayout';

import PagosForm from '@modules/pagos/PagosForm';
import PagosTable from '@modules/pagos/PagosTable';

import { FaDollarSign } from 'react-icons/fa';

const PagosView = () => {
    const tabData = [
        { eventKey: 'form', title: 'Formulario', Component: PagosForm },
        { eventKey: 'table', title: 'Planilla', Component: PagosTable }
    ];

    return (
        <ModuleViewLayout
            title={'Pagos'}
            icon={FaDollarSign}
            tabs={tabData}
        />
    );
};

export default PagosView;
