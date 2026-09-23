import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Search,
  Mic,
  ShieldCheck,
  Star,
  Download,
  Trash2,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Gamepad2,
  Layers,
  ArrowLeft,
  Share2,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  HardDrive,
  Cpu,
  Music,
  Film,
  MessageCircle,
  Wrench,
  Flame,
  Send,
  User,
  X,
  ChevronRight,
  ThumbsUp,
  Shield,
  Smartphone,
  Lock,
} from 'lucide-react';
import { PLAY_STORE_CATALOG } from '../../data/mockSystem';
import { AppDefinition } from '../../types/emulator';

export const PlayStoreApp: React.FC = () => {
  const {
    installedApps,
    installApp,
    uninstallApp,
    openApp,
    playProtectSafe,
    isScanningPlayProtect,
    runPlayProtectScan,
    lastScanTime,
    googleAccount,
    playIntegrityPass,
    showToast,
  } = useEmulator();

  // Navigation states
  const [bottomTab, setBottomTab] = useState<'games' | 'apps' | 'search' | 'manage'>('apps');
  const [categoryTab, setCategoryTab] = useState<'foryou' | 'topcharts' | 'categories'>('foryou');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

  // Installation simulation state
  const [downloadingAppId, setDownloadingAppId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadStage, setDownloadStage] = useState<'pending' | 'downloading' | 'installing' | 'done'>('pending');

  const selectedApp =
    PLAY_STORE_CATALOG.find((a) => a.id === selectedAppId) ||
    installedApps.find((a) => a.id === selectedAppId);

  const isSelectedAppInstalled = Boolean(installedApps.some((a) => a.id === selectedAppId));

  // Handle realistic downloading & installing flow
  const handleStartInstall = (app: AppDefinition) => {
    setDownloadingAppId(app.id);
    setDownloadStage('pending');
    setDownloadProgress(0);

    setTimeout(() => {
      setDownloadStage('downloading');
    }, 600);
  };

  useEffect(() => {
    if (downloadStage !== 'downloading' || !downloadingAppId) return;

    const targetApp = PLAY_STORE_CATALOG.find((a) => a.id === downloadingAppId);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setDownloadStage('installing');

          // Finishing install
          setTimeout(() => {
            if (targetApp) {
              installApp(targetApp);
            }
            setDownloadStage('done');
            setDownloadingAppId(null);
            setDownloadProgress(0);
          }, 1200);

          return 100;
        }
        return prev + 15;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [downloadStage, downloadingAppId, installApp]);

  const handleCancelDownload = () => {
    setDownloadingAppId(null);
    setDownloadProgress(0);
    setDownloadStage('pending');
    showToast('Download cancelled');
  };

  const renderIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case 'Cpu':
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white rounded-2xl shadow">
            <Cpu size={size} />
          </div>
        );
      case 'Music':
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white rounded-2xl shadow">
            <Music size={size} />
          </div>
        );
      case 'Film':
        return (
          <div className="w-full h-full bg-gradient-to-br from-red-600 to-neutral-900 flex items-center justify-center text-white rounded-2xl shadow">
            <Film size={size} />
          </div>
        );
      case 'MessageCircle':
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white rounded-2xl shadow">
            <MessageCircle size={size} />
          </div>
        );
      case 'Share2':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-600 via-purple-600 to-yellow-600 flex items-center justify-center text-white rounded-2xl shadow">
            <Share2 size={size} />
          </div>
        );
      case 'Flame':
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-white rounded-2xl shadow">
            <Flame size={size} />
          </div>
        );
      case 'Wrench':
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 rounded-2xl shadow">
            <Wrench size={size} />
          </div>
        );
      case 'Gamepad2':
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white rounded-2xl shadow">
            <Gamepad2 size={size} />
          </div>
        );
      case 'Send':
        return (
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white rounded-2xl shadow">
            <Send size={size} className="-ml-0.5 -mt-0.5" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white rounded-2xl shadow">
            <Sparkles size={size} />
          </div>
        );
    }
  };

  const getFilteredCatalog = () => {
    let list = PLAY_STORE_CATALOG;
    if (bottomTab === 'games') {
      list = PLAY_STORE_CATALOG.filter((a) => a.category === 'games');
      if (list.length === 0) list = PLAY_STORE_CATALOG; // fallback
    } else if (bottomTab === 'apps') {
      list = PLAY_STORE_CATALOG.filter((a) => a.category !== 'games');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = PLAY_STORE_CATALOG.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.packageName.toLowerCase().includes(q) ||
          a.developer?.toLowerCase().includes(q) ||
          a.genre?.toLowerCase().includes(q)
      );
    }

    return list;
  };

  return (
    <div className="w-full h-full bg-[#131314] text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* ============================================================== */}
      {/* STORE LISTING APP DETAILS VIEW */}
      {/* ============================================================== */}
      {selectedApp ? (
        <div className="flex-1 flex flex-col h-full bg-[#131314] overflow-hidden animate-slideUp">
          {/* Details Top Bar */}
          <div className="px-4 py-3 bg-[#131314] border-b border-white/10 flex items-center justify-between z-20">
            <button
              onClick={() => setSelectedAppId(null)}
              className="p-1 -ml-1 text-slate-300 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3 text-slate-300">
              <Search
                size={18}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  setSelectedAppId(null);
                  setBottomTab('search');
                }}
              />
              <Share2
                size={18}
                className="cursor-pointer hover:text-white"
                onClick={() => showToast(`Link to ${selectedApp.name} copied to clipboard`)}
              />
              <MoreVertical size={18} className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Details Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-none pb-12">
            {/* App Header Row */}
            <div className="flex items-start gap-4">
              <div className="w-18 h-18 shrink-0 rounded-2xl overflow-hidden shadow-xl aspect-square">
                {renderIcon(selectedApp.icon, 36)}
              </div>

              <div className="flex-1 overflow-hidden space-y-1">
                <h1 className="text-base font-bold text-white tracking-tight leading-snug">
                  {selectedApp.name}
                </h1>
                <p className="text-xs text-emerald-400 font-medium">
                  {selectedApp.developer || 'Verified Developer'}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>Contains ads</span>
                  <span>•</span>
                  <span>In-app purchases</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Carousel */}
            <div className="flex items-center justify-around py-3 px-2 rounded-2xl bg-[#1e1f20] border border-white/5 text-center text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1 font-bold text-white">
                  <span>{selectedApp.rating || 4.5}</span>
                  <Star size={12} className="text-amber-400 fill-current" />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {selectedApp.reviewsCount || '1.2M reviews'}
                </span>
              </div>

              <div className="w-px h-7 bg-white/10" />

              <div className="space-y-0.5">
                <span className="font-bold text-white block">{selectedApp.size || '45 MB'}</span>
                <span className="text-[10px] text-slate-400 block">Download size</span>
              </div>

              <div className="w-px h-7 bg-white/10" />

              <div className="space-y-0.5">
                <span className="font-bold text-white block">
                  {selectedApp.contentRating || 'Everyone'}
                </span>
                <span className="text-[10px] text-slate-400 block">Rated for 3+</span>
              </div>

              <div className="w-px h-7 bg-white/10" />

              <div className="space-y-0.5">
                <span className="font-bold text-white block">
                  {selectedApp.downloadCount || '100M+'}
                </span>
                <span className="text-[10px] text-slate-400 block">Downloads</span>
              </div>
            </div>

            {/* Install / Download Actions */}
            <div className="space-y-2">
              {downloadingAppId === selectedApp.id ? (
                /* LIVE DOWNLOAD PROGRESS */
                <div className="bg-[#1e1f20] p-4 rounded-2xl border border-emerald-500/30 space-y-2.5 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">
                        {downloadStage === 'pending'
                          ? 'Pending...'
                          : downloadStage === 'downloading'
                          ? `Downloading... ${downloadProgress}%`
                          : 'Installing on Android 14...'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {downloadStage === 'downloading'
                          ? `${Math.round((downloadProgress / 100) * parseInt(selectedApp.size || '50'))} MB of ${selectedApp.size}`
                          : 'Verified by Google Play Protect'}
                      </span>
                    </div>

                    <button
                      onClick={handleCancelDownload}
                      className="p-1 rounded-full text-slate-400 hover:text-white"
                      title="Cancel download"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        downloadStage === 'installing'
                          ? 'bg-amber-400 animate-pulse w-full'
                          : 'bg-emerald-400'
                      }`}
                      style={{
                        width: downloadStage === 'installing' ? '100%' : `${downloadProgress}%`,
                      }}
                    />
                  </div>
                </div>
              ) : isSelectedAppInstalled ? (
                /* ALREADY INSTALLED ACTIONS */
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      uninstallApp(selectedApp.id);
                      showToast(`${selectedApp.name} uninstalled`);
                    }}
                    className="flex-1 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 font-bold text-xs transition-colors"
                  >
                    Uninstall
                  </button>
                  <button
                    onClick={() => openApp(selectedApp.id)}
                    className="flex-1 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play size={14} className="fill-current" />
                    <span>Open</span>
                  </button>
                </div>
              ) : (
                /* NOT INSTALLED ACTION */
                <button
                  onClick={() => handleStartInstall(selectedApp)}
                  className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-900/40 transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  <span>Install</span>
                </button>
              )}

              {/* Play Protect Notice */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Verified by Play Protect • No malicious code detected</span>
              </div>
            </div>

            {/* Screenshots Carousel */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white block">Preview</span>
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
                {[1, 2, 3].map((shot) => (
                  <div
                    key={shot}
                    className="w-36 h-60 shrink-0 rounded-2xl bg-gradient-to-b from-[#2a2b2e] to-[#1c1d1f] border border-white/10 p-3 flex flex-col justify-between shadow-lg"
                  >
                    <div className="w-full h-8 rounded-lg bg-white/5 flex items-center justify-between px-2 text-[9px] text-slate-400 font-mono">
                      <span>Android 14</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>

                    <div className="flex flex-col items-center text-center p-2 space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        {renderIcon(selectedApp.icon, 20)}
                      </div>
                      <span className="text-[10px] font-bold text-white leading-tight">
                        {selectedApp.name} Feature #{shot}
                      </span>
                    </div>

                    <div className="w-full h-6 rounded-lg bg-emerald-500/20 text-emerald-300 text-[9px] font-bold flex items-center justify-center">
                      Verified Safe
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About this app */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">About this app</h3>
                <ChevronRight size={16} className="text-slate-400" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedApp.description || selectedApp.summary}
              </p>

              {/* Tags / Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(selectedApp.tags || [selectedApp.genre || 'Android App', 'Popular']).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#1e1f20] border border-white/10 text-[10px] text-slate-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* What's new */}
            {selectedApp.whatsNew && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h3 className="text-xs font-bold text-white">What’s new</h3>
                <div className="bg-[#1e1f20] p-3 rounded-2xl border border-white/5 text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                  {selectedApp.whatsNew}
                </div>
              </div>
            )}

            {/* Data Safety */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold text-white">Data safety</h3>
              <div className="bg-[#1e1f20] p-3.5 rounded-2xl border border-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Shield size={14} className="text-emerald-400 shrink-0" />
                  <span>No data shared with third parties</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Lock size={14} className="text-emerald-400 shrink-0" />
                  <span>Data is encrypted in transit</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Play Protect verified safety standard</span>
                </div>
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold text-white">Ratings & reviews</h3>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-4xl font-black text-white font-mono block">
                    {selectedApp.rating || 4.7}
                  </span>
                  <div className="flex text-amber-400 gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {selectedApp.reviewsCount || '1.8M reviews'}
                  </span>
                </div>

                {/* Rating Distribution Bars */}
                <div className="flex-1 space-y-1 text-[9px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>5</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[78%] rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>4</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[14%] rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>3</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[4%] rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>2</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[2%] rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>1</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[2%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample User Review */}
              <div className="bg-[#1e1f20] p-3 rounded-2xl border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                      A
                    </div>
                    <span className="font-bold text-white">Alex Johnson</span>
                  </div>
                  <span className="text-[10px] text-slate-500">2 days ago</span>
                </div>
                <div className="flex text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={10} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Runs smoothly on Android 14! The performance and responsiveness are great.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* MAIN PLAY STORE CATALOG & BROWSING VIEW */
        /* ============================================================== */
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Search Header */}
          <div className="p-3 bg-[#131314] border-b border-white/10 space-y-2.5">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#1e1f20] border border-white/10 shadow-inner">
              {/* Google Play colored icon */}
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M3.6 1.8L13.8 12 3.6 22.2c-.4-.4-.6-1-.6-1.7V3.5c0-.7.2-1.3.6-1.7z" fill="#00e5ff" />
                  <path d="M17.2 8.6L13.8 12l3.4 3.4 4-2.3c1.1-.6 1.1-1.6 0-2.2l-4-2.3z" fill="#ffd600" />
                  <path d="M3.6 1.8l10.2 10.2 3.4-3.4-11.8-6.8c-.6-.4-1.3-.3-1.8 0z" fill="#00e676" />
                  <path d="M3.6 22.2l13.6-7.8-3.4-3.4L3.6 21.2c.4.6 1.1.7 1.8.3z" fill="#ff1744" />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search apps & games"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
              />

              <Mic
                size={16}
                className="text-slate-400 cursor-pointer hover:text-white"
                onClick={() => showToast('Listening for app search...')}
              />

              {/* Profile Avatar */}
              <div
                onClick={() => setIsAccountModalOpen(true)}
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow cursor-pointer border border-white/20 hover:scale-105 transition-transform"
                title="Google Account"
              >
                {googleAccount.name[0]}
              </div>
            </div>

            {/* Sub-Category Chips */}
            {bottomTab !== 'manage' && (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <button
                  onClick={() => setCategoryTab('foryou')}
                  className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                    categoryTab === 'foryou'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-[#1e1f20] text-slate-300 hover:text-white'
                  }`}
                >
                  For you
                </button>
                <button
                  onClick={() => setCategoryTab('topcharts')}
                  className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                    categoryTab === 'topcharts'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-[#1e1f20] text-slate-300 hover:text-white'
                  }`}
                >
                  Top charts
                </button>
                <button
                  onClick={() => setCategoryTab('categories')}
                  className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                    categoryTab === 'categories'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-[#1e1f20] text-slate-300 hover:text-white'
                  }`}
                >
                  Categories
                </button>
              </div>
            )}
          </div>

          {/* Main List Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-14">
            {bottomTab === 'manage' ? (
              /* ================= MANAGE APPS & DEVICE ================= */
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white">Manage apps & device</h2>

                {/* Play Protect Card */}
                <div className="p-3.5 rounded-2xl bg-[#1e1f20] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">Play Protect</h3>
                        <p className="text-[10px] text-slate-400">
                          {isScanningPlayProtect
                            ? 'Scanning apps...'
                            : playProtectSafe
                            ? 'No harmful apps found'
                            : 'Potential security warning'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={runPlayProtectScan}
                      disabled={isScanningPlayProtect}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      {isScanningPlayProtect ? 'Scanning...' : 'Scan'}
                    </button>
                  </div>
                </div>

                {/* Updates Status */}
                <div className="p-3.5 rounded-2xl bg-[#1e1f20] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                      <RefreshCw size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">Updates available</h3>
                      <p className="text-[10px] text-slate-400">All installed apps are up to date</p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('Checking for updates... All apps up to date')}
                    className="text-xs text-blue-400 font-bold hover:underline"
                  >
                    Check
                  </button>
                </div>

                {/* Storage Meter */}
                <div className="p-3.5 rounded-2xl bg-[#1e1f20] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Device storage</span>
                    <span className="font-mono text-slate-400">34 GB of 256 GB used</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[14%] rounded-full" />
                  </div>
                </div>

                {/* Installed Apps List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Installed on this device ({installedApps.length})
                  </span>

                  <div className="divide-y divide-white/5 bg-[#1e1f20] rounded-2xl p-2 border border-white/5">
                    {installedApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedAppId(app.id)}
                        className="p-2.5 flex items-center justify-between hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shadow">
                            {renderIcon(app.icon, 20)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{app.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {app.size || '34 MB'} • v{app.version || '1.0'}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openApp(app.id);
                          }}
                          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
                        >
                          Open
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ================= APPS & GAMES CATALOG ================= */
              <div className="space-y-5">
                {/* Hero Feature Banner */}
                {categoryTab === 'foryou' && !searchQuery && (
                  <div
                    onClick={() => setSelectedAppId('geekbench6')}
                    className="p-4 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-950 to-slate-900 border border-blue-500/30 cursor-pointer hover:border-blue-400/50 transition-all shadow-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        Featured for Android 14
                      </span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                        Vulkan 1.3
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow">
                        GB
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Geekbench 6</h3>
                        <p className="text-xs text-slate-300">
                          Benchmark your Android 14 CPU single & multi-core performance
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* App Catalog Stream */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      {categoryTab === 'topcharts'
                        ? 'Top Free Charts'
                        : categoryTab === 'categories'
                        ? 'All Categories'
                        : 'Suggested for you'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {getFilteredCatalog().length} apps available
                    </span>
                  </div>

                  <div className="space-y-2">
                    {getFilteredCatalog().map((app, index) => {
                      const isInstalled = installedApps.some((a) => a.id === app.id);

                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedAppId(app.id)}
                          className="p-3 rounded-2xl bg-[#1e1f20] hover:bg-[#252628] border border-white/5 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-sm group"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            {/* Rank number for Top Charts */}
                            {categoryTab === 'topcharts' && (
                              <span className="w-4 text-center font-bold font-mono text-sm text-slate-400">
                                {index + 1}
                              </span>
                            )}

                            {/* App Icon */}
                            <div className="w-13 h-13 rounded-2xl overflow-hidden shrink-0 shadow-md">
                              {renderIcon(app.icon, 24)}
                            </div>

                            {/* Title & Info */}
                            <div className="overflow-hidden space-y-0.5">
                              <h3 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                                {app.name}
                              </h3>
                              <p className="text-[10px] text-slate-400 truncate">
                                {app.developer || app.genre || 'Android App'}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                                <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                                  <span>{app.rating || 4.5}</span>
                                  <Star size={10} className="fill-current" />
                                </span>
                                <span>•</span>
                                <span>{app.size}</span>
                                {app.requiresRoot && (
                                  <>
                                    <span>•</span>
                                    <span className="text-orange-400 font-bold">Root</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                            {isInstalled ? (
                              <button
                                onClick={() => openApp(app.id)}
                                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                              >
                                Open
                              </button>
                            ) : downloadingAppId === app.id ? (
                              <div className="w-7 h-7 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                            ) : (
                              <button
                                onClick={() => handleStartInstall(app)}
                                className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                              >
                                Install
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Google Play Material 3 Navigation Bar */}
          <div className="absolute bottom-0 inset-x-0 h-13 bg-[#1e1f20] border-t border-white/10 flex items-center justify-around text-xs font-medium z-20">
            <button
              onClick={() => {
                setBottomTab('games');
                setSearchQuery('');
              }}
              className={`flex flex-col items-center gap-0.5 ${
                bottomTab === 'games' ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Gamepad2 size={18} />
              <span className="text-[10px]">Games</span>
            </button>

            <button
              onClick={() => {
                setBottomTab('apps');
                setSearchQuery('');
              }}
              className={`flex flex-col items-center gap-0.5 ${
                bottomTab === 'apps' ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Layers size={18} />
              <span className="text-[10px]">Apps</span>
            </button>

            <button
              onClick={() => {
                setBottomTab('search');
              }}
              className={`flex flex-col items-center gap-0.5 ${
                bottomTab === 'search' ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Search size={18} />
              <span className="text-[10px]">Search</span>
            </button>

            <button
              onClick={() => {
                setBottomTab('manage');
                setSearchQuery('');
              }}
              className={`flex flex-col items-center gap-0.5 ${
                bottomTab === 'manage' ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              <HardDrive size={18} />
              <span className="text-[10px]">Manage</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* GOOGLE ACCOUNT BOTTOM SHEET / MODAL */}
      {/* ============================================================== */}
      {isAccountModalOpen && (
        <div
          className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end p-4 animate-fadeIn"
          onClick={() => setIsAccountModalOpen(false)}
        >
          <div
            className="w-full bg-[#1e1f20] rounded-3xl p-5 border border-white/10 space-y-4 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Account Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow">
                  {googleAccount.name[0]}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{googleAccount.name}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">{googleAccount.email}</p>
                </div>
              </div>

              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Play Points Row */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm font-bold">★</span>
                <div>
                  <span className="font-bold text-white block">Play Points: Bronze</span>
                  <span className="text-[10px] text-slate-400">420 points</span>
                </div>
              </div>
              <button
                onClick={() => showToast('420 Play Points active')}
                className="text-xs text-blue-400 font-semibold hover:underline"
              >
                Use points
              </button>
            </div>

            {/* Menu Options */}
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  setBottomTab('manage');
                }}
                className="w-full p-2.5 rounded-xl hover:bg-white/5 text-left flex items-center justify-between text-slate-200"
              >
                <div className="flex items-center gap-3">
                  <HardDrive size={16} className="text-slate-400" />
                  <span>Manage apps & device</span>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  runPlayProtectScan();
                }}
                className="w-full p-2.5 rounded-xl hover:bg-white/5 text-left flex items-center justify-between text-slate-200"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Play Protect</span>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  showToast('Payments & Subscriptions: Active Google Play Balance: $25.00');
                }}
                className="w-full p-2.5 rounded-xl hover:bg-white/5 text-left flex items-center justify-between text-slate-200"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Payments & subscriptions</span>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
