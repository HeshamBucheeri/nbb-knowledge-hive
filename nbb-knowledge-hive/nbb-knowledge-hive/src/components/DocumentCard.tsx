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
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow transition" aria-label={doc.title}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{doc.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${doc.accessLevel === "Confidential" ? "bg-red-50 text-red-700" : doc.accessLevel === "Restricted" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
          {doc.accessLevel}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-600">{doc.summary}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Tag label={doc.department} />
        <Tag label={doc.type} />
        {doc.tags.slice(0, 4).map(t => <Tag key={t} label={t} />)}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <time dateTime={doc.date}>{new Date(doc.date).toLocaleDateString()}</time>
        <div className="flex items-center gap-3">
          <button
            className="underline hover:no-underline"
            onClick={() => onOpen(doc)}
            aria-label={`Open ${doc.title}`}
          >
            Open
          </button>
          <button
            className="underline hover:no-underline"
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
