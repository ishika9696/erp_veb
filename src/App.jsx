import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import CommandPalette from './components/layout/CommandPalette';
import QuickCreateDrawer from './components/layout/QuickCreateDrawer';
import ToastContainer from './components/ui/ToastContainer';

// Module Views
import DashboardView from './components/modules/dashboard/DashboardView';
import ServerAdminView from './components/modules/serveradmin/ServerAdminView';
import ManufacturingView from './components/modules/manufacturing/ManufacturingView';
import InventoryView from './components/modules/inventory/InventoryView';
import MobileAppView from './components/modules/mobile/MobileAppView';
import CrmView from './components/modules/crm/CrmView';
import HrmView from './components/modules/hrm/HrmView';
import AccountingView from './components/modules/accounting/AccountingView';
import PosView from './components/modules/pos/PosView';
import BillingView from './components/modules/billing/BillingView';
import SettingsView from './components/modules/settings/SettingsView';

const MainContent = () => {
  const { activeModule } = useApp();

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'serveradmin':
        return <ServerAdminView />;
      case 'manufacturing':
        return <ManufacturingView />;
      case 'inventory':
        return <InventoryView />;
      case 'mobileapp':
        return <MobileAppView />;
      case 'crm':
        return <CrmView />;
      case 'hrm':
        return <HrmView />;
      case 'accounting':
        return <AccountingView />;
      case 'pos':
        return <PosView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="flex-1 w-full max-w-full min-w-0 overflow-y-auto overflow-x-hidden p-3 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950/80 transition-colors">
      <div className="mx-auto w-full max-w-7xl min-w-0 overflow-x-hidden">
        <Header />
        {renderModule()}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen max-w-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 antialiased">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col overflow-hidden max-w-full">
          <Navbar />
          <MainContent />
        </div>
        <CommandPalette />
        <QuickCreateDrawer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
