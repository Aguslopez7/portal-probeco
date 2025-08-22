import React from 'react';
import CustomTab from '../../components/layouts/CustomTabs';

const ModuleViewLayout = ({ title, icon: Icon, tabs }) => {

    return (
        <div className='module-view-layout-wrapper'>
            <h1>{Icon && <Icon style={{ marginRight: '10px' }} />}{title}</h1>
            <br />
            <CustomTab tabs={tabs} />
        </div>
    );
};

export default ModuleViewLayout;
