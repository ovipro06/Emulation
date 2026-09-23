import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Play,
  Plus,
  Check,
  Info,
  Search,
  Cast,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
} from 'lucide-react';

export const NetflixApp: React.FC = () => {
  const { showToast } = useEmulator();

  const [inMyList, setInMyList] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const heroShow = {
    title: 'Cyberpunk: Edgerunners',
    tags: ['Sci-Fi', 'Action', 'Anime', 'Ultra HD 4K', '5.1 Audio'],
    description:
      'In a dystopia riddled with corruption and cybernetic implants, a talented street kid strives to survive as an edgerunner.',
  };

  const trendingShows = [
    { title: 'Stranger Things 5', cat: 'Sci-Fi Drama', bg: 'from-red-900 to-black' },
    { title: 'Wednesday', cat: 'Mystery & Comedy', bg: 'from-purple-950 to-neutral-950' },
    { title: 'The Witcher', cat: 'Fantasy Action', bg: 'from-amber-900 to-black' },
    { title: 'Squid Game S2', cat: 'Thriller Drama', bg: 'from-pink-900 to-neutral-950' },
  ];

  return (
    <div className="w-full h-full bg-black text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-gradient-to-b from-black via-black/80 to-transparent flex items-center justify-between z-20">
        <span className="text-xl font-black text-red-600 tracking-tighter">NETFLIX</span>

        <div className="flex items-center gap-4 text-white">
          <Cast size={18} className="cursor-pointer" />
          <Search size={18} className="cursor-pointer" />
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold">
            P
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-1.5 flex items-center justify-around text-xs font-medium text-slate-300 z-20">
        <button className="hover:text-white">TV Shows</button>
        <button className="hover:text-white">Movies</button>
        <button className="hover:text-white">Categories</button>
      </div>

      {/* Main Stream Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-8 space-y-6">
        {/* Hero Billboard */}
        <div className="relative w-full h-72 bg-gradient-to-t from-black via-neutral-900 to-indigo-950 flex flex-col justify-end p-5">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-red-600 tracking-widest uppercase">
                Series
              </span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight leading-none">
              {heroShow.title}
            </h1>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
              {heroShow.tags.map((t) => (
                <span key={t} className="bg-white/10 px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="flex-1 py-2 rounded-lg bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <Play size={16} className="fill-current" />
                <span>Play</span>
              </button>
              <button
                onClick={() => {
                  setInMyList(!inMyList);
                  showToast(inMyList ? 'Removed from My List' : 'Added to My List');
                }}
                className="flex-1 py-2 rounded-lg bg-neutral-800/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-700 transition-colors border border-white/10"
              >
                {inMyList ? <Check size={16} className="text-emerald-400" /> : <Plus size={16} />}
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trending Carousel */}
        <div className="px-4 space-y-2.5">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase">Trending Now</h2>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none">
            {trendingShows.map((show) => (
              <div
                key={show.title}
                onClick={() => setIsPlayingVideo(true)}
                className={`w-28 h-40 shrink-0 rounded-xl bg-gradient-to-br ${show.bg} p-2.5 flex flex-col justify-end border border-white/10 hover:scale-105 transition-transform cursor-pointer shadow-lg`}
              >
                <span className="text-[11px] font-bold text-white leading-tight">{show.title}</span>
                <span className="text-[9px] text-slate-400 mt-0.5">{show.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 10 in Android Today */}
        <div className="px-4 space-y-2.5">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase">Top 10 in USA</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center gap-3 cursor-pointer hover:bg-neutral-800"
            >
              <span className="text-3xl font-black text-red-600">1</span>
              <div>
                <h4 className="font-bold text-white">Stranger Things</h4>
                <span className="text-[10px] text-slate-400">TV-MA • Season 5</span>
              </div>
            </div>
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="p-3 rounded-xl bg-neutral-900 border border-white/5 flex items-center gap-3 cursor-pointer hover:bg-neutral-800"
            >
              <span className="text-3xl font-black text-red-600">2</span>
              <div>
                <h4 className="font-bold text-white">Cyberpunk</h4>
                <span className="text-[10px] text-slate-400">TV-MA • 10 Episodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER MODAL */}
      {isPlayingVideo && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-4 animate-fadeIn">
          <div className="flex items-center justify-between text-white">
            <button onClick={() => setIsPlayingVideo(false)} className="p-2 -ml-2 text-slate-300 hover:text-white">
              <X size={20} />
            </button>
            <span className="text-xs font-bold">{heroShow.title}</span>
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div className="my-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center text-red-500 shadow-2xl animate-pulse">
              <Play size={28} className="fill-current ml-1" />
            </div>
            <span className="text-xs font-mono text-slate-300">
              Streaming in 4K HDR • AV1 Hardware Accelerated
            </span>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full w-1/3 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>08:42</span>
              <span>24:18</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
