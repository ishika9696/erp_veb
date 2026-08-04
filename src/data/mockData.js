// VEB ERP - Unified Enterprise Mock Data

export const BRAND = {
  name: "VEB ERP",
  tagline: "One Platform. Every Operation.",
  badgeText: "VEB",
  subText: "ERP"
};

// 1. EXECUTIVE DASHBOARD & SERVER STATS
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
    action: "completed Work Order",
    target: "WO-8892: POS Touchscreen Kiosk #40",
    timestamp: "8 minutes ago",
    type: "manufacturing"
  },
  {
    id: "act-2",
    user: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    action: "created invoice",
    target: "INV-2026-089 for $95,000",
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
  { id: "t2", title: "Client Onboarding Sync with Zenith Corp", due: "Tomorrow, 10:00 AM", priority: "Medium", completed: false, tag: "CRM" },
  { id: "t3", title: "Approve Employee Payroll Batch #14", due: "Aug 6, 2026", priority: "Urgent", completed: false, tag: "HRM" },
  { id: "t4", title: "Publish Monthly Server Audit Log", due: "Aug 8, 2026", priority: "Low", completed: true, tag: "IT Ops" }
];


// 2. SERVER & SUPER ADMIN MANAGEMENT (Worksuite style)
export const SERVER_HEALTH_METRICS = {
  cpuUsage: 34.2, // %
  ramUsage: 62.8, // % (10.0GB / 16.0GB)
  storageUsage: 48.5, // % (485GB / 1000GB)
  uptime: "99.992%",
  activeDbConnections: 142,
  apiRequestsPerMin: 4280,
  serverRegion: "us-east-1 (N. Virginia)"
};

export const SUPER_ADMIN_TENANTS = [
  { id: "TNT-01", name: "Acme Corporation", plan: "Manufacturing Enterprise", mrr: "$699", status: "Active", users: 54, storage: "128.4 GB", dbStatus: "Healthy", joinedDate: "Jan 12, 2025" },
  { id: "TNT-02", name: "CyberDyne Systems", plan: "Manufacturing Enterprise", mrr: "$699", status: "Active", users: 142, storage: "245.0 GB", dbStatus: "Healthy", joinedDate: "Mar 04, 2025" },
  { id: "TNT-03", name: "Wayne Enterprises", plan: "Professional SaaS", mrr: "$299", status: "Active", users: 38, storage: "42.1 GB", dbStatus: "Healthy", joinedDate: "Jun 19, 2025" },
  { id: "TNT-04", name: "Nexus Tech Solutions", plan: "Starter ERP", mrr: "$99", status: "Active", users: 8, storage: "6.2 GB", dbStatus: "Healthy", joinedDate: "Aug 01, 2026" },
  { id: "TNT-05", name: "Global Logistics Corp", plan: "Professional SaaS", mrr: "$299", status: "Past Due", users: 22, storage: "31.8 GB", dbStatus: "Warning", joinedDate: "Feb 18, 2026" }
];

export const SYSTEM_ERROR_LOGS = [
  { id: "LOG-901", timestamp: "2026-08-04 12:45:12", level: "INFO", service: "AuthService", message: "User s.jenkins@acme.com authenticated via OAuth2" },
  { id: "LOG-902", timestamp: "2026-08-04 12:30:04", level: "WARNING", service: "InventorySync", message: "Raw material Stock SKU-RM-102 below threshold (12 units left)" },
  { id: "LOG-903", timestamp: "2026-08-04 11:15:40", level: "INFO", service: "BOMEngine", message: "Recalculated unit cost for BOM-001 ($412.50 / unit)" },
  { id: "LOG-904", timestamp: "2026-08-04 10:02:18", level: "CRITICAL", service: "WebhookGateway", message: "Stripe webhook signature validation timeout retrying (Attempt 2/3)" }
];

