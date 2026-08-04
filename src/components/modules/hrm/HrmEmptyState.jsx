import React from 'react';
import { PackageOpen } from 'lucide-react';

const HrmEmptyState = ({
  icon: Icon = PackageOpen,
  title = "No data available",
  description = "There are no records to display at this time.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="py-8 px-4 text-center flex flex-col items-center justify-center w-full min-w-0">
      <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3 shadow-xs">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading">
        {title}
      </h4>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mt-1 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default HrmEmptyState;
