import React, { createContext, useContext, useState, useEffect } from 'react';
import { MANUFACTURING_PURCHASE_ORDERS, FINANCE_PURCHASE_BILLS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Tenant view mode: 'tenant' (Acme Corp ERP) vs 'superadmin' (SaaS / Server Management)
  const [tenantMode, setTenantMode] = useState('tenant');
  
  // Active Navigation Module
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Desktop Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mobile Off-canvas Drawer state (<768px)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile Frame Simulator Toggle
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

  // Unified Purchase Orders (shared between Finance & Manufacturing)
  const [purchaseOrders, setPurchaseOrders] = useState(MANUFACTURING_PURCHASE_ORDERS);

  // Finance Purchase Bills (Vendor Bills)
  const [bills, setBills] = useState(FINANCE_PURCHASE_BILLS);

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

  // PO & Bill Sync Helpers
  const addPurchaseOrder = (newPo) => {
    setPurchaseOrders((prev) => [newPo, ...prev]);
  };

  const updatePurchaseOrder = (id, updatedPo) => {
    setPurchaseOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedPo } : item))
    );
  };

  const deletePurchaseOrder = (id) => {
    setPurchaseOrders((prev) => prev.filter((item) => item.id !== id));
  };

  const convertPoToPurchaseBill = (po) => {
    const billId = `BILL-2026-0${bills.length + 1}`;
    const newBill = {
      id: billId,
      vendor: po.supplier,
      billDate: new Date().toISOString().split('T')[0],
      dueDate: po.expectedDate || "2026-08-25",
      amount: po.total || `$${(po.numericTotal || 0).toLocaleString()}.00`,
      status: "Unpaid",
      poRef: po.id,
      items: po.items || [{ desc: po.item, qty: po.qty, unitCost: po.unitCost, amount: po.numericTotal }]
    };

    setBills((prev) => [newBill, ...prev]);
    
    // Log in PO audit trail
    const auditEntry = {
      step: `Converted to Purchase Bill (${billId})`,
      by: "David Chen (Finance)",
      time: new Date().toLocaleString()
    };
    
    setPurchaseOrders((prev) =>
      prev.map((item) =>
        item.id === po.id
          ? {
              ...item,
              convertedBillId: billId,
              auditTrail: [...(item.auditTrail || []), auditEntry]
            }
          : item
      )
    );

    addToast(`Purchase Order ${po.id} converted to Purchase Bill ${billId} ($${(po.numericTotal || 0).toLocaleString()})`, 'success', 'Bill Created');
    return billId;
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
        mobileMenuOpen,
        setMobileMenuOpen,
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
        removeToast,
        purchaseOrders,
        setPurchaseOrders,
        bills,
        setBills,
        addPurchaseOrder,
        updatePurchaseOrder,
        deletePurchaseOrder,
        convertPoToPurchaseBill
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