// 3. MANUFACTURING MODULE DATA (Ultimate POS style)
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
    { id: "WO-895", orderNo: "PO-2026-030", product: "Attendance Bio-Scanner", qty: 40, bomId: "BOM-003", assignedTo: "QC Team #1", dueDate: "Aug 05, 2026", priority: "High", stage: "Quality Check", progress: 90 }
  ],
  completed: [
    { id: "WO-889", orderNo: "PO-2026-022", product: "Smart RFID Scanner Gun", qty: 80, bomId: "BOM-004", assignedTo: "Line C", dueDate: "Aug 02, 2026", priority: "Medium", stage: "Completed", progress: 100 }
  ]
};

export const RAW_MATERIALS_INVENTORY = [
  { id: "RM-101", name: "15.6 Inch IPS Touch Display Panel", sku: "SKU-RM-101", stock: 140, minStock: 20, unit: "Pcs", unitCost: "$180.00", warehouse: "Main Assembly Depot" },
  { id: "RM-102", name: "Aluminium CNC Terminal Casing", sku: "SKU-RM-102", stock: 12, minStock: 30, unit: "Pcs", unitCost: "$85.00", warehouse: "Main Assembly Depot", isLow: true },
  { id: "RM-103", name: "ARM Octa-Core Industrial Motherboard", sku: "SKU-RM-103", stock: 85, minStock: 25, unit: "Pcs", unitCost: "$110.00", warehouse: "Component Vault" },
  { id: "RM-104", name: "Thermal Printhead Engine 80mm", sku: "SKU-RM-104", stock: 8, minStock: 15, unit: "Pcs", unitCost: "$45.00", warehouse: "Component Vault", isLow: true }
];

// 4. MOBILE COMPANION APP DATA
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

// 5. STANDARD ERP MODULE DATA (CRM, HRM, Accounting, POS, Billing, Roles)
export const CRM_LEADS_DATA = [
  { name: "Enterprise SaaS deal", value: 35 },
  { name: "Hardware Supply Contract", value: 25 },
  { name: "Consulting Retainer", value: 20 },
  { name: "Custom ERP Dev Contract", value: 20 }
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
    { id: "c5", title: "POS Hardware & Software Suite", company: "Massive Dynamic", value: "$62,000", contact: "Nina Sharp", email: "nsharp@mdynamics.com", phone: "+1 (555) 111-2222", priority: "High", stage: "Won", probability: "100%" }
  ]
};

