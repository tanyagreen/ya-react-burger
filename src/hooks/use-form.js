import { useState, useCallback } from 'react';

const useForm = (initState = {}, onChange) => {
    const [stateInputs, setStateInputs] = useState(initState);

    const handleChange = useCallback(
        (e = null) => {
            setStateInputs((stateInputs) => ({ ...stateInputs, [e.target.name]: e.target.value }));
            if (typeof onChange === 'function') {
                onChange(e);
            }
        },
        [onChange]
    );

    const clearForm = useCallback(() => {
        setStateInputs(initState);
    }, [initState]);

    const disableSubmit = Object.values(stateInputs).some((val) => val === '');

    return { stateInputs, handleChange, disableSubmit, clearForm };
};

export default useForm;
