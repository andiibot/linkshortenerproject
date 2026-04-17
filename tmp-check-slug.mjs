import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { links } from "./db/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);
const slug = "li-profile";

try {
  const rows = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1);
  console.log(JSON.stringify(rows, null, 2));
} catch (error) {
  console.error(error);
  process.exit(1);
}
