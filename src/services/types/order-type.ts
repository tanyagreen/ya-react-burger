import { IIngredient } from './ingredient-type';

type TStatusOrder = 'created' | 'pending' | 'done';
export interface IOrder {
    [key: string]: unknown;
    ingredients: IIngredient['_id'][];
    number: number;
    price: number;
    name: string;
    status: TStatusOrder;
    createdAt: Date;
    updatedAt: Date;
}
