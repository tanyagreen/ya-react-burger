import {
    burgerConstructorInitialState,
    addItem,
    addBun,
    deleteItem,
    sorting,
    clean,
    burgerConstructorSlice,
} from './burger-constructor';
import { rootReducer } from './store';

const mockedConstructor = {
    ingredients: [
        {
            _id: 1,
            type: 'main',
            key: 1,
        },
        {
            _id: 2,
            type: 'sauce',
            key: 2,
        },
    ],
    bun: {
        _id: 3,
        type: 'bun',
        key: 3,
    },
};

describe('burgerConstructor', () => {
    it('should return the initialstate', () => {
        expect(burgerConstructorSlice.reducer(undefined, {})).toEqual(burgerConstructorInitialState);
    });

    it('should handle AddItem action when store.ingredients is empty', () => {
        expect(
            burgerConstructorSlice.reducer(burgerConstructorInitialState, addItem(mockedConstructor.ingredients[0]))
        ).toEqual({
            ...burgerConstructorInitialState,
            ingredients: Array(mockedConstructor.ingredients[0]),
        });
    });

    it("should handle AddItem action when store.ingredients isn't empty", () => {
        expect(
            burgerConstructorSlice.reducer(
                {
                    ...burgerConstructorInitialState,
                    ingredients: Array(mockedConstructor.ingredients[0]),
                },
                addItem(mockedConstructor.ingredients[1])
            )
        ).toEqual({
            ...burgerConstructorInitialState,
            ingredients: mockedConstructor.ingredients,
        });
    });

    it('should handle AddBun action', () => {
        expect(burgerConstructorSlice.reducer(burgerConstructorInitialState, addBun(mockedConstructor.bun))).toEqual({
            ...burgerConstructorInitialState,
            bun: mockedConstructor.bun,
        });
    });

    it('should handle AddBun action when bun exists', () => {
        expect(
            burgerConstructorSlice.reducer(
                {
                    ...burgerConstructorInitialState,
                    bun: 'bun',
                },
                addBun(mockedConstructor.bun)
            )
        ).toEqual({
            ...burgerConstructorInitialState,
            bun: mockedConstructor.bun,
        });
    });

    it('should handle deleteItem action', () => {
        expect(
            burgerConstructorSlice.reducer(
                {
                    ...burgerConstructorInitialState,
                    ingredients: mockedConstructor.ingredients,
                },
                deleteItem(1)
            )
        ).toEqual({
            ...burgerConstructorInitialState,
            ingredients: Array(mockedConstructor.ingredients[1]),
        });
    });

    it('should handle sorting action', () => {
        expect(
            burgerConstructorSlice.reducer(
                {
                    ...burgerConstructorInitialState,
                    ingredients: mockedConstructor.ingredients,
                },
                sorting({ dragIndex: 1, hoverIndex: 0 })
            )
        ).toEqual({
            ...burgerConstructorInitialState,
            ingredients: [
                {
                    _id: 2,
                    type: 'sauce',
                    key: 2,
                },
                {
                    _id: 1,
                    type: 'main',
                    key: 1,
                },
            ],
        });
    });

    it('should handle clean action', () => {
        expect(burgerConstructorSlice.reducer(mockedConstructor, clean())).toEqual(burgerConstructorInitialState);
    });
});
