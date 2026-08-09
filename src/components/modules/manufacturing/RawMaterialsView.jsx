import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import StatCard from '../../ui/StatCard';
import Badge from '../../ui/Badge';
import {
  Boxes,
  Package,
  AlertTriangle,
  DollarSign,
  XCircle,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  TrendingUp,
  ArrowDownToLine,
  Truck,
  History,
  X,
  Building2,
  Layers,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  RefreshCw,
  Warehouse,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const RawMaterialsView = () => {
  const {
    inventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addStockToItem,
    addPurchaseOrder,
    generateNextPoId,
    viewPurchaseOrder,
    rawMaterialFilter,
    setRawMaterialFilter,
    setActiveModule,
    addToast
  } = useApp();

  // Search, Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(rawMaterialFilter || 'all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('stock_asc');

  // Sync incoming deep-link filter
  useEffect(() => {
    if (rawMaterialFilter) {
      setStatusFilter(rawMaterialFilter);
    }
  }, [rawMaterialFilter]);

  // Modal / Drawer States
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [stockInModalItem, setStockInModalItem] = useState(null);
  const [poModalItem, setPoModalItem] = useState(null);

  // Form States for Add Raw Material
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    sku: '',
    category: 'Electronics & Displays',
    unit: 'Pcs',
    stock: 50,
    minStock: 20,
    unitCost: '45.00',
    warehouse: 'Main Assembly Depot',
    preferredSupplier: 'OptoTech Displays Ltd',
    supplierLeadTime: '5 Days',
    description: ''
  });

  // Form State for Quick Stock-In
  const [stockInQty, setStockInQty] = useState(50);
  const [stockInWarehouse, setStockInWarehouse] = useState('Main Assembly Depot');
  const [stockInSource, setStockInSource] = useState('PO Receipt / Supplier Delivery');
  const [stockInUser, setStockInUser] = useState('Marcus Vance');

  // Form State for Quick Create PO
  const [poQty, setPoQty] = useState(100);
  const [poSupplier, setPoSupplier] = useState('');
  const [poExpectedDate, setPoExpectedDate] = useState('2026-08-18');

  // Filter raw materials from unified inventory store
  const rawMaterials = useMemo(() => {
    return inventoryItems.filter((item) => item.type === 'raw_material');
  }, [inventoryItems]);

  // Extract distinct categories and suppliers for filter dropdowns
  const categories = useMemo(() => {
    const set = new Set(rawMaterials.map((m) => m.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [rawMaterials]);

  const suppliers = useMemo(() => {
    const set = new Set(rawMaterials.map((m) => m.preferredSupplier).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [rawMaterials]);

  // KPI Calculations
  const kpiStats = useMemo(() => {
    const totalCount = rawMaterials.length;
    const lowStockCount = rawMaterials.filter((m) => Number(m.stock) <= Number(m.minStock) && Number(m.stock) > 0).length;
    const outOfStockCount = rawMaterials.filter((m) => Number(m.stock) <= 0).length;
    const totalValue = rawMaterials.reduce((acc, m) => {
      const cost = m.numericCost || Number(m.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
      return acc + (Number(m.stock) * cost);
    }, 0);

    return {
      totalCount,
      lowStockCount,
      outOfStockCount,
      totalValue
    };
  }, [rawMaterials]);

  // Filtered & Sorted Raw Materials
  const filteredMaterials = useMemo(() => {
    return rawMaterials
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.preferredSupplier && item.preferredSupplier.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        let matchesStatus = true;
        if (statusFilter === 'in_stock') {
          matchesStatus = Number(item.stock) > Number(item.minStock);
        } else if (statusFilter === 'low_stock') {
          matchesStatus = Number(item.stock) <= Number(item.minStock) && Number(item.stock) > 0;
        } else if (statusFilter === 'out_of_stock') {
          matchesStatus = Number(item.stock) <= 0;
        }

        const matchesSupplier = supplierFilter === 'all' || item.preferredSupplier === supplierFilter;

        return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
      })
      .sort((a, b) => {
        if (sortBy === 'stock_asc') return Number(a.stock) - Number(b.stock);
        if (sortBy === 'stock_desc') return Number(b.stock) - Number(a.stock);
        if (sortBy === 'cost_desc') {
          const costA = a.numericCost || Number(a.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
          const costB = b.numericCost || Number(b.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
          return costB - costA;
        }
        if (sortBy === 'cost_asc') {
          const costA = a.numericCost || Number(a.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
          const costB = b.numericCost || Number(b.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
          return costA - costB;
        }
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        if (sortBy === 'min_stock_desc') return Number(b.minStock) - Number(a.minStock);
        return 0;
      });
  }, [rawMaterials, searchQuery, categoryFilter, statusFilter, supplierFilter, sortBy]);

  // Handle Add Raw Material Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const numCost = parseFloat(newMaterial.unitCost) || 0;
    const numStock = parseInt(newMaterial.stock, 10) || 0;
    const numMinStock = parseInt(newMaterial.minStock, 10) || 10;
    const nextId = `RM-${Math.floor(100 + Math.random() * 900)}`;
    const generatedSku = newMaterial.sku || `SKU-RM-${Math.floor(100 + Math.random() * 900)}`;

    const itemToAdd = {
      id: nextId,
      name: newMaterial.name,
      sku: generatedSku,
      type: 'raw_material',
      category: newMaterial.category,
      unit: newMaterial.unit,
      stock: numStock,
      minStock: numMinStock,
      unitCost: `$${numCost.toFixed(2)}`,
      numericCost: numCost,
      warehouse: newMaterial.warehouse,
      preferredSupplier: newMaterial.preferredSupplier,
      supplierLeadTime: newMaterial.supplierLeadTime,
      description: newMaterial.description || `Industrial ${newMaterial.category} component used in manufacturing assemblies.`,
      isLow: numStock <= numMinStock && numStock > 0,
      isOutOfStock: numStock <= 0,
      warehouses: [{ name: newMaterial.warehouse, qty: numStock }],
      linkedBoms: [],
      stockMovements: [
        {
          id: `MOV-${Date.now()}`,
          type: "Initial Catalog Stock-In",
          ref: "INIT-ENTRY",
          qty: numStock,
          date: new Date().toISOString().split('T')[0],
          user: "Marcus Vance",
          warehouse: newMaterial.warehouse
        }
      ]
    };

    addInventoryItem(itemToAdd);
    setShowAddModal(false);
    setNewMaterial({
      name: '',
      sku: '',
      category: 'Electronics & Displays',
      unit: 'Pcs',
      stock: 50,
      minStock: 20,
      unitCost: '45.00',
      warehouse: 'Main Assembly Depot',
      preferredSupplier: 'OptoTech Displays Ltd',
      supplierLeadTime: '5 Days',
      description: ''
    });
  };

  // Handle Edit Raw Material Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editItem) return;
    const numCost = parseFloat(editItem.numericCost || editItem.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
    const numStock = parseInt(editItem.stock, 10) || 0;
    const numMinStock = parseInt(editItem.minStock, 10) || 0;

    const updated = {
      ...editItem,
      stock: numStock,
      minStock: numMinStock,
      numericCost: numCost,
      unitCost: `$${numCost.toFixed(2)}`,
      isLow: numStock <= numMinStock && numStock > 0,
      isOutOfStock: numStock <= 0
    };

    updateInventoryItem(editItem.id, updated);
    setEditItem(null);
    if (viewItem && viewItem.id === editItem.id) {
      setViewItem(updated);
    }
  };

  // Handle Quick Stock-In Submit
  const handleStockInSubmit = (e) => {
    e.preventDefault();
    if (!stockInModalItem) return;
    addStockToItem(stockInModalItem.id, stockInQty, stockInWarehouse, stockInSource, stockInUser);
    setStockInModalItem(null);
    if (viewItem && viewItem.id === stockInModalItem.id) {
      const refreshed = inventoryItems.find((i) => i.id === viewItem.id);
      if (refreshed) setViewItem(refreshed);
    }
  };

  // Handle Quick Create PO Submit
  const handleCreatePoSubmit = (e) => {
    e.preventDefault();
    if (!poModalItem) return;
    const cost = poModalItem.numericCost || Number(poModalItem.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
    const totalVal = Number(poQty) * cost;
    const poSupplierName = poSupplier || poModalItem.preferredSupplier || 'OptoTech Displays Ltd';
    const nextPoId = generateNextPoId();

    const newPo = {
      id: nextPoId,
      supplier: poSupplierName,
      item: poModalItem.name,
      type: "Raw Material",
      qty: Number(poQty),
      unitCost: `$${cost.toFixed(2)}`,
      total: `$${totalVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      numericTotal: totalVal,
      status: "Sent",
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: poExpectedDate || "2026-08-18",
      shippingAddress: "Plant 1 Receiving Dock, Sector 4",
      billingAddress: "Acme HQ, Accounts Payable",
      items: [
        {
          desc: poModalItem.name,
          qty: Number(poQty),
          unitCost: cost,
          amount: totalVal
        }
      ],
      auditTrail: [
        {
          step: `PO Created via Raw Material Reorder (${poModalItem.sku})`,
          by: "Marcus Vance (Procurement)",
          time: new Date().toLocaleString()
        }
      ]
    };

    addPurchaseOrder(newPo);
    setPoModalItem(null);
    addToast(`Purchase Order ${newPo.id} issued to ${poSupplierName} for ${poQty} ${poModalItem.unit}`, 'success', 'PO Dispatched');
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
                Raw Materials Master Catalog
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Centralized bill-of-materials components, reorder thresholds, supplier lead times, and warehouse stock levels.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setCategoryFilter('all');
              setStatusFilter('all');
              setSupplierFilter('all');
              setSearchQuery('');
              setRawMaterialFilter('all');
            }}
            title="Reset Filters"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Raw Material</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        <StatCard
          title="Total Raw Materials"
          value={`${kpiStats.totalCount} SKUs`}
          change={`${categories.length - 1} Categories`}
          isPositive={true}
          period="Active Catalog"
          icon="Boxes"
          color="indigo"
          chartData={[12, 14, 15, 16, 17, 18, kpiStats.totalCount]}
        />
        <StatCard
          title="Low Stock Alerts"
          value={`${kpiStats.lowStockCount} Items`}
          change="At / Below Reorder Point"
          isPositive={kpiStats.lowStockCount === 0}
          period="Reorder Required"
          icon="AlertTriangle"
          color="amber"
          chartData={[5, 4, 6, 3, 4, 3, kpiStats.lowStockCount]}
        />
        <StatCard
          title="Total Raw Material Value"
          value={`$${kpiStats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Inventory Valuation"
          isPositive={true}
          period="At Current Unit Cost"
          icon="DollarSign"
          color="emerald"
          chartData={[35, 38, 42, 40, 44, 46, 48]}
        />
        <StatCard
          title="Out of Stock Items"
          value={`${kpiStats.outOfStockCount} Items`}
          change={kpiStats.outOfStockCount > 0 ? "Production Risk" : "Zero Stockouts"}
          isPositive={kpiStats.outOfStockCount === 0}
          period="0 Units Available"
          icon="XCircle"
          color={kpiStats.outOfStockCount > 0 ? "rose" : "emerald"}
          chartData={[2, 1, 3, 2, 1, 0, kpiStats.outOfStockCount]}
        />
      </div>

      {/* Search, Multi-Level Filters & Sort Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        {/* Responsive 4-Column Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Search Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Search Material
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, SKU, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Categories ({rawMaterials.length})</option>
              {categories.filter(c => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 3. Stock Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Stock Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="in_stock">In Stock (Optimal)</option>
              <option value="low_stock">Low Stock (Reorder Alert)</option>
              <option value="out_of_stock">Out of Stock (Zero Units)</option>
            </select>
          </div>

          {/* 4. Preferred Supplier Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Preferred Supplier
            </label>
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Suppliers</option>
              {suppliers.filter(s => s !== 'all').map((sup) => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Stock Filter Pills & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 mr-1">Quick Filters:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Items ({rawMaterials.length})
            </button>
            <button
              onClick={() => setStatusFilter('low_stock')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === 'low_stock'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="h-3 w-3" />
              Low Stock ({kpiStats.lowStockCount})
            </button>
            <button
              onClick={() => setStatusFilter('out_of_stock')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === 'out_of_stock'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-100'
              }`}
            >
              <XCircle className="h-3 w-3" />
              Out of Stock ({kpiStats.outOfStockCount})
            </button>
            <button
              onClick={() => setStatusFilter('in_stock')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === 'in_stock'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="h-3 w-3" />
              Optimal Stock ({rawMaterials.length - kpiStats.lowStockCount - kpiStats.outOfStockCount})
            </button>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="stock_asc">Stock: Lowest First (Urgent)</option>
                <option value="stock_desc">Stock: Highest First</option>
                <option value="cost_desc">Unit Cost: High to Low</option>
                <option value="cost_asc">Unit Cost: Low to High</option>
                <option value="name_asc">Material Name (A to Z)</option>
                <option value="min_stock_desc">Highest Reorder Level</option>
              </select>
            </div>

            <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Showing <strong className="text-slate-800 dark:text-slate-200 font-bold">{filteredMaterials.length}</strong> of {rawMaterials.length}
            </span>
          </div>
        </div>
      </div>

      {/* RAW MATERIALS DATA TABLE */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <table className="w-full text-left border-collapse min-w-[1320px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {/* Sticky Material & SKU Header */}
                <th className="sticky left-0 z-20 bg-slate-50 dark:bg-slate-950 pl-4 pr-3 py-3.5 whitespace-nowrap min-w-[220px] border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)]">
                  Material & SKU
                </th>
                <th className="px-3 py-3.5 min-w-[160px] whitespace-nowrap">Category</th>
                <th className="px-3 py-3.5 min-w-[140px] whitespace-nowrap">Current Stock</th>
                <th className="px-3 py-3.5 min-w-[140px] whitespace-nowrap">Reorder Level</th>
                <th className="px-3 py-3.5 min-w-[110px] whitespace-nowrap">Unit Cost</th>
                <th className="px-3 py-3.5 min-w-[120px] whitespace-nowrap">Total Value</th>
                <th className="px-3 py-3.5 min-w-[180px] whitespace-nowrap">Preferred Supplier</th>
                <th className="px-3 py-3.5 min-w-[130px] whitespace-nowrap">Status</th>
                <th className="pl-3 pr-4 py-3.5 text-right min-w-[180px] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
              {filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    <Boxes className="h-10 w-10 text-slate-400 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No raw materials found matching your filters.</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing search filters or add a new raw material item.</p>
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((item) => {
                  const cost = item.numericCost || Number(item.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
                  const itemValue = Number(item.stock) * cost;
                  const stockPct = Math.min(100, Math.round((Number(item.stock) / (Number(item.minStock) * 2 || 1)) * 100));

                  const isOut = Number(item.stock) <= 0;
                  const isLow = Number(item.stock) <= Number(item.minStock) && !isOut;

                  return (
                    <tr key={item.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Sticky Material Name & SKU Cell */}
                      <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-850 pl-4 pr-3 py-3.5 whitespace-nowrap border-r border-slate-200/80 dark:border-slate-800 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)] dark:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.4)] transition-colors min-w-[220px]">
                        <div className="flex flex-col">
                          <button
                            onClick={() => setViewItem(item)}
                            title={item.name}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors cursor-pointer truncate max-w-[200px]"
                          >
                            {item.name}
                          </button>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                              {item.sku}
                            </span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[100px]" title={item.warehouse}>{item.warehouse}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3.5 whitespace-nowrap min-w-[160px]">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>

                      {/* Current Stock */}
                      <td className="px-3 py-3.5 whitespace-nowrap min-w-[140px]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold text-xs ${
                              isOut ? 'text-rose-600 dark:text-rose-400' :
                              isLow ? 'text-amber-600 dark:text-amber-400' :
                              'text-slate-900 dark:text-white'
                            }`}>
                              {item.stock} {item.unit}
                            </span>
                          </div>
                          {/* Mini Stock Bar */}
                          <div className="w-24 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isOut ? 'bg-rose-500' :
                                isLow ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.max(5, stockPct)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Reorder Level */}
                      <td className="px-3 py-3.5 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap min-w-[140px]">
                        {item.minStock} {item.unit}
                      </td>

                      {/* Unit Cost */}
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap min-w-[110px]">
                        {item.unitCost}
                      </td>

                      {/* Total Inventory Value */}
                      <td className="px-3 py-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap min-w-[120px]">
                        ${itemValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Preferred Supplier */}
                      <td className="px-3 py-3.5 min-w-[180px]">
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs truncate max-w-[170px]" title={item.preferredSupplier || 'Internal Depot'}>
                            {item.preferredSupplier || 'Internal Depot'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Lead: {item.supplierLeadTime || '3-5 Days'}
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-3 py-3.5 whitespace-nowrap min-w-[130px]">
                        {isOut ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center gap-1 w-fit">
                            <XCircle className="h-3 w-3" /> Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3 w-3" /> Low Stock
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="h-3 w-3" /> In Stock
                          </span>
                        )}
                      </td>

                      {/* Action Menu */}
                      <td className="pl-3 pr-4 py-3.5 text-right whitespace-nowrap min-w-[180px]">
                        <div className="flex items-center justify-end gap-1">
                          {/* View Profile Detail */}
                          <button
                            onClick={() => setViewItem(item)}
                            title="View Material Profile & History"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Stock-In */}
                          <button
                            onClick={() => {
                              setStockInModalItem(item);
                              setStockInQty(50);
                              setStockInWarehouse(item.warehouse || 'Main Assembly Depot');
                            }}
                            title="Quick Stock-In (Add Inventory)"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                          >
                            <ArrowDownToLine className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Create PO */}
                          <button
                            onClick={() => {
                              setPoModalItem(item);
                              setPoQty(item.minStock ? item.minStock * 2 : 100);
                              setPoSupplier(item.preferredSupplier || 'OptoTech Displays Ltd');
                            }}
                            title="Issue Reorder Purchase Order"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Material */}
                          <button
                            onClick={() => setEditItem({ ...item })}
                            title="Edit Material Specs"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove ${item.name} (${item.sku}) from the catalog?`)) {
                                deleteInventoryItem(item.id);
                              }
                            }}
                            title="Delete Raw Material"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DRAWER: DETAILED MATERIAL PROFILE & MOVEMENT AUDIT TRAIL */}
      {/* ========================================================================= */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                    {viewItem.sku}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{viewItem.category}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-1">
                  {viewItem.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {viewItem.description || "Specification data for production operations."}
                </p>
              </div>

              <button
                onClick={() => setViewItem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={() => {
                  setStockInModalItem(viewItem);
                  setStockInQty(50);
                  setStockInWarehouse(viewItem.warehouse || 'Main Assembly Depot');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Quick Stock-In</span>
              </button>

              <button
                onClick={() => {
                  setPoModalItem(viewItem);
                  setPoQty(viewItem.minStock ? viewItem.minStock * 2 : 100);
                  setPoSupplier(viewItem.preferredSupplier || 'OptoTech Displays Ltd');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Issue Reorder PO</span>
              </button>

              <button
                onClick={() => {
                  setEditItem({ ...viewItem });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-auto"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Specs</span>
              </button>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Current Stock</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {viewItem.stock} {viewItem.unit}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Reorder Point</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {viewItem.minStock} {viewItem.unit}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Unit Cost</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{viewItem.unitCost}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Supplier Lead Time</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{viewItem.supplierLeadTime || '5 Days'}</span>
              </div>
            </div>

            {/* Warehouse Breakdown */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <Warehouse className="h-3.5 w-3.5 text-indigo-500" /> Multi-Warehouse Stock Distribution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(viewItem.warehouses && viewItem.warehouses.length > 0 ? viewItem.warehouses : [{ name: viewItem.warehouse || 'Main Assembly Depot', qty: viewItem.stock }]).map((wh, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{wh.name}</span>
                      <span className="text-[10px] text-slate-500">Storage Sector A-12</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {wh.qty} {viewItem.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked BOMs (Finished Products using this Material) */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-emerald-500" /> Linked Bill of Materials (Finished Goods)
              </h3>
              {viewItem.linkedBoms && viewItem.linkedBoms.length > 0 ? (
                <div className="space-y-2">
                  {viewItem.linkedBoms.map((bom, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{bom.product}</span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{bom.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {bom.qtyPerUnit} {bom.unit} per finished unit
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-500">
                  Used in general manufacturing and assembly lines.
                </div>
              )}
            </div>

            {/* Stock Movement History Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 text-amber-500" /> Stock Movement History & Audit Log
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {viewItem.stockMovements && viewItem.stockMovements.length > 0 ? (
                  viewItem.stockMovements.map((mov, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{mov.type}</span>
                          {mov.ref?.startsWith('PO-') ? (
                            <button
                              onClick={() => viewPurchaseOrder(mov.ref)}
                              className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer inline-flex items-center gap-0.5"
                              title="Click to view Purchase Order Details"
                            >
                              {mov.ref}
                              <ExternalLink className="h-2.5 w-2.5" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400">({mov.ref})</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          By <strong className="text-slate-700 dark:text-slate-300">{mov.user}</strong> • {mov.date} • {mov.warehouse}
                        </div>
                      </div>

                      <span className={`font-bold text-xs ${
                        mov.qty > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {mov.qty > 0 ? `+${mov.qty}` : mov.qty} {viewItem.unit}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 p-2">No historical movements logged yet.</p>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setViewItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MODAL: ADD RAW MATERIAL */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Add New Raw Material to Catalog
                </h3>
                <p className="text-xs text-slate-500">Register new component for BOM assemblies and warehouse stock.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Material Component Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10.1 Inch TFT Touchscreen Module"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">SKU / Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SKU-RM-109"
                    value={newMaterial.sku}
                    onChange={(e) => setNewMaterial({ ...newMaterial, sku: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option>Electronics & Displays</option>
                    <option>Metals & Enclosures</option>
                    <option>Processors & Chips</option>
                    <option>Thermal & Printing</option>
                    <option>Plastics & Polymers</option>
                    <option>Cables & Wiring</option>
                    <option>Packaging & Boxes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit of Measure (UOM)</label>
                  <select
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="Pcs">Pcs (Units)</option>
                    <option value="kg">kg (Weight)</option>
                    <option value="liter">liter (Volume)</option>
                    <option value="meter">meter (Length)</option>
                    <option value="box">box (Packaging)</option>
                    <option value="roll">roll (Tape/Wire)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newMaterial.stock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, stock: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reorder Level</label>
                  <input
                    type="number"
                    required
                    value={newMaterial.minStock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minStock: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Cost ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45.00"
                    value={newMaterial.unitCost}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitCost: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Warehouse</label>
                  <select
                    value={newMaterial.warehouse}
                    onChange={(e) => setNewMaterial({ ...newMaterial, warehouse: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option>Main Assembly Depot</option>
                    <option>Component Vault</option>
                    <option>Finished Goods Hub</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Supplier</label>
                  <select
                    value={newMaterial.preferredSupplier}
                    onChange={(e) => setNewMaterial({ ...newMaterial, preferredSupplier: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option>OptoTech Displays Ltd</option>
                    <option>Precision Machining Corp</option>
                    <option>Silicon Core Semiconductors</option>
                    <option>Apex Fasteners & Cables</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lead Time</label>
                  <input
                    type="text"
                    value={newMaterial.supplierLeadTime}
                    onChange={(e) => setNewMaterial({ ...newMaterial, supplierLeadTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description / Technical Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter specifications, pinouts, or tolerance parameters..."
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Create Raw Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODAL: EDIT RAW MATERIAL */}
      {/* ========================================================================= */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Edit Material ({editItem.sku})
                </h3>
                <p className="text-xs text-slate-500">Update specifications, reorder levels, or preferred supplier.</p>
              </div>
              <button onClick={() => setEditItem(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Material Name</label>
                <input
                  type="text"
                  required
                  value={editItem.name || ''}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editItem.category || ''}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    value={editItem.unit || 'Pcs'}
                    onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={editItem.stock}
                    onChange={(e) => setEditItem({ ...editItem, stock: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reorder Level</label>
                  <input
                    type="number"
                    value={editItem.minStock}
                    onChange={(e) => setEditItem({ ...editItem, minStock: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editItem.numericCost || editItem.unitCost?.toString().replace(/[^0-9.-]+/g, '') || ''}
                    onChange={(e) => setEditItem({ ...editItem, numericCost: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Supplier</label>
                  <input
                    type="text"
                    value={editItem.preferredSupplier || ''}
                    onChange={(e) => setEditItem({ ...editItem, preferredSupplier: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lead Time</label>
                  <input
                    type="text"
                    value={editItem.supplierLeadTime || ''}
                    onChange={(e) => setEditItem({ ...editItem, supplierLeadTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: QUICK STOCK-IN */}
      {/* ========================================================================= */}
      {stockInModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">Quick Stock-In</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Add Stock to {stockInModalItem.name}
                </h3>
              </div>
              <button onClick={() => setStockInModalItem(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleStockInSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Current Stock</span>
                  <span className="font-bold text-slate-900 dark:text-white">{stockInModalItem.stock} {stockInModalItem.unit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Reorder Point</span>
                  <span className="font-bold text-amber-600">{stockInModalItem.minStock} {stockInModalItem.unit}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quantity to Add ({stockInModalItem.unit}) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={stockInQty}
                  onChange={(e) => setStockInQty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination Warehouse</label>
                <select
                  value={stockInWarehouse}
                  onChange={(e) => setStockInWarehouse(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option>Main Assembly Depot</option>
                  <option>Component Vault</option>
                  <option>Finished Goods Hub</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Source / Receipt Type</label>
                <select
                  value={stockInSource}
                  onChange={(e) => setStockInSource(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option>PO Receipt / Supplier Delivery</option>
                  <option>Warehouse Stock Transfer In</option>
                  <option>Production Return (Unused Material)</option>
                  <option>Audit Cycle Adjustment</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStockInModalItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Confirm Stock-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: QUICK REORDER PURCHASE ORDER */}
      {/* ========================================================================= */}
      {poModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Fast Reorder PO</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  Issue Supplier Purchase Order
                </h3>
              </div>
              <button onClick={() => setPoModalItem(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePoSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Material SKU</span>
                <span className="font-bold text-slate-900 dark:text-white block">{poModalItem.name}</span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">{poModalItem.sku}</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Supplier *</label>
                <input
                  type="text"
                  required
                  value={poSupplier}
                  onChange={(e) => setPoSupplier(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Order Quantity ({poModalItem.unit}) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={poQty}
                    onChange={(e) => setPoQty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Est. Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={poExpectedDate}
                    onChange={(e) => setPoExpectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estimated Total Order:</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  ${((Number(poQty) || 0) * (poModalItem.numericCost || Number(poModalItem.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setPoModalItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs"
                >
                  Dispatch Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialsView;
