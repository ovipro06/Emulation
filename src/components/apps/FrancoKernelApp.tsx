import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Flame,
  Cpu,
  Zap,
  Battery,
  Thermometer,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Gauge,
  Layers,
  Settings2,
} from 'lucide-react';

export const FrancoKernelApp: React.FC = () => {
  const { isRooted, showToast, addLogcat, device } = useEmulator();

  const [activeTab, setActiveTab] = useState<'cpu' | 'battery' | 'gpu'>('cpu');
  const [governor, setGovernor] = useState<string>('schedutil');
  const [hbmEnabled, setHbmEnabled] = useState<boolean>(false);
  const [zramBoost, setZramBoost] = useState<boolean>(true);

  // Simulated live CPU frequencies (Core 0 to 7)
  const [coreFreqs, setCoreFreqs] = useState<number[]>([
    1324, 1324, 1540, 1540, 1980, 2150, 2150, 2913,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoreFreqs([
        400 + Math.floor(Math.random() * 1100),
        400 + Math.floor(Math.random() * 1100),
        600 + Math.floor(Math.random() * 1300),
        600 + Math.floor(Math.random() * 1300),
        1100 + Math.floor(Math.random() * 1100),
        1100 + Math.floor(Math.random() * 1100),
        1400 + Math.floor(Math.random() * 1200),
        governor === 'performance' ? 2913 : 1200 + Math.floor(Math.random() * 1713),
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, [governor]);

  const handleGovernorChange = (newGov: string) => {
    setGovernor(newGov);
    showToast(`Kernel CPU Governor set to '${newGov}'`);
    addLogcat(
      'I',
      'FKM_Root',
      `echo ${newGov} > /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor`
    );
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow">
            <Flame size={18} />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-tight">Franco Kernel Manager</h1>
            <span className="text-[10px] text-slate-400">Linux 5.15.110 • Francisco Franco</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 size={11} />
          <span># Root Granted</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 bg-slate-900/60 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('cpu')}
          className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'cpu'
              ? 'border-orange-500 text-orange-400 bg-orange-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Cpu size={14} />
          <span>CPU Cores</span>
        </button>
        <button
          onClick={() => setActiveTab('battery')}
          className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'battery'
              ? 'border-orange-500 text-orange-400 bg-orange-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Battery size={14} />
          <span>Thermal & Battery</span>
        </button>
        <button
          onClick={() => setActiveTab('gpu')}
          className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 ${
            activeTab === 'gpu'
              ? 'border-orange-500 text-orange-400 bg-orange-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Gauge size={14} />
          <span>GPU & Memory</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        {activeTab === 'cpu' && (
          <div className="space-y-4">
            {/* CPU Governor Card */}
            <div className="bg-slate-900 rounded-2xl p-3.5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">CPU Frequency Governor</span>
                <span className="text-[10px] font-mono text-orange-400 uppercase">{governor}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {['schedutil', 'performance', 'powersave', 'conservative'].map((gov) => (
                  <button
                    key={gov}
                    onClick={() => handleGovernorChange(gov)}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      governor === gov
                        ? 'bg-orange-600 text-white border-orange-500 font-bold shadow'
                        : 'bg-slate-950/60 text-slate-300 border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {gov}
                  </button>
                ))}
              </div>
            </div>

            {/* Live 8-Cores Cluster */}
            <div className="bg-slate-900 rounded-2xl p-3.5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">8-Core Cluster Live Frequencies</span>
                <span className="text-[10px] text-emerald-400 font-mono animate-pulse">● LIVE</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {coreFreqs.map((freq, idx) => {
                  const maxFreq = idx === 7 ? 2913 : idx >= 4 ? 2350 : 1700;
                  const percent = Math.min(100, Math.round((freq / maxFreq) * 100));

                  return (
                    <div
                      key={idx}
                      className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">
                          {idx === 7 ? 'Prime Core 7' : `Core ${idx}`}
                        </span>
                        <span className="font-mono font-bold text-white">{freq} MHz</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            idx === 7
                              ? 'bg-amber-400'
                              : idx >= 4
                              ? 'bg-blue-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'battery' && (
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white block">Battery & Thermal Statistics</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Temperature</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">31.8°C</span>
                  <span className="text-[10px] text-slate-500">Cool / Optimal</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Voltage</span>
                  <span className="text-base font-bold text-blue-400 font-mono">4.18 V</span>
                  <span className="text-[10px] text-slate-500">Li-ion LPDDR</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Health</span>
                  <span className="text-base font-bold text-emerald-400">Good</span>
                  <span className="text-[10px] text-slate-500">100% capacity</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Current Draw</span>
                  <span className="text-base font-bold text-amber-400 font-mono">-310 mA</span>
                  <span className="text-[10px] text-slate-500">Discharging</span>
                </div>
              </div>
            </div>

            {/* High Brightness Mode */}
            <div className="bg-slate-900 rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">High Brightness Mode (HBM)</span>
                <span className="text-[10px] text-slate-400 block">
                  Overdrives OLED brightness up to 2,400 nits via root
                </span>
              </div>
              <button
                onClick={() => {
                  setHbmEnabled(!hbmEnabled);
                  showToast(hbmEnabled ? 'HBM Disabled' : 'HBM 2400 nits Activated');
                }}
                className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                  hbmEnabled ? 'bg-orange-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gpu' && (
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white block">GPU Graphics Driver</span>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Renderer</span>
                <span className="text-xs font-bold text-white">ARM Mali-G715 Immortalis (Vulkan 1.3)</span>
                <div className="flex justify-between text-[11px] pt-2">
                  <span className="text-slate-400">Max Clock:</span>
                  <span className="font-mono text-purple-400 font-bold">890 MHz</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">ZRAM Memory Swap (4GB)</span>
                <span className="text-[10px] text-slate-400 block">
                  LZ4 compression for zero background app reloads
                </span>
              </div>
              <button
                onClick={() => {
                  setZramBoost(!zramBoost);
                  showToast(zramBoost ? 'ZRAM disabled' : 'ZRAM 4GB Active');
                }}
                className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                  zramBoost ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
