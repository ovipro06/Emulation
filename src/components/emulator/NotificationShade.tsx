import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Flashlight,
  Moon,
  Sun,
  RotateCw,
  Volume2,
  VolumeX,
  ShieldAlert,
  ShieldCheck,
  Settings,
  Power,
  ChevronUp,
  Sliders,
  Play,
  Pause,
  SkipForward,
  Trash2,
  Hash,
} from 'lucide-react';

export const NotificationShade: React.FC = () => {
  const {
    isNotificationShadeOpen,
    setIsNotificationShadeOpen,
    wifiConnected,
    toggleWifi,
    flashlight,
    toggleFlashlight,
    darkTheme,
    toggleDarkTheme,
    dnd,
    toggleDnd,
    orientation,
    toggleOrientation,
    isRooted,
    toggleRoot,
    playProtectSafe,
    runPlayProtectScan,
    brightness,
    setBrightness,
    notifications,
    dismissNotification,
    clearAllNotifications,
    openApp,
    rebootDevice,
  } = useEmulator();

  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(true);

  if (!isNotificationShadeOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl text-white select-none overflow-y-auto animate-slideDown scrollbar-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-white/10">
        <div>
          <span className="text-2xl font-bold tracking-tight">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <p className="text-xs text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsNotificationShadeOpen(false);
              openApp('settings');
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Open Settings"
          >
            <Settings size={17} />
          </button>

          <button
            onClick={rebootDevice}
            className="p-2 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors border border-red-500/30"
            title="Reboot Android 14"
          >
            <Power size={17} />
          </button>

          <button
            onClick={() => setIsNotificationShadeOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Collapse shade"
          >
            <ChevronUp size={17} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Android 14 Large Pill Quick Setting Tiles (2 columns) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Internet Tile */}
          <button
            onClick={toggleWifi}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              wifiConnected
                ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-900/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className={`p-2 rounded-full ${wifiConnected ? 'bg-white/20' : 'bg-slate-700'}`}>
              {wifiConnected ? <Wifi size={18} /> : <WifiOff size={18} />}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">Internet</span>
              <span className="block text-[10px] opacity-80 truncate">
                {wifiConnected ? 'AndroidWifi 5G' : 'Disconnected'}
              </span>
            </div>
          </button>

          {/* Magisk Root SU Tile */}
          <button
            onClick={() => {
              toggleRoot();
            }}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              isRooted
                ? 'bg-emerald-600 text-white font-medium shadow-md shadow-emerald-900/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            title="Toggle MagiskSU Root permissions"
          >
            <div className={`p-2 rounded-full ${isRooted ? 'bg-white/20' : 'bg-slate-700'}`}>
              <Hash size={18} strokeWidth={2.8} />
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">MagiskSU</span>
              <span className="block text-[10px] opacity-80 truncate">
                {isRooted ? 'Root Active' : 'Disabled'}
              </span>
            </div>
          </button>

          {/* Play Protect Tile */}
          <button
            onClick={() => {
              runPlayProtectScan();
            }}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              playProtectSafe
                ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-900/30'
                : 'bg-amber-600 text-white font-medium'
            }`}
            title="Google Play Protect Status"
          >
            <div className="p-2 rounded-full bg-white/20">
              <ShieldCheck size={18} />
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">Play Protect</span>
              <span className="block text-[10px] opacity-80 truncate">
                {playProtectSafe ? 'Verified Safe' : 'Scanning...'}
              </span>
            </div>
          </button>

          {/* Flashlight Tile */}
          <button
            onClick={toggleFlashlight}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              flashlight
                ? 'bg-amber-500 text-slate-950 font-medium shadow-md shadow-amber-900/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className={`p-2 rounded-full ${flashlight ? 'bg-black/20' : 'bg-slate-700'}`}>
              <Flashlight size={18} />
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">Flashlight</span>
              <span className="block text-[10px] opacity-80 truncate">
                {flashlight ? 'Torch On' : 'Off'}
              </span>
            </div>
          </button>

          {/* Dark Theme */}
          <button
            onClick={toggleDarkTheme}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              darkTheme
                ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-900/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className={`p-2 rounded-full ${darkTheme ? 'bg-white/20' : 'bg-slate-700'}`}>
              {darkTheme ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">Dark Theme</span>
              <span className="block text-[10px] opacity-80 truncate">
                {darkTheme ? 'On' : 'Off'}
              </span>
            </div>
          </button>

          {/* Do Not Disturb */}
          <button
            onClick={toggleDnd}
            className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
              dnd
                ? 'bg-rose-600 text-white font-medium shadow-md shadow-rose-900/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className={`p-2 rounded-full ${dnd ? 'bg-white/20' : 'bg-slate-700'}`}>
              {dnd ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate leading-tight">Do Not Disturb</span>
              <span className="block text-[10px] opacity-80 truncate">
                {dnd ? 'Alarms only' : 'Off'}
              </span>
            </div>
          </button>
        </div>

        {/* Interactive Brightness Slider */}
        <div className="bg-slate-900/80 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
          <Sun size={18} className="text-amber-300 shrink-0" />
          <input
            type="range"
            min="20"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono tabular-nums text-slate-300 w-8 text-right">
            {brightness}%
          </span>
        </div>

        {/* Android 14 Media Player Card */}
        <div className="bg-gradient-to-r from-teal-900/40 to-slate-900/90 rounded-2xl p-3.5 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white shadow">
                <Play size={18} className={isPlayingMedia ? 'fill-current' : ''} />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Upside Down Cake</span>
                <span className="text-[11px] text-teal-300 block">Android 14 • Google Play Music</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingMedia(!isPlayingMedia)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              >
                {isPlayingMedia ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => setIsPlayingMedia(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>

          {/* Wavy Progress Bar simulation */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono">1:42</span>
            <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-teal-400 w-2/5 rounded-full" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">3:54</span>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
              Notifications ({notifications.length})
            </span>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                <Trash2 size={12} />
                <span>Clear all</span>
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-white/5">
              No new notifications
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-slate-900/90 rounded-2xl p-3 border border-white/10 shadow-sm relative group hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/10 text-white">
                        {notif.icon === 'ShieldAlert' ? (
                          <ShieldAlert size={14} className="text-emerald-400" />
                        ) : (
                          <ShieldCheck size={14} className="text-blue-400" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-white/90">{notif.app}</span>
                      <span className="text-[10px] text-slate-400">· {notif.time}</span>
                    </div>

                    <button
                      onClick={() => dismissNotification(notif.id)}
                      className="text-slate-400 hover:text-white text-xs opacity-60 group-hover:opacity-100 p-1"
                      title="Dismiss"
                    >
                      ×
                    </button>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-slate-200">{notif.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{notif.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
