import React, { createContext, useContext, useEffect, useState } from 'react';

const TableContext = createContext();

export const useTable = () => useContext(TableContext);

export const TableProvider = ({ children }) => {
    const [removeAllFilters, setRemoveAllFilters] = useState(false);
    const [tableFiltersEnabled, setTableFiltersEnabled] = useState(false);
    const [columnFilters, setColumnFilters] = useState(() => {
        const stored = localStorage.getItem('columnFilters');
        return stored ? JSON.parse(stored) : {};
    });

    const [activeFilterCount, setActiveFilterCount] = useState(0);

    const setColumnFilter = (column, values) => {
        setColumnFilters((prev) => ({
            ...prev,
            [column]: values
        }));
    };

    useEffect(() => {
        if (removeAllFilters) {
            requestAnimationFrame(() => {
                setColumnFilters({});
                setRemoveAllFilters(false);
                setActiveFilterCount(0);
                localStorage.removeItem("totalActiveFilters");
                localStorage.removeItem("columnFilters");
                Object.keys(localStorage).forEach((key) => {
                    if (key.startsWith('tableFilter_')) {
                        localStorage.removeItem(key);
                    }
                });
            });
        }
    }, [removeAllFilters]);

    useEffect(() => {
        const totalFilters = Object.values(columnFilters).reduce((acc, values) => acc + values.length, 0);
        setActiveFilterCount(totalFilters);

        // Guardar en localStorage
        localStorage.setItem('totalActiveFilters', totalFilters.toString());
        localStorage.setItem('columnFilters', JSON.stringify(columnFilters));

        console.log(columnFilters);
        console.log(totalFilters);
    }, [columnFilters]);

    return (
        <TableContext.Provider
            value={{
                removeAllFilters,
                setRemoveAllFilters,
                tableFiltersEnabled,
                setTableFiltersEnabled,
                activeFilterCount,
                columnFilters,
                setColumnFilter
            }}
        >
            {children}
        </TableContext.Provider>
    );
};
