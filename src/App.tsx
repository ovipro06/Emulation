import React from 'react';
import { EmulatorProvider, useEmulator } from './context/EmulatorContext';
import { PhoneFrame } from './components/emulator/PhoneFrame';
import { EmulatorSidebar } from './components/dock/EmulatorSidebar';
import { ApkInstallerModal } from './components/modals/ApkInstallerModal';
import { GpsMockerModal } from './components/modals/GpsMockerModal';
import { LogcatModal } from './components/modals/LogcatModal';
import { DeviceSettingsModal } from './components/modals/DeviceSettingsModal';
import { InstallPhoneModal } from './components/emulator/InstallPhoneModal';
import {
  Smartphone,
  ShieldCheck,
  Hash,
  Terminal,
  ShoppingBag,
  RotateCcw,
  Power,
  Sliders,
  Sparkles,
  Wifi,
  Cpu,
  HardDrive,
  Info,
  ExternalLink,
  Download,
} from 'lucide-react';

const EmulatorDashboard: React.FC = () => {
  const {
    device,
    isRooted,
    toggleRoot,
    magiskVersion,
    zygiskEnabled,
    rebootDevice,
    openApp,
    setIsDeviceSettingsOpen,
    setIsLogcatModalOpen,
    setIsApkInstallerOpen,
    isInstallPhoneModalOpen,
    setIsInstallPhoneModalOpen,
    fps,
    playIntegrityPass,
  } = useEmulator();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Emulator Control Header Bar */}
      <header className="relative z-20 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Left Brand & OS Specs */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40">
            <Smartphone size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">Android 14 OS Emulator</h1>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full border border-blue-500/30">
                API 34 (Upside Down Cake)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{device.name}</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <Hash size={11} strokeWidth={3} />
                Magisk v27.0 Root {zygiskEnabled ? '(Zygisk)' : ''}
              </span>
              <span>•</span>
              <span className="text-blue-400">Google Play Services</span>
            </p>
          </div>
        </div>

        {/* Center Quick Action Shortcuts */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => openApp('magisk')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all"
            title="Open Magisk v27.0 Manager"
          >
            <Hash size={13} strokeWidth={3} />
            <span>Magisk Root</span>
          </button>

          <button
            onClick={() => openApp('playstore')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-all"
            title="Open Google Play Store"
          >
            <ShoppingBag size={13} />
            <span>Play Store</span>
          </button>

          <button
            onClick={() => openApp('terminal')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold transition-all"
            title="Open Root Terminal (Termux)"
          >
            <Terminal size={13} className="text-amber-400" />
            <span>Root Shell</span>
          </button>

          <button
            onClick={() => setIsApkInstallerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-all"
            title="Sideload APK"
          >
            <Sparkles size={13} />
            <span>Install APK</span>
          </button>

          <button
            onClick={() => setIsInstallPhoneModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            title="Download / Install this app on your physical phone"
          >
            <Download size={13} strokeWidth={2.5} />
            <span>Install to Phone (APK)</span>
          </button>
        </div>

        {/* Right Hardware Engine Status */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/70 border border-white/10 font-mono text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold">{fps} FPS</span>
            <span>·</span>
            <span>ADB: 5555</span>
          </div>

          <button
            onClick={rebootDevice}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-white/10"
            title="Reboot Android 14"
          >
            <RotateCcw size={15} />
          </button>

          <button
            onClick={() => setIsDeviceSettingsOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-white/10"
            title="Emulator Virtualization Settings"
          >
            <Sliders size={15} />
          </button>
        </div>
      </header>

      {/* Main Studio Center Stage */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 gap-6 max-w-7xl mx-auto w-full">
        {/* Physical Smartphone Emulator */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <PhoneFrame />
        </div>

        {/* Side Emulator Quick Controls Toolstrip */}
        <div className="w-full lg:w-auto flex justify-center">
          <EmulatorSidebar />
        </div>
      </main>

      {/* Bottom Technical Status Bar */}
      <footer className="relative z-20 bg-slate-900/80 backdrop-blur-md border-t border-white/10 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Android 14 Kernel 5.15.110 running
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Google Tensor G3 Virtualized (Octa-Core)</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-blue-400">Play Protect Certified</span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <span>SELinux: Enforcing</span>
          <span>·</span>
          <span className="text-emerald-300">Zygisk Companion: Hooked</span>
        </div>
      </footer>

      {/* Global Modals */}
      <ApkInstallerModal />
      <GpsMockerModal />
      <LogcatModal />
      <DeviceSettingsModal />
      <InstallPhoneModal
        isOpen={isInstallPhoneModalOpen}
        onClose={() => setIsInstallPhoneModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <EmulatorProvider>
      <EmulatorDashboard />
    </EmulatorProvider>
  );
}
