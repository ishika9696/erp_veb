import React, { useState } from 'react';
import { SERVER_HEALTH_METRICS, SUPER_ADMIN_TENANTS, SYSTEM_ERROR_LOGS } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  ShieldCheck,
  Plus,
  RefreshCw,
  Database,
  Radio,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Settings,
  Mail
} from 'lucide-react';

const ServerAdminView = () => {
  const { addToast } = useApp();
  const [tenants, setTenants] = useState(SUPER_ADMIN_TENANTS);
  const [errorLogs] = useState(SYSTEM_ERROR_LOGS);
  const [activeTab, setActiveTab] = useState('health'); // 'health' | 'tenants' | 'backups' | 'logs'

  // Modal for new tenant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({ name: '', plan: 'Manufacturing Enterprise', mrr: '$699' });

  const handleAddTenant = (e) => {
    e.preventDefault();
    const created = {
      id: `TNT-0${tenants.length + 1}`,
      name: newTenant.name,
      plan: newTenant.plan,
      mrr: newTenant.mrr,
      status: "Active",
      users: 15,
      storage: "10.0 GB",
      dbStatus: "Healthy",
      joinedDate: "Aug 04, 2026"
    };
    setTenants([...tenants, created]);
    setIsModalOpen(false);
    addToast(`Provisioned tenant database for "${newTenant.name}"`, "success");
    setNewTenant({ name: '', plan: 'Manufacturing Enterprise', mrr: '$699' });
  };

  const handleBackupNow = () => {
    addToast("Triggered automated DB Snapshot backup to AWS S3", "success", "Database Backup");
  };

  const tenantColumns = [
    { header: "Tenant ID", accessor: "id", sortable: true },
    { header: "Company Name", accessor: "name", sortable: true },
    {
      header: "Active SaaS Plan",
      accessor: "plan",
      sortable: true,
      render: (val) => (
        <span className="font-bold text-indigo-600 dark:text-indigo-400">{val}</span>
      )
    },
    { header: "MRR", accessor: "mrr", sortable: true },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'Active' ? 'emerald' : 'rose'}>{val}</Badge>
      )
    },
    { header: "Storage Used", accessor: "storage", sortable: true },
    {
      header: "DB Instance",
      accessor: "dbStatus",
      render: (val) => (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" /> {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tab Header */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <button
          onClick={() => setActiveTab('health')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'health'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Server className="h-4 w-4" />
          Server & Infrastructure Health
        </button>

        <button
          onClick={() => setActiveTab('tenants')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'tenants'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="h-4 w-4" />
          Tenant Multi-Hosting ({tenants.length})
        </button>

        <button
          onClick={() => setActiveTab('backups')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'backups'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="h-4 w-4" />
          Backups & Gateway Config
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'logs'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Terminal className="h-4 w-4" />
          System Error Logs
        </button>
      </div>

      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* Server Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CPU Widget */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">CPU Load Meter</span>
                <Cpu className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                {SERVER_HEALTH_METRICS.cpuUsage}%
              </h3>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${SERVER_HEALTH_METRICS.cpuUsage}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">8 Virtual Cores active</span>
            </div>

            {/* RAM Widget */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">RAM Utilization</span>
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                {SERVER_HEALTH_METRICS.ramUsage}%
              </h3>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${SERVER_HEALTH_METRICS.ramUsage}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">10.0 GB / 16.0 GB Used</span>
            </div>

            {/* Storage Widget */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">NVMe Cluster Storage</span>
                <HardDrive className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                {SERVER_HEALTH_METRICS.storageUsage}%
              </h3>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${SERVER_HEALTH_METRICS.storageUsage}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">485 GB / 1,000 GB Capacity</span>
            </div>

            {/* Uptime Widget */}
            <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-950 bg-indigo-50/40 dark:bg-indigo-950/30 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Uptime SLA</span>
                <Radio className="h-5 w-5 text-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                {SERVER_HEALTH_METRICS.uptime}
              </h3>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 block">
                Region: {SERVER_HEALTH_METRICS.serverRegion}
              </span>
            </div>
          </div>

          {/* Real-time API & DB Metrics Strip */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-r border-slate-100 dark:border-slate-800 pr-4">
              <span className="text-xs text-slate-400 block font-semibold">Active Database Connections</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {SERVER_HEALTH_METRICS.activeDbConnections} Connection Pools
              </span>
            </div>
            <div className="border-r border-slate-100 dark:border-slate-800 pr-4">
              <span className="text-xs text-slate-400 block font-semibold">API Throughput Rate</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {SERVER_HEALTH_METRICS.apiRequestsPerMin.toLocaleString()} req / min
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">SSL Certificate & Encryption</span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block flex items-center gap-1">
                <ShieldCheck className="h-5 w-5" /> TLS 1.3 Active
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tenants' && (
        <DataTable
          columns={tenantColumns}
          data={tenants}
          searchPlaceholder="Search tenant companies by name..."
          onAddClick={() => setIsModalOpen(true)}
          addButtonLabel="Provision New Tenant"
          filterOptions={['Active', 'Past Due']}
        />
      )}

      {activeTab === 'backups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Automated Backup Scheduler Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Automated Database Backup Scheduler
              </h3>
              <Database className="h-5 w-5 text-indigo-500" />
            </div>
            <p className="text-xs text-slate-400">
              Daily automated PostgreSQL snapshots encrypted with AES-256 and pushed to AWS S3.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Last Successful Snapshot:</span>
                <span className="font-bold text-slate-900 dark:text-white">Today at 04:00 AM UTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Backup Frequency:</span>
                <span className="font-bold text-indigo-600">Every 6 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Retention Policy:</span>
                <span className="font-bold">30 Days Rolling</span>
              </div>
            </div>

            <button
              onClick={handleBackupNow}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Trigger Immediate S3 Backup
            </button>
          </div>

          {/* Email / SMS Gateway Configuration Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Email & SMS Gateway Settings
              </h3>
              <Mail className="h-5 w-5 text-emerald-500" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">SMTP Host Provider</label>
                <input
                  type="text"
                  defaultValue="smtp.sendgrid.net"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Twilio SMS Gateway SID</label>
                <input
                  type="text"
                  defaultValue="AC_89201948019420841209"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => addToast("Gateway configurations updated", "success")}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs transition-colors"
            >
              Save Gateway Config
            </button>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Real-time System Logs
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Showing last 4 system logs</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
            {errorLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      log.level === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : log.level === 'WARNING'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}
                  >
                    {log.level}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">[{log.service}]</span>{' '}
                    <span className="text-slate-600 dark:text-slate-300">{log.message}</span>
                  </div>
                </div>
                <span className="text-slate-400 text-[10px] shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provision Tenant Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision SaaS Tenant Company"
      >
        <form onSubmit={handleAddTenant} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Acme Manufacturing"
              value={newTenant.name}
              onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">SaaS Plan Tier</label>
            <select
              value={newTenant.plan}
              onChange={(e) => {
                const plan = e.target.value;
                const mrr = plan === 'Manufacturing Enterprise' ? '$699' : plan === 'Professional SaaS' ? '$299' : '$99';
                setNewTenant({ ...newTenant, plan, mrr });
              }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            >
              <option value="Manufacturing Enterprise">Manufacturing Enterprise ($699/mo)</option>
              <option value="Professional SaaS">Professional SaaS ($299/mo)</option>
              <option value="Starter ERP">Starter ERP ($99/mo)</option>
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
              Provision DB & Credentials
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServerAdminView;
