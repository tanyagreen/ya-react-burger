import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from '../app-header/app-header';

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
    Home,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    Profile,
    User,
    Orders,
    NotFound404,
} from '../../pages';

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/ingredients';
import { checkUserAuth } from '../../services/user';
import Loader from '../loader/loader';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    const dispatch = useDispatch();
    const { loading, error, ingredients } = useSelector((store) => store.ingredients);

    React.useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
    }, [dispatch]);

    return (
        <>
            <Header />

            {!loading && error ? (
                <h2>{`Ошибка ${error}`}</h2>
            ) : loading || ingredients.length === 0 ? (
                <Loader />
            ) : (
                <>
                    <Routes location={background || location}>
                        <Route path='/' element={<Home />} />
                        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
                        <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                        <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
                        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
                            <Route index element={<User />} />
                            <Route path='orders' element={<Orders />} />
                        </Route>
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                    {background && (
                        <Routes>
                            <Route
                                path='/ingredients/:ingredientId'
                                element={
                                    <Modal onClose={handleModalClose}>
                                        <IngredientDetails />
                                    </Modal>
                                }
                            />
                        </Routes>
                    )}
                </>
            )}
        </>
    );
}

export default App;
