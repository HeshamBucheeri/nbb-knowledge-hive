import React from "react";
import Tag from "./Tag";
import type { Doc } from "../utils/search";

type Props = {
  doc: Doc;
  onOpen: (doc: Doc) => void;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
};

// Status-driven styling (card tint + badge)
function getStatusStyles(statusRaw?: string) {
  const s = (statusRaw || "").toLowerCase();
  if (s.includes("replaced") || s.includes("cancelled") || s.includes("canceled")) {
    return {
      statusText: "Replaced / Cancelled",
      cardClass: "bg-red-50/40 border-red-100",
      badgeClass: "bg-red-50 text-red-700",
    };
  }
  return {
    statusText: "Active / Approved",
    cardClass: "bg-green-50/40 border-green-100",
    badgeClass: "bg-green-50 text-green-700",
  };
}

export default function DocumentCard({
  doc,
  onOpen,
  onBookmark,
  isBookmarked,
}: Props) {
  const { statusText, cardClass, badgeClass } = getStatusStyles((doc as any).status);
  const access = (doc as any).access ?? (doc as any).accessLevel ?? "Public";
  const hasAttachment = (doc.attachments?.length ?? 0) > 0;

  return (
    <article
      className={`rounded-2xl border p-5 shadow-card transition hover:-translate-y-[1px] hover:shadow-md ${cardClass} overflow-hidden`}
      aria-label={doc.title}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        {/* Title wraps but doesn't push the right side out */}
        <h3 className="flex-1 min-w-0 text-base font-semibold leading-6 text-nbb-teal line-clamp-2 break-words">
          {doc.title}
        </h3>

        {/* Right-side indicators stay inside card */}
        <div className="shrink-0 inline-flex items-center gap-2">
          {/* Attachment paperclip (subtle) */}
          {hasAttachment && (
            <span
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-1"
              title="Has attachment"
              aria-label="Has attachment"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="text-gray-500"
                aria-hidden="true"
              >
                <path
                  d="M21.44 11.05l-8.49 8.49a6 6 0 11-8.49-8.49l9.19-9.19a4 4 0 115.66 5.66L9.64 17.19a2 2 0 11-2.83-2.83l8.49-8.49"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Attachment</span>
            </span>
          )}

          {/* Status pill */}
          <span className={`text-[11px] px-2 py-0.5 rounded-full ${badgeClass}`}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Summary */}
      {doc.summary && (
        <p className="mt-2 line-clamp-3 text-sm text-gray-700">{doc.summary}</p>
      )}

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-gray-600">
        <span className="whitespace-nowrap">
          <strong className="font-medium text-gray-700">Department:</strong>{" "}
          {doc.department}
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="whitespace-nowrap">
          <strong className="font-medium text-gray-700">Type:</strong> {doc.type}
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="whitespace-nowrap">
          <strong className="font-medium text-gray-700">Date:</strong>{" "}
          {new Date(doc.date).toLocaleDateString()}
        </span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="whitespace-nowrap">
          <strong className="font-medium text-gray-700">Access:</strong> {access}
        </span>
      </div>

      {/* Tags */}
      {doc.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {doc.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="rounded-md bg-white/70 px-3 py-1.5 text-sm font-medium text-nbb-teal ring-1 ring-nbb-teal/20 hover:bg-white"
            onClick={() => onOpen(doc)}
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
