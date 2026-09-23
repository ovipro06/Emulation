import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { ShieldCheck, ShieldAlert, RefreshCw, CheckCircle, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

export const AdAwayApp: React.FC = () => {
  const { isRooted, showToast, addLogcat } = useEmulator();
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [blockedHostsCount, setBlockedHostsCount] = useState<number>(84520);

  const handleApply = () => {
    if (!isRooted) {
      showToast('AdAway Error: Root permission denied by Magisk!');
      return;
    }
    setIsUpdating(true);
    addLogcat('I', 'AdAway', 'Writing /system/etc/hosts via Magisk systemless hosts module...');

    setTimeout(() => {
      setIsUpdating(false);
      setIsEnabled(true);
      setBlockedHostsCount((prev) => prev + 1240);
      showToast('AdAway: Hosts file applied successfully (85,760 rules active)');
    }, 1200);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col justify-between p-4 select-none overflow-hidden font-sans">
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">AdAway (Root Ad-Blocker)</h2>
            <span className="text-[10px] font-mono text-emerald-400">Systemless /system/etc/hosts</span>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-white/10 text-center flex flex-col items-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg ${
              isEnabled
                ? 'bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            <ShieldCheck size={36} />
          </div>

          <h3 className="text-base font-bold text-white">
            {isEnabled ? 'Ad-blocking is active' : 'Ad-blocking is paused'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
            {isEnabled
              ? `${blockedHostsCount.toLocaleString()} advertising and tracking domains redirected to 0.0.0.0.`
              : 'Ads and trackers are allowed.'}
          </p>

          <button
            onClick={handleApply}
            disabled={isUpdating}
            className="mt-5 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-900/30 active:scale-95 transition-all"
          >
            <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
            <span>{isUpdating ? 'Applying hosts rules...' : 'Check updates & Apply'}</span>
          </button>
        </div>

        <div className="p-3 bg-slate-900 rounded-2xl border border-white/10 space-y-2 text-xs">
          <span className="font-bold text-slate-300 block">Root System Status</span>
          <div className="flex justify-between text-slate-400">
            <span>Magisk Systemless Hosts</span>
            <span className="font-mono text-emerald-400 font-bold">Enabled</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Hosts symlink</span>
            <span className="font-mono text-slate-200">/data/adb/modules/hosts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
