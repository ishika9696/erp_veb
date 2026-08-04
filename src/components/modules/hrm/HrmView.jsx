import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import HrmWidgetCard from './HrmWidgetCard';
import HrmEmptyState from './HrmEmptyState';
import {
  INITIAL_EMPLOYEES,
  HRM_LEAVE_TYPES,
  HRM_LEAVE_REQUESTS,
  HRM_ATTENDANCE_LOGS,
  HRM_PAYROLL_SUMMARY,
  HRM_HOLIDAYS,
  HRM_DEPARTMENTS,
  HRM_DESIGNATIONS,
  HRM_SALES_TARGETS,
  HRM_SALES_TARGET_CHART,
  HRM_BIRTHDAYS,
  HRM_SETTINGS_DATA
} from '../../../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  DollarSign,
  Gift,
  Building,
  Award,
  TrendingUp,
  Settings,
  Plus,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Briefcase,
  ChevronRight,
  Download,
  Filter,
  Eye,
  X,
  Search,
  Check
} from 'lucide-react';

const HrmView = () => {
  const { addToast } = useApp();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Module Data States
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [leaveTypes, setLeaveTypes] = useState(HRM_LEAVE_TYPES);
  const [leaveRequests, setLeaveRequests] = useState(HRM_LEAVE_REQUESTS);
  const [attendanceLogs, setAttendanceLogs] = useState(HRM_ATTENDANCE_LOGS);
  const [payrollRuns, setPayrollRuns] = useState(HRM_PAYROLL_SUMMARY);
  const [holidays, setHolidays] = useState(HRM_HOLIDAYS);
  const [departments, setDepartments] = useState(HRM_DEPARTMENTS);
  const [designations, setDesignations] = useState(HRM_DESIGNATIONS);
  const [salesTargets, setSalesTargets] = useState(HRM_SALES_TARGETS);
  const [birthdayFilter, setBirthdayFilter] = useState('all');
  const [settings, setSettings] = useState(HRM_SETTINGS_DATA);

  // Modal / Drawer States
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [showAddLeaveTypeModal, setShowAddLeaveTypeModal] = useState(false);
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showAddDesignationModal, setShowAddDesignationModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(null);
  const [showSetTargetModal, setShowSetTargetModal] = useState(false);

  // Form States
  const [newLeave, setNewLeave] = useState({ employee: 'David Chen', type: 'Annual Leave', startDate: '2026-08-15', endDate: '2026-08-17', reason: '' });
  const [newLeaveType, setNewLeaveType] = useState({ name: '', quota: 12, paid: true });
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'Company Holiday', recurring: false });
  const [newDept, setNewDept] = useState({ name: '', code: '', head: 'Sarah Jenkins', budget: '$500,000' });
  const [newDesignation, setNewDesignation] = useState({ title: '', department: 'Executive & Management', level: 'Mid-Level', minSalary: '$80,000', maxSalary: '$110,000' });

  // Sub-Navigation Tabs
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leavetype', label: 'Leave Type', icon: Briefcase },
    { id: 'leave', label: 'Leave', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'holiday', label: 'Holiday', icon: Gift },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'designations', label: 'Designations', icon: Award },
    { id: 'salestargets', label: 'Sales Targets', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Action Handlers
  const handleApproveLeave = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    addToast(`Leave request ${id} approved`, "success");
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    addToast(`Leave request ${id} rejected`, "info");
  };

  const handleCreateLeaveRequest = (e) => {
    e.preventDefault();
    const newReq = {
      id: `LR-${100 + leaveRequests.length + 1}`,
      employee: newLeave.employee,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      type: newLeave.type,
      dates: `${newLeave.startDate} to ${newLeave.endDate}`,
      days: 3,
      status: "Pending",
      reason: newLeave.reason || "Personal Leave",
      balanceLeft: 10
    };
    setLeaveRequests([newReq, ...leaveRequests]);
    setShowApplyLeaveModal(false);
    addToast("Leave request submitted successfully", "success");
  };

  const handleCreateLeaveType = (e) => {
    e.preventDefault();
    if (!newLeaveType.name) return;
    const item = {
      id: `LT-0${leaveTypes.length + 1}`,
      name: newLeaveType.name,
      quota: Number(newLeaveType.quota),
      paid: newLeaveType.paid,
      autoApprove: false,
      description: "Custom configured leave type"
    };
    setLeaveTypes([...leaveTypes, item]);
    setShowAddLeaveTypeModal(false);
    setNewLeaveType({ name: '', quota: 12, paid: true });
    addToast("New leave type created", "success");
  };

  const handleCreateHoliday = (e) => {
    e.preventDefault();
    if (!newHoliday.name || !newHoliday.date) return;
    const item = {
      id: `HOL-0${holidays.length + 1}`,
      name: newHoliday.name,
      date: newHoliday.date,
      day: "Configured Day",
      status: "Upcoming",
      recurring: newHoliday.recurring,
      type: newHoliday.type
    };
    setHolidays([...holidays, item]);
    setShowAddHolidayModal(false);
    setNewHoliday({ name: '', date: '', type: 'Company Holiday', recurring: false });
    addToast("Holiday added to calendar", "success");
  };

  const handleCreateDepartment = (e) => {
    e.preventDefault();
    if (!newDept.name) return;
    const item = {
      id: `DEP-${departments.length + 1}`,
      name: newDept.name,
      code: newDept.code || "DEPT",
      head: newDept.head,
      headcount: 1,
      budget: newDept.budget,
      description: "Newly established operational department."
    };
    setDepartments([...departments, item]);
    setShowAddDeptModal(false);
    setNewDept({ name: '', code: '', head: 'Sarah Jenkins', budget: '$500,000' });
    addToast("Department created", "success");
  };

  const handleCreateDesignation = (e) => {
    e.preventDefault();
    if (!newDesignation.title) return;
    const item = {
      id: `DSG-0${designations.length + 1}`,
      title: newDesignation.title,
      department: newDesignation.department,
      level: newDesignation.level,
      headcount: 1,
      minSalary: newDesignation.minSalary,
      maxSalary: newDesignation.maxSalary
    };
    setDesignations([...designations, item]);
    setShowAddDesignationModal(false);
    setNewDesignation({ title: '', department: 'Executive & Management', level: 'Mid-Level', minSalary: '$80,000', maxSalary: '$110,000' });
    addToast("Designation role added", "success");
  };

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'present' || s === 'completed' || s === 'on track') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <CheckCircle className="h-3 w-3" aria-hidden="true" />
          {status}
        </span>
      );
    }
    if (s === 'pending' || s === 'late' || s === 'processing' || s === 'needs attention') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60">
        <XCircle className="h-3 w-3" aria-hidden="true" />
        {status}
      </span>
    );
  };

  // Filtered Birthdays
  const filteredBirthdays = birthdayFilter === 'empty' ? [] : (
    birthdayFilter === 'today' ? HRM_BIRTHDAYS.filter(b => b.isToday) : HRM_BIRTHDAYS
  );

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            HRM & Team Management
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Workforce attendance, leaves, payroll disbursements, sales targets, and organizational structure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApplyLeaveModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Apply Leave</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: HRM DASHBOARD (7 WIDGETS GRID) */}
      {/* ========================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Row 1: Top 3 Core Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Widget 1: My Leaves */}
            <HrmWidgetCard
              title="My Leaves"
              subtitle="Annual & Sick leave quota balances"
              icon={Calendar}
              iconColor="indigo"
              action={
                <button
                  onClick={() => setShowApplyLeaveModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Apply Leave
                </button>
              }
            >
              <div className="space-y-3">
                {/* Quota Badges Grid */}
                <div className="grid grid-cols-4 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">Annual</span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">12 / 18</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">Sick</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">8 / 10</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">Casual</span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">5 / 7</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">Unpaid</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">30 / 30</span>
                  </div>
                </div>

                {/* Recent Leave Requests List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Recent Leave Requests</span>
                  {leaveRequests.slice(0, 2).map((l) => (
                    <div key={l.id} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">{l.employee}</span>
                        <span className="text-[11px] text-slate-500 block truncate">{l.type} • {l.dates}</span>
                      </div>
                      {renderStatusBadge(l.status)}
                    </div>
                  ))}
                </div>
              </div>
            </HrmWidgetCard>

            {/* Widget 2: My Sales Targets */}
            <HrmWidgetCard
              title="My Sales Targets"
              subtitle="Monthly target vs actual performance"
              icon={TrendingUp}
              iconColor="emerald"
            >
              <div className="space-y-3">
                {/* KPI Trend Row */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">This Month Achieved</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">$142,000</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="h-4 w-4" /> +13.6%
                    </span>
                    <span className="text-[10px] text-slate-500 block">vs last mo $125k</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Current Target ($150,000)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">94.6%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: '94.6%' }} />
                  </div>
                </div>

                {/* Small Target vs Commission Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800">
                        <th className="py-1">Rep</th>
                        <th className="py-1">Target</th>
                        <th className="py-1 text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                      {salesTargets.slice(0, 2).map((s) => (
                        <tr key={s.id}>
                          <td className="py-1.5 font-bold text-slate-900 dark:text-white truncate">{s.employee}</td>
                          <td className="py-1.5 text-slate-600 dark:text-slate-400">{s.thisMonth} / {s.target}</td>
                          <td className="py-1.5 text-right font-bold text-emerald-600">{s.commissionRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </HrmWidgetCard>

            {/* Widget 3: Birthdays */}
            <HrmWidgetCard
              title="Birthdays"
              subtitle="Celebrate team members' birthdays"
              icon={Gift}
              iconColor="purple"
              action={
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setBirthdayFilter('all')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${birthdayFilter === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs' : 'text-slate-500'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setBirthdayFilter('today')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${birthdayFilter === 'today' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs' : 'text-slate-500'}`}
                  >
                    Today
                  </button>
                </div>
              }
            >
              {filteredBirthdays.length === 0 ? (
                <HrmEmptyState
                  icon={Gift}
                  title="No birthdays matching filter"
                  description="There are no upcoming team birthdays found for the selected view filter."
                />
              ) : (
                <div className="space-y-2.5">
                  {filteredBirthdays.map((b) => (
                    <div key={b.id} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={b.avatar} alt={b.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{b.name}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{b.role}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${b.isToday ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                        {b.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </HrmWidgetCard>
          </div>

          {/* Row 2: Widgets 4, 5, 6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Widget 4: Active Users */}
            <HrmWidgetCard
              title="Users & Directory"
              subtitle="Active staff online & directory"
              icon={Users}
              iconColor="sky"
              action={
                <button
                  onClick={() => setActiveTab('departments')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  View Directory <ChevronRight className="h-3.5 w-3.5" />
                </button>
              }
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Users Today</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">46 Employees</span>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                </div>

                <div className="space-y-2">
                  {employees.slice(0, 3).map((emp) => (
                    <div key={emp.id} className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative">
                          <img src={emp.avatar} alt={emp.name} className="h-7 w-7 rounded-full object-cover shrink-0" />
                          <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-white dark:ring-slate-900 ${emp.isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white truncate">{emp.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">{emp.department}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HrmWidgetCard>

            {/* Widget 5: Leaves (Absence Today) */}
            <HrmWidgetCard
              title="Leaves & Absences"
              subtitle="Staff currently on leave today"
              icon={Clock}
              iconColor="amber"
              action={
                <button
                  onClick={() => setActiveTab('leave')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Full Leave Page <ChevronRight className="h-3.5 w-3.5" />
                </button>
              }
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-200/50 dark:border-amber-900/50">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase block">On Leave Today</span>
                    <span className="text-xl font-extrabold text-amber-800 dark:text-amber-300">2 Employees</span>
                  </div>
                  <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400 opacity-80" />
                </div>

                <div className="space-y-2">
                  {leaveRequests.filter(l => l.status === 'Approved' || l.status === 'Pending').slice(0, 2).map((l) => (
                    <div key={l.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60 text-xs">
                      <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                        <span>{l.employee}</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400">{l.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{l.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HrmWidgetCard>

            {/* Widget 6: Holidays */}
            <HrmWidgetCard
              title="Company Holidays"
              subtitle="Upcoming official holidays"
              icon={Gift}
              iconColor="indigo"
              action={
                <button
                  onClick={() => setActiveTab('holiday')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Holiday Calendar <ChevronRight className="h-3.5 w-3.5" />
                </button>
              }
            >
              <div className="space-y-2.5">
                {holidays.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60 text-xs">
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-slate-900 dark:text-white block truncate">{h.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{h.type}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] shrink-0">
                      {h.date}
                    </span>
                  </div>
                ))}
              </div>
            </HrmWidgetCard>
          </div>

          {/* Row 3: Widget 7 - Prominent My Payrolls CTA Banner */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-emerald-400 shrink-0" />
                <h3 className="text-lg font-bold font-heading">My Payrolls & Disbursement History</h3>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Access your monthly payslips, tax withholding breakdowns, direct deposit confirmations, and payroll run summaries.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('payroll')}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>View Payroll History & Payslips</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: LEAVE TYPE */}
      {/* ========================================================= */}
      {activeTab === 'leavetype' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Leave Categories & Annual Quotas</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Configure leave types, annual day limits, and paid status.</p>
            </div>
            <button
              onClick={() => setShowAddLeaveTypeModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Leave Type
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leaveTypes.map((lt) => (
              <div key={lt.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">{lt.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${lt.paid ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {lt.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{lt.name}</h3>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Annual Quota</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{lt.quota} Days / yr</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{lt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: LEAVE (REQUESTS TABLE & APPROVALS) */}
      {/* ========================================================= */}
      {activeTab === 'leave' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Leave Requests & Manager Approvals</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Review pending employee leave applications and balance logs.</p>
            </div>
            <button
              onClick={() => setShowApplyLeaveModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Apply Leave
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Req ID</th>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Leave Type</th>
                    <th className="p-4">Dates & Duration</th>
                    <th className="p-4">Reason</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {leaveRequests.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{l.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img src={l.avatar} alt={l.employee} className="h-7 w-7 rounded-full object-cover shrink-0" />
                          <span className="font-bold text-slate-900 dark:text-white">{l.employee}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{l.type}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{l.dates} ({l.days} days)</td>
                      <td className="p-4 text-slate-500 max-w-xs truncate">{l.reason}</td>
                      <td className="p-4">{renderStatusBadge(l.status)}</td>
                      <td className="p-4 text-right">
                        {l.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleApproveLeave(l.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectLeave(l.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No action needed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: ATTENDANCE */}
      {/* ========================================================= */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Daily Attendance & Time Log Overview</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Clock-in/out timestamps, tardiness flags, and shift compliance.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Today's Sync: 96.8% Present
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Employee</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Clock In</th>
                    <th className="p-4">Clock Out</th>
                    <th className="p-4">Work Hours</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {attendanceLogs.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <img src={att.avatar} alt={att.employee} className="h-8 w-8 rounded-full object-cover shrink-0" />
                          <span className="font-bold text-slate-900 dark:text-white">{att.employee}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{att.department}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{att.clockIn}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{att.clockOut}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{att.workHours}</td>
                      <td className="p-4">{renderStatusBadge(att.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PAYROLL */}
      {/* ========================================================= */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Payroll Runs & Payslip Generator</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Monthly payroll processing, gross salary totals, and net payments.</p>
            </div>
            <button
              onClick={() => addToast("Generated new payroll batch run for August 2026", "success")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Run Payroll Batch
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Batch ID</th>
                    <th className="p-4">Payroll Month</th>
                    <th className="p-4">Employees</th>
                    <th className="p-4">Gross Payroll</th>
                    <th className="p-4">Deductions</th>
                    <th className="p-4">Net Paid</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Payslip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {payrollRuns.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{p.id}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{p.month}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{p.totalEmployees} Staff</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{p.grossPayroll}</td>
                      <td className="p-4 text-rose-600 dark:text-rose-400 font-semibold">{p.deductions}</td>
                      <td className="p-4 font-bold text-emerald-600">{p.netPaid}</td>
                      <td className="p-4">{renderStatusBadge(p.status)}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setShowPayslipModal(p)}
                          className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" /> View Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: HOLIDAY */}
      {/* ========================================================= */}
      {activeTab === 'holiday' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Company Holiday Calendar</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Official company holidays, national observances, and annual leave schedules.</p>
            </div>
            <button
              onClick={() => setShowAddHolidayModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Holiday
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {holidays.map((h) => (
              <div key={h.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {h.type}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {h.recurring ? 'Annual Recurring' : 'One-Time'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{h.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>{h.date} ({h.day})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: DEPARTMENTS */}
      {/* ========================================================= */}
      {activeTab === 'departments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Departments & Organizational Structure</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Department leads, staff headcounts, and annual operational budgets.</p>
            </div>
            <button
              onClick={() => setShowAddDeptModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Department
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{d.code}</span>
                  <span className="text-xs font-bold text-slate-500">{d.headcount} Team Members</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{d.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{d.description}</p>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Head: {d.head}</span>
                  <span className="text-emerald-600">{d.budget} / yr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 8: DESIGNATIONS */}
      {/* ========================================================= */}
      {activeTab === 'designations' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Job Designations & Corporate Roles</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Position titles, hierarchy levels, and benchmark salary ranges.</p>
            </div>
            <button
              onClick={() => setShowAddDesignationModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Designation
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Role ID</th>
                    <th className="p-4">Designation Title</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Hierarchy Level</th>
                    <th className="p-4">Active Staff</th>
                    <th className="p-4 text-right">Salary Band</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {designations.map((dsg) => (
                    <tr key={dsg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{dsg.id}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{dsg.title}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{dsg.department}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{dsg.level}</td>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">{dsg.headcount} Staff</td>
                      <td className="p-4 text-right font-bold text-emerald-600">{dsg.minSalary} - {dsg.maxSalary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 9: SALES TARGETS */}
      {/* ========================================================= */}
      {activeTab === 'salestargets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">Sales Target & Commission Performance</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Track monthly sales quota achievements and calculated incentive commissions.</p>
            </div>
            <button
              onClick={() => setShowSetTargetModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Set Target
            </button>
          </div>

          {/* Target Trend Chart (Matching Manufacturing Yield Recharts style) */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading mb-1">
              Monthly Sales Target vs Actual Revenue ($)
            </h3>
            <p className="text-xs text-slate-500 mb-4">Target quota baseline vs booked actual sales volume over 6 months.</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HRM_SALES_TARGET_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`$${val.toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="achieved" name="Actual Revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorAchieved)" />
                  <Area type="monotone" dataKey="target" name="Target Quota" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTarget)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Targets Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Sales Representative</th>
                    <th className="p-4">Last Month</th>
                    <th className="p-4">This Month</th>
                    <th className="p-4">Target Quota</th>
                    <th className="p-4">Commission %</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs font-medium">
                  {salesTargets.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <img src={st.avatar} alt={st.employee} className="h-8 w-8 rounded-full object-cover shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{st.employee}</span>
                            <span className="text-[10px] text-slate-500 block">{st.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{st.lastMonth}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{st.thisMonth}</td>
                      <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{st.target}</td>
                      <td className="p-4 font-bold text-emerald-600">{st.commissionRate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 w-32">
                          <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(st.achievedPct, 100)}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{st.achievedPct}%</span>
                        </div>
                      </td>
                      <td className="p-4">{renderStatusBadge(st.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 10: SETTINGS */}
      {/* ========================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">HRM Policy & System Configuration</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Configure default leave quotas, payroll disbursement schedules, and automated alerts.</p>
          </div>

          <div className="space-y-6">
            {/* Leave Policy Settings */}
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" /> Leave Policy Defaults
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Working Days / Week</label>
                  <input
                    type="number"
                    value={settings.leavePolicy.workingDaysPerWeek}
                    onChange={(e) => setSettings({ ...settings, leavePolicy: { ...settings.leavePolicy, workingDaysPerWeek: Number(e.target.value) } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Carry-Forward Days / Year</label>
                  <input
                    type="number"
                    value={settings.leavePolicy.carryForwardLimit}
                    onChange={(e) => setSettings({ ...settings, leavePolicy: { ...settings.leavePolicy, carryForwardLimit: Number(e.target.value) } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Payroll Cycle Settings */}
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" /> Payroll Cycle & Tax Withholding
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payroll Frequency</label>
                  <select
                    value={settings.payrollCycle.frequency}
                    onChange={(e) => setSettings({ ...settings, payrollCycle: { ...settings.payrollCycle, frequency: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Tax Deduction Benchmark</label>
                  <input
                    type="text"
                    value={settings.payrollCycle.taxDeductionRate}
                    onChange={(e) => setSettings({ ...settings, payrollCycle: { ...settings.payrollCycle, taxDeductionRate: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast("HRM system settings saved successfully", "success")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS & DRAWERS */}
      {/* ========================================================= */}

      {/* MODAL 1: APPLY LEAVE */}
      {showApplyLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowApplyLeaveModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Submit Leave Request</h3>
              <button onClick={() => setShowApplyLeaveModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateLeaveRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Employee</label>
                <select
                  value={newLeave.employee}
                  onChange={(e) => setNewLeave({ ...newLeave, employee: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.role})</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  {leaveTypes.map(t => <option key={t.id} value={t.name}>{t.name} ({t.quota} days max)</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">From Date</label>
                  <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">To Date</label>
                  <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  placeholder="Provide reason for leave request..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowApplyLeaveModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD LEAVE TYPE */}
      {showAddLeaveTypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowAddLeaveTypeModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Add Leave Category</h3>
              <button onClick={() => setShowAddLeaveTypeModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateLeaveType} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Leave Type Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Parental Leave, Study Leave"
                  value={newLeaveType.name}
                  onChange={(e) => setNewLeaveType({ ...newLeaveType, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Quota (Days)</label>
                <input
                  type="number"
                  required
                  value={newLeaveType.quota}
                  onChange={(e) => setNewLeaveType({ ...newLeaveType, quota: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="paidCheck"
                  checked={newLeaveType.paid}
                  onChange={(e) => setNewLeaveType({ ...newLeaveType, paid: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
                <label htmlFor="paidCheck" className="font-semibold text-slate-700 dark:text-slate-300">Paid Leave Category</label>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddLeaveTypeModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Create Leave Type</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD HOLIDAY */}
      {showAddHolidayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowAddHolidayModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Add Company Holiday</h3>
              <button onClick={() => setShowAddHolidayModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateHoliday} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Holiday Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Year's Day"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Holiday Date</label>
                <input
                  type="date"
                  required
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="recurringCheck"
                  checked={newHoliday.recurring}
                  onChange={(e) => setNewHoliday({ ...newHoliday, recurring: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
                <label htmlFor="recurringCheck" className="font-semibold text-slate-700 dark:text-slate-300">Annual Recurring Holiday</label>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddHolidayModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer">Add Holiday</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PAYSLIP PREVIEW */}
      {showPayslipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowPayslipModal(null)} />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl z-50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">Official Employee Payslip</h3>
                <p className="text-xs text-slate-500">{showPayslipModal.month} • {showPayslipModal.id}</p>
              </div>
              <button onClick={() => setShowPayslipModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500 font-semibold">Gross Payroll Salary:</span>
                <span className="font-bold text-slate-900 dark:text-white">{showPayslipModal.grossPayroll}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500 font-semibold">Tax & Benefit Deductions:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">-{showPayslipModal.deductions}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-900 dark:text-white font-bold text-sm">Net Disbursed Amount:</span>
                <span className="font-extrabold text-emerald-600 text-sm">{showPayslipModal.netPaid}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Status: {showPayslipModal.status} ({showPayslipModal.datePaid})</span>
              <button
                onClick={() => {
                  setShowPayslipModal(null);
                  addToast("Payslip PDF downloaded", "info");
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="h-4 w-4" /> Download PDF Payslip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrmView;
