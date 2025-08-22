import TarjetasForm from '@modules/tarjetas/TarjetasForm';
import TarjetasTable from '@modules/tarjetas/TarjetasTable';

import ModuleViewLayout from '@components/layouts/ModuleViewLayout';

import { FaCreditCard } from 'react-icons/fa';

const TarjetasView = () => {
    const tabData = [
        { eventKey: 'form', title: 'Formulario', Component: TarjetasForm },
        { eventKey: 'table', title: 'Planilla', Component: TarjetasTable }
    ];

    return (
        <ModuleViewLayout
            title="Tarjetas"
            icon={FaCreditCard}
            tabs={tabData}
        />
    );
};

export default TarjetasView;
