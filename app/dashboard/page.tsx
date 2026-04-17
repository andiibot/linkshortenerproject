import { getLinksByUserId } from "@/data/links"
import { auth } from "@clerk/nextjs/server"

import CreateLinkDialog from "./CreateLinkDialog"
import LinkItem from "./LinkItem"

export default async function DashboardPage() {
  const { userId } = await auth()

  const userLinks = await getLinksByUserId(userId!)

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {userLinks.map((link) => (
            <li key={link.id}>
              <LinkItem link={link} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
