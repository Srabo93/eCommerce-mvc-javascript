import { Product } from "./Product.ts";

export class ProductCategory {
  private constructor(
    private _title: string,
    private _description: string,
    private _products: Product[],
  ) {}

  static create(params: {
    title: string;
    description: string;
    products: Product[];
  }): ProductCategory {
    const productCategory = new ProductCategory(
      params.title,
      params.description,
      params.products,
    );

    productCategory.validate();
    return productCategory;
  }

  private validate(): void {
    this.setTitle(this._title);
    this.setDescription(this._description);
    this.setProducts(this._products);
  }

  public addProduct(product: Product) {
    if (this._products.find((p) => p.title === product.title)) {
      throw new Error("Product already exists in this category");
    }
    this._products.push(product);
  }

  public removeProduct(title: string) {
    const index = this._products.findIndex((p) => p.title === title);
    if (index === -1) {
      throw new Error("Product not found in this category");
    }
    this._products.splice(index, 1);
  }

  public productsAbovePrice(minPrice: number): Product[] {
    return this._products.filter((p) => p.price > minPrice);
  }

  public updateTitle(newTitle: string) {
    if (!newTitle || newTitle.trim().length < 2) {
      throw new Error("Category title must be at least 2 characters");
    }
    this._title = newTitle.trim();
  }

  public updateDescription(newDescription: string) {
    if (!newDescription || newDescription.trim().length < 2) {
      throw new Error("Category description must be at least 2 characters");
    }
    this._description = newDescription.trim();
  }

  private setTitle(_title: string) {
    if (!_title || _title.trim().length < 2) {
      throw new Error("Category title must be at least 2 characters");
    }
    this._title = _title.trim();
  }
  private setDescription(_description: string) {
    if (!_description || _description.trim().length < 2) {
      throw new Error("Category description must be at least 2 characters");
    }
    this._description = _description.trim();
  }
  private setProducts(_products: Product[] = []) {
    this._products = _products;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get products(): Product[] {
    return this._products;
  }
}
