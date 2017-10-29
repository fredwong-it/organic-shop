import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    // itemsMap should only be accessible inside the class
    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        // initialize, set itemsMap to empty object if it is undefined
        this.itemsMap = itemsMap || {};

        // initialize the items from the itemsMap object
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            // create ShoppingCartItem
            const item = itemsMap[productId];

            // cart item with $key
            this.items.push(new ShoppingCartItem({
                ...item,                // spread operator
                $key: productId         // set $key value
            }));
        }
    }

    // property to calculate the total items count
    // this part of logic should belong to ShoppingCart object
    get totalItemsCount() {
        let count = 0;

        // calculate the shoppingCartItemCount
        // tslint:disable-next-line:forin
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

    // move the getQuantity to the shoppingCart object to make it as object oriented design
    getQuantity(product: Product) {
        //console.log('product', product);
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}
