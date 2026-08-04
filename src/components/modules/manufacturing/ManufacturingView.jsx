import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  BOM_LIST,
  WORK_ORDERS_KANBAN,
  RAW_MATERIALS_INVENTORY,
  MANUFACTURING_PURCHASE_ORDERS,
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
  FileCheck
} from 'lucide-react';

const ManufacturingView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('bom_orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [workOrders, setWorkOrders] = useState(WORK_ORDERS_KANBAN);
  const [purchaseOrders, setPurchaseOrders] = useState(MANUFACTURING_PURCHASE_ORDERS);
  const [qcTests, setQcTests] = useState(QUALITY_CONTROL_TESTS);

  // New Work Order Modal
  const [showWoModal, setShowWoModal] = useState(false);
  const [newWoProduct, setNewWoProduct] = useState('POS Touchscreen Terminal X1');
  const [newWoQty, setNewWoQty] = useState(50);

  // New PO Modal
  const [showPoModal, setShowPoModal] = useState(false);
  const [poSupplier, setPoSupplier] = useState('OptoTech Displays Ltd');
  const [poMaterial, setPoMaterial] = useState('15.6 Inch IPS Touch Display Panel');
  const [poQty, setPoQty] = useState(100);

  const tabs = [
    { id: 'bom_orders', label: 'BOM & Work Orders', icon: Factory },
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
      qty: Number(poQty),
      unitCost: "$180.00",
      total: `$${(Number(poQty) * 180).toLocaleString()}.00`,
      status: "Sent",
      expectedDate: "Aug 12, 2026",
      autoReorder: true
    };
    setPurchaseOrders((prev) => [newPo, ...prev]);
    setShowPoModal(false);
    addToast(`Purchase Order ${newPo.id} sent to ${poSupplier}`, "success");
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {purchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{po.id}</td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{po.supplier}</td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-300">{po.item}</td>
                      <td className="p-3.5 text-slate-900 dark:text-white font-bold">{po.qty} Pcs</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{po.total}</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          po.status === 'Received' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          po.status === 'Partially Received' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                          po.status === 'Sent' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{po.expectedDate}</td>
                    </tr>
                  ))}
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
    </div>
  );
};

export default ManufacturingView;
