import React from 'react';
import { CSVLink } from 'react-csv';
import Button from 'react-bootstrap/Button';
import { TbTableExport } from "react-icons/tb";
import { GrDocumentCsv } from "react-icons/gr";
const ExportTableButton = ({ data, headers, filename }) => {
    const uruguayTimestamp = new Date().toLocaleString("en-GB", { 
        timeZone: "America/Montevideo",
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        hour12: false // Use 24-hour format
    }).replace(/,/g, '-');

    const fileNameSuffix = "_" + uruguayTimestamp + ".csv"
    
    return (
        <Button 
            variant="light" 
            size="sm" 
            //className="small-btn m-1"
            className='export-btn'
            style={{backgroundColor:'transparent', color:'white', border:'none'}}
            >
            <CSVLink
                data={data}
                headers={headers}
                filename={filename + fileNameSuffix}
            >
                <GrDocumentCsv style={{ marginRight: "5px" }} size={23}/>{/*Exportar*/}
            </CSVLink>
        </Button>
    );
};

export default ExportTableButton;
