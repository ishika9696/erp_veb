import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children, width = "max-w-md" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className={`w-screen ${width} transform border-l border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition duration-300 ease-in-out`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="h-[calc(100vh-65px)] overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
