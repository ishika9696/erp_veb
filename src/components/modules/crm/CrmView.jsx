import React, { useState } from 'react';
import { INITIAL_LEADS_PIPELINE } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Drawer from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { LayoutGrid, Table as TableIcon, Plus, Building, Mail, Phone, ArrowRight, DollarSign, UserCheck } from 'lucide-react';

const CrmView = () => {
  const { addToast } = useApp();
  const [pipeline, setPipeline] = useState(INITIAL_LEADS_PIPELINE);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'

  // Selected Contact Drawer State
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // New Deal Modal State
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({ title: '', company: '', value: '', contact: '', email: '', stage: 'Lead' });

  const moveStage = (deal, currentStage, targetStage) => {
    const sourceList = [...pipeline[currentStage.toLowerCase()]];
    const targetList = [...pipeline[targetStage.toLowerCase()]];

    const updatedSource = sourceList.filter((d) => d.id !== deal.id);
    const updatedDeal = { ...deal, stage: targetStage };
    const updatedTarget = [...targetList, updatedDeal];

    setPipeline({
      ...pipeline,
      [currentStage.toLowerCase()]: updatedSource,
      [targetStage.toLowerCase()]: updatedTarget
    });

    addToast(`Moved deal "${deal.title}" to ${targetStage}`, "success");
  };

  const handleCreateDeal = (e) => {
    e.preventDefault();
    const created = {
      id: `c-${Date.now()}`,
      ...newDeal,
      priority: "High",
      probability: "50%"
    };
    setPipeline((prev) => ({
      ...prev,
      [newDeal.stage.toLowerCase()]: [...prev[newDeal.stage.toLowerCase()], created]
    }));
    setIsNewDealOpen(false);
    addToast(`New deal "${newDeal.title}" created in ${newDeal.stage}`, "success");
    setNewDeal({ title: '', company: '', value: '', contact: '', email: '', stage: 'Lead' });
  };

  // Convert pipeline object to flat array for Table View
  const flatDeals = Object.values(pipeline).flat();

  const tableColumns = [
    { header: "Deal Name", accessor: "title", sortable: true },
    { header: "Company", accessor: "company", sortable: true },
    { header: "Contact Person", accessor: "contact", sortable: true },
    { header: "Value", accessor: "value", sortable: true },
    {
      header: "Stage",
      accessor: "stage",
      sortable: true,
      render: (val) => (
        <Badge
          variant={
            val === 'Won' ? 'emerald' : val === 'Proposal' ? 'indigo' : val === 'Contacted' ? 'amber' : 'slate'
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
            setSelectedDeal(row);
            setIsDrawerOpen(true);
          }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Profile
        </button>
      )
    }
  ];

  const stages = [
    { key: 'leads', name: 'Lead', color: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800' },
    { key: 'contacted', name: 'Contacted', color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600' },
    { key: 'proposal', name: 'Proposal', color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' },
    { key: 'won', name: 'Won', color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              Table View
            </button>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Total Pipeline: <strong className="text-slate-900 dark:text-white">$249,500</strong>
          </span>
        </div>

        <button
          onClick={() => setIsNewDealOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-semibold shadow-2xs shadow-indigo-500/20"
        >
          <Plus className="h-4 w-4" />
          New CRM Deal
        </button>
      </div>

      {/* View Switcher Output */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stg) => {
            const list = pipeline[stg.key] || [];
            const totalValue = list.reduce((acc, curr) => acc + parseInt(curr.value.replace(/[^0-9]/g, '') || 0), 0);

            return (
              <div
                key={stg.key}
                className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 shadow-xs min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-heading">{stg.name}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      {list.length}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>

                {/* Cards List */}
                <div className="flex-1 space-y-3">
                  {list.map((deal) => (
                    <div
                      key={deal.id}
                      className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-800 cursor-pointer"
                      onClick={() => {
                        setSelectedDeal(deal);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{deal.company}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{deal.probability} win</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 transition-colors">
                        {deal.title}
                      </h4>

                      <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                        <span className="font-extrabold text-slate-900 dark:text-white">{deal.value}</span>
                        <span className="text-slate-500 text-[11px]">{deal.contact}</span>
                      </div>

                      {/* Quick Move Stage Dropdown */}
                      <div className="mt-3 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stg.name !== 'Won' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStage =
                                stg.name === 'Lead' ? 'Contacted' : stg.name === 'Contacted' ? 'Proposal' : 'Won';
                              moveStage(deal, stg.name, nextStage);
                            }}
                            className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            Advance Stage <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <DataTable
          columns={tableColumns}
          data={flatDeals}
          searchPlaceholder="Search deals by name or company..."
          filterOptions={['Lead', 'Contacted', 'Proposal', 'Won']}
        />
      )}

      {/* Contact Profile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Contact & Deal Profile"
      >
        {selectedDeal && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedDeal.company}</h3>
                <p className="text-xs text-slate-400">{selectedDeal.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Deal Value</span>
                <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{selectedDeal.value}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Stage</span>
                <div>
                  <Badge variant="indigo">{selectedDeal.stage}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Contact</h4>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <UserCheck className="h-5 w-5 text-indigo-500" />
                <div>
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">{selectedDeal.contact}</span>
                  <span className="text-[11px] text-slate-400 block">{selectedDeal.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity History</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="font-bold text-slate-900 dark:text-white">Proposal Sent</span>
                  <p className="text-slate-500 mt-0.5">Sent initial $45,000 SLA contract proposal.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="font-bold text-slate-900 dark:text-white">Discovery Call Completed</span>
                  <p className="text-slate-500 mt-0.5">Discussed custom ERP workflow requirements.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* New Deal Modal */}
      <Modal
        isOpen={isNewDealOpen}
        onClose={() => setIsNewDealOpen(false)}
        title="Create New Sales Deal"
      >
        <form onSubmit={handleCreateDeal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deal Title</label>
            <input
              type="text"
              required
              placeholder="e.g. ERP License Expansion"
              value={newDeal.title}
              onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Wayne Enterprises"
              value={newDeal.company}
              onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deal Value ($)</label>
              <input
                type="text"
                required
                placeholder="$35,000"
                value={newDeal.value}
                onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Stage</label>
              <select
                value={newDeal.stage}
                onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="Lead">Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
            <input
              type="text"
              required
              placeholder="e.g. Lucius Fox"
              value={newDeal.contact}
              onChange={(e) => setNewDeal({ ...newDeal, contact: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewDealOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              Add Deal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CrmView;
