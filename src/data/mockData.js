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
    version: "v2.4",
    status: "Active (Approved)",
    outputQty: 1,
    unitCost: "$412.50",
    numericUnitCost: 412.50,
    materialsCost: 305.00,
    directLaborCost: 62.50,
    overheadCost: 45.00,
    laborHours: 2.5,
    laborRatePerHour: 25.00,
    avgWastagePct: 1.8,
    targetMsrp: 799.00,
    marginPct: "48.4%",
    description: "Flagship industrial-grade 15.6-inch dual-core POS touchscreen terminal engineered for heavy retail & hospitality duty cycles.",
    materials: [
      { sku: "SKU-RM-101", name: "15.6 Inch IPS Touch Display Panel", qty: 1, unit: "Pcs", unitCost: 180.00, wastagePct: 1.0, subtotal: 180.00, supplier: "OptoTech Displays Ltd", stockStatus: "In Stock (145 Pcs)" },
      { sku: "SKU-RM-102", name: "Aluminium CNC Terminal Casing", qty: 1, unit: "Pcs", unitCost: 85.00, wastagePct: 2.0, subtotal: 85.00, supplier: "Precision Machining Corp", stockStatus: "In Stock (82 Pcs)" },
      { sku: "SKU-RM-103", name: "ARM Octa-Core Industrial Motherboard", qty: 1, unit: "Pcs", unitCost: 110.00, wastagePct: 0.5, subtotal: 110.00, supplier: "Silicon Core Semiconductors", stockStatus: "In Stock (64 Pcs)" },
      { sku: "SKU-RM-104", name: "Thermal Printer Module Sub-Assembly", qty: 1, unit: "Pcs", unitCost: 37.50, wastagePct: 1.5, subtotal: 37.50, supplier: "PrintEngine Global", stockStatus: "Low Stock (18 Pcs)" },
      { sku: "SKU-RM-105", name: "Shielded Heavy Duty USB-C & Serial Harness", qty: 2, unit: "Pcs", unitCost: 4.50, wastagePct: 0.0, subtotal: 9.00, supplier: "Apex Fasteners & Cables", stockStatus: "In Stock (320 Pcs)" },
      { sku: "SKU-RM-108", name: "Heavy Duty Corrugated Shipping Pack", qty: 1, unit: "box", unitCost: 3.50, wastagePct: 1.0, subtotal: 3.50, supplier: "PackPro Supplies", stockStatus: "In Stock (450 boxes)" }
    ],
    linkedWorkOrders: [
      { id: "WO-901", qty: 50, stage: "Pending", priority: "High", assignedTo: "Line A - Electronics", dueDate: "Aug 12, 2026", progress: 0 },
      { id: "WO-898", qty: 25, stage: "In Production", priority: "Urgent", assignedTo: "Marcus Vance", dueDate: "Aug 06, 2026", progress: 65 }
    ],
    versionHistory: [
      { version: "v2.4", date: "2026-08-01", author: "Marcus Vance (Lead Engineer)", notes: "Added shielded USB-C harness and updated motherboard revision for enhanced thermal dissipation." },
      { version: "v2.3", date: "2026-06-15", author: "Sarah Jenkins", notes: "Switched casing material to lightweight CNC Aluminium alloy for better EMI shielding." },
      { version: "v2.0", date: "2026-03-10", author: "Marcus Vance", notes: "Initial production release with IPS display integration." }
    ]
  },
  {
    id: "BOM-002",
    finishedProduct: "Wireless Thermal Barcode Printer",
    productSku: "SKU-HW-102",
    category: "Peripherals",
    version: "v1.8",
    status: "Active (Approved)",
    outputQty: 1,
    unitCost: "$118.00",
    numericUnitCost: 118.00,
    materialsCost: 91.50,
    directLaborCost: 24.00,
    overheadCost: 20.00,
    laborHours: 1.2,
    laborRatePerHour: 20.00,
    avgWastagePct: 2.1,
    targetMsrp: 249.00,
    marginPct: "52.6%",
    description: "Compact 80mm wireless thermal barcode and receipt printer with Bluetooth 5.0 and direct USB host connectivity.",
    materials: [
      { sku: "SKU-RM-104", name: "Thermal Printhead Engine 80mm", qty: 1, unit: "Pcs", unitCost: 45.00, wastagePct: 1.0, subtotal: 45.00, supplier: "PrintEngine Global", stockStatus: "Low Stock (18 Pcs)" },
      { sku: "SKU-RM-106", name: "ABS Plastic Enclosure Box", qty: 1, unit: "Pcs", unitCost: 22.00, wastagePct: 3.0, subtotal: 22.00, supplier: "Apex Fasteners & Polymers", stockStatus: "In Stock (95 Pcs)" },
      { sku: "SKU-RM-109", name: "Bluetooth 5.0 Wireless Transceiver Module", qty: 1, unit: "Pcs", unitCost: 18.00, wastagePct: 0.0, subtotal: 18.00, supplier: "Silicon Core Semiconductors", stockStatus: "In Stock (210 Pcs)" },
      { sku: "SKU-RM-110", name: "High-Torque Stepper Motor Drive Gear", qty: 2, unit: "Pcs", unitCost: 6.50, wastagePct: 2.0, subtotal: 13.00, supplier: "Precision Machining Corp", stockStatus: "In Stock (160 Pcs)" },
      { sku: "SKU-RM-105", name: "Thermal Test Receipt Roll Sample", qty: 1, unit: "roll", unitCost: 1.25, wastagePct: 0.0, subtotal: 1.25, supplier: "PrintEngine Global", stockStatus: "In Stock (500 rolls)" }
    ],
    linkedWorkOrders: [
      { id: "WO-902", qty: 100, stage: "Pending", priority: "Medium", assignedTo: "Line B - Assembly", dueDate: "Aug 16, 2026", progress: 0 },
      { id: "WO-882", qty: 60, stage: "Completed", priority: "Low", assignedTo: "Line B - Assembly", dueDate: "Jul 29, 2026", progress: 100 }
    ],
    versionHistory: [
      { version: "v1.8", date: "2026-07-10", author: "Priya Sharma", notes: "Upgraded Bluetooth chip to 5.0 low-energy standard." },
      { version: "v1.0", date: "2026-01-15", author: "Marcus Vance", notes: "Initial peripheral product BOM release." }
    ]
  },
  {
    id: "BOM-003",
    finishedProduct: "Attendance Bio-Scanner Pro",
    productSku: "SKU-HW-103",
    category: "Security & Biometrics",
    version: "v3.0",
    status: "Active (Approved)",
    outputQty: 1,
    unitCost: "$285.00",
    numericUnitCost: 285.00,
    materialsCost: 215.00,
    directLaborCost: 45.00,
    overheadCost: 25.00,
    laborHours: 1.8,
    laborRatePerHour: 25.00,
    avgWastagePct: 1.4,
    targetMsrp: 549.00,
    marginPct: "48.1%",
    description: "Optical biometric fingerprint & facial recognition access terminal with encrypted cloud sync.",
    materials: [
      { sku: "SKU-RM-111", name: "Optical 500DPI Fingerprint Sensor Prism", qty: 1, unit: "Pcs", unitCost: 75.00, wastagePct: 0.5, subtotal: 75.00, supplier: "BioSensor Precision Ltd", stockStatus: "In Stock (78 Pcs)" },
      { sku: "SKU-RM-112", name: "5-Inch TFT Color Touch Screen", qty: 1, unit: "Pcs", unitCost: 48.00, wastagePct: 1.0, subtotal: 48.00, supplier: "OptoTech Displays Ltd", stockStatus: "In Stock (110 Pcs)" },
      { sku: "SKU-RM-103", name: "ARM Octa-Core Industrial Motherboard", qty: 1, unit: "Pcs", unitCost: 110.00, wastagePct: 0.5, subtotal: 110.00, supplier: "Silicon Core Semiconductors", stockStatus: "In Stock (64 Pcs)" },
      { sku: "SKU-RM-106", name: "Polycarbonate Impact Housing", qty: 1, unit: "Pcs", unitCost: 28.00, wastagePct: 2.0, subtotal: 28.00, supplier: "Apex Fasteners & Polymers", stockStatus: "In Stock (88 Pcs)" }
    ],
    linkedWorkOrders: [
      { id: "WO-895", qty: 40, stage: "Quality Check", priority: "High", assignedTo: "QC Team #1", dueDate: "Aug 05, 2026", progress: 90 }
    ],
    versionHistory: [
      { version: "v3.0", date: "2026-07-20", author: "Marcus Vance", notes: "Integrated high-speed optical sensor with anti-spoofing algorithm." }
    ]
  },
  {
    id: "BOM-004",
    finishedProduct: "Smart RFID Scanner Gun",
    productSku: "SKU-HW-104",
    category: "Warehouse Logistics",
    version: "v1.2",
    status: "Active (Approved)",
    outputQty: 1,
    unitCost: "$175.00",
    numericUnitCost: 175.00,
    materialsCost: 135.00,
    directLaborCost: 25.00,
    overheadCost: 15.00,
    laborHours: 1.0,
    laborRatePerHour: 25.00,
    avgWastagePct: 1.2,
    targetMsrp: 389.00,
    marginPct: "55.0%",
    description: "Long-range UHF RFID and 2D barcode handheld terminal with pistol grip and rugged drop resistance.",
    materials: [
      { sku: "SKU-RM-113", name: "UHF Long-Range RFID Reader Engine", qty: 1, unit: "Pcs", unitCost: 85.00, wastagePct: 0.5, subtotal: 85.00, supplier: "Silicon Core Semiconductors", stockStatus: "In Stock (92 Pcs)" },
      { sku: "SKU-RM-114", name: "2D Imager Barcode Scan Engine", qty: 1, unit: "Pcs", unitCost: 32.00, wastagePct: 1.0, subtotal: 32.00, supplier: "OptoTech Displays Ltd", stockStatus: "In Stock (120 Pcs)" },
      { sku: "SKU-RM-115", name: "Rugged Rubberized Grip Enclosure", qty: 1, unit: "Pcs", unitCost: 18.00, wastagePct: 2.5, subtotal: 18.00, supplier: "Apex Fasteners & Polymers", stockStatus: "In Stock (150 Pcs)" }
    ],
    linkedWorkOrders: [
      { id: "WO-889", qty: 80, stage: "Completed", priority: "Medium", assignedTo: "Line C", dueDate: "Aug 02, 2026", progress: 100 }
    ],
    versionHistory: [
      { version: "v1.2", date: "2026-06-01", author: "Elena Rostova", notes: "Reinforced rubber bumpers for 2.0m drop compliance." }
    ]
  }
];

