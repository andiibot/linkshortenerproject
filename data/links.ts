import { and, desc, eq } from "drizzle-orm"

import { db } from "@/db"
import { links } from "@/db/schema"

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt))
}

export async function createLink({
  userId,
  slug,
  url,
}: {
  userId: string
  slug: string
  url: string
}) {
  try {
    await db.insert(links).values({ userId, slug, url })
    return true
  } catch {
    return false
  }
}

export async function updateLink({
  userId,
  linkId,
  url,
  slug,
}: {
  userId: string
  linkId: number
  url: string
  slug: string
}) {
  try {
    await db
      .update(links)
      .set({ url, slug, updatedAt: new Date() })
      .where(and(eq(links.id, linkId), eq(links.userId, userId)))

    return true
  } catch {
    return false
  }
}

export async function deleteLink({
  userId,
  linkId,
}: {
  userId: string
  linkId: number
}) {
  try {
    await db
      .delete(links)
      .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    return true
  } catch {
    return false
  }
}

export async function getLinkBySlug(slug: string) {
  const normalizedSlug = slug?.trim()
  if (!normalizedSlug) {
    return null
  }

  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.slug, normalizedSlug))
    .limit(1)

  return link ?? null
}
