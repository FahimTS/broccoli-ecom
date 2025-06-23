export interface Product {
  productId: number;
  productTitle: string;
  productRate: number;
  oldPrice?: number;
  productImg: string;
  categories?: string[] | null;
}
