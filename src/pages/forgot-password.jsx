import React from 'react';
import { useNavigate } from 'react-router-dom';
import pageStyles from './pages.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PageLink from '../components/page-link/page-link';
import useForm from '../hooks/use-form';
import { passwordReset } from '../utils/api';

function ForgotPasswordPage() {

    const {stateInputs, handleChange} = useForm({
        email: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        passwordReset(stateInputs).then(() => {
            localStorage.setItem('resetPassword', true);
            navigate('/reset-password');          
        })
        .catch(err => console.log(err));
    }

    return (
        <main className={pageStyles.main}>
            <h1 className='text text_type_main-large'>Восстановление пароля</h1>
            <EmailInput
                onChange={handleChange}
                value={stateInputs.email}
                name={'email'}
                placeholder='Укажите e-mail'
                isIcon={false}
            />
            <Button 
                htmlType='button' 
                type='primary' 
                size='large' 
                extraClass='mb-20'
                onClick={handleSubmit}
            >
                Восстановить
            </Button>

            <PageLink text='Вспомнили пароль?' linkText='Войти' to='/login'/>    
        </main>
    );
}

export default ForgotPasswordPage;