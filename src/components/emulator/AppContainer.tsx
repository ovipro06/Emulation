import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { MagiskApp } from '../apps/MagiskApp';
import { PlayStoreApp } from '../apps/PlayStoreApp';
import { TerminalApp } from '../apps/TerminalApp';
import { RootExplorerApp } from '../apps/RootExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { ChromeApp } from '../apps/ChromeApp';
import { CameraApp } from '../apps/CameraApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { GalleryApp } from '../apps/GalleryApp';
import { MapsApp } from '../apps/MapsApp';
import { YouTubeApp } from '../apps/YouTubeApp';
import { AdAwayApp } from '../apps/AdAwayApp';
import { GeekbenchApp } from '../apps/GeekbenchApp';
import { SpotifyApp } from '../apps/SpotifyApp';
import { WhatsAppApp } from '../apps/WhatsAppApp';
import { InstagramApp } from '../apps/InstagramApp';
import { NetflixApp } from '../apps/NetflixApp';
import { FrancoKernelApp } from '../apps/FrancoKernelApp';
import { LuckyPatcherApp } from '../apps/LuckyPatcherApp';
import { SubwayRunnerApp } from '../apps/SubwayRunnerApp';
import { CpuZApp } from '../apps/CpuZApp';
import { TelegramApp } from '../apps/TelegramApp';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AppContainer: React.FC = () => {
  const { activeAppId, installedApps, closeCurrentApp } = useEmulator();

  if (!activeAppId) return null;

  const currentApp = installedApps.find((a) => a.id === activeAppId);

  const renderAppContent = () => {
    switch (activeAppId) {
      case 'magisk':
        return <MagiskApp />;
      case 'playstore':
        return <PlayStoreApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'rootexplorer':
        return <RootExplorerApp />;
      case 'settings':
        return <SettingsApp />;
      case 'chrome':
        return <ChromeApp />;
      case 'camera':
        return <CameraApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'gallery':
        return <GalleryApp />;
      case 'maps':
        return <MapsApp />;
      case 'youtube':
        return <YouTubeApp />;
      case 'adaway':
        return <AdAwayApp />;
      case 'geekbench6':
        return <GeekbenchApp />;
      case 'spotify':
        return <SpotifyApp />;
      case 'whatsapp':
        return <WhatsAppApp />;
      case 'instagram':
        return <InstagramApp />;
      case 'netflix':
        return <NetflixApp />;
      case 'kernelmanager':
        return <FrancoKernelApp />;
      case 'luckypatcher':
        return <LuckyPatcherApp />;
      case 'subwayrunner':
        return <SubwayRunnerApp />;
      case 'cpuz':
        return <CpuZApp />;
      case 'telegram':
        return <TelegramApp />;
      default:
        return (
          <div className="w-full h-full bg-slate-950 text-white flex flex-col justify-between p-6 select-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h2 className="text-sm font-bold text-white">{currentApp?.name || 'Application'}</h2>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentApp?.packageName}
                </span>
              </div>
              <button
                onClick={closeCurrentApp}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Exit
              </button>
            </div>

            <div className="my-auto flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xl mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="text-base font-bold text-white">{currentApp?.name}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[260px] leading-relaxed">
                {currentApp?.summary ||
                  'Running natively inside Android 14 OS runtime environment with Google Play Services.'}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={14} />
                <span>Play Integrity Checked: Safe</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-400 flex justify-between">
              <span>Android Runtime (ART 14)</span>
              <span className="font-mono text-slate-200">PID: 4892</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-slate-950 animate-fadeIn overflow-hidden">
      {renderAppContent()}
    </div>
  );
};
