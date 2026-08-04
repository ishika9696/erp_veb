import React, { useState } from 'react';
import { BILLING_PLANS } from '../../../data/mockData';
import Modal from '../../ui/Modal';
import { useApp } from '../../../context/AppContext';
import { Check, Zap, Shield, HardDrive, Users, FileText, ArrowRight } from 'lucide-react';

const BillingView = () => {
  const { addToast } = useApp();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const confirmUpgrade = () => {
    setIsModalOpen(false);
    addToast(`Successfully updated subscription to ${selectedPlan.name}!`, "success");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Current Usage Meter Strip */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Active Subscription</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Professional SaaS Plan ($299 / month)
            </h3>
          </div>
          <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
            Auto-renews Aug 28, 2026
          </span>
        </div>

        {/* Usage Progress Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Meter 1 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500 flex items-center gap-1.5"><Users className="h-4 w-4 text-indigo-500" /> Active Employees</span>
              <span className="text-slate-900 dark:text-white">34 / 50</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: '68%' }} />
            </div>
          </div>

          {/* Meter 2 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500 flex items-center gap-1.5"><HardDrive className="h-4 w-4 text-emerald-500" /> Cloud File Storage</span>
              <span className="text-slate-900 dark:text-white">18.4 GB / 50 GB</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '36.8%' }} />
            </div>
          </div>

          {/* Meter 3 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500 flex items-center gap-1.5"><FileText className="h-4 w-4 text-amber-500" /> Monthly Invoices</span>
              <span className="text-slate-900 dark:text-white">850 / 1,000</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Header & Cycle Toggle */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
          Flexible SaaS Pricing Plans
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Scale your enterprise operations seamlessly. Save up to 20% with annual billing.
        </p>

        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Yearly Billing <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded-md font-bold">20% Off</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BILLING_PLANS.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between relative transition-all ${
              plan.popular
                ? 'border-2 border-indigo-600 shadow-xl shadow-indigo-500/10'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{plan.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-xs text-slate-400 font-medium">{plan.billingCycle}</span>
              </div>

              <div className="space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-4">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan(plan)}
              className={`mt-8 w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                  : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Plan Upgrade Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Plan Change"
      >
        {selectedPlan && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              You are selecting to upgrade/switch to the <strong>{selectedPlan.name}</strong> at{' '}
              <strong>{selectedPlan.price} {selectedPlan.billingCycle}</strong>.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span>New Monthly Total:</span>
                <span className="font-bold">{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing Period:</span>
                <span className="capitalize">{billingCycle}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
              >
                Confirm Plan Upgrade
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BillingView;