export const WORK_ORDERS_KANBAN = {
  pending: [
    {
      id: "WO-901",
      orderNo: "PO-2026-042",
      product: "POS Touchscreen Terminal X1",
      productSku: "SKU-HW-101",
      qty: 50,
      completedQty: 0,
      bomId: "BOM-001",
      assignedTo: "Line A - Electronics",
      workCenter: "SMT Line 1 & Assembly Station A",
      supervisor: "Elena Rostova",
      startDate: "Aug 10, 2026",
      dueDate: "Aug 12, 2026",
      priority: "High",
      stage: "Pending",
      progress: 0,
      notes: "Queued for Monday morning production shift. All raw materials staged in Depot Bay 2.",
      materialConsumption: [
        { item: "15.6 Inch IPS Touch Display Panel", planned: 50, actual: 0, variance: "0.0%", status: "Staged" },
        { item: "Aluminium CNC Terminal Casing", planned: 50, actual: 0, variance: "0.0%", status: "Staged" },
        { item: "ARM Octa-Core Industrial Motherboard", planned: 50, actual: 0, variance: "0.0%", status: "Staged" },
        { item: "Thermal Printer Module Sub-Assembly", planned: 50, actual: 0, variance: "0.0%", status: "Staged" }
      ],
      qcResults: null,
      timeline: [
        { step: "Work Order Created from Customer Demand", by: "Planning Engine", time: "Aug 04, 09:00 AM" },
        { step: "BOM Recipe BOM-001 Locked & Verified", by: "Marcus Vance", time: "Aug 04, 10:15 AM" }
      ]
    },
    {
      id: "WO-902",
      orderNo: "PO-2026-045",
      product: "Wireless Thermal Barcode Printer",
      productSku: "SKU-HW-102",
      qty: 100,
      completedQty: 0,
      bomId: "BOM-002",
      assignedTo: "Line B - Assembly",
      workCenter: "Assembly Cell B-4",
      supervisor: "Marcus Vance",
      startDate: "Aug 14, 2026",
      dueDate: "Aug 16, 2026",
      priority: "Medium",
      stage: "Pending",
      progress: 0,
      notes: "High volume peripheral batch for European distribution center.",
      materialConsumption: [
        { item: "Thermal Printhead Engine 80mm", planned: 100, actual: 0, variance: "0.0%", status: "Staged" },
        { item: "ABS Plastic Enclosure Box", planned: 100, actual: 0, variance: "0.0%", status: "Staged" },
        { item: "Bluetooth 5.0 Wireless Module", planned: 100, actual: 0, variance: "0.0%", status: "Staged" }
      ],
      qcResults: null,
      timeline: [
        { step: "Production Order Scheduled", by: "Production Planner", time: "Aug 04, 02:00 PM" }
      ]
    }
  ],
  inProduction: [
    {
      id: "WO-898",
      orderNo: "PO-2026-038",
      product: "POS Touchscreen Terminal X1",
      productSku: "SKU-HW-101",
      qty: 25,
      completedQty: 16,
      scrapQty: 1,
      bomId: "BOM-001",
      assignedTo: "Marcus Vance",
      workCenter: "SMT Line 2 & Final Assembly Bay 4",
      supervisor: "Marcus Vance",
      startDate: "Aug 04, 2026",
      dueDate: "Aug 06, 2026",
      priority: "Urgent",
      stage: "In Production",
      progress: 65,
      notes: "Priority expedited run for CyberDyne Systems flagship pilot store rollout.",
      materialConsumption: [
        { item: "15.6 Inch IPS Touch Display Panel", planned: 25, actual: 25, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "Aluminium CNC Terminal Casing", planned: 25, actual: 26, variance: "+4.0%", status: "Minor Scrap", scrapQty: 1 },
        { item: "ARM Octa-Core Industrial Motherboard", planned: 25, actual: 25, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "Thermal Printer Module Sub-Assembly", planned: 25, actual: 25, variance: "0.0%", status: "Optimal", scrapQty: 0 }
      ],
      qcResults: {
        testId: "QC-8802",
        status: "In Testing",
        inspector: "QC Team #1",
        testDate: "Aug 05, 2026",
        sampleSize: 3,
        passRate: "99.2%",
        defectCount: 0,
        criteria: "Display Touch Deadzone & Thermal Burn-in (24h)",
        notes: "12 hours into burn-in test, temperature 38°C normal. Zero optical defects."
      },
      timeline: [
        { step: "Work Order Released & Scheduled", by: "Production Planner", time: "Aug 04, 08:30 AM" },
        { step: "Raw Materials Picked & Issued (Batch A-12)", by: "Warehouse Team", time: "Aug 04, 09:15 AM" },
        { step: "SMT Surface Mount Processing Complete (25/25)", by: "SMT Station 2", time: "Aug 04, 03:30 PM" },
        { step: "Final Assembly & Touch Calibration 65% Completed", by: "Marcus Vance", time: "Aug 05, 11:00 AM" }
      ]
    }
  ],
  qualityCheck: [
    {
      id: "WO-895",
      orderNo: "PO-2026-030",
      product: "Attendance Bio-Scanner Pro",
      productSku: "SKU-HW-103",
      qty: 40,
      completedQty: 40,
      scrapQty: 3,
      bomId: "BOM-003",
      assignedTo: "QC Team #1",
      workCenter: "QC Cleanroom Chamber 1",
      supervisor: "Elena Rostova",
      startDate: "Aug 01, 2026",
      dueDate: "Aug 05, 2026",
      priority: "High",
      stage: "Quality Check",
      progress: 90,
      qcStatus: "Passed",
      notes: "Final stage batch testing for biometric sensor calibration and environmental drop test.",
      materialConsumption: [
        { item: "Optical 500DPI Fingerprint Sensor Prism", planned: 40, actual: 40, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "5-Inch TFT Color Touch Screen", planned: 40, actual: 40, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "ARM Octa-Core Industrial Motherboard", planned: 40, actual: 40, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "Polycarbonate Impact Housing", planned: 40, actual: 43, variance: "+7.5%", status: "High Scrap", scrapQty: 3 }
      ],
      qcResults: {
        testId: "QC-8801",
        status: "Passed",
        inspector: "Marcus Vance",
        testDate: "Aug 04, 2026",
        sampleSize: 5,
        passRate: "100.0%",
        defectCount: 0,
        criteria: "Optical Sensor Response < 200ms, Drop Test 1.5m",
        notes: "All 5 sample units passed zero-error tolerance. ISO 9001 Certificate generated."
      },
      timeline: [
        { step: "Assembly Completed (40/40 units)", by: "Line A", time: "Aug 03, 04:00 PM" },
        { step: "Transferred to QC Cleanroom", by: "QC Team #1", time: "Aug 04, 08:30 AM" },
        { step: "5-Unit Random Lot Sample Test Passed", by: "Marcus Vance", time: "Aug 04, 02:15 PM" }
      ]
    }
  ],
  completed: [
    {
      id: "WO-889",
      orderNo: "PO-2026-022",
      product: "Smart RFID Scanner Gun",
      productSku: "SKU-HW-104",
      qty: 80,
      completedQty: 80,
      scrapQty: 0,
      bomId: "BOM-004",
      assignedTo: "Line C",
      workCenter: "Assembly Cell C-2",
      supervisor: "Elena Rostova",
      startDate: "Jul 28, 2026",
      dueDate: "Aug 02, 2026",
      priority: "Medium",
      stage: "Completed",
      progress: 100,
      qcStatus: "Passed",
      notes: "Fully tested and signed off by QA. Stock transferred to Finished Goods Warehouse Hub.",
      materialConsumption: [
        { item: "UHF Long-Range RFID Reader Engine", planned: 80, actual: 80, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "2D Imager Barcode Scan Engine", planned: 80, actual: 80, variance: "0.0%", status: "Optimal", scrapQty: 0 },
        { item: "Rugged Rubberized Grip Enclosure", planned: 80, actual: 80, variance: "0.0%", status: "Optimal", scrapQty: 0 }
      ],
      qcResults: {
        testId: "QC-8798",
        status: "Passed",
        inspector: "Elena Rostova",
        testDate: "Aug 02, 2026",
        sampleSize: 8,
        passRate: "100.0%",
        defectCount: 0,
        criteria: "UHF Tag Read Distance > 6m & Drop Shock",
        notes: "Full batch cleared for dispatch. Palletized on Pallet #PLT-042."
      },
      timeline: [
        { step: "Work Order Initiated", by: "Production Planner", time: "Jul 28, 08:00 AM" },
        { step: "Assembly & Testing Complete (80/80)", by: "Line C", time: "Aug 01, 05:00 PM" },
        { step: "Finished Goods Stock-in Verified", by: "Warehouse Team", time: "Aug 02, 10:30 AM" }
      ]
    }
  ]
};

