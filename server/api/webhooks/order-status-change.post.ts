import type { IOrder, ITestValue } from "~/types/bp";
import { TEST_REQUEST_URL } from "~/constants/bp";

export default defineEventHandler(async (event) => {
  try {
    const {
      payload: { catalogId, recordId },
    } = await readBody(event);

    const { value } = await $fetch<ITestValue>(TEST_REQUEST_URL);

    const data: Partial<IOrder> = {
      3: value,
    };

    await event.context.$bp.patchRecord(catalogId, recordId, data);
  } catch (e: Error | any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Update Order error!",
    });
  }
});
