import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalProps {
    onClose: () => void;
}

function ModalOverlay({ onClose }: IModalProps): React.JSX.Element {
    return <div className={modalOverlayStyles.overlay} onClick={onClose} />;
}

export default ModalOverlay;
