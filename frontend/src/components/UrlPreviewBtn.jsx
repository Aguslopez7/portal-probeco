import React from 'react';

import { FaArrowUpRightFromSquare, FaFileCircleCheck, FaFileCircleExclamation } from 'react-icons/fa6';

const UrlPreviewBtn = ({ url, file }) => {
    return (
        <>
            {url && url.includes('http') && !file ? (
                <a
                    className="url-preview-link mt-2"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaArrowUpRightFromSquare
                        className="icon-margin"
                        size={15}
                    />
                    Abrir Archivo Adjunto
                </a>
            ) : (
                <p
                    style={{ textAlign: 'center', border: '1px dashed gray', borderRadius: '8px', padding:'2px' }}
                    className="mt-2"
                >
                    {file ? (
                        <>
                            <FaFileCircleCheck
                                size={18}
                                color="#27ae60"
                                className="icon-margin"
                            />
                            <span style={{ color: '#27ae60' }}>{file.name}</span>
                        </>
                    ) : (
                        <>
                            <FaFileCircleExclamation
                                size={18}
                                color="#e74c3c"
                                className="icon-margin"
                            />
                            <span style={{ color: '#e74c3c' }}>No se ha adjuntado ningún archivo.</span>
                        </>
                    )}
                </p>
            )}
        </>
    );
};

export default UrlPreviewBtn;
