// VEB ERP - Unified Enterprise Mock Data

export const BRAND = {
  name: "VEB ERP",
  tagline: "One Platform. Every Operation.",
  badgeText: "VEB",
  subText: "ERP"
};

// 1. EXECUTIVE DASHBOARD & STATS
export const INITIAL_STATS = [
  {
    title: "Total Revenue",
    value: "$184,250.00",
    change: "+16.8%",
    isPositive: true,
    period: "vs last month",
    icon: "DollarSign",
    color: "indigo",
    chartData: [45, 52, 48, 70, 65, 85, 92]
  },
  {
    title: "Production Output",
    value: "14,820 Units",
    change: "+22.4%",
    isPositive: true,
    period: "98.2% Yield Rate",
    icon: "Factory",
    color: "emerald",
    chartData: [10, 12, 14, 13, 16, 18, 22]
  },
  {
    title: "Active Work Orders",
    value: "18 Orders",
    change: "4 In QC Check",
    isPositive: true,
    period: "On schedule",
    icon: "Layers",
    color: "amber",
    chartData: [20, 18, 22, 19, 21, 18, 18]
  },
  {
    title: "Low Stock Alerts",
    value: "3 Items",
    change: "Raw Materials",
    isPositive: false,
    period: "Reorder required",
    icon: "AlertTriangle",
    color: "rose",
    chartData: [8, 6, 5, 4, 3, 3, 3]
  }
];

export const PRODUCTION_TREND_DATA = [
  { month: "Jan", planned: 8000, actual: 7800, wastage: 200 },
  { month: "Feb", planned: 9500, actual: 9200, wastage: 300 },
  { month: "Mar", planned: 11000, actual: 10800, wastage: 250 },
  { month: "Apr", planned: 12500, actual: 12400, wastage: 180 },
  { month: "May", planned: 14000, actual: 13900, wastage: 150 },
  { month: "Jun", planned: 15500, actual: 15200, wastage: 300 },
  { month: "Jul", planned: 17000, actual: 16850, wastage: 210 }
];

export const FINANCIAL_OVERVIEW_DATA = [
  { month: "Jan", revenue: 65000, expenses: 28000, profit: 37000 },
  { month: "Feb", revenue: 78000, expenses: 31000, profit: 47000 },
  { month: "Mar", revenue: 82000, expenses: 33000, profit: 49000 },
  { month: "Apr", revenue: 95000, expenses: 36000, profit: 59000 },
  { month: "May", revenue: 110000, expenses: 34000, profit: 76000 },
  { month: "Jun", revenue: 125000, expenses: 39000, profit: 86000 },
  { month: "Jul", revenue: 142850, expenses: 38420, profit: 104430 }
];

export const RECENT_ACTIVITIES = [
  {
    id: "act-1",
    user: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    action: "passed QC inspection for",
    target: "WO-895: Bio-Scanner Batch #8801",
    timestamp: "8 minutes ago",
    type: "manufacturing"
  },
  {
    id: "act-2",
    user: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    action: "approved Purchase Order",
    target: "PO-RM-2026-04 for 200 Display Panels",
    timestamp: "24 minutes ago",
    type: "invoice"
  },
  {
    id: "act-3",
    user: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    action: "won CRM deal",
    target: "Apex Global Cloud Migration ($45,000)",
    timestamp: "1 hour ago",
    type: "crm"
  },
  {
    id: "act-4",
    user: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    action: "approved leave request",
    target: "David Chen (3 days Annual)",
    timestamp: "3 hours ago",
    type: "hrm"
  }
];

export const UPCOMING_TASKS = [
  { id: "t1", title: "Review Q3 Raw Material Reorder List", due: "Today, 4:00 PM", priority: "High", completed: false, tag: "Manufacturing" },
  { id: "t2", title: "QC Certificate Sign-off for WO-895", due: "Today, 5:30 PM", priority: "Urgent", completed: false, tag: "Quality Control" },
  { id: "t3", title: "Approve Employee Payroll Batch #14", due: "Aug 6, 2026", priority: "Urgent", completed: false, tag: "HRM" },
  { id: "t4", title: "Bank Reconciliation for Chase Operating A/C", due: "Aug 8, 2026", priority: "Medium", completed: true, tag: "Finance" }
];

