export type Access = "Public" | "Restricted" | "Confidential";

/** Optional file/link attachments for a document (e.g., PDFs). */
export type Attachment = {
  /** Public URL path, e.g. "/docs/poa-policy-2025.pdf" (place files in /public/docs). */
  url: string;
  /** Human-readable name shown in the UI. */
  name: string;
  /** Defaults to "pdf" if omitted. */
  type?: "pdf" | "link";
};

export type Doc = {
  id: string;
  title: string;
  summary: string;
  department: string;
  type: "Memo" | "Report" | "Research" | "Precedent" | "Dataset" | "Note";
  date: string; // ISO string
  tags: string[];
  stakeholders: string[];

  /** Accept both shapes; we normalize at runtime. */
  access?: Access;       // some docs may use `access`
  accessLevel?: Access;  // some docs may use `accessLevel`

  content: string;
  relatedIds: string[];

  /** Optional: list of file/link attachments (e.g., PDFs). */
  attachments?: Attachment[];

  /** Optional: status used by your card styling ("Active / Approved", "Replaced / Cancelled"). */
  status?: string;
};

/** Normalize access level coming from either `access` or `accessLevel`. */
export function getAccess(d: Doc): Access {
  return (d.access ?? d.accessLevel ?? "Public") as Access;
}

/** Case-insensitive substring check. */
function contains(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

/** Query shape used across Filters/App. */
export type Query = {
  text?: string;
  department?: string | "All";
  type?: Doc["type"] | "Any";
  access?: Access | "Any";
  from?: string; // ISO yyyy-mm-dd
  to?: string;   // ISO yyyy-mm-dd
  tags?: string[]; // selected tags must all be present on doc
};

/** Simple relevance scoring for search. */
function score(doc: Doc, text: string): number {
  const q = (text || "").trim();
  if (!q) return 0;

  const needles = q.split(/\s+/).filter(Boolean);
  let s = 0;

  for (const n of needles) {
    if (contains(doc.title, n)) s += 5;
    if (contains(doc.summary, n)) s += 3;
    if (contains(doc.content, n)) s += 1;
    if (doc.tags?.some(t => contains(t, n))) s += 2;
    if (doc.department && contains(doc.department, n)) s += 1;
    if (doc.type && contains(doc.type, n)) s += 1;
  }

  return s;
}

/** Filter + rank documents by query and simple relevance score. */
export function filterDocs(docs: Doc[], query: Query): Doc[] {
  const {
    text = "",
    department,
    type,
    access,
    from,
    to,
    tags,
  } = query;

  const fromTime = from ? new Date(from + "T00:00:00").getTime() : 0;
  const toTime = to ? new Date(to + "T23:59:59").getTime() : Number.POSITIVE_INFINITY;

  return docs
    .filter(d =>
      // Department (ignore "All" or undefined)
      (!department || department === "All" || d.department === department) &&

      // Type (ignore "Any" or undefined)
      (!type || type === "Any" || d.type === type) &&

      // Access (ignore "Any" or undefined)
      (!access || access === "Any" || getAccess(d) === access) &&

      // Date range
      (new Date(d.date).getTime() >= fromTime) &&
      (new Date(d.date).getTime() <= toTime) &&

      // Tags: require all selected tags to be present on the doc (case-insensitive)
      (!tags || tags.every(t =>
        d.tags.map(x => x.toLowerCase()).includes(t.toLowerCase())
      ))
    )
    .map(d => ({ doc: d, s: score(d, text) }))
    // if searching (non-empty text), require some match score
    .filter(x => x.s > 0 || !text.trim())
    .sort((a, b) => b.s - a.s)
    .map(x => x.doc);
}
