import React, { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import { INGRIDIENTS_URL } from '../../constants/urls';

function App() {
    const [ingridients, setData] = useState([]);

    useEffect(() => {
        getIngridients();
    }, []);

    const getIngridients = async () => {
        fetch(INGRIDIENTS_URL)
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header />
            {ingridients.length > 0 && (
                <main className={appStyles.main}>
                    <BurgerIngredients data={ingridients} />
                    <BurgerConstructor data={ingridients} />
                </main>
            )}
        </>
    );
}

export default App;
