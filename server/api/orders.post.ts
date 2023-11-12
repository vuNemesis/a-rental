import { ORDER_CATALOG_ID } from "~/constants/bp";
import { OrderToBpOrderValues } from "~/models/order";
import { OrderWithoutId } from "~/types/models";

export default defineEventHandler(async (event) => {
  try {
    const order = await readBody<OrderWithoutId>(event);

    const record = await event.context.$bp.postRecord(
      ORDER_CATALOG_ID,
      OrderToBpOrderValues(order)
    );

    return record;
  } catch (e: Error | any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Create Order error!",
    });
  }
});
