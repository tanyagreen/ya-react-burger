export enum EIngredientKind {
    BUN = 'bun',
    MAIN = 'main',
    SAUCE = 'sauce',
}

export interface IIngredient {
    _id: string;
    name: string;
    type: EIngredientKind;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
}

export interface IIngredientWithKey extends IIngredient {
    key: string;
}

export interface IIngredientCounter extends Record<IIngredient['_id'], number> {}

export interface IIngredientMap extends Map<IIngredient['_id'], IIngredient> {}
