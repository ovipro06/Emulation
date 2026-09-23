import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { ShieldAlert, Terminal, Check, X, Clock, AlertTriangle } from 'lucide-react';

export const SuperuserDialog: React.FC = () => {
  const { pendingRootRequest, resolveRootRequest } = useEmulator();
  const [countdown, setCountdown] = useState<number>(10);
  const [duration, setDuration] = useState<'10m' | 'forever'>('forever');

  useEffect(() => {
    if (!pendingRootRequest) {
      setCountdown(10);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resolveRootRequest(false); // auto deny on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingRootRequest, resolveRootRequest]);

  if (!pendingRootRequest) return null;

  const { app } = pendingRootRequest;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full max-w-[340px] bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-5 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Superuser Request</h3>
            <span className="text-[11px] text-emerald-400 font-mono">MagiskSU v27.0</span>
          </div>
        </div>

        {/* App details */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-800/80 border border-white/5 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-white">
              <Terminal size={18} className="text-amber-400" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-white block truncate">{app.name}</span>
              <span className="text-[10px] text-slate-400 block font-mono truncate">{app.packageName}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Command:</span>
              <span className="font-mono text-emerald-300">/system/bin/su</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Requested UID:</span>
              <span className="font-mono text-slate-200">0 (root)</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-3 flex items-start gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          <span>Granting root gives this app full access to all system files and protected data.</span>
        </div>

        {/* Duration selection */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 px-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="suDuration"
              checked={duration === 'forever'}
              onChange={() => setDuration('forever')}
              className="accent-emerald-500"
            />
            <span>Remember choice</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="suDuration"
              checked={duration === '10m'}
              onChange={() => setDuration('10m')}
              className="accent-emerald-500"
            />
            <span>10 minutes</span>
          </label>
        </div>

        {/* Action Buttons with Countdown */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => resolveRootRequest(false)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
          >
            <X size={14} />
            <span>Deny ({countdown}s)</span>
          </button>

          <button
            onClick={() => resolveRootRequest(true)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-700/40 transition-all active:scale-95"
          >
            <Check size={15} strokeWidth={3} />
            <span>Grant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
