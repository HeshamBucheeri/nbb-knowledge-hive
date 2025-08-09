import React from "react";
import Tag from "./Tag";
import type { Doc } from "../utils/search";

type Props = {
  doc: Doc | null;
  onClose: () => void;
  related: Doc[];
};

export default function DetailDrawer({ doc, onClose, related }: Props) {
  if (!doc) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-label="Close overlay"></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl overflow-y-auto">
        <div className="p-5 border-b flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">{doc.title}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              <Tag label={doc.department} />
              <Tag label={doc.type} />
              <span className="text-xs text-gray-500">{new Date(doc.date).toLocaleString()}</span>
            </div>
          </div>
          <button className="ml-3 rounded-full px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{doc.content}</p>
          <div className="flex flex-wrap gap-2">{doc.tags.map(t => <Tag key={t} label={t} />)}</div>
          <div className="text-sm text-gray-600">
            <strong>Stakeholders:</strong> {doc.stakeholders.join(", ") || "—"}
          </div>
          <div>
            <h3 className="font-semibold mb-1">Related</h3>
            <ul className="list-disc pl-5 space-y-1">
              {related.map(r => (
                <li key={r.id}>
                  <span className="font-medium">{r.title}</span> — <span className="text-gray-600">{r.summary}</span>
                </li>
              ))}
              {related.length === 0 && <li className="text-gray-500">No related documents.</li>}
            </ul>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Comments (demo)</h3>
            <p className="text-sm text-gray-600">In a real deployment, comments would be stored securely with audit trails. This demo keeps them local.</p>
            <textarea className="w-full rounded-lg border p-2" placeholder="Add a comment (local demo only)"></textarea>
            <button className="mt-2 rounded-lg bg-nbb-red text-white px-3 py-1">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
