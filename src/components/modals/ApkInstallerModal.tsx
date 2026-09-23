import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Download, Upload, CheckCircle2, FileUp, Sparkles, X, ShieldAlert } from 'lucide-react';
import { PLAY_STORE_CATALOG } from '../../data/mockSystem';
import { AppDefinition } from '../../types/emulator';

export const ApkInstallerModal: React.FC = () => {
  const { isApkInstallerOpen, setIsApkInstallerOpen, installApp, installedApps, showToast } =
    useEmulator();

  const [installingId, setInstallingId] = useState<string | null>(null);
  const [customApkName, setCustomApkName] = useState<string>('');

  if (!isApkInstallerOpen) return null;

  const handleInstallPrepackaged = (app: AppDefinition) => {
    setInstallingId(app.id);
    setTimeout(() => {
      installApp(app);
      setInstallingId(null);
    }, 800);
  };

  const handleCustomUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customApkName.trim()) return;

    const newApp: AppDefinition = {
      id: `custom_${Date.now().toString(36)}`,
      name: customApkName.trim(),
      packageName: `com.sideload.${customApkName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      icon: 'Sparkles',
      category: 'user',
      isDeletable: true,
      version: '1.0.0',
      summary: 'Sideloaded custom Android APK package',
    };

    setInstallingId(newApp.id);
    setTimeout(() => {
      installApp(newApp);
      setInstallingId(null);
      setCustomApkName('');
      setIsApkInstallerOpen(false);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none font-sans"
      onClick={() => setIsApkInstallerOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Download size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                APK Sideload & Package Installer
              </h2>
              <span className="text-xs text-slate-400">
                Install third-party packages directly into Android 14
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsApkInstallerOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drag and Drop Box */}
        <form onSubmit={handleCustomUpload} className="space-y-3">
          <div className="border-2 border-dashed border-white/20 hover:border-blue-500/60 rounded-2xl p-6 flex flex-col items-center text-center bg-slate-950/50 transition-colors">
            <FileUp size={32} className="text-blue-400 mb-2" />
            <span className="text-xs font-bold text-white">Drag & drop your .APK file here</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Supports Android 14 (API 34) arm64-v8a / x86_64 binaries
            </span>

            <div className="mt-4 flex items-center gap-2 w-full max-w-xs">
              <input
                type="text"
                placeholder="Or type app name (e.g. 'Telegram')..."
                value={customApkName}
                onChange={(e) => setCustomApkName(e.target.value)}
                className="bg-slate-800 text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 flex-1 text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!customApkName.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold rounded-xl transition-all shadow"
              >
                Install
              </button>
            </div>
          </div>
        </form>

        {/* Quick Sideload Catalog */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Popular Pre-Configured Packages:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-none">
            {PLAY_STORE_CATALOG.map((app) => {
              const isInstalled = installedApps.some((a) => a.id === app.id);
              const isInstalling = installingId === app.id;

              return (
                <div
                  key={app.id}
                  className="bg-slate-950/60 p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-2"
                >
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-white block truncate">{app.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono block truncate">
                      {app.size || '32 MB'} · {app.packageName}
                    </span>
                  </div>

                  <button
                    onClick={() => handleInstallPrepackaged(app)}
                    disabled={isInstalled || isInstalling}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isInstalled
                        ? 'bg-slate-800 text-slate-500'
                        : isInstalling
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                    }`}
                  >
                    {isInstalled ? 'Installed' : isInstalling ? 'Writing...' : 'Install'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
