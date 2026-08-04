import React, { useState } from 'react';
import StatCard from '../../ui/StatCard';
import {
  INITIAL_STATS,
  PRODUCTION_TREND_DATA,
  CRM_LEADS_DATA,
  RECENT_ACTIVITIES,
  UPCOMING_TASKS
} from '../../../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Factory, ArrowRight, Clock, Plus, CheckSquare } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const DashboardView = () => {
  const { setActiveModule, addToast } = useApp();
  const [tasks, setTasks] = useState(UPCOMING_TASKS);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    addToast("Task status updated", "info");
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Executive KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch w-full min-w-0">
        {INITIAL_STATS.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Analytics Row: Production Yield Line Chart + Pipeline Shares Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Production Output Trend Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 w-full">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Factory className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden="true" />
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Manufacturing Yield & Production Output
                </h2>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Monthly planned output vs actual finished goods & scrap wastage (Units)
              </p>
            </div>

            <button
              onClick={() => setActiveModule('manufacturing')}
              aria-label="Open Bill of Materials and Work Orders"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1 shrink-0 self-start sm:self-center"
            >
              Open BOM & Orders <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="h-64 sm:h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRODUCTION_TREND_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorScrap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  tickFormatter={(val) => Number(val).toLocaleString('en-US')}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                  formatter={(val) => Number(val).toLocaleString('en-US')}
                />
                <Area type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Good Units" />
                <Area type="monotone" dataKey="wastage" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorScrap)" name="Scrap Wastage" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Distribution Donut Chart (1 col) */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                Sales Pipeline Shares
              </h2>
              <button
                onClick={() => setActiveModule('crm')}
                aria-label="View CRM and sales leads"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 inline-flex items-center gap-1 shrink-0"
              >
                View CRM <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            <div className="h-48 sm:h-52 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CRM_LEADS_DATA}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CRM_LEADS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center pointer-events-none">
                <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">$249K</span>
                <span className="text-[10px] text-slate-500 font-medium">Total Pipeline</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
            {CRM_LEADS_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2 truncate">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx] }} aria-hidden="true" />
                  <span className="text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white shrink-0 ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Live Activity Stream + Tasks & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full min-w-0">
        {/* Recent Activity Feed */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs w-full min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
              Live Operations Activity
            </h2>
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" aria-hidden="true" /> Real-time
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <img
                  src={act.avatar}
                  alt={`${act.user} profile avatar`}
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-8 sm:h-9 w-8 sm:w-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white">{act.user}</span>{' '}
                    {act.action}{' '}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{act.target}</span>
                  </p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-slate-400" aria-hidden="true" /> {act.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Widget */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                  Operations Checklist
                </h2>
              </div>
              <button
                onClick={() => addToast("Added new task", "info")}
                aria-label="Add new operation checklist task"
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200/60 dark:border-slate-800/40 opacity-60'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      aria-label={`Mark task as complete: ${task.title}`}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className={`text-xs font-semibold block truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 truncate">Due: {task.due}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      task.priority === 'Urgent'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : task.priority === 'High'
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveModule('manufacturing')}
            aria-label="Open Work Orders Board"
            className="mt-4 w-full py-2.5 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl transition-colors"
          >
            Open Work Orders Board →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
