import React, { SyntheticEvent } from 'react';
import pageStyles from './pages.module.css';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PageLink from '../components/page-link/page-link';
import useForm from '../hooks/use-form';
import { userRegister, cleanError } from '../services/user';
import { useDispatch, useSelector } from '../services/store';
import Loader from '../components/loader/loader';
import { IUser } from '../services/types/user-type';

function RegisterPage() {
    const { stateInputs, handleChange, disableSubmit } = useForm<IUser>({
        name: '',
        email: '',
        password: '',
    });

    const { loading, error } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(cleanError());
    }, [dispatch]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(userRegister(stateInputs));
    };

    return (
        <main className={pageStyles.main}>
            <h1 className='text text_type_main-large'>Регистрация</h1>
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
                    extraClass='ml-1'
                />
                <EmailInput onChange={handleChange} value={stateInputs.email} name={'email'} isIcon={false} />
                <PasswordInput
                    onChange={handleChange}
                    value={stateInputs.password || ''}
                    name={'password'}
                    extraClass='mb-2'
                />

                {error && <h4 className='errorMessage'>{error}</h4>}

                <Button
                    onClick={handleSubmit}
                    htmlType='submit'
                    type='primary'
                    size='large'
                    extraClass={`'mb-20' ${pageStyles.submitButton}`}
                    disabled={disableSubmit}
                >
                    {loading && <Loader />} Зарегистрироваться
                </Button>
            </form>

            <PageLink text='Уже зарегистрированы?' linkText='Войти' to='/login' />
        </main>
    );
}

export default RegisterPage;
