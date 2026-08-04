import React, { useState } from 'react';
import { UploadCloud, File, Check, X } from 'lucide-react';

const FileUpload = ({ label = "Upload File", accept = "*", onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-400'
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        {selectedFile ? (
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 w-full">
            <File className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <div className="flex-1 truncate text-xs font-medium text-slate-900 dark:text-white">
              {selectedFile.name}
              <span className="block text-[10px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
            </div>
            <p className="text-[10px] text-slate-400 mt-1">PDF, PNG, JPG, or CSV up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
