import { createId } from "@paralleldrive/cuid2";
import { customType } from "drizzle-orm/pg-core";

const cuid = customType<{ data: string }>({
  dataType() {
    return createId();
  },
});

export default cuid;
