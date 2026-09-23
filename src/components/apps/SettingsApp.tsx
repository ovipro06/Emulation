import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Wifi,
  Sun,
  Moon,
  ShieldAlert,
  Smartphone,
  HardDrive,
  Cpu,
  Layers,
  Sliders,
  ChevronRight,
  Info,
  Check,
  Hash,
  ShoppingBag,
  ArrowLeft,
  Search,
} from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const {
    device,
    wifiConnected,
    toggleWifi,
    darkTheme,
    toggleDarkTheme,
    brightness,
    setBrightness,
    navigationMode,
    setNavigationMode,
    isRooted,
    toggleRoot,
    zygiskEnabled,
    toggleZygisk,
    selinuxStatus,
    setSelinuxStatus,
    magiskVersion,
    gmsVersion,
    playIntegrityPass,
    wallpaper,
    setWallpaper,
    showToast,
    setIsInstallPhoneModalOpen,
  } = useEmulator();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-900 border-b border-white/10 p-3 flex items-center gap-2">
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <h1 className="text-sm font-bold text-white tracking-tight">
          {activeCategory ? activeCategory : 'Settings'}
        </h1>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">
        {!activeCategory && (
          <>
            {/* Top Search bar */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-400">
              <Search size={15} />
              <span>Search settings...</span>
            </div>

            {/* Quick Hero Banner: Root & Android 14 */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl p-3.5 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Hash size={20} strokeWidth={3} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Device Rooted</span>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    Magisk {magiskVersion.split(' ')[0]} • Zygisk active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveCategory('Root & Developer Options')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Configure →
              </button>
            </div>

            {/* Settings Categories List */}
            <div className="bg-slate-900 rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden">
              {/* Install on Your Phone (APK) */}
              <button
                onClick={() => setIsInstallPhoneModalOpen(true)}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 hover:bg-emerald-900/30 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-300 block">
                      Install on Your Phone (APK)
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      WebAPK, QR Code scan, or standalone APK download
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-emerald-400" />
              </button>

              {/* Network */}
              <button
                onClick={() => setActiveCategory('Network & Internet')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                    <Wifi size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Network & Internet</span>
                    <span className="text-[10px] text-slate-400 block">
                      {wifiConnected ? 'Wi-Fi (AndroidWifi 5G)' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              {/* Display & Navigation */}
              <button
                onClick={() => setActiveCategory('Display & Gestures')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <Sun size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Display & Gestures</span>
                    <span className="text-[10px] text-slate-400 block">
                      Dark theme, {navigationMode === 'gestures' ? 'Gesture pill' : '3-button nav'}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              {/* Root & Developer */}
              <button
                onClick={() => setActiveCategory('Root & Developer Options')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Root & Magisk Developer Options
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Zygisk, SELinux {selinuxStatus}, SU binary
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              {/* Storage */}
              <button
                onClick={() => setActiveCategory('Storage')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <HardDrive size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Storage</span>
                    <span className="text-[10px] text-slate-400 block">48.2 GB used of 256 GB (UFS 4.0)</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>

              {/* About Phone */}
              <button
                onClick={() => setActiveCategory('About Phone')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">About Phone</span>
                    <span className="text-[10px] text-slate-400 block">
                      {device.name} • Android 14
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </button>
            </div>
          </>
        )}

        {/* SUBCATEGORY: Root & Developer Options */}
        {activeCategory === 'Root & Developer Options' && (
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">MagiskSU Root Access</span>
                  <span className="text-[11px] text-slate-400 block">
                    Allow apps and adb to request root
                  </span>
                </div>
                <button
                  onClick={toggleRoot}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    isRooted ? 'bg-emerald-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      isRooted ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">Zygisk Companion</span>
                  <span className="text-[11px] text-slate-400 block">
                    Inject into Zygote process for module hooks
                  </span>
                </div>
                <button
                  onClick={toggleZygisk}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    zygiskEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      zygiskEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">SELinux Status</span>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    Current: {selinuxStatus}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setSelinuxStatus(selinuxStatus === 'Enforcing' ? 'Permissive' : 'Enforcing')
                  }
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-amber-500/30"
                >
                  Toggle
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">OEM Bootloader Unlocking</span>
                  <span className="text-[11px] text-emerald-400 block">Unlocked</span>
                </div>
                <Check size={16} className="text-emerald-400" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">USB Debugging (ADB)</span>
                  <span className="text-[11px] text-emerald-400 block">Enabled over TCP/IP 5555</span>
                </div>
                <Check size={16} className="text-emerald-400" />
              </div>
            </div>
          </div>
        )}

        {/* SUBCATEGORY: Display & Gestures */}
        {activeCategory === 'Display & Gestures' && (
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Dark Theme</span>
                <span className="text-[11px] text-slate-400 block">System-wide AMOLED night theme</span>
              </div>
              <button
                onClick={toggleDarkTheme}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  darkTheme ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    darkTheme ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-xs font-bold text-white block mb-2">System Navigation</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setNavigationMode('gestures')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    navigationMode === 'gestures'
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-white/10 bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold block">Gesture Navigation</span>
                  <span className="text-[10px] opacity-75">Swipe bar pill</span>
                </button>

                <button
                  onClick={() => setNavigationMode('buttons')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    navigationMode === 'buttons'
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-white/10 bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold block">3-Button Navigation</span>
                  <span className="text-[10px] opacity-75">Back, Home, Recents</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-xs font-bold text-white block mb-1">Smooth Display</span>
              <span className="text-[11px] text-slate-400 block mb-2">
                Dynamically increases refresh rate up to 120Hz
              </span>
              <div className="p-2 rounded-xl bg-slate-950/60 text-xs font-mono text-emerald-400">
                120 FPS Active (LTPO OLED)
              </div>
            </div>
          </div>
        )}

        {/* SUBCATEGORY: About Phone */}
        {activeCategory === 'About Phone' && (
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Device name</span>
              <span className="font-semibold text-white">{device.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Model & Hardware</span>
              <span className="font-mono text-slate-200">{device.model}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Android version</span>
              <span className="font-bold text-emerald-400">14 (Upside Down Cake)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Android security patch</span>
              <span className="text-slate-200">September 5, 2026</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Google Play Services</span>
              <span className="font-mono text-blue-400">{gmsVersion}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Magisk Root Status</span>
              <span className="font-mono text-emerald-400 font-bold">v27.0 (Zygisk: On)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Kernel version</span>
              <span className="font-mono text-[10px] text-slate-300">5.15.110-android14-9-g1234567</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Build number</span>
              <span className="font-mono text-slate-200">UDC.240805.004</span>
            </div>
          </div>
        )}

        {/* SUBCATEGORY: Storage */}
        {activeCategory === 'Storage' && (
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-white">48.2 GB used of 256 GB</span>
                <span className="text-slate-400 font-mono">19%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-blue-500 w-[12%]" title="System Android 14" />
                <div className="bg-emerald-500 w-[5%]" title="Apps & Magisk" />
                <div className="bg-amber-500 w-[2%]" title="Photos & Media" />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60">
                <span className="text-slate-300">System (Android 14 OS)</span>
                <span className="font-mono text-slate-200">18.4 GB</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60">
                <span className="text-slate-300">Magisk Root Modules & DB</span>
                <span className="font-mono text-emerald-400">1.2 GB</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60">
                <span className="text-slate-300">Google Play Services & Cache</span>
                <span className="font-mono text-slate-200">2.6 GB</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60">
                <span className="text-slate-300">Free Space</span>
                <span className="font-mono text-blue-400">207.8 GB</span>
              </div>
            </div>
          </div>
        )}

        {/* SUBCATEGORY: Network */}
        {activeCategory === 'Network & Internet' && (
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Wi-Fi</span>
                <span className="text-[11px] text-slate-400 block">AndroidWifi (5 GHz, 1200 Mbps)</span>
              </div>
              <button
                onClick={toggleWifi}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  wifiConnected ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    wifiConnected ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
