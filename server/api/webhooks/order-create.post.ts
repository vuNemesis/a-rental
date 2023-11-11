import type { IStore } from "~/types/bp";

import { STORE_CATALOG_ID } from "~/constants/bp";

export default defineEventHandler(async (event) => {
  try {
    const {
      payload: { catalogId, recordId, values },
    } = await readBody(event);

    const data: IStore = {
      3: [{ catalogId, recordId }],
      4: values["3"],
    };

    await event.context.$bp.postRecord(STORE_CATALOG_ID, data);
  } catch (e: Error | any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message || "Create Store error!",
    });
  }
});
