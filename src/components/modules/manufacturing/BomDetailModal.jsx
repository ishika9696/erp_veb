import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  Pencil,
  CopyPlus,
  Layers,
  DollarSign,
  Clock,
  Cpu,
  AlertTriangle,
  FileText,
  Boxes,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Percent,
  History
} from 'lucide-react';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';

const BomDetailModal = ({ bom, onClose, onEdit, onDuplicate, onOpenWorkOrder }) => {
  const { addToast } = useApp();
  const [copiedId, setCopiedId] = useState(false);

  if (!bom) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(bom.id);
    setCopiedId(true);
    addToast(`Copied ${bom.id} to clipboard`, 'success', 'BOM ID Copied');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    addToast(`Exported BOM Specification sheet for ${bom.id} as PDF`, 'success', 'PDF Exported');
  };

  // Calculations
  const materialsCost = bom.materialsCost || (bom.materials || []).reduce((acc, m) => acc + (Number(m.subtotal) || (Number(m.qty || 1) * Number(m.unitCost || 0))), 0);
  const directLaborCost = bom.directLaborCost || ((Number(bom.laborHours || 0)) * (Number(bom.laborRatePerHour || 25)));
  const overheadCost = bom.overheadCost || 0;
  const totalUnitCost = bom.numericUnitCost || (materialsCost + directLaborCost + overheadCost);
  const targetMsrp = bom.targetMsrp || (totalUnitCost * 1.95);
  const grossProfit = targetMsrp - totalUnitCost;
  const grossMarginPct = bom.marginPct || `${((grossProfit / targetMsrp) * 100).toFixed(1)}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 flex flex-col scrollbar-thin">
        
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md font-mono">
                  {bom.id}
                </span>
                <button
                  onClick={handleCopyId}
                  title="Copy BOM ID"
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-semibold text-slate-500">{bom.category}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                  {bom.status || 'Active (Approved)'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Rev {bom.version || 'v2.4'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                {bom.finishedProduct} <span className="text-xs text-slate-400 font-mono font-normal">({bom.productSku})</span>
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Specification Sheet"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {onDuplicate && (
              <button
                onClick={() => onDuplicate(bom)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Duplicate this BOM Recipe"
              >
                <CopyPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Duplicate</span>
              </button>
            )}

            {onEdit && (
              <button
                onClick={() => onEdit(bom)}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                title="Edit BOM Recipe"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit BOM</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {bom.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              {bom.description}
            </p>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Total Unit Production Cost
              </span>
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                ${totalUnitCost.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Per 1 finished unit</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Raw Materials Share
              </span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                ${materialsCost.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {((materialsCost / totalUnitCost) * 100).toFixed(0)}% of total cost
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Labor & Overhead
              </span>
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                ${(directLaborCost + overheadCost).toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {bom.laborHours}h Labor • ${overheadCost.toFixed(0)} Machine
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Target MSRP & Margin
              </span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
                ${targetMsrp.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                {grossMarginPct} Gross Margin
              </span>
            </div>
          </div>

          {/* Section 1: Complete Raw Materials Specification */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Boxes className="h-4 w-4 text-indigo-500" /> Complete Raw Materials Recipe (Per Finished Unit)
                </h3>
                <p className="text-[11px] text-slate-400">All required components, unit costs, wastage buffers, and active inventory availability.</p>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bom.materials?.length || 0} Components Required
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-3.5">Component / Material</th>
                      <th className="p-3.5 text-center">Required Qty</th>
                      <th className="p-3.5 text-right">Unit Cost</th>
                      <th className="p-3.5 text-center">Wastage %</th>
                      <th className="p-3.5 text-right">Line Subtotal</th>
                      <th className="p-3.5 text-right">Inventory Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {(bom.materials || []).map((mat, idx) => {
                      const lineTotal = mat.subtotal || (Number(mat.qty || 1) * Number(mat.unitCost || 0));
                      return (
                        <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 dark:text-white">{mat.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {mat.sku || `SKU-RM-10${idx + 1}`} {mat.supplier ? `• ${mat.supplier}` : ''}
                            </div>
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap font-bold text-slate-900 dark:text-white">
                            {mat.qty} {mat.unit || 'Pcs'}
                          </td>
                          <td className="p-3.5 text-right font-mono text-slate-600 dark:text-slate-400">
                            ${Number(mat.unitCost || 0).toFixed(2)}
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                              {mat.wastagePct !== undefined ? `${mat.wastagePct}%` : '1.5%'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            ${lineTotal.toFixed(2)}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (mat.stockStatus || '').includes('Low')
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}>
                              {mat.stockStatus || 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 font-bold text-xs">
                      <td colSpan={4} className="p-3.5 text-right text-slate-600 dark:text-slate-400">
                        Total Raw Materials Component Cost:
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-900 dark:text-white text-sm">
                        ${materialsCost.toFixed(2)}
                      </td>
                      <td className="p-3.5"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2: Cost Breakdown & Production Economics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-500" /> Unit Production Cost Structure
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Raw Materials Sum</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">${materialsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Direct Labor ({bom.laborHours}h @ ${bom.laborRatePerHour || 25}/h)</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">${directLaborCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Factory Overhead & Machine Allocation</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">${overheadCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Total Unit Cost (COGS)</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">${totalUnitCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-indigo-500" /> Profitability & Commercial Yield
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Target Selling Price (MSRP)</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">${targetMsrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Scrap Allowance</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">{bom.avgWastagePct || 1.8}%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Gross Margin Per Unit</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+${grossProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Gross Profit Margin</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{grossMarginPct}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Linked Work Orders */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-indigo-500" /> Active & Linked Production Work Orders
            </h3>
            {bom.linkedWorkOrders && bom.linkedWorkOrders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bom.linkedWorkOrders.map((wo, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">{wo.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          wo.stage === 'Completed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          wo.stage === 'In Production' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {wo.stage}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        Batch: <strong>{wo.qty} Units</strong> • {wo.assignedTo} • Due {wo.dueDate}
                      </span>
                    </div>
                    {onOpenWorkOrder && (
                      <button
                        onClick={() => onOpenWorkOrder(wo.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors cursor-pointer"
                        title="View Work Order"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-500">
                No active work orders currently scheduled for this BOM recipe.
              </div>
            )}
          </div>

          {/* Section 4: Version History & Engineering Change Order (ECO) Log */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <History className="h-4 w-4 text-amber-500" /> Version Revisions & Engineering Change History
            </h3>
            <div className="space-y-2">
              {(bom.versionHistory || [
                { version: bom.version || 'v2.4', date: '2026-08-01', author: 'Marcus Vance', notes: 'Active baseline configuration approved for production.' }
              ]).map((v, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 flex items-start justify-between text-xs gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800">
                        {v.version}
                      </span>
                      <span className="text-[11px] text-slate-500">{v.author} • {v.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{v.notes}</p>
                  </div>
                  {idx === 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md shrink-0">
                      Active Version
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="text-xs text-slate-500">
            Approved by <strong>QA & Manufacturing Directorate</strong> • ISO 9001:2015 Compliant
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default BomDetailModal;
