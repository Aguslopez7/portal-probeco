import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Dropdown, Form, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import '../styles/dropdownFilter.css';

const DropdownFilter = ({ column, columnName, data, filters, setFilters, sortConfig, setSortConfig }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Get unique values for the column
    const getUniqueValues = () => {
        if (!data || data.length === 0) return [];
        return [...new Set(data.map((item) => item[column] ?? "Unknown").filter((val) => val !== "").map((val) => val.toString()))];
    };

    // Handle checkbox filter selection
    const handleFilterChange = (value) => {
        setFilters((prevFilters) => {
            const currentFilters = prevFilters[column] || [];
            return {
                ...prevFilters,
                [column]: currentFilters.includes(value)
                    ? currentFilters.filter((item) => item !== value)
                    : [...currentFilters, value],
            };
        });
    };

    // Handle sorting
    const handleSortChange = (direction) => {
        setSortConfig({ key: column, direction });
    };

    // Select/unselect all values
    const toggleSelectAll = () => {
        const uniqueValues = getUniqueValues();
        setFilters((prevFilters) =>
            prevFilters[column]?.length === uniqueValues.length
                ? { ...prevFilters, [column]: [] } // Unselect all
                : { ...prevFilters, [column]: uniqueValues } // Select all
        );
    };

    // Filter values based on search input
    const filteredValues = getUniqueValues().filter((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentFilters = filters[column] || [];

    useEffect(() => {
        setSearchTerm("");
    }, [filters]);

    // Open dropdown and calculate position
    const toggleDropdown = () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }

        setIsOpen(true);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Button inside table */}
            <Dropdown>
                <Dropdown.Toggle ref={buttonRef} style={{ backgroundColor: "#2a2a2a", border: "none", fontWeight: "bold" }} size="sm" onClick={toggleDropdown}>
                    {columnName}
                </Dropdown.Toggle>
            </Dropdown>

            {/* Dropdown rendered outside the table using createPortal */}
            {isOpen &&
                // DropdownMenu
                ReactDOM.createPortal(
                    <div
                        ref={dropdownRef}
                        className="dropdown-filter-menu"
                        style={{
                            position: "absolute",
                            zIndex: 10000, // Ensure it's above other elements (expanded table)
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <small className="text-muted m-1">{columnName}</small>
                            <Button className="filter-btn p-1" variant="danger" size="sm" onClick={toggleDropdown}><IoClose size={20} /></Button>
                        </div>

                        <strong>Ordenar:</strong>

                        <div className="pt-2">
                            <Form.Check
                                type="radio"
                                label="Ascendente"
                                name={column}
                                onChange={() => handleSortChange("asc")}
                                checked={sortConfig.key === column && sortConfig.direction === "asc"}
                                className="mx-2"
                            />
                            <Form.Check
                                type="radio"
                                label="Descendente"
                                name={column}
                                onChange={() => handleSortChange("desc")}
                                checked={sortConfig.key === column && sortConfig.direction === "desc"}
                                className="mx-2"
                            />
                        </div>

                        <hr />
                        <strong>Filtrar:</strong>

                        <Form.Control
                            type="text"
                            size="sm"
                            placeholder={`Buscar ${columnName}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="m-2"
                            style={{ width: "auto" }}
                        />

                        <Button
                            variant="dark"
                            size="sm"
                            className="m-2 w-50 filter-btn"
                            onClick={toggleSelectAll}
                        >
                            {currentFilters.length === filteredValues.length ? "Unselect All" : "Select All"}
                        </Button>

                        {filteredValues.length === 0 ? (
                            <p className="px-2 text-muted">No filter options</p>
                        ) : (
                            filteredValues.map((value, i) => (
                                <Form.Check
                                    key={i}
                                    type="checkbox"
                                    label={value}
                                    checked={currentFilters.includes(value)}
                                    onChange={() => handleFilterChange(value)}
                                    className="mx-2"
                                />
                            ))
                        )}
                    </div>,
                    document.body // Render outside the table
                )}
        </>
    );
};

export default DropdownFilter;
