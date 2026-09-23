import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Wrench,
  Smile,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Package,
  FileCode,
  Terminal,
  X,
} from 'lucide-react';

interface PatchTarget {
  name: string;
  pkg: string;
  hasAds: boolean;
  hasCustomPatch: boolean;
  hasInApp: boolean;
}

export const LuckyPatcherApp: React.FC = () => {
  const { isRooted, showToast, addLogcat, openApp } = useEmulator();

  const [targets] = useState<PatchTarget[]>([
    {
      name: 'Subway Runner 3D',
      pkg: 'com.kiloo.subwayrunner',
      hasAds: true,
      hasCustomPatch: true,
      hasInApp: true,
    },
    {
      name: 'Geekbench 6',
      pkg: 'com.primatelabs.geekbench6',
      hasAds: false,
      hasCustomPatch: false,
      hasInApp: true,
    },
    {
      name: 'Spotify',
      pkg: 'com.spotify.music',
      hasAds: true,
      hasCustomPatch: true,
      hasInApp: true,
    },
    {
      name: 'Instagram',
      pkg: 'com.instagram.android',
      hasAds: true,
      hasCustomPatch: false,
      hasInApp: false,
    },
  ]);

  const [selectedApp, setSelectedApp] = useState<PatchTarget | null>(null);
  const [isPatching, setIsPatching] = useState<boolean>(false);
  const [patchLogs, setPatchLogs] = useState<string[]>([]);
  const [patchSuccess, setPatchSuccess] = useState<boolean>(false);

  const startPatchSequence = (patchType: string) => {
    setIsPatching(true);
    setPatchSuccess(false);
    setPatchLogs([
      `[+] Root daemon connected: /system/bin/su`,
      `[+] Target: ${selectedApp?.pkg}`,
      `[+] Pulling /data/app/${selectedApp?.pkg}/base.apk`,
      `[+] Decompiling classes.dex with Baksmali v2.5.2...`,
    ]);

    setTimeout(() => {
      setPatchLogs((p) => [
        ...p,
        `[+] Applying patch: ${patchType}`,
        `[+] Pattern matched at offset 0x002FA18`,
        `[+] Overwriting opcode: const/4 v0, 0x1 -> return-void`,
      ]);
    }, 900);

    setTimeout(() => {
      setPatchLogs((p) => [
        ...p,
        `[+] Recompiling classes.dex with Smali...`,
        `[+] Signing modified APK with testkey certificate...`,
        `[+] Remounting systemless overlay into Magisk...`,
        `[✓] Patch applied with 100% success rate!`,
      ]);
      setIsPatching(false);
      setPatchSuccess(true);
      showToast(`${selectedApp?.name} patched successfully!`);
      addLogcat('I', 'LuckyPatcher', `Applied ${patchType} to ${selectedApp?.pkg}`);
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="px-4 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow text-lg">
            ☻
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-tight">Lucky Patcher</h1>
            <span className="text-[10px] text-amber-300">v10.9.8 • Chelpus</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 size={11} />
          <span>Root: SU Active</span>
        </div>
      </div>

      {/* Main Apps List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Installed Applications ({targets.length})
        </span>

        {targets.map((t) => (
          <div
            key={t.pkg}
            onClick={() => {
              setSelectedApp(t);
              setPatchLogs([]);
              setPatchSuccess(false);
            }}
            className="p-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-amber-500/50 cursor-pointer transition-colors space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{t.name}</span>
              <span className="text-[10px] font-mono text-slate-500">{t.pkg}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-semibold">
              {t.hasCustomPatch && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Custom patch available
                </span>
              )}
              {t.hasAds && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Google Ads Found
                </span>
              )}
              {t.hasInApp && (
                <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  InApp Purchases Found
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ACTION DIALOG FOR SELECTED APP */}
      {selectedApp && (
        <div
          className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col justify-end p-4 animate-fadeIn"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full bg-slate-900 rounded-3xl p-5 border border-white/15 space-y-4 shadow-2xl max-h-[85%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-lg">☻</span>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedApp.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{selectedApp.pkg}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Patch Terminal Log */}
            {patchLogs.length > 0 && (
              <div className="bg-black p-3 rounded-xl border border-white/10 font-mono text-[10px] space-y-1 text-slate-300 max-h-36 overflow-y-auto">
                {patchLogs.map((log, i) => (
                  <div key={i} className="text-emerald-400 leading-tight">
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Menu Options */}
            {!isPatching && (
              <div className="space-y-2 text-xs font-medium">
                {selectedApp.hasCustomPatch && (
                  <button
                    onClick={() => startPatchSequence('Custom Patch [Remove Adware & Watermark]')}
                    className="w-full p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-left flex items-center justify-between"
                  >
                    <span>Apply Custom Patch</span>
                    <Sparkles size={14} />
                  </button>
                )}

                <button
                  onClick={() => startPatchSequence('Remove Google Ads (Disable AdActivities)')}
                  className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-left flex items-center justify-between"
                >
                  <span>Remove Google Ads</span>
                  <FileCode size={14} />
                </button>

                <button
                  onClick={() => startPatchSequence('Support Patch for InApp LVL Emulation')}
                  className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-left flex items-center justify-between"
                >
                  <span>Support Patch for InApp and LVL emulation</span>
                  <Wrench size={14} />
                </button>

                <button
                  onClick={() => {
                    showToast(`Backing up APK of ${selectedApp.name}...`);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-left flex items-center justify-between"
                >
                  <span>Backup APK to /sdcard/LuckyPatcher/</span>
                  <Package size={14} />
                </button>
              </div>
            )}

            {isPatching && (
              <div className="py-4 text-center space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
                <span className="text-xs text-amber-300 font-mono block">
                  Patching smali bytecode via root...
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