export const MOBILE_TASKS = [
  { id: "MT-1", title: "QC Inspection for WO-895 (Bio-Scanner Batch)", due: "Today 3:00 PM", status: "In Progress", priority: "High", location: "Factory Floor Line A" },
  { id: "MT-2", title: "Approve Raw Material Reorder for CNC Casings", due: "Today 5:30 PM", status: "Pending", priority: "Urgent", location: "Warehouse 1" },
  { id: "MT-3", title: "Client Onboarding Sync with Zenith Corp", due: "Tomorrow 10:00 AM", status: "Scheduled", priority: "Medium", location: "Conference Room B" }
];

export const MOBILE_ATTENDANCE_LOG = {
  status: "Checked In",
  checkInTime: "08:45 AM",
  location: "Acme Manufacturing Facility, Sector 4",
  coordinates: "37.7749° N, 122.4194° W",
  hoursToday: "4h 15m"
};

// 2. SERVER & SUPER ADMIN MANAGEMENT
export const SERVER_HEALTH_METRICS = {
  cpuUsage: 34.2,
  ramUsage: 62.8,
  storageUsage: 48.5,
  uptime: "99.992%",
  activeDbConnections: 142,
  apiRequestsPerMin: 4280,
  serverRegion: "us-east-1 (N. Virginia)"
};

export const SUPER_ADMIN_TENANTS = [
  { id: "TNT-01", name: "Acme Corporation", plan: "Manufacturing Enterprise", mrr: "$699", status: "Active", users: 54, storage: "128.4 GB", dbStatus: "Healthy", joinedDate: "Jan 12, 2025" },
  { id: "TNT-02", name: "CyberDyne Systems", plan: "Manufacturing Enterprise", mrr: "$699", status: "Active", users: 142, storage: "245.0 GB", dbStatus: "Healthy", joinedDate: "Mar 04, 2025" },
  { id: "TNT-03", name: "Wayne Enterprises", plan: "Professional SaaS", mrr: "$299", status: "Active", users: 38, storage: "42.1 GB", dbStatus: "Healthy", joinedDate: "Jun 19, 2025" },
  { id: "TNT-04", name: "Nexus Tech Solutions", plan: "Starter ERP", mrr: "$99", status: "Active", users: 8, storage: "6.2 GB", dbStatus: "Healthy", joinedDate: "Aug 01, 2026" }
];

export const SYSTEM_ERROR_LOGS = [
  { id: "LOG-901", timestamp: "2026-08-04 12:45:12", level: "INFO", service: "AuthService", message: "User s.jenkins@acme.com authenticated via OAuth2" },
  { id: "LOG-902", timestamp: "2026-08-04 12:30:04", level: "WARNING", service: "InventorySync", message: "Raw material Stock SKU-RM-102 below threshold (12 units left)" },
  { id: "LOG-903", timestamp: "2026-08-04 11:15:40", level: "INFO", service: "BOMEngine", message: "Recalculated unit cost for BOM-001 ($412.50 / unit)" }
];

