import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    constructor(public items: ShoppingCartItem[]) {
    }

    // property to calculate the total items count
    // this part of logic should belong to ShoppingCart object
    get totalItemsCount() {
        let count = 0;

        // calculate the shoppingCartItemCount
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }

        return count;
    }
}
