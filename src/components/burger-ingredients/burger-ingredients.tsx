import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsGroup from './bi-group/bi-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { EIngredientKind } from '../../services/types/ingredient-type';

export interface ITab {
    id: EIngredientKind;
    text: string;
}

const tabs: ITab[] = [
    {
        id: EIngredientKind.BUN,
        text: 'Булки',
    },
    {
        id: EIngredientKind.MAIN,
        text: 'Начинки',
    },
    {
        id: EIngredientKind.SAUCE,
        text: 'Соусы',
    },
];

function BurgerIngredients(): JSX.Element {
    const [currentTab, setCurrentTab] = React.useState<string>(EIngredientKind.BUN);

    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const groupsRef = React.useRef<HTMLDivElement[]>([]);

    const refCallback = React.useCallback((element: HTMLDivElement): void => {
        if (element) {
            groupsRef.current = [...groupsRef.current, element];
        }
    }, []);

    const onScroll = React.useCallback((): void => {
        if (wrapperRef.current == null) {
            return;
        }
        const minLengthGroup = groupsRef.current.reduce((min, elem): HTMLDivElement => {
            if (wrapperRef.current === null || elem == null || min == null) {
                return min;
            }
            const numElem = Math.abs(wrapperRef.current.getBoundingClientRect().y - elem.getBoundingClientRect().y);
            const minElem = Math.abs(wrapperRef.current.getBoundingClientRect().y - min.getBoundingClientRect().y);
            return numElem < minElem ? elem : min;
        });

        if (minLengthGroup) {
            setCurrentTab(minLengthGroup.id);
        }
    }, []);

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
                {tabs.map((tab) => {
                    return <BurgerIngredientsGroup title={tab.text} ref={refCallback} id={tab.id} key={tab.id} />;
                })}
            </div>
        </div>
    );
}

export default BurgerIngredients;
