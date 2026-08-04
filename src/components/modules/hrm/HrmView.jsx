import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  INITIAL_EMPLOYEES,
  HRM_LEAVE_REQUESTS,
  HRM_TIME_TRACKING,
  HRM_DEPARTMENTS,
  HRM_PAYROLL_SUMMARY
} from '../../../data/mockData';
import {
  UserCheck,
  Plus,
  Users,
  Calendar,
  Clock,
  Building,
  DollarSign,
  CheckCircle,
  FileText
} from 'lucide-react';

const HrmView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('directory');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [leaves, setLeaves] = useState(HRM_LEAVE_REQUESTS);

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: Users },
    { id: 'attendance', label: 'Attendance & Check-Ins', icon: UserCheck },
    { id: 'leave', label: 'Leave Management', icon: Calendar },
    { id: 'time_tracking', label: 'Time Tracking & Timesheets', icon: Clock },
    { id: 'departments', label: 'Departments & Headcount', icon: Building },
    { id: 'payroll', label: 'Payroll Summary', icon: DollarSign }
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

      {/* TAB 1: EMPLOYEE DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Employee Directory & Corporate Roles
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">View team members, department allocations, and employment status.</p>
            </div>
            <button
              onClick={() => addToast("Onboard Employee modal opened", "info")}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-2xs"
            >
              <Plus className="h-4 w-4" />
              <span>Onboard Employee</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employees.map((emp) => (
              <div key={emp.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">{emp.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{emp.role}</p>
                    <span className="text-[10px] text-slate-500 font-medium">{emp.department}</span>
                  </div>
                </div>

                <div className="space-y-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <p>Email: {emp.email}</p>
                  <p>Phone: {emp.phone}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    emp.status === 'Remote' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                    'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {emp.status}
                  </span>
                  <span className="text-slate-900 dark:text-white">{emp.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Team Attendance & Clock-In Log
          </h2>
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Today's Team Attendance Rate</span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">96.8% Present (44 / 46)</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Live Sync
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: LEAVE MANAGEMENT */}
      {activeTab === 'leave' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Leave Requests & Approvals
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Req ID</th>
                  <th className="p-3.5">Employee</th>
                  <th className="p-3.5">Leave Type</th>
                  <th className="p-3.5">Dates</th>
                  <th className="p-3.5">Reason</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {leaves.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{l.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{l.employee}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{l.type} ({l.days} days)</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{l.dates}</td>
                    <td className="p-3.5 text-slate-500">{l.reason}</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TIME TRACKING */}
      {activeTab === 'time_tracking' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Task Time Tracking & Timesheets (Worksuite Style)
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Log ID</th>
                  <th className="p-3.5">Employee</th>
                  <th className="p-3.5">Project / Order</th>
                  <th className="p-3.5">Task Description</th>
                  <th className="p-3.5">Logged Hours</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {HRM_TIME_TRACKING.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{t.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t.employee}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{t.project}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{t.task}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t.hours}</td>
                    <td className="p-3.5 text-slate-500">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: DEPARTMENTS */}
      {activeTab === 'departments' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Departments & Headcount Hierarchy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HRM_DEPARTMENTS.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">{d.id}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{d.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Department Head: <span className="font-semibold text-slate-900 dark:text-white">{d.head}</span></p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs font-bold">
                  <span>Headcount: {d.headcount} Staff</span>
                  <span className="text-indigo-600">{d.budget} / yr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PAYROLL */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Payroll Summary & Disbursements
          </h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Payroll Cycle</th>
                  <th className="p-3.5">Month</th>
                  <th className="p-3.5">Staff Count</th>
                  <th className="p-3.5">Gross Payroll</th>
                  <th className="p-3.5">Net Paid</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                {HRM_PAYROLL_SUMMARY.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-indigo-600 dark:text-indigo-400">{p.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{p.month}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{p.totalEmployees}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{p.grossPayroll}</td>
                    <td className="p-3.5 font-bold text-emerald-600">{p.netPaid}</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{p.status}</span></td>
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

export default HrmView;
