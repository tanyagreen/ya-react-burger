import React, { useEffect } from 'react';
import pageStyles from './pages.module.css';
import { useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PageLink from '../components/page-link/page-link';
import useForm from '../hooks/use-form';
import { passwordResetReset } from '../utils/api';

function ResetPasswordPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('resetPassword')) {
            navigate('/login');
        }
    }, [navigate])

    const {stateInputs, handleChange} = useForm({
        password: '',
        token: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        passwordResetReset(stateInputs).then(() => {
            localStorage.removeItem('resetPassword')
            navigate('/login');          
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        {
            !localStorage.getItem('resetPassword') ? null 
            : (
                <main className={pageStyles.main}>
                <h1 className='text text_type_main-large'>Восстановление пароля</h1>
                <form onSubmit={handleSubmit} className={pageStyles.formWrapper}>
                <PasswordInput
                    onChange={handleChange}
                    value={stateInputs.password}
                    name={'password'}
                    placeholder='Введите новый пароль'
                    extraClass='mb-2'
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={stateInputs.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
    
                <Button 
                    type='primary' 
                    size='large' 
                    extraClass='mb-20'
                    htmlType='submit'
                >
                    Сохранить
                </Button>
                </form>
    
                <PageLink text='Вспомнили пароль?' linkText='Войти' to='/login'/>
           
            </main>
            )
        }
        </>
    );
}

export default ResetPasswordPage;