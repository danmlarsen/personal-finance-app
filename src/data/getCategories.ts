import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { unstable_cache } from "next/cache";
import "server-only";

export async function getCategories() {
  const categories = await db.select().from(categoriesTable);
  return categories;
}

export function getCachedCategories() {
  return unstable_cache(
    async () => {
      return getCategories();
    },
    ["categories"],
    { tags: ["categories"], revalidate: 3600 },
  )();
}
