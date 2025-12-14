import { Product } from "./Product.ts";

export class CartItem {
  private constructor(
    public product: Product,
    public quantity: number = 1,
  ) {}
  static create(params: { product: Product; quantity: number }) {
    const cartItem = new CartItem(params.product, params.quantity);

    return cartItem;
  }
}
