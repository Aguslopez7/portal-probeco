import ModuleViewLayout from '@layouts/ModuleViewLayout';

import EventosForm from '@modules/eventos/EventosForm';
import EventosTable from '@modules/eventos/EventosTable';

import { IoCalendarSharp } from "react-icons/io5";

const EventosView = () => {
    const tabData = [
        { eventKey: 'form', title: 'Formulario', Component: EventosForm },
        { eventKey: 'table', title: 'Planilla', Component: EventosTable }
    ];

    return (
        <ModuleViewLayout
            title={'Eventos'}
            icon={IoCalendarSharp}
            tabs={tabData}
        />
    );
};

export default EventosView;