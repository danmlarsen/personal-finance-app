import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import "server-only";

export async function getCategories() {
  const categories = await db
    .select({ name: categoriesTable.name })
    .from(categoriesTable);
  return categories.map((c) => c.name);
}
