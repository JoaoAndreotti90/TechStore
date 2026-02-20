export class CreateProductDto {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  features: string[];
}