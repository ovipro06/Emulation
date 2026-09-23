import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Search,
  Home,
  Library,
  Music,
  Shuffle,
  Repeat,
  Volume2,
  ChevronDown,
  ListMusic,
  Share2,
} from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  coverBg: string;
}

const PLAYLIST: Song[] = [
  {
    id: '1',
    title: 'Midnight City Echoes',
    artist: 'Neon Waves & Synthetics',
    album: 'Cyberpunk Horizons',
    duration: '3:24',
    durationSec: 204,
    coverBg: 'from-purple-600 to-indigo-900',
  },
  {
    id: '2',
    title: 'Android 14 Chillhop',
    artist: 'Tensor Lofi Lab',
    album: 'Upside Down Cake Beats',
    duration: '2:45',
    durationSec: 165,
    coverBg: 'from-emerald-600 to-teal-900',
  },
  {
    id: '3',
    title: 'Magisk Kernel Groove',
    artist: 'Root Access Collective',
    album: 'Systemless Vibes',
    duration: '3:10',
    durationSec: 190,
    coverBg: 'from-amber-600 to-red-900',
  },
  {
    id: '4',
    title: 'Pixel Night Sight',
    artist: 'Night Vision',
    album: 'Silicon Sunset',
    duration: '4:02',
    durationSec: 242,
    coverBg: 'from-blue-600 to-sky-950',
  },
];

