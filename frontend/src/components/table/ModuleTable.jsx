import React, { useEffect, useMemo, useState } from 'react';

import { Badge, Button, Card, Modal, OverlayTrigger, Pagination, Popover, Tab, Table, Tabs } from 'react-bootstrap';

import CustomModal from '@components/Modal';
import TableFilter from '@components/table/TableFilter';
import TableModal from '@components/table/TableModal';
import TableTopBar from '@components/table/TableTopBar';

import useCanModifyData from '@hooks/useCanModifyData';

import { tableConstants } from '@utils/constants';
import { camelCaseToLabel, formatDate, isAmountFormat, isDateFormat, isReverseDateFormat, isUrl } from '@utils/helperMethods';

import { FaInfoCircle } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';

import '@styles/moduleTable.css';

const ITEMS_PER_PAGE = tableConstants.ITEMS_PER_PAGE;

const ModuleTable = ({
    data = [],
    columnKeys,
    handleModalClose,
    handleModalConfirmation,
    onDeleteOverride,
    filename,
    deleteEndpoint,
    editableForm: EditableForm,
    customButtons,
    enablePagination = true,
    headerWidth = 235,
    renderPopoverContent
}) => {
    const canModify = useCanModifyData();

    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);

    const [columnNames, setColumNames] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const [isExpanded, setIsExpanded] = useState(false); // Track full-screen state

    const [modalContent, setModalContent] = useState(null); // Track modal content
    const [modalTitle, setModalTitle] = useState(''); // Track modal title

    const [isListViewModal, setIsListViewModal] = useState(false);

    const [activeTabsMap, setActiveTabsMap] = useState({});

    const handleEditRow = (row) => {
        setModalTitle('Editar');
        setSelectedRow(row ? { ...row } : {}); // Default to an empty object
        setShowModal(true);
    };

    useEffect(() => {
        if (selectedRow && Object.keys(selectedRow).length > 0) {
            setModalContent(
                <EditableForm
                    selectedItemData={selectedRow}
                    isEditing={true}
                    onClose={() => setShowModal(false)}
                />
            );
        }
    }, [selectedRow]);

    useEffect(() => {
        if (columnKeys) {
            setColumNames(
                columnKeys.reduce((acc, key) => {
                    acc[key] = camelCaseToLabel(key);
                    return acc;
                }, {})
            );
        }
    }, [columnKeys]);

    // Apply Filters & Sorting
    const filteredAndSortedData = useMemo(() => {
        let filteredData = data;

        // Filtering Logic
        Object.keys(filters).forEach((column) => {
            const currentFilter = Array.isArray(filters[column]) ? filters[column] : []; // Make sure it's an array
            if (currentFilter.length > 0) {
                filteredData = filteredData.filter((row) => currentFilter.includes(row[column]));
            }
        });

        // Sorting Logic
        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                let valueA = a[sortConfig.key];
                let valueB = b[sortConfig.key];

                const parseValue = (val) => {
                    if (typeof val === 'string') {
                        val = val.trim();

                        if (isDateFormat(val)) {
                            const [day, month, year] = val.split('-');
                            return new Date(`${year}-${month}-${day}`);
                        }

                        if (isAmountFormat(val)) {
                            const cleaned = val.replace(/[$,%\s]/g, '');
                            if (!isNaN(cleaned)) return Number(cleaned);
                        }
                    }

                    return val;
                };

                valueA = parseValue(valueA);
                valueB = parseValue(valueB);

                if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredData;
    }, [data, filters, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredAndSortedData, currentPage]);

    // Function to handle filter changes for each column
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleViewList = (row) => {
        setModalTitle('Detalles');
        setSelectedRow(row);
        setIsListViewModal(true);
        setShowModal(true);
    };

    const handleDeleteRow = (row) => {
        console.log('Row selected for deletion:', row);
        setModalTitle('¿Está seguro que desea eliminar el siguiente elemento?');
        setShowModal(true);
        setModalContent(renderDeleteConfirmation(row));
    };

    const renderDeleteConfirmation = (row) => {
        return (
            <div>
                <ul>
                    {Object.entries(row).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> <strong style={{ color: 'red' }}>{value || '—'}</strong>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-end mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        className="me-2"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteConfirmation(row.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            </div>
        );
    };

    const handleDeleteConfirmation = async (rowId) => {
        if (typeof onDeleteOverride === 'function') {
            onDeleteOverride(rowId);
            console.log(rowId);
            setShowModal(false);
        } else {
            await deleteEndpoint(rowId);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const formatCamelCase = (key) => {
        // Transforma camelCase a "Capitalizado"
        return key
            .replace(/([A-Z])/g, ' $1') // separa camelCase
            .replace(/^./, (str) => str.toUpperCase()); // primera en mayúscula
    };

    const renderTable = () => {
        return (
            <Card style={{ backgroundColor: 'transparent', height: '100%', border: 'none' }}>
                <Card.Header style={{ padding: '4px', backgroundColor: 'transparent', borderBottom: 'none' }}>
                    <TableTopBar
                        data={filteredAndSortedData}
                        headers={columnKeys}
                        filename={filename}
                        setIsExpanded={setIsExpanded}
                        customButtons={customButtons}
                    />
                </Card.Header>
                <Card.Body
                    style={{ padding: '0', height: `calc(100dvh - 62px - 32px - 50px - ${headerWidth}px)`, backgroundColor: '#DCDCDC' }}
                    className={`table-container ${isExpanded ? 'expanded' : ''}`}
                >
                    <div>
                        <Table
                            striped
                            bordered
                            hover
                            //size='sm'
                        >
                            <thead>
                                <tr>
                                    <th></th>
                                    {canModify && <th></th>}
                                    {columnKeys.map((column, index) => (
                                        <th key={index}>
                                            <TableFilter
                                                column={column}
                                                columnName={columnNames[column] || column}
                                                data={data}
                                                filters={filters}
                                                setFilters={handleFilterChange}
                                                sortConfig={sortConfig}
                                                setSortConfig={setSortConfig}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, index) => (
                                    <tr key={index}>
                                        {canModify ? (
                                            <>
                                                <td>
                                                    <Button
                                                        className="table-action-btn"
                                                        size="sm"
                                                        style={{backgroundColor: 'var(--table-header-bg)', border: '1px solid var(--table-header-bg)'}}
                                                        onClick={() => handleEditRow(row)}
                                                    >
                                                        <MdEdit size={20} />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        className="table-action-btn"
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleDeleteRow(row)}
                                                    >
                                                        <IoMdRemoveCircleOutline size={22} />
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
                                            <td>
                                                <Button
                                                    className="table-action-btn"
                                                    size="sm"
                                                    variant="dark"
                                                    onClick={() => handleViewList(row)}
                                                >
                                                    <TiThMenu size={20} />
                                                </Button>
                                            </td>
                                        )}
                                        {columnKeys.map((column, idx) => {
                                            const cellData = row[column];
                                            let renderedValue;

                                            if (Array.isArray(cellData)) {
                                                const activeTab = activeTabsMap[`${index}-${column}`] || '0';

                                                const popover = (
                                                    <Popover
                                                        id={`popover-${index}-${column}`}
                                                        className="custom-popover"
                                                        style={{borderWidth:'medium'}}
                                                    >
                                                        {!renderPopoverContent && <Popover.Header style={{ backgroundColor: '#6c757d', color: 'white' }}>
                                                            <FaInfoCircle className="icon-margin" /> Lista {column} {!renderPopoverContent && (cellData.length)}
                                                        </Popover.Header>}
                                                        <Popover.Body style={{ height: '100%', width: '280px', overflowY: 'auto', padding: '0px 15px 0px 5px' }}>
                                                            {renderPopoverContent
                                                                ? renderPopoverContent(cellData, column, row) // custom render
                                                                : (
                                                                    <Tabs
                                                                        id={`tabs-${index}-${column}`}
                                                                        activeKey={activeTab}
                                                                        onSelect={(k) =>
                                                                            setActiveTabsMap((prev) => ({
                                                                                ...prev,
                                                                                [`${index}-${column}`]: k
                                                                            }))
                                                                        }
                                                                        className="m-2"
                                                                    >
                                                                        {cellData.map((item, i) => (
                                                                            <Tab
                                                                                eventKey={i.toString()}
                                                                                title={i + 1}
                                                                                key={i}
                                                                            >
                                                                                <ul>
                                                                                    {Object.entries(item).map(([key, value]) => (
                                                                                        <li key={key}>
                                                                                            <strong>{formatCamelCase(key)}:</strong> {String(value)}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </Tab>
                                                                        ))}
                                                                    </Tabs>
                                                                )
                                                            }
                                                        </Popover.Body>
                                                    </Popover>
                                                );

                                                renderedValue = (
                                                    <OverlayTrigger
                                                        trigger="click"
                                                        placement="auto"
                                                        overlay={popover}
                                                        rootClose
                                                    >
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                        >
                                                            <TiThMenu className="icon-margin" />
                                                            {renderPopoverContent ? column :`${column} (${cellData.length})`}
                                                        </Button>
                                                    </OverlayTrigger>
                                                );
                                            } else if (isUrl(cellData)) {
                                                renderedValue = (
                                                    <a
                                                        href={cellData}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="table-a"
                                                        style={{ color: 'blue', textDecoration: 'underline' }}
                                                    >
                                                        <FaArrowUpRightFromSquare size={12} /> Enlace
                                                    </a>
                                                );
                                            } else if (isReverseDateFormat(cellData)) {
                                                renderedValue = formatDate(cellData);
                                            } else {
                                                renderedValue = cellData;
                                            }

                                            return <td key={idx}>{renderedValue}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
                {enablePagination && <Card.Footer style={{ padding: '0', borderTop: 'none' }}>{renderPagination()}</Card.Footer>}
            </Card>
        );
    };

    const renderPagination = () => {
        if (!enablePagination) return null;

        return (
            <Pagination className="mt-2 mb-2">
                <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => setCurrentPage(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        );
    };

    const renderViewListModal = () => {
        return (
            <TableModal
                showModal={showModal}
                onClose={() => {
                    setShowModal(false);
                    setIsListViewModal(false);
                }}
                onSave={() => {
                    setShowModal(false);
                    setIsListViewModal(false);
                }}
                selectedRow={selectedRow}
                columnNames={columnNames}
                hideFooter={true}
            />
        );
    };

    const renderFullScreenModal = () => {
        return (
            <Modal
                show={isExpanded}
                onHide={() => setIsExpanded(false)}
                fullscreen
            >
                <Modal.Header closeButton>
                    <Modal.Title>{filename}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderTable()}</Modal.Body>
            </Modal>
        );
    };

    return (
        <>
            {data.length > 0 ? (
                <>
                    {renderTable()}
                    {/* {renderPagination()} */}

                    {/* Edit & Delete Row Modal (Only Authorized Roles) */}
                    {selectedRow && (
                        <CustomModal
                            hideFooter={true}
                            showModal={showModal}
                            title={modalTitle}
                            handleConfirmation={() => {
                                setShowModal(false);
                                //handleModalConfirmation();
                            }}
                            onClose={() => {
                                setShowModal(false);
                                //handleModalClose();
                            }}
                        >
                            {modalContent}
                        </CustomModal>
                    )}

                    {/* Row Details Modal (Read Only) */}
                    {isListViewModal && renderViewListModal()}

                    {/* Fullscreen Modal (Expanded Table View) */}
                    {renderFullScreenModal()}
                </>
            ) : (
                <h3>
                    <FaInfoCircle style={{ marginRight: '10px' }} />
                    No hay datos cargados para esta seccion!
                </h3>
            )}
        </>
    );
};

export default ModuleTable;
