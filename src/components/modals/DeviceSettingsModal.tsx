import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Sliders, Cpu, HardDrive, Smartphone, Check, X, ShieldAlert, Zap } from 'lucide-react';
import { DEVICE_PROFILES } from '../../data/mockSystem';

export const DeviceSettingsModal: React.FC = () => {
  const {
    isDeviceSettingsOpen,
    setIsDeviceSettingsOpen,
    device,
    setDevice,
    isRooted,
    toggleRoot,
    zygiskEnabled,
    toggleZygisk,
    showToast,
    rebootDevice,
  } = useEmulator();

  const [ram, setRam] = useState<string>('8 GB');
  const [cores, setCores] = useState<string>('8 Cores');
  const [graphics, setGraphics] = useState<string>('Vulkan 1.3');

  if (!isDeviceSettingsOpen) return null;

  const handleSave = () => {
    showToast('Emulator hardware configuration saved');
    setIsDeviceSettingsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none font-sans"
      onClick={() => setIsDeviceSettingsOpen(false)}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sliders size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Emulator Device & Engine Config
              </h2>
              <span className="text-xs text-slate-400">
                Hardware virtualization parameters & device chassis
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsDeviceSettingsOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Device Profile Switcher */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Device Skin & Chassis Profile:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {DEVICE_PROFILES.map((p) => {
              const isSelected = device.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setDevice(p);
                    showToast(`Switched profile to ${p.name}`);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block truncate text-white">{p.name}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{p.screenRatio}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware Virtualization Controls */}
        <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider block">
            Engine Virtualization:
          </span>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-blue-400" />
              <span>CPU Cores</span>
            </div>
            <select
              value={cores}
              onChange={(e) => setCores(e.target.value)}
              className="bg-slate-800 text-white rounded-xl px-2.5 py-1 text-xs border border-white/10 focus:outline-none"
            >
              <option value="4 Cores">4 Cores (Quad-Core)</option>
              <option value="8 Cores">8 Cores (Octa-Core)</option>
              <option value="12 Cores">12 Cores (Extreme)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-amber-400" />
              <span>RAM Allocation</span>
            </div>
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="bg-slate-800 text-white rounded-xl px-2.5 py-1 text-xs border border-white/10 focus:outline-none"
            >
              <option value="4 GB">4 GB LPDDR5X</option>
              <option value="8 GB">8 GB LPDDR5X</option>
              <option value="12 GB">12 GB LPDDR5X</option>
              <option value="16 GB">16 GB LPDDR5X</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-purple-400" />
              <span>Graphics Backend</span>
            </div>
            <select
              value={graphics}
              onChange={(e) => setGraphics(e.target.value)}
              className="bg-slate-800 text-white rounded-xl px-2.5 py-1 text-xs border border-white/10 focus:outline-none"
            >
              <option value="Vulkan 1.3">Vulkan 1.3 (Direct GPU)</option>
              <option value="OpenGL ES 3.2">OpenGL ES 3.2</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
          <button
            onClick={() => setIsDeviceSettingsOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-xl text-white shadow"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
