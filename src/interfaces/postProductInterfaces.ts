export interface Product {
  name: string;
  amount: string,
}

export interface ProductInterface extends Product {
  id: number
}