// Raw Material & Unified Purchase Orders (PO)
export const MANUFACTURING_PURCHASE_ORDERS = [
  {
    id: "PO-2026-001",
    supplier: "OptoTech Displays Ltd",
    item: "15.6 Inch IPS Touch Display Panel",
    type: "Raw Material",
    qty: 200,
    unitCost: "$180.00",
    total: "$36,000.00",
    numericTotal: 36000,
    status: "Received",
    orderDate: "2026-07-25",
    expectedDate: "2026-08-02",
    autoReorder: true,
    shippingAddress: "Plant 1 Assembly Dock, Sector 4, Acme Facility",
    billingAddress: "Acme HQ, Accounts Payable, Suite 400",
    notes: "Fragile optical grade panels. Inspect package seals before dock sign-off.",
    terms: "Net 30 days. Quality guarantee per Master Supply Agreement #4419.",
    items: [
      { desc: "15.6 Inch IPS Touch Display Panel", qty: 200, unitCost: 180, tax: 0, amount: 36000 }
    ],
    auditTrail: [
      { step: "PO Created (Draft)", by: "Marcus Vance (Manufacturing)", time: "2026-07-25 09:15 AM" },
      { step: "PO Approved & Dispatched", by: "Sarah Jenkins (VP Ops)", time: "2026-07-25 11:30 AM" },
      { step: "Shipment Received at Dock", by: "Marcus Vance (Manufacturing)", time: "2026-08-02 02:40 PM" }
    ]
  },
  {
    id: "PO-2026-002",
    supplier: "Precision Machining Corp",
    item: "Aluminium CNC Terminal Casing",
    type: "Raw Material",
    qty: 150,
    unitCost: "$85.00",
    total: "$12,750.00",
    numericTotal: 12750,
    status: "Partially Received",
    orderDate: "2026-07-28",
    expectedDate: "2026-08-06",
    autoReorder: true,
    shippingAddress: "Plant 1 Machining Wing, Sector 2",
    billingAddress: "Acme HQ, Accounts Payable, Suite 400",
    notes: "Batch #1 (75 units) delivered. Remaining 75 units in transit via freight.",
    terms: "Payment upon complete consignment receipt.",
    items: [
      { desc: "Aluminium CNC Terminal Casing", qty: 150, unitCost: 85, tax: 0, amount: 12750 }
    ],
    auditTrail: [
      { step: "PO Created & Dispatched", by: "Marcus Vance", time: "2026-07-28 10:00 AM" },
      { step: "Partial Delivery Logged (75 units)", by: "Receiving Bay A", time: "2026-08-03 04:15 PM" }
    ]
  },
  {
    id: "PO-2026-003",
    supplier: "Silicon Core Semiconductors",
    item: "ARM Octa-Core Industrial Motherboard",
    type: "Raw Material",
    qty: 100,
    unitCost: "$110.00",
    total: "$11,000.00",
    numericTotal: 11000,
    status: "Sent",
    orderDate: "2026-08-01",
    expectedDate: "2026-08-10",
    autoReorder: false,
    shippingAddress: "Component Vault Room B, Sector 3",
    billingAddress: "Acme HQ, Accounts Payable, Suite 400",
    notes: "Air freight dispatch confirmed with tracking #AWB-992014881.",
    terms: "Net 15 days upon delivery verification.",
    items: [
      { desc: "ARM Octa-Core Industrial Motherboard", qty: 100, unitCost: 110, tax: 0, amount: 11000 }
    ],
    auditTrail: [
      { step: "Requisition Generated", by: "Priya Sharma", time: "2026-07-31 03:20 PM" },
      { step: "PO Dispatched to Vendor", by: "David Chen (Finance)", time: "2026-08-01 09:00 AM" }
    ]
  },
  {
    id: "PO-2026-004",
    supplier: "PrintEngine Global",
    item: "Thermal Printhead Engine 80mm",
    type: "Raw Material",
    qty: 50,
    unitCost: "$45.00",
    total: "$2,250.00",
    numericTotal: 2250,
    status: "Draft",
    orderDate: "2026-08-04",
    expectedDate: "2026-08-14",
    autoReorder: true,
    shippingAddress: "Main Assembly Depot, Bay 4",
    billingAddress: "Acme HQ, Accounts Payable, Suite 400",
    notes: "Standard printhead replacement cycle for Peripherals Line B.",
    terms: "Standard vendor terms.",
    items: [
      { desc: "Thermal Printhead Engine 80mm", qty: 50, unitCost: 45, tax: 0, amount: 2250 }
    ],
    auditTrail: [
      { step: "Draft Prepared", by: "Marcus Vance", time: "2026-08-04 11:45 AM" }
    ]
  },
  {
    id: "PO-2026-005",
    supplier: "Dell Technologies",
    item: "Enterprise 2U Rack Servers R750",
    type: "General Purchase",
    qty: 2,
    unitCost: "$11,250.00",
    total: "$22,500.00",
    numericTotal: 22500,
    status: "Received",
    orderDate: "2026-07-20",
    expectedDate: "2026-07-29",
    autoReorder: false,
    shippingAddress: "Data Center Room 3, Acme Tech Park",
    billingAddress: "Acme HQ, Accounts Payable, Suite 400",
    notes: "Dual Xeon Scalable, 128GB ECC RAM, 3.84TB NVMe storage array.",
    terms: "3-Year ProSupport Plus on-site warranty included.",
    items: [
      { desc: "Dell PowerEdge R750 Rack Server 128GB", qty: 2, unitCost: 11250, tax: 0, amount: 22500 }
    ],
    auditTrail: [
      { step: "IT Infrastructure PO Created", by: "Sarah Jenkins", time: "2026-07-20 08:30 AM" },
      { step: "Delivered & Provisioned in Rack", by: "IT Operations", time: "2026-07-29 03:00 PM" }
    ]
  }
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

// 4. INVENTORY & RAW MATERIALS MASTER DATA (Single Source of Truth)
export const RAW_MATERIALS_INVENTORY = [
  {
    id: "RM-101",
    name: "15.6 Inch IPS Touch Display Panel",
    sku: "SKU-RM-101",
    type: "raw_material",
    category: "Electronics & Displays",
    unit: "Pcs",
    stock: 140,
    minStock: 20,
    unitCost: "$180.00",
    numericCost: 180.00,
    warehouse: "Main Assembly Depot",
    preferredSupplier: "OptoTech Displays Ltd",
    supplierLeadTime: "5 Days",
    description: "Industrial 1080p capacitive 10-point multi-touch display panel with tempered glass coating and anti-glare finish.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 100 },
      { name: "Component Vault", qty: 40 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-101", type: "Stock-In (PO Receipt)", ref: "PO-2026-001", qty: +200, date: "2026-08-02", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-102", type: "Production Consumption", ref: "WO-898", qty: -25, date: "2026-08-05", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-103", type: "Production Consumption", ref: "WO-901", qty: -35, date: "2026-08-07", user: "Marcus Vance", warehouse: "Main Assembly Depot" }
    ]
  },
  {
    id: "RM-102",
    name: "Aluminium CNC Terminal Casing",
    sku: "SKU-RM-102",
    type: "raw_material",
    category: "Metals & Enclosures",
    unit: "Pcs",
    stock: 12,
    minStock: 30,
    unitCost: "$85.00",
    numericCost: 85.00,
    warehouse: "Main Assembly Depot",
    preferredSupplier: "Precision Machining Corp",
    supplierLeadTime: "7 Days",
    isLow: true,
    description: "Anodized space-grey aircraft-grade aluminium chassis with precision port cutouts and integrated passive heatsink.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 12 },
      { name: "Component Vault", qty: 0 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-201", type: "Stock-In (PO Receipt)", ref: "PO-2026-002", qty: +75, date: "2026-08-03", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-202", type: "Production Consumption", ref: "WO-898", qty: -25, date: "2026-08-05", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-203", type: "Production Consumption", ref: "WO-901", qty: -38, date: "2026-08-07", user: "Marcus Vance", warehouse: "Main Assembly Depot" }
    ]
  },
  {
    id: "RM-103",
    name: "ARM Octa-Core Industrial Motherboard",
    sku: "SKU-RM-103",
    type: "raw_material",
    category: "Processors & Chips",
    unit: "Pcs",
    stock: 85,
    minStock: 25,
    unitCost: "$110.00",
    numericCost: 110.00,
    warehouse: "Component Vault",
    preferredSupplier: "Silicon Core Semiconductors",
    supplierLeadTime: "12 Days",
    description: "Custom embedded compute board with Octa-core ARM SoC, 8GB LPDDR4 RAM, onboard Gigabit Ethernet and Dual HDMI.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 25 },
      { name: "Component Vault", qty: 60 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-301", type: "Stock-In (PO Receipt)", ref: "PO-2026-003", qty: +100, date: "2026-07-28", user: "Sarah Jenkins", warehouse: "Component Vault" },
      { id: "MOV-302", type: "Stock Adjustment", ref: "ADJ-2026-02", qty: +2, date: "2026-08-02", user: "Sarah Jenkins", warehouse: "Component Vault" },
      { id: "MOV-303", type: "Production Consumption", ref: "WO-898", qty: -17, date: "2026-08-06", user: "Marcus Vance", warehouse: "Component Vault" }
    ]
  },
  {
    id: "RM-104",
    name: "Thermal Printhead Engine 80mm",
    sku: "SKU-RM-104",
    type: "raw_material",
    category: "Thermal & Printing",
    unit: "Pcs",
    stock: 8,
    minStock: 15,
    unitCost: "$45.00",
    numericCost: 45.00,
    warehouse: "Component Vault",
    preferredSupplier: "OptoTech Displays Ltd",
    supplierLeadTime: "6 Days",
    isLow: true,
    description: "High-speed 250mm/sec 203 DPI direct thermal receipt print mechanism with integrated auto-cutter.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 2 },
      { name: "Component Vault", qty: 6 }
    ],
    linkedBoms: [
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-401", type: "Stock-In (PO Receipt)", ref: "PO-RM-2026-04", qty: +30, date: "2026-07-25", user: "Sarah Jenkins", warehouse: "Component Vault" },
      { id: "MOV-402", type: "Production Consumption", ref: "WO-902", qty: -20, date: "2026-08-04", user: "Marcus Vance", warehouse: "Component Vault" },
      { id: "MOV-403", type: "Stock Adjustment", ref: "ADJ-2026-03", qty: -2, date: "2026-08-07", user: "Sarah Jenkins", warehouse: "Component Vault" }
    ]
  },
  {
    id: "RM-105",
    name: "ABS Plastic Enclosure Box",
    sku: "SKU-RM-105",
    type: "raw_material",
    category: "Plastics & Polymers",
    unit: "Pcs",
    stock: 220,
    minStock: 50,
    unitCost: "$22.00",
    numericCost: 22.00,
    warehouse: "Main Assembly Depot",
    preferredSupplier: "Precision Machining Corp",
    supplierLeadTime: "4 Days",
    description: "Flame-retardant UL94-V0 molded ABS plastic housing for handheld printers and barcode scanners.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 170 },
      { name: "Component Vault", qty: 50 }
    ],
    linkedBoms: [
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-501", type: "Stock-In (PO Receipt)", ref: "PO-RM-2026-05", qty: +300, date: "2026-07-30", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-502", type: "Stock Adjustment", ref: "ADJ-2026-01", qty: -3, date: "2026-07-31", user: "Sarah Jenkins", warehouse: "Component Vault" },
      { id: "MOV-503", type: "Production Consumption", ref: "WO-902", qty: -77, date: "2026-08-04", user: "Marcus Vance", warehouse: "Main Assembly Depot" }
    ]
  },
  {
    id: "RM-106",
    name: "Bluetooth 5.0 Wireless BLE Module",
    sku: "SKU-RM-106",
    type: "raw_material",
    category: "Processors & Chips",
    unit: "Pcs",
    stock: 0,
    minStock: 25,
    unitCost: "$18.00",
    numericCost: 18.00,
    warehouse: "Component Vault",
    preferredSupplier: "Silicon Core Semiconductors",
    supplierLeadTime: "10 Days",
    isLow: true,
    isOutOfStock: true,
    description: "Ultra-low power Bluetooth 5.0 Dual Mode transmitter/receiver chip with integrated PCB trace antenna.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 0 },
      { name: "Component Vault", qty: 0 }
    ],
    linkedBoms: [
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-601", type: "Stock-In (PO Receipt)", ref: "PO-RM-2026-06", qty: +100, date: "2026-07-15", user: "Sarah Jenkins", warehouse: "Component Vault" },
      { id: "MOV-602", type: "Production Consumption", ref: "WO-902", qty: -100, date: "2026-08-06", user: "Marcus Vance", warehouse: "Component Vault" }
    ]
  },
  {
    id: "RM-107",
    name: "Copper Shielded Data Cable Harness",
    sku: "SKU-RM-107",
    type: "raw_material",
    category: "Cables & Wiring",
    unit: "meter",
    stock: 450,
    minStock: 100,
    unitCost: "$4.50",
    numericCost: 4.50,
    warehouse: "Main Assembly Depot",
    preferredSupplier: "OptoTech Displays Ltd",
    supplierLeadTime: "3 Days",
    description: "Double-shielded twisted pair copper wire harness with gold-plated internal pin terminals.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 300 },
      { name: "Component Vault", qty: 150 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 2, unit: "meter" },
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "meter" }
    ],
    stockMovements: [
      { id: "MOV-701", type: "Stock-In (PO Receipt)", ref: "PO-RM-2026-07", qty: +500, date: "2026-08-01", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-702", type: "Production Consumption", ref: "WO-898", qty: -50, date: "2026-08-05", user: "Marcus Vance", warehouse: "Main Assembly Depot" }
    ]
  },
  {
    id: "RM-108",
    name: "Corrugated Export Packaging Box",
    sku: "SKU-RM-108",
    type: "raw_material",
    category: "Packaging & Boxes",
    unit: "box",
    stock: 320,
    minStock: 80,
    unitCost: "$6.20",
    numericCost: 6.20,
    warehouse: "Main Assembly Depot",
    preferredSupplier: "Precision Machining Corp",
    supplierLeadTime: "2 Days",
    description: "Heavy-duty 5-ply kraft corrugated cardboard retail/shipping box with custom die-cut foam inserts.",
    warehouses: [
      { name: "Main Assembly Depot", qty: 320 },
      { name: "Component Vault", qty: 0 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 1, unit: "box" },
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "box" }
    ],
    stockMovements: [
      { id: "MOV-801", type: "Stock-In (PO Receipt)", ref: "PO-RM-2026-08", qty: +400, date: "2026-08-01", user: "Marcus Vance", warehouse: "Main Assembly Depot" },
      { id: "MOV-802", type: "Production Consumption", ref: "WO-889", qty: -80, date: "2026-08-02", user: "Marcus Vance", warehouse: "Main Assembly Depot" }
    ]
  }
];

