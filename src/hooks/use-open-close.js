import React, { useEffect, useCallback } from 'react';

const useOpenClose = (initOpen = false, { onOpen, onClose } = {}) => {
    const [isOpen, setOpen] = React.useState(initOpen);

    useEffect(() => {
        setOpen(initOpen);
    }, [initOpen]);

    const toggleOpen = () => {
        isOpen ? open() : close();
    };

    const open = useCallback(
        ({ ...args }) => {
            setOpen(true);
            if (typeof onOpen === 'function') {
                onOpen({ ...args });
            }
        },
        [onOpen]
    );

    const close = useCallback(
        ({ ...args }) => {
            setOpen(false);
            if (typeof onClose === 'function') {
                onClose({ ...args });
            }
        },
        [onClose]
    );

    return { isOpen, toggleOpen, open, close };
};

export default useOpenClose;
