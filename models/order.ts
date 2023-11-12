import type { IOrderValues } from "~/types/bp";
import type { Order, OrderStatus, OrderWithoutId } from "~/types/models";

export const statuses: OrderStatus[] = [
  { id: 1, title: "Новый" },
  { id: 2, title: "Выполнен" },
];

const getStatus = (id: number): OrderStatus => {
  let status = statuses.find((status) => status.id === id);

  if (!status) {
    status = { id, title: "Неизвестный" };
  }

  return status;
};

export const BpOrderToOrder = (order: {
  id: number | string;
  values: IOrderValues;
}) => ({
  id: +order.id,
  status: getStatus(+order.values["2"][0]),
  comment: order.values["3"],
});

export const OrderToBpOrderValues = (order: Order | OrderWithoutId) => ({
  2: [order.status.id],
  3: order.comment,
});
