import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import StatCard from '../../ui/StatCard';
import Badge from '../../ui/Badge';
import {
  FINANCE_ESTIMATES,
  INITIAL_INVOICES,
  FINANCE_PAYMENTS,
  FINANCE_CREDIT_NOTES,
  FINANCE_PURCHASE_BILLS,
  FINANCE_EXPENSES,
  BANK_ACCOUNTS,
  BANK_RECONCILIATION,
  FINANCIAL_OVERVIEW_DATA
} from '../../../data/mockData';
import {
  Receipt,
  Plus,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  RefreshCw,
  Eye,
  Download,
  Send,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Filter,
  Search,
  ChevronRight,
  Printer,
  ShieldCheck,
  CornerDownRight,
  Calendar,
  Layers,
  Percent,
  CheckSquare
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AccountingView = () => {
  const { addToast } = useApp();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('invoices');

  // Master Data States
  const [estimates, setEstimates] = useState(FINANCE_ESTIMATES);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [payments, setPayments] = useState(FINANCE_PAYMENTS);
  const [creditNotes, setCreditNotes] = useState(FINANCE_CREDIT_NOTES);
  const [bills, setBills] = useState(FINANCE_PURCHASE_BILLS);
  const [expenses, setExpenses] = useState(FINANCE_EXPENSES);
  const [bankReconciles, setBankReconciles] = useState(BANK_RECONCILIATION);

  // Filters & Selection States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]);

  // Active Document View Modal
  const [activeDocView, setActiveDocView] = useState(null); // { type: 'invoice'|'estimate'|'creditnote', data: obj }

  // Modals & Drawers
  const [showCreateEstimateModal, setShowCreateEstimateModal] = useState(false);
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(null); // invoice obj
  const [showConvertToCreditNoteModal, setShowConvertToCreditNoteModal] = useState(null); // invoice obj
  const [showApplyCreditModal, setShowApplyCreditModal] = useState(null); // credit note obj
  const [showPaymentAuditModal, setShowPaymentAuditModal] = useState(null); // payment obj

  // Form States
  const [newEstimate, setNewEstimate] = useState({ client: 'Stark Industries', project: 'Global Supply Chain Module', validUntil: '2026-08-30', desc: 'AI Telematics Integration', qty: 1, rate: 45000, tax: 10, terms: 'Valid for 30 days.' });
  const [newInvoice, setNewInvoice] = useState({ client: 'CyberDyne Systems', project: 'Cloud Scale Migration', dueDate: '2026-08-20', desc: 'Server Migration Milestone 2', qty: 1, rate: 35000, tax: 0, discount: 0, terms: 'Payment due in 15 days.' });
  const [paymentForm, setPaymentForm] = useState({ amount: '', method: 'Bank Wire Transfer', txnId: 'TXN-773019284', date: '2026-08-04' });
  const [creditNoteForm, setCreditNoteForm] = useState({ amount: '', reason: 'Refund for Line Item Adjustment' });
  const [applyCreditForm, setApplyCreditForm] = useState({ targetInvoiceId: 'INV-2026-091', redeemAmount: '' });

  // Sub-Navigation Tabs
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'estimates', label: 'Estimates', icon: FileText },
    { id: 'creditnotes', label: 'Credit Notes', icon: CreditCard },
    { id: 'purchase', label: 'Purchase Bills', icon: Layers },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'bank_recon', label: 'Bank Recon', icon: Building2 }
  ];

  // Helper for Status Badge Color Mapping
  const getBadgeVariant = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('paid') || s.includes('accepted') || s.includes('completed') || s.includes('fully redeemed') || s.includes('reconciled')) return 'emerald';
    if (s.includes('sent') || s.includes('unused') || s.includes('active')) return 'indigo';
    if (s.includes('partially') || s.includes('pending') || s.includes('draft') || s.includes('expired')) return 'amber';
    if (s.includes('overdue') || s.includes('declined') || s.includes('unpaid') || s.includes('unmatched')) return 'rose';
    return 'slate';
  };

  // Convert Estimate -> Invoice
  const handleConvertEstimateToInvoice = (est) => {
    const newInv = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: est.client,
      project: est.project,
      date: new Date().toISOString().split('T')[0],
      dueDate: "2026-08-25",
      amount: est.amount,
      numericAmount: est.numericAmount,
      amountDue: est.amount,
      numericAmountDue: est.numericAmount,
      status: "Draft",
      estimateRef: est.id,
      items: est.items || [{ desc: "Converted from Estimate " + est.id, qty: 1, rate: est.numericAmount, tax: 0, amount: est.numericAmount }]
    };
    setInvoices([newInv, ...invoices]);
    setEstimates(prev => prev.map(e => e.id === est.id ? { ...e, status: 'Accepted' } : e));
    if (activeDocView) setActiveDocView(null);
    addToast(`Converted Estimate ${est.id} to Invoice ${newInv.id}`, "success");
  };

  // Record Payment Handler
  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!showRecordPaymentModal) return;
    const inv = showRecordPaymentModal;
    const paidVal = Number(paymentForm.amount) || inv.numericAmountDue || inv.numericAmount;
    const newAmountDueVal = Math.max(0, inv.numericAmountDue - paidVal);
    const newStatus = newAmountDueVal === 0 ? "Paid" : "Partially Paid";

    // Update Invoice
    setInvoices(prev => prev.map(item => item.id === inv.id ? {
      ...item,
      amountDue: `$${newAmountDueVal.toLocaleString()}.00`,
      numericAmountDue: newAmountDueVal,
      status: newStatus
    } : item));

    // Create Payment Log
    const newPay = {
      id: `PAY-${900 + payments.length + 1}`,
      client: inv.client,
      invoiceId: inv.id,
      date: paymentForm.date,
      method: paymentForm.method,
      txnId: paymentForm.txnId || `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      amount: `$${paidVal.toLocaleString()}.00`,
      numericAmount: paidVal,
      status: "Completed",
      auditTrail: [
        { step: "Invoice Issued", by: "System Billing", time: inv.date },
        { step: "Payment Recorded", by: "David Chen (Finance)", time: `${paymentForm.date} 10:00 AM` },
        { step: "Invoice Status Updated", by: "Automated Workflow", time: `${paymentForm.date} 10:01 AM` }
      ]
    };
    setPayments([newPay, ...payments]);
    setShowRecordPaymentModal(null);
    addToast(`Recorded payment of $${paidVal.toLocaleString()} for Invoice ${inv.id}`, "success");
  };

  // Convert Invoice -> Credit Note Handler
  const handleConvertToCreditNote = (e) => {
    e.preventDefault();
    if (!showConvertToCreditNoteModal) return;
    const inv = showConvertToCreditNoteModal;
    const credVal = Number(creditNoteForm.amount) || inv.numericAmount;

    const newCN = {
      id: `CN-2026-0${creditNotes.length + 1}`,
      client: inv.client,
      originalInvoice: inv.id,
      issueDate: new Date().toISOString().split('T')[0],
      creditAmount: `$${credVal.toLocaleString()}.00`,
      numericCreditAmount: credVal,
      remainingBalance: `$${credVal.toLocaleString()}.00`,
      numericRemainingBalance: credVal,
      status: "Unused",
      reason: creditNoteForm.reason || "Invoice Refund Adjustment"
    };

    setCreditNotes([newCN, ...creditNotes]);
    setShowConvertToCreditNoteModal(null);
    addToast(`Issued Credit Note ${newCN.id} ($${credVal.toLocaleString()}) for Invoice ${inv.id}`, "success");
  };

  // Apply Credit Note to Invoice
  const handleApplyCreditNote = (e) => {
    e.preventDefault();
    if (!showApplyCreditModal) return;
    const cn = showApplyCreditModal;
    const redeemVal = Number(applyCreditForm.redeemAmount) || cn.numericRemainingBalance;
    const targetInvId = applyCreditForm.targetInvoiceId;

    const newRemBalance = Math.max(0, cn.numericRemainingBalance - redeemVal);
    const newCnStatus = newRemBalance === 0 ? "Fully Redeemed" : "Partially Redeemed";

    // Update Credit Note
    setCreditNotes(prev => prev.map(c => c.id === cn.id ? {
      ...c,
      remainingBalance: `$${newRemBalance.toLocaleString()}.00`,
      numericRemainingBalance: newRemBalance,
      status: newCnStatus
    } : c));

    // Update Target Invoice Amount Due
    setInvoices(prev => prev.map(inv => {
      if (inv.id === targetInvId) {
        const updatedDue = Math.max(0, inv.numericAmountDue - redeemVal);
        return {
          ...inv,
          amountDue: `$${updatedDue.toLocaleString()}.00`,
          numericAmountDue: updatedDue,
          status: updatedDue === 0 ? "Paid" : "Partially Paid"
        };
      }
      return inv;
    }));

    setShowApplyCreditModal(null);
    addToast(`Applied $${redeemVal.toLocaleString()} credit from ${cn.id} to Invoice ${targetInvId}`, "success");
  };

  // Create Estimate Form Submit
  const handleCreateEstimateSubmit = (e) => {
    e.preventDefault();
    const rateVal = Number(newEstimate.rate) || 1000;
    const totalVal = rateVal * (Number(newEstimate.qty) || 1);
    const item = {
      id: `EST-2026-0${estimates.length + 1}`,
      client: newEstimate.client,
      project: newEstimate.project,
      date: new Date().toISOString().split('T')[0],
      validUntil: newEstimate.validUntil,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      status: "Sent",
      terms: newEstimate.terms,
      items: [{ desc: newEstimate.desc, qty: Number(newEstimate.qty), rate: rateVal, tax: Number(newEstimate.tax), amount: totalVal }]
    };
    setEstimates([item, ...estimates]);
    setShowCreateEstimateModal(false);
    addToast(`Created and sent Estimate ${item.id} to ${item.client}`, "success");
  };

  // Create Invoice Form Submit
  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();
    const rateVal = Number(newInvoice.rate) || 1000;
    const totalVal = rateVal * (Number(newInvoice.qty) || 1);
    const item = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: newInvoice.client,
      project: newInvoice.project,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      amount: `$${totalVal.toLocaleString()}.00`,
      numericAmount: totalVal,
      amountDue: `$${totalVal.toLocaleString()}.00`,
      numericAmountDue: totalVal,
      status: "Sent",
      estimateRef: null,
      items: [{ desc: newInvoice.desc, qty: Number(newInvoice.qty), rate: rateVal, tax: Number(newInvoice.tax), amount: totalVal }]
    };
    setInvoices([item, ...invoices]);
    setShowCreateInvoiceModal(false);
    addToast(`Issued Invoice ${item.id} to ${item.client}`, "success");
  };

  // Bulk Payment Export
  const handleBulkPaymentExport = () => {
    addToast(`Exported ${selectedPaymentIds.length || payments.length} payments to CSV`, "info");
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Finance & Accounts Management
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Estimates, Client Invoicing, Payment logs, Credit Notes, Purchase Bills, and Bank Reconciliation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateInvoiceModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={() => setShowCreateEstimateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-indigo-500" />
            <span>New Estimate</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm('');
                setStatusFilter('All');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* SUB-SECTION 1: INVOICES (CORE) */}
      {/* ========================================================= */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Invoiced Value"
              value="$254,500.00"
              change="+18.4%"
              isPositive={true}
              period="vs last month"
              icon="DollarSign"
              color="indigo"
            />
            <StatCard
              title="Total Paid Receipts"
              value="$113,500.00"
              change="+24.2%"
              isPositive={true}
              period="collected"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Overdue Receivables"
              value="$28,000.00"
              change="-5.1%"
              isPositive={false}
              period="1 invoice overdue"
              icon="AlertTriangle"
              color="rose"
            />
            <StatCard
              title="Outstanding Balance"
              value="$118,500.00"
              change="Active"
              isPositive={true}
              period="pending collection"
              icon="TrendingUp"
              color="amber"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by invoice #, client name, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Sent">Sent</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client Account</th>
                    <th className="p-4">Project / Origin</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Amount Due</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {invoices
                    .filter(inv => {
                      const matchSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || (inv.project && inv.project.toLowerCase().includes(searchTerm.toLowerCase()));
                      const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{inv.id}</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{inv.client}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">
                          {inv.project || 'General Billing'}
                          {inv.estimateRef && <span className="block text-[10px] text-indigo-500 font-semibold">From {inv.estimateRef}</span>}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{inv.date}</td>
                        <td className="p-4 text-slate-500">{inv.dueDate}</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                        <td className="p-4 font-bold text-emerald-600">{inv.amountDue}</td>
                        <td className="p-4"><Badge variant={getBadgeVariant(inv.status)}>{inv.status}</Badge></td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setActiveDocView({ type: 'invoice', data: inv })}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                              title="View Document"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {inv.status !== 'Paid' && (
                              <button
                                onClick={() => {
                                  setShowRecordPaymentModal(inv);
                                  setPaymentForm({ ...paymentForm, amount: inv.numericAmountDue || inv.numericAmount });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                                title="Record Payment"
                              >
                                Pay
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setShowConvertToCreditNoteModal(inv);
                                setCreditNoteForm({ ...creditNoteForm, amount: inv.numericAmount });
                              }}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] cursor-pointer"
                              title="Convert to Credit Note"
                            >
                              Credit Note
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 2: PAYMENTS */}
      {/* ========================================================= */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Received Payments"
              value="$154,500.00"
              change="+22.8%"
              isPositive={true}
              period="settled"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Bank Transfer Share"
              value="68.5%"
              change="Direct Wire"
              isPositive={true}
              period="primary channel"
              icon="Building2"
              color="indigo"
            />
            <StatCard
              title="Card & Gateway Payments"
              value="$22,500.00"
              change="+14.2%"
              isPositive={true}
              period="Stripe auto-settled"
              icon="CreditCard"
              color="sky"
            />
            <StatCard
              title="Pending Settlement"
              value="$12,750.00"
              change="1 deposit"
              isPositive={false}
              period="clearing today"
              icon="Clock"
              color="amber"
            />
          </div>

          {/* Filter & Bulk Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center gap-3 flex-1 w-full max-w-md">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search payment ID, client, or txn #..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Payment Methods</option>
                <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                <option value="Credit Card (Stripe)">Credit Card</option>
                <option value="ACH Electronic Check">ACH Check</option>
                <option value="Direct Deposit">Direct Deposit</option>
              </select>

              <button
                onClick={handleBulkPaymentExport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        onChange={(e) => setSelectedPaymentIds(e.target.checked ? payments.map(p => p.id) : [])}
                        checked={selectedPaymentIds.length === payments.length && payments.length > 0}
                        className="rounded border-slate-300 text-indigo-600"
                      />
                    </th>
                    <th className="p-4">Payment ID</th>
                    <th className="p-4">Client Account</th>
                    <th className="p-4">Invoice Ref</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Txn / Ref ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Amount Paid</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Audit Trail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {payments
                    .filter(p => {
                      const matchSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()) || p.txnId.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchMethod = methodFilter === 'All' || p.method === methodFilter;
                      return matchSearch && matchMethod;
                    })
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedPaymentIds.includes(p.id)}
                            onChange={() => setSelectedPaymentIds(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : [...prev, p.id])}
                            className="rounded border-slate-300 text-indigo-600"
                          />
                        </td>
                        <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{p.id}</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{p.client}</td>
                        <td className="p-4 font-bold text-indigo-600">{p.invoiceId}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">{p.method}</td>
                        <td className="p-4 text-slate-500 font-mono text-[11px]">{p.txnId}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{p.date}</td>
                        <td className="p-4 font-bold text-emerald-600">{p.amount}</td>
                        <td className="p-4"><Badge variant={getBadgeVariant(p.status)}>{p.status}</Badge></td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setShowPaymentAuditModal(p)}
                            className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <ShieldCheck className="h-3.5 w-3.5" /> View Audit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 3: ESTIMATES */}
      {/* ========================================================= */}
      {activeTab === 'estimates' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Estimates Created"
              value="12 Proposals"
              change="Active"
              isPositive={true}
              period="this quarter"
              icon="FileText"
              color="indigo"
            />
            <StatCard
              title="Accepted Proposals Value"
              value="$115,000.00"
              change="+31.2%"
              isPositive={true}
              period="won proposals"
              icon="CheckCircle"
              color="emerald"
            />
            <StatCard
              title="Pending Sent Proposals"
              value="$48,500.00"
              change="1 proposal"
              isPositive={true}
              period="awaiting client review"
              icon="Clock"
              color="amber"
            />
            <StatCard
              title="Proposal Conversion Rate"
              value="78.5%"
              change="+4.2%"
              isPositive={true}
              period="accepted vs sent"
              icon="TrendingUp"
              color="sky"
            />
          </div>

          {/* Estimates Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Estimate #</th>
                    <th className="p-4">Client Account</th>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Created Date</th>
                    <th className="p-4">Valid Until</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {estimates.map((est) => (
                    <tr key={est.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{est.id}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{est.client}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{est.project}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{est.date}</td>
                      <td className="p-4 text-slate-500">{est.validUntil}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{est.amount}</td>
                      <td className="p-4"><Badge variant={getBadgeVariant(est.status)}>{est.status}</Badge></td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveDocView({ type: 'estimate', data: est })}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                            title="View Document Proposal"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleConvertEstimateToInvoice(est)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
                            title="Convert to Invoice"
                          >
                            <CornerDownRight className="h-3 w-3" /> Convert to Inv
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 4: CREDIT NOTES */}
      {/* ========================================================= */}
      {activeTab === 'creditnotes' && (
        <div className="space-y-6">
          {/* KPI Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Credit Notes Issued"
              value="$18,500.00"
              change="3 Notes"
              isPositive={true}
              period="total credits"
              icon="CreditCard"
              color="indigo"
            />
            <StatCard
              title="Available Unused Credit"
              value="$5,000.00"
              change="Ready"
              isPositive={true}
              period="to apply to future invoices"
              icon="CheckCircle"
              color="sky"
            />
            <StatCard
              title="Redeemed Credit"
              value="$13,500.00"
              change="Applied"
              isPositive={true}
              period="against client balances"
              icon="TrendingUp"
              color="emerald"
            />
            <StatCard
              title="Active Credit Count"
              value="3 Notes"
              change="Sync"
              isPositive={true}
              period="client accounts"
              icon="FileText"
              color="amber"
            />
          </div>

          {/* Credit Notes Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Credit Note #</th>
                    <th className="p-4">Client Account</th>
                    <th className="p-4">Original Invoice</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Credit Amount</th>
                    <th className="p-4">Remaining Balance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {creditNotes.map((cn) => (
                    <tr key={cn.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{cn.id}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{cn.client}</td>
                      <td className="p-4 font-bold text-indigo-600">{cn.originalInvoice}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{cn.issueDate}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{cn.creditAmount}</td>
                      <td className="p-4 font-bold text-emerald-600">{cn.remainingBalance}</td>
                      <td className="p-4"><Badge variant={getBadgeVariant(cn.status)}>{cn.status}</Badge></td>
                      <td className="p-4 text-right">
                        {cn.numericRemainingBalance > 0 ? (
                          <button
                            onClick={() => {
                              setShowApplyCreditModal(cn);
                              setApplyCreditForm({ targetInvoiceId: 'INV-2026-091', redeemAmount: cn.numericRemainingBalance });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Apply to Invoice
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Fully Redeemed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* OTHER TABS: PURCHASE BILLS, EXPENSES, BANK RECON, OVERVIEW */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-72">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-4">Financial Revenue & Profit Performance</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={FINANCIAL_OVERVIEW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'purchase' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Purchase Orders & Vendor Bills</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Bill No</th>
                  <th className="p-4">Vendor Name</th>
                  <th className="p-4">Bill Date</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">PO Ref</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {bills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{b.id}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{b.vendor}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{b.billDate}</td>
                    <td className="p-4 text-slate-500">{b.dueDate}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{b.amount}</td>
                    <td className="p-4 font-semibold text-indigo-600">{b.poRef}</td>
                    <td className="p-4"><Badge variant={getBadgeVariant(b.status)}>{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Operating Expenses & Recurring Bills</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Exp ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Recurring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{e.id}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{e.category}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{e.vendor}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{e.amount}</td>
                    <td className="p-4 text-slate-500">{e.date}</td>
                    <td className="p-4 text-slate-600 font-semibold">{e.recurring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bank_recon' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Bank Accounts & Statement Reconciliation</h2>
            <button
              onClick={() => addToast("Reconciled 3 statement lines automatically", "success")}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" /> Auto-Reconcile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BANK_ACCOUNTS.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600">{b.bankName}</span>
                  <span className="text-slate-500 font-mono">{b.accountNo}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{b.name}</h3>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">{b.balance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DOCUMENT PREVIEW MODAL (FULL PAGE LAYOUT) */}
      {/* ========================================================= */}
      {activeDocView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs" onClick={() => setActiveDocView(null)} />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col">
            {/* Sticky Action Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                  {activeDocView.type.toUpperCase()}: {activeDocView.data.id}
                </h3>
                <Badge variant={getBadgeVariant(activeDocView.data.status)}>{activeDocView.data.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToast("PDF Document generated & downloaded", "success")}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>

                {activeDocView.type === 'estimate' && (
                  <button
                    onClick={() => handleConvertEstimateToInvoice(activeDocView.data)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 cursor-pointer flex items-center gap-1"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" /> Convert to Invoice
                  </button>
                )}

                {activeDocView.type === 'invoice' && activeDocView.data.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      const inv = activeDocView.data;
                      setActiveDocView(null);
                      setShowRecordPaymentModal(inv);
                      setPaymentForm({ ...paymentForm, amount: inv.numericAmountDue || inv.numericAmount });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                  >
                    <DollarSign className="h-3.5 w-3.5" /> Record Payment
                  </button>
                )}

                <button onClick={() => setActiveDocView(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document Content Paper */}
            <div className="p-8 space-y-6 text-xs text-slate-800 dark:text-slate-200">
              {/* Document Header */}
              <div className="flex justify-between items-start pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 items-center px-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-bold text-xs">VEB</div>
                    <span className="font-bold text-base text-slate-900 dark:text-white">VEB ERP Solutions Ltd</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">100 Enterprise Parkway, Suite 400</p>
                  <p className="text-[11px] text-slate-500">billing@veberp.com • +1 800-555-VEB</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 block uppercase font-heading">
                    {activeDocView.type === 'invoice' ? 'TAX INVOICE' : activeDocView.type === 'estimate' ? 'PROPOSAL ESTIMATE' : 'CREDIT NOTE'}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{activeDocView.data.id}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Date: {activeDocView.data.date || activeDocView.data.issueDate}</span>
                </div>
              </div>

              {/* Bill To Info */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">BILLED TO CLIENT</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block mt-0.5">{activeDocView.data.client}</span>
                  <span className="text-[11px] text-slate-500 block">Project: {activeDocView.data.project || 'Corporate Services'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">TOTAL AMOUNT</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white block mt-0.5">{activeDocView.data.amount || activeDocView.data.creditAmount}</span>
                  {activeDocView.data.amountDue && (
                    <span className="text-xs font-bold text-emerald-600 block">Amount Due: {activeDocView.data.amountDue}</span>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate ($)</th>
                    <th className="py-2 text-right">Amount ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(activeDocView.data.items || [{ desc: "Professional Enterprise ERP Services", qty: 1, rate: 45000, amount: 45000 }]).map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-semibold text-slate-900 dark:text-white">{item.desc}</td>
                      <td className="py-3 text-center">{item.qty}</td>
                      <td className="py-3 text-right">${(item.rate || 0).toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-slate-900 dark:text-white">${(item.amount || item.rate * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Terms & Signatures */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                <p className="font-bold text-slate-700 dark:text-slate-300">Terms & Conditions:</p>
                <p>{activeDocView.data.terms || "Payment due as per agreed terms. Late payments subject to 1.5% monthly interest fee."}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE ESTIMATE */}
      {/* ========================================================= */}
      {showCreateEstimateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateEstimateModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Create Proposal Estimate</h3>
              <button onClick={() => setShowCreateEstimateModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateEstimateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <select value={newEstimate.client} onChange={(e) => setNewEstimate({ ...newEstimate, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option>Stark Industries</option>
                  <option>CyberDyne Systems</option>
                  <option>Wayne Enterprises</option>
                  <option>Acme Logistics</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Title</label>
                <input type="text" value={newEstimate.project} onChange={(e) => setNewEstimate({ ...newEstimate, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Line Item Description</label>
                <input type="text" value={newEstimate.desc} onChange={(e) => setNewEstimate({ ...newEstimate, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Rate ($)</label>
                  <input type="number" value={newEstimate.rate} onChange={(e) => setNewEstimate({ ...newEstimate, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Valid Until</label>
                  <input type="date" value={newEstimate.validUntil} onChange={(e) => setNewEstimate({ ...newEstimate, validUntil: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateEstimateModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Create & Send Estimate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE INVOICE */}
      {/* ========================================================= */}
      {showCreateInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCreateInvoiceModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Issue Client Invoice</h3>
              <button onClick={() => setShowCreateInvoiceModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Client Account</label>
                <select value={newInvoice.client} onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option>CyberDyne Systems</option>
                  <option>Stark Industries</option>
                  <option>Wayne Enterprises</option>
                  <option>Acme Logistics</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Project Link</label>
                <input type="text" value={newInvoice.project} onChange={(e) => setNewInvoice({ ...newInvoice, project: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Line Item Description</label>
                <input type="text" value={newInvoice.desc} onChange={(e) => setNewInvoice({ ...newInvoice, desc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Rate ($)</label>
                  <input type="number" value={newInvoice.rate} onChange={(e) => setNewInvoice({ ...newInvoice, rate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <input type="date" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white" required />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateInvoiceModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Issue Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RECORD PAYMENT */}
      {/* ========================================================= */}
      {showRecordPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowRecordPaymentModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Record Payment Received</h3>
                <p className="text-xs text-slate-500">Invoice {showRecordPaymentModal.id} • {showRecordPaymentModal.client}</p>
              </div>
              <button onClick={() => setShowRecordPaymentModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Amount Paid ($)</label>
                <input
                  type="number"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                  <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
                  <option value="ACH Electronic Check">ACH Check</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Transaction Ref / Wire ID</label>
                <input
                  type="text"
                  value={paymentForm.txnId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, txnId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowRecordPaymentModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">Confirm Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CONVERT TO CREDIT NOTE */}
      {/* ========================================================= */}
      {showConvertToCreditNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowConvertToCreditNoteModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Issue Credit Note</h3>
                <p className="text-xs text-slate-500">Linked Invoice: {showConvertToCreditNoteModal.id}</p>
              </div>
              <button onClick={() => setShowConvertToCreditNoteModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleConvertToCreditNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Credit Amount ($)</label>
                <input
                  type="number"
                  required
                  value={creditNoteForm.amount}
                  onChange={(e) => setCreditNoteForm({ ...creditNoteForm, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason for Credit / Adjustment</label>
                <textarea
                  rows={3}
                  value={creditNoteForm.reason}
                  onChange={(e) => setCreditNoteForm({ ...creditNoteForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowConvertToCreditNoteModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Issue Credit Note</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: APPLY CREDIT NOTE TO INVOICE */}
      {/* ========================================================= */}
      {showApplyCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowApplyCreditModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Apply Credit Note</h3>
                <p className="text-xs text-slate-500">{showApplyCreditModal.id} • Available: {showApplyCreditModal.remainingBalance}</p>
              </div>
              <button onClick={() => setShowApplyCreditModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleApplyCreditNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Target Invoice for {showApplyCreditModal.client}</label>
                <select
                  value={applyCreditForm.targetInvoiceId}
                  onChange={(e) => setApplyCreditForm({ ...applyCreditForm, targetInvoiceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  {invoices.filter(i => i.client === showApplyCreditModal.client || true).map(i => (
                    <option key={i.id} value={i.id}>{i.id} ({i.client}) - Due {i.amountDue}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Redeem Amount ($)</label>
                <input
                  type="number"
                  required
                  value={applyCreditForm.redeemAmount}
                  onChange={(e) => setApplyCreditForm({ ...applyCreditForm, redeemAmount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowApplyCreditModal(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">Redeem Credit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PAYMENT AUDIT TRAIL */}
      {/* ========================================================= */}
      {showPaymentAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowPaymentAuditModal(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Payment Audit Trail</h3>
                <p className="text-xs text-slate-500">{showPaymentAuditModal.id} • {showPaymentAuditModal.amount}</p>
              </div>
              <button onClick={() => setShowPaymentAuditModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <p><span className="text-slate-500 font-semibold">Client:</span> <span className="font-bold text-slate-900 dark:text-white">{showPaymentAuditModal.client}</span></p>
              <p><span className="text-slate-500 font-semibold">Invoice Ref:</span> <span className="font-bold text-indigo-600">{showPaymentAuditModal.invoiceId}</span></p>
              <p><span className="text-slate-500 font-semibold">Method:</span> <span className="font-semibold text-slate-800 dark:text-slate-200">{showPaymentAuditModal.method}</span></p>
              <p><span className="text-slate-500 font-semibold">Txn ID:</span> <span className="font-mono text-slate-700 dark:text-slate-300">{showPaymentAuditModal.txnId}</span></p>
            </div>

            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block font-heading">Timeline & Verification Log</span>
              <div className="space-y-2 relative border-l-2 border-indigo-500/30 pl-4 ml-1 text-xs">
                {(showPaymentAuditModal.auditTrail || []).map((log, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-500/20" />
                    <span className="font-bold text-slate-900 dark:text-white block">{log.step}</span>
                    <span className="text-[10px] text-slate-500 block">{log.by} • {log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowPaymentAuditModal(null)} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer">Close Audit Trail</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingView;
