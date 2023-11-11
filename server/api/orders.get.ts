import type { IBpRecord } from "bp-api";
import type { IOrder } from "~/types/bp";
import { ORDER_CATALOG_ID } from "~/constants/bp";

export default defineEventHandler(async ({ context }) => {
  try {
    const records: IBpRecord<IOrder>[] = await context.$bp.getAllRecords(
      ORDER_CATALOG_ID
    );

    return {
      records,
    };
  } catch (e: Error | any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Get Orders error!",
    });
  }
});
