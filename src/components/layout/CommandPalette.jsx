import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, LayoutDashboard, Users, UserCheck, Receipt, FolderKanban, ShoppingBag, CreditCard, Settings, X } from 'lucide-react';

const CommandPalette = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveModule, addToast } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!commandPaletteOpen) setQuery('');
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const options = [
    { label: "Executive Dashboard", category: "Navigation", module: "dashboard", icon: LayoutDashboard },
    { label: "CRM & Leads Kanban", category: "Navigation", module: "crm", icon: Users },
    { label: "Employee Directory & Attendance", category: "Navigation", module: "hrm", icon: UserCheck },
    { label: "Invoices & Payments", category: "Navigation", module: "accounting", icon: Receipt },
    { label: "Projects & Gantt Timeline", category: "Navigation", module: "projects", icon: FolderKanban },
    { label: "POS Terminal & Cart", category: "Navigation", module: "pos", icon: ShoppingBag },
    { label: "Subscription Plans", category: "Navigation", module: "billing", icon: CreditCard },
    { label: "Role Permission Matrix", category: "Settings", module: "settings", icon: Settings },
  ];

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()) ||
    opt.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (moduleName) => {
    setActiveModule(moduleName);
    setCommandPaletteOpen(false);
    addToast(`Navigated to ${moduleName.toUpperCase()}`, "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="h-5 w-5 text-indigo-500 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No results found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.module)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 text-slate-500 group-hover:text-indigo-600 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold block">{item.label}</span>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 text-[10px] text-slate-400 border-t border-slate-200 dark:border-slate-800">
          <span>Tip: Use ↑ ↓ to navigate, Enter to select</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
