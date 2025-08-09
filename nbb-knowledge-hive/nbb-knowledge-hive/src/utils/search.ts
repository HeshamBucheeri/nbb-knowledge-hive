export type Access = "Public" | "Restricted" | "Confidential";

export type Doc = {
  id: string;
  title: string;
  summary: string;
  department: string;
  type: "Memo" | "Report" | "Research" | "Precedent" | "Dataset" | "Note";
  date: string; // ISO
  tags: string[];
  stakeholders: string[];
  // Accept both shapes; we'll normalize at runtime
  access?: Access;              // <— NEW (some of your docs use `access`)
  accessLevel?: Access;         // existing
  content: string;
  relatedIds: string[];
};

export type Query = {
  text: string;
  department?: string;
  type?: Doc["type"] | "Any";
  access?: Access | "Any";
  from?: string; // ISO
  to?: string;   // ISO
  tags?: string[];
};

function normalize(s: string) {
  return s.toLowerCase();
}

function contains(hay: string, needle: string) {
  return normalize(hay).includes(normalize(needle));
}

function getAccess(d: Doc): Access {
  return (d.access ?? d.accessLevel ?? "Public");
}

/** Very small scoring: title>tags>summary>content */
export function score(doc: Doc, q: string): number {
  if (!q.trim()) return 1; // neutral score for empty query
  const needles = q.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const n of needles) {
    if (contains(doc.title, n)) s += 5;
    if (doc.tags.some(t => contains(t, n))) s += 3;
    if (contains(doc.summary, n)) s += 2;
    if (contains(doc.content, n)) s += 1;
    if (doc.stakeholders.some(t => contains(t, n))) s += 2;
  }
  return s;
}

export function filterDocs(docs: Doc[], query: Query): Doc[] {
  const { text, department, type, access, from, to, tags } = query;
  const fromTime = from ? new Date(from).getTime() : -Infinity;
  const toTime = to ? new Date(to).getTime() : Infinity;

  return docs
    .filter(d =>
      (!department || d.department === department) &&
      (!type || type === "Any" || d.type === type) &&
      (!access || access === "Any" || getAccess(d) === access) &&
      (new Date(d.date).getTime() >= fromTime) &&
      (new Date(d.date).getTime() <= toTime) &&
      (!tags || tags.every(t => d.tags.map(x => x.toLowerCase()).includes(t.toLowerCase())))
    )
    .map(d => ({ doc: d, s: score(d, text) }))
    .filter(x => x.s > 0 || !text.trim()) // if searching, require some match
    .sort((a, b) => b.s - a.s)
    .map(x => x.doc);
}
