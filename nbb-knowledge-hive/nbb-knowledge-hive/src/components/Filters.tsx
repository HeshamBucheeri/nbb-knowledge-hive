import React from "react";
import type { Query, Doc } from "../utils/search";

type Props = {
  query: Query;
  setQuery: (q: Query) => void;
  allDocs: Doc[];
};

const departments = Array.from(new Set(["All","Legal","Strategy","Cybersecurity","Operations","IT","Sustainability","Corporate Communications","Compliance"]));
const types: (Doc["type"] | "Any")[] = ["Any","Memo","Report","Research","Precedent","Dataset","Note"];
const accessLevels: (Doc["accessLevel"] | "Any")[] = ["Any","Public","Restricted","Confidential"];

export default function Filters({ query, setQuery, allDocs }: Props) {
  const allTags = Array.from(new Set(allDocs.flatMap(d => d.tags))).sort();

  return (
    <section aria-label="Filters" className="grid md:grid-cols-4 gap-3">
      <div>
        <label className="block text-sm font-medium">Department</label>
        <select
          className="mt-1 w-full rounded-lg border p-2"
          value={query.department || ""}
          onChange={e => setQuery({ ...query, department: e.target.value === "" || e.target.value === "All" ? undefined : e.target.value })}
        >
          {departments.map(d => <option key={d} value={d === "All" ? "" : d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select
          className="mt-1 w-full rounded-lg border p-2"
          value={query.type || "Any"}
          onChange={e => setQuery({ ...query, type: e.target.value as any })}
        >
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Access</label>
        <select
          className="mt-1 w-full rounded-lg border p-2"
          value={query.access || "Any"}
          onChange={e => setQuery({ ...query, access: e.target.value as any })}
        >
          {accessLevels.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input type="date" className="mt-1 w-full rounded-lg border p-2" value={query.from || ""}
            onChange={e => setQuery({ ...query, from: e.target.value || undefined })} />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input type="date" className="mt-1 w-full rounded-lg border p-2" value={query.to || ""}
            onChange={e => setQuery({ ...query, to: e.target.value || undefined })} />
        </div>
      </div>

      <div className="md:col-span-4">
        <label className="block text-sm font-medium">Tags</label>
        <div className="mt-1 flex flex-wrap gap-2">
          {allTags.map(tag => {
            const active = (query.tags || []).includes(tag);
            return (
              <button
                key={tag}
                className={`rounded-full border px-3 py-1 text-sm ${active ? "bg-nbb-red text-white border-nbb-red" : "bg-white hover:bg-gray-50"}`}
                onClick={() => {
                  const current = new Set(query.tags || []);
                  if (current.has(tag)) current.delete(tag); else current.add(tag);
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
