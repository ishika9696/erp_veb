import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import RawMaterialsView from './RawMaterialsView';
import {
  BOM_LIST,
  WORK_ORDERS_KANBAN,
  RAW_MATERIALS_INVENTORY,
  QUALITY_CONTROL_TESTS,
  MATERIAL_USAGE_REPORTS,
  MACHINE_RESOURCE_ALLOCATION,
  SUPPLIER_DIRECTORY
} from '../../../data/mockData';
import {
  Factory,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Cpu,
  Truck,
  DollarSign,
  TrendingUp,
  XCircle,
  FileCheck,
  Pencil,
  Eye,
  Trash2,
  Boxes,
  X
} from 'lucide-react';

const ManufacturingView = () => {
  const {
    addToast,
    purchaseOrders,
    addPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder
  } = useApp();
  const [activeTab, setActiveTab] = useState('bom_orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [workOrders, setWorkOrders] = useState(WORK_ORDERS_KANBAN);
  const [qcTests, setQcTests] = useState(QUALITY_CONTROL_TESTS);

  // New Work Order Modal
  const [showWoModal, setShowWoModal] = useState(false);
  const [newWoProduct, setNewWoProduct] = useState('POS Touchscreen Terminal X1');
  const [newWoQty, setNewWoQty] = useState(50);

  // PO Modals
  const [showPoModal, setShowPoModal] = useState(false);
  const [editPoModal, setEditPoModal] = useState(null);
  const [viewPoModal, setViewPoModal] = useState(null);
  const [poSupplier, setPoSupplier] = useState('OptoTech Displays Ltd');
  const [poMaterial, setPoMaterial] = useState('15.6 Inch IPS Touch Display Panel');
  const [poQty, setPoQty] = useState(100);

  const tabs = [
    { id: 'bom_orders', label: 'BOM & Work Orders', icon: Factory },
    { id: 'raw_materials', label: 'Raw Materials Master', icon: Boxes },
    { id: 'purchase_orders', label: 'Raw Material POs', icon: Truck },
    { id: 'quality_control', label: 'QC & Sample Testing', icon: ShieldCheck },
    { id: 'material_usage', label: 'Material Usage & Scrap', icon: FileText },
    { id: 'scheduling', label: 'Production Schedule', icon: Calendar },
    { id: 'machines', label: 'Machines & Resources', icon: Cpu },
    { id: 'suppliers', label: 'Suppliers & Batches', icon: TrendingUp }
  ];

  const handleCreateWo = (e) => {
    e.preventDefault();
    const newWo = {
      id: `WO-${Math.floor(100 + Math.random() * 900)}`,
      orderNo: `PO-2026-${Math.floor(50 + Math.random() * 50)}`,
      product: newWoProduct,
      qty: Number(newWoQty),
      bomId: "BOM-001",
      assignedTo: "Line A - Electronics",
      dueDate: "Aug 18, 2026",
      priority: "High",
      stage: "Pending"
    };
    setWorkOrders((prev) => ({
      ...prev,
      pending: [newWo, ...prev.pending]
    }));
    setShowWoModal(false);
    addToast(`Work Order ${newWo.id} created successfully!`, "success");
  };

  const handleCreatePo = (e) => {
    e.preventDefault();
    const newPo = {
      id: `PO-RM-2026-0${purchaseOrders.length + 1}`,
      supplier: poSupplier,
      item: poMaterial,
      type: "Raw Material",
      qty: Number(poQty),
      unitCost: "$180.00",
      total: `$${(Number(poQty) * 180).toLocaleString()}.00`,
      numericTotal: Number(poQty) * 180,
      status: "Sent",
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: "2026-08-14",
      autoReorder: true,
      shippingAddress: "Plant 1 Assembly Dock, Sector 4",
      billingAddress: "Acme HQ, Accounts Payable",
      items: [{ desc: poMaterial, qty: Number(poQty), unitCost: 180, amount: Number(poQty) * 180 }],
      auditTrail: [
        { step: "PO Issued from Manufacturing", by: "Marcus Vance", time: new Date().toLocaleString() }
      ]
    };
    addPurchaseOrder(newPo);
    setShowPoModal(false);
    addToast(`Purchase Order ${newPo.id} sent to ${poSupplier}`, "success");
  };

  const handleSaveEditPo = (e) => {
    e.preventDefault();
    if (!editPoModal) return;
    const numQty = Number(editPoModal.qty) || 1;
    const unitPrice = Number(editPoModal.unitCost?.toString().replace(/[^0-9.-]+/g,"")) || 180;
    const totalVal = numQty * unitPrice;

    const updated = {
      ...editPoModal,
      qty: numQty,
      total: `$${totalVal.toLocaleString()}.00`,
      numericTotal: totalVal,
      auditTrail: [
        ...(editPoModal.auditTrail || []),
        { step: "PO Modified in Manufacturing", by: "Marcus Vance", time: new Date().toLocaleString() }
      ]
    };

    updatePurchaseOrder(editPoModal.id, updated);
    setEditPoModal(null);
    addToast(`Purchase Order ${editPoModal.id} updated successfully`, "success");
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Sub-Navigation Tabs */}
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

      {/* TAB 1: BOM & WORK ORDERS */}
      {activeTab === 'bom_orders' && (
        <div className="space-y-6">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Bill of Materials & Live Work Orders Kanban
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowWoModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>New Work Order</span>
              </button>
            </div>
          </div>

          {/* BOM Builder Recipe Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BOM_LIST.map((bom) => (
              <div key={bom.id} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                      {bom.id} • {bom.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Unit Cost: {bom.unitCost}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-3">
                    {bom.finishedProduct} ({bom.productSku})
                  </h3>

                  {/* Raw Materials List */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Raw Materials Required (Per Unit)</span>
                    {bom.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60">
                        <span>{mat.name} ({mat.qty} {mat.unit})</span>
                        <span className="font-semibold text-slate-900 dark:text-white">${mat.unitCost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Labor: {bom.laborHours} hrs</span>
                  <span>Overhead: ${bom.overheadCost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Column 1: Pending */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pending ({workOrders.pending.length})</span>
                <span className="h-2 w-2 rounded-full bg-slate-400" />
              </div>
              <div className="space-y-3">
                {workOrders.pending.map((wo) => (
                  <div key={wo.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{wo.id}</span>
                      <span className="text-slate-500 font-semibold">{wo.priority}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{wo.product}</h4>
                    <p className="text-[11px] text-slate-500">Qty: {wo.qty} • {wo.assignedTo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Production */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">In Production ({workOrders.inProduction.length})</span>
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                {workOrders.inProduction.map((wo) => (
                  <div key={wo.id} className="p-3.5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/60 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{wo.id}</span>
                      <span className="text-emerald-600 font-bold">{wo.progress}%</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{wo.product}</h4>
                    <p className="text-[11px] text-slate-500">Qty: {wo.qty} • {wo.assignedTo}</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${wo.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Quality Check */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Quality Check ({workOrders.qualityCheck.length})</span>
                <span className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
              <div className="space-y-3">
                {workOrders.qualityCheck.map((wo) => (
                  <div key={wo.id} className="p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/60 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-600 dark:text-amber-400">{wo.id}</span>
                      <span className="text-xs font-bold text-emerald-600">{wo.qcStatus}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{wo.product}</h4>
                    <p className="text-[11px] text-slate-500">Qty: {wo.qty} • {wo.assignedTo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Completed */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Completed ({workOrders.completed.length})</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div className="space-y-3">
                {workOrders.completed.map((wo) => (
                  <div key={wo.id} className="p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{wo.id}</span>
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{wo.product}</h4>
                    <p className="text-[11px] text-slate-500">Qty: {wo.qty} • Finished Stock-in</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: RAW MATERIALS MASTER */}
      {activeTab === 'raw_materials' && (
        <RawMaterialsView />
      )}

      {/* TAB 2: RAW MATERIAL PURCHASE ORDERS */}
      {activeTab === 'purchase_orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Raw Material Purchase Orders (Supplier POs)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Create supplier POs for BOM components and trigger auto-reorders.</p>
            </div>
            <button
              onClick={() => setShowPoModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Issue New PO</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5">PO ID</th>
                    <th className="p-3.5">Supplier</th>
                    <th className="p-3.5">Material Component</th>
                    <th className="p-3.5">Qty</th>
                    <th className="p-3.5">Total Cost</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Expected Delivery</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {purchaseOrders.map((po) => {
                    const isLocked = po.status === 'Received' || po.status === 'Closed';
                    return (
                      <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{po.id}</td>
                        <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{po.supplier}</td>
                        <td className="p-3.5 text-slate-700 dark:text-slate-300">{po.item || (po.items && po.items[0]?.desc) || 'Procurement Item'}</td>
                        <td className="p-3.5 text-slate-900 dark:text-white font-bold">{po.qty || (po.items && po.items[0]?.qty) || 1} Pcs</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{po.total}</td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            po.status === 'Received' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                            po.status === 'Partially Received' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                            po.status === 'Sent' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                            po.status === 'Draft' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                            'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {po.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500">{po.expectedDate}</td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewPoModal(po)}
                              title="View PO Details"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {isLocked ? (
                              <div className="relative group inline-block">
                                <button
                                  disabled
                                  className="p-1.5 rounded-lg text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <div className="hidden group-hover:block absolute right-0 bottom-full mb-1.5 w-48 p-2 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none text-left">
                                  Received / Closed POs cannot be edited — records are locked for accounting integrity.
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditPoModal({ ...po })}
                                title="Edit PO"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => deletePurchaseOrder(po.id)}
                              title="Delete PO"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QUALITY CONTROL & SAMPLE TESTING */}
      {activeTab === 'quality_control' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Quality Control (QC) & Sample Batch Gate
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Log test parameters, certificates, and gate production completed sign-offs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {qcTests.map((qc) => (
              <div key={qc.id} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      {qc.id} • {qc.batchNo}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      qc.result === 'Passed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      qc.result === 'In Testing' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {qc.result}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-1">{qc.product}</h3>
                  <p className="text-xs text-slate-500 mb-3">Work Order: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{qc.woId}</span> • Sample Size: {qc.sampleQty} Pcs</p>

                  <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <p><span className="font-bold text-slate-900 dark:text-white">Criteria:</span> {qc.criteria}</p>
                    <p><span className="font-bold text-slate-900 dark:text-white">Inspector Notes:</span> {qc.notes}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Inspector: {qc.inspector}</span>
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <FileCheck className="h-4 w-4" /> Cert Attached
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MATERIAL USAGE & SCRAP REPORTS */}
      {activeTab === 'material_usage' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Material Usage & Scrap Impact Report
          </h2>
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Work Order</th>
                  <th className="p-3.5">Raw Material Item</th>
                  <th className="p-3.5">Planned Qty</th>
                  <th className="p-3.5">Actual Qty</th>
                  <th className="p-3.5">Variance %</th>
                  <th className="p-3.5">Scrap Cost</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {MATERIAL_USAGE_REPORTS.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{r.woId}</td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{r.item}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{r.plannedQty}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{r.actualQty}</td>
                    <td className="p-3.5 font-bold text-amber-600">{r.variance}</td>
                    <td className="p-3.5 font-bold text-rose-600">{r.scrapCost}</td>
                    <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: PRODUCTION SCHEDULING */}
      {activeTab === 'scheduling' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Production Scheduling & Capacity Planning
          </h2>
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
            <Calendar className="h-10 w-10 text-indigo-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Line A & Line B Gantt Schedule</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">Visual capacity planning across SMT, CNC Milling, and Assembly Lines scheduled for Aug 04 - Aug 20, 2026.</p>
          </div>
        </div>
      )}

      {/* TAB 6: MACHINES & RESOURCES */}
      {activeTab === 'machines' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Machine & Work Center Allocation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MACHINE_RESOURCE_ALLOCATION.map((m) => (
              <div key={m.machineId} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">{m.machineId}</span>
                  <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${
                    m.status === 'Running' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    m.status === 'Idle' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                    'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</h3>
                <p className="text-[11px] text-slate-500">Utilization: <span className="font-bold text-slate-900 dark:text-white">{m.utilization}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SUPPLIERS & BATCH TRACEABILITY */}
      {activeTab === 'suppliers' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Supplier Directory & Batch/Lot Traceability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUPPLIER_DIRECTORY.map((sup) => (
              <div key={sup.id} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 text-xs">
                <span className="font-bold text-indigo-600">{sup.id}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sup.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">Contact: {sup.contact} ({sup.email})</p>
                <p className="text-slate-600 dark:text-slate-400">Lead Time: <span className="font-bold text-slate-900 dark:text-white">{sup.leadTime}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: NEW WORK ORDER */}
      {showWoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Create Production Work Order</h3>
            <form onSubmit={handleCreateWo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Target Product</label>
                <select value={newWoProduct} onChange={(e) => setNewWoProduct(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <option>POS Touchscreen Terminal X1</option>
                  <option>Wireless Thermal Barcode Printer</option>
                  <option>Smart RFID Scanner Gun</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Target Batch Quantity</label>
                <input type="number" value={newWoQty} onChange={(e) => setNewWoQty(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowWoModal(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Create Work Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW PO */}
      {showPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Issue Supplier Purchase Order</h3>
            <form onSubmit={handleCreatePo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Supplier</label>
                <select value={poSupplier} onChange={(e) => setPoSupplier(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <option>OptoTech Displays Ltd</option>
                  <option>Precision Machining Corp</option>
                  <option>Silicon Core Semiconductors</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Raw Material Item</label>
                <input type="text" value={poMaterial} onChange={(e) => setPoMaterial(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Quantity</label>
                <input type="number" value={poQty} onChange={(e) => setPoQty(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" required />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPoModal(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Send Purchase Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PO */}
      {editPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Edit Purchase Order ({editPoModal.id})</h3>
              <button onClick={() => setEditPoModal(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveEditPo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Supplier</label>
                <input
                  type="text"
                  value={editPoModal.supplier || ''}
                  onChange={(e) => setEditPoModal({ ...editPoModal, supplier: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Item / Component</label>
                <input
                  type="text"
                  value={editPoModal.item || (editPoModal.items && editPoModal.items[0]?.desc) || ''}
                  onChange={(e) => setEditPoModal({ ...editPoModal, item: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={editPoModal.qty || (editPoModal.items && editPoModal.items[0]?.qty) || 1}
                    onChange={(e) => setEditPoModal({ ...editPoModal, qty: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Expected Delivery</label>
                  <input
                    type="date"
                    value={editPoModal.expectedDate || ''}
                    onChange={(e) => setEditPoModal({ ...editPoModal, expectedDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  value={editPoModal.status || 'Draft'}
                  onChange={(e) => setEditPoModal({ ...editPoModal, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Partially Received">Partially Received</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setEditPoModal(null)} className="px-4 py-2 rounded-xl border text-slate-600 dark:text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW PO */}
      {viewPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Purchase Order Detail</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{viewPoModal.id}</h3>
              </div>
              <button onClick={() => setViewPoModal(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Supplier</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewPoModal.supplier}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Status</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{viewPoModal.status}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Item / Material</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{viewPoModal.item || (viewPoModal.items && viewPoModal.items[0]?.desc)}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Total Amount</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewPoModal.total}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Order Date</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{viewPoModal.orderDate || '2026-08-01'}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block">Expected Delivery</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{viewPoModal.expectedDate}</span>
              </div>
            </div>

            {viewPoModal.auditTrail && viewPoModal.auditTrail.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Audit Trail</span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {viewPoModal.auditTrail.map((log, idx) => (
                    <div key={idx} className="text-[11px] flex items-center justify-between text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
                      <span className="font-medium">{log.step} ({log.by})</span>
                      <span className="text-[10px] text-slate-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setViewPoModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturingView;
