import { Product } from './product';

export class ShoppingCartItem {
    // all necessary properties to render the ShoppingCartItem on shopping cart page
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    // optional, object look like ShoppingCartItem with one or more properties
    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    // total price calculation should be in the ShoppingCartItem object
    get totalPrice() {
        return this.quantity * this.price;
    }
}
