import React from "react";
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({onClose}){
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClose}/>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;