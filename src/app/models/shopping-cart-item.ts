import { IProduct } from "./IProduct";

export interface IShoppingCartItem {
    key: string
    product: IProduct;
    quantity: number;
}
