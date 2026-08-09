import React, { useState } from 'react';
import StatCard from '../../ui/StatCard';
import {
  INITIAL_STATS,
  PRODUCTION_TREND_DATA,
  CRM_LEADS_DATA,
  RECENT_ACTIVITIES,
  UPCOMING_TASKS,
  INITIAL_EMPLOYEES,
  TODAY_ATTENDANCE_DATA
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
import {
  Factory,
  ArrowRight,
  Clock,
  Plus,
  CheckSquare,
  Users,
  UserCheck,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const DashboardView = () => {
  const { setActiveModule, addToast, inventoryItems, setRawMaterialFilter } = useApp();
  const [tasks, setTasks] = useState(UPCOMING_TASKS);

  // Compute live raw materials low stock items
  const lowStockRawMaterials = inventoryItems.filter(
    (item) => item.type === 'raw_material' && Number(item.stock) <= Number(item.minStock)
  );

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    addToast("Task status updated", "info");
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Executive KPI Cards Grid - Responsive 5 Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch w-full min-w-0">
        {INITIAL_STATS.map((stat, idx) => {
          if (stat.title === "Low Stock Alerts") {
            return (
              <StatCard
                key={idx}
                {...stat}
                value={`${lowStockRawMaterials.length} Items`}
                onClick={() => {
                  setRawMaterialFilter('low_stock');
                  setActiveModule('raw_materials');
                }}
              />
            );
          }
          if (stat.title === "Total Workforce") {
            return (
              <StatCard
                key={idx}
                {...stat}
                onClick={() => {
                  setActiveModule('hrm');
                }}
              />
            );
          }
          return <StatCard key={idx} {...stat} />;
        })}
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
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1 shrink-0 self-start sm:self-center cursor-pointer"
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
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 inline-flex items-center gap-1 shrink-0 cursor-pointer"
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '12px',
                      color: '#FFF',
                      fontSize: '12px'
                    }}
                  />
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

      {/* Workforce & Team Operations Row (NEW WIDGETS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Team Snapshot & Live Shopfloor Assignments (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 w-full">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white font-heading">
                    Team Snapshot & Live Work Allocations
                  </h2>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  Active employee presence, department roles, and live shopfloor work order assignments
                </p>
              </div>

              <button
                onClick={() => setActiveModule('hrm')}
                aria-label="View All Employees in HRM"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1 shrink-0 self-start sm:self-center cursor-pointer"
              >
                View All ({INITIAL_EMPLOYEES.length}) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Employee List Items */}
            <div className="space-y-3">
              {INITIAL_EMPLOYEES.map((emp) => {
                const isPresent = emp.attendance === 'Present';
                const isLate = emp.attendance === 'Late';
                const isOnLeave = emp.attendance === 'On Leave';

                return (
                  <div
                    key={emp.id}
                    onClick={() => setActiveModule('hrm')}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
                  >
                    {/* Employee Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={emp.avatar}
                          alt={`${emp.name} avatar`}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${
                            isPresent
                              ? 'bg-emerald-500'
                              : isLate
                              ? 'bg-amber-500'
                              : isOnLeave
                              ? 'bg-blue-500'
                              : 'bg-slate-400'
                          }`}
                          title={emp.attendance || 'Active'}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                            {emp.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                            {emp.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 flex-wrap">
                          <span className="truncate">{emp.role}</span>
                          <span>•</span>
                          <span className="text-slate-600 dark:text-slate-400 font-medium">{emp.department}</span>
                        </div>
                      </div>
                    </div>

                    {/* Manufacturing Work Order Assignment & Status Badge */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between sm:justify-end shrink-0 pl-13 sm:pl-0">
                      {emp.assignedWorkOrder ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModule('manufacturing');
                          }}
                          title="View linked Work Order in Manufacturing"
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
                        >
                          <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{emp.assignedWorkOrder}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          {emp.shift || 'General Shift'}
                        </span>
                      )}

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          isPresent
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                            : isLate
                            ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60'
                            : isOnLeave
                            ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60'
                            : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
                        }`}
                      >
                        {emp.attendance || emp.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveModule('hrm')}
            aria-label="Open Employee Directory in HRM"
            className="mt-4 w-full py-2.5 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl transition-colors cursor-pointer"
          >
            Open HRM Employee Directory & Org Chart →
          </button>
        </div>

        {/* Today's Attendance Summary & Distribution (1 col) */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                  Today's Attendance
                </h2>
              </div>
              <button
                onClick={() => setActiveModule('hrm')}
                aria-label="View HRM attendance logs"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 inline-flex items-center gap-1 shrink-0 cursor-pointer"
              >
                Logs <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            {/* Attendance Donut Chart */}
            <div className="h-44 sm:h-48 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TODAY_ATTENDANCE_DATA}
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {TODAY_ATTENDANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-att-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '12px',
                      color: '#FFF',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center pointer-events-none">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">91.3%</span>
                <span className="text-[10px] text-slate-500 font-medium">42 / 46 Present</span>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="grid grid-cols-2 gap-2 mt-3 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              {TODAY_ATTENDANCE_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/60 dark:bg-slate-950/40">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white font-mono text-[11px] shrink-0 ml-1">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Department Breakdown Mini Progress */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                Presence by Department
              </span>
              <div className="space-y-1.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Manufacturing & Plant</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">23/24 (96%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Sales & Client Success</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">11/12 (92%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Finance & Accounting</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">4/6 (67%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
              </div>
            </div>
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
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0 cursor-pointer"
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
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 shrink-0 cursor-pointer"
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
            className="mt-4 w-full py-2.5 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl transition-colors cursor-pointer"
          >
            Open Work Orders Board →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
