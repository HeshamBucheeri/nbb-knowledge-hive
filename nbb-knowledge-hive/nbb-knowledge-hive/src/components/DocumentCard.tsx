import React from "react";
import Tag from "./Tag";
import type { Doc } from "../utils/search";

type Props = {
  doc: Doc & { status?: string }; // allow optional status on docs
  onOpen: (doc: Doc) => void;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
};

// Map status text -> light tints for the whole card + badge
function getStatusStyles(statusRaw?: string) {
  const status = (statusRaw || "Active / Approved").toLowerCase();

  if (status.includes("replaced") || status.includes("cancelled") || status.includes("canceled")) {
    return {
      statusText: "Replaced / Cancelled",
      // very light red background, subtle red border, readable red text
      cardClass:
        "bg-red-50/40 border-red-100",
      badgeClass:
        "bg-red-50 text-red-700",
    };
  }

  // default = active/approved
  return {
    statusText: "Active / Approved",
    // very light green background, subtle green border, readable green text
    cardClass:
      "bg-green-50/40 border-green-100",
    badgeClass:
      "bg-green-50 text-green-700",
  };
}

export default function DocumentCard({ doc, onOpen, onBookmark, isBookmarked }: Props) {
  // Keep existing access handling (used elsewhere on the card if needed)
  const access = (doc as any).access ?? (doc as any).accessLevel ?? "Public";

  // Status-driven classes
  const { statusText, cardClass, badgeClass } = getStatusStyles(doc.status);

  return (
    <article
      className={`rounded-2xl border p-5 shadow-card transition hover:-translate-y-[1px] hover:shadow-md ${cardClass}`}
      aria-label={doc.title}
    >
      {/* Title + Status badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-6 text-nbb-teal">
          {doc.title}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
          {statusText}
        </span>
      </div>

      {/* Summary */}
      {doc.summary && (
        <p className="mt-2 line-clamp-3 text-sm text-gray-700">
          {doc.summary}
        </p>
      )}

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-gray-600">
        <span className="whitespace-nowrap">
          <strong className="font-medium text-gray-700">Department:</strong> {doc.department}
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
