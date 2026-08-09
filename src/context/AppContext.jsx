import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MANUFACTURING_PURCHASE_ORDERS,
  FINANCE_PURCHASE_BILLS,
  INITIAL_INVENTORY_ITEMS
} from '../data/mockData';

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

  // Unified Inventory Items (Raw Materials + Finished Goods)
  const [inventoryItems, setInventoryItems] = useState(INITIAL_INVENTORY_ITEMS);

  // Deep-linking filter for Raw Materials (e.g. from Dashboard Low Stock alert)
  const [rawMaterialFilter, setRawMaterialFilter] = useState('all');

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

  // Active Purchase Order View Modal (Global Preview)
  const [activePoView, setActivePoView] = useState(null);

  // Sequential, unique PO ID generator: PO-YYYY-### (e.g. PO-2026-001)
  const generateNextPoId = () => {
    const currentYear = new Date().getFullYear();
    const poNumbers = purchaseOrders
      .map((po) => {
        const match = po.id?.match(/PO-(\d{4})-(\d+)/);
        if (match && parseInt(match[1], 10) === currentYear) {
          return parseInt(match[2], 10);
        }
        return 0;
      })
      .filter((n) => !isNaN(n));

    const maxNum = poNumbers.length > 0 ? Math.max(...poNumbers) : 0;
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `PO-${currentYear}-${nextNum}`;
  };

  // PO & Bill Sync Helpers
  const addPurchaseOrder = (newPo) => {
    const id = newPo.id && newPo.id.startsWith('PO-') ? newPo.id : generateNextPoId();
    const poWithId = {
      ...newPo,
      id
    };
    setPurchaseOrders((prev) => [poWithId, ...prev]);
    return poWithId;
  };

  const viewPurchaseOrder = (poOrId) => {
    if (!poOrId) return;
    if (typeof poOrId === 'object') {
      setActivePoView(poOrId);
    } else {
      const found = purchaseOrders.find((p) => p.id === poOrId);
      if (found) {
        setActivePoView(found);
      } else {
        addToast(`Purchase Order ${poOrId} not found`, "warning");
      }
    }
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

  // Inventory Item Helpers
  const addInventoryItem = (newItem) => {
    setInventoryItems((prev) => [newItem, ...prev]);
    addToast(`${newItem.name} (${newItem.sku}) added to inventory catalog`, 'success');
  };

  const updateInventoryItem = (id, updatedFields) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          // Re-evaluate isLow and isOutOfStock
          updated.isOutOfStock = Number(updated.stock) <= 0;
          updated.isLow = Number(updated.stock) <= Number(updated.minStock);
          return updated;
        }
        return item;
      })
    );
    addToast(`Inventory record ${id} updated`, 'success');
  };

  const deleteInventoryItem = (id) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== id));
    addToast(`Item ${id} removed from inventory`, 'info');
  };

  const addStockToItem = (itemId, qtyToAdd, warehouse = 'Main Assembly Depot', source = 'Stock-In Entry', user = 'Marcus Vance') => {
    const numQty = Number(qtyToAdd) || 0;
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = Number(item.stock) + numQty;
          const updatedWarehouses = (item.warehouses && item.warehouses.length > 0)
            ? item.warehouses.map((wh) => wh.name === warehouse ? { ...wh, qty: wh.qty + numQty } : wh)
            : [{ name: warehouse, qty: newStock }];
          
          const newMovement = {
            id: `MOV-${Date.now()}`,
            type: source,
            ref: `STK-IN-${Math.floor(100 + Math.random() * 900)}`,
            qty: numQty,
            date: new Date().toISOString().split('T')[0],
            user,
            warehouse
          };

          return {
            ...item,
            stock: newStock,
            warehouses: updatedWarehouses,
            isOutOfStock: newStock <= 0,
            isLow: newStock <= Number(item.minStock),
            stockMovements: [newMovement, ...(item.stockMovements || [])]
          };
        }
        return item;
      })
    );
    addToast(`Added +${numQty} units to inventory for item #${itemId}`, 'success');
  };

  const recordStockAdjustment = (itemId, qtyChange, reason = 'Inventory Audit Correction', warehouse = 'Component Vault', user = 'Sarah Jenkins') => {
    const numChange = Number(qtyChange) || 0;
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = Math.max(0, Number(item.stock) + numChange);
          const updatedWarehouses = (item.warehouses && item.warehouses.length > 0)
            ? item.warehouses.map((wh) => wh.name === warehouse ? { ...wh, qty: Math.max(0, wh.qty + numChange) } : wh)
            : [{ name: warehouse, qty: newStock }];
          
          const newMovement = {
            id: `MOV-${Date.now()}`,
            type: "Stock Adjustment",
            ref: `ADJ-${Math.floor(100 + Math.random() * 900)}`,
            qty: numChange,
            date: new Date().toISOString().split('T')[0],
            user,
            warehouse,
            reason
          };

          return {
            ...item,
            stock: newStock,
            warehouses: updatedWarehouses,
            isOutOfStock: newStock <= 0,
            isLow: newStock <= Number(item.minStock),
            stockMovements: [newMovement, ...(item.stockMovements || [])]
          };
        }
        return item;
      })
    );
    addToast(`Adjustment of ${numChange > 0 ? `+${numChange}` : numChange} units recorded for #${itemId}`, 'warning');
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
        inventoryItems,
        setInventoryItems,
        rawMaterialFilter,
        setRawMaterialFilter,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        addStockToItem,
        recordStockAdjustment,
        purchaseOrders,
        setPurchaseOrders,
        bills,
        setBills,
        generateNextPoId,
        activePoView,
        setActivePoView,
        viewPurchaseOrder,
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
