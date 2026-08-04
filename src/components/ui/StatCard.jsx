import React from 'react';
import * as LucideIcons from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, period, icon, color = 'indigo', chartData = [] }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.TrendingUp;

  const colorVariants = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/50',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/50',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/50'
  };

  const isNumericTrend = change && (change.startsWith('+') || change.startsWith('-'));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between h-full min-h-[156px]">
      {/* Label and Icon Row - Strict Vertically Centered */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{title}</span>
        <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${colorVariants[color]}`}>
          <IconComponent className="h-4 w-4" />
        </div>
      </div>

      {/* Value and Trend / Caption Row */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none truncate">{value}</h3>
          
          {/* Badge + Caption Row normalized across all 4 cards */}
          <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs font-medium">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap shrink-0 ${
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60'
              }`}
            >
              {isNumericTrend && (
                isPositive ? (
                  <LucideIcons.ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <LucideIcons.ArrowDownRight className="h-3.5 w-3.5" />
                )
              )}
              {change}
            </span>

            {period && (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate max-w-[130px] whitespace-nowrap" title={period}>
                {period}
              </span>
            )}
          </div>
        </div>

        {/* Mini Sparkline Visualization */}
        {chartData.length > 0 && (
          <div className="flex items-end gap-1 h-8 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 mb-0.5">
            {chartData.map((val, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-t ${
                  isPositive ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-rose-500 dark:bg-rose-400'
                }`}
                style={{ height: `${(val / Math.max(...chartData)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
