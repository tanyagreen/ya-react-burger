import React from 'react';
import pageStyles from './pages.module.css';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PageLink from '../components/page-link/page-link';
import useForm from '../hooks/use-form';
import { userLogin, cleanError } from '../services/user';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/loader';

function LoginPage() {

    const {stateInputs, handleChange, disableSubmit } = useForm({
        email: '',
        password: '',
    });

    const { loading, error } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(cleanError())
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(stateInputs));
    }

    return (
        <main className={pageStyles.main}>
            <h1 className='text text_type_main-large'>Вход</h1>
            <form onSubmit={handleSubmit} className={pageStyles.formWrapper}>
                <EmailInput
                    onChange={handleChange}
                    value={stateInputs?.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={stateInputs?.password}
                    name={'password'}
                    extraClass='mb-2'
                />
                {error && <h4 className='errorMessage'>{ error }</h4>}
                <Button 
                    htmlType='submit'
                    type='primary'
                    size='large'
                    extraClass='mb-20'
                    disabled={disableSubmit}
                >
                    {loading && <Loader />} Войти
                </Button>
            </form>

            <PageLink text='Вы — новый пользователь?' linkText='Зарегистрироваться' to='/register'/>
            <PageLink text='Забыли пароль?' linkText='Восстановить пароль' to='/forgot-password'/>         
        </main>
    );
}

export default LoginPage;