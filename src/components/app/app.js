import React, { useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';
import appStyles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
    const dispatch = useDispatch();
    const { ingredients, loading, error } = useSelector((store) => store.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            <Header />
            {loading ? (
                <Loader />
            ) : !loading && error ? (
                <h2>{`Ошибка ${error}`}</h2>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <main className={appStyles.main}>
                        <BurgerIngredients />
                        <BurgerConstructor data={ingredients} />
                    </main>
                </DndProvider>
            )}
        </>
    );
}

export default App;
