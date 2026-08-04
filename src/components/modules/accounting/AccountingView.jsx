import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  INITIAL_INVOICES,
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
  ShieldCheck,
  RefreshCw
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
  const [activeTab, setActiveTab] = useState('sales');
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [bills, setBills] = useState(FINANCE_PURCHASE_BILLS);
  const [expenses, setExpenses] = useState(FINANCE_EXPENSES);
  const [bankReconciles, setBankReconciles] = useState(BANK_RECONCILIATION);

  // Invoice Wizard Modal
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [invClient, setInvClient] = useState('CyberDyne Systems');
  const [invItem, setInvItem] = useState('ERP Software Subscription');
  const [invAmount, setInvAmount] = useState('45000');

  const tabs = [
    { id: 'sales', label: 'Sales & Invoices', icon: Receipt },
    { id: 'purchase', label: 'Purchase & Vendor Bills', icon: FileText },
    { id: 'expenses', label: 'Expenses & Recurring', icon: CreditCard },
    { id: 'bank_recon', label: 'Bank Accounts & Reconciliation', icon: Building2 },
    { id: 'financial_reports', label: 'Financial Reports (P&L)', icon: TrendingUp }
  ];

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const newInv = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: invClient,
      date: "2026-08-04",
      dueDate: "2026-08-18",
      amount: `$${Number(invAmount).toLocaleString()}.00`,
      status: "Pending",
      items: [{ desc: invItem, qty: 1, rate: Number(invAmount) }]
    };
    setInvoices((prev) => [newInv, ...prev]);
    setShowWizard(false);
    setWizardStep(1);
    addToast(`Invoice ${newInv.id} issued to ${invClient}`, "success");
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

      {/* TAB 1: SALES & INVOICES */}
      {activeTab === 'sales' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Sales Orders & Client Invoices
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Track client billing, payment receipts, and convert invoices to credit notes.</p>
            </div>
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create Invoice Wizard</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Invoice ID</th>
                  <th className="p-3.5">Client Account</th>
                  <th className="p-3.5">Issue Date</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{inv.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{inv.client}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{inv.date}</td>
                    <td className="p-3.5 text-slate-500">{inv.dueDate}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        inv.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                        inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PURCHASE & VENDOR BILLS */}
      {activeTab === 'purchase' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Purchase Orders & Vendor Bills
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Bill No</th>
                  <th className="p-3.5">Vendor Name</th>
                  <th className="p-3.5">Bill Date</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">PO Ref</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {bills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{b.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{b.vendor}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{b.billDate}</td>
                    <td className="p-3.5 text-slate-500">{b.dueDate}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{b.amount}</td>
                    <td className="p-3.5 font-semibold text-indigo-600">{b.poRef}</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Operating Expenses & Recurring Bills
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Exp ID</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Vendor</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Recurring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{e.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{e.category}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{e.vendor}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{e.amount}</td>
                    <td className="p-3.5 text-slate-500">{e.date}</td>
                    <td className="p-3.5 text-slate-600 font-semibold">{e.recurring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BANK RECONCILIATION */}
      {activeTab === 'bank_recon' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Bank Accounts & Statement Reconciliation
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Match bank statement transactions against recorded invoices and vendor bills.</p>
            </div>
            <button
              onClick={() => addToast("Reconciled 3 statement lines automatically", "success")}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Auto-Reconcile</span>
            </button>
          </div>

          {/* Bank Account Balances */}
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

          {/* Reconciliation Log */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Rec ID</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Bank Account</th>
                  <th className="p-3.5">Transaction Description</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Matched Entry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {bankReconciles.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{r.id}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{r.date}</td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{r.bankAccount}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{r.description}</td>
                    <td className={`p-3.5 font-bold ${r.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>{r.amount}</td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        r.status === 'Reconciled' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-semibold">{r.matchedEntity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIAL REPORTS (P&L) */}
      {activeTab === 'financial_reports' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Financial Statements & P&L Chart
          </h2>
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_OVERVIEW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* INVOICE WIZARD MODAL */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">3-Step Invoice Creation Wizard</h3>
              <span className="text-xs font-bold text-indigo-600">Step {wizardStep} of 3</span>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              {wizardStep === 1 && (
                <div>
                  <label className="block font-semibold mb-1">Select Client Account</label>
                  <select value={invClient} onChange={(e) => setInvClient(e.target.value)} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950">
                    <option>CyberDyne Systems</option>
                    <option>Stark Industries</option>
                    <option>Wayne Enterprises</option>
                  </select>
                </div>
              )}

              {wizardStep === 2 && (
                <div>
                  <label className="block font-semibold mb-1">Line Item Description</label>
                  <input type="text" value={invItem} onChange={(e) => setInvItem(e.target.value)} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950" required />
                </div>
              )}

              {wizardStep === 3 && (
                <div>
                  <label className="block font-semibold mb-1">Total Invoice Amount ($)</label>
                  <input type="number" value={invAmount} onChange={(e) => setInvAmount(e.target.value)} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950" required />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowWizard(false)} className="px-4 py-2 rounded-xl border text-slate-600">Cancel</button>
                {wizardStep < 3 ? (
                  <button type="button" onClick={() => setWizardStep(wizardStep + 1)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Next →</button>
                ) : (
                  <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">Issue Invoice</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingView;
