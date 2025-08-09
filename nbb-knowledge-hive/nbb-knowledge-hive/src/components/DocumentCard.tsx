import React from "react";
import Tag from "./Tag";
import type { Doc } from "../utils/search";

type Props = {
  doc: Doc;
  onOpen: (doc: Doc) => void;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
};

export default function DocumentCard({ doc, onOpen, onBookmark, isBookmarked }: Props) {
  // Normalize access for display
  const access = doc.access ?? doc.accessLevel ?? "Public";
  const badge =
    access === "Confidential"
      ? "bg-red-50 text-red-700"
      : access === "Restricted"
      ? "bg-amber-50 text-amber-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <article
      className="rounded-xl2 border border-gray-200 bg-white p-5 shadow-card transition hover:-translate-y-[1px] hover:shadow-md"
      aria-label={doc.title}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-6 text-nbb-teal">{doc.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${badge}`}>{access}</span>
      </div>

      <p className="mt-2 text-sm text-gray-700">{doc.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tag label={doc.department} />
        <Tag label={doc.type} />
        {doc.tags.slice(0, 4).map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <time dateTime={doc.date}>{new Date(doc.date).toLocaleDateString()}</time>
        <div className="flex items-center gap-4">
          <button
            className="text-nbb-teal underline underline-offset-2 hover:no-underline"
            onClick={() => onOpen(doc)}
            aria-label={`Open ${doc.title}`}
          >
            Open
          </button>
          <button
            className="text-nbb-red underline underline-offset-2 hover:no-underline"
            onClick={() => onBookmark(doc.id)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
        </div>
      </div>
    </article>
  );
}
