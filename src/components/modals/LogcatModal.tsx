import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Terminal, Trash2, Search, Filter, X, ArrowDown } from 'lucide-react';
import { LogcatEntry } from '../../types/emulator';

export const LogcatModal: React.FC = () => {
  const { isLogcatModalOpen, setIsLogcatModalOpen, logcat, clearLogcat } = useEmulator();

  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [tagQuery, setTagQuery] = useState<string>('');

  if (!isLogcatModalOpen) return null;

  const filteredLogs = logcat.filter((entry) => {
    const levelMatch = filterLevel === 'ALL' || entry.level === filterLevel;
    const tagMatch =
      tagQuery === '' ||
      entry.tag.toLowerCase().includes(tagQuery.toLowerCase()) ||
      entry.message.toLowerCase().includes(tagQuery.toLowerCase());
    return levelMatch && tagMatch;
  });

  const getLevelBadgeClass = (level: LogcatEntry['level']) => {
    switch (level) {
      case 'E':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'W':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'I':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'D':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-white/10';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none font-mono"
      onClick={() => setIsLogcatModalOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-slate-950 border border-white/15 rounded-3xl p-5 shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight font-sans">
                Android 14 Logcat Stream (live)
              </h2>
              <span className="text-[11px] text-slate-400">
                Logcat daemon: /dev/log/main, /dev/log/system, /dev/log/magisk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearLogcat}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 font-sans"
              title="Clear Logcat"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setIsLogcatModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10 flex-1 min-w-[180px]">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Filter by tag (e.g. 'Magisk', 'GmsCore')..."
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-mono"
            />
          </div>

          <div className="flex items-center gap-1">
            {['ALL', 'I', 'D', 'W', 'E'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  filterLevel === lvl
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Log Stream Terminal View */}
        <div className="flex-1 overflow-y-auto bg-black p-3 rounded-2xl border border-white/10 space-y-1.5 font-mono text-[11px] select-text scrollbar-none min-h-[300px]">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No logcat entries match filter</div>
          ) : (
            filteredLogs.map((entry) => (
              <div key={entry.id} className="flex items-start gap-2 hover:bg-white/5 p-1 rounded">
                <span className="text-slate-500 shrink-0 select-none">{entry.timestamp}</span>
                <span
                  className={`px-1 rounded text-[10px] font-bold border shrink-0 ${getLevelBadgeClass(
                    entry.level
                  )}`}
                >
                  {entry.level}
                </span>
                <span className="text-amber-300 font-bold shrink-0">{entry.tag}:</span>
                <span className="text-slate-200 break-all">{entry.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
