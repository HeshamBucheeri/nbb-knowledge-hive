import React, { useMemo, useState } from "react";
import type { Query, Doc } from "../utils/search";

type Props = {
  query: Query;
  setQuery: (q: Query) => void;
  allDocs: Doc[];
};

const departments = Array.from(
  new Set([
    "All",
    "Legal",
    "Strategy",
    "IT",
    "Operations",
    "Retail",
    "Sustainability",
    "Corporate Communications",
    "Compliance",
    "Cybersecurity",
  ])
);

const types: (Doc["type"] | "Any")[] = [
  "Any",
  "Memo",
  "Report",
  "Research",
  "Precedent",
  "Dataset",
  "Note",
];

const accessLevels: (Doc["accessLevel"] | "Any")[] = [
  "Any",
  "Public",
  "Restricted",
  "Confidential",
];

const VISIBLE_TAGS = 5;

export default function Filters({ query, setQuery, allDocs }: Props) {
  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = useMemo(
    () => Array.from(new Set(allDocs.flatMap((d) => d.tags))).sort(),
    [allDocs]
  );

  const displayedTags = showAllTags ? allTags : allTags.slice(0, VISIBLE_TAGS);

  return (
    <section
      aria-label="Filters"
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {/* Department */}
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">Department</span>
          <select
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
            value={query.department ?? "All"}
            onChange={(e) =>
              setQuery({
                ...query,
                department: e.target.value === "All" ? undefined : e.target.value,
              })
            }
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        {/* Type */}
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">Type</span>
          <select
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
            value={query.type ?? "Any"}
            onChange={(e) =>
              setQuery({
                ...query,
                type: e.target.value as any, // "Any" or Doc["type"]
              })
            }
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Access */}
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">Access</span>
          <select
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
            value={query.access ?? "Any"}
            onChange={(e) =>
              setQuery({
                ...query,
                access: e.target.value as any, // "Any" | Access
              })
            }
          >
            {accessLevels.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>

        {/* Date Range */}
        <div className="flex items-end gap-2">
          <label className="flex flex-col gap-1 text-sm w-full">
            <span className="font-medium text-gray-700">From</span>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
              value={query.from ?? ""}
              onChange={(e) => setQuery({ ...query, from: e.target.value || undefined })}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm w-full">
            <span className="font-medium text-gray-700">To</span>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
              value={query.to ?? ""}
              onChange={(e) => setQuery({ ...query, to: e.target.value || undefined })}
            />
          </label>
        </div>
      </div>

      {/* Tags row */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Tags</span>
          {allTags.length > VISIBLE_TAGS && (
            <button
              type="button"
              className="text-xs text-nbb-teal underline underline-offset-2 hover:no-underline"
              onClick={() => setShowAllTags((v) => !v)}
              aria-expanded={showAllTags}
              aria-controls="tag-cloud"
            >
              {showAllTags ? "Less…" : "More…"}
            </button>
          )}
        </div>

        <div id="tag-cloud" className="flex flex-wrap gap-2">
          {displayedTags.map((tag) => {
            const active = (query.tags ?? []).some(
              (t) => t.toLowerCase() === tag.toLowerCase()
            );
            return (
              <button
                key={tag}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs ${
                  active
                    ? "border-nbb-teal bg-nbb-teal/10 text-nbb-teal"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  const current = new Set(query.tags ?? []);
                  if (current.has(tag)) current.delete(tag);
                  else current.add(tag);
                  setQuery({ ...query, tags: Array.from(current) });
                }}
                aria-pressed={active}
                aria-label={`Toggle tag ${tag}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
