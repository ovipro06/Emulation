import React from 'react';
import { PlaySquare, ThumbsUp, MessageSquare, Share2, Play } from 'lucide-react';

export const YouTubeApp: React.FC = () => {
  const videos = [
    {
      id: 'v1',
      title: 'How to Root Android 14 with Magisk v27.0 (Step by Step Guide)',
      channel: 'Android Central',
      views: '482K views',
      time: '2 weeks ago',
      color: 'from-purple-900 to-indigo-900',
    },
    {
      id: 'v2',
      title: 'Top 10 Best Magisk Modules for 2026! Play Integrity, Zygisk, LSPosed',
      channel: 'XDA Developers',
      views: '1.2M views',
      time: '1 month ago',
      color: 'from-emerald-900 to-teal-900',
    },
    {
      id: 'v3',
      title: 'Google Pixel 8 Pro: Android 14 Upside Down Cake Hidden Features',
      channel: 'TechAltar',
      views: '890K views',
      time: '3 months ago',
      color: 'from-blue-900 to-slate-900',
    },
  ];

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      <div className="bg-slate-900 border-b border-white/10 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-600 text-white">
            <PlaySquare size={16} />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">YouTube</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Android 14 Client</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none">
        {videos.map((vid) => (
          <div key={vid.id} className="space-y-2 group cursor-pointer">
            <div
              className={`aspect-video rounded-2xl bg-gradient-to-br ${vid.color} border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-all`}
            >
              <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play size={20} className="fill-current ml-0.5" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-white">
                12:44
              </span>
            </div>

            <div className="px-1">
              <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {vid.title}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {vid.channel} · {vid.views} · {vid.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
