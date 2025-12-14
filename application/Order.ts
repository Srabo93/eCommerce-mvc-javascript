export class Order {
  constructor() {}

  public calculateOrderTotalAsDecimal(fromArrayOfOrderItems: number[]) {
    return fromArrayOfOrderItems.reduce((acc: number, item: number) => {
      return acc + item;
    }, 0);
  }
}
