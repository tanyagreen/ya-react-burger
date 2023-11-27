import React, { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';
import appStyles from './app.module.css';
import { INGRIDIENTS_URL } from '../../constants/urls';

function App() {
    const [ingridients, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getIngridients();
    }, []);

    const getIngridients = async () => {
        setLoading(true);
        await fetch(INGRIDIENTS_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Header />
            {!isLoading && ingridients.length > 0 ? (
                <main className={appStyles.main}>
                    <BurgerIngredients data={ingridients} />
                    <BurgerConstructor data={ingridients} />
                </main>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default App;
