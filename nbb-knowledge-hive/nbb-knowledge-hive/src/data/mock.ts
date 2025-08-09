import type { Doc } from "../utils/search";

export const MOCK_DOCS: Doc[] = [
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
    content:
      "Template table for what to accept and not to accept when receiving a POA request.",
    relatedIds: ["H-007", "H-010"]
  },
  {
    id: "H-002",
    title: "KYC/Onboarding Controls",
    summary:
      "Clarifies acceptable channels for document collection and updated PEP screening cadence.",
    department: "Legal",
    type: "Memo",
    date: "2025-02-10",
    tags: ["KYC", "Onboarding", "Compliance", "Retail"],
    stakeholders: ["Legal", "Retail Ops", "Compliance"],
    access: "Public",
    content:
      "WhatsApp collection is disallowed. Use approved channels via SharePoint forms or secure email gateways. Adds expiry checks and exception logging.",
    relatedIds: ["H-008"]
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
    content:
      "Average filing time dropped from 48s to 19s; misfiling reduced by 72% across Legal/IT/Ops cohorts during a 4-week pilot.",
    relatedIds: ["H-008", "H-011"]
  },
  {
    id: "H-004",
    title: "Cybersecurity R&D: Efficiency Hypothesis v2",
    summary:
      "Auto-prioritize vulnerabilities by asset criticality and exploit telemetry to reduce MTTR.",
    department: "Cybersecurity",
    type: "Research",
    date: "2024-11-18",
    tags: ["Cybersecurity", "R&D", "Efficiency", "Hypothesis", "Triage"],
    stakeholders: ["GCEO Office", "SOC", "Infra"],
    access: "Restricted",
    content:
      "Design an A/B pilot: prioritized ticket routing vs. FIFO. Measure queue depth, SLA breach rate, and analyst handoff time.",
    relatedIds: ["H-005", "H-010"]
  },
  {
    id: "H-005",
    title: "SOC Pilot Notes – Week 1 Results",
    summary:
      "Alert queue reduced by 14% using prioritized routing; analyst satisfaction up modestly.",
    department: "Cybersecurity",
    type: "Note",
    date: "2024-12-02",
    tags: ["SOC", "Pilot", "Workflow", "Notes"],
    stakeholders: ["SOC", "Infra"],
    access: "Confidential",
    content:
      "Observations: reduced re-open rate, fewer duplicate tickets. Risks: over-prioritization of specific assets; calibration needed.",
    relatedIds: ["H-004"]
  },
  {
    id: "H-006",
    title: "Legal Handbook: House View On Electronic Signatures",
    summary: "E-signatures as a valid form of approval.",
    department: "Legal",
    type: "Report",
    date: "2023-09-05",
    tags: ["E-signature", "Approval"],
    stakeholders: ["Legal"],
    access: "Public",
    content:
      "The courts now recognize electronic signatures as a valid form of approval. We will now recognize electronic signatures as acceptable provided we flag forgery risk when giving this advice.",
    relatedIds: []
  },
  {
    id: "H-007",
    title: "Security Requirements for Critical Vendors",
    summary:
      "Mandatory controls checklist aligned to ISO/PCI; onboarding & annual review cadence.",
    department: "Cybersecurity",
    type: "Report",
    date: "2024-08-21",
    tags: ["Vendor", "Security", "ISO", "PCI", "Third-party"],
    stakeholders: ["GCEO Office", "Procurement", "Legal"],
    access: "Restricted",
    content:
      "CSPM evidence, SOC2/ISO recency, incident reporting SLAs, breach drill participation, and encryption at rest/in transit verification.",
    relatedIds: ["H-001", "H-010"]
  },
  {
    id: "H-008",
    title: "Outlook → SharePoint Filing: Power Automate Notes",
    summary:
      "Email-to-folder automation with metadata mapping and safe filename rules.",
    department: "IT",
    type: "Note",
    date: "2025-03-01",
    tags: ["Outlook", "SharePoint", "Power Automate", "Metadata"],
    stakeholders: ["IT"],
    access: "Public",
    content:
      "Trigger on new emails from approved senders; extract subject/tags; map to department libraries; sanitize names; log audit entries.",
    relatedIds: ["H-002", "H-003"]
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
    content:
      "Keeps an up-to-date matrix for governance streams and escalation paths; aligns with program board cadence.",
    relatedIds: ["H-003", "H-011"]
  },
  {
    id: "H-010",
    title: "External Research: Banking Threat Tactics 2024",
    summary: "Key ATT&CK trends relevant to retail banking and payments.",
    department: "Cybersecurity",
    type: "Research",
    date: "2024-10-09",
    tags: ["External Research", "MITRE", "ATT&CK", "Threats"],
    stakeholders: ["CISO Office"],
    access: "Restricted",
    content:
      "Initial access via phishing and privilege escalation remain dominant. Recommends controls tuning and quarterly staff refreshers.",
    relatedIds: ["H-001", "H-004", "H-007"]
  },
  {
    id: "H-011",
    title: "Department Dashboard – Legal (Prototype)",
    summary:
      "KPIs for legal requests, SLAs, and average document retrieval time.",
    department: "Legal",
    type: "Report",
    date: "2025-07-12",
    tags: ["Dashboard", "Legal", "KPI", "SLA"],
    stakeholders: ["Legal"],
    access: "Public",
    content:
      "Open matters, cycle time per request class, retrieval time (current 22s; target 15s), and ageing buckets.",
    relatedIds: ["H-002", "H-003"]
  },
  {
    id: "H-012",
    title: "Knowledge Hive How-To: Bookmarks, Search, Filters",
    summary:
      "Quick user guide for the demo: searching, filtering, opening related docs, and bookmarking.",
    department: "IT",
    type: "Note",
    date: "2025-08-01",
    tags: ["How-to", "Guide", "Search", "Bookmarks"],
    stakeholders: ["All Staff"],
    access: "Public",
    content:
      "Use the top search for keywords; filter by department, type, access, date, or tags. Open a result to view details and related items; use ☆ to bookmark.",
    relatedIds: ["H-008"]
  }, // ← this comma was missing
  {
    id: "H-013",
    title: "Sustainability Dashboard — ESG KPIs (Pilot)",
    summary:
      "Quarterly snapshot of emissions, paperless adoption, and energy efficiency initiatives across branches.",
    department: "Sustainability",
    type: "Report",
    date: "2025-07-25",
    tags: ["ESG", "Carbon", "Paperless", "Energy"],
    stakeholders: ["Sustainability", "Operations", "Facilities"],
    access: "Public",
    content:
      "Tracks Scope 2 electricity usage, % e-statements vs. paper, and HVAC optimization progress. Notes next steps for vendor disclosures.",
    relatedIds: ["H-003", "H-006"]
  },
  {
    id: "H-014",
    title: "Corporate Communications Guidance — External Announcements",
    summary:
      "Approval workflow, tone-of-voice, and crisis comms checklist for public releases and social posts.",
    department: "Corporate Communications",
    type: "Memo",
    date: "2025-07-28",
    tags: ["Press", "PR", "Brand", "Social"],
    stakeholders: ["Corporate Communications", "Legal", "Executive Office"],
    access: "Public",
    content:
      "Defines drafting → review → approval steps, mandatory legal sign-off, and media inquiry handling. Includes template press release structure.",
    relatedIds: ["H-002", "H-011"]
  }
];
