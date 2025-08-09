import React from "react";
import { MOCK_DOCS } from "./data/mock";
import { filterDocs, type Query, type Doc } from "./utils/search";
import DocumentCard from "./components/DocumentCard";
import DetailDrawer from "./components/DetailDrawer";
import Filters from "./components/Filters";

export default function App() {
  const [query, setQuery] = React.useState<Query>({
    text: "",
    type: "Any",
    access: "Any",
  });
  const [openDoc, setOpenDoc] = React.useState<Doc | null>(null);
  const [bookmarks, setBookmarks] = React.useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("nbb:bookmarks") || "[]"); } catch { return []; }
  });

  React.useEffect(() => {
    localStorage.setItem("nbb:bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const results = filterDocs(MOCK_DOCS, query);

  function onBookmark(id: string) {
    setBookmarks(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);
  }

  const related = (doc: Doc | null) => doc ? MOCK_DOCS.filter(d => doc.relatedIds.includes(d.id)) : [];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-nbb-red" aria-hidden="true"></div>
          <div>
            <h1 className="text-lg font-semibold">NBB Knowledge Hive</h1>
            <p className="text-xs text-gray-600">Bank-wide, searchable knowledge. Demo build — mock data, no external integrations.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <section aria-label="Search">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="flex items-center gap-2">
            <input
              id="search"
              placeholder="Search: e.g., cybersecurity R&D efficiency hypothesis"
              className="w-full rounded-xl border p-3"
              value={query.text}
              onChange={e => setQuery({ ...query, text: e.target.value })}
            />
            <button
              className="rounded-xl bg-nbb-red text-white px-4 py-3"
              onClick={() => { /* no-op: search updates live */ }}
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </section>

        <section>
          <Filters query={query} setQuery={setQuery} allDocs={MOCK_DOCS} />
        </section>

        <section aria-label="Results" className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{results.length} result{results.length !== 1 ? "s" : ""}</span>
            <details>
              <summary className="cursor-pointer">About this demo</summary>
              <div className="mt-2 max-w-prose text-gray-600">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Local mock data simulates documents, access levels, and cross-references.</li>
                  <li>Client-side search ranking: title &gt; tags &gt; summary &gt; content.</li>
                  <li>Bookmarks persist to your browser only.</li>
                  <li>Comments are illustrative only (not persisted).</li>
                </ul>
              </div>
            </details>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(doc => (
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

        <section aria-label="Bookmarks" className="mt-8">
          <h2 className="text-base font-semibold mb-2">Your bookmarks</h2>
          {bookmarks.length === 0 ? (
            <p className="text-sm text-gray-600">No bookmarks yet. Use ☆ on any card to save it.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {bookmarks.map(id => {
                const d = MOCK_DOCS.find(x => x.id === id);
                if (!d) return null;
                return <li key={id}>{d.title} <span className="text-gray-500">({d.id})</span></li>;
              })}
            </ul>
          )}
        </section>
      </main>

      <DetailDrawer doc={openDoc} onClose={() => setOpenDoc(null)} related={related(openDoc)} />
      <Footer />
    </div>
  );
}



function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} National Bank of Bahrain — Knowledge Hive (Demo). •
        No real data. Integrations (Outlook, SharePoint, Power Automate, SSO) omitted in demo for security.
      </div>
    </footer>
  );
}
