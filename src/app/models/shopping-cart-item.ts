import { Product } from './product';

export class ShoppingCartItem {
    constructor(public product: Product, public quantity: number) {
    }

    // total price calculation should be in the ShoppingCartItem object
    get totalPrice() {
        return this.quantity * this.product.price;
    }
}
