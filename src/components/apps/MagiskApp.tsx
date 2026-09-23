import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FolderArchive,
  Terminal,
  Settings,
  RefreshCw,
  Power,
  RotateCcw,
  Plus,
  Trash2,
  EyeOff,
  Sliders,
  ChevronRight,
  Info,
  Check,
  X,
  FileCode,
} from 'lucide-react';
import { MagiskModule } from '../../types/emulator';

export const MagiskApp: React.FC = () => {
  const {
    magiskVersion,
    isRooted,
    toggleRoot,
    zygiskEnabled,
    toggleZygisk,
    selinuxStatus,
    setSelinuxStatus,
    superuserApps,
    toggleSuperuser,
    modules,
    toggleModule,
    removeModule,
    flashModule,
    denyList,
    toggleDenyList,
    installedApps,
    rebootDevice,
    showToast,
  } = useEmulator();

  const [activeTab, setActiveTab] = useState<'home' | 'superuser' | 'modules' | 'denylist'>('home');
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [flashLog, setFlashLog] = useState<string[]>([]);
  const [flashingTitle, setFlashingTitle] = useState<string>('');
  const [selectedPresetModule, setSelectedPresetModule] = useState<string>('custom');

  // Pre-configured popular modules available to flash
  const availableModulesToFlash = [
    {
      id: 'shamiko',
      name: 'Shamiko (Zygisk Hide)',
      author: 'LSPosed Team',
      version: 'v0.7.5 (198)',
      description: 'Advanced Zygisk module to hide Magisk, Zygisk, and root traces without relying on DenyList enforcement.',
    },
    {
      id: 'viper4android',
      name: 'ViPER4Android FX Audio DSP',
      author: 'Team V4A',
      version: 'v2.7.2.1',
      description: 'System-wide studio equalizer, bass booster, clarity enhancer, and convolution reverb for Android 14.',
    },
    {
      id: 'magisk_sqlite',
      name: 'SQLite3 for Android',
      author: 'Magisk Modules Repo',
      version: '3.42.0',
      description: 'Standalone sqlite3 CLI binary with full Android 14 toybox integration.',
    },
  ];

  const handleFlashPreset = (mod: typeof availableModulesToFlash[0]) => {
    setIsFlashing(true);
    setFlashingTitle(`Flashing ${mod.name}...`);
    setFlashLog([
      `- Copying zip to /data/local/tmp/${mod.id}.zip`,
      `- Mounting /system as read-write...`,
      `- Device: Google Pixel 8 Pro (husky)`,
      `- Magisk version: ${magiskVersion}`,
      `- Target directory: /data/adb/modules/${mod.id}`,
      `- Extracting module files...`,
      `- Setting permissions (chmod 0755)...`,
      `- Executing customize.sh...`,
    ]);

    setTimeout(() => {
      setFlashLog((prev) => [
        ...prev,
        `- Hooking Zygote companion...`,
        `- Patching security contexts...`,
        `- Done! Installation successful.`,
        `** Reboot required to apply changes **`,
      ]);
      flashModule(mod);
    }, 1600);
  };

  const handleCustomFlash = () => {
    const customMod = {
      id: `custom_mod_${Date.now().toString(36)}`,
      name: 'Custom Root Tweaks Pack',
      author: 'XDA Community',
      version: 'v1.4.0',
      description: 'Custom kernel tweaks, memory management, and GPU performance profiles.',
    };
    handleFlashPreset(customMod as any);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Magisk Header */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Magisk</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-500/30">
                v27.0
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={rebootDevice}
            className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-white/10 text-slate-200 transition-colors"
            title="Reboot Android"
          >
            <RotateCcw size={13} />
            <span>Reboot</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-white/10 bg-slate-900/60 px-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'home'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('superuser')}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'superuser'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Superuser ({superuserApps.filter((a) => a.granted).length})
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'modules'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Modules ({modules.length})
        </button>
        <button
          onClick={() => setActiveTab('denylist')}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'denylist'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          DenyList
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Magisk Status Card */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isRooted ? 'bg-emerald-600/30 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Magisk</h2>
                    <p className="text-xs text-slate-400">
                      Installed: <span className="font-mono text-emerald-300 font-medium">v27.0 (27000)</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleRoot}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                    isRooted
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white'
                  }`}
                >
                  {isRooted ? 'Root Active' : 'Enable Root'}
                </button>
              </div>

              {/* Status Details */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Ramdisk</span>
                  <span className="font-mono font-medium text-emerald-400">Yes (boot.img)</span>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Zygisk</span>
                    <span className="font-mono font-medium text-white">
                      {zygiskEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <button
                    onClick={toggleZygisk}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      zygiskEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    Toggle
                  </button>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[11px]">SELinux</span>
                    <span className="font-mono font-medium text-white">{selinuxStatus}</span>
                  </div>
                  <button
                    onClick={() =>
                      setSelinuxStatus(selinuxStatus === 'Enforcing' ? 'Permissive' : 'Enforcing')
                    }
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 border border-amber-500/30 font-mono"
                  >
                    Switch
                  </button>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Play Integrity</span>
                  <span className="font-mono font-medium text-emerald-400">Passing (PIF Mod)</span>
                </div>
              </div>
            </div>

            {/* Magisk App Card */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">App Manager</h3>
                  <p className="text-xs text-slate-400">
                    Package: <span className="font-mono text-slate-300">com.topjohnwu.magisk</span>
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                  Up to date
                </span>
              </div>
            </div>

            {/* Reboot Options */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Power Actions
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={rebootDevice}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
                >
                  <RotateCcw size={18} className="text-emerald-400 mb-1" />
                  <span className="text-xs font-medium text-white">Reboot</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Rebooting to Recovery (TWRP / LineageRecovery)...');
                    rebootDevice();
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
                >
                  <FolderArchive size={18} className="text-amber-400 mb-1" />
                  <span className="text-xs font-medium text-white">Recovery</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Rebooting to Fastboot / Bootloader...');
                    rebootDevice();
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
                >
                  <Power size={18} className="text-blue-400 mb-1" />
                  <span className="text-xs font-medium text-white">Bootloader</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: SUPERUSER */}
        {activeTab === 'superuser' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Root Allowed Apps
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                {superuserApps.filter((a) => a.granted).length} active
              </span>
            </div>

            {superuserApps.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 rounded-2xl p-3.5 border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white border border-white/10">
                    <Terminal size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{app.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{app.packageName}</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">
                      Granted • {app.accessCount} commands executed
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSuperuser(app.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    app.granted ? 'bg-emerald-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      app.granted ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            {/* Sideload / Flash Module Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Installed Modules ({modules.length})
                </span>
              </div>
              <button
                onClick={handleCustomFlash}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/50 transition-all active:scale-95"
              >
                <Plus size={14} />
                <span>Install from storage</span>
              </button>
            </div>

            {/* Quick Flashing Presets */}
            <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Available Modules to Flash (.zip):
              </span>
              <div className="grid grid-cols-1 gap-2">
                {availableModulesToFlash.map((mod) => (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-white/5"
                  >
                    <div>
                      <span className="text-xs font-bold text-white">{mod.name}</span>
                      <span className="text-[10px] text-slate-400 block">{mod.author} • {mod.version}</span>
                    </div>
                    <button
                      onClick={() => handleFlashPreset(mod)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-medium border border-emerald-500/40"
                    >
                      Flash .zip
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Installed Modules List */}
            <div className="space-y-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`bg-slate-900 rounded-2xl p-3.5 border transition-all ${
                    module.enabled ? 'border-emerald-500/30' : 'border-white/5 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{module.name}</h4>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {module.version}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">By {module.author}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                          module.enabled ? 'bg-emerald-600' : 'bg-slate-700'
                        }`}
                        title={module.enabled ? 'Disable Module' : 'Enable Module'}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            module.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      {module.canRemove && (
                        <button
                          onClick={() => removeModule(module.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove Module"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-white/5">
                    {module.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DENYLIST */}
        {activeTab === 'denylist' && (
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-2xl p-3 border border-white/10 text-xs">
              <span className="font-bold text-white block mb-1">Zygisk DenyList (Shamiko)</span>
              <p className="text-slate-400 text-[11px]">
                Apps selected below will have all Magisk, Zygisk, and root traces hidden from their processes.
              </p>
            </div>

            <div className="space-y-2">
              {installedApps.map((app) => {
                const isHidden = denyList.includes(app.packageName);
                return (
                  <div
                    key={app.id}
                    className="bg-slate-900 rounded-2xl p-3 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{app.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {app.packageName}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleDenyList(app.packageName)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isHidden
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {isHidden ? 'Hidden' : 'Show Root'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Flashing Simulation Modal */}
      {isFlashing && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex flex-col justify-between text-white font-mono text-xs">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <span className="text-emerald-400 font-bold">{flashingTitle}</span>
            <span className="text-slate-400 text-[10px]">Magisk Module Installer</span>
          </div>

          <div className="flex-1 my-3 bg-slate-950 p-3 rounded-xl border border-white/10 overflow-y-auto space-y-1 text-slate-300 text-[11px]">
            {flashLog.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.includes('Done')
                    ? 'text-emerald-400 font-bold'
                    : line.includes('** Reboot')
                    ? 'text-amber-300 font-bold'
                    : ''
                }
              >
                {line}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setIsFlashing(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsFlashing(false);
                rebootDevice();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg"
            >
              <RotateCcw size={14} />
              <span>Reboot</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