// 3. MANUFACTURING MODULE DATA
export const BOM_LIST = [
  {
    id: "BOM-001",
    finishedProduct: "POS Touchscreen Terminal X1",
    productSku: "SKU-HW-101",
    category: "Hardware Electronics",
    outputQty: 1,
    unitCost: "$412.50",
    materials: [
      { name: "15.6 Inch IPS Touch Display Panel", qty: 1, unit: "Pcs", unitCost: 180.00, wastagePct: 1 },
      { name: "Aluminium CNC Terminal Casing", qty: 1, unit: "Pcs", unitCost: 85.00, wastagePct: 2 },
      { name: "ARM Octa-Core Industrial Motherboard", qty: 1, unit: "Pcs", unitCost: 110.00, wastagePct: 0 },
      { name: "Thermal Printer Module Sub-Assembly", qty: 1, unit: "Pcs", unitCost: 37.50, wastagePct: 1 }
    ],
    overheadCost: 45.00,
    laborHours: 2.5
  },
  {
    id: "BOM-002",
    finishedProduct: "Wireless Thermal Barcode Printer",
    productSku: "SKU-HW-102",
    category: "Peripherals",
    outputQty: 1,
    unitCost: "$118.00",
    materials: [
      { name: "Thermal Printhead Engine 80mm", qty: 1, unit: "Pcs", unitCost: 45.00, wastagePct: 1 },
      { name: "ABS Plastic Enclosure Box", qty: 1, unit: "Pcs", unitCost: 22.00, wastagePct: 3 },
      { name: "Bluetooth 5.0 Wireless Module", qty: 1, unit: "Pcs", unitCost: 18.00, wastagePct: 0 },
      { name: "Stepper Motor Drive Gear", qty: 2, unit: "Pcs", unitCost: 6.50, wastagePct: 2 }
    ],
    overheadCost: 20.00,
    laborHours: 1.2
  }
];

export const WORK_ORDERS_KANBAN = {
  pending: [
    { id: "WO-901", orderNo: "PO-2026-042", product: "POS Touchscreen Terminal X1", qty: 50, bomId: "BOM-001", assignedTo: "Line A - Electronics", dueDate: "Aug 12, 2026", priority: "High", stage: "Pending" },
    { id: "WO-902", orderNo: "PO-2026-045", product: "Wireless Barcode Printer", qty: 100, bomId: "BOM-002", assignedTo: "Line B - Assembly", dueDate: "Aug 16, 2026", priority: "Medium", stage: "Pending" }
  ],
  inProduction: [
    { id: "WO-898", orderNo: "PO-2026-038", product: "POS Touchscreen Terminal X1", qty: 25, bomId: "BOM-001", assignedTo: "Marcus Vance", dueDate: "Aug 06, 2026", priority: "Urgent", stage: "In Production", progress: 65 }
  ],
  qualityCheck: [
    { id: "WO-895", orderNo: "PO-2026-030", product: "Attendance Bio-Scanner", qty: 40, bomId: "BOM-003", assignedTo: "QC Team #1", dueDate: "Aug 05, 2026", priority: "High", stage: "Quality Check", progress: 90, qcStatus: "Passed" }
  ],
  completed: [
    { id: "WO-889", orderNo: "PO-2026-022", product: "Smart RFID Scanner Gun", qty: 80, bomId: "BOM-004", assignedTo: "Line C", dueDate: "Aug 02, 2026", priority: "Medium", stage: "Completed", progress: 100, qcStatus: "Passed" }
  ]
};

// Raw Material Purchase Orders (PO)
export const MANUFACTURING_PURCHASE_ORDERS = [
  { id: "PO-RM-2026-01", supplier: "OptoTech Displays Ltd", item: "15.6 Inch IPS Touch Display Panel", qty: 200, unitCost: "$180.00", total: "$36,000.00", status: "Received", expectedDate: "Aug 02, 2026", autoReorder: true },
  { id: "PO-RM-2026-02", supplier: "Precision Machining Corp", item: "Aluminium CNC Terminal Casing", qty: 150, unitCost: "$85.00", total: "$12,750.00", status: "Partially Received", expectedDate: "Aug 06, 2026", autoReorder: true },
  { id: "PO-RM-2026-03", supplier: "Silicon Core Semiconductors", item: "ARM Octa-Core Industrial Motherboard", qty: 100, unitCost: "$110.00", total: "$11,000.00", status: "Sent", expectedDate: "Aug 10, 2026", autoReorder: false },
  { id: "PO-RM-2026-04", supplier: "PrintEngine Global", item: "Thermal Printhead Engine 80mm", qty: 50, unitCost: "$45.00", total: "$2,250.00", status: "Draft", expectedDate: "Aug 14, 2026", autoReorder: true }
];

