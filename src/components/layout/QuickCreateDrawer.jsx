import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Drawer from '../ui/Drawer';
import FileUpload from '../ui/FileUpload';
import { Factory, Receipt, UserPlus, Layers } from 'lucide-react';

const QuickCreateDrawer = () => {
  const { quickCreateOpen, setQuickCreateOpen, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('production');

  // Form states
  const [productName, setProductName] = useState('');
  const [orderQty, setOrderQty] = useState(50);
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`New ${activeTab.toUpperCase()} created successfully!`, "success");
    setQuickCreateOpen(false);
  };

  return (
    <Drawer
      isOpen={quickCreateOpen}
      onClose={() => setQuickCreateOpen(false)}
      title="Quick Create Record"
      width="max-w-lg"
    >
      {/* Category selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('production')}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
            activeTab === 'production'
              ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Factory className="h-5 w-5" />
          Production Order
        </button>

        <button
          onClick={() => setActiveTab('invoice')}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
            activeTab === 'invoice'
              ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Receipt className="h-5 w-5" />
          Invoice
        </button>

        <button
          onClick={() => setActiveTab('lead')}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
            activeTab === 'lead'
              ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <UserPlus className="h-5 w-5" />
          CRM Lead
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'production' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Finished Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. POS Touchscreen Terminal X1"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Production Units</label>
              <input
                type="number"
                required
                value={orderQty}
                onChange={(e) => setOrderQty(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </>
        )}

        {activeTab === 'invoice' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Client Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Stark Industries"
                value={invoiceClient}
                onChange={(e) => setInvoiceClient(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount ($ USD)</label>
              <input
                type="number"
                required
                placeholder="25000"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <FileUpload label="Attach PO Document (Optional)" />
          </>
        )}

        {activeTab === 'lead' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Deal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. CyberDyne Systems"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </>
        )}

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setQuickCreateOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-colors"
          >
            Create Record
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default QuickCreateDrawer;
