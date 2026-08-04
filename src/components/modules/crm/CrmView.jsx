import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CRM_CLIENT_ACCOUNTS,
  INITIAL_LEADS_PIPELINE,
  CRM_CONTRACTS,
  CRM_CLIENT_PROJECTS
} from '../../../data/mockData';
import {
  Users,
  Plus,
  Building,
  FileCheck,
  FolderKanban,
  TrendingUp,
  DollarSign,
  Briefcase,
  Phone,
  Mail
} from 'lucide-react';

const CrmView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('accounts');
  const [pipeline, setPipeline] = useState(INITIAL_LEADS_PIPELINE);
  const [clients, setClients] = useState(CRM_CLIENT_ACCOUNTS);
  const [contracts, setContracts] = useState(CRM_CONTRACTS);

  const tabs = [
    { id: 'accounts', label: 'Client Accounts', icon: Building },
    { id: 'leads', label: 'Leads Pipeline', icon: Users },
    { id: 'sales_deals', label: 'Sales Deals & Forecast', icon: TrendingUp },
    { id: 'client_projects', label: 'Client Projects', icon: FolderKanban },
    { id: 'contracts', label: 'Contracts & Proposals', icon: FileCheck }
  ];

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

      {/* TAB 1: CLIENT ACCOUNTS */}
      {activeTab === 'accounts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Client Accounts & Corporate Profiles
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Manage client contacts, billing addresses, and linked active projects.</p>
            </div>
            <button
              onClick={() => addToast("New Client Account dialog opened", "info")}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add Client Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map((cli) => (
              <div key={cli.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                    {cli.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{cli.status}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">{cli.company}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Industry: {cli.industry}</p>

                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-slate-400" /> {cli.contactPerson}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> {cli.email}</p>
                  <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> {cli.phone}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span>Total Value: {cli.totalDeals}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{cli.activeProjects} Projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEADS PIPELINE */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Leads Pipeline (New → Qualified → Won)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stage: Lead */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-3">New Leads ({pipeline.leads.length})</span>
              <div className="space-y-3">
                {pipeline.leads.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-bold text-indigo-600">{l.company}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</h4>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">{l.value} • {l.probability}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage: Contacted */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <span className="text-xs font-bold text-indigo-600 block mb-3">Contacted ({pipeline.contacted.length})</span>
              <div className="space-y-3">
                {pipeline.contacted.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-bold text-indigo-600">{l.company}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</h4>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">{l.value} • {l.probability}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage: Proposal */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <span className="text-xs font-bold text-amber-600 block mb-3">Proposal Sent ({pipeline.proposal.length})</span>
              <div className="space-y-3">
                {pipeline.proposal.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-bold text-amber-600">{l.company}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</h4>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">{l.value} • {l.probability}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage: Won */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-4">
              <span className="text-xs font-bold text-emerald-600 block mb-3">Closed Won ({pipeline.won.length})</span>
              <div className="space-y-3">
                {pipeline.won.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-bold text-emerald-600">{l.company}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</h4>
                    <p className="text-[11px] font-bold text-emerald-600">{l.value} • {l.probability}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SALES DEALS & FORECAST */}
      {activeTab === 'sales_deals' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Sales Deals & Revenue Forecast Summary
          </h2>
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Weighted Q3 Pipeline Forecast</span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$248,500.00</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">+18.5% YoY Growth</span>
          </div>
        </div>
      )}

      {/* TAB 4: CLIENT PROJECTS */}
      {activeTab === 'client_projects' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Client Project Delivery (Worksuite Style)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRM_CLIENT_PROJECTS.map((prj) => (
              <div key={prj.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600">{prj.id}</span>
                  <span className="font-bold text-emerald-600">{prj.status}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{prj.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Client: <span className="font-semibold text-slate-900 dark:text-white">{prj.client}</span> • Lead: {prj.lead}</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Progress</span>
                    <span>{prj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${prj.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CONTRACTS & PROPOSALS */}
      {activeTab === 'contracts' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Contracts & Proposal Signatures
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Contract ID</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Client Account</th>
                  <th className="p-3.5">Contract Value</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Signatory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {CRM_CONTRACTS.map((ctr) => (
                  <tr key={ctr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{ctr.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{ctr.title}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{ctr.client}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{ctr.value}</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{ctr.status}</span></td>
                    <td className="p-3.5 text-slate-500">{ctr.signedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmView;
