import React from 'react';

const HrmWidgetCard = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'indigo',
  action,
  children,
  className = ''
}) => {
  const iconColorVariants = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/50',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/50',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/50',
    sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/50',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/50'
  };

  return (
    <div className={`rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full min-w-0 ${className}`}>
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-4 w-full min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {action}
          {Icon && (
            <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${iconColorVariants[iconColor] || iconColorVariants.indigo}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full min-w-0">
        {children}
      </div>
    </div>
  );
};

export default HrmWidgetCard;