// Quality Control (QC) & Sample Testing
export const QUALITY_CONTROL_TESTS = [
  { id: "QC-8801", woId: "WO-895", batchNo: "BATCH-2026-08A", product: "Attendance Bio-Scanner", sampleQty: 5, inspector: "Marcus Vance", testDate: "Aug 04, 2026", result: "Passed", criteria: "Optical Sensor Response < 200ms, Drop Test 1.5m", certificateAttached: true, notes: "All 5 sample units passed zero-error tolerance." },
  { id: "QC-8802", woId: "WO-898", batchNo: "BATCH-2026-08B", product: "POS Touchscreen Terminal X1", sampleQty: 3, inspector: "QC Team #1", testDate: "Aug 03, 2026", result: "In Testing", criteria: "Display Touch Deadzone & Thermal Burn-in (24h)", certificateAttached: false, notes: "12 hours into burn-in test, temperature 38°C normal." },
  { id: "QC-8799", woId: "WO-882", batchNo: "BATCH-2026-07F", product: "Wireless Barcode Printer", sampleQty: 10, inspector: "Elena Rostova", testDate: "Jul 29, 2026", result: "Failed", criteria: "Bluetooth Pairing Range > 15m", certificateAttached: true, notes: "Signal degradation at 12m. Firmware patch required." }
];

// Material Usage & Wastage Reports
export const MATERIAL_USAGE_REPORTS = [
  { woId: "WO-898", item: "15.6 Inch IPS Touch Display Panel", plannedQty: 25, actualQty: 25, variance: "0.0%", scrapQty: 0, scrapCost: "$0.00", status: "Optimal" },
  { woId: "WO-898", item: "Aluminium CNC Terminal Casing", plannedQty: 25, actualQty: 26, variance: "+4.0%", scrapQty: 1, scrapCost: "$85.00", status: "Minor Scrap" },
  { woId: "WO-895", item: "ABS Plastic Enclosure Box", plannedQty: 40, actualQty: 43, variance: "+7.5%", scrapQty: 3, scrapCost: "$66.00", status: "High Scrap" }
];

// Production Scheduling & Machine Allocation
export const MACHINE_RESOURCE_ALLOCATION = [
  { machineId: "M-101", name: "CNC Milling Workstation Alpha", type: "Machining", status: "Running", utilization: "88%", assignedWO: "WO-898", nextMaintenance: "Aug 20, 2026" },
  { machineId: "M-102", name: "SMT Surface Mount Line #2", type: "Electronics Assembly", status: "Running", utilization: "94%", assignedWO: "WO-895", nextMaintenance: "Aug 15, 2026" },
  { machineId: "M-103", name: "Automated Laser Cutting Cell", type: "Fabrication", status: "Idle", utilization: "45%", assignedWO: "None", nextMaintenance: "Aug 08, 2026" },
  { machineId: "M-104", name: "Thermal Test & Calibration Chamber", type: "Quality Assurance", status: "Maintenance", utilization: "0%", assignedWO: "None", nextMaintenance: "In Progress" }
];

// Supplier Directory (Raw Materials)
export const SUPPLIER_DIRECTORY = [
  { id: "SUP-01", name: "OptoTech Displays Ltd", contact: "David Wu", email: "sales@optotech.io", leadTime: "5 Days", rating: "4.9 / 5", primaryMaterial: "IPS Display Panels", priceHistory: "$180.00 (Stable)" },
  { id: "SUP-02", name: "Precision Machining Corp", contact: "Hanna Schmidt", email: "h.schmidt@precision.de", leadTime: "7 Days", rating: "4.7 / 5", primaryMaterial: "Aluminium CNC Casings", priceHistory: "$85.00 (+2%)" },
  { id: "SUP-03", name: "Silicon Core Semiconductors", contact: "Kenji Sato", email: "sato@siliconcore.jp", leadTime: "12 Days", rating: "4.8 / 5", primaryMaterial: "Industrial Motherboards", priceHistory: "$110.00 (-4%)" }
];

