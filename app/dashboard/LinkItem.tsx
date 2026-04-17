"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Dialog from "@radix-ui/react-dialog";

import { deleteLinkAction, updateLinkAction } from "./actions";

type LinkItemProps = {
  link: {
    id: number;
    slug: string;
    url: string;
    createdAt: string | Date;
  };
};

export default function LinkItem({ link }: LinkItemProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [url, setUrl] = useState(link.url);
  const [slug, setSlug] = useState(link.slug);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const createdAt = new Date(link.createdAt);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await updateLinkAction({
      linkId: link.id,
      url,
      slug,
    });

    setIsSubmitting(false);

    if ("error" in result) {
      setError(result.error ?? "Unable to update the link.");
      return;
    }

    setEditOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setDeleteError(null);
    setIsDeleting(true);

    const result = await deleteLinkAction({ linkId: link.id });

    setIsDeleting(false);

    if ("error" in result) {
      setDeleteError(result.error ?? "Unable to delete the link.");
      return;
    }

    setDeleteOpen(false);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="pb-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="font-mono text-base">/{link.slug}</CardTitle>
            <CardDescription className="truncate">{link.url}</CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
              <Dialog.Trigger asChild>
                <Button variant="secondary" size="sm" type="button">
                  Edit
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(90vw,450px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-lg focus:outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-foreground">
                        Edit link
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                        Update the destination URL or slug for this link.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <Button variant="ghost" type="button">
                        Close
                      </Button>
                    </Dialog.Close>
                  </div>

                  <form className="mt-6 space-y-4" onSubmit={handleUpdate}>
                    <div>
                      <label
                        htmlFor={`edit-url-${link.id}`}
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Destination URL
                      </label>
                      <input
                        id={`edit-url-${link.id}`}
                        name="url"
                        type="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="https://example.com"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`edit-slug-${link.id}`}
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Slug
                      </label>
                      <input
                        id={`edit-slug-${link.id}`}
                        name="slug"
                        type="text"
                        value={slug}
                        onChange={(event) => setSlug(event.target.value)}
                        className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    {error ? (
                      <p className="text-sm text-destructive">{error}</p>
                    ) : null}

                    <div className="flex justify-end gap-2 pt-2">
                      <Dialog.Close asChild>
                        <Button variant="secondary" type="button">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save changes"}
                      </Button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
              <Dialog.Trigger asChild>
                <Button variant="destructive" size="sm" type="button">
                  Delete
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(90vw,450px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-lg focus:outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-foreground">
                        Delete link
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                        Are you sure you want to remove this link?
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <Button variant="ghost" type="button">
                        Close
                      </Button>
                    </Dialog.Close>
                  </div>

                  <div className="mt-6 space-y-4">
                    <p className="text-sm text-foreground">
                      This action cannot be undone. The link will be removed
                      from your dashboard.
                    </p>

                    {deleteError ? (
                      <p className="text-sm text-destructive">{deleteError}</p>
                    ) : null}

                    <div className="flex justify-end gap-2 pt-2">
                      <Dialog.Close asChild>
                        <Button variant="secondary" type="button">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button
                        variant="destructive"
                        type="button"
                        disabled={isDeleting}
                        onClick={handleDelete}
                      >
                        {isDeleting ? "Deleting..." : "Delete link"}
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-xs text-muted-foreground">
          Created{" "}
          {createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