export const INITIAL_EMPLOYEES = [
  { id: "EMP-001", name: "Sarah Jenkins", role: "VP of Operations", department: "Executive", status: "Active", salary: "$145,000", email: "s.jenkins@acme.com", phone: "+1 555-0192", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: "EMP-002", name: "Alex Rivera", role: "Lead Sales Director", department: "Sales", status: "Active", salary: "$120,000", email: "a.rivera@acme.com", phone: "+1 555-0143", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: "EMP-003", name: "Elena Rostova", role: "HR Business Partner", department: "Human Resources", status: "On Leave", salary: "$95,000", email: "e.rostova@acme.com", phone: "+1 555-0188", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: "EMP-004", name: "David Chen", role: "Senior Financial Analyst", department: "Accounting", status: "Active", salary: "$110,000", email: "d.chen@acme.com", phone: "+1 555-0167", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { id: "EMP-005", name: "Priya Sharma", role: "Product Lead", department: "Manufacturing", status: "Remote", salary: "$130,000", email: "p.sharma@acme.com", phone: "+1 555-0122", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
  { id: "EMP-006", name: "Marcus Vance", role: "Plant Operations Lead", department: "Manufacturing", status: "Active", salary: "$125,000", email: "m.vance@acme.com", phone: "+1 555-0177", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" }
];

export const INITIAL_INVOICES = [
  { id: "INV-2026-089", client: "Stark Industries", date: "2026-08-01", dueDate: "2026-08-15", amount: "$95,000.00", status: "Paid", items: [{ desc: "Global ERP Module", qty: 1, rate: 95000 }] },
  { id: "INV-2026-090", client: "CyberDyne Systems", date: "2026-08-02", dueDate: "2026-08-16", amount: "$45,000.00", status: "Pending", items: [{ desc: "Cloud Scale Migration", qty: 1, rate: 45000 }] },
  { id: "INV-2026-091", client: "Wayne Enterprises", date: "2026-07-20", dueDate: "2026-08-03", amount: "$28,000.00", status: "Overdue", items: [{ desc: "ERP License Renewal", qty: 1, rate: 28000 }] },
  { id: "INV-2026-092", client: "Massive Dynamic", date: "2026-08-03", dueDate: "2026-08-17", amount: "$14,200.00", status: "Draft", items: [{ desc: "POS Terminal Bundle", qty: 2, rate: 7100 }] },
  { id: "INV-2026-093", client: "Acme Logistics", date: "2026-07-28", dueDate: "2026-08-11", amount: "$18,500.00", status: "Paid", items: [{ desc: "Custom Portal Setup", qty: 1, rate: 18500 }] }
];

export const POS_PRODUCTS = [
  { id: "P1", name: "POS Touchscreen Terminal X1", category: "Hardware", price: 1299.00, stock: 24, sku: "SKU-HW-101", image: "https://images.unsplash.com/photo-1556742049-0a674640c66d?w=300" },
  { id: "P2", name: "Wireless Thermal Barcode Printer", category: "Hardware", price: 289.00, stock: 45, sku: "SKU-HW-102", image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=300" },
  { id: "P3", name: "Smart RFID Scanner Gun", category: "Hardware", price: 175.00, stock: 18, sku: "SKU-HW-103", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300" },
  { id: "P4", name: "HRM Attendance Bio-Scanner", category: "Hardware", price: 450.00, stock: 12, sku: "SKU-HW-104", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300" },
  { id: "P5", name: "VEB ERP Cloud License (Monthly)", category: "Software", price: 499.00, stock: 999, sku: "SKU-ERP-01", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300" }
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
      "5GB Cloud Document Storage",
      "Standard Email Support"
    ],
    popular: false,
    cta: "Downgrade to Starter"
  },
  {
    name: "Professional SaaS",
    price: "$299",
    billingCycle: "/month",
    description: "Full suite for growing companies including POS & Inventory.",
    features: [
      "Up to 50 Employee Profiles",
      "Full CRM, HRM & Financials",
      "Warehouse Inventory Sync",
      "POS Terminal Module",
      "50GB Cloud Storage",
      "24/7 Priority Support"
    ],
    popular: false,
    cta: "Select Plan"
  },
  {
    name: "Manufacturing Enterprise",
    price: "$699",
    billingCycle: "/month",
    description: "Complete unified ERP + Manufacturing BOM, Work Orders & Server Health Panel.",
    features: [
      "Unlimited Employees & Users",
      "Full Manufacturing Module (BOM & Work Orders)",
      "Raw Material Auto-Deduction & Cost Calculator",
      "Worksuite Server & API Health Panel",
      "Companion Mobile App Access",
      "Dedicated Database Instance"
    ],
    popular: true,
    cta: "Active Current Plan"
  }
];

export const ROLE_PERMISSIONS_MATRIX = [
  { module: "Dashboard & Analytics", superAdmin: true, admin: true, manager: true, staff: true },
  { module: "Manufacturing & BOM Builder", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "Work Orders & Production", superAdmin: true, admin: true, manager: true, staff: true },
  { module: "Server & API Health Panel", superAdmin: true, admin: false, manager: false, staff: false },
  { module: "CRM & Sales Pipeline", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "HRM & Attendance", superAdmin: true, admin: true, manager: false, staff: false },
  { module: "Accounting & Invoices", superAdmin: true, admin: true, manager: true, staff: false },
  { module: "Inventory & Warehouses", superAdmin: true, admin: true, manager: true, staff: true },
  { module: "POS System", superAdmin: true, admin: true, manager: true, staff: true }
];