// 4. INVENTORY MODULE DATA
export const RAW_MATERIALS_INVENTORY = [
  { id: "RM-101", name: "15.6 Inch IPS Touch Display Panel", sku: "SKU-RM-101", stock: 140, minStock: 20, unit: "Pcs", unitCost: "$180.00", warehouse: "Main Assembly Depot" },
  { id: "RM-102", name: "Aluminium CNC Terminal Casing", sku: "SKU-RM-102", stock: 12, minStock: 30, unit: "Pcs", unitCost: "$85.00", warehouse: "Main Assembly Depot", isLow: true },
  { id: "RM-103", name: "ARM Octa-Core Industrial Motherboard", sku: "SKU-RM-103", stock: 85, minStock: 25, unit: "Pcs", unitCost: "$110.00", warehouse: "Component Vault" },
  { id: "RM-104", name: "Thermal Printhead Engine 80mm", sku: "SKU-RM-104", stock: 8, minStock: 15, unit: "Pcs", unitCost: "$45.00", warehouse: "Component Vault", isLow: true }
];

// Stock-In Entries
export const INVENTORY_STOCK_INS = [
  { id: "STK-IN-901", item: "15.6 Inch IPS Touch Display Panel", qty: 200, warehouse: "Main Assembly Depot", unitCost: "$180.00", totalVal: "$36,000.00", source: "PO Receipt (PO-RM-2026-01)", date: "Aug 02, 2026", receivedBy: "Marcus Vance" },
  { id: "STK-IN-902", item: "Aluminium CNC Terminal Casing", qty: 75, warehouse: "Main Assembly Depot", unitCost: "$85.00", totalVal: "$6,375.00", source: "PO Receipt (PO-RM-2026-02)", date: "Aug 03, 2026", receivedBy: "Marcus Vance" },
  { id: "STK-IN-903", item: "POS Touchscreen Terminal X1", qty: 50, warehouse: "Finished Goods Hub", unitCost: "$412.50", totalVal: "$20,625.00", source: "Production Output (WO-889)", date: "Aug 01, 2026", receivedBy: "Priya Sharma" }
];

// Stock Adjustments
export const INVENTORY_ADJUSTMENTS = [
  { id: "ADJ-2026-01", item: "ABS Plastic Enclosure Box", qtyChange: -3, reason: "Damage / Scrap in QC", warehouse: "Component Vault", date: "Jul 31, 2026", status: "Approved", approvedBy: "Sarah Jenkins" },
  { id: "ADJ-2026-02", item: "ARM Octa-Core Industrial Motherboard", qtyChange: +2, reason: "Audit Correction (Found in Vault)", warehouse: "Component Vault", date: "Aug 02, 2026", status: "Approved", approvedBy: "Sarah Jenkins" }
];

// Stock Audit / Cycle Count
export const INVENTORY_AUDITS = [
  { id: "AUD-801", date: "Aug 01, 2026", warehouse: "Main Assembly Depot", auditor: "David Chen", itemsAudited: 45, status: "Completed", discrepanciesFound: 2, totalVarianceVal: "-$170.00" },
  { id: "AUD-802", date: "Aug 04, 2026", warehouse: "Component Vault", auditor: "Priya Sharma", itemsAudited: 28, status: "In Progress", discrepanciesFound: 0, totalVarianceVal: "$0.00" }
];

