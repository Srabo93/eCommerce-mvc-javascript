import { assertEquals, assert } from "@std/assert";
import { Cart } from "@application/Cart.ts";
import { Product } from "@application/Product.ts";

Deno.test("Cart creation with empty items", () => {
  const cart = Cart.create({});
  assertEquals(cart.items.length, 0);
  assertEquals(cart.totalQuantity, 0);
  assertEquals(cart.totalPrice, 0);
});

Deno.test("Add product to cart", () => {
  const cart = Cart.create({});
  const product = Product.create({
    title: "Laptop",
    description: "High-end laptop",
    price: 1000,
    image: "laptop.png",
    rating: 4,
  });

  cart.addProduct(product, 2);
  assertEquals(cart.items.length, 1);
  assertEquals(cart.totalQuantity, 2);
  assertEquals(cart.totalPrice, 2000);
  assert(cart.hasProduct("Laptop"));
});

Deno.test("Add same product increments quantity", () => {
  const cart = Cart.create({});
  const product = Product.create({
    title: "Laptop",
    description: "High-end laptop",
    price: 1000,
    image: "laptop.png",
    rating: 4,
  });

  cart.addProduct(product, 1);
  cart.addProduct(product, 3);

  assertEquals(cart.items.length, 1);
  assertEquals(cart.totalQuantity, 4);
  assertEquals(cart.totalPrice, 4000);
});

Deno.test("Remove product partially and fully", () => {
  const cart = Cart.create({});
  const product = Product.create({
    title: "Laptop",
    description: "High-end laptop",
    price: 1000,
    image: "laptop.png",
    rating: 4,
  });

  cart.addProduct(product, 5);

  // remove partial quantity
  cart.removeProduct("Laptop", 2);
  assertEquals(cart.totalQuantity, 3);
  assertEquals(cart.totalPrice, 3000);

  // remove remaining quantity
  cart.removeProduct("Laptop");
  assertEquals(cart.items.length, 0);
  assertEquals(cart.totalQuantity, 0);
  assertEquals(cart.totalPrice, 0);
});

Deno.test("Remove non-existing product does nothing", () => {
  const cart = Cart.create({});
  const product = Product.create({
    title: "Laptop",
    description: "High-end laptop",
    price: 1000,
    image: "laptop.png",
    rating: 4,
  });

  cart.addProduct(product, 1);
  cart.removeProduct("Phone");

  assertEquals(cart.items.length, 1);
  assertEquals(cart.totalQuantity, 1);
});

Deno.test("Clear cart empties items", () => {
  const cart = Cart.create({});
  const product1 = Product.create({
    title: "Laptop",
    description: "High-end laptop",
    price: 1000,
    image: "laptop.png",
    rating: 4,
  });

  const product2 = Product.create({
    title: "Mouse",
    description: "Wireless mouse",
    price: 50,
    image: "mouse.png",
    rating: 4,
  });

  cart.addProduct(product1, 2);
  cart.addProduct(product2, 3);

  cart.clear();

  assertEquals(cart.items.length, 0);
  assertEquals(cart.totalQuantity, 0);
  assertEquals(cart.totalPrice, 0);
});
