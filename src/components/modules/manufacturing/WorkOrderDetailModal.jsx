import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  Pencil,
  Cpu,
  Layers,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Boxes,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  User,
  Calendar,
  Warehouse,
  History,
  Barcode
} from 'lucide-react';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';

const WorkOrderDetailModal = ({ workOrder, onClose, onEdit, onOpenBom, onOpenQc }) => {
  const { addToast } = useApp();
  const [copiedId, setCopiedId] = useState(false);

  if (!workOrder) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(workOrder.id);
    setCopiedId(true);
    addToast(`Copied ${workOrder.id} to clipboard`, 'success', 'Work Order ID Copied');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrintTraveler = () => {
    addToast(`Generated Shopfloor Production Traveler Ticket for ${workOrder.id}`, 'success', 'Traveler Printed');
  };

  const progress = workOrder.progress !== undefined ? workOrder.progress : (workOrder.stage === 'Completed' ? 100 : (workOrder.stage === 'Quality Check' ? 90 : (workOrder.stage === 'In Production' ? 65 : 0)));
  const completedUnits = workOrder.completedQty !== undefined ? workOrder.completedQty : Math.round((progress / 100) * workOrder.qty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 flex flex-col scrollbar-thin">
        
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md font-mono">
                  {workOrder.id}
                </span>
                <button
                  onClick={handleCopyId}
                  title="Copy Work Order ID"
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  workOrder.stage === 'Completed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/50' :
                  workOrder.stage === 'Quality Check' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/50' :
                  workOrder.stage === 'In Production' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/50' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {workOrder.stage}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  workOrder.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200' :
                  workOrder.priority === 'High' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {workOrder.priority} Priority
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                {workOrder.product} <span className="text-xs text-slate-400 font-mono font-normal">({workOrder.qty} Units Batch)</span>
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintTraveler}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Shopfloor Traveler"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Traveler</span>
            </button>

            {onEdit && (
              <button
                onClick={() => onEdit(workOrder)}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                title="Edit Work Order"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit WO</span>
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
          {/* Progress Banner */}
          <div className="p-4 rounded-2xl border border-indigo-200/60 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Production Progress: {completedUnits} of {workOrder.qty} Units Completed
              </span>
              <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Linked BOM Recipe
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  {workOrder.bomId || 'BOM-001'}
                </span>
                {onOpenBom && (
                  <button
                    onClick={() => onOpenBom(workOrder.bomId || 'BOM-001')}
                    className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors cursor-pointer"
                    title="View BOM Details"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Base Recipe Approved</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Target Batch Output
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {workOrder.qty} Units
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {workOrder.orderNo ? `Demand Ref: ${workOrder.orderNo}` : 'Direct Stock Build'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Assigned Line / Cell
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                {workOrder.assignedTo}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
                {workOrder.workCenter || 'Assembly Bay 4'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Target Due Date
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {workOrder.dueDate}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Started {workOrder.startDate || 'Aug 04, 2026'}
              </span>
            </div>
          </div>

          {/* Section 1: Planned vs Actual Material Consumption */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Boxes className="h-4 w-4 text-indigo-500" /> Material Consumption (Planned vs Actual Issued)
                </h3>
                <p className="text-[11px] text-slate-400">Inventory reconciliation, scrap variance, and bill of materials yield tracking.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-3.5">Raw Material Component</th>
                      <th className="p-3.5 text-center">Planned Qty</th>
                      <th className="p-3.5 text-center">Actual Issued</th>
                      <th className="p-3.5 text-center">Variance %</th>
                      <th className="p-3.5 text-center">Scrap Units</th>
                      <th className="p-3.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {(workOrder.materialConsumption || [
                      { item: '15.6 Inch IPS Touch Display Panel', planned: workOrder.qty, actual: completedUnits, variance: '0.0%', scrapQty: 0, status: 'Optimal' },
                      { item: 'Aluminium CNC Terminal Casing', planned: workOrder.qty, actual: completedUnits + (workOrder.scrapQty || 0), variance: workOrder.scrapQty ? '+4.0%' : '0.0%', scrapQty: workOrder.scrapQty || 0, status: workOrder.scrapQty ? 'Minor Scrap' : 'Optimal' },
                      { item: 'ARM Octa-Core Industrial Motherboard', planned: workOrder.qty, actual: completedUnits, variance: '0.0%', scrapQty: 0, status: 'Optimal' }
                    ]).map((mat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {mat.item}
                        </td>
                        <td className="p-3.5 text-center font-mono text-slate-700 dark:text-slate-300">
                          {mat.planned} Pcs
                        </td>
                        <td className="p-3.5 text-center font-mono font-bold text-slate-900 dark:text-white">
                          {mat.actual} Pcs
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`font-mono font-bold text-[11px] ${
                            (mat.variance || '').startsWith('+') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {mat.variance || '0.0%'}
                          </span>
                        </td>
                        <td className="p-3.5 text-center font-mono text-slate-500">
                          {mat.scrapQty ? `${mat.scrapQty} Pcs` : '—'}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            mat.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                            mat.status === 'Minor Scrap' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                            mat.status === 'High Scrap' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {mat.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2: Quality Control Inspection Results */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Quality Control (QC) Gate & Inspection Log
            </h3>
            {workOrder.qcResults ? (
              <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      {workOrder.qcResults.testId}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {workOrder.qcResults.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Tested by {workOrder.qcResults.inspector} on {workOrder.qcResults.testDate}
                    </span>
                  </div>
                  {onOpenQc && (
                    <button
                      onClick={() => onOpenQc(workOrder.qcResults.testId)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      View QC Report <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Criteria</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{workOrder.qcResults.criteria}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Pass Rate / Sample Size</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{workOrder.qcResults.passRate} ({workOrder.qcResults.sampleSize} Pcs)</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Defect Count</span>
                    <span className="font-bold text-slate-900 dark:text-white">{workOrder.qcResults.defectCount} Defective Units</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                  "{workOrder.qcResults.notes}"
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                QC gate will be triggered upon assembly completion. Random sample inspection pending.
              </div>
            )}
          </div>

          {/* Section 3: Chronological Production Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <History className="h-4 w-4 text-amber-500" /> Production Execution Timeline & Station Hand-offs
            </h3>
            <div className="space-y-2">
              {(workOrder.timeline || [
                { step: 'Work Order Created from Customer Requisition', by: 'Production Planning', time: 'Aug 04, 08:30 AM' },
                { step: 'Raw Materials Issued & Checked by Warehouse', by: 'Marcus Vance', time: 'Aug 04, 09:15 AM' },
                { step: 'Assembly In Progress on SMT Line', by: workOrder.assignedTo, time: 'Aug 04, 11:30 AM' }
              ]).map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{t.step}</span>
                    <span className="text-[11px] text-slate-500">Actioned by <strong>{t.by}</strong></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Barcode className="h-4 w-4 text-slate-400" />
            <span>Traveler Barcode: <strong className="font-mono text-slate-700 dark:text-slate-300">TRV-{workOrder.id}-2026</strong></span>
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

export default WorkOrderDetailModal;
