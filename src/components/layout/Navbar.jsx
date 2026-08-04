import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Sun,
  Moon,
  Shield,
  Building,
  User,
  LogOut,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Smartphone,
  LayoutDashboard,
  Factory,
  Package,
  Receipt,
  X
} from 'lucide-react';

const Navbar = () => {
  const {
    theme,
    toggleTheme,
    tenantMode,
    switchTenantMode,
    setActiveModule,
    setCommandPaletteOpen,
    setQuickCreateOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    notifications,
    setNotifications,
    currentOrg,
    setCurrentOrg,
    addToast
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read", "info");
  };

  const organizations = [
    { id: "org-1", name: "Acme Manufacturing & Corp", plan: "Manufacturing Enterprise" },
    { id: "org-2", name: "Nexus Tech Solutions", plan: "Starter ERP" },
    { id: "org-3", name: "Global Logistics Corp", plan: "Professional SaaS" }
  ];

  const quickSearchShortcuts = [
    { label: "Executive Dashboard", module: "dashboard", icon: LayoutDashboard },
    { label: "Manufacturing & BOM Builder", module: "manufacturing", icon: Factory },
    { label: "Warehouse Inventory & Stock", module: "inventory", icon: Package },
    { label: "Accounting & Invoices", module: "accounting", icon: Receipt }
  ];

  // Reusable Navbar Icon Button Styling Tokens
  const navIconBtnClass = "h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center shrink-0 cursor-pointer";
  const navPrimaryBtnClass = "h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors flex items-center justify-center shrink-0 cursor-pointer";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 sm:px-6 backdrop-blur-md transition-colors">
      
      {/* Left Section: Mobile Hamburger + Brand (mobile) / Search Input */}
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
        {/* Mobile Hamburger Button (<768px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden ${navIconBtnClass}`}
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Brand Wordmark (<768px) with gap-3 separation from Hamburger */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <div className="flex h-7 items-center px-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-heading font-extrabold text-xs shadow-xs">
            VEB
          </div>
          <span className="font-heading text-sm font-bold text-slate-900 dark:text-white">ERP</span>
        </div>

        {/* Search Input Container */}
        <div className="relative flex-1 min-w-0 max-w-md">
          <button
            onClick={() => setShowSearchDropdown(!showSearchDropdown)}
            className="flex items-center gap-2.5 w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 px-3.5 text-xs text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-left group"
          >
            <Search className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
            <span className="flex-1 truncate text-xs">Search BOMs, orders, invoices...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Anchored Quick Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute left-0 top-full mt-2 w-full min-w-[260px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                <span>Quick Module Jump</span>
                <button onClick={() => setCommandPaletteOpen(true)} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Open ⌘K
                </button>
              </div>
              <div className="space-y-1">
                {quickSearchShortcuts.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveModule(item.module);
                        setShowSearchDropdown(false);
                        addToast(`Jumped to ${item.label}`, "info");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls Section - Uniform gap-2 flex row */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Multi-Tenant Switcher Toggle Pill (Desktop md+) */}
        <div className="hidden md:flex items-center h-10 rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => switchTenantMode('tenant')}
            className={`flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg transition-all ${
              tenantMode === 'tenant'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="h-3.5 w-3.5" />
            Company ERP
          </button>

          <button
            onClick={() => switchTenantMode('superadmin')}
            className={`flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg transition-all ${
              tenantMode === 'superadmin'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            Server Admin
          </button>
        </div>

        {/* Companion Mobile App View Button (Desktop md+) */}
        <button
          onClick={() => setActiveModule('mobileapp')}
          className="hidden md:flex items-center gap-1.5 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          title="Open Mobile Companion App UI Simulator"
        >
          <Smartphone className="h-3.5 w-3.5 text-emerald-500" />
          <span className="hidden lg:inline">Mobile App</span>
        </button>

        {/* Organization Switcher Dropdown (Desktop sm+) */}
        {tenantMode === 'tenant' && (
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowOrgMenu(!showOrgMenu)}
              className="flex items-center gap-2 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Building className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="font-semibold truncate max-w-[110px]">{currentOrg.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            </button>

            {showOrgMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Organization
                </div>
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      setCurrentOrg(org);
                      setShowOrgMenu(false);
                      addToast(`Switched organization to ${org.name}`, "info");
                    }}
                    className={`w-full flex flex-col text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      currentOrg.id === org.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{org.name}</span>
                    <span className="text-[10px] opacity-70">{org.plan}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Create Button - Identical 40x40px rounded-xl shape as siblings */}
        <button
          onClick={() => setQuickCreateOpen(true)}
          className={navPrimaryBtnClass}
          title="Quick Create"
        >
          <Plus className="h-5 w-5" />
        </button>

        {/* Dark Mode Toggle - Identical 40x40px rounded-xl shape */}
        <button
          onClick={toggleTheme}
          className={navIconBtnClass}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Notifications Bell - Identical 40x40px rounded-xl shape */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative ${navIconBtnClass}`}
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between p-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 flex items-start gap-3 transition-colors ${
                      !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
                      {n.icon === 'UserPlus' && <UserPlus className="h-4 w-4" />}
                      {n.icon === 'CheckCircle' && <CheckCircle className="h-4 w-4" />}
                      {n.icon === 'AlertTriangle' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-semibold text-slate-900 dark:text-white">{n.title}</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar - Identical 40x40px rounded-xl shape */}
        <div className="relative flex items-center shrink-0">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Sarah Jenkins"
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
            />
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</span>
              <span className="block text-[10px] text-slate-400 font-medium leading-tight">VP of Operations</span>
            </div>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-400 shrink-0" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                <p className="text-[11px] text-slate-400">s.jenkins@acme.com</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  addToast("Profile details opened", "info");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="h-4 w-4 text-slate-400" />
                My Profile
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  addToast("Signed out successfully", "success");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
