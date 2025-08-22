import React, { useEffect, useState } from 'react';

import { Button, Form, Offcanvas } from 'react-bootstrap';
import Select from 'react-select';

import { useTable } from '@context/TableContext';

import { FaFilter, FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import { FaSort } from 'react-icons/fa6';
import { IoMdListBox } from 'react-icons/io';

import '@styles/dropdownFilter.css';

const TableFilter = ({ column, columnName, data, filters, setFilters, sortConfig, setSortConfig }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showCanvas, setShowCanvas] = useState(false);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);

    const localStorageKey = `tableFilter_${column}`;

    const { removeAllFilters, filterKey, setColumnFilter } = useTable();

    useEffect(() => {
        if (removeAllFilters) {
            setSelectedOptions([]);
            setFilters((prev) => ({ ...prev, [column]: [] }));
        }
    }, [removeAllFilters]);

    useEffect(() => {
        if (filterKey) {
            localStorage.setItem(localStorageKey, filterKey);
        }
    }, [filterKey]);

    const getUniqueOptions = (data) => {
        if (!data || data.length === 0) return [];
        const uniqueValues = [
            ...new Set(
                data
                    .map((item) => item[column] ?? 'Unknown')
                    .filter((val) => val !== '')
                    .map((val) => val.toString())
            )
        ];
        return uniqueValues.sort((a, b) => a.localeCompare(b)).map((val) => ({ value: val, label: val }));
    };

    const getFilteredDataExcludingCurrent = () => {
        return data.filter((item) => {
            return Object.entries(filters).every(([key, values]) => {
                // Ignorar la columna actual
                if (key === column || values.length === 0) return true;
                return values.includes(item[key]?.toString());
            });
        });
    };

    const filteredDataForColumn = getFilteredDataExcludingCurrent();
    const uniqueOptions = getUniqueOptions(filteredDataForColumn);

    const handleChange = (selected) => {
        const selectedValues = selected ? selected.map((opt) => opt.value) : [];

        // Update local state and parent filter
        setSelectedOptions(selected || []);
        setFilters((prevFilters) => ({
            ...prevFilters,
            [column]: selectedValues
        }));

        setColumnFilter(column, selectedValues);

        // Save to localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(selectedValues));
    };

    useEffect(() => {
        setIsFilterEnabled(selectedOptions.length > 0);
    }, [selectedOptions]);

    useEffect(() => {
        // Try to load from localStorage
        const stored = localStorage.getItem(localStorageKey);
        const storedValues = stored ? JSON.parse(stored) : [];

        // Sync with global filter state and selected options
        if (storedValues.length > 0) {
            const mapped = storedValues.map((val) => ({ value: val, label: val }));
            setSelectedOptions(mapped);
            setFilters((prev) => ({ ...prev, [column]: storedValues }));
        } else {
            // fallback to filter state (e.g., after clear)
            const currentValues = filters[column] || [];
            const mapped = currentValues.map((val) => ({ value: val, label: val }));
            setSelectedOptions(mapped);
        }
    }, [column]);

    const handleSortChange = (direction) => {
        setSortConfig({ key: column, direction });
    };

    return (
        <>
            <Button
                style={{ whiteSpace: 'nowrap', border:'1px solid var(--table-header-bg)', width: '100%', fontWeight: isFilterEnabled ? 'bold' : '', backgroundColor: isFilterEnabled ? 'var(--button-bg-color)' : 'var(--table-header-bg)' }}
                size="md"
                onClick={() => setShowCanvas(true)}
            >
                {columnName}
                <span style={{ marginLeft: '5px' }}>{isFilterEnabled ? <FaFilter size={12} /> : <FaSort size={12} />}</span>
            </Button>

            <Offcanvas
                show={showCanvas}
                onHide={() => setShowCanvas(false)}
                placement="end"
                scroll={false}
                backdrop={true}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{columnName}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <strong>
                        <IoMdListBox
                            size={20}
                            style={{ marginRight: '5px' }}
                        />
                        Ordenar
                    </strong>

                    <div className="pt-2">
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                            <Form.Check
                                type="radio"
                                label={''}
                                name={column}
                                onChange={() => handleSortChange('asc')}
                                checked={sortConfig.key === column && sortConfig.direction === 'asc'}
                                className="mb-1"
                            />
                            <FaSortAlphaDown size={20} />
                            <strong>Asc</strong>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                            <Form.Check
                                type="radio"
                                label=""
                                name={column}
                                onChange={() => handleSortChange('desc')}
                                checked={sortConfig.key === column && sortConfig.direction === 'desc'}
                            />
                            <FaSortAlphaDownAlt size={20} />
                            <strong>Desc</strong>
                        </div>
                    </div>

                    <hr />

                    <strong>
                        <FaFilter
                            size={15}
                            style={{ marginRight: '5px' }}
                        />
                        Filtrar
                    </strong>

                    <div className="pt-2">
                        <Select
                            isMulti
                            isSearchable
                            isClearable
                            closeMenuOnSelect={false}
                            options={uniqueOptions}
                            value={selectedOptions}
                            onChange={handleChange}
                            placeholder={`Filtrar ${columnName}`}
                            menuPosition="fixed"
                            menuShouldScrollIntoView={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default TableFilter;
