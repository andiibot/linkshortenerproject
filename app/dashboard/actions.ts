"use server"

import { z } from "zod"

import { createLink, deleteLink, updateLink } from "@/data/links"
import { auth } from "@clerk/nextjs/server"

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const trimmed = value.trim()
        return trimmed === "" ? undefined : trimmed
      }
      return value
    },
    z
      .string()
      .min(3, "Slug must be at least 3 characters")
      .max(12, "Slug must be at most 12 characters")
      .regex(
        /^[A-Za-z0-9_-]+$/,
        "Slug may only contain letters, numbers, hyphens, and underscores"
      )
      .optional()
  ),
})

const updateLinkSchema = z.object({
  linkId: z.number(),
  url: z.string().url("Please enter a valid URL"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(12, "Slug must be at most 12 characters")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Slug may only contain letters, numbers, hyphens, and underscores"
    ),
})

const deleteLinkSchema = z.object({
  linkId: z.number(),
})

type CreateLinkInput = z.infer<typeof createLinkSchema>
type UpdateLinkInput = z.infer<typeof updateLinkSchema>
type DeleteLinkInput = z.infer<typeof deleteLinkSchema>

function generateSlug(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
  let slug = ""

  for (let i = 0; i < length; i += 1) {
    slug += chars[Math.floor(Math.random() * chars.length)]
  }

  return slug
}

export async function createLinkAction(data: CreateLinkInput) {
  const parsed = createLinkSchema.safeParse(data)

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((issue) => issue.message).join(", "),
    }
  }

  const { userId } = await auth()
  if (!userId) {
    return { error: "You must be signed in to create a link." }
  }

  let created = false
  let finalSlug = parsed.data.slug

  if (finalSlug) {
    created = await createLink({
      userId,
      url: parsed.data.url,
      slug: finalSlug,
    })
  } else {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      finalSlug = generateSlug(8)
      if (
        await createLink({
          userId,
          url: parsed.data.url,
          slug: finalSlug,
        })
      ) {
        created = true
        break
      }
    }
  }

  if (!created) {
    return {
      error: parsed.data.slug
        ? "Unable to create the link. Try a different slug."
        : "Unable to create the link. Please try again.",
    }
  }

  return { success: true }
}

export async function updateLinkAction(data: UpdateLinkInput) {
  const parsed = updateLinkSchema.safeParse(data)

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((issue) => issue.message).join(", "),
    }
  }

  const { userId } = await auth()
  if (!userId) {
    return { error: "You must be signed in to edit this link." }
  }

  const updated = await updateLink({
    userId,
    linkId: parsed.data.linkId,
    url: parsed.data.url,
    slug: parsed.data.slug,
  })

  if (!updated) {
    return {
      error:
        "Unable to update the link. Try a different slug or refresh the page.",
    }
  }

  return { success: true }
}

export async function deleteLinkAction(data: DeleteLinkInput) {
  const parsed = deleteLinkSchema.safeParse(data)

  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((issue) => issue.message).join(", "),
    }
  }

  const { userId } = await auth()
  if (!userId) {
    return { error: "You must be signed in to delete this link." }
  }

  const deleted = await deleteLink({
    userId,
    linkId: parsed.data.linkId,
  })

  if (!deleted) {
    return {
      error: "Unable to delete the link. Please refresh and try again.",
    }
  }

  return { success: true }
}
