import React from 'react';
import burgerContructorStyles from '../burger-constructor.module.css';
import burgerElementStyles from './bc-element.module.css';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../../utils/data-prop-type';
import { useDispatch } from 'react-redux';
import { deleteItem, sorting } from '../../../services/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';


const BurgerConstructorElement = React.memo((props) => {
    const { ingredient, index } = props;
    const idkey = ingredient.key;
    const dispatch = useDispatch();

    const deleteHandle = () => {
        dispatch(deleteItem(ingredient.key))
    }

    const ref = React.useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingridientSorted',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
            return
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          // Determine mouse position
          const clientOffset = monitor.getClientOffset()
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          // Time to actually perform the action
          dispatch(sorting({dragIndex, hoverIndex}))
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex
        },
      })

    const [{ isDragging }, drag] = useDrag({
        type: 'ingridientSorted',
        item: () => {
          return { idkey, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })

    drag(drop(ref));

    return(
        <div ref={ref}  data-handler-id={handlerId} style={{opacity: isDragging ? 0 : 1}} className={burgerElementStyles.wrapper}>
            <span className={burgerElementStyles.dragIcon}><DragIcon type='primary' /></span>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                extraClass={burgerContructorStyles.card}
                handleClose={deleteHandle}
            />
        </div>
    )
})

BurgerConstructorElement.propTypes = {
    ingredient: ingredientType.isRequired,
    index: PropTypes.number.isRequired,
};

export default BurgerConstructorElement;