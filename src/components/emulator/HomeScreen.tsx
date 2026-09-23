import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  ShieldAlert,
  ShoppingBag,
  Terminal,
  FolderKanban,
  Settings,
  Globe,
  Camera,
  Calculator,
  Image,
  MapPin,
  PlaySquare,
  ShieldCheck,
  Search,
  Mic,
  Cpu,
  Music,
  Film,
  MessageCircle,
  Share2,
  Wrench,
  Flame,
  Hash,
  Sparkles,
  Phone,
  ChevronUp,
  Gamepad2,
  Send,
} from 'lucide-react';
import { AppDefinition } from '../../types/emulator';

export const HomeScreen: React.FC = () => {
  const {
    installedApps,
    openApp,
    isRooted,
    magiskVersion,
    isAppDrawerOpen,
    setIsAppDrawerOpen,
    wallpaper,
  } = useEmulator();

  const [drawerSearch, setDrawerSearch] = useState<string>('');

  const getAppIcon = (app: AppDefinition) => {
    switch (app.icon) {
      case 'ShieldAlert':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 relative">
            <ShieldAlert size={24} />
            {isRooted && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-slate-900 shadow">
                #
              </span>
            )}
          </div>
        );
      case 'ShoppingBag':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-950/40">
            <ShoppingBag size={24} />
          </div>
        );
      case 'Terminal':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
            <Terminal size={24} />
          </div>
        );
      case 'FolderKanban':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white shadow-lg">
            <FolderKanban size={24} />
          </div>
        );
      case 'Settings':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-lg">
            <Settings size={24} />
          </div>
        );
      case 'Globe':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Globe size={24} />
          </div>
        );
      case 'Camera':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center text-white shadow-lg border border-white/10">
            <Camera size={24} />
          </div>
        );
      case 'Calculator':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-900 flex items-center justify-center text-white shadow-lg">
            <Calculator size={24} />
          </div>
        );
      case 'Image':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <Image size={24} />
          </div>
        );
      case 'MapPin':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white shadow-lg">
            <MapPin size={24} />
          </div>
        );
      case 'PlaySquare':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg">
            <PlaySquare size={24} />
          </div>
        );
      case 'ShieldCheck':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-blue-300 shadow-lg">
            <ShieldCheck size={24} />
          </div>
        );
      case 'Cpu':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center text-white shadow-lg">
            <Cpu size={24} />
          </div>
        );
      case 'Music':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-lg">
            <Music size={24} />
          </div>
        );
      case 'Film':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-700 to-black flex items-center justify-center text-red-400 shadow-lg">
            <Film size={24} />
          </div>
        );
      case 'MessageCircle':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg">
            <MessageCircle size={24} />
          </div>
        );
      case 'Share2':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center text-white shadow-lg">
            <Share2 size={24} />
          </div>
        );
      case 'Wrench':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg">
            <Wrench size={24} />
          </div>
        );
      case 'Flame':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-white shadow-lg">
            <Flame size={24} />
          </div>
        );
      case 'Gamepad2':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-lg">
            <Gamepad2 size={24} />
          </div>
        );
      case 'Send':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Send size={22} className="-ml-0.5 -mt-0.5" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
        );
    }
  };

  const dockAppIds = ['terminal', 'chrome', 'playstore', 'camera', 'magisk'];
  const dockApps = dockAppIds
    .map((id) => installedApps.find((a) => a.id === id))
    .filter(Boolean) as AppDefinition[];

  const mainGridApps = installedApps.filter((a) => !dockAppIds.includes(a.id));

  const filteredDrawerApps = installedApps.filter(
    (app) =>
      app.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      app.packageName.toLowerCase().includes(drawerSearch.toLowerCase())
  );

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 select-none overflow-hidden">
      {/* Top At a Glance Widget */}
      <div className="mt-2 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold tracking-tight text-white/95">
              Wednesday, Sep 23
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/80 mt-0.5">
              <span>72°F</span>
              <span>·</span>
              <span>Sunny</span>
            </div>
          </div>

          {/* Root status pill */}
          {isRooted && (
            <button
              onClick={() => openApp('magisk')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-mono hover:bg-black/60 transition-colors"
              title="MagiskSU Active - Tap to open Magisk"
            >
              <Hash size={11} strokeWidth={3} />
              <span>Magisk {magiskVersion.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Apps Grid */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto pt-2 px-1">
        {mainGridApps.map((app) => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
          >
            <div className="group-hover:scale-105 transition-transform duration-150">
              {getAppIcon(app)}
            </div>
            <span className="mt-1.5 text-[11px] font-medium text-white/90 text-center tracking-tight truncate w-full px-1 drop-shadow-md">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Area: Google Search Pill + Dock */}
      <div className="space-y-3">
        {/* Android 14 Google Search Bar */}
        <div
          onClick={() => openApp('chrome')}
          className="w-full h-11 rounded-full bg-white/20 hover:bg-white/25 backdrop-blur-xl border border-white/20 flex items-center justify-between px-4 text-white cursor-pointer shadow-lg active:scale-[0.99] transition-all"
          title="Search Google or open Chrome"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-base bg-gradient-to-r from-blue-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">
              G
            </span>
            <span className="text-xs text-white/70">Search...</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Mic size={15} />
            <Search size={15} />
          </div>
        </div>

        {/* Persistent Bottom Dock */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-around px-2">
          {dockApps.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
              title={app.name}
            >
              <div className="group-hover:scale-105 transition-transform duration-150">
                {getAppIcon(app)}
              </div>
            </button>
          ))}
        </div>

        {/* Swipe up hint for App Drawer */}
        <div
          onClick={() => setIsAppDrawerOpen(true)}
          className="flex flex-col items-center justify-center cursor-pointer text-white/50 hover:text-white/80 transition-colors pt-0.5"
        >
          <ChevronUp size={14} className="animate-bounce" />
          <span className="text-[10px] tracking-wider uppercase font-medium">All Apps</span>
        </div>
      </div>

      {/* App Drawer Bottom Sheet */}
      {isAppDrawerOpen && (
        <div
          className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl text-white p-5 flex flex-col justify-between animate-slideUp select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Search Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                All Installed Applications ({installedApps.length})
              </span>
              <button
                onClick={() => setIsAppDrawerOpen(false)}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Done
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-2xl border border-white/10">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search apps..."
                value={drawerSearch}
                onChange={(e) => setDrawerSearch(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                autoFocus
              />
            </div>
          </div>

          {/* Full apps list */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-2 my-auto py-4 overflow-y-auto max-h-[480px] scrollbar-none">
            {filteredDrawerApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setIsAppDrawerOpen(false);
                  openApp(app.id);
                }}
                className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
              >
                <div className="group-hover:scale-105 transition-transform duration-150">
                  {getAppIcon(app)}
                </div>
                <span className="mt-1.5 text-[11px] font-medium text-white/90 text-center tracking-tight truncate w-full px-1">
                  {app.name}
                </span>
                {app.requiresRoot && (
                  <span className="text-[9px] text-emerald-400 font-mono">#root</span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Close */}
          <div className="pt-2 text-center">
            <button
              onClick={() => setIsAppDrawerOpen(false)}
              className="text-xs text-slate-400 hover:text-white py-1 px-4 rounded-full bg-white/5"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
