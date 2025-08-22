import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
// PrimeReact core styles
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

export default function EditableTable({
    show = false,
    onHide = () => {},
    title = 'Tabla Editable',
    data,
    setData,
    columns,
    requiredFields = [],
    newRowTemplate,
    sumColumn,
    initialInfoMessage,
    expandable = false,
    rowExpansionTemplate,
    onRowEditExpand,
    expandedRows,
    setExpandedRows,
    onRowEditComplete: onRowEditCompleteExternal

}) {
    const [editingRows, setEditingRows] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [validatedRows, setValidatedRows] = useState(new Set());
    const infoMsgRef = useRef(null);

    const tieneCamposVacios = (row) =>
        requiredFields.some((field) => row[field] === null || row[field] === '');

    const requiredClass = (rowData, field) =>
        validatedRows.has(rowData.id) && tieneCamposVacios(rowData) && requiredFields.includes(field)
            ? 'p-invalid'
            : '';

    const handleAdd = () => {
        const ultimaFila = data[data.length - 1];
        if (ultimaFila && tieneCamposVacios(ultimaFila)) {
            confirmDialog({
                message: 'Complete la fila actual antes de agregar una nueva.',
                header: 'Validación',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Aceptar',
                rejectLabel: 'Cancelar',
                accept: () => setEditingRows({ [ultimaFila.id]: true }),
                reject: () => setData((prev) => prev.filter((p) => p.id !== ultimaFila.id))
            });
            return;
        }

        const nueva = newRowTemplate();
        setData((prev) => [...prev, nueva]);
        setEditingRows({ [nueva.id]: true });
    };

    const handleDeleteSelected = () => {
        const idsToDelete = selectedRows.map((r) => r.id);
        setData((prev) => prev.filter((p) => !idsToDelete.includes(p.id)));
        setSelectedRows([]);
    };

    const onRowEditComplete = (e) => {
        const _data = [...data];
        const newRow = e.newData;
        const merged = newRow;

        if (tieneCamposVacios(merged)) {
            setValidatedRows((prev) => new Set(prev).add(merged.id));
            confirmDialog({
                message: 'Complete todos los campos antes de guardar.',
                header: 'Validación',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Aceptar',
                rejectLabel: 'Cancelar',
                acceptClassName: 'p-button-success',
                rejectClassName: 'p-button-danger',
                accept: () => setEditingRows({ [merged.id]: true }),
                reject: () => setData((prev) => prev.filter((p) => p.id !== merged.id))
            });
            return;
        }

        _data[e.index] = merged;
        setData(_data);

        setValidatedRows((prev) => {
            const updated = new Set(prev);
            updated.delete(merged.id);
            return updated;
        });

        setEditingRows((prev) => {
            const updated = { ...prev };
            delete updated[merged.id];
            return updated;
        });

        // ✅ Expande fila si es necesario y llama callback
        if (expandable && onRowEditExpand) {
            onRowEditExpand(merged);
        }

        // ✅ Ejecutar callback externo si existe
        if (onRowEditCompleteExternal) {
            onRowEditCompleteExternal(merged);
        }
    };

    const onRowEditCancel = (e) => {
        const cancelledRow = e.data;
        if (tieneCamposVacios(cancelledRow)) {
            setData((prev) => prev.filter((p) => p.id !== cancelledRow.id));
        }
    };

    const total = data.reduce((acc, row) => acc + (parseFloat(row[sumColumn]) || 0), 0);

    const footer = (
        <div style={{ textAlign: 'right', fontWeight: 'bold', marginRight: '3%' }}>
            Importe Total: {total.toLocaleString('es-UY', { style: 'currency', currency: 'UYU' })}
        </div>
    );

    return (
        <Dialog
            header={title}
            visible={show}
            onHide={onHide}
            style={{ width: '85vw' }}
            maximizable
            onShow={() => {
                if (show && initialInfoMessage && infoMsgRef.current) {
                    infoMsgRef.current.clear();
                    infoMsgRef.current.show([
                        {
                            severity: 'info',
                            summary: 'Información',
                            detail: initialInfoMessage,
                            closable: true,
                            sticky: true
                        }
                    ]);
                }
            }}
        >
            <ConfirmDialog />
            <Messages ref={infoMsgRef} />

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <Button
                    style={{ borderRadius: '8px' }}
                    label="Agregar Nueva Fila"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={handleAdd}
                />
                {selectedRows.length > 0 && (
                    <Button
                        style={{ borderRadius: '8px' }}
                        label={`Eliminar seleccionados (${selectedRows.length})`}
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={handleDeleteSelected}
                    />
                )}
            </div>

            <div className="card">
                <DataTable
                    value={data}
                    dataKey="id"
                    selection={selectedRows}
                    onSelectionChange={(e) => setSelectedRows(e.value)}
                    selectionMode="checkbox"
                    editMode="row"
                    editingRows={editingRows}
                    onRowEditChange={(e) => setEditingRows(e.data)}
                    onRowEditComplete={onRowEditComplete}
                    onRowEditCancel={onRowEditCancel}
                    size="small"
                    stripedRows
                    footer={footer}
                    expandedRows={expandable ? expandedRows : undefined}
                    onRowToggle={expandable ? (e) => setExpandedRows(e.data) : undefined}
                    rowExpansionTemplate={expandable ? rowExpansionTemplate : undefined}
                >
                    {expandable && <Column expander style={{ width: '3rem' }} />}
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem', textAlign: 'center' }} />
                    <Column rowEditor headerStyle={{ width: '3rem' }} />

                    {columns.map((col) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            body={col.body}
                            editor={col.editor ? (options) => col.editor(options, requiredClass) : undefined}
                        />
                    ))}
                </DataTable>
            </div>
        </Dialog>
    );
}
