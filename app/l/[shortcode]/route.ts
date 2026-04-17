import { NextResponse, type NextRequest } from "next/server"

import { getLinkBySlug } from "@/data/links"

export async function GET(request: NextRequest, context: { params: Promise<{ shortcode: string }> }) {
  const params = await context.params
  const shortcode = params?.shortcode
  if (!shortcode) {
    return new Response("Link not found", { status: 404 })
  }

  const slug = decodeURIComponent(shortcode).trim()
  if (!slug) {
    return new Response("Link not found", { status: 404 })
  }

  try {
    const link = await getLinkBySlug(slug)
    if (!link) {
      return new Response("Link not found", { status: 404 })
    }

    return NextResponse.redirect(link.url)
  } catch (error) {
    console.error("Link redirect error", error)
    return new Response("Internal server error", { status: 500 })
  }
}
