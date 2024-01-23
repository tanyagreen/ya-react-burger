import React from 'react';
import burgerContructorStyles from '../burger-constructor.module.css';
import burgerElementStyles from './bc-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { deleteItem, sorting } from '../../../services/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { IIngredientWithKey } from '../../../utils/ingredient-type';

interface BurgerConstructorElementProps {
    ingredient: IIngredientWithKey;
    index: number;
}

type IDragItem = Pick<IIngredientWithKey, 'key'> & Pick<BurgerConstructorElementProps, 'index'>;

const BurgerConstructorElement = React.memo((props: BurgerConstructorElementProps) => {
    const { ingredient, index } = props;
    const key = ingredient.key;
    const dispatch = useDispatch();

    const deleteHandle = () => {
        dispatch(deleteItem(ingredient.key));
    };

    const ref = React.useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<IDragItem, IDragItem, { handlerId: Identifier | null }>({
        accept: 'ingridientSorted',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: IDragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            if (!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            dispatch(sorting({ dragIndex, hoverIndex }));
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingridientSorted',
        item: () => {
            return { key, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            style={{ opacity: isDragging ? 0 : 1 }}
            className={burgerElementStyles.wrapper}
        >
            <span className={burgerElementStyles.dragIcon}>
                <DragIcon type='primary' />
            </span>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                extraClass={burgerContructorStyles.card}
                handleClose={deleteHandle}
            />
        </div>
    );
});

export default BurgerConstructorElement;
