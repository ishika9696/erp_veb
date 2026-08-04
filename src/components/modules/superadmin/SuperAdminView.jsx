import React, { useState } from 'react';
import { SUPER_ADMIN_TENANTS } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, Plus, Server, Activity, Users, DollarSign, ArrowUpRight } from 'lucide-react';

const SuperAdminView = () => {
  const { addToast } = useApp();
  const [tenants, setTenants] = useState(SUPER_ADMIN_TENANTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({ name: '', plan: 'Professional SaaS', mrr: '$299' });

  const handleAddTenant = (e) => {
    e.preventDefault();
    const created = {
      id: `TNT-0${tenants.length + 1}`,
      name: newTenant.name,
      plan: newTenant.plan,
      mrr: newTenant.mrr,
      status: "Active",
      users: 12,
      joinedDate: "Aug 04, 2026"
    };
    setTenants([...tenants, created]);
    setIsModalOpen(false);
    addToast(`Onboarded new SaaS Tenant "${newTenant.name}"`, "success");
    setNewTenant({ name: '', plan: 'Professional SaaS', mrr: '$299' });
  };

  const columns = [
    { header: "Tenant ID", accessor: "id", sortable: true },
    { header: "Company Name", accessor: "name", sortable: true },
    {
      header: "Active Plan",
      accessor: "plan",
      sortable: true,
      render: (val) => (
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{val}</span>
      )
    },
    { header: "Monthly MRR", accessor: "mrr", sortable: true },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'Active' ? 'emerald' : 'rose'}>{val}</Badge>
      )
    },
    { header: "Active Users", accessor: "users", sortable: true },
    { header: "Joined Date", accessor: "joinedDate", sortable: true }
  ];

  return (
    <div className="space-y-6">
      {/* SaaS Executive Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-xs">
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Monthly Recurring Revenue</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">$48,950.00</h3>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" /> +18.4% MRR Growth
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Active Tenants</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tenants.length} Companies</h3>
          <span className="text-[10px] text-slate-400 mt-1 block">99.8% Retention</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Platform Users</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">295 Seats</h3>
          <span className="text-[10px] text-slate-400 mt-1 block">Across all active tenants</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-xs text-slate-400 font-medium">Server Cluster Health</span>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">99.99%</h3>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">18ms avg latency</span>
        </div>
      </div>

      {/* Tenants Table */}
      <DataTable
        columns={columns}
        data={tenants}
        searchPlaceholder="Search tenants by company name..."
        onAddClick={() => setIsModalOpen(true)}
        addButtonLabel="Onboard SaaS Tenant"
        filterOptions={['Active', 'Past Due']}
      />

      {/* Onboard Tenant Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Onboard New SaaS Tenant Company"
      >
        <form onSubmit={handleAddTenant} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Global Cloud"
              value={newTenant.name}
              onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select SaaS Plan</label>
            <select
              value={newTenant.plan}
              onChange={(e) => {
                const plan = e.target.value;
                const mrr = plan === 'Enterprise Custom' ? '$699' : plan === 'Professional SaaS' ? '$299' : '$99';
                setNewTenant({ ...newTenant, plan, mrr });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            >
              <option value="Starter ERP">Starter ERP ($99/mo)</option>
              <option value="Professional SaaS">Professional SaaS ($299/mo)</option>
              <option value="Enterprise Custom">Enterprise Custom ($699/mo)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              Provision Tenant DB
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SuperAdminView;
