import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Home, Calendar, RefreshCw } from 'lucide-react';

const moduleTitles = {
  dashboard: { title: "VEB ERP Company Dashboard", sub: "Real-time overview of manufacturing output, revenue, and active operations." },
  manufacturing: { title: "Manufacturing & Production", sub: "Bill of Materials (BOM), work orders Kanban, raw material consumption & unit cost calculator." },
  inventory: { title: "Warehouse & Raw Material Inventory", sub: "Stock levels, low-stock reorder alerts, and inter-warehouse stock transfers." },
  serveradmin: { title: "Super Admin & Infrastructure Control", sub: "Server health (CPU/RAM/Storage gauges), multi-tenant hosting, database backups, and system logs." },
  mobileapp: { title: "VEB Mobile Companion Simulator", sub: "Native mobile app companion for field technicians, GPS attendance check-in, and tasks." },
  crm: { title: "CRM & Sales Pipeline", sub: "Manage client leads, deal stages, and sales team activity." },
  hrm: { title: "Human Resource Management", sub: "Employee directory, attendance tracker, and leave requests." },
  accounting: { title: "Accounting & Financials", sub: "Track incoming invoices, outgoing expenses, and payment status." },
  pos: { title: "Point of Sale (POS) Terminal", sub: "Real-time product sales grid, checkout flow, and receipt processing." },
  billing: { title: "SaaS Subscriptions & Billing", sub: "Manage plan tiers, active feature usage meters, and billing invoices." },
  settings: { title: "System & Tenant Settings", sub: "Configure company details, role-based permission matrix, and integrations." }
};

const Header = () => {
  const { activeModule, addToast } = useApp();

  const info = moduleTitles[activeModule] || moduleTitles.dashboard;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Breadcrumb & Sequential H1 Title */}
      <div>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-1.5">
          <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
            <Home className="h-3.5 w-3.5" />
            VEB ERP
          </span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize">{activeModule}</span>
        </nav>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
          {info.title}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">{info.sub}</p>
      </div>

      {/* Quick Action Toolbar */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-indigo-500" />
          <span>Aug 04, 2026</span>
        </div>

        <button
          onClick={() => addToast("Refreshed real-time telemetry", "success")}
          aria-label="Refresh real-time telemetry"
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors shadow-2xs"
        >
          <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Header;
