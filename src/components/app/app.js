import React, { useState, useEffect } from 'react';
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import { data } from '../../utils/data';

function App() {
    const [ingridients, setData] = useState([]);

    useEffect(() => {
        setData(data);
    }, []);

    return (
        <>
            <Header />
            {data.length > 0 && (
                <main className={appStyles.main}>
                    <BurgerIngredients data={ingridients} />
                    <BurgerConstructor data={ingridients} />
                </main>
            )}
        </>
    );
}

export default App;