// 5. CRM & SALES PIPELINE
export const CRM_CLIENT_ACCOUNTS = [
  { id: "CLI-101", company: "CyberDyne Systems", industry: "AI & Automation", contactPerson: "Miles Dyson", email: "miles@cyberdyne.com", phone: "+1 (555) 234-5678", totalDeals: "$140,000", activeProjects: 2, status: "Active Client" },
  { id: "CLI-102", company: "Wayne Enterprises", industry: "Defense & Tech", contactPerson: "Lucius Fox", email: "l.fox@wayne.com", phone: "+1 (555) 876-5432", totalDeals: "$98,000", activeProjects: 1, status: "Active Client" },
  { id: "CLI-103", company: "Stark Industries", industry: "Clean Energy", contactPerson: "Pepper Potts", email: "pepper@stark.com", phone: "+1 (555) 999-0000", totalDeals: "$210,000", activeProjects: 3, status: "VIP Client" }
];

export const INITIAL_LEADS_PIPELINE = {
  leads: [
    { id: "c1", title: "Cloud Scale Migration", company: "CyberDyne Systems", value: "$45,000", contact: "Miles Dyson", email: "miles@cyberdyne.com", phone: "+1 (555) 234-5678", priority: "High", stage: "Lead", probability: "25%" },
    { id: "c2", title: "ERP License Renewal", company: "Wayne Enterprises", value: "$28,000", contact: "Lucius Fox", email: "l.fox@wayne.com", phone: "+1 (555) 876-5432", priority: "Medium", stage: "Lead", probability: "40%" }
  ],
  contacted: [
    { id: "c3", title: "Custom Dashboard Portal", company: "Acme Logistics", value: "$18,500", contact: "Wile E. Coyote", email: "wile@acme.org", phone: "+1 (555) 345-6789", priority: "Medium", stage: "Contacted", probability: "60%" }
  ],
  proposal: [
    { id: "c4", title: "Global Supply Chain Module", company: "Stark Industries", value: "$95,000", contact: "Pepper Potts", email: "pepper@stark.com", phone: "+1 (555) 999-0000", priority: "High", stage: "Proposal", probability: "80%" }
  ],
  won: [
    { id: "c5", title: "POS Hardware Suite", company: "Massive Dynamic", value: "$62,000", contact: "Nina Sharp", email: "nsharp@mdynamics.com", phone: "+1 (555) 111-2222", priority: "High", stage: "Won", probability: "100%" }
  ]
};

export const CRM_LEADS_DATA = [
  { name: "Enterprise SaaS deal", value: 35 },
  { name: "Hardware Supply Contract", value: 25 },
  { name: "Consulting Retainer", value: 20 },
  { name: "Custom ERP Dev Contract", value: 20 }
];

export const CRM_CONTRACTS = [
  { id: "CTR-2026-01", title: "Master Services Agreement", client: "Stark Industries", value: "$210,000", startDate: "Jan 01, 2026", endDate: "Dec 31, 2026", status: "Signed", signedBy: "Pepper Potts" },
  { id: "CTR-2026-02", title: "Hardware SLA & Maintenance", client: "CyberDyne Systems", value: "$45,000", startDate: "Mar 15, 2026", endDate: "Mar 14, 2027", status: "Sent", signedBy: "Pending" }
];

export const CRM_CLIENT_PROJECTS = [
  { id: "PRJ-901", name: "Global Supply Chain Module", client: "Stark Industries", budget: "$95,000", progress: 75, status: "In Progress", lead: "Alex Rivera", dueDate: "Oct 15, 2026" },
  { id: "PRJ-902", name: "ERP License Renewal & Onboarding", client: "Wayne Enterprises", budget: "$28,000", progress: 90, status: "Testing", lead: "Sarah Jenkins", dueDate: "Aug 30, 2026" }
];

