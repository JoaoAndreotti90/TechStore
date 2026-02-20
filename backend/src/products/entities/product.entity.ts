export class Product {
  id: number;
  name: string;
  description: string;
  fullDescription: string | null;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  badge: string | null;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}