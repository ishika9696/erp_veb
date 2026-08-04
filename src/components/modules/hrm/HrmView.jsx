import React, { useState } from 'react';
import { INITIAL_EMPLOYEES } from '../../../data/mockData';
import DataTable from '../../ui/DataTable';
import Drawer from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import FileUpload from '../../ui/FileUpload';
import { useApp } from '../../../context/AppContext';
import { UserCheck, Calendar, Users, Briefcase, Mail, Phone, Plus, CheckCircle, Clock, XCircle } from 'lucide-react';

const HrmView = () => {
  const { addToast } = useApp();
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'attendance'

  // Employee Profile Drawer State
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add Employee Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    department: 'Sales',
    salary: '$95,000',
    email: '',
    phone: '',
    status: 'Active'
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const created = {
      id: `EMP-00${employees.length + 1}`,
      ...newEmp,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    };
    setEmployees([...employees, created]);
    setIsAddModalOpen(false);
    addToast(`Added employee ${newEmp.name} to ${newEmp.department}`, "success");
    setNewEmp({ name: '', role: '', department: 'Sales', salary: '$95,000', email: '', phone: '', status: 'Active' });
  };

  const columns = [
    {
      header: "Employee Name",
      accessor: "name",
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={val} className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
          <div>
            <span className="font-bold block text-slate-900 dark:text-white">{val}</span>
            <span className="text-[11px] text-slate-400 block">{row.email}</span>
          </div>
        </div>
      )
    },
    { header: "Role", accessor: "role", sortable: true },
    {
      header: "Department",
      accessor: "department",
      sortable: true,
      render: (val) => (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          {val}
        </span>
      )
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'Active' ? 'emerald' : val === 'On Leave' ? 'amber' : 'indigo'}>
          {val}
        </Badge>
      )
    },
    { header: "Salary", accessor: "salary", sortable: true },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedEmp(row);
            setIsDrawerOpen(true);
          }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Profile
        </button>
      )
    }
  ];

  // Attendance Matrix Data for Calendar view
  const daysOfMonth = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'directory'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Employee Directory
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'attendance'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              Attendance Calendar
            </button>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Active Headcount: <strong className="text-slate-900 dark:text-white">{employees.length} Employees</strong>
          </span>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-semibold shadow-2xs shadow-indigo-500/20"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      {activeTab === 'directory' ? (
        <DataTable
          columns={columns}
          data={employees}
          searchPlaceholder="Search employees by name, role, email..."
          filterOptions={['Executive', 'Sales', 'Human Resources', 'Accounting', 'Engineering', 'Product']}
        />
      ) : (
        /* Attendance Matrix Calendar View */
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                August 2026 Attendance Tracker
              </h3>
              <p className="text-xs text-slate-400">Live employee check-in matrix</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-4 w-4" /> Present
              </span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Clock className="h-4 w-4" /> Leave
              </span>
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <XCircle className="h-4 w-4" /> Absent
              </span>
            </div>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">Employee</th>
                {daysOfMonth.map((day) => (
                  <th key={day} className="p-2 text-center font-semibold text-slate-500 w-10">
                    Aug {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {employees.map((emp, idx) => (
                <tr key={emp.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <img src={emp.avatar} alt={emp.name} className="h-7 w-7 rounded-lg object-cover" />
                    <span>{emp.name}</span>
                  </td>
                  {daysOfMonth.map((day) => {
                    // Simulate random attendance status for visual demo
                    const status =
                      (idx + day) % 7 === 0 ? 'L' : (idx + day) % 9 === 0 ? 'A' : 'P';
                    return (
                      <td key={day} className="p-2 text-center">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-md font-bold text-[11px] ${
                            status === 'P'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : status === 'L'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Employee Detail Profile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Employee Details"
      >
        {selectedEmp && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <img
                src={selectedEmp.avatar}
                alt={selectedEmp.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedEmp.name}</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedEmp.role}</p>
                <div className="mt-1">
                  <Badge variant={selectedEmp.status === 'Active' ? 'emerald' : 'amber'}>
                    {selectedEmp.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact & Compensation</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Email Address</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedEmp.email}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Department</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedEmp.department}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Base Salary</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedEmp.salary} / year</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Leave History</h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Annual Paid Vacation (3 Days)</span>
                <p className="text-slate-500 mt-0.5">Approved by Elena Rostova on July 14, 2026</p>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Employee"
      >
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Amanda Clark"
              value={newEmp.name}
              onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior UX Designer"
                value={newEmp.role}
                onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
              <select
                value={newEmp.department}
                onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="Executive">Executive</option>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Accounting">Accounting</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
            <input
              type="email"
              required
              placeholder="a.clark@acme.com"
              value={newEmp.email}
              onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <FileUpload label="Upload Employee ID Photo / Passport" />

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
              Add Employee
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HrmView;
