import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Wifi, WifiOff, Battery, BatteryCharging, Hash, ShieldCheck, ChevronDown } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const {
    batteryLevel,
    isCharging,
    wifiConnected,
    cellularData,
    isRooted,
    playProtectSafe,
    notifications,
    setIsNotificationShadeOpen,
    isNotificationShadeOpen,
  } = useEmulator();

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={() => setIsNotificationShadeOpen(!isNotificationShadeOpen)}
      className="h-8 w-full flex items-center justify-between px-5 select-none z-30 cursor-pointer text-white text-xs font-medium tracking-tight bg-gradient-to-b from-black/50 via-black/20 to-transparent backdrop-blur-[2px] transition-all hover:bg-black/40"
      title="Tap or drag to pull down notification & quick settings shade"
    >
      {/* Left side: Time & Notification icons */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[13px] tracking-normal drop-shadow-sm">{currentTime || '07:50'}</span>

        {/* Magisk Root Status Symbol (#) */}
        {isRooted && (
          <div
            className="flex items-center justify-center w-4 h-4 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/30"
            title="MagiskSU Active (Root: su)"
          >
            <Hash size={11} strokeWidth={3} />
          </div>
        )}

        {/* Play Protect Verified Shield */}
        {playProtectSafe && (
          <span title="Google Play Protect Active">
            <ShieldCheck size={13} className="text-blue-400 drop-shadow-sm" />
          </span>
        )}

        {/* Unread notification dots / icons */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-1 opacity-85">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] text-white/80 font-mono">({notifications.length})</span>
          </div>
        )}
      </div>

      {/* Pull down cue indicator */}
      <div className="opacity-0 hover:opacity-100 transition-opacity">
        <ChevronDown size={14} className="text-white/60" />
      </div>

      {/* Right side: Wi-Fi, 5G, Battery */}
      <div className="flex items-center gap-2">
        {wifiConnected ? (
          <Wifi size={13} className="text-white drop-shadow-sm" />
        ) : (
          <WifiOff size={13} className="text-white/40" />
        )}

        {cellularData ? (
          <div className="flex items-baseline gap-[1px]">
            <span className="text-[9px] font-bold tracking-tighter text-white/90">5G</span>
            <div className="flex items-end gap-[1.5px] h-2.5">
              <span className="w-[2px] h-[3px] bg-white rounded-full" />
              <span className="w-[2px] h-[5px] bg-white rounded-full" />
              <span className="w-[2px] h-[7px] bg-white rounded-full" />
              <span className="w-[2px] h-[9px] bg-white rounded-full" />
            </div>
          </div>
        ) : null}

        {/* Battery with percentage */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono tabular-nums text-white/95">{batteryLevel}%</span>
          {isCharging ? (
            <BatteryCharging size={15} className="text-amber-300 drop-shadow-sm animate-pulse" />
          ) : (
            <Battery size={15} className="text-white drop-shadow-sm" />
          )}
        </div>
      </div>
    </div>
  );
};
