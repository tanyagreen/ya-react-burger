import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsGroup from './bi-group/bi-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/data-prop-type';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import useOpenClose from '../../hooks/use-open-close';

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

    const clickedIngridient = React.useRef({});

    const {isOpen, open, close} = useOpenClose(false, {
        onOpen: (ingredient) => clickedIngridient.current = ingredient,
    });

    const buns = React.useMemo(() => props.data.filter((d) => d.type === 'bun'), [props.data]);
    const sauces = React.useMemo(() => props.data.filter((d) => d.type === 'sauce'), [props.data]);
    const mains = React.useMemo(() => props.data.filter((d) => d.type === 'main'), [props.data])


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
                <BurgerIngredientsGroup title='Булки' data={buns} openModal={open} />
                <BurgerIngredientsGroup title='Соусы' data={sauces} openModal={open} />
                <BurgerIngredientsGroup title='Ингридиенты' data={mains} openModal={open}/>
            </div>
            { isOpen && 
                <Modal title='Детали ингридиента' onClose={close}>
                    <IngredientDetails ingredient={clickedIngridient.current}/>
                </Modal>
            }
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
