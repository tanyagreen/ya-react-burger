import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd'

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import HomeStyles from './home.module.css';
;

function Home() {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={HomeStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    );
}

export default Home;