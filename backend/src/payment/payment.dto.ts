export class PaymentItemDto {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export class CreateCheckoutDto {
  items: PaymentItemDto[];
  userId: number;
}