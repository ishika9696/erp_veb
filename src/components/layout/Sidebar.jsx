import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Factory,
  Package,
  ShoppingBag,
  Users,
  UserCheck,
  Receipt,
  Server,
  Smartphone,
  CreditCard,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  Building2,
  X,
  Building,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const {
    activeModule,
    setActiveModule,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    tenantMode,
    switchTenantMode,
    currentOrg
  } = useApp();

  const tenantNavGroups = [
    {
      group: "Core Operations",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'manufacturing', label: 'Manufacturing (BOM)', icon: Factory, badge: 'Live BOM' },
        { id: 'inventory', label: 'Inventory & Stock', icon: Package, badge: '3 Low' },
        { id: 'pos', label: 'POS Terminal', icon: ShoppingBag, badge: null }
      ]
    },
    {
      group: "Business Management",
      items: [
        { id: 'crm', label: 'CRM & Sales', icon: Users, badge: null },
        { id: 'hrm', label: 'HRM & Team', icon: UserCheck, badge: null },
        { id: 'accounting', label: 'Accounting', icon: Receipt, badge: '2 Overdue' }
      ]
    },
    {
      group: "Platform & Systems",
      items: [
        { id: 'serveradmin', label: 'Server & System Panel', icon: Server, badge: 'Worksuite' },
        { id: 'mobileapp', label: 'Mobile Companion App', icon: Smartphone, badge: 'App View' },
        { id: 'billing', label: 'Billing & Subscriptions', icon: CreditCard, badge: null },
        { id: 'settings', label: 'Settings & Roles', icon: Settings, badge: null }
      ]
    }
  ];

  const superAdminNavGroups = [
    {
      group: "Platform Control",
      items: [
        { id: 'serveradmin', label: 'Server Health & Logs', icon: Server, badge: 'Super Admin' },
        { id: 'dashboard', label: 'Tenant View', icon: LayoutDashboard, badge: null },
        { id: 'billing', label: 'SaaS Billing Plans', icon: CreditCard, badge: null },
        { id: 'settings', label: 'System Settings', icon: Settings, badge: null }
      ]
    }
  ];

  const navGroups = tenantMode === 'superadmin' ? superAdminNavGroups : tenantNavGroups;

  return (
    <>
      {/* DESKTOP SIDEBAR (hidden on mobile <768px) */}
      <aside
        className={`hidden md:flex relative flex-col border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Collapse / Expand Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3.5 top-7 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 shadow-md hover:text-slate-900 dark:hover:text-white transition-all"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Brand / Logo */}
        <div className="flex h-16 items-center px-5 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 items-center px-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 text-white shadow-md shadow-indigo-500/20 font-heading font-extrabold tracking-wider text-sm">
              VEB
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                  ERP
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  {tenantMode === 'superadmin' ? 'Super Admin' : 'Unified Enterprise'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Current Tenant Banner */}
        {!sidebarCollapsed && tenantMode === 'tenant' && (
          <div className="p-3 mx-3 my-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentOrg.name}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{currentOrg.plan}</span>
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {grp.group}
                </div>
              )}

              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
                    
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {!sidebarCollapsed && item.badge && (
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Tagline */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-medium italic">"One Platform. Every Operation."</p>
          </div>
        )}
      </aside>

      {/* MOBILE OFF-CANVAS SLIDE-IN SIDEBAR DRAWER (<768px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Drawer Container */}
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between z-50 p-4 animate-in slide-in-from-left duration-200 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 items-center px-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 text-white font-heading font-extrabold tracking-wider text-sm shadow-md">
                  VEB
                </div>
                <span className="font-heading text-lg font-bold text-slate-900 dark:text-white">ERP</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Tenant Switcher */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => switchTenantMode('tenant')}
                  className={`flex-1 py-1.5 text-center rounded-lg transition-colors ${
                    tenantMode === 'tenant'
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Company ERP
                </button>
                <button
                  onClick={() => switchTenantMode('superadmin')}
                  className={`flex-1 py-1.5 text-center rounded-lg transition-colors ${
                    tenantMode === 'superadmin'
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Server Admin
                </button>
              </div>
            </div>

            {/* Nav Groups */}
            <div className="flex-1 space-y-4">
              {navGroups.map((grp, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {grp.group}
                  </div>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveModule(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Tagline Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-[10px] text-slate-400 font-medium italic">"One Platform. Every Operation."</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
