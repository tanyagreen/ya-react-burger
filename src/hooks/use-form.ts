import { useState, useCallback, ChangeEvent } from 'react';

const useForm = <T = {}>(initState: T, onChange?: (e?: ChangeEvent<HTMLInputElement>) => void) => {
    const [stateInputs, setStateInputs] = useState(initState);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
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

    const disableSubmit = Object.values(stateInputs as {}).some((val) => val === '');

    return { stateInputs, handleChange, disableSubmit, clearForm };
};

export default useForm;
