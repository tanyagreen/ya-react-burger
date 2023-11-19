import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsGroup from './bi-group/bi-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/data-prop-type';

const tabs = [
    {
        id: 1,
        text: 'Булки',
    },
    {
        id: 2,
        text: 'Соусы',
    },
    {
        id: 3,
        text: 'Начинки',
    },
];

function BurgerIngredients(props) {
    const [currentTab, setCurrentTab] = React.useState(1);

    return (
        <div className={`${ingredientsStyles.wrapper} mt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={`${ingredientsStyles.tabsWrapper} mt-5 mb-10`}>
                {tabs.map((tab) => {
                    return (
                        <Tab
                            value={tab.id}
                            active={currentTab === tab.id}
                            onClick={() => setCurrentTab(tab.id)}
                            key={tab.id}
                        >
                            {tab.text}
                        </Tab>
                    );
                })}
            </div>
            <div className={`${ingredientsStyles.mainWrapper} сute-scroll`}>
                <BurgerIngredientsGroup title='Булки' data={props.data.filter((d) => d.type === 'bun')} />
                <BurgerIngredientsGroup title='Соусы' data={props.data.filter((d) => d.type === 'sauce')} />
                <BurgerIngredientsGroup title='Ингридиенты' data={props.data.filter((d) => d.type === 'main')} />
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
