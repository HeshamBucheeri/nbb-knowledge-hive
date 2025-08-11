import React from "react";
import { MOCK_DOCS } from "./data/mock";
import { filterDocs, type Query, type Doc } from "./utils/search";
import DocumentCard from "./components/DocumentCard";
import DetailDrawer from "./components/DetailDrawer";
import Filters from "./components/Filters";

export default function App() {
  const [query, setQuery] = React.useState<Query>({ text: "", type: "Any", access: "Any" });
  const [openDoc, setOpenDoc] = React.useState<Doc | null>(null);
  const [bookmarks, setBookmarks] = React.useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("nbb:bookmarks") || "[]");
    } catch {
      return [];
    }
  });
  React.useEffect(() => {
    localStorage.setItem("nbb:bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const results = filterDocs(MOCK_DOCS, query);
  const onBookmark = (id: string) =>
    setBookmarks((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));
  const related = (doc: Doc | null) =>
    doc ? MOCK_DOCS.filter((d) => doc.relatedIds.includes(d.id)) : [];

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* NBB logo from /public/logo.svg */}
            <img src="/logo.svg" alt="NBB" className="h-9 w-auto object-contain" />
            <div>
              <h1 className="text-lg font-semibold text-nbb-teal">NBB Knowledge Hive</h1>
              <p className="text-xs text-gray-600">
                Bank-wide, searchable knowledge — demo (mock data, no integrations).
              </p>
            </div>
          </div>
          <button className="hidden sm:inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
            العربية
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Search */}
        <section aria-label="Search">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <input
                id="search"
                placeholder="Search: e.g., cybersecurity R&D efficiency hypothesis"
                className="w-full rounded-full border border-gray-300 bg-white p-3 pl-10 shadow-sm placeholder:text-gray-400"
                value={query.text}
                onChange={(e) => setQuery({ ...query, text: e.target.value })}
              />
              <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">🔎</span>
            </div>
            <button
              className="rounded-full bg-nbb-red px-5 py-3 text-sm font-medium text-white shadow hover:bg-[#a50b15]"
              onClick={() => {}}
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </section>

        {/* Filters */}
        <section>
          <Filters query={query} setQuery={setQuery} allDocs={MOCK_DOCS} />
        </section>

        {/* Results */}
        <section aria-label="Results" className="space-y-3">
          <div className="flex items-center justify-start text-sm text-gray-600">
            <span>
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onOpen={setOpenDoc}
                onBookmark={onBookmark}
                isBookmarked={bookmarks.includes(doc.id)}
              />
            ))}
          </div>
        </section>

        {/* Bookmarks */}
        <section aria-label="Bookmarks" className="mt-8">
          <h2 className="mb-2 text-base font-semibold text-nbb-teal">Your bookmarks</h2>
          {bookmarks.length === 0 ? (
            <p className="text-sm text-gray-600">
              No bookmarks yet. Use ☆ on any card to save it.
            </p>
          ) : (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {bookmarks.map((id) => {
                const d = MOCK_DOCS.find((x) => x.id === id);
                if (!d) return null;
                return (
                  <li key={id}>
                    {d.title} <span className="text-gray-500">({d.id})</span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <DetailDrawer doc={openDoc} onClose={() => setOpenDoc(null)} related={related(openDoc)} />

      <footer className="mt-10 border-t bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500">
          © {new Date().getFullYear()} National Bank of Bahrain — Knowledge Hive (Demo).
        </div>
      </footer>
    </div>
  );
}
