import React, { useState } from 'react';
import { ROLE_PERMISSIONS_MATRIX } from '../../../data/mockData';
import FileUpload from '../../ui/FileUpload';
import { useApp } from '../../../context/AppContext';
import { User, Building, ShieldCheck, Cpu, Bell, Check, Save } from 'lucide-react';

const SettingsView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('matrix'); // 'profile' | 'company' | 'matrix' | 'integrations'
  const [matrix, setMatrix] = useState(ROLE_PERMISSIONS_MATRIX);

  const [integrations, setIntegrations] = useState([
    { id: 'stripe', name: 'Stripe Payments', desc: 'Process live credit card transactions in POS and invoices.', connected: true },
    { id: 'qb', name: 'QuickBooks Sync', desc: 'Automatic two-way sync of ledger and invoice journals.', connected: true },
    { id: 'slack', name: 'Slack Notifications', desc: 'Receive real-time lead and payment alerts in #erp-activity.', connected: false },
    { id: 'gsuite', name: 'Google Workspace', desc: 'Sync employee calendar events and Gmail contacts.', connected: true }
  ]);

  const togglePermission = (idx, roleKey) => {
    setMatrix((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [roleKey]: !item[roleKey] } : item))
    );
    addToast("Updated permission matrix", "info");
  };

  const toggleIntegration = (id) => {
    setIntegrations((prev) =>
      prev.map((it) => (it.id === id ? { ...it, connected: !it.connected } : it))
    );
    addToast("Integration status updated", "success");
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast("Settings saved successfully!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Settings Tab Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'matrix'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          Role Permission Matrix
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="h-4 w-4" />
          Profile Settings
        </button>

        <button
          onClick={() => setActiveTab('company')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'company'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building className="h-4 w-4" />
          Company Info & Branding
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'integrations'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="h-4 w-4" />
          Integrations
        </button>
      </div>

      {/* Role Permission Matrix Tab */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Role Access & Permissions Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Configure module read/write access across organizational roles.
              </p>
            </div>
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs"
            >
              <Save className="h-4 w-4" /> Save Matrix
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Module Access</th>
                  <th className="p-4 text-center font-bold text-indigo-600">Super Admin</th>
                  <th className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">Company Admin</th>
                  <th className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">Manager</th>
                  <th className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">Staff / Associate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {matrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{row.module}</td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.superAdmin}
                        onChange={() => togglePermission(idx, 'superAdmin')}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.admin}
                        onChange={() => togglePermission(idx, 'admin')}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.manager}
                        onChange={() => togglePermission(idx, 'manager')}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.staff}
                        onChange={() => togglePermission(idx, 'staff')}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">User Profile Settings</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Sarah Jenkins"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="s.jenkins@acme.com"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <FileUpload label="Profile Avatar Picture" />

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
          >
            Update Profile
          </button>
        </form>
      )}

      {/* Company Info & Branding */}
      {activeTab === 'company' && (
        <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Company Branding</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
            <input
              type="text"
              defaultValue="Acme Corporation"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tax Registration Number</label>
            <input
              type="text"
              defaultValue="US-TAX-8924019"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <FileUpload label="Company Logo (PNG/SVG)" />

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
          >
            Save Company Info
          </button>
        </form>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((it) => (
            <div
              key={it.id}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{it.name}</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">{it.desc}</p>
              </div>

              <button
                onClick={() => toggleIntegration(it.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  it.connected
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {it.connected ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsView;
