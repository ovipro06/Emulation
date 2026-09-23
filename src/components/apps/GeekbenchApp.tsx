import React, { useState, useEffect } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Cpu,
  Zap,
  BarChart3,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export const GeekbenchApp: React.FC = () => {
  const { device, addLogcat, showToast } = useEmulator();

  const [activeTab, setActiveTab] = useState<'cpu' | 'compute' | 'history'>('cpu');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testPhase, setTestPhase] = useState<number>(0);
  const [currentTestName, setCurrentTestName] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [benchmarkType, setBenchmarkType] = useState<'CPU' | 'Vulkan Compute'>('CPU');

  // Benchmark scores
  const [singleCoreScore, setSingleCoreScore] = useState<number>(1784);
  const [multiCoreScore, setMultiCoreScore] = useState<number>(4522);
  const [vulkanScore, setVulkanScore] = useState<number>(8940);

  const cpuTests = [
    'AES-XTS Cryptography (Single-Core)',
    'Text Compression & Decompression',
    'Navigation & Vector Map Graph Routing',
    'Ray Tracing 2.0 (Direct Illumination)',
    'Photo Filter (HDR Color Matrix)',
    'Background Blur (Portrait Depth Map)',
    'Face Detection (Convolutional Neural Net)',
    'Structure from Motion (3D Photogrammetry)',
    'Horizon Detection (Computer Vision)',
    'Machine Learning (INT8 / FP16 Inference)',
    'SQLite Database Read/Write Throughput',
    'Multi-Core Thread Pool Sync & Work Stealing',
  ];

  const handleStartBenchmark = (type: 'CPU' | 'Vulkan Compute') => {
    setBenchmarkType(type);
    setIsRunning(true);
    setProgress(0);
    setTestPhase(0);
    setHasCompleted(false);

    addLogcat('I', 'Geekbench6', `Starting ${type} Benchmark on ${device.name}...`);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const currentStage = Math.min(
          cpuTests.length - 1,
          Math.floor((next / 100) * cpuTests.length)
        );
        setTestPhase(currentStage);
        setCurrentTestName(cpuTests[currentStage]);

        if (next >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setHasCompleted(true);
          // slight score randomization for realism
          const randSingle = 1750 + Math.floor(Math.random() * 60);
          const randMulti = 4480 + Math.floor(Math.random() * 120);
          const randVulkan = 8850 + Math.floor(Math.random() * 200);
          setSingleCoreScore(randSingle);
          setMultiCoreScore(randMulti);
          setVulkanScore(randVulkan);

          addLogcat(
            'I',
            'Geekbench6',
            `Benchmark finished: Single: ${randSingle}, Multi: ${randMulti}`
          );
          showToast('Geekbench 6 benchmark completed!');
          return 100;
        }
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isRunning, device.name]);

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top App Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow font-black text-sm">
            GB
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-tight">Geekbench 6</h1>
            <span className="text-[10px] text-slate-400">Primate Labs • v6.3.0</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-white/10 text-[10px] text-emerald-400">
          <ShieldCheck size={12} />
          <span>Verified Device</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-slate-900/60 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('cpu')}
          className={`flex-1 py-2.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'cpu'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Cpu size={14} />
          <span>CPU</span>
        </button>
        <button
          onClick={() => setActiveTab('compute')}
          className={`flex-1 py-2.5 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'compute'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={14} />
          <span>Vulkan Compute</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
        {/* Device Information Card */}
        <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-white/10 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            System Information
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 block">Device</span>
              <span className="font-semibold text-white truncate block">{device.name}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 block">Operating System</span>
              <span className="font-semibold text-blue-400">Android 14 (API 34)</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 block">Processor</span>
              <span className="font-semibold text-white truncate block">Google Tensor G3 / 8-Core</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 block">Cluster Topology</span>
              <span className="font-mono text-[11px] text-amber-300">1x Cortex-X4 @ 2.91GHz</span>
            </div>
          </div>
        </div>

        {/* BENCHMARK RUNNING SCREEN */}
        {isRunning ? (
          <div className="bg-slate-900 rounded-3xl p-6 border border-blue-500/30 flex flex-col items-center text-center space-y-4 shadow-xl">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-blue-500 transition-all duration-200"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-mono font-bold text-white">{progress}%</span>
                <span className="text-[9px] text-blue-400 font-semibold uppercase">Running</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{benchmarkType} Benchmark in progress</h3>
              <p className="text-xs text-blue-300 font-mono mt-1 animate-pulse">
                {currentTestName}
              </p>
              <span className="text-[10px] text-slate-500 block mt-1">
                Stage {testPhase + 1} of {cpuTests.length}
              </span>
            </div>

            <div className="w-full bg-slate-950/80 p-2.5 rounded-xl border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
              <span>CPU Temperature: 42.1°C</span>
              <span className="text-emerald-400">8 Cores Active</span>
            </div>
          </div>
        ) : hasCompleted ? (
          /* BENCHMARK RESULTS VIEW */
          <div className="space-y-3 animate-fadeIn">
            <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 rounded-3xl p-5 border border-blue-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white">Geekbench 6 Score</h3>
                  <span className="text-[10px] text-slate-400">Tested just now on Android 14</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  <span>Valid Result</span>
                </div>
              </div>

              {activeTab === 'cpu' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Single-Core Score
                    </span>
                    <span className="text-3xl font-black text-blue-400 font-mono block mt-1">
                      {singleCoreScore}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Tensor G3 Prime Core
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Multi-Core Score
                    </span>
                    <span className="text-3xl font-black text-emerald-400 font-mono block mt-1">
                      {multiCoreScore}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      All 8 Cores Clustered
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 text-center">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">
                    Vulkan 1.3 Compute Score
                  </span>
                  <span className="text-4xl font-black text-purple-400 font-mono block mt-1">
                    {vulkanScore}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Mali-G715 Immortalis GPU Driver
                  </span>
                </div>
              )}

              {/* Comparison Leaderboard */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Device Comparison (Multi-Core)
                </span>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-blue-300 font-semibold">{device.name} (This Phone)</span>
                      <span className="font-mono text-white font-bold">{multiCoreScore}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[90%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Samsung Galaxy S24 Ultra (8 Gen 3)</span>
                      <span className="font-mono text-slate-400">4,910</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full w-[98%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Google Pixel 7 Pro (Tensor G2)</span>
                      <span className="font-mono text-slate-400">3,650</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full w-[72%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartBenchmark(activeTab === 'cpu' ? 'CPU' : 'Vulkan Compute')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/10"
              >
                <RotateCcw size={14} />
                <span>Run Benchmark Again</span>
              </button>
            </div>
          </div>
        ) : (
          /* BENCHMARK IDLE LAUNCH CARD */
          <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto shadow-lg">
              {activeTab === 'cpu' ? <Cpu size={32} /> : <Zap size={32} />}
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                {activeTab === 'cpu' ? 'CPU Benchmark' : 'Compute Benchmark'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                {activeTab === 'cpu'
                  ? 'Tests real-world single-core and multi-core CPU performance using modern workloads.'
                  : 'Measures your device GPU compute potential using the Vulkan 1.3 graphics API.'}
              </p>
            </div>

            <button
              onClick={() => handleStartBenchmark(activeTab === 'cpu' ? 'CPU' : 'Vulkan Compute')}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Activity size={16} />
              <span>
                {activeTab === 'cpu' ? 'Run CPU Benchmark' : 'Run Vulkan Compute Benchmark'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
