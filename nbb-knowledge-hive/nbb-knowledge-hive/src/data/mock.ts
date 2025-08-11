import type { Doc } from "../utils/search";

export const MOCK_DOCS: (Doc & { status?: string })[] = [
  {
    id: "H-001",
    title: "Legal Handbook: House View On Accepting POAs (2025)",
    summary: "Step-by-step internal process for accepting POAs.",
    department: "Legal",
    type: "Precedent",
    date: "2025-06-15",
    tags: ["POA", "Retail", "House View", "Contract"],
    stakeholders: ["Legal", "Compliance", "Retail"],
    access: "Restricted",
    status: "Active / Approved",
    content: "Template table for what to accept and not to accept when receiving a POA request.",
    relatedIds: ["H-007", "H-010"],
    attachments: [
      { url: "/docs/legal-poa-policy-2025.pdf", name: "POA Policy (2025)", type: "pdf" }
    ]
  },
  {
    id: "H-002",
    title: "KYC/Onboarding Controls",
    summary: "Clarifies acceptable channels for document collection and updated PEP screening cadence.",
    department: "Legal",
    type: "Memo",
    date: "2025-02-10",
    tags: ["KYC", "Onboarding", "Compliance", "Retail"],
    stakeholders: ["Legal", "Retail Ops", "Compliance"],
    access: "Public",
    status: "Active / Approved",
    content: "WhatsApp collection is disallowed. Use approved channels via SharePoint forms or secure email gateways. Adds expiry checks and exception logging.",
    relatedIds: ["H-008"],
    attachments: [
      { url: "/docs/kyc-onboarding-controls-2025.pdf", name: "KYC/Onboarding Controls (2025)", type: "pdf" }
    ]
  },
  {
    id: "H-003",
    title: "Strategy Benchmarking For Drop-A-Step",
    summary: "Benchmarking Drop-A-Step Implementation.",
    department: "Strategy",
    type: "Report",
    date: "2025-08-22",
    tags: ["Benchmark", "Efficiency", "SharePoint", "Pilot"],
    stakeholders: ["Strategy", "Operations"],
    access: "Public",
    status: "Active / Approved",
    content: "Average filing time dropped from 48s to 19s; misfiling reduced by 72% across Legal/IT/Ops cohorts during a 4-week pilot.",
    relatedIds: ["H-008", "H-011"],
    attachments: [
      { url: "/docs/strategy-benchmarking-drop-a-step.pdf", name: "Drop-A-Step Benchmarking Report", type: "pdf" }
    ]
  },
  {
    id: "H-004",
    title: "Cybersecurity R&D: Efficiency Hypothesis v2",
    summary: "Auto-prioritize vulnerabilities by asset criticality and exploit telemetry to reduce MTTR.",
    department: "Cybersecurity",
    type: "Research",
    date: "2024-11-18",
    tags: ["Cybersecurity", "R&D", "Efficiency", "Hypothesis", "Triage"],
    stakeholders: ["GCEO Office", "SOC", "Infra"],
    access: "Restricted",
    status: "Active / Approved",
    content: "Design an A/B pilot: prioritized ticket routing vs. FIFO. Measure queue depth, SLA breach rate, and analyst handoff time.",
    relatedIds: ["H-005", "H-010"],
    attachments: [
      { url: "/docs/cybersecurity-efficiency-hypothesis-v2.pdf", name: "Cybersecurity Efficiency Hypothesis v2", type: "pdf" }
    ]
  },
  {
    id: "H-005",
    title: "SOC Pilot Notes – Week 1 Results",
    summary: "Alert queue reduced by 14% using prioritized routing; analyst satisfaction up modestly.",
    department: "Cybersecurity",
    type: "Note",
    date: "2024-12-02",
    tags: ["SOC", "Pilot", "Workflow", "Notes"],
    stakeholders: ["SOC", "Infra"],
    access: "Confidential",
    status: "Active / Approved",
    content: "Observations: reduced re-open rate, fewer duplicate tickets. Risks: over-prioritization of specific assets; calibration needed.",
    relatedIds: ["H-004"],
    attachments: [
      { url: "/docs/soc-pilot-week1-results.pdf", name: "SOC Pilot Notes – Week 1", type: "pdf" }
    ]
  },
  {
    id: "H-006",
    title: "Legal Handbook: House View On Electronic Signatures",
    summary: "E-signatures as a valid form of approval.",
    department: "Legal",
    type: "Report",
    date: "2025-04-05",
    tags: ["E-signature", "Approval"],
    stakeholders: ["Legal"],
    access: "Public",
    status: "Active / Approved",
    content: "The courts now recognize electronic signatures as a valid form of approval. We will now recognize electronic signatures as acceptable provided we flag forgery risk when giving this advice.",
    relatedIds: [],
    attachments: [
      { url: "/docs/e-signatures-house-view-2025.pdf", name: "E-Signatures House View (2025)", type: "pdf" }
    ]
  },
  {
    id: "H-007",
    title: "Security Requirements for Critical Vendors",
    summary: "Mandatory controls checklist aligned to ISO/PCI; onboarding & annual review cadence.",
    department: "Cybersecurity",
    type: "Report",
    date: "2024-08-21",
    tags: ["Vendor", "Security", "ISO", "PCI", "Third-party"],
    stakeholders: ["GCEO Office", "Procurement", "Legal"],
    access: "Restricted",
    status: "Replaced / Cancelled",
    content: "CSPM evidence, SOC2/ISO recency, incident reporting SLAs, breach drill participation, and encryption at rest/in transit verification.",
    relatedIds: ["H-001"],
    attachments: [
      { url: "/docs/vendor-security-requirements-2024.pdf", name: "Vendor Security Requirements (2024)", type: "pdf" }
    ]
  },
  {
    id: "H-008",
    title: "Outlook → SharePoint Filing: Power Automate Notes",
    summary: "Email-to-folder automation with metadata mapping and safe filename rules.",
    department: "IT",
    type: "Note",
    date: "2025-03-01",
    tags: ["Outlook", "SharePoint", "Power Automate", "Metadata"],
    stakeholders: ["IT"],
    access: "Public",
    status: "Active / Approved",
    content: "Trigger on new emails from approved senders; extract subject/tags; map to department libraries; sanitize names; log audit entries.",
    relatedIds: ["H-002", "H-003"],
    attachments: [
      { url: "/docs/power-automate-outlook-sharepoint-notes.pdf", name: "Outlook→SharePoint Power Automate Notes", type: "pdf" }
    ]
  },
  {
    id: "H-009",
    title: "Stakeholder Map: Digital Transformation",
    summary: "Primary/secondary stakeholders with RACI suggestions per stream.",
    department: "Strategy",
    type: "Note",
    date: "2024-03-19",
    tags: ["Stakeholders", "RACI", "Transformation"],
    stakeholders: ["GCTO", "COO", "Strategy"],
    access: "Public",
    status: "Replaced / Cancelled",
    content: "Keeps an up-to-date matrix for governance streams and escalation paths; aligns with program board cadence.",
    relatedIds: ["H-003"],
    attachments: [
      { url: "/docs/stakeholder-map-digital-transformation.pdf", name: "Stakeholder Map — Digital Transformation", type: "pdf" }
    ]
  },
  {
    id: "H-010",
    title: "Electronic Signatures Memo October 2024",
    summary: "Memo on approvals for E-signatures as of October 2024.",
    department: "Legal",
    type: "Memo",
    date: "2024-10-09",
    tags: ["Memo", "Electronic Signatures", "Approval", "Authority"],
    stakeholders: ["GCEO Office", "Legal", "Compliance"],
    access: "Public",
    status: "Replaced / Cancelled",
    content: "Memo on approvals for E-signatures as of October 2024",
    relatedIds: ["H-011"],
    attachments: [
      { url: "/docs/esignatures-memo-oct-2024.pdf", name: "E-Signatures Memo (Oct 2024)", type: "pdf" }
    ]
  },
  {
    id: "H-011",
    title: "Electronic Signatures Memo May 2025",
    summary: "emo on approvals for E-signatures as of May 2025.",
    department: "Legal",
    type: "Report",
    date: "2025-07-12",
    tags: ["Memo", "Electronic Signatures", "Approval", "Authority"],
    stakeholders: ["Legal"],
    access: "Public",
    status: "Active / Approved",
    content: "Memo on approvals for E-signatures as of May 2025.",
    relatedIds: ["H-010"],
    attachments: [
      { url: "/docs/esignatures-memo-may-2025.pdf", name: "E-Signatures Memo (May 2025)", type: "pdf" }
    ]
  },
  {
    id: "H-012",
    title: "Knowledge Hive How-To: Bookmarks, Search, Filters",
    summary: "Quick user guide for the demo: searching, filtering, opening related docs, and bookmarking.",
    department: "IT",
    type: "Note",
    date: "2025-08-01",
    tags: ["How-to", "Guide", "Search", "Bookmarks"],
    stakeholders: ["All Staff"],
    access: "Public",
    status: "Active / Approved",
    content: "Use the top search for keywords; filter by department, type, access, date, or tags. Open a result to view details and related items; use ☆ to bookmark.",
    relatedIds: ["H-008"],
    attachments: [
      { url: "/docs/knowledge-hive-how-to.pdf", name: "Knowledge Hive How-To", type: "pdf" }
    ]
  },
  {
    id: "H-013",
    title: "Sustainability Dashboard — ESG KPIs (Pilot)",
    summary: "Quarterly snapshot of emissions, paperless adoption, and energy efficiency initiatives across branches.",
    department: "Sustainability",
    type: "Report",
    date: "2025-07-25",
    tags: ["ESG", "Carbon", "Paperless", "Energy"],
    stakeholders: ["Sustainability", "Operations", "Facilities"],
    access: "Public",
    status: "Active / Approved",
    content: "Tracks Scope 2 electricity usage, % e-statements vs. paper, and HVAC optimization progress. Notes next steps for vendor disclosures.",
    relatedIds: ["H-003", "H-006"],
    attachments: [
      { url: "/docs/sustainability-esg-kpis-pilot.pdf", name: "Sustainability ESG KPIs (Pilot)", type: "pdf" }
    ]
  },
  {
    id: "H-014",
    title: "Corporate Communications Guidance — External Announcements",
    summary: "Approval workflow, tone-of-voice, and crisis comms checklist for public releases and social posts.",
    department: "Corporate Communications",
    type: "Memo",
    date: "2025-07-28",
    tags: ["Press", "PR", "Brand", "Social"],
    stakeholders: ["Corporate Communications", "Legal", "Executive Office"],
    access: "Public",
    status: "Replaced / Cancelled",
    content: "Defines drafting → review → approval steps, mandatory legal sign-off, and media inquiry handling. Includes template press release structure.",
    relatedIds: ["H-002", "H-011"],
    attachments: [
      { url: "/docs/corporate-comms-guidance-2025.pdf", name: "Corporate Comms Guidance (2025)", type: "pdf" }
    ]
  }
];
