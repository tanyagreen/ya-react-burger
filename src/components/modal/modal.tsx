import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';

interface IModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById('react-modals') as HTMLElement;

function Modal(props: IModalProps) {
    const { children, onClose } = props;

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={modalStyles.wrapper}>
                <div className={`${modalStyles.modal} pl-10 pr-10 pt-10 pb-15`}>
                    <div className={modalStyles.header}>
                        <span className={modalStyles.icon} data-testid='close-modal-icon'>
                            <CloseIcon type='primary' onClick={onClose} />
                        </span>
                    </div>
                    <div className={modalStyles.content}>{children}</div>
                </div>
            </div>
        </>,
        modalRoot
    );
}

export default Modal;
