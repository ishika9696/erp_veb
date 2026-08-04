import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Tenant view mode: 'tenant' (Acme Corp ERP) vs 'superadmin' (SaaS / Server Management)
  const [tenantMode, setTenantMode] = useState('tenant');
  
  // Active Navigation Module
  // Options: 'dashboard', 'serveradmin', 'manufacturing', 'inventory', 'mobileapp', 'crm', 'hrm', 'accounting', 'pos', 'billing', 'settings'
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mobile Frame Simulator Toggle (allows viewing companion app inside standard desktop interface)
  const [isMobileSimOpen, setIsMobileSimOpen] = useState(false);

  // Quick Command Palette Modal
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Quick Create Drawer
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  // Active Organization
  const [currentOrg, setCurrentOrg] = useState({
    id: "org-1",
    name: "Acme Manufacturing & Corp",
    plan: "Manufacturing Enterprise",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100"
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Production Completed", message: "WO-889: Smart RFID Scanner Gun batch done", time: "5m ago", read: false, icon: "CheckCircle" },
    { id: 2, title: "Low Stock Alert", message: "Raw Material CNC Casing < 15 units", time: "20m ago", read: false, icon: "AlertTriangle" },
    { id: 3, title: "Invoice Paid", message: "INV-2026-089 paid ($95,000)", time: "1h ago", read: true, icon: "DollarSign" }
  ]);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', title = '') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Theme Class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Keyboard shortcut Ctrl/Cmd + K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const switchTenantMode = (mode) => {
    setTenantMode(mode);
    if (mode === 'superadmin') {
      setActiveModule('serveradmin');
      addToast('Switched to VEB Super Admin & Server Control Panel', 'info', 'Multi-Tenant Mode');
    } else {
      setActiveModule('dashboard');
      addToast('Switched to Tenant (Acme Corp) Manufacturing ERP View', 'info', 'Multi-Tenant Mode');
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        tenantMode,
        switchTenantMode,
        activeModule,
        setActiveModule,
        sidebarCollapsed,
        setSidebarCollapsed,
        isMobileSimOpen,
        setIsMobileSimOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        quickCreateOpen,
        setQuickCreateOpen,
        currentOrg,
        setCurrentOrg,
        notifications,
        setNotifications,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
