import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  RAW_MATERIALS_INVENTORY,
  INVENTORY_STOCK_INS,
  INVENTORY_ADJUSTMENTS,
  INVENTORY_AUDITS
} from '../../../data/mockData';
import {
  Package,
  Plus,
  ArrowRightLeft,
  SlidersHorizontal,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Warehouse
} from 'lucide-react';

const InventoryView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [inventoryList, setInventoryList] = useState(RAW_MATERIALS_INVENTORY);
  const [stockInLogs, setStockInLogs] = useState(INVENTORY_STOCK_INS);
  const [adjustments, setAdjustments] = useState(INVENTORY_ADJUSTMENTS);

  // Modals
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Stock-In Form
  const [inItem, setInItem] = useState('Aluminium CNC Terminal Casing');
  const [inQty, setInQty] = useState(50);
  const [inWarehouse, setInWarehouse] = useState('Main Assembly Depot');
  const [inReason, setInReason] = useState('Purchase Receipt');

  // Transfer Form
  const [transferItem, setTransferItem] = useState('15.6 Inch IPS Touch Display Panel');
  const [transferQty, setTransferQty] = useState(20);
  const [fromWh, setFromWh] = useState('Main Assembly Depot');
  const [toWh, setToWh] = useState('Component Vault');

  // Adjustment Form
  const [adjItem, setAdjItem] = useState('Thermal Printhead Engine 80mm');
  const [adjQty, setAdjQty] = useState(-2);
  const [adjReason, setAdjReason] = useState('Damage / Scrap in QC');

  const tabs = [
    { id: 'overview', label: 'Stock Overview', icon: Package },
    { id: 'stock_in', label: 'Add Inventory (Stock-In)', icon: Plus },
    { id: 'transfer', label: 'Transfer Stock', icon: ArrowRightLeft },
    { id: 'adjustment', label: 'Stock Adjustment', icon: SlidersHorizontal },
    { id: 'audit', label: 'Stock Audit & Cycle Count', icon: ClipboardCheck }
  ];

  const handleStockInSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `STK-IN-${Math.floor(900 + Math.random() * 99)}`,
      item: inItem,
      qty: Number(inQty),
      warehouse: inWarehouse,
      unitCost: "$85.00",
      totalVal: `$${(Number(inQty) * 85).toLocaleString()}.00`,
      source: inReason,
      date: "Aug 04, 2026",
      receivedBy: "Sarah Jenkins"
    };
    setStockInLogs((prev) => [newLog, ...prev]);

    // Update inventory stock
    setInventoryList((prev) =>
      prev.map((inv) => (inv.name === inItem ? { ...inv, stock: inv.stock + Number(inQty), isLow: false } : inv))
    );

    setShowStockInModal(false);
    addToast(`Stock-In ${newLog.id}: Added ${inQty} units to ${inWarehouse}`, "success");
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setShowTransferModal(false);
    addToast(`Transferred ${transferQty} units of ${transferItem} from ${fromWh} to ${toWh}`, "info");
  };

  const handleAdjustmentSubmit = (e) => {
    e.preventDefault();
    const newAdj = {
      id: `ADJ-2026-0${adjustments.length + 1}`,
      item: adjItem,
      qtyChange: Number(adjQty),
      reason: adjReason,
      warehouse: "Component Vault",
      date: "Aug 04, 2026",
      status: "Approved",
      approvedBy: "Sarah Jenkins"
    };
    setAdjustments((prev) => [newAdj, ...prev]);

    setInventoryList((prev) =>
      prev.map((inv) => (inv.name === adjItem ? { ...inv, stock: Math.max(0, inv.stock + Number(adjQty)) } : inv))
    );

    setShowAdjustModal(false);
    addToast(`Adjustment ${newAdj.id} recorded (${adjQty} units)`, "warning");
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STOCK OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Warehouse Stock Overview & Reorder Levels
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Monitor raw material components and finished goods inventory across warehouses.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStockInModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
              >
                <Plus className="h-4 w-4" />
                <span>Add Inventory</span>
              </button>
              <button
                onClick={() => setShowTransferModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-3.5 py-2 text-xs font-semibold"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>Transfer</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">SKU / Item</th>
                  <th className="p-3.5">Warehouse Location</th>
                  <th className="p-3.5">Current Stock</th>
                  <th className="p-3.5">Min Threshold</th>
                  <th className="p-3.5">Unit Cost</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {inventoryList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.sku}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{item.warehouse}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.stock} {item.unit}</td>
                    <td className="p-3.5 text-slate-500">{item.minStock} {item.unit}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.unitCost}</td>
                    <td className="p-3.5">
                      {item.isLow ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center gap-1 w-fit">
                          <AlertTriangle className="h-3 w-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" /> Optimal
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ADD INVENTORY (STOCK-IN) */}
      {activeTab === 'stock_in' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Stock-In & Purchase Receipt Logs
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Record incoming stock receipts from purchase orders or production outputs.</p>
            </div>
            <button
              onClick={() => setShowStockInModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Record Stock-In Entry</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Entry ID</th>
                  <th className="p-3.5">Item Name</th>
                  <th className="p-3.5">Qty Added</th>
                  <th className="p-3.5">Destination Warehouse</th>
                  <th className="p-3.5">Source / Reason</th>
                  <th className="p-3.5">Received By</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {stockInLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{log.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{log.item}</td>
                    <td className="p-3.5 font-bold text-emerald-600">+{log.qty} Pcs</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{log.warehouse}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{log.source}</td>
                    <td className="p-3.5 text-slate-900 dark:text-white">{log.receivedBy}</td>
                    <td className="p-3.5 text-slate-500">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TRANSFER STOCK */}
      {activeTab === 'transfer' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Inter-Warehouse Stock Transfer
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Move inventory between Assembly Depots and Component Vaults.</p>
            </div>
            <button
              onClick={() => setShowTransferModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>Initiate Stock Transfer</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center space-y-3">
            <Warehouse className="h-10 w-10 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Inter-Warehouse Routes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">Transfer components seamlessly with automatic inventory level reconciliation at both source and destination warehouses.</p>
          </div>
        </div>
      )}

      {/* TAB 4: STOCK ADJUSTMENT */}
      {activeTab === 'adjustment' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Stock Adjustments & Scrap Log
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Adjust stock quantities for damage, scrap, expiry, or audit corrections.</p>
            </div>
            <button
              onClick={() => setShowAdjustModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Record Adjustment</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Adj ID</th>
                  <th className="p-3.5">Item Name</th>
                  <th className="p-3.5">Qty Change</th>
                  <th className="p-3.5">Reason Code</th>
                  <th className="p-3.5">Warehouse</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Approved By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {adjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{adj.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{adj.item}</td>
                    <td className={`p-3.5 font-bold ${adj.qtyChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {adj.qtyChange > 0 ? `+${adj.qtyChange}` : adj.qtyChange} Pcs
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{adj.reason}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{adj.warehouse}</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{adj.status}</span></td>
                    <td className="p-3.5 text-slate-500">{adj.approvedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: STOCK AUDIT & CYCLE COUNT */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Stock Audit & Cycle Count Verification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INVENTORY_AUDITS.map((aud) => (
              <div key={aud.id} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{aud.id}</span>
                  <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">{aud.status}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{aud.warehouse}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Auditor: {aud.auditor} • Items Audited: {aud.itemsAudited}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span>Discrepancies: {aud.discrepanciesFound}</span>
                  <span className="text-rose-600">{aud.totalVarianceVal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: STOCK-IN */}
      {showStockInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Add Inventory (Stock-In)</h3>
            <form onSubmit={handleStockInSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Item</label>
                <select value={inItem} onChange={(e) => setInItem(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {inventoryList.map((i) => (
                    <option key={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Quantity Received</label>
                <input type="number" value={inQty} onChange={(e) => setInQty(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Destination Warehouse</label>
                <select value={inWarehouse} onChange={(e) => setInWarehouse(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <option>Main Assembly Depot</option>
                  <option>Component Vault</option>
                  <option>Finished Goods Hub</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Source / Reason</label>
                <select value={inReason} onChange={(e) => setInReason(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <option>Purchase Receipt</option>
                  <option>Production Output</option>
                  <option>Opening Stock</option>
                  <option>Audit Correction</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowStockInModal(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Record Stock-In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TRANSFER */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Transfer Stock Between Warehouses</h3>
            <form onSubmit={handleTransferSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Item to Transfer</label>
                <select value={transferItem} onChange={(e) => setTransferItem(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {inventoryList.map((i) => (
                    <option key={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Transfer Quantity</label>
                <input type="number" value={transferQty} onChange={(e) => setTransferQty(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">From Warehouse</label>
                  <select value={fromWh} onChange={(e) => setFromWh(e.target.value)} className="w-full p-2 rounded-xl border bg-slate-50 dark:bg-slate-950">
                    <option>Main Assembly Depot</option>
                    <option>Component Vault</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">To Warehouse</label>
                  <select value={toWh} onChange={(e) => setToWh(e.target.value)} className="w-full p-2 rounded-xl border bg-slate-50 dark:bg-slate-950">
                    <option>Component Vault</option>
                    <option>Main Assembly Depot</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowTransferModal(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Transfer Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADJUSTMENT */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Record Stock Adjustment</h3>
            <form onSubmit={handleAdjustmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Item Name</label>
                <select value={adjItem} onChange={(e) => setAdjItem(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {inventoryList.map((i) => (
                    <option key={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Quantity Change (+ or -)</label>
                <input type="number" value={adjQty} onChange={(e) => setAdjQty(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason Code</label>
                <select value={adjReason} onChange={(e) => setAdjReason(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <option>Damage / Scrap in QC</option>
                  <option>Audit Correction</option>
                  <option>Expiry / Obsolete</option>
                  <option>Theft / Shrinkage</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAdjustModal(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Apply Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
