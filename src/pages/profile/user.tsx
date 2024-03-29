import React, { SyntheticEvent } from 'react';
import pageStyles from '../pages.module.css';
import profileStyles from './profile.module.css';
import burgerContructorStyles from '../../components/burger-constructor/burger-constructor.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/use-form';
import { useSelector, useDispatch } from '../../services/store';
import { cleanError, userPatch } from '../../services/user';
import Loader from '../../components/loader/loader';
import { IUser } from '../../services/types/user-type';

function User() {
    const { user, loading, error } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const { stateInputs, handleChange, clearForm } = useForm<IUser>(
        {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
        },
        () => {
            setSubmitShown(true);
        }
    );

    const [submitShown, setSubmitShown] = React.useState(false);

    React.useEffect(() => {
        dispatch(cleanError());
    }, [dispatch]);

    const handleClean = () => {
        setSubmitShown(false);
        clearForm();
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(userPatch(stateInputs));
    };

    return (
        <div className={pageStyles.formWrapper}>
            <form onSubmit={handleSubmit} className={pageStyles.formWrapper}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={stateInputs.name || ''}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon='EditIcon'
                    extraClass='ml-1'
                />
                <Input
                    type='email'
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={stateInputs.email}
                    name={'email'}
                    icon='EditIcon'
                />
                <PasswordInput
                    onChange={handleChange}
                    value={stateInputs.password || ''}
                    name={'password'}
                    icon='EditIcon'
                    extraClass='mb-2'
                />
                {submitShown && (
                    <div className={profileStyles.submitButtonsWrapper}>
                        <Button htmlType='button' type='secondary' size='large' onClick={handleClean}>
                            Отмена
                        </Button>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='large'
                            extraClass={burgerContructorStyles.submitButton}
                        >
                            {loading && <Loader />} Сохранить
                        </Button>
                    </div>
                )}
            </form>
            {error && <h4 className='errorMessage'>{`Ошибка ${error}`}</h4>}
        </div>
    );
}

export default User;
