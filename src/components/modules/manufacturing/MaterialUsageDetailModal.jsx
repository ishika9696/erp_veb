import React from 'react';
import {
  X,
  FileText,
  Boxes,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Printer,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const MaterialUsageDetailModal = ({ report, onClose, onOpenWorkOrder }) => {
  const { addToast } = useApp();

  if (!report) return null;

  const handlePrint = () => {
    addToast(`Exported Scrap & Material Variance audit sheet for ${report.woId}`, 'success', 'Audit Exported');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 flex flex-col scrollbar-thin">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 shadow-2xs">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md font-mono">
                  Variance Audit
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{report.woId}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  report.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  report.status === 'Minor Scrap' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {report.status}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                {report.item}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Planned Qty</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{report.plannedQty} Pcs</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Actual Issued</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{report.actualQty} Pcs</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Variance %</span>
              <span className={`font-bold font-mono text-sm ${
                (report.variance || '').startsWith('+') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>{report.variance}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Scrap Cost</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 font-mono text-sm">{report.scrapCost}</span>
            </div>
          </div>

          {/* Root Cause Analysis & Corrective Actions */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3 text-xs">
            <h4 className="font-bold uppercase text-slate-500 tracking-wider">
              Root Cause & Engineering Notes
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
              {report.variance === '0.0%'
                ? 'Zero scrap generated during this work order. Component tolerances and tooling alignment operated at 100% efficiency.'
                : `Material variance occurred during CNC casing beveling and high-temperature mounting. ${report.scrapQty || 1} unit rejected during pre-assembly dimensional check.`}
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 block">Recommended Corrective Action:</span>
              <span className="text-slate-600 dark:text-slate-400">Calibrate CNC feed rate and check tool wear after every 150 cycles. Stored in Scrap Bin Bay C for material recovery.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          {onOpenWorkOrder && (
            <button
              onClick={() => onOpenWorkOrder(report.woId)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Open Work Order {report.woId} <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer ml-auto"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialUsageDetailModal;
