import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        // initialize the items from the itemsMap object
        for (const productId in itemsMap)
            this.items.push(itemsMap[productId]);
    }

    // property to calculate the total items count
    // this part of logic should belong to ShoppingCart object
    get totalItemsCount() {
        let count = 0;

        // calculate the shoppingCartItemCount
        for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }

        return count;
    } 
}
