import React, { useState } from 'react';
import { INITIAL_INVOICES } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Drawer from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { Receipt, Plus, FileText, CheckCircle, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight, DollarSign, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EXPENSE_CATEGORIES = [
  { category: 'Software SaaS', amount: 14200 },
  { category: 'Hardware & POS', amount: 9800 },
  { category: 'Marketing & Ads', amount: 8400 },
  { category: 'Office Lease', amount: 6000 }
];

const AccountingView = () => {
  const { addToast } = useApp();
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);

  // Invoice Detail Drawer
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Multi-step Wizard Modal State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    client: '',
    date: '2026-08-04',
    dueDate: '2026-08-18',
    itemDesc: 'Enterprise ERP Implementation',
    qty: 1,
    rate: 15000,
    taxRate: 10
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const subtotal = wizardData.qty * wizardData.rate;
    const total = subtotal + (subtotal * wizardData.taxRate) / 100;

    const newInv = {
      id: `INV-2026-0${invoices.length + 94}`,
      client: wizardData.client,
      date: wizardData.date,
      dueDate: wizardData.dueDate,
      amount: `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      status: 'Pending',
      items: [{ desc: wizardData.itemDesc, qty: wizardData.qty, rate: wizardData.rate }]
    };

    setInvoices([newInv, ...invoices]);
    setIsWizardOpen(false);
    setStep(1);
    addToast(`Invoice ${newInv.id} created and sent to ${wizardData.client}`, "success");
  };

  const columns = [
    { header: "Invoice ID", accessor: "id", sortable: true },
    { header: "Client / Company", accessor: "client", sortable: true },
    { header: "Issue Date", accessor: "date", sortable: true },
    { header: "Due Date", accessor: "dueDate", sortable: true },
    { header: "Total Amount", accessor: "amount", sortable: true },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (val) => (
        <Badge
          variant={
            val === 'Paid' ? 'emerald' : val === 'Pending' ? 'amber' : val === 'Overdue' ? 'rose' : 'slate'
          }
        >
          {val}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedInvoice(row);
            setIsDrawerOpen(true);
          }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Invoice
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Total Invoiced</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$200,700.00</h3>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">+12.5% vs last month</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Paid Collection</span>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">$113,500.00</h3>
          <span className="text-[10px] text-slate-400 mt-1 block">5 Invoices collected</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Pending Unpaid</span>
          <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">$59,200.00</h3>
          <span className="text-[10px] text-slate-400 mt-1 block">Due within 14 days</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Overdue Invoices</span>
          <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">$28,000.00</h3>
          <span className="text-[10px] text-rose-500 font-semibold mt-1 block">Requires Follow-up</span>
        </div>
      </div>

      {/* Main Table + Expense Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            columns={columns}
            data={invoices}
            searchPlaceholder="Search invoices by client or ID..."
            onAddClick={() => setIsWizardOpen(true)}
            addButtonLabel="Create Invoice Wizard"
            filterOptions={['Paid', 'Pending', 'Overdue', 'Draft']}
          />
        </div>

        {/* Expenses Category Bar Chart */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Operating Expenses Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-4">Categorized monthly spend</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EXPENSE_CATEGORIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                  <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF' }}
                  />
                  <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} name="Amount ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 text-xs font-semibold flex justify-between">
            <span className="text-slate-500">Total Monthly Spend:</span>
            <span className="text-slate-900 dark:text-white font-bold">$38,400.00</span>
          </div>
        </div>
      </div>

      {/* Invoice Detail Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Invoice Details"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-bold">{selectedInvoice.id}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedInvoice.client}</h3>
              </div>
              <Badge variant={selectedInvoice.status === 'Paid' ? 'emerald' : 'amber'}>
                {selectedInvoice.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
              <div>
                <span className="text-slate-400 block">Issue Date</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedInvoice.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Due Date</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedInvoice.dueDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Line Items</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {selectedInvoice.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{it.desc}</span>
                      <span className="text-slate-400">Qty: {it.qty} x ${it.rate}</span>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white">${(it.qty * it.rate).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Total Amount Due</span>
              <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{selectedInvoice.amount}</span>
            </div>
          </div>
        )}
      </Drawer>

      {/* Multi-Step Invoice Wizard Modal */}
      <Modal
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setStep(1);
        }}
        title={`Multi-Step Invoice Wizard (Step ${step} of 3)`}
        maxWidth="max-w-xl"
      >
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Client Details</span>
          </div>
          <div className="h-0.5 w-10 bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Line Items</span>
          </div>
          <div className="h-0.5 w-10 bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Review & Send</span>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleCreateInvoice : (e) => { e.preventDefault(); setStep(step + 1); }}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Client</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CyberDyne Systems"
                  value={wizardData.client}
                  onChange={(e) => setWizardData({ ...wizardData, client: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={wizardData.date}
                    onChange={(e) => setWizardData({ ...wizardData, date: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    value={wizardData.dueDate}
                    onChange={(e) => setWizardData({ ...wizardData, dueDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Item Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Module Software Development"
                  value={wizardData.itemDesc}
                  onChange={(e) => setWizardData({ ...wizardData, itemDesc: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={wizardData.qty}
                    onChange={(e) => setWizardData({ ...wizardData, qty: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Rate ($)</label>
                  <input
                    type="number"
                    value={wizardData.rate}
                    onChange={(e) => setWizardData({ ...wizardData, rate: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tax (%)</label>
                  <input
                    type="number"
                    value={wizardData.taxRate}
                    onChange={(e) => setWizardData({ ...wizardData, taxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Client:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{wizardData.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Item:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{wizardData.itemDesc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-bold">${(wizardData.qty * wizardData.rate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-indigo-600 font-bold border-t border-slate-200 dark:border-slate-800 pt-2">
                  <span>Grand Total (incl. Tax):</span>
                  <span>${((wizardData.qty * wizardData.rate) * 1.1).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-between border-t border-slate-200 dark:border-slate-800 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              {step === 3 ? "Finalize & Send Invoice" : "Next Step →"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AccountingView;
