# NBB Knowledge Hive — Demo (React + Vite + TypeScript + Tailwind)

A safe, client-only demo of an enterprise knowledge system for the National Bank of Bahrain (NBB).
It showcases search, filtering, cross-referencing, bookmarks, and a detail drawer — using mock data only.

## 60-second tour
- **Search & filters**: Type in the search input and use filters (department, type, access, date range, tags).
- **Cards**: Click **Open** on any result to view details and related documents.
- **Bookmarks**: Use ☆ on a card to save. Bookmarks persist in your browser (localStorage).
- **Accessibility**: Labeled inputs, keyboard focus styles, and semantic regions.

## How to run (locally or online)
### Online (recommended)
1. Go to **StackBlitz** and click **Upload Project**, then select this folder or the ZIP.
2. It will auto-install and run `npm run dev`.
3. Share the StackBlitz URL with your team.

### Local
```bash
npm install
npm run dev
```

## Where files live
```
src/
  App.tsx             # main UI, search, results, bookmarks, drawer
  main.tsx            # React entry
  index.css           # Tailwind styles
  components/
    DocumentCard.tsx  # result card UI
    DetailDrawer.tsx  # slide-over details + related docs
    Filters.tsx       # filter controls
    Tag.tsx           # tag chip
  data/
    mock.ts           # seed/mock documents
  utils/
    search.ts         # tiny search & filtering utilities
tailwind.config.js    # Tailwind config
postcss.config.js     # PostCSS config
index.html            # root
```

## Notes
- This demo intentionally avoids real data, auth, or external services.
- For production: add SSO (e.g., Azure AD), API gateway, document storage (SharePoint/Blob), search service (Azure AI Search), and role-based authorization.
