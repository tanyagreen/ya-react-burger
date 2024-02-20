import { ingredientsSlice, getIngredients, ingridientsInitialState } from './ingredients';

const mockedIngredients = [
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
];

describe('ingredients', () => {
    it('should return the ingredients initialstate', () => {
        expect(ingredientsSlice.reducer(undefined, {})).toEqual(ingridientsInitialState);
    });
    it('should handle ingredients pending action', () => {
        expect(ingredientsSlice.reducer(ingridientsInitialState, getIngredients.pending)).toEqual({
            ...ingridientsInitialState,
            loading: true,
        });
    });
    it('should handle ingredients fulfilled action', () => {
        expect(ingredientsSlice.reducer(ingridientsInitialState, getIngredients.fulfilled(mockedIngredients))).toEqual({
            ...ingridientsInitialState,
            ingredients: mockedIngredients,
        });
    });
    it('should handle ingredients rejected action', () => {
        expect(ingredientsSlice.reducer(ingridientsInitialState, getIngredients.rejected('Error'))).toEqual({
            ...ingridientsInitialState,
            error: 'Error',
        });
    });
});
