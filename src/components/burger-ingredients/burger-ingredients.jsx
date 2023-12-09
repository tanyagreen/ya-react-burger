import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ingredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsGroup from './bi-group/bi-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { IngredientKind } from '../../constants/ingredientKind';
import { getIngredientsByType } from '../../services/ingredients';
import { clear, getSelectedIngredient } from '../../services/details';

const tabs = [
    {
        id: IngredientKind.BUN,
        text: 'Булки',
    },
    {
        id: IngredientKind.MAIN,
        text: 'Начинки',
    },
    {
        id: IngredientKind.SAUCE,
        text: 'Соусы',
    },

];


function BurgerIngredients() {

    const [currentTab, setCurrentTab] = React.useState(IngredientKind.BUN);

    const wrapperRef = React.useRef(null);
    const groupsRef = React.useRef([]);
    
    const refCallback = React.useCallback((element) => {
        if (element) {
            groupsRef.current.push(element);
        }
      }, []);

    const onScroll = React.useCallback(() => {
        
        const minLengthGroup = groupsRef.current.reduce(
            (min, elem) => {
                const numElem = Math.abs(wrapperRef.current.getBoundingClientRect().y - elem.getBoundingClientRect().y);
                const minElem = Math.abs(wrapperRef.current.getBoundingClientRect().y - min.getBoundingClientRect().y); 
               return (numElem < minElem ? elem : min)
            }, groupsRef.current[0]
        );

        setCurrentTab(minLengthGroup.id)

    }, []);

    const dispatch = useDispatch();
       
    const selectedIngredient = useSelector(getSelectedIngredient);

    const onClose = React.useCallback(() => {
        dispatch(clear());
    }, [dispatch]);

    return (
        <div className={`${ingredientsStyles.wrapper} mt-10`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={`${ingredientsStyles.tabsWrapper} mt-5 mb-10`}>
                {tabs.map((tab) => {
                    return (
                        <Tab
                            value={tab.id}
                            active={currentTab === tab.id}
                            key={tab.id}
                            onClick={() => setCurrentTab(tab.id)}
                        >
                            {tab.text}
                        </Tab>
                    );
                })}
            </div>
            <div className={`${ingredientsStyles.mainWrapper} сute-scroll`} ref={wrapperRef} onScroll={onScroll}>
                {
                    tabs.map(tab => {
                        return (
                            <BurgerIngredientsGroup 
                                title={tab.text} 
                                ref={refCallback} 
                                id={tab.id} 
                                key={tab.id}
                            /> 
                        );
                    })
                }
            </div>
            { selectedIngredient &&
                <Modal title='Детали ингридиента' onClose={onClose}>
                    <IngredientDetails/>
                </Modal>
            }
        </div>
    );
}

export default BurgerIngredients;
