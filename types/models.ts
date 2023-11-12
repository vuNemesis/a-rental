export type Order = {
  id: number;
  status: OrderStatus;
  comment: string;
};

export type OrderWithoutId = Omit<Order, "id">;

export type OrderStatus = {
  id: number;
  title: string;
};
