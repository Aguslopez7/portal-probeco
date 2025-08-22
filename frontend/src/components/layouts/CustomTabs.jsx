import { useEffect, useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { FaChevronRight } from 'react-icons/fa';

import '@styles/customTabs.css';

function CustomTabs({ tabs }) {
    const [key, setKey] = useState(() => {
        const hash = window.location.hash.replace('#', '');
        return tabs.some((tab) => tab.eventKey === hash) ? hash : tabs[0].eventKey;
    });

    useEffect(() => {
        window.location.hash = key;
    }, [key]);

    return (
        <div className="tabs-scroll-container">
            <Tabs
                id="custom-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-2 scrollable-tabs"
            >
                {tabs.map(({ eventKey, title, Component }) => (
                    <Tab
                        key={eventKey}
                        eventKey={eventKey}
                        title={title}
                    >
                        <Component />
                    </Tab>
                ))}
            </Tabs>
            <div className="tabs-scroll-arrow">
                <FaChevronRight size={20} />
            </div>
        </div>
    );
}

export default CustomTabs;
