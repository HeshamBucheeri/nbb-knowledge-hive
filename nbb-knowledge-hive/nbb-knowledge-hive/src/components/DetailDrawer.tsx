import React from "react";
import Tag from "./Tag";
import type { Doc } from "../utils/search";

type Props = {
  doc: Doc | null;
  onClose: () => void;
  related: Doc[];
};

function getStatusBadge(statusRaw?: string) {
  const s = (statusRaw || "").toLowerCase();
  if (s.includes("replaced") || s.includes("cancelled") || s.includes("canceled")) {
    return { label: "Replaced / Cancelled", cls: "bg-red-50 text-red-700" };
  }
  return { label: "Active / Approved", cls: "bg-green-50 text-green-700" };
}

export default function DetailDrawer({ doc, onClose, related }: Props) {
  if (!doc) return null;

  const { label: statusLabel, cls: statusCls } = getStatusBadge((doc as any).status);
  const access = (doc as any).access ?? (doc as any).accessLevel ?? "Public";

  // --- Attachments: dedupe + preview first PDF only ---
  const rawAttachments = doc.attachments ?? [];
  const uniqueAttachments = Array.from(new Map(rawAttachments.map(a => [a.url, a])).values());
  const pdfs = uniqueAttachments.filter(a => (a.type ?? "pdf") === "pdf");
  const firstPdf = pdfs[0];
  const listAttachments = firstPdf
    ? uniqueAttachments.filter(a => a.url !== firstPdf.url)
    : uniqueAttachments;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="Close overlay" />
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] overflow-y-auto bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b bg-white px-4 py-3">
          <div className="flex min-w-0 items-start gap-2">
            {/* FULL title (no clamp) */}
            <h2 className="min-w-0 break-words text-base font-semibold leading-6 text-nbb-teal">
              {doc.title}
            </h2>
            <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs ${statusCls}`}>
              {statusLabel}
            </span>
          </div>
          <button
            className="shrink-0 rounded-md bg-nbb-red px-3 py-1 text-sm font-medium text-white"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          {doc.summary && <p className="text-sm text-gray-700">{doc.summary}</p>}

          {/* Meta */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] text-gray-700">
            <div><strong className="text-gray-800">Department:</strong> {doc.department}</div>
            <div><strong className="text-gray-800">Type:</strong> {doc.type}</div>
            <div><strong className="text-gray-800">Date:</strong> {new Date(doc.date).toLocaleDateString()}</div>
            <div><strong className="text-gray-800">Access:</strong> {access}</div>
          </div>

          {/* Tags */}
          {!!doc.tags?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {doc.tags.map((t) => <Tag key={t} label={t} />)}
            </div>
          )}

          {/* Attachments */}
          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Attachments</h3>

            {uniqueAttachments.length === 0 && (
              <p className="text-sm text-gray-600">No attachments for this document.</p>
            )}

            {/* Inline preview for first PDF */}
            {firstPdf && (
              <div className="mb-3 overflow-hidden rounded-lg border">
                <iframe title={firstPdf.name} src={firstPdf.url} className="h-72 w-full" />
                <div className="flex items-center justify-between gap-2 p-2 text-sm">
                  <div className="truncate font-medium">{firstPdf.name}</div>
                  <div className="shrink-0 space-x-2">
                    <a href={firstPdf.url} target="_blank" rel="noopener noreferrer" className="rounded-md border px-2 py-1 hover:bg-gray-50">Open</a>
                    <a href={firstPdf.url} download className="rounded-md border px-2 py-1 hover:bg-gray-50">Download</a>
                  </div>
                </div>
              </div>
            )}

            {/* List the rest */}
            {listAttachments.length > 0 && (
              <ul className="space-y-2">
                {listAttachments.map((a) => (
                  <li key={a.url} className="flex items-center justify-between rounded-md border p-2 text-sm">
                    <span className="truncate pr-2">{a.name}</span>
                    <span className="shrink-0 space-x-2">
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="rounded-md border px-2 py-1 hover:bg-gray-50">Open</a>
                      <a href={a.url} download className="rounded-md border px-2 py-1 hover:bg-gray-50">Download</a>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Related */}
          <div className="mt-8 border-t pt-4">
            <h3 className="mb-2 font-semibold">Related</h3>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.id} className="text-sm text-nbb-teal underline underline-offset-2 hover:no-underline" title={r.title}>
                  {r.title}
                </li>
              ))}
              {related.length === 0 && <li className="text-sm text-gray-500">No related documents.</li>}
            </ul>
          </div>

          {/* Comments (demo only) */}
          <div className="border-t pt-4">
            <h3 className="mb-2 font-semibold">Comments (demo)</h3>
            <p className="text-sm text-gray-600">
              In a real deployment, comments would be stored securely with audit trails. This demo keeps them local.
            </p>
            <textarea className="mt-2 w-full rounded-lg border p-2" placeholder="Add a comment (local demo only)"></textarea>
            <button className="mt-2 rounded-lg bg-nbb-red px-3 py-1 text-white">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
