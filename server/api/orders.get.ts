import type { IBpRecord } from "bp-api";
import type { IOrderValues } from "~/types/bp";
import { ORDER_CATALOG_ID } from "~/constants/bp";
import { BpOrderToOrder } from "~/models/order";

export default defineEventHandler(async ({ context }) => {
  try {
    const orders: IBpRecord<IOrderValues>[] = await context.$bp.getAllRecords(
      ORDER_CATALOG_ID
    );

    return {
      orders: orders.map(BpOrderToOrder),
    };
  } catch (e: Error | any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Get Orders error!",
    });
  }
});
