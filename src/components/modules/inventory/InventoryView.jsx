import React, { useState } from 'react';
import { RAW_MATERIALS_INVENTORY } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { Package, AlertTriangle, ArrowRightLeft, Plus, CheckCircle2, Warehouse } from 'lucide-react';

const InventoryView = () => {
  const { addToast } = useApp();
  const [stock, setStock] = useState(RAW_MATERIALS_INVENTORY);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferData, setTransferData] = useState({ item: 'RM-101', fromWh: 'Main Assembly Depot', toWh: 'Component Vault', qty: 10 });

  const handleStockTransfer = (e) => {
    e.preventDefault();
    setIsTransferModalOpen(false);
    addToast(`Transferred ${transferData.qty} units of ${transferData.item} to ${transferData.toWh}`, "success");
  };

  const columns = [
    { header: "SKU Code", accessor: "sku", sortable: true },
    {
      header: "Material / Product",
      accessor: "name",
      sortable: true,
      render: (val, row) => (
        <div>
          <span className="font-bold block text-slate-900 dark:text-white">{val}</span>
          <span className="text-[11px] text-slate-400 block">Location: {row.warehouse}</span>
        </div>
      )
    },
    {
      header: "Current Stock",
      accessor: "stock",
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <span className={`font-extrabold text-sm ${row.isLow ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
            {val} {row.unit}
          </span>
          {row.isLow && (
            <Badge variant="rose">Reorder Low</Badge>
          )}
        </div>
      )
    },
    { header: "Min Threshold", accessor: "minStock", sortable: true },
    { header: "Unit Valuation", accessor: "unitCost", sortable: true }
  ];

  return (
    <div className="space-y-6">
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Total Raw Material SKUs</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stock.length} SKUs</h3>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Valued at $42,850</span>
        </div>

        <div className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/30 shadow-xs">
          <span className="text-xs text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">Critical Low Stock Items</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">2 Items Below Min</h3>
          <span className="text-[10px] text-rose-500 font-semibold mt-1 block flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Reorder triggered
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Active Warehouses</span>
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">2 Depots</h3>
          <span className="text-[10px] text-slate-400 mt-1 block">Main Assembly & Component Vault</span>
        </div>
      </div>

      {/* Stock Table */}
      <DataTable
        columns={columns}
        data={stock}
        searchPlaceholder="Search materials or SKUs..."
        onAddClick={() => setIsTransferModalOpen(true)}
        addButtonLabel="Inter-Warehouse Transfer"
      />

      {/* Stock Transfer Modal */}
      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        title="Inter-Warehouse Stock Transfer"
      >
        <form onSubmit={handleStockTransfer} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Raw Material SKU</label>
            <select
              value={transferData.item}
              onChange={(e) => setTransferData({ ...transferData, item: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            >
              {stock.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.stock} in stock)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">From Warehouse</label>
              <input
                type="text"
                disabled
                value={transferData.fromWh}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Destination</label>
              <input
                type="text"
                disabled
                value={transferData.toWh}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity to Transfer</label>
            <input
              type="number"
              min="1"
              value={transferData.qty}
              onChange={(e) => setTransferData({ ...transferData, qty: parseInt(e.target.value) || 1 })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsTransferModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              Execute Stock Transfer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InventoryView;
