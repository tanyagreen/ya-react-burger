import React from 'react';
import ReactDOM  from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

function Modal(props){

    const { children, title, onClose } = props;

    React.useEffect(() => {
        const handleKeyDown =  e => {
            if (e.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose]);

    return ReactDOM.createPortal(
            (
                <div className={modalStyles.wrapper}>
                    <div className={`${modalStyles.modal} pl-10 pr-10 pt-10 pb-15`}>
                        <div className={modalStyles.header}>
                            <p className="text text_type_main-large">{title}</p>
                            <span className={modalStyles.icon}>
                            <CloseIcon type="primary" onClick={onClose} />
                            </span>
                        </div>
                        <div className={modalStyles.content}>
                            {children}
                        </div>
                    </div>
                </div>                               
            ), 
            modalRoot
        );
}

Modal.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}

export default Modal;