// 6. HRM MODULE DATA
export const INITIAL_EMPLOYEES = [
  { id: "EMP-001", name: "Sarah Jenkins", role: "VP of Operations", department: "Executive", status: "Active", salary: "$145,000", email: "s.jenkins@acme.com", phone: "+1 555-0192", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: "EMP-002", name: "Alex Rivera", role: "Lead Sales Director", department: "Sales", status: "Active", salary: "$120,000", email: "a.rivera@acme.com", phone: "+1 555-0143", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: "EMP-003", name: "Elena Rostova", role: "HR Business Partner", department: "Human Resources", status: "On Leave", salary: "$95,000", email: "e.rostova@acme.com", phone: "+1 555-0188", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: "EMP-004", name: "David Chen", role: "Senior Financial Analyst", department: "Accounting", status: "Active", salary: "$110,000", email: "d.chen@acme.com", phone: "+1 555-0167", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { id: "EMP-005", name: "Priya Sharma", role: "Product Lead", department: "Manufacturing", status: "Remote", salary: "$130,000", email: "p.sharma@acme.com", phone: "+1 555-0122", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
  { id: "EMP-006", name: "Marcus Vance", role: "Plant Operations Lead", department: "Manufacturing", status: "Active", salary: "$125,000", email: "m.vance@acme.com", phone: "+1 555-0177", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" }
];

export const HRM_LEAVE_REQUESTS = [
  { id: "LR-101", employee: "David Chen", type: "Annual Leave", dates: "Aug 10 - Aug 12, 2026", days: 3, status: "Approved", reason: "Family Vacation", balanceLeft: 12 },
  { id: "LR-102", employee: "Priya Sharma", type: "Sick Leave", dates: "Aug 05 - Aug 06, 2026", days: 2, status: "Pending", reason: "Dental Surgery", balanceLeft: 8 }
];

export const HRM_TIME_TRACKING = [
  { id: "LOG-501", employee: "Marcus Vance", project: "WO-898 Manufacturing", task: "CNC Milling Alignment", hours: "4.5 hrs", billable: true, date: "Aug 04, 2026" },
  { id: "LOG-502", employee: "Alex Rivera", project: "Stark Global Supply Chain", task: "Proposal Presentation Sync", hours: "2.0 hrs", billable: true, date: "Aug 04, 2026" }
];

export const HRM_DEPARTMENTS = [
  { id: "DEP-1", name: "Executive & Management", head: "Sarah Jenkins", headcount: 4, budget: "$480,000" },
  { id: "DEP-2", name: "Manufacturing & Plant", head: "Marcus Vance", headcount: 24, budget: "$1,250,000" },
  { id: "DEP-3", name: "Sales & Client Success", head: "Alex Rivera", headcount: 12, budget: "$650,000" },
  { id: "DEP-4", name: "Finance & Accounting", head: "David Chen", headcount: 6, budget: "$380,000" }
];

export const HRM_PAYROLL_SUMMARY = [
  { id: "PAY-2026-07", month: "July 2026", totalEmployees: 46, grossPayroll: "$385,000.00", netPaid: "$298,400.00", status: "Completed", datePaid: "Jul 31, 2026" },
  { id: "PAY-2026-08", month: "August 2026", totalEmployees: 46, grossPayroll: "$385,000.00", netPaid: "Pending", status: "Processing", datePaid: "Due Aug 31" }
];

// 7. FINANCE & ACCOUNTING MODULE DATA
export const INITIAL_INVOICES = [
  { id: "INV-2026-089", client: "Stark Industries", date: "2026-08-01", dueDate: "2026-08-15", amount: "$95,000.00", status: "Paid", items: [{ desc: "Global ERP Module", qty: 1, rate: 95000 }] },
  { id: "INV-2026-090", client: "CyberDyne Systems", date: "2026-08-02", dueDate: "2026-08-16", amount: "$45,000.00", status: "Pending", items: [{ desc: "Cloud Scale Migration", qty: 1, rate: 45000 }] },
  { id: "INV-2026-091", client: "Wayne Enterprises", date: "2026-07-20", dueDate: "2026-08-03", amount: "$28,000.00", status: "Overdue", items: [{ desc: "ERP License Renewal", qty: 1, rate: 28000 }] }
];

export const FINANCE_PURCHASE_BILLS = [
  { id: "BILL-2026-01", vendor: "OptoTech Displays Ltd", billDate: "2026-08-02", dueDate: "2026-08-20", amount: "$36,000.00", status: "Paid", poRef: "PO-RM-2026-01" },
  { id: "BILL-2026-02", vendor: "Precision Machining Corp", billDate: "2026-08-03", dueDate: "2026-08-25", amount: "$12,750.00", status: "Unpaid", poRef: "PO-RM-2026-02" }
];

export const FINANCE_EXPENSES = [
  { id: "EXP-901", category: "Raw Material Freight", vendor: "FedEx Freight", amount: "$1,450.00", date: "Aug 03, 2026", status: "Approved", recurring: "No" },
  { id: "EXP-902", category: "AWS Cloud Infrastructure", vendor: "Amazon Web Services", amount: "$3,840.00", date: "Aug 01, 2026", status: "Approved", recurring: "Monthly" }
];

export const BANK_ACCOUNTS = [
  { id: "BANK-01", name: "Chase Corporate Operating", bankName: "JPMorgan Chase", accountNo: "•••• 4892", balance: "$482,500.00", currency: "USD", type: "Checking" },
  { id: "BANK-02", name: "Silicon Valley Tech Treasury", bankName: "SVB Financial", accountNo: "•••• 9104", balance: "$1,250,000.00", currency: "USD", type: "Savings Reserve" }
];

export const BANK_RECONCILIATION = [
  { id: "REC-101", date: "Aug 02, 2026", bankAccount: "Chase Corporate Operating", description: "Deposit - Stark Industries INV-2026-089", amount: "+$95,000.00", status: "Reconciled", matchedEntity: "INV-2026-089" },
  { id: "REC-102", date: "Aug 03, 2026", bankAccount: "Chase Corporate Operating", description: "Wire Out - OptoTech Displays Ltd", amount: "-$36,000.00", status: "Reconciled", matchedEntity: "BILL-2026-01" },
  { id: "REC-103", date: "Aug 04, 2026", bankAccount: "Chase Corporate Operating", description: "Square Clearing Fee", amount: "-$42.50", status: "Unmatched", matchedEntity: "Pending Match" }
];

export const BILLING_PLANS = [
  {
    name: "Starter ERP",
    price: "$99",
    billingCycle: "/month",
    description: "Core Accounting, Invoicing & CRM for small businesses.",
    features: [
      "Up to 10 Employee Profiles",
      "Core Accounting & Invoicing",
      "Basic CRM Pipeline",
      "5GB Cloud Document Storage"
    ],
    popular: false,
    cta: "Downgrade to Starter"
  },
  {
    name: "Manufacturing Enterprise",
    price: "$699",
    billingCycle: "/month",
    description: "Complete unified ERP + Manufacturing BOM, QC, Work Orders & Server Health Panel.",
    features: [
      "Unlimited Employees & Users",
      "Full Manufacturing Module (BOM, POs, QC Testing)",
      "Stock-In, Adjustments & Cycle Count Audits",
      "Worksuite Server & API Health Panel",
      "Companion Mobile App Access"
    ],
    popular: true,
    cta: "Active Current Plan"
  }
];

export const ROLE_PERMISSIONS_MATRIX = [
  { module: "Dashboard & Analytics", superAdmin: true, admin: true, manager: true, staff: true },
  { module: "Manufacturing (BOM, POs, QC)", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "Inventory (Stock-In, Audits)", superAdmin: true, admin: true, manager: true, staff: true },
  { module: "CRM (Accounts, Leads, Contracts)", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "HRM (Attendance, Payroll)", superAdmin: true, admin: true, manager: false, staff: false },
  { module: "Finance & Reconciliation", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "Server & API Panel", superAdmin: true, admin: false, manager: false, staff: false }
];
