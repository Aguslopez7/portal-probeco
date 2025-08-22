import React from 'react';

import { Button } from 'react-bootstrap';

import ExportTableButton from '@components/table/ExportTableButton';

import { useTable } from '@context/TableContext';

import useResponsive from '@hooks/useResponsive';

import { LuFilterX } from 'react-icons/lu';
import { TbWindowMaximize } from 'react-icons/tb';

const TableTopBar = ({ data, headers, filename, setIsExpanded, customButtons = [] }) => {
    const { isSmallDevice } = useResponsive();
    const { setRemoveAllFilters, columnFilters } = useTable();
    const totalActiveFilters = Number(localStorage.getItem('totalActiveFilters')) || 0;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'end', marginBottom:'5px', gap:'8px'}}>
            <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems:'end' }}>
                {customButtons.length > 0 && customButtons.map((btn, index) => (
                    <React.Fragment key={index}>
                        {typeof btn === 'function' ? btn() : btn}
                    </React.Fragment>
                ))}

                {totalActiveFilters > 0 && (
                    <Button
                        onClick={() => setRemoveAllFilters(true)}
                        size="sm"
                        variant="light"
                        className="small-btn m-1"
                    >
                        <LuFilterX style={{ marginRight: '5px' }} size={18} />
                        Remover Filtros ({totalActiveFilters})
                    </Button>
                )}
            </div>
            <div style={{ marginLeft: !isSmallDevice && 'auto', display: 'flex', gap: '8px', minWidth: !isSmallDevice && '115px', justifyContent: 'right', backgroundColor: 'var(--table-header-bg)', borderRadius: '8px', padding:'5px' }}>
                {!isSmallDevice && (
                    <ExportTableButton
                        data={data}
                        headers={headers}
                        filename={filename}
                    />
                )}
                <Button
                    onClick={() => setIsExpanded(true)}
                    size="sm"
                    variant="light"
                    style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}
                >
                    <TbWindowMaximize style={{ marginRight: '5px' }} size={28} />{/*Expandir*/}
                </Button>
            </div>
        </div>
    );
};

export default TableTopBar;
