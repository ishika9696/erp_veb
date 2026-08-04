import React, { useState } from 'react';
import { BOM_LIST, WORK_ORDERS_KANBAN, RAW_MATERIALS_INVENTORY, PRODUCTION_TREND_DATA } from '../../../data/mockData';
import Modal from '../../ui/Modal';
import Drawer from '../../ui/Drawer';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { Factory, Layers, Plus, ArrowRight, Calculator, CheckCircle2, AlertTriangle, FileText, ChevronRight, Play, Wrench, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ManufacturingView = () => {
  const { addToast } = useApp();
  const [boms, setBoms] = useState(BOM_LIST);
  const [workOrders, setWorkOrders] = useState(WORK_ORDERS_KANBAN);
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'bom' | 'calculator' | 'reports'

  // Modal for new BOM
  const [isBomModalOpen, setIsBomModalOpen] = useState(false);
  const [newBom, setNewBom] = useState({
    finishedProduct: '',
    category: 'Hardware Electronics',
    outputQty: 1,
    overheadCost: 50,
    laborHours: 2.0,
    materials: [
      { name: '15.6 Inch IPS Touch Display Panel', qty: 1, unit: 'Pcs', unitCost: 180, wastagePct: 1 },
      { name: 'Aluminium CNC Terminal Casing', qty: 1, unit: 'Pcs', unitCost: 85, wastagePct: 2 }
    ]
  });

  // Drawer for BOM Detail
  const [selectedBom, setSelectedBom] = useState(null);
  const [isBomDrawerOpen, setIsBomDrawerOpen] = useState(false);

  const moveWorkOrder = (order, sourceStage, targetStage) => {
    const sourceKey = sourceStage === 'In Production' ? 'inProduction' : sourceStage === 'Quality Check' ? 'qualityCheck' : sourceStage.toLowerCase();
    const targetKey = targetStage === 'In Production' ? 'inProduction' : targetStage === 'Quality Check' ? 'qualityCheck' : targetStage.toLowerCase();

    const updatedSource = workOrders[sourceKey].filter((w) => w.id !== order.id);
    const updatedOrder = { ...order, stage: targetStage, progress: targetStage === 'Completed' ? 100 : 80 };
    const updatedTarget = [...workOrders[targetKey], updatedOrder];

    setWorkOrders({
      ...workOrders,
      [sourceKey]: updatedSource,
      [targetKey]: updatedTarget
    });

    addToast(`Moved Work Order ${order.id} to ${targetStage}`, "success");
  };

  const handleCreateBom = (e) => {
    e.preventDefault();
    const matTotal = newBom.materials.reduce((acc, m) => acc + m.qty * m.unitCost * (1 + m.wastagePct / 100), 0);
    const laborTotal = newBom.laborHours * 25; // $25/hr
    const totalUnitCost = (matTotal + laborTotal + parseFloat(newBom.overheadCost)) / newBom.outputQty;

    const created = {
      id: `BOM-00${boms.length + 1}`,
      finishedProduct: newBom.finishedProduct,
      productSku: `SKU-FG-${Date.now().toString().slice(-3)}`,
      category: newBom.category,
      outputQty: newBom.outputQty,
      unitCost: `$${totalUnitCost.toFixed(2)}`,
      materials: newBom.materials,
      overheadCost: parseFloat(newBom.overheadCost),
      laborHours: newBom.laborHours
    };

    setBoms([...boms, created]);
    setIsBomModalOpen(false);
    addToast(`New Bill of Materials created for ${newBom.finishedProduct}`, "success");
  };

  const kanbanStages = [
    { key: 'pending', name: 'Pending', color: 'border-slate-300' },
    { key: 'inProduction', name: 'In Production', color: 'border-indigo-500' },
    { key: 'qualityCheck', name: 'Quality Check', color: 'border-amber-500' },
    { key: 'completed', name: 'Completed', color: 'border-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'kanban'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Work Orders Kanban
            </button>
            <button
              onClick={() => setActiveTab('bom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'bom'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Factory className="h-3.5 w-3.5" />
              Bill of Materials (BOM)
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              Cost Calculator
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'reports'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              Wastage Reports
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsBomModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-semibold shadow-2xs shadow-indigo-500/20"
        >
          <Plus className="h-4 w-4" />
          Create BOM Builder
        </button>
      </div>

      {/* Work Orders Kanban Tab */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanStages.map((stg) => {
            const list = workOrders[stg.key] || [];

            return (
              <div
                key={stg.key}
                className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 shadow-xs min-h-[500px]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-heading">{stg.name}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                      {list.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {list.map((order) => (
                    <div
                      key={order.id}
                      className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-800"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">{order.id}</span>
                        <Badge variant={order.priority === 'Urgent' ? 'rose' : order.priority === 'High' ? 'indigo' : 'slate'}>
                          {order.priority}
                        </Badge>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{order.product}</h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Qty: {order.qty} Units ({order.assignedTo})</span>

                      {/* Progress Bar for Production */}
                      {order.progress && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold">
                            <span className="text-slate-400">Production Progress</span>
                            <span className="text-indigo-600 font-bold">{order.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${order.progress}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Quick Move Stage Action */}
                      {stg.name !== 'Completed' && (
                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                          <button
                            onClick={() => {
                              const next = stg.name === 'Pending' ? 'In Production' : stg.name === 'In Production' ? 'Quality Check' : 'Completed';
                              moveWorkOrder(order, stg.name, next);
                            }}
                            className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            Advance Stage <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bill of Materials (BOM) Tab */}
      {activeTab === 'bom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boms.map((bom) => (
            <div
              key={bom.id}
              onClick={() => {
                setSelectedBom(bom);
                setIsBomDrawerOpen(true);
              }}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{bom.id}</span>
                  <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-lg">
                    {bom.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 font-heading">
                  {bom.finishedProduct}
                </h3>
                <p className="text-xs text-slate-400">{bom.productSku}</p>

                {/* Raw Materials Count */}
                <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Raw Materials ({bom.materials.length})</span>
                  {bom.materials.map((mat, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{mat.name}</span>
                      <span className="text-slate-900 dark:text-white font-bold">{mat.qty} {mat.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Calculated Unit Cost</span>
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{bom.unitCost}</span>
                </div>

                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                  View Recipe <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Production Cost Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Calculator className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Unit Production Cost Calculator
              </h3>
              <p className="text-xs text-slate-400">Calculate: Raw Materials + Wastage + Labor Hours + Overhead Fees</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between">
                <span>Raw Materials Cost (incl. 2% avg wastage):</span>
                <span className="font-bold text-slate-900 dark:text-white">$317.50</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Assembly Labor (2.5 hrs @ $25/hr):</span>
                <span className="font-bold text-slate-900 dark:text-white">$62.50</span>
              </div>
              <div className="flex justify-between">
                <span>Plant Overhead & Power Usage:</span>
                <span className="font-bold text-slate-900 dark:text-white">$45.00</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-sm font-extrabold text-indigo-600">
                <span>Total Unit Cost:</span>
                <span>$425.00 / Unit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Material Wastage & Efficiency Reports */}
      {activeTab === 'reports' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Monthly Production Yield vs Scrap Wastage (Units)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTION_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF' }} />
                <Bar dataKey="actual" fill="#10B981" radius={[8, 8, 0, 0]} name="Good Finished Goods" />
                <Bar dataKey="wastage" fill="#EF4444" radius={[8, 8, 0, 0]} name="Material Scrap Wastage" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* BOM Detail Drawer */}
      <Drawer
        isOpen={isBomDrawerOpen}
        onClose={() => setIsBomDrawerOpen(false)}
        title="BOM Recipe Breakdown"
      >
        {selectedBom && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-400">{selectedBom.id}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedBom.finishedProduct}</h3>
              <span className="text-xs text-indigo-600 font-semibold">{selectedBom.productSku}</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw Material Consumption</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {selectedBom.materials.map((m, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{m.name}</span>
                      <span className="text-slate-400">{m.qty} {m.unit} @ ${m.unitCost} / unit ({m.wastagePct}% wastage)</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">${(m.qty * m.unitCost).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Calculated Unit Cost</span>
              <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{selectedBom.unitCost}</span>
            </div>
          </div>
        )}
      </Drawer>

      {/* Create New BOM Modal */}
      <Modal
        isOpen={isBomModalOpen}
        onClose={() => setIsBomModalOpen(false)}
        title="BOM Recipe Builder"
      >
        <form onSubmit={handleCreateBom} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Finished Product Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Smart RFID Handheld Terminal"
              value={newBom.finishedProduct}
              onChange={(e) => setNewBom({ ...newBom, finishedProduct: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assembly Labor Hours</label>
              <input
                type="number"
                step="0.5"
                value={newBom.laborHours}
                onChange={(e) => setNewBom({ ...newBom, laborHours: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Overhead Cost ($)</label>
              <input
                type="number"
                value={newBom.overheadCost}
                onChange={(e) => setNewBom({ ...newBom, overheadCost: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsBomModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              Save BOM Recipe
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManufacturingView;
