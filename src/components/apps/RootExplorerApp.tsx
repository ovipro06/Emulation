import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Folder,
  FileText,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';
import { ROOT_FILESYSTEM } from '../../data/mockSystem';
import { FileItem } from '../../types/emulator';

export const RootExplorerApp: React.FC = () => {
  const { isRooted, showToast, addLogcat } = useEmulator();

  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isRwMounted, setIsRwMounted] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const currentFiles: FileItem[] = ROOT_FILESYSTEM[currentPath] || [
    { name: 'app', path: `${currentPath}/app`, type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', modified: '2026-09-23' },
    { name: 'config.xml', path: `${currentPath}/config.xml`, type: 'file', size: '3.4 KB', permissions: '-rw-r--r--', owner: 'root', group: 'root', modified: '2026-09-23', content: '<?xml version="1.0" encoding="utf-8"?>\n<packages>\n  <package name="com.topjohnwu.magisk" codePath="/data/app/magisk" />\n</packages>' },
  ];

  const handleNavigate = (item: FileItem) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path);
    } else {
      setSelectedFile(item);
    }
  };

  const handleBack = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    setCurrentPath('/' + parts.join('/'));
  };

  const toggleRw = () => {
    setIsRwMounted(!isRwMounted);
    showToast(isRwMounted ? 'Remounted /system as RO' : 'Remounted /system as RW via Magisk overlayfs');
    addLogcat('I', 'RootExplorer', `mount -o remount,${isRwMounted ? 'ro' : 'rw'} /system`);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-900 border-b border-white/10 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentPath !== '/' && (
              <button
                onClick={handleBack}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Root Explorer</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1 rounded border border-emerald-500/30">
                root:root
              </span>
            </h2>
          </div>

          <button
            onClick={toggleRw}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              isRwMounted
                ? 'bg-amber-600 text-white border border-amber-400/40 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle Read-Write filesystem mount"
          >
            {isRwMounted ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{isRwMounted ? 'Mount R/W' : 'Mount R/O'}</span>
          </button>
        </div>

        {/* Current Path breadcrumb */}
        <div className="bg-slate-950/80 px-2.5 py-1 rounded-xl border border-white/5 text-[11px] font-mono text-emerald-400 truncate">
          {currentPath}
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-2 divide-y divide-white/5 scrollbar-none">
        {currentFiles.map((item) => (
          <div
            key={item.path}
            onClick={() => handleNavigate(item)}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className={`p-2 rounded-xl ${
                  item.type === 'dir'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {item.type === 'dir' ? <Folder size={18} /> : <FileText size={18} />}
              </div>

              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-white block truncate">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {item.permissions} · {item.owner}:{item.group}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs shrink-0">
              {item.size && <span className="font-mono text-[10px]">{item.size}</span>}
              <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* File Inspector Modal */}
      {selectedFile && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex flex-col justify-between text-white font-mono text-xs">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <span className="text-emerald-400 font-bold truncate max-w-[240px]">
              {selectedFile.path}
            </span>
            <span className="text-slate-400 text-[10px]">{selectedFile.permissions}</span>
          </div>

          <div className="flex-1 my-3 bg-slate-950 p-3 rounded-xl border border-white/10 overflow-y-auto">
            <pre className="text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
              {selectedFile.content || `[Binary or Protected File: ${selectedFile.size || '4KB'}]`}
            </pre>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setSelectedFile(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
