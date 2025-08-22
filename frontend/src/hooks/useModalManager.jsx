import { useState } from 'react';

export const useModalManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalHeader, setModalHeader] = useState('');

    const openModal = (header, content) => {
        setModalHeader(header);
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return {
        showModal,
        modalContent,
        modalHeader,
        openModal,
        closeModal
    };
};
