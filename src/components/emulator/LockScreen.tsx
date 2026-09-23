import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Fingerprint, Flashlight, Camera, Lock, Hash, ShieldCheck } from 'lucide-react';

export const LockScreen: React.FC = () => {
  const {
    unlockDevice,
    notifications,
    isRooted,
    magiskVersion,
    flashlight,
    toggleFlashlight,
    openApp,
  } = useEmulator();

  const [timeParts, setTimeParts] = useState({ hour: '07', minute: '50' });
  const [dateString, setDateString] = useState('Wednesday, Sep 23');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeParts({
        hour: String(now.getHours()).padStart(2, '0'),
        minute: String(now.getMinutes()).padStart(2, '0'),
      });
      setDateString(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={unlockDevice}
      className="absolute inset-0 z-50 flex flex-col justify-between p-6 select-none bg-black/40 backdrop-blur-sm cursor-pointer animate-fadeIn"
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between text-xs text-white/80 pt-4">
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <Lock size={12} className="text-white/80" />
          <span className="font-medium text-[11px]">Android 14</span>
        </div>

        {isRooted && (
          <div className="flex items-center gap-1.5 bg-emerald-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300">
            <Hash size={11} strokeWidth={3} />
            <span className="text-[11px] font-mono">Magisk {magiskVersion}</span>
          </div>
        )}
      </div>

      {/* Center Giant Android 14 Clock */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="flex flex-col items-center leading-none text-white drop-shadow-md">
          <span className="text-7xl sm:text-8xl font-black tracking-tight font-sans text-white/95">
            {timeParts.hour}
          </span>
          <span className="text-7xl sm:text-8xl font-black tracking-tight font-sans text-amber-200/90">
            {timeParts.minute}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-white/90 text-sm font-medium">
          <span>{dateString}</span>
          <span>•</span>
          <span>72°F Sunny</span>
        </div>

        {/* Lock Screen Notification Pill */}
        {notifications.length > 0 && (
          <div className="mt-6 w-full max-w-[320px] bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg text-left">
            <div className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span className="font-semibold text-white/90 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-blue-400" />
                {notifications[0].app}
              </span>
              <span className="text-[10px]">{notifications[0].time}</span>
            </div>
            <p className="text-xs font-medium text-white/90 truncate">{notifications[0].title}</p>
            <p className="text-[11px] text-white/70 truncate">{notifications[0].body}</p>
          </div>
        )}
      </div>

      {/* Bottom Area: Fingerprint Sensor & Shortcuts */}
      <div className="flex flex-col items-center gap-4 pb-2">
        {/* Fingerprint scanner */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            unlockDevice();
          }}
          className="relative group p-4 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all border border-white/20 shadow-xl"
          title="Tap or click fingerprint to unlock"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping opacity-60 pointer-events-none" />
          <Fingerprint size={32} className="text-cyan-300 drop-shadow-md" />
        </div>

        <span className="text-[11px] text-white/70 tracking-wide font-medium">
          Swipe up or touch sensor to unlock
        </span>

        {/* Bottom corner quick triggers */}
        <div className="w-full flex items-center justify-between px-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFlashlight();
            }}
            className={`p-3 rounded-full border transition-all ${
              flashlight
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/30'
                : 'bg-black/40 text-white/80 border-white/15 hover:bg-black/60'
            }`}
            title="Toggle Flashlight"
          >
            <Flashlight size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              unlockDevice();
              openApp('camera');
            }}
            className="p-3 rounded-full bg-black/40 text-white/80 border border-white/15 hover:bg-black/60 transition-all active:scale-95"
            title="Open Camera"
          >
            <Camera size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
