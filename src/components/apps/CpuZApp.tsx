import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Cpu,
  Smartphone,
  Layers,
  Battery,
  Activity,
  CheckCircle2,
  HardDrive,
  Info,
} from 'lucide-react';

export const CpuZApp: React.FC = () => {
  const { device, isRooted, batteryLevel } = useEmulator();

  const [activeTab, setActiveTab] = useState<'soc' | 'device' | 'system' | 'battery' | 'sensors'>('soc');

  // Live sensor values
  const [sensors, setSensors] = useState({
    accelX: 0.12,
    accelY: 9.81,
    accelZ: 0.44,
    gyroX: 0.01,
    gyroY: -0.02,
    gyroZ: 0.0,
    light: 340,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors({
        accelX: Number((Math.random() * 0.4 - 0.2).toFixed(2)),
        accelY: Number((9.75 + Math.random() * 0.15).toFixed(2)),
        accelZ: Number((Math.random() * 0.5 - 0.25).toFixed(2)),
        gyroX: Number((Math.random() * 0.04 - 0.02).toFixed(3)),
        gyroY: Number((Math.random() * 0.04 - 0.02).toFixed(3)),
        gyroZ: Number((Math.random() * 0.02 - 0.01).toFixed(3)),
        light: Math.floor(320 + Math.random() * 40),
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#111] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-[#1e1e1e] border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-600 rounded flex items-center justify-center font-black text-xs">
            Z
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-wide">CPU-Z for Android</h1>
            <span className="text-[9px] text-neutral-400">CPUID • v1.43</span>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">SOC ONLINE</span>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-none bg-[#181818] border-b border-neutral-800 text-[11px] font-bold">
        {[
          { id: 'soc', label: 'SOC' },
          { id: 'device', label: 'DEVICE' },
          { id: 'system', label: 'SYSTEM' },
          { id: 'battery', label: 'BATTERY' },
          { id: 'sensors', label: 'SENSORS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none text-xs">
        {activeTab === 'soc' && (
          <div className="space-y-1.5 divide-y divide-neutral-800 bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 font-mono">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">SoC Name</span>
              <span className="text-white font-bold">Google Tensor G3</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Cores</span>
              <span className="text-white">8 (1+4+3 Cluster)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Architecture</span>
              <span className="text-white">ARMv9.2-A (64-bit)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Core 0 - 2</span>
              <span className="text-emerald-400">Cortex-A520 @ 1.70 GHz</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Core 3 - 6</span>
              <span className="text-blue-400">Cortex-A720 @ 2.35 GHz</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Core 7 (Prime)</span>
              <span className="text-amber-400">Cortex-X4 @ 2.91 GHz</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">GPU Vendor</span>
              <span className="text-white">ARM Ltd.</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">GPU Renderer</span>
              <span className="text-purple-400">Mali-G715 Immortalis</span>
            </div>
          </div>
        )}

        {activeTab === 'device' && (
          <div className="space-y-1.5 divide-y divide-neutral-800 bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 font-mono">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Model</span>
              <span className="text-white font-bold">{device.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Manufacturer</span>
              <span className="text-white">{device.manufacturer}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Board</span>
              <span className="text-white">{device.model}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Screen Resolution</span>
              <span className="text-white">
                {device.widthPx} x {device.heightPx} px
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Total RAM</span>
              <span className="text-white">11,540 MB (12 GB)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Available RAM</span>
              <span className="text-emerald-400">7,210 MB</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Internal Storage</span>
              <span className="text-white">256.0 GB (UFS 4.0)</span>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-1.5 divide-y divide-neutral-800 bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 font-mono">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Android Version</span>
              <span className="text-emerald-400 font-bold">14 (Upside Down Cake)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">API Level</span>
              <span className="text-white">34</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Security Patch</span>
              <span className="text-white">2024-09-05</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Kernel Version</span>
              <span className="text-white">Linux 5.15.110-android14</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Root Access</span>
              <span className="text-emerald-400 font-bold">
                {isRooted ? 'YES (MagiskSU v27.0)' : 'NO'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Google Play Services</span>
              <span className="text-sky-400">v24.16.14 (Active)</span>
            </div>
          </div>
        )}

        {activeTab === 'battery' && (
          <div className="space-y-1.5 divide-y divide-neutral-800 bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 font-mono">
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Health</span>
              <span className="text-emerald-400 font-bold">Good</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Level</span>
              <span className="text-white">{batteryLevel}%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Power Source</span>
              <span className="text-white">Battery (Discharging)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Temperature</span>
              <span className="text-emerald-400">31.4 °C</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Voltage</span>
              <span className="text-white">4180 mV</span>
            </div>
          </div>
        )}

        {activeTab === 'sensors' && (
          <div className="space-y-2 font-mono">
            <div className="bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 space-y-1">
              <span className="text-[10px] text-purple-400 font-bold block">
                3-Axis Accelerometer (LSM6DSO)
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-300">
                <div>X: {sensors.accelX} m/s²</div>
                <div>Y: {sensors.accelY} m/s²</div>
                <div>Z: {sensors.accelZ} m/s²</div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 space-y-1">
              <span className="text-[10px] text-blue-400 font-bold block">
                3-Axis Gyroscope (LSM6DSO)
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-300">
                <div>X: {sensors.gyroX} rad/s</div>
                <div>Y: {sensors.gyroY} rad/s</div>
                <div>Z: {sensors.gyroZ} rad/s</div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-3 border border-neutral-800 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block">
                Ambient Light Sensor (TMD3725)
              </span>
              <div className="text-[11px] text-neutral-300">Illuminance: {sensors.light} lux</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
