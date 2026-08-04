import React, { useState } from 'react';
import { INITIAL_PROJECTS } from '../../../data/mockData';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import { useApp } from '../../../context/AppContext';
import { FolderKanban, LayoutGrid, BarChart2, Plus, Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

const ProjectsView = () => {
  const { addToast } = useApp();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [viewTab, setViewTab] = useState('grid'); // 'grid' | 'kanban' | 'gantt'

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPrj, setNewPrj] = useState({ name: '', client: '', budget: '$50,000', dueDate: 'Sep 15, 2026' });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const created = {
      id: `PRJ-0${projects.length + 1}`,
      name: newPrj.name,
      client: newPrj.client,
      progress: 10,
      status: "Planning",
      dueDate: newPrj.dueDate,
      budget: newPrj.budget,
      spent: "$5,000",
      team: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      ]
    };
    setProjects([...projects, created]);
    setIsAddModalOpen(false);
    addToast(`Project "${newPrj.name}" initialized`, "success");
    setNewPrj({ name: '', client: '', budget: '$50,000', dueDate: 'Sep 15, 2026' });
  };

  // Kanban Tasks Mock
  const taskColumns = [
    {
      title: "To Do",
      color: "border-slate-300",
      tasks: [
        { id: "tk1", name: "Configure AWS S3 Bucket Backup", assignee: "Marcus V.", tag: "DevOps" },
        { id: "tk2", name: "Audit Multi-Tenant Isolation Constraints", assignee: "Priya S.", tag: "Security" }
      ]
    },
    {
      title: "In Progress",
      color: "border-indigo-500",
      tasks: [
        { id: "tk3", name: "Refactor POS Barcode Scanner Driver", assignee: "Alex R.", tag: "POS" }
      ]
    },
    {
      title: "Completed",
      color: "border-emerald-500",
      tasks: [
        { id: "tk4", name: "Design Dark Mode HSL Token Tokens", assignee: "Sarah J.", tag: "UI/UX" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewTab('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewTab === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Projects Grid
            </button>
            <button
              onClick={() => setViewTab('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewTab === 'kanban'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              Task Kanban
            </button>
            <button
              onClick={() => setViewTab('gantt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewTab === 'gantt'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              Gantt Timeline
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-semibold shadow-2xs shadow-indigo-500/20"
        >
          <Plus className="h-4 w-4" />
          Create Project
        </button>
      </div>

      {/* Grid View */}
      {viewTab === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{prj.id}</span>
                  <Badge variant={prj.status === 'In Progress' ? 'indigo' : prj.status === 'Review' ? 'amber' : 'slate'}>
                    {prj.status}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 font-heading">
                  {prj.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{prj.client}</p>

                {/* Progress Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Completion</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{prj.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${prj.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between text-xs">
                {/* Team Avatars Stack */}
                <div className="flex -space-x-2">
                  {prj.team.map((img, i) => (
                    <img key={i} src={img} alt="Team" className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                  ))}
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Budget Spend</span>
                  <span className="font-bold text-slate-900 dark:text-white">{prj.spent} / {prj.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Kanban View */}
      {viewTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {taskColumns.map((col, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">{col.title}</h4>
                <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">{col.tasks.length}</span>
              </div>
              <div className="space-y-3">
                {col.tasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">{task.tag}</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{task.name}</h5>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gantt Timeline View */}
      {viewTab === 'gantt' && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Gantt Visual Roadmap (Q3 2026)
          </h3>
          <div className="space-y-4">
            {projects.map((prj) => (
              <div key={prj.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white mb-2">
                  <span>{prj.name}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Due: {prj.dueDate}</span>
                </div>
                <div className="h-6 w-full rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-400 flex items-center justify-end px-3 text-[10px] font-bold text-white shadow-xs"
                    style={{ width: `${prj.progress}%` }}
                  >
                    {prj.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile POS Application"
              value={newPrj.name}
              onChange={(e) => setNewPrj({ ...newPrj, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Stark Industries"
              value={newPrj.client}
              onChange={(e) => setNewPrj({ ...newPrj, client: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Budget ($)</label>
              <input
                type="text"
                value={newPrj.budget}
                onChange={(e) => setNewPrj({ ...newPrj, budget: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Deadline</label>
              <input
                type="text"
                value={newPrj.dueDate}
                onChange={(e) => setNewPrj({ ...newPrj, dueDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectsView;
