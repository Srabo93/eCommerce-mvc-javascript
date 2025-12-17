export class Product {
  private constructor(
    private _title: string,
    private _description: string,
    private _price: number,
    private _image: string,
    private _rating: number,
  ) {}

  public updateTotalRating(newRating: number) {
    if (newRating <= 0) {
      throw new Error("New product rating cant be smaller or equal 0");
    }

    if (this._rating === 0) {
      this._rating = newRating;
    }

    this._rating = (newRating + this._rating) / 2;
  }

  static create(params: {
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
  }): Product {
    const product = new Product(
      params.title,
      params.description,
      params.price,
      params.image,
      params.rating,
    );

    product.validate();
    return product;
  }

  private validate(): void {
    this.setTitle(this._title);
    this.setDescription(this._description);
    this.setPrice(this._price);
    this.setImage(this._image);
    this.setRating(this._rating);
  }

  private setTitle(title: string) {
    if (!title || title.trim().length < 2) {
      throw new Error("Product title must be at least 2 characters");
    }
    this._title = title.trim();
  }

  private setDescription(_description: string) {
    if (!_description || _description.trim().length < 2) {
      throw new Error("Product description must be at least 2 characters");
    }
    this._description = _description.trim();
  }

  private setPrice(_price: number) {
    if (!_price && _price <= 0) {
      throw new Error("Product price cant be undefined or smaller 0");
    }
    this._price = _price;
  }

  private setImage(_image: string) {
    if (!_image || _image.trim().length < 2) {
      throw new Error("Product image url must be at least 2 characters");
    }
    this._image = _image.trim();
  }

  private setRating(_rating: number) {
    if (_rating < 0) {
      throw new Error("Product rating cant be less than 0");
    }
    this._rating = _rating;
  }

  get title(): string {
    return this._title;
  }
  get description(): string {
    return this._description;
  }
  get price(): number {
    return this._price;
  }
  get image(): string {
    return this._image;
  }
  get rating(): number {
    return this._rating;
  }
}
