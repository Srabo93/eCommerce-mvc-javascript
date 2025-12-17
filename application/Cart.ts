import { CartItem } from "./CartItem.ts";
import { Product } from "./Product.ts";

export class Cart {
  private constructor(private _cartItems: CartItem[]) {}

  static create(params: { cartItems?: CartItem[] }): Cart {
    const cart = new Cart(params.cartItems ?? []);

    return cart;
  }

  public addProduct(product: Product, quantity: number = 1) {
    const existing = this._cartItems.find(
      (item) => item.product.title === product.title,
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      this._cartItems.push(CartItem.create({ product, quantity }));
    }
  }

  public removeProduct(productTitle: string, quantity?: number) {
    const index = this._cartItems.findIndex(
      (item) => item.product.title === productTitle,
    );

    if (index === -1) return;

    if (quantity && quantity < this._cartItems[index].quantity) {
      this._cartItems[index].quantity -= quantity;
    } else {
      this._cartItems.splice(index, 1);
    }
  }

  public clear() {
    this._cartItems = [];
  }

  public hasProduct(productTitle: string): boolean {
    return this._cartItems.some((item) => item.product.title === productTitle);
  }

  get items(): CartItem[] {
    return this._cartItems;
  }

  get totalQuantity(): number {
    return this._cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this._cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }
}
