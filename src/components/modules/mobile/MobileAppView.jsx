import React, { useState } from 'react';
import { MOBILE_TASKS, MOBILE_ATTENDANCE_LOG } from '../../../data/mockData';
import { useApp } from '../../../context/AppContext';
import {
  Smartphone,
  LayoutDashboard,
  CheckSquare,
  MapPin,
  Bell,
  User,
  Wifi,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Navigation,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

const MobileAppView = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('dash'); // 'dash' | 'tasks' | 'attendance' | 'notifications' | 'profile'
  const [tasks, setTasks] = useState(MOBILE_TASKS);
  const [attendance, setAttendance] = useState(MOBILE_ATTENDANCE_LOG);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const toggleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      if (attendance.status === "Checked In") {
        setAttendance({
          ...attendance,
          status: "Checked Out",
          checkInTime: "05:00 PM"
        });
        addToast("Checked Out with GPS Geolocation verified", "info", "Mobile Check-out");
      } else {
        setAttendance({
          ...attendance,
          status: "Checked In",
          checkInTime: "08:45 AM"
        });
        addToast("Checked In at Acme Manufacturing Facility", "success", "Mobile Check-in");
      }
      setIsCheckingIn(false);
    }, 800);
  };

  const handleCompleteTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Completed' } : t))
    );
    addToast("Task marked as completed", "success");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Description Header */}
      <div className="text-center max-w-xl">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Worksuite Style Mobile Companion
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2 font-heading">
          VEB ERP Native Mobile Companion Simulator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Simulating native mobile UX for field technicians, plant operators, and sales managers on iOS/Android.
        </p>
      </div>

      {/* Smartphone Device Frame Simulator */}
      <div className="relative w-full max-w-[380px] h-[720px] rounded-[48px] border-[10px] border-slate-900 dark:border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between ring-1 ring-slate-700/50">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="h-2 w-12 rounded-full bg-slate-800" />
        </div>

        {/* Status Bar */}
        <div className="pt-3 px-6 pb-2 bg-slate-900 text-white flex items-center justify-between text-[11px] font-semibold z-40">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Wifi className="h-3 w-3" />
            <span className="text-[9px] font-bold text-white bg-emerald-600/80 px-1.5 py-0.2 rounded-md">SYNCED</span>
          </div>
        </div>

        {/* App Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 space-y-4 text-slate-900 dark:text-slate-100">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dash' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Good Morning,</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Sarah Jenkins</h3>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                  alt="Avatar"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500"
                />
              </div>

              {/* Attendance Quick Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-90 font-medium">GPS Geolocation</span>
                  <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{attendance.status}</span>
                </div>
                <div className="text-sm font-extrabold">{attendance.location}</div>
                <button
                  onClick={toggleCheckIn}
                  disabled={isCheckingIn}
                  className="w-full py-2 bg-white text-indigo-600 font-bold text-xs rounded-xl shadow-xs hover:bg-slate-100 transition-colors"
                >
                  {isCheckingIn ? "Verifying GPS..." : attendance.status === "Checked In" ? "Check Out Now" : "Check In Now"}
                </button>
              </div>

              {/* Mobile KPIs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-bold block">My Work Orders</span>
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">4 Active</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-bold block">Plant Yield</span>
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">98.2%</span>
                </div>
              </div>

              {/* Tasks Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Today's Mobile Tasks</span>
                {tasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{t.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{t.location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Production & Field Tasks</h3>
              {tasks.map((t) => (
                <div key={t.id} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>{t.title}</span>
                    <span className="text-[10px] bg-rose-50 text-rose-600 dark:bg-rose-950 px-2 py-0.5 rounded-md">{t.priority}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{t.location}</p>

                  <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-semibold text-indigo-600">{t.status}</span>
                    {t.status !== 'Completed' && (
                      <button
                        onClick={() => handleCompleteTask(t.id)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">GPS Attendance Portal</h3>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-bold text-emerald-600">{attendance.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-in Time:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{attendance.checkInTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified GPS:</span>
                  <span className="font-mono text-[10px]">{attendance.coordinates}</span>
                </div>
              </div>

              {/* Simulated Map Container */}
              <div className="h-36 rounded-2xl bg-indigo-900/20 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-400 font-semibold flex-col gap-1">
                <MapPin className="h-6 w-6 text-indigo-500 animate-bounce" />
                <span>GPS Location Pin Verified</span>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Push Notification Center</h3>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">Work Order Completed</span>
                <span className="text-[10px] text-slate-400">WO-889 Smart RFID Scanner Gun batch completed.</span>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt="Sarah"
                className="h-16 w-16 rounded-full object-cover mx-auto ring-2 ring-indigo-500"
              />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Sarah Jenkins</h3>
              <span className="text-xs text-slate-400 block">VP of Operations</span>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar Navigation */}
        <div className="bg-slate-900 border-t border-slate-800 p-2 flex justify-around text-slate-400 z-40">
          <button
            onClick={() => setActiveTab('dash')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${activeTab === 'dash' ? 'text-indigo-400' : ''}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Home
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${activeTab === 'tasks' ? 'text-indigo-400' : ''}`}
          >
            <CheckSquare className="h-4 w-4" />
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${activeTab === 'attendance' ? 'text-indigo-400' : ''}`}
          >
            <MapPin className="h-4 w-4" />
            Check-In
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${activeTab === 'notifications' ? 'text-indigo-400' : ''}`}
          >
            <Bell className="h-4 w-4" />
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${activeTab === 'profile' ? 'text-indigo-400' : ''}`}
          >
            <User className="h-4 w-4" />
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAppView;
