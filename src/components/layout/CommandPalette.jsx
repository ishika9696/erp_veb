import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';
import { Search, LayoutDashboard, Factory, Package, Users, UserCheck, Receipt, CreditCard, Settings, X, Truck, Boxes, ExternalLink } from 'lucide-react';

const CommandPalette = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setActiveModule,
    purchaseOrders,
    viewPurchaseOrder,
    addToast
  } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!commandPaletteOpen) setQuery('');
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const options = [
    { label: "Executive Dashboard", category: "Navigation", module: "dashboard", icon: LayoutDashboard },
    { label: "Manufacturing, BOM & Work Orders", category: "Navigation", module: "manufacturing", icon: Factory },
    { label: "Raw Materials Master Catalog", category: "Navigation", module: "raw_materials", icon: Boxes },
    { label: "Warehouse Stock-In & Audits", category: "Navigation", module: "inventory", icon: Package },
    { label: "CRM Accounts & Sales Deals", category: "Navigation", module: "crm", icon: Users },
    { label: "HRM, Attendance & Payroll", category: "Navigation", module: "hrm", icon: UserCheck },
    { label: "Accounting, Invoices & POs", category: "Navigation", module: "accounting", icon: Receipt },
    { label: "Subscription Plans & Billing", category: "Navigation", module: "billing", icon: CreditCard },
    { label: "Role Permission Matrix", category: "Settings", module: "settings", icon: Settings },
  ];

  const matchedModules = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()) ||
    opt.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchedPOs = query.trim() === '' ? [] : purchaseOrders.filter((po) =>
    po.id.toLowerCase().includes(query.toLowerCase()) ||
    po.supplier.toLowerCase().includes(query.toLowerCase()) ||
    (po.item && po.item.toLowerCase().includes(query.toLowerCase())) ||
    po.status.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectModule = (moduleName) => {
    setActiveModule(moduleName);
    setCommandPaletteOpen(false);
    addToast(`Navigated to ${moduleName.toUpperCase()}`, "info");
  };

  const handleSelectPO = (po) => {
    setCommandPaletteOpen(false);
    viewPurchaseOrder(po);
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Received':
      case 'Passed':
      case 'Active':
        return 'success';
      case 'Partially Received':
      case 'Sent':
      case 'Pending':
        return 'warning';
      case 'Draft':
        return 'neutral';
      case 'Cancelled':
      case 'Failed':
        return 'danger';
      default:
        return 'info';
    }
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === '') return '$0.00';
    if (typeof val === 'number') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    const str = val.toString().trim();
    const num = Number(str.replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) return '$0.00';
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4" role="dialog" aria-modal="true" aria-label="Command palette">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 z-50">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="h-5 w-5 text-indigo-500 mr-3 shrink-0" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search PO # (e.g. PO-2026-001), supplier, or modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            aria-label="Search modules and commands"
            className="w-full bg-transparent py-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setCommandPaletteOpen(false)}
            aria-label="Close command palette"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Purchase Orders Results */}
          {matchedPOs.length > 0 && (
            <div className="p-1 pb-2">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                <span>Purchase Orders ({matchedPOs.length})</span>
              </div>
              <div className="space-y-1">
                {matchedPOs.map((po) => (
                  <button
                    key={po.id}
                    onClick={() => handleSelectPO(po)}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors group cursor-pointer border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm font-mono text-indigo-600 dark:text-indigo-400">
                            {po.id}
                          </span>
                          <Badge variant={getBadgeVariant(po.status)}>{po.status}</Badge>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate mt-0.5">
                          {po.supplier} • <span className="text-slate-500">{po.item}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono block">
                        {formatCurrency(po.numericTotal || po.total)}
                      </span>
                      <span className="text-[10px] text-slate-500">{po.expectedDate}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Module Results */}
          {matchedModules.length > 0 && (
            <div className="p-1 pt-2">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Navigation Modules
              </div>
              <div className="space-y-1">
                {matchedModules.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectModule(item.module)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 text-slate-500 group-hover:text-indigo-600 transition-colors">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold block truncate">{item.label}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{item.category}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {matchedPOs.length === 0 && matchedModules.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-600 dark:text-slate-400">
              No results found for "{query}". Try searching by PO # (e.g. PO-2026-001) or supplier.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-600 dark:text-slate-400 font-medium border-t border-slate-200 dark:border-slate-800">
          <span>Tip: Use ↑ ↓ to navigate, Enter to select</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
