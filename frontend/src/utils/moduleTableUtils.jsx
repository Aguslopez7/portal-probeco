// @components/table/moduleTableUtils.js
import { Badge } from 'react-bootstrap';

import { STATUS_VARIANTS } from './constants';
import { camelCaseToLabel, formatDate, isCurrency, isReverseDateFormat, isUrl } from './helperMethods';

import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const isBlank = (value) => value == null || (typeof value === 'string' && value.trim() === '');
const matchAnyStatus = (value) => STATUS_VARIANTS.hasOwnProperty(value);

export const renderByFormat = (format, value) => {
    if (isBlank(value)) return '—';
    else if (isReverseDateFormat(value)) return formatDate(value);
    else if (isUrl(value)) {
        return (
            <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="table-a"
                style={{ color: 'blue', textDecoration: 'underline' }}
            >
                <FaArrowUpRightFromSquare size={12} /> Enlace
            </a>
        );
    } else if (isCurrency(value)) {
        const strVal = String(value).trim();

        // Detecta prefijo ($ o USD)
        let prefix = '';
        if (strVal.startsWith('$')) {
            prefix = '$';
        } else if (/^USD\s*/i.test(strVal)) {
            prefix = 'USD';
        }

        // Limpieza más segura
        const cleaned = strVal
            .replace(/[$,%\sA-Za-z]/g, '') // quita símbolos
            //.replace(/(\d)\.(?=\d{3}(,|$))/g, '$1') // quita puntos solo si son separadores de miles
            .replace(',', '.'); // normaliza decimal

        const n = Number(cleaned);
        if (Number.isFinite(n)) {
            const formatted = new Intl.NumberFormat('es-UY', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(n);
            return `${prefix} ${formatted}`;
        }
        return strVal;
    } else if (matchAnyStatus(value)) {
        const variant = STATUS_VARIANTS[String(value).toUpperCase()] ?? 'secondary';
        return <Badge bg={variant}>{String(value)}</Badge>;
    } else return String(value);

    // switch (format) {
    //     case 'url': {
    //         const s = String(value).trim();
    //         // Evita link en "No Aplica" o textos similares
    //         if (!isUrl(s) || /^no aplica$/i.test(s)) return s;
    //         return (
    //             <a
    //                 href={s}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="table-a"
    //                 style={{ color: 'blue', textDecoration: 'underline' }}
    //             >
    //                 <FaArrowUpRightFromSquare size={12} /> Enlace
    //             </a>
    //         );
    //     }

    //     case 'currency': {
    //         const strVal = String(value).trim();

    //         // Detecta prefijo ($ o USD)
    //         let prefix = '';
    //         let addSpace = false;
    //         if (strVal.startsWith('$')) {
    //             prefix = '$';
    //             addSpace = false; // sin espacio
    //         } else if (/^USD\s*/i.test(strVal)) {
    //             prefix = 'USD';
    //             addSpace = true; // con espacio
    //         }

    //         // Limpia a número: quita símbolos, letras y espacios, normaliza decimales
    //         const cleaned = strVal
    //             .replace(/[$,%\sA-Za-z]/g, '')
    //             .replace(/\./g, '')
    //             .replace(',', '.');

    //         const n = Number(cleaned);
    //         if (Number.isFinite(n)) {
    //             const formatted = new Intl.NumberFormat('es-UY', {
    //                 minimumFractionDigits: 2,
    //                 maximumFractionDigits: 2
    //             }).format(n);
    //             return `${prefix}${addSpace ? ' ' : ''}${formatted}`;
    //         }
    //         return strVal; // fallback
    //     }

    //     case 'date': {
    //         // yyyy-MM-dd -> dd-MM-yyyy
    //         const s = String(value);
    //         if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    //             const [y, m, d] = s.split('-');
    //             return `${d}-${m}-${y}`;
    //         }
    //         return s;
    //     }

    //     case 'status': {
    //         // Colores sugeridos según valor
    //         const variant = STATUS_VARIANTS[String(value).toUpperCase()] ?? 'secondary';
    //         return <Badge bg={variant}>{String(value)}</Badge>;
    //     }

    //     case 'string':
    //     default:
    //         return String(value);
    // }
};

export const parseForSort = (format, raw) => {
    if (raw == null) return null;
    const val = typeof raw === 'string' ? raw.trim() : raw;

    switch (format) {
        case 'date': {
            // soporta dd-MM-yyyy y yyyy-MM-dd
            if (typeof val === 'string') {
                if (/^\d{2}-\d{2}-\d{4}$/.test(val)) {
                    const [d, m, y] = val.split('-');
                    return new Date(`${y}-${m}-${d}`).getTime();
                }
                if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                    return new Date(val).getTime();
                }
            }
            return Number.isFinite(val) ? val : Number.NaN;
        }

        case 'currency': {
            // Unificado con render: elimina letras también
            const s = String(val)
                .replace(/[$,%\sA-Za-z]/g, '')
                .replace(/\./g, '')
                .replace(',', '.');
            const n = Number(s);
            return Number.isFinite(n) ? n : Number.NaN;
        }

        case 'number':
        case 'integer': {
            const n = Number(val);
            return Number.isFinite(n) ? n : Number.NaN;
        }

        case 'url':
        case 'string':
        default:
            return typeof val === 'string' ? val.toLowerCase() : String(val);
    }
};

export const renderKeyValue = (value) => {
    if (Array.isArray(value)) {
        return (
            <ul style={{ listStyleType: 'none' }}>
                {value.map((item, index) => (
                    <p
                        className="mb-2"
                        key={index}
                    >
                        {renderKeyValue(item)}
                    </p>
                ))}
            </ul>
        );
    } else if (typeof value === 'object' && value !== null) {
        return (
            <ul>
                {Object.entries(value).map(([subKey, subValue]) => (
                    <li
                        key={subKey}
                        className="mb-2"
                    >
                        <strong>{camelCaseToLabel(subKey)}:</strong> {renderKeyValue(subValue)}
                    </li>
                ))}
            </ul>
        );
    } else {
        return <strong style={{ color: 'red' }}>{String(value) || '—'}</strong>;
    }
};
