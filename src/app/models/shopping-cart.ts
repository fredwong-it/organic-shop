import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        // initialize the items from the itemsMap object
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
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

    // calculate the total price from the items total price
    get totalPrice() {
        let price = 0;

        for (const productId in this.items) {
            price += this.items[productId].totalPrice;
        }

        return price;
    }
}