export const SpotifyApp: React.FC = () => {
  const { showToast } = useEmulator();

  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>('home');
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(38);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isExpandedPlayer, setIsExpandedPlayer] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentSong = PLAYLIST[currentSongIndex];

  // Timer ticker for playing song
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        if (prev >= currentSong.durationSec) {
          // next track
          setCurrentSongIndex((i) => (i + 1) % PLAYLIST.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.durationSec]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTimeSec(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    setCurrentTimeSec(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-none pb-28">
          {/* Header */}
          <div className="flex items-center justify-between pt-1">
            <h1 className="text-xl font-bold text-white tracking-tight">Good afternoon</h1>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold">
                P
              </div>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            <button className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-black font-bold">
              Music
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-800 text-white font-medium hover:bg-neutral-700">
              Podcasts
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-800 text-white font-medium hover:bg-neutral-700">
              Audiobooks
            </button>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {PLAYLIST.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(idx);
                  setCurrentTimeSec(0);
                  setIsPlaying(true);
                }}
                className={`flex items-center gap-2.5 rounded-lg overflow-hidden bg-neutral-900 hover:bg-neutral-800 transition-colors text-left border ${
                  currentSongIndex === idx ? 'border-emerald-500/50' : 'border-white/5'
                }`}
              >
                <div
                  className={`w-12 h-12 shrink-0 bg-gradient-to-br ${song.coverBg} flex items-center justify-center text-white`}
                >
                  <Music size={18} />
                </div>
                <span className="truncate pr-2 text-white">{song.title}</span>
              </button>
            ))}
          </div>

          {/* Made For You Section */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-white tracking-tight">Made For You</h2>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => {
                  setCurrentSongIndex(0);
                  setIsPlaying(true);
                }}
                className="bg-neutral-900/80 p-3 rounded-2xl border border-white/5 hover:bg-neutral-800/80 transition-colors cursor-pointer space-y-2"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-700 to-indigo-950 flex items-center justify-center text-white shadow">
                  <Music size={32} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">Daily Mix 1</h4>
                  <p className="text-[10px] text-neutral-400 line-clamp-2 mt-0.5">
                    Neon Waves, Synthetics, Retro synth, Cyberpunk
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  setCurrentSongIndex(1);
                  setIsPlaying(true);
                }}
                className="bg-neutral-900/80 p-3 rounded-2xl border border-white/5 hover:bg-neutral-800/80 transition-colors cursor-pointer space-y-2"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-emerald-700 to-teal-950 flex items-center justify-center text-white shadow">
                  <Music size={32} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">Android Lofi Beats</h4>
                  <p className="text-[10px] text-neutral-400 line-clamp-2 mt-0.5">
                    Relaxing study beats with Tensor G3 acoustic warmth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH TAB */}
      {activeTab === 'search' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-28">
          <h1 className="text-xl font-bold text-white">Search</h1>
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-black">
            <Search size={18} className="text-neutral-600" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-black placeholder-neutral-500 focus:outline-none w-full font-medium"
            />
          </div>

          <h2 className="text-sm font-bold text-white pt-2">Browse all</h2>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold">
            <div className="h-24 p-3 rounded-xl bg-pink-600 text-white relative overflow-hidden shadow">
              <span>Pop</span>
            </div>
            <div className="h-24 p-3 rounded-xl bg-orange-600 text-white relative overflow-hidden shadow">
              <span>Hip-Hop</span>
            </div>
            <div className="h-24 p-3 rounded-xl bg-purple-700 text-white relative overflow-hidden shadow">
              <span>Electronic</span>
            </div>
            <div className="h-24 p-3 rounded-xl bg-blue-600 text-white relative overflow-hidden shadow">
              <span>Rock & Indie</span>
            </div>
          </div>
        </div>
      )}

      {/* LIBRARY TAB */}
      {activeTab === 'library' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-28">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Your Library</h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-900">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center text-white">
                <Heart size={24} className="fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Liked Songs</h4>
                <p className="text-xs text-neutral-400">Playlist • 48 songs</p>
              </div>
            </div>

            {PLAYLIST.map((song, i) => (
              <div
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(i);
                  setIsPlaying(true);
                }}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${song.coverBg} flex items-center justify-center text-white`}
                  >
                    <Music size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{song.title}</h4>
                    <p className="text-[10px] text-neutral-400">{song.artist}</p>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM MINI PLAYER */}
      <div className="absolute bottom-12 left-2 right-2 z-20">
        <div
          onClick={() => setIsExpandedPlayer(true)}
          className={`rounded-2xl p-2.5 bg-neutral-900 border border-white/10 shadow-2xl flex items-center justify-between cursor-pointer`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentSong.coverBg} flex items-center justify-center text-white shrink-0`}
            >
              <Music size={16} />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{currentSong.title}</h4>
              <p className="text-[10px] text-neutral-400 truncate">{currentSong.artist}</p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                showToast(isLiked ? 'Removed from Liked Songs' : 'Saved to Liked Songs');
              }}
              className="p-1.5 text-neutral-400 hover:text-white"
            >
              <Heart
                size={16}
                className={isLiked ? 'text-emerald-500 fill-current' : ''}
              />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Mini progress line */}
        <div className="w-full bg-neutral-800 h-0.5 rounded-full overflow-hidden mt-0.5">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(currentTimeSec / currentSong.durationSec) * 100}%` }}
          />
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-neutral-950/95 backdrop-blur border-t border-white/10 flex items-center justify-around text-xs font-medium z-20">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'home' ? 'text-white' : 'text-neutral-400'
          }`}
        >
          <Home size={18} />
          <span className="text-[10px]">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'search' ? 'text-white' : 'text-neutral-400'
          }`}
        >
          <Search size={18} />
          <span className="text-[10px]">Search</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'library' ? 'text-white' : 'text-neutral-400'
          }`}
        >
          <Library size={18} />
          <span className="text-[10px]">Your Library</span>
        </button>
      </div>

      {/* FULL-SCREEN EXPANDED NOW PLAYING SHEET */}
      {isExpandedPlayer && (
        <div className="absolute inset-0 z-40 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 p-6 flex flex-col justify-between animate-slideUp">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsExpandedPlayer(false)}
              className="p-2 -ml-2 text-neutral-400 hover:text-white"
            >
              <ChevronDown size={22} />
            </button>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Playing from Album
            </span>
            <button className="p-2 -mr-2 text-neutral-400 hover:text-white">
              <Share2 size={18} />
            </button>
          </div>

          {/* Large Album Artwork */}
          <div
            className={`w-full aspect-square rounded-3xl bg-gradient-to-br ${currentSong.coverBg} flex items-center justify-center text-white shadow-2xl my-auto p-8`}
          >
            <Music size={80} className="text-white/80" />
          </div>

          {/* Track Info & Like */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">{currentSong.title}</h2>
                <p className="text-xs text-neutral-400 mt-0.5">{currentSong.artist}</p>
              </div>
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  showToast(isLiked ? 'Removed from Liked Songs' : 'Saved to Liked Songs');
                }}
                className="p-2 text-neutral-400 hover:text-white"
              >
                <Heart
                  size={22}
                  className={isLiked ? 'text-emerald-500 fill-current' : ''}
                />
              </button>
            </div>

            {/* Scrub Bar */}
            <div className="space-y-1">
              <div
                className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentTimeSec(Math.floor(ratio * currentSong.durationSec));
                }}
              >
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(currentTimeSec / currentSong.durationSec) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>{formatTime(currentTimeSec)}</span>
                <span>{currentSong.duration}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-2">
              <button className="text-neutral-400 hover:text-white">
                <Shuffle size={18} />
              </button>
              <button onClick={handlePrev} className="text-white hover:scale-110 transition-transform">
                <SkipBack size={26} className="fill-current" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
              >
                {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
              </button>
              <button onClick={handleNext} className="text-white hover:scale-110 transition-transform">
                <SkipForward size={26} className="fill-current" />
              </button>
              <button className="text-neutral-400 hover:text-white">
                <Repeat size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
