export interface OrderInterface {
  map?: any;
  products: number[];
}

export interface Order extends OrderInterface {
  userId?: number,
}