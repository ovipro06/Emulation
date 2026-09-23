import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Trash2, Camera, ShieldAlert, ShoppingBag, Terminal, Settings, Globe, FolderKanban } from 'lucide-react';

export const RecentsOverview: React.FC = () => {
  const {
    isRecentsOpen,
    setIsRecentsOpen,
    recents,
    installedApps,
    openApp,
    clearRecents,
    takeScreenshot,
  } = useEmulator();

  if (!isRecentsOpen) return null;

  const recentAppsList = recents
    .map((id) => installedApps.find((a) => a.id === id))
    .filter(Boolean);

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert size={18} className="text-emerald-400" />;
      case 'ShoppingBag':
        return <ShoppingBag size={18} className="text-blue-400" />;
      case 'Terminal':
        return <Terminal size={18} className="text-amber-400" />;
      case 'FolderKanban':
        return <FolderKanban size={18} className="text-purple-400" />;
      case 'Settings':
        return <Settings size={18} className="text-slate-300" />;
      case 'Globe':
        return <Globe size={18} className="text-sky-400" />;
      default:
        return <Settings size={18} className="text-indigo-400" />;
    }
  };

  return (
    <div
      onClick={() => setIsRecentsOpen(false)}
      className="absolute inset-0 z-40 flex flex-col justify-between p-6 bg-black/60 backdrop-blur-md text-white select-none animate-fadeIn"
    >
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Running Applications
        </span>
        {recentAppsList.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearRecents();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition-all"
          >
            <Trash2 size={13} />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {recentAppsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-auto text-center">
          <p className="text-sm font-medium text-white/60">No recent applications</p>
          <p className="text-xs text-white/40 mt-1">Open an app from the home screen or app drawer</p>
        </div>
      ) : (
        <div className="flex items-center gap-4 overflow-x-auto py-8 px-2 scrollbar-none snap-x">
          {recentAppsList.map((app) => (
            <div
              key={app!.id}
              onClick={(e) => {
                e.stopPropagation();
                openApp(app!.id);
              }}
              className="w-56 sm:w-64 h-80 rounded-3xl bg-slate-900 border border-white/15 p-4 flex flex-col justify-between shrink-0 shadow-2xl cursor-pointer hover:border-blue-500/50 hover:scale-[1.02] transition-all snap-center group"
            >
              {/* Card Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  {getAppIcon(app!.icon)}
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-white truncate">{app!.name}</span>
                  <span className="block text-[10px] text-slate-400 font-mono truncate">{app!.packageName}</span>
                </div>
              </div>

              {/* Card Body Preview Simulation */}
              <div className="flex-1 my-3 bg-slate-950/70 rounded-xl p-3 flex flex-col justify-center items-center text-center border border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-xs text-slate-400 font-medium">{app!.name} running</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-1">Status: Active in memory</span>
              </div>

              {/* Card Action */}
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="text-[10px] text-slate-400">Tap to resume</span>
                <span className="text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Bar Controls */}
      <div className="flex items-center justify-center gap-4 pb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            takeScreenshot();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-xs font-medium text-white transition-all"
        >
          <Camera size={14} />
          <span>Screenshot</span>
        </button>
      </div>
    </div>
  );
};
