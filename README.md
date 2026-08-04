# VEB ERP — One Platform. Every Operation.

**VEB ERP** is a modern, unified SaaS Enterprise Resource Planning platform inspired by the strengths of **ERPGo SaaS** (Multi-tenant SaaS dashboard, CRM, HRM, Accounting, POS), **Worksuite SaaS** (Server health monitoring, CPU/RAM widgets, multi-tenant hosting, Mobile Companion UX), and **Ultimate POS Manufacturing** (Bill of Materials builder, Production Orders, Work Order Kanban, Cost Calculator, and Stock-in).

---

## 🌟 Key Features

### 1. Brand & Design System
- **Modern HSL Design Tokens**: Primary Indigo (`#4F46E5`), Emerald Accent (`#10B981`) for production/yield states.
- **Light & Dark Mode**: Instant state toggle support.
- **Responsive Layout**: Collapsible sidebar navigation, mobile-friendly design.

### 2. Multi-Tenant Architecture
- **Super Admin Mode**: Platform owner view with MRR analytics ($48,950/mo), active tenant companies, server cluster health, and database snapshot backup scheduler.
- **Company Tenant View**: Manage Acme Corporation's core enterprise ERP functions with an organization switcher ("Acme Corp", "Nexus Tech", "Global Logistics").

### 3. Core Modules

- **Executive Dashboard**: Production yield trend line chart, sales vs expenses, live operations stream, checklist widget.
- **Super Admin & Server Control Panel**: CPU, RAM, Storage, Uptime SLA (99.992%), API throughput, and system error log stream.
- **Manufacturing Module**:
  - **Bill of Materials (BOM) Builder**: Product recipe specifications, raw material consumption, wastage %, labor hours, and unit production cost calculator.
  - **Work Orders Kanban Board**: Track orders across **Pending**, **In Production**, **Quality Check**, and **Completed**.
  - **Production Cost Calculator**: Material + Labor + Overhead = Total Unit Cost ($425.00/unit).
  - **Wastage & Yield Reports**: Production yield vs scrap wastage bar charts.
- **Companion Mobile App UI Simulator**: Interactive smartphone device frame simulator with bottom tab bar, GPS attendance check-in/out, and task management.
- **Inventory & Warehouses**: Raw material stock levels, low-stock alerts, and inter-warehouse stock transfer modal.
- **CRM Module**: Sales deal Kanban board + Data table view, contact profile drawer.
- **HRM Module**: Employee directory, attendance calendar matrix, and onboard modal.
- **Accounting Module**: Invoice list, expense category chart, and 3-step Invoice Creation Wizard.
- **POS Module**: Touchscreen catalog grid, category tabs, cart sidebar, promo discount logic (`PROMO10`), and checkout modal (Credit, Cash, QR Pay).
- **Settings & Role Matrix**: Interactive checkbox grid configuring module access across Super Admin, Admin, Manager, and Staff roles.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation & Local Setup

```bash
# Clone repository
git clone https://github.com/ishika9696/erp_veb.git

# Navigate to directory
cd erp_veb

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Icons
- **Data Visualization**: Recharts
