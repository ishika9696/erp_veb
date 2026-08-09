import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ExternalLink,
  Calendar,
  User,
  Boxes,
  Cpu
} from 'lucide-react';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';

const QcDetailModal = ({ qcTest, onClose, onOpenWorkOrder }) => {
  const { addToast } = useApp();
  const [copiedId, setCopiedId] = useState(false);

  if (!qcTest) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(qcTest.id);
    setCopiedId(true);
    addToast(`Copied ${qcTest.id} to clipboard`, 'success', 'QC ID Copied');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrintCert = () => {
    addToast(`Exported Certificate of Quality Compliance for ${qcTest.id}`, 'success', 'Certificate Exported');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 flex flex-col scrollbar-thin">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md font-mono">
                  {qcTest.id}
                </span>
                <button
                  onClick={handleCopyId}
                  title="Copy QC Test ID"
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors cursor-pointer"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-mono text-slate-500">{qcTest.batchNo}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  qcTest.result === 'Passed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  qcTest.result === 'In Testing' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {qcTest.result}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                Quality Inspection Report: {qcTest.product}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCert}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export Certificate"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Certificate PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Work Order Ref</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{qcTest.woId}</span>
                {onOpenWorkOrder && (
                  <button
                    onClick={() => onOpenWorkOrder(qcTest.woId)}
                    className="p-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                    title="View Work Order"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Lead Inspector</span>
              <span className="font-bold text-slate-900 dark:text-white">{qcTest.inspector}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Sample Size</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{qcTest.sampleQty || 5} Random Units</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Inspection Date</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{qcTest.testDate}</span>
            </div>
          </div>

          {/* Test Criteria & Notes */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Gate Inspection Criteria
            </h4>
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
              {qcTest.criteria}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Inspector Observations & Defect Notes:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50/60 dark:bg-slate-900/60 p-3 rounded-xl">
                "{qcTest.notes}"
              </p>
            </div>
          </div>

          {/* Measured Parameters Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Measured QC Gate Parameters
            </h4>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Test Parameter</th>
                    <th className="p-3">Engineering Spec</th>
                    <th className="p-3">Measured Reading</th>
                    <th className="p-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Operating Voltage & Current Draw</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">12V DC ± 5% (&lt; 2.5A)</td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">12.04V (1.82A)</td>
                    <td className="p-3 text-right"><span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">Passed</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Thermal Surface Dissipation (Burn-in)</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">&lt; 45.0°C under full load</td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">38.4°C peak</td>
                    <td className="p-3 text-right"><span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">Passed</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Interface Latency & Signal Response</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">&lt; 20ms response time</td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">14.2ms avg</td>
                    <td className="p-3 text-right"><span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">Passed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileCheck className="h-4 w-4 text-emerald-500" />
            <span>Digital QA Stamp: <strong>VERIFIED ISO-9001-QA-2026</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default QcDetailModal;
