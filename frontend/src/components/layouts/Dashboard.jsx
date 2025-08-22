import React, { useEffect, useRef, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { createSwapy } from 'swapy';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

// 🔹 Funciones para generar datos random
const randomBarData = () => ({
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            label: 'Demo',
            data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)),
            backgroundColor: '#b36f6f'
        }
    ]
});

const randomPieData = () => ({
    labels: ['X', 'Y', 'Z'],
    datasets: [
        {
            data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)),
            backgroundColor: ['#b36f6f', '#653532', '#f9f5dc']
        }
    ]
});

const randomLineData = () => ({
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
        {
            label: 'Serie 1',
            data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)),
            borderColor: '#b36f6f',
            backgroundColor: '#b36f6f',
            fill: false
        }
    ]
});

const Dashboard = () => {
    const containerRef = useRef(null);
    const swapy = useRef(null);
    const [slots, setSlots] = useState(Array(9).fill(null));
    const [clockValue, setClockValue] = useState(new Date());

    useEffect(() => {
        if (containerRef.current) {
            swapy.current = createSwapy(containerRef.current);
        }
        return () => swapy.current?.destroy();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setClockValue(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAddWidget = (type) => {
        setSlots((prev) => {
            const nextEmpty = prev.findIndex((slot) => slot === null);
            if (nextEmpty === -1) return prev;
            const updated = [...prev];

            if (type === 'bar') updated[nextEmpty] = { type, data: randomBarData() };
            else if (type === 'pie') updated[nextEmpty] = { type, data: randomPieData() };
            else if (type === 'line') updated[nextEmpty] = { type, data: randomLineData() };
            else if (type === 'clock') updated[nextEmpty] = { type };
            else if (type === 'calendar') updated[nextEmpty] = { type };

            return updated;
        });
    };

    const renderChart = (chart) => {
        if (!chart) return <span className="empty-slot">Vacío</span>;
        const { type, data } = chart;

        if (type === 'bar')
            return (
                <Bar
                    data={data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            );
        if (type === 'pie')
            return (
                <Pie
                    data={data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            );
        if (type === 'line')
            return (
                <Line
                    data={data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            );
        if (type === 'clock')
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Clock
                        value={clockValue}
                        size={140}
                        renderNumbers
                    />
                </div>
            );
        if (type === 'calendar') return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Calendar selectRange/>
            </div>
        );

        return <span className="empty-slot">Vacío</span>;
    };

    return (
        <div className="dashboard-container">
            <div
                className="dashboard"
                ref={containerRef}
            >
                {slots.map((chart, idx) => (
                    <div
                        key={idx}
                        data-swapy-slot={`slot-${idx}`}
                        className="slot"
                    >
                        <div
                            data-swapy-item={`item-${idx}`}
                            className="slot-content"
                        >
                            <div className="chart-wrapper">{renderChart(chart)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <SpeedDial
                ariaLabel="Widget Selector"
                sx={{ position: 'absolute', bottom: 10, right: 10 }}
                icon={<SpeedDialIcon />}
                direction="up"
            >
                <SpeedDialAction
                    icon={<BarChartIcon />}
                    tooltipTitle="Bar Chart"
                    onClick={() => handleAddWidget('bar')}
                />
                <SpeedDialAction
                    icon={<PieChartIcon />}
                    tooltipTitle="Pie Chart"
                    onClick={() => handleAddWidget('pie')}
                />
                <SpeedDialAction
                    icon={<ShowChartIcon />}
                    tooltipTitle="Line Chart"
                    onClick={() => handleAddWidget('line')}
                />
                <SpeedDialAction
                    icon={<AccessTimeIcon />}
                    tooltipTitle="Clock"
                    onClick={() => handleAddWidget('clock')}
                />
                <SpeedDialAction
                    icon={<CalendarTodayIcon />}
                    tooltipTitle="Calendar"
                    onClick={() => handleAddWidget('calendar')}
                />
            </SpeedDial>
        </div>
    );
};

export default Dashboard;
