import React from 'react';
import { useApp } from '../../../context/AppContext';
import Badge from '../../ui/Badge';
import {
  X,
  Copy,
  Download,
  CornerDownRight,
  Truck,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';

const PurchaseOrderDetailModal = () => {
  const {
    activePoView,
    setActivePoView,
    convertPoToPurchaseBill,
    addToast
  } = useApp();

  const [copied, setCopied] = React.useState(false);

  if (!activePoView) return null;

  const po = activePoView;

  const handleCopyId = () => {
    if (!po.id) return;
    navigator.clipboard.writeText(po.id);
    setCopied(true);
    addToast(`Copied ${po.id} to clipboard`, 'success', 'PO ID Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Received':
      case 'Passed':
      case 'Active':
      case 'Optimal':
        return 'success';
      case 'Partially Received':
      case 'Sent':
      case 'Pending':
      case 'In Testing':
        return 'warning';
      case 'Draft':
        return 'neutral';
      case 'Cancelled':
      case 'Failed':
      case 'Overdue':
        return 'danger';
      default:
        return 'info';
    }
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === '') return '$0.00';
    if (typeof val === 'number') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    const str = val.toString().trim();
    const num = Number(str.replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) return '$0.00';
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const items = po.items && po.items.length > 0 ? po.items : [
    {
      desc: po.item || 'Procurement Line Item',
      qty: po.qty || 1,
      unitCost: po.unitCost || 0,
      amount: po.numericTotal || po.total || 0
    }
  ];

  const totalAmountFormatted = formatCurrency(po.numericTotal || po.total);
  const canConvertToBill = (po.status === 'Received' || po.status === 'Partially Received') && !po.convertedBillId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setActivePoView(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col animate-in zoom-in-95">
        
        {/* Sticky Action Header with Prominent PO # & Copy Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Official Purchase Order
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-heading font-mono tracking-tight">
                  {po.id}
                </h2>
                
                {/* Copy PO ID Button */}
                <button
                  onClick={handleCopyId}
                  title="Copy PO ID to clipboard"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors text-[11px] font-semibold cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span className="hidden sm:inline text-[10px]">Copy ID</span>
                    </>
                  )}
                </button>

                <Badge variant={getBadgeVariant(po.status)}>{po.status}</Badge>

                {po.convertedBillId && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Bill: {po.convertedBillId}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast(`Exported ${po.id} Purchase Order PDF document`, 'success', 'PDF Generated')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span> PDF
            </button>

            {canConvertToBill && (
              <button
                onClick={() => {
                  convertPoToPurchaseBill(po);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <CornerDownRight className="h-3.5 w-3.5" />
                <span>Convert to Bill</span>
              </button>
            )}

            <button
              onClick={() => setActivePoView(null)}
              aria-label="Close modal"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PO Content Paper */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-800 dark:text-slate-200">
          
          {/* Company & PO Top Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 items-center px-2.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-heading font-extrabold text-xs shadow-xs">
                  VEB
                </div>
                <span className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  Acme Industrial & Manufacturing Corp
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Plant 1 Facility, Sector 4 Industrial Zone</p>
              <p className="text-[11px] text-slate-500">procurement@veberp.com • +1 (800) 555-0199</p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 block font-heading uppercase">
                Purchase Order Document
              </span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white block">
                {po.id}
              </span>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Order Date: <strong className="text-slate-700 dark:text-slate-300">{po.orderDate || '2026-08-01'}</strong></div>
                <div>Expected Delivery: <strong className="text-slate-700 dark:text-slate-300">{po.expectedDate || '2026-08-15'}</strong></div>
                <div>PO Type: <strong className="text-slate-700 dark:text-slate-300">{po.type || 'Raw Material'}</strong></div>
              </div>
            </div>
          </div>

          {/* Supplier & Delivery Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                <span>Supplier / Vendor Details</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                {po.supplier}
              </p>
              <p className="text-[11px] text-slate-500">Authorized Master Vendor Agreement</p>
              <p className="text-[11px] text-slate-500">Payment Terms: <span className="font-semibold text-slate-700 dark:text-slate-300">{po.terms || 'Net 30 Days from delivery sign-off'}</span></p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                <span>Shipping & Receiving Dock</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                {po.shippingAddress || 'Plant 1 Receiving Dock, Sector 4, Acme Facility'}
              </p>
              <p className="text-[11px] text-slate-500">Billing Entity: <span className="font-semibold text-slate-700 dark:text-slate-300">{po.billingAddress || 'Acme HQ, Accounts Payable'}</span></p>
              <p className="text-[11px] text-slate-500">Auto-Reorder Policy: <span className="font-semibold text-emerald-600">{po.autoReorder ? 'Enabled (Threshold Trigger)' : 'Manual Dispatch'}</span></p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3">#</th>
                  <th className="p-3">Component / Item Description</th>
                  <th className="p-3 text-right">Quantity</th>
                  <th className="p-3 text-right">Unit Cost</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {items.map((item, idx) => {
                  const unitCostVal = typeof item.unitCost === 'number' ? item.unitCost : Number(item.unitCost?.toString().replace(/[^0-9.-]+/g, '')) || 0;
                  const itemAmount = typeof item.amount === 'number' ? item.amount : Number(item.amount?.toString().replace(/[^0-9.-]+/g, '')) || (unitCostVal * Number(item.qty || 1));

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                      <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {item.desc || item.name || po.item}
                      </td>
                      <td className="p-3 text-right text-slate-900 dark:text-white font-bold">
                        {item.qty} Pcs
                      </td>
                      <td className="p-3 text-right text-slate-600 dark:text-slate-400 font-mono">
                        {formatCurrency(unitCostVal)}
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900 dark:text-white font-mono">
                        {formatCurrency(itemAmount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals & Notes Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
            <div className="flex-1 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">Special Instructions & Notes</span>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                {po.notes || "Inspect shipment for tamper-evident seals before dock sign-off. Notify receiving manager upon delivery."}
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-xs">
                <span>Subtotal:</span>
                <span className="font-mono font-medium">{totalAmountFormatted}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-xs">
                <span>Freight & Taxes:</span>
                <span className="font-mono font-medium">$0.00 (Included)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Total PO Commitment:</span>
                <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Trail Logs */}
          {po.auditTrail && po.auditTrail.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5 text-indigo-500" />
                <span>PO Lifecycle & Audit Trail</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {po.auditTrail.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-[11px]"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {log.step} <span className="font-normal text-slate-500">({log.by})</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] text-slate-500">
            Immutable PO ID: <strong className="font-mono text-indigo-600 dark:text-indigo-400">{po.id}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePoView(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetailModal;
