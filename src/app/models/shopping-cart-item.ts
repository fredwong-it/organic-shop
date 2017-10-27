import { Product } from './product';

export class ShoppingCartItem {
    // all necessary properties to render the ShoppingCartItem on shopping cart page
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    // total price calculation should be in the ShoppingCartItem object
    get totalPrice() {
        return this.quantity * this.price;
    }
}
