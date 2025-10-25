import React, { useEffect, useMemo, useState } from 'react';

import { Button, Card, ListGroup, Modal, OverlayTrigger, Pagination, Popover, Tab, Table, Tabs } from 'react-bootstrap';

import CustomModal from '@components/Modal';
import TableFilter from '@components/table/TableFilter';
import TableModal from '@components/table/TableModal';
import TableTopBar from '@components/table/TableTopBar';

import useCanModifyData from '@hooks/useCanModifyData';

import { tableConstants } from '@utils/constants';
import { camelCaseToLabel } from '@utils/helperMethods';
import { extractMeta } from '@utils/jsonSchemaUtils';
import { parseForSort, renderByFormat, renderKeyValue } from '@utils/moduleTableUtils';

import { FaInfoCircle } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';

import '@styles/moduleTable.css';

const ITEMS_PER_PAGE = tableConstants.ITEMS_PER_PAGE;

const ModuleTable = ({
    schema, // JSON Schema con .properties (requerido para usar format)
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
    renderPopoverContent,
    allowEditRow = true,
    allowDeleteRow = true,
    allowExportRow = false,
    customDeleteMessage = null
}) => {
    const canModify = useCanModifyData();

    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);

    const [columnNames, setColumNames] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const [isExpanded, setIsExpanded] = useState(false); // full-screen state

    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    const [isListViewModal, setIsListViewModal] = useState(false);

    const [activeTabsMap, setActiveTabsMap] = useState({});

    // Editable form setup
    useEffect(() => {
        if (selectedRow && Object.keys(selectedRow).length > 0 && modalTitle === 'Editar') {
            setModalContent(
                <EditableForm
                    selectedItemData={selectedRow}
                    isEditing={true}
                    onClose={() => setShowModal(false)}
                />
            );
            console.log('Selected Row for Edit:', selectedRow);
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

    // useEffect(() => {
    //     console.log('Schema updated in ModuleTable:', schema);
    // }, []);

    // Apply Filters & Sorting
    const filteredAndSortedData = useMemo(() => {
        let filteredData = data;

        // Filtering
        Object.keys(filters).forEach((column) => {
            const currentFilter = Array.isArray(filters[column]) ? filters[column] : [];
            if (currentFilter.length > 0) {
                filteredData = filteredData.filter((row) => currentFilter.includes(row[column]));
            }
        });

        // Sorting con format del schema
        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                const key = sortConfig.key;
                const fieldSchema = schema?.properties?.[key] || {};
                const meta = extractMeta(fieldSchema);
                const format = meta.format ?? fieldSchema.format ?? fieldSchema.type;

                const valueA = parseForSort(format, a[key]);
                const valueB = parseForSort(format, b[key]);

                if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredData;
    }, [data, filters, sortConfig, schema]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredAndSortedData, currentPage]);

    // Filters change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleViewList = (row) => {
        setModalTitle('Detalles');
        setSelectedRow(row);
        setIsListViewModal(true);
        setShowModal(true);
    };

    const handleEditRow = (row) => {
        setModalTitle('Editar');
        setSelectedRow(row);
        setShowModal(true);
    };

    const handleDeleteRow = (row) => {
        setModalTitle('¿Está seguro que desea eliminar el siguiente elemento?');
        setShowModal(true);
        setModalContent(renderDeleteConfirmation(row));  
    };

    const renderDeleteConfirmation = (row) => {
        return (
            <div>
                {!customDeleteMessage ? (
                    <ul>
                        {Object.entries(row).map(([key, value]) => (
                            <li
                                key={key}
                                className="mb-2"
                            >
                                <strong>{camelCaseToLabel(key)}: </strong>
                                {renderKeyValue(value)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{customDeleteMessage}</p>
                )}

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
            setShowModal(false);
        } else {
            await deleteEndpoint(rowId);
            setSelectedRow(null);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const renderColumnFilter = (column) => {
        return (
            <TableFilter
                column={column}
                columnName={columnNames[column] || column}
                data={data}
                filters={filters}
                setFilters={handleFilterChange}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
            />
        );
    };

    const renderTableTopBar = () => {
        return (
            <TableTopBar
                data={filteredAndSortedData}
                headers={columnKeys} // prop
                filename={filename} // prop
                setIsExpanded={setIsExpanded}
                customButtons={customButtons} // prop
            />
        );
    };

    const renderRowActionsButons = (row) => {
        return canModify ? (
            <>
                <td style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                    {allowEditRow && (
                        <Button
                            className="table-action-btn"
                            size="sm"
                            variant="dark"
                            onClick={() => handleEditRow(row)}
                        >
                            <MdEdit size={20} />
                        </Button>
                    )}
                    {allowDeleteRow && (
                        <Button
                            className="table-action-btn"
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteRow(row)}
                        >
                            <IoMdRemoveCircleOutline size={22} />
                        </Button>
                    )}
                    {allowExportRow && (
                        <Button
                            className="table-action-btn"
                            size="sm"
                            variant="danger"
                            onClick={() => alert('Proximamente...')}
                        >
                            <GrDocumentPdf size={22} />
                        </Button>
                    )}
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
        );
    };

    const renderArrayContent = (cellData, column, rowIndex, row) => {
        const activeTab = activeTabsMap[`${rowIndex}-${column}`] || '0';

        // detectar si son objetos o valores simples
        const isObjectArray = cellData.some((v) => v && typeof v === 'object' && !Array.isArray(v));

        const popoverBody = renderPopoverContent ? (
            renderPopoverContent(cellData, column, row)
        ) : isObjectArray ? (
            <Tabs
                id={`tabs-${rowIndex}-${column}`}
                activeKey={activeTab}
                onSelect={(k) =>
                    setActiveTabsMap((prev) => ({
                        ...prev,
                        [`${rowIndex}-${column}`]: k
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
                        <ul className="mb-2">
                            {Object.entries(item).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{camelCaseToLabel(key)}:</strong> {String(value)}
                                </li>
                            ))}
                        </ul>
                    </Tab>
                ))}
            </Tabs>
        ) : (
            <ul className="mb-0 ps-3">
                {cellData.map((val, i) => (
                    <li key={i}>{String(val)}</li>
                ))}
            </ul>
        );

        const popover = (
            <Popover
                id={`popover-${rowIndex}-${column}`}
                className="custom-popover"
                style={{ borderWidth: 'medium' }}
            >
                {!renderPopoverContent && (
                    <Popover.Header style={{ backgroundColor: '#6c757d', color: 'white' }}>
                        <FaInfoCircle className="icon-margin" /> Lista {column} {cellData.length}
                    </Popover.Header>
                )}
                <Popover.Body style={{ height: '100%', width: '280px', overflowY: 'auto', padding: '0px 15px 0px 5px' }}>{popoverBody}</Popover.Body>
            </Popover>
        );

        return (
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
                    {renderPopoverContent ? column : `${column} (${cellData.length})`}
                </Button>
            </OverlayTrigger>
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

    const renderTable = () => {
        const hasData = data.length > 0;

        return (
            <Card style={{ backgroundColor: 'transparent', height: '100%', border: 'none' }}>
                {/* Header siempre visible */}
                <Card.Header style={{ padding: '4px', backgroundColor: 'transparent', borderBottom: 'none' }}>{renderTableTopBar()}</Card.Header>

                {/* Body condicional */}
                <Card.Body
                    style={{
                        padding: '0',
                        height: `calc(100dvh - 62px - 32px - 50px - ${headerWidth}px)`,
                        backgroundColor: '#DCDCDC'
                    }}
                    className={`table-container ${isExpanded ? 'expanded' : ''}`}
                >
                    {hasData ? (
                        <Table
                            striped
                            bordered
                            hover
                        >
                            <thead>
                                <tr>
                                    {canModify && <th></th>}
                                    {columnKeys.map((column, index) => (
                                        <th key={index}>{renderColumnFilter(column)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, index) => (
                                    <tr key={index}>
                                        {renderRowActionsButons(row)}

                                        {columnKeys.map((column, idx) => {
                                            const cellData = row[column];
                                            const fieldSchema = schema?.properties?.[column] || {};
                                            const meta = extractMeta(fieldSchema);
                                            const format = meta.format ?? fieldSchema.format ?? fieldSchema.type ?? 'string';

                                            return (
                                                <td key={idx}>{Array.isArray(cellData) ? renderArrayContent(cellData, column, index, row) : renderByFormat(format, cellData)}</td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <FaInfoCircle
                                size={30}
                                style={{ marginRight: '10px' }}
                            />
                            <h3>No hay datos cargados para esta sección!</h3>
                        </div>
                    )}
                </Card.Body>

                {/* Footer solo si hay datos */}
                {hasData && enablePagination && <Card.Footer style={{ padding: '0', borderTop: 'none' }}>{renderPagination()}</Card.Footer>}
            </Card>
        );
    };

    const renderListModal = () => {
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

	const renderActionModal = () => {
		return (
			<CustomModal
				hideFooter={true}
				showModal={showModal}
				title={modalTitle}
				handleConfirmation={() => setShowModal(false)}
				onClose={() => setShowModal(false)}
			>
				{modalContent}
			</CustomModal>
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
            {/* Main Table */}
			{renderTable()}

			{/* List, Edit & Delete Row Modal */}
			{selectedRow &&
				showModal &&
				(isListViewModal ? renderListModal() : renderActionModal())}

			{/* Fullscreen Modal (Expanded Table View) */}
			{renderFullScreenModal()}
        </>
    );
};

export default ModuleTable;