// Unified Inventory (Raw Materials + Finished Goods)
export const INITIAL_INVENTORY_ITEMS = [
  ...RAW_MATERIALS_INVENTORY,
  {
    id: "FG-201",
    name: "POS Touchscreen Terminal X1",
    sku: "SKU-HW-101",
    type: "finished_good",
    category: "Finished Hardware",
    unit: "Pcs",
    stock: 42,
    minStock: 10,
    unitCost: "$412.50",
    numericCost: 412.50,
    warehouse: "Finished Goods Hub",
    preferredSupplier: "Internal Assembly Plant",
    supplierLeadTime: "2 Days",
    description: "Complete flagship 15.6 inch all-in-one POS point of sale terminal with integrated capacitive screen and high-speed CPU.",
    warehouses: [
      { name: "Finished Goods Hub", qty: 42 }
    ],
    linkedBoms: [
      { id: "BOM-001", product: "POS Touchscreen Terminal X1", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-901", type: "Production Output", ref: "WO-889", qty: +50, date: "2026-08-01", user: "Priya Sharma", warehouse: "Finished Goods Hub" },
      { id: "MOV-902", type: "Sales Dispatch", ref: "SO-2026-88", qty: -8, date: "2026-08-04", user: "David Wu", warehouse: "Finished Goods Hub" }
    ]
  },
  {
    id: "FG-202",
    name: "Wireless Thermal Barcode Printer",
    sku: "SKU-HW-102",
    type: "finished_good",
    category: "Finished Hardware",
    unit: "Pcs",
    stock: 28,
    minStock: 8,
    unitCost: "$118.00",
    numericCost: 118.00,
    warehouse: "Finished Goods Hub",
    preferredSupplier: "Internal Assembly Plant",
    supplierLeadTime: "1 Day",
    description: "Compact wireless thermal 80mm barcode and receipt printer with Bluetooth 5.0 and USB-C connectivity.",
    warehouses: [
      { name: "Finished Goods Hub", qty: 28 }
    ],
    linkedBoms: [
      { id: "BOM-002", product: "Wireless Thermal Barcode Printer", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-903", type: "Production Output", ref: "WO-889", qty: +35, date: "2026-08-02", user: "Priya Sharma", warehouse: "Finished Goods Hub" },
      { id: "MOV-904", type: "Sales Dispatch", ref: "SO-2026-91", qty: -7, date: "2026-08-05", user: "David Wu", warehouse: "Finished Goods Hub" }
    ]
  },
  {
    id: "FG-203",
    name: "Smart RFID Scanner Gun",
    sku: "SKU-HW-103",
    type: "finished_good",
    category: "Finished Hardware",
    unit: "Pcs",
    stock: 65,
    minStock: 15,
    unitCost: "$165.00",
    numericCost: 165.00,
    warehouse: "Finished Goods Hub",
    preferredSupplier: "Internal Assembly Plant",
    supplierLeadTime: "2 Days",
    description: "Industrial handheld UHF RFID and 2D barcode scanner gun with rugged drop protection.",
    warehouses: [
      { name: "Finished Goods Hub", qty: 65 }
    ],
    linkedBoms: [
      { id: "BOM-004", product: "Smart RFID Scanner Gun", qtyPerUnit: 1, unit: "Pcs" }
    ],
    stockMovements: [
      { id: "MOV-905", type: "Production Output", ref: "WO-889", qty: +80, date: "2026-08-02", user: "Priya Sharma", warehouse: "Finished Goods Hub" },
      { id: "MOV-906", type: "Sales Dispatch", ref: "SO-2026-94", qty: -15, date: "2026-08-06", user: "David Wu", warehouse: "Finished Goods Hub" }
    ]
  }
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
  { id: "EMP-001", name: "Sarah Jenkins", role: "VP of Operations", department: "Executive", status: "Active", salary: "$145,000", email: "s.jenkins@acme.com", phone: "+1 555-0192", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", isOnline: true },
  { id: "EMP-002", name: "Alex Rivera", role: "Lead Sales Director", department: "Sales", status: "Active", salary: "$120,000", email: "a.rivera@acme.com", phone: "+1 555-0143", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", isOnline: true },
  { id: "EMP-003", name: "Elena Rostova", role: "HR Business Partner", department: "Human Resources", status: "On Leave", salary: "$95,000", email: "e.rostova@acme.com", phone: "+1 555-0188", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", isOnline: false },
  { id: "EMP-004", name: "David Chen", role: "Senior Financial Analyst", department: "Finance", status: "Active", salary: "$110,000", email: "d.chen@acme.com", phone: "+1 555-0167", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", isOnline: true },
  { id: "EMP-005", name: "Priya Sharma", role: "Product Lead", department: "Manufacturing", status: "Remote", salary: "$130,000", email: "p.sharma@acme.com", phone: "+1 555-0122", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", isOnline: true },
  { id: "EMP-006", name: "Marcus Vance", role: "Plant Operations Lead", department: "Manufacturing", status: "Active", salary: "$125,000", email: "m.vance@acme.com", phone: "+1 555-0177", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", isOnline: false }
];

export const HRM_LEAVE_TYPES = [
  { id: "LT-01", name: "Annual Leave", quota: 18, paid: true, autoApprove: false, description: "Standard paid vacation allowance per calendar year." },
  { id: "LT-02", name: "Sick Leave", quota: 10, paid: true, autoApprove: true, description: "Medical leave for health recovery and doctor visits." },
  { id: "LT-03", name: "Casual Leave", quota: 7, paid: true, autoApprove: false, description: "Short-notice personal emergency leave." },
  { id: "LT-04", name: "Unpaid Leave", quota: 30, paid: false, autoApprove: false, description: "Extended leave without pay subject to executive review." }
];

export const HRM_LEAVE_REQUESTS = [
  { id: "LR-101", employee: "David Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", type: "Annual Leave", dates: "Aug 10 - Aug 12, 2026", days: 3, status: "Approved", reason: "Family Vacation", balanceLeft: 12 },
  { id: "LR-102", employee: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", type: "Sick Leave", dates: "Aug 05 - Aug 06, 2026", days: 2, status: "Pending", reason: "Dental Surgery", balanceLeft: 8 },
  { id: "LR-103", employee: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", type: "Casual Leave", dates: "Aug 18 - Aug 19, 2026", days: 2, status: "Pending", reason: "Personal Relocation", balanceLeft: 5 },
  { id: "LR-104", employee: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", type: "Annual Leave", dates: "Jul 20 - Jul 24, 2026", days: 5, status: "Rejected", reason: "Overlapping Plant Shift Schedule", balanceLeft: 14 }
];

export const HRM_ATTENDANCE_LOGS = [
  { id: "ATT-001", employee: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", department: "Executive", clockIn: "08:45 AM", clockOut: "05:30 PM", status: "Present", workHours: "8h 45m", date: "2026-08-04" },
  { id: "ATT-002", employee: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", department: "Sales", clockIn: "09:05 AM", clockOut: "06:00 PM", status: "Late", workHours: "8h 55m", date: "2026-08-04" },
  { id: "ATT-003", employee: "David Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", department: "Finance", clockIn: "08:50 AM", clockOut: "05:15 PM", status: "Present", workHours: "8h 25m", date: "2026-08-04" },
  { id: "ATT-004", employee: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", department: "Human Resources", clockIn: "--:--", clockOut: "--:--", status: "Absent", workHours: "0h 00m", date: "2026-08-04" },
  { id: "ATT-005", employee: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", department: "Manufacturing", clockIn: "08:30 AM", clockOut: "05:00 PM", status: "Present", workHours: "8h 30m", date: "2026-08-04" }
];

export const HRM_TIME_TRACKING = [
  { id: "LOG-501", employee: "Marcus Vance", project: "WO-898 Manufacturing", task: "CNC Milling Alignment", hours: "4.5 hrs", billable: true, date: "Aug 04, 2026" },
  { id: "LOG-502", employee: "Alex Rivera", project: "Stark Global Supply Chain", task: "Proposal Presentation Sync", hours: "2.0 hrs", billable: true, date: "Aug 04, 2026" }
];

export const HRM_DEPARTMENTS = [
  { id: "DEP-1", name: "Executive & Management", code: "EXEC", head: "Sarah Jenkins", headcount: 4, budget: "$480,000", description: "Strategic leadership, corporate governance, and operational direction." },
  { id: "DEP-2", name: "Manufacturing & Plant", code: "MFG", head: "Marcus Vance", headcount: 24, budget: "$1,250,000", description: "BOM production lines, assembly, quality control, and shop-floor machinery." },
  { id: "DEP-3", name: "Sales & Client Success", code: "SLS", head: "Alex Rivera", headcount: 12, budget: "$650,000", description: "Enterprise sales pipeline, account management, and customer relations." },
  { id: "DEP-4", name: "Finance & Accounting", code: "FIN", head: "David Chen", headcount: 6, budget: "$380,000", description: "Financial reporting, invoicing, audit reconciliation, and payroll processing." }
];

export const HRM_DESIGNATIONS = [
  { id: "DSG-01", title: "VP of Operations", department: "Executive & Management", level: "Executive Level", headcount: 1, minSalary: "$130,000", maxSalary: "$160,000" },
  { id: "DSG-02", title: "Lead Sales Director", department: "Sales & Client Success", level: "Senior Director", headcount: 2, minSalary: "$110,000", maxSalary: "$140,000" },
  { id: "DSG-03", title: "HR Business Partner", department: "Executive & Management", level: "Mid-Senior Level", headcount: 2, minSalary: "$85,000", maxSalary: "$105,000" },
  { id: "DSG-04", title: "Senior Financial Analyst", department: "Finance & Accounting", level: "Senior Level", headcount: 3, minSalary: "$95,000", maxSalary: "$120,000" },
  { id: "DSG-05", title: "Plant Operations Lead", department: "Manufacturing & Plant", level: "Manager Level", headcount: 4, minSalary: "$100,000", maxSalary: "$135,000" }
];

export const HRM_PAYROLL_SUMMARY = [
  { id: "PAY-2026-07", month: "July 2026", totalEmployees: 46, grossPayroll: "$385,000.00", netPaid: "$298,400.00", deductions: "$86,600.00", status: "Completed", datePaid: "Jul 31, 2026" },
  { id: "PAY-2026-08", month: "August 2026", totalEmployees: 46, grossPayroll: "$385,000.00", netPaid: "$298,400.00", deductions: "$86,600.00", status: "Processing", datePaid: "Due Aug 31, 2026" }
];

export const HRM_SALES_TARGETS = [
  { id: "ST-01", employee: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", role: "Sales Director", lastMonth: "$125,000", thisMonth: "$142,000", target: "$150,000", commissionRate: "4.5%", achievedPct: 94.6, status: "On Track" },
  { id: "ST-02", employee: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", role: "VP Operations / Enterprise Accounts", lastMonth: "$85,000", thisMonth: "$98,000", target: "$100,000", commissionRate: "3.0%", achievedPct: 98.0, status: "On Track" },
  { id: "ST-03", employee: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", role: "Product Solutions Specialist", lastMonth: "$42,000", thisMonth: "$35,000", target: "$60,000", commissionRate: "2.5%", achievedPct: 58.3, status: "Needs Attention" }
];

export const HRM_SALES_TARGET_CHART = [
  { month: "Mar", target: 280000, achieved: 265000 },
  { month: "Apr", target: 290000, achieved: 288000 },
  { month: "May", target: 300000, achieved: 312000 },
  { month: "Jun", target: 310000, achieved: 305000 },
  { month: "Jul", target: 310000, achieved: 322000 },
  { month: "Aug", target: 325000, achieved: 275000 }
];

export const HRM_BIRTHDAYS = [
  { id: "BD-01", name: "Priya Sharma", role: "Product Lead", department: "Manufacturing", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", date: "Today, Aug 05", isToday: true },
  { id: "BD-02", name: "David Chen", role: "Senior Financial Analyst", department: "Finance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", date: "Aug 12 (in 7 days)", isToday: false },
  { id: "BD-03", name: "Alex Rivera", role: "Lead Sales Director", department: "Sales", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", date: "Aug 24 (in 19 days)", isToday: false }
];

export const HRM_HOLIDAYS = [
  { id: "HOL-01", name: "Independence & Freedom Day", date: "Aug 15, 2026", day: "Saturday", status: "Upcoming", recurring: true, type: "National Holiday" },
  { id: "HOL-02", name: "Labor & Workers Day", date: "Sep 07, 2026", day: "Monday", status: "Upcoming", recurring: true, type: "Public Holiday" },
  { id: "HOL-03", name: "Annual Corporate Retreat Day", date: "Oct 16, 2026", day: "Friday", status: "Upcoming", recurring: false, type: "Company Holiday" }
];

export const HRM_SETTINGS_DATA = {
  leavePolicy: {
    workingDaysPerWeek: 5,
    carryForwardLimit: 5,
    autoApproveSickLeave: true,
    requireMedicalDocDays: 3
  },
  payrollCycle: {
    frequency: "Monthly",
    payDay: 28,
    currency: "USD ($)",
    taxDeductionRate: "18.5%"
  },
  notifications: {
    emailOnLeaveRequest: true,
    slackAttendanceAlerts: true,
    notifyPayrollDisbursement: true
  }
};

// 7. FINANCE & ACCOUNTING MODULE DATA
export const FINANCE_ESTIMATES = [
  {
    id: "EST-2026-001",
    client: "Stark Industries",
    project: "Global Supply Chain Module",
    date: "2026-08-01",
    validUntil: "2026-08-30",
    amount: "$115,000.00",
    numericAmount: 115000,
    status: "Accepted",
    terms: "Standard 30-day proposal validity. 50% upfront deposit required upon acceptance.",
    items: [
      { desc: "Supply Chain AI Module License", qty: 1, rate: 85000, tax: 10, amount: 93500 },
      { desc: "Integration & Setup Services", qty: 40, rate: 500, tax: 0, amount: 20000 }
    ]
  },
  {
    id: "EST-2026-002",
    client: "CyberDyne Systems",
    project: "Cloud Scale Migration",
    date: "2026-08-02",
    validUntil: "2026-08-31",
    amount: "$48,500.00",
    numericAmount: 48500,
    status: "Sent",
    terms: "Valid for 30 days. Includes 3 months post-migration support.",
    items: [
      { desc: "Database Migration & Schema Audit", qty: 1, rate: 35000, tax: 0, amount: 35000 },
      { desc: "High Availability Server Config", qty: 1, rate: 13500, tax: 0, amount: 13500 }
    ]
  },
  {
    id: "EST-2026-003",
    client: "Wayne Enterprises",
    project: "ERP License Renewal",
    date: "2026-08-03",
    validUntil: "2026-09-02",
    amount: "$32,000.00",
    numericAmount: 32000,
    status: "Draft",
    terms: "Annual subscription renewal proposal.",
    items: [
      { desc: "Enterprise Annual License 2026-2027", qty: 1, rate: 32000, tax: 0, amount: 32000 }
    ]
  },
  {
    id: "EST-2026-004",
    client: "Acme Logistics",
    project: "Fleet Tracking Sync",
    date: "2026-07-25",
    validUntil: "2026-08-25",
    amount: "$15,000.00",
    numericAmount: 15000,
    status: "Declined",
    terms: "Custom GPS API integration proposal.",
    items: [
      { desc: "Telematics API Integration", qty: 1, rate: 15000, tax: 0, amount: 15000 }
    ]
  },
  {
    id: "EST-2026-005",
    client: "Nexus Tech Solutions",
    project: "CRM Data Migration",
    date: "2026-07-10",
    validUntil: "2026-08-01",
    amount: "$22,500.00",
    numericAmount: 22500,
    status: "Expired",
    terms: "Legacy database import proposal.",
    items: [
      { desc: "Data Cleanup & ETL Pipeline", qty: 1, rate: 22500, tax: 0, amount: 22500 }
    ]
  }
];

export const INITIAL_INVOICES = [
  {
    id: "INV-2026-089",
    client: "Stark Industries",
    project: "Global Supply Chain Module",
    date: "2026-08-01",
    dueDate: "2026-08-15",
    amount: "$95,000.00",
    numericAmount: 95000,
    amountDue: "$0.00",
    numericAmountDue: 0,
    status: "Paid",
    estimateRef: "EST-2026-001",
    items: [{ desc: "Global ERP Module Implementation", qty: 1, rate: 95000, tax: 0, amount: 95000 }]
  },
  {
    id: "INV-2026-090",
    client: "CyberDyne Systems",
    project: "Cloud Scale Migration",
    date: "2026-08-02",
    dueDate: "2026-08-16",
    amount: "$45,000.00",
    numericAmount: 45000,
    amountDue: "$22,500.00",
    numericAmountDue: 22500,
    status: "Partially Paid",
    estimateRef: "EST-2026-002",
    items: [{ desc: "Cloud Scale Migration Milestone 1", qty: 1, rate: 45000, tax: 0, amount: 45000 }]
  },
  {
    id: "INV-2026-091",
    client: "Wayne Enterprises",
    project: "ERP License Renewal",
    date: "2026-07-20",
    dueDate: "2026-08-03",
    amount: "$28,000.00",
    numericAmount: 28000,
    amountDue: "$28,000.00",
    numericAmountDue: 28000,
    status: "Overdue",
    estimateRef: null,
    items: [{ desc: "ERP License Renewal Annual", qty: 1, rate: 28000, tax: 0, amount: 28000 }]
  },
  {
    id: "INV-2026-092",
    client: "Acme Logistics",
    project: "Fleet Tracking Sync",
    date: "2026-08-03",
    dueDate: "2026-08-18",
    amount: "$68,000.00",
    numericAmount: 68000,
    amountDue: "$68,000.00",
    numericAmountDue: 68000,
    status: "Sent",
    estimateRef: null,
    items: [{ desc: "Fleet Telematics Module & Hardware", qty: 1, rate: 68000, tax: 0, amount: 68000 }]
  },
  {
    id: "INV-2026-093",
    client: "Nexus Tech Solutions",
    project: "CRM Data Migration",
    date: "2026-07-15",
    dueDate: "2026-07-30",
    amount: "$18,500.00",
    numericAmount: 18500,
    amountDue: "$0.00",
    numericAmountDue: 0,
    status: "Draft",
    estimateRef: null,
    items: [{ desc: "CRM Onboarding & Training Batch", qty: 1, rate: 18500, tax: 0, amount: 18500 }]
  }
];

export const FINANCE_PAYMENTS = [
  {
    id: "PAY-901",
    client: "Stark Industries",
    invoiceId: "INV-2026-089",
    date: "2026-08-03",
    method: "Bank Wire Transfer",
    txnId: "TXN-884920194",
    amount: "$95,000.00",
    numericAmount: 95000,
    status: "Completed",
    auditTrail: [
      { step: "Invoice Issued", by: "Sarah Jenkins", time: "2026-08-01 10:00 AM" },
      { step: "Wire Payment Received", by: "Stark Financial Portal", time: "2026-08-03 09:30 AM" },
      { step: "Bank Reconciliation Matched", by: "David Chen (Finance)", time: "2026-08-03 09:35 AM" }
    ]
  },
  {
    id: "PAY-902",
    client: "CyberDyne Systems",
    invoiceId: "INV-2026-090",
    date: "2026-08-04",
    method: "Credit Card (Stripe)",
    txnId: "TXN-993012847",
    amount: "$22,500.00",
    numericAmount: 22500,
    status: "Completed",
    auditTrail: [
      { step: "Invoice Issued", by: "David Chen", time: "2026-08-02 02:15 PM" },
      { step: "Card Charge Processed", by: "Stripe Payment Gateway", time: "2026-08-04 11:20 AM" },
      { step: "Partial Settlement Applied", by: "System Auto-Sync", time: "2026-08-04 11:21 AM" }
    ]
  },
  {
    id: "PAY-903",
    client: "Nexus Tech Solutions",
    invoiceId: "INV-2026-093",
    date: "2026-07-28",
    method: "ACH Electronic Check",
    txnId: "TXN-102938475",
    amount: "$18,500.00",
    numericAmount: 18500,
    status: "Completed",
    auditTrail: [
      { step: "Invoice Issued", by: "Elena Rostova", time: "2026-07-15 04:00 PM" },
      { step: "ACH Transfer Received", by: "Chase Checking Account", time: "2026-07-28 08:45 AM" }
    ]
  },
  {
    id: "PAY-904",
    client: "Acme Logistics",
    invoiceId: "INV-2026-092",
    date: "2026-08-04",
    method: "Direct Deposit",
    txnId: "TXN-554920112",
    amount: "$12,750.00",
    numericAmount: 12750,
    status: "Pending Settlement",
    auditTrail: [
      { step: "Deposit Submitted", by: "Acme Accounts Payable", time: "2026-08-04 03:10 PM" },
      { step: "Clearing Pending", by: "SVB Treasury", time: "2026-08-04 03:11 PM" }
    ]
  }
];

export const FINANCE_CREDIT_NOTES = [
  {
    id: "CN-2026-01",
    client: "Wayne Enterprises",
    originalInvoice: "INV-2026-091",
    issueDate: "2026-08-04",
    creditAmount: "$5,000.00",
    numericCreditAmount: 5000,
    remainingBalance: "$5,000.00",
    numericRemainingBalance: 5000,
    status: "Unused",
    reason: "BOM Quantity Adjustment Refund"
  },
  {
    id: "CN-2026-02",
    client: "CyberDyne Systems",
    originalInvoice: "INV-2026-090",
    issueDate: "2026-08-03",
    creditAmount: "$3,500.00",
    numericCreditAmount: 3500,
    remainingBalance: "$1,500.00",
    numericRemainingBalance: 1500,
    status: "Partially Redeemed",
    reason: "SLA Downtime Penalty Credit"
  },
  {
    id: "CN-2026-03",
    client: "Stark Industries",
    originalInvoice: "INV-2026-089",
    issueDate: "2026-08-02",
    creditAmount: "$10,000.00",
    numericCreditAmount: 10000,
    remainingBalance: "$0.00",
    numericRemainingBalance: 0,
    status: "Fully Redeemed",
    reason: "Early Payment Rebate Credit"
  }
];

export const FINANCE_PURCHASE_BILLS = [
  { id: "BILL-2026-01", vendor: "OptoTech Displays Ltd", billDate: "2026-08-02", dueDate: "2026-08-20", amount: "$36,000.00", status: "Paid", poRef: "PO-2026-001" },
  { id: "BILL-2026-02", vendor: "Precision Machining Corp", billDate: "2026-08-03", dueDate: "2026-08-25", amount: "$12,750.00", status: "Unpaid", poRef: "PO-2026-002" }
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
