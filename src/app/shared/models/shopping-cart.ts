import { IShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: IShoppingCartItem[] = [];

  constructor(public itemsMap: { [id: string]: IShoppingCartItem }) {
    this.itemsMap = itemsMap || {}
    for (let id in itemsMap) {
      this.items.push({...itemsMap[id], key: id});
    }
  }

  getQuantity(key: string) {
    let item = this.itemsMap[key];
    return item ? item.quantity : 0;
  }

  get itemsCount() {
    let count = 0;
    for (let id in this.items) {
      count += this.items[id].quantity;
    }

    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let id in this.items) {
      sum += this.items[id].quantity * this.items[id].product.price;
    }

    return sum;
  }
}
