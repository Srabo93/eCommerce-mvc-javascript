export class PaymentDetails {
  constructor(public status: "processing" | "in_delivery" | "delivered") {}
  public calculateTotalAmountAsDecimal(fromArrayOfItems: number[]) {
    return fromArrayOfItems.reduce((acc, val) => acc + val);
  }
}
