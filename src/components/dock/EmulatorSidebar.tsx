import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Power,
  RotateCcw,
  Volume2,
  VolumeX,
  RotateCw,
  Camera,
  Download,
  MapPin,
  Vibrate,
  Terminal,
  Settings,
  ShieldAlert,
  HardDrive,
  Hash,
  Sliders,
  Smartphone,
} from 'lucide-react';

export const EmulatorSidebar: React.FC = () => {
  const {
    togglePower,
    rebootDevice,
    adjustVolume,
    toggleOrientation,
    takeScreenshot,
    shakeDevice,
    setIsApkInstallerOpen,
    setIsGpsModalOpen,
    setIsLogcatModalOpen,
    setIsDeviceSettingsOpen,
    setIsInstallPhoneModalOpen,
    isRooted,
    toggleRoot,
    openApp,
  } = useEmulator();

  const toolButtons = [
    {
      id: 'power',
      label: 'Power',
      icon: <Power size={18} />,
      action: togglePower,
      tooltip: 'Power ON / OFF',
    },
    {
      id: 'reboot',
      label: 'Reboot',
      icon: <RotateCcw size={18} />,
      action: rebootDevice,
      tooltip: 'Reboot Android 14',
    },
    {
      id: 'volume_up',
      label: 'Vol +',
      icon: <Volume2 size={18} />,
      action: () => adjustVolume(10),
      tooltip: 'Volume Up',
    },
    {
      id: 'volume_down',
      label: 'Vol -',
      icon: <VolumeX size={18} />,
      action: () => adjustVolume(-10),
      tooltip: 'Volume Down',
    },
    {
      id: 'rotate',
      label: 'Rotate',
      icon: <RotateCw size={18} />,
      action: toggleOrientation,
      tooltip: 'Rotate Screen (Portrait/Landscape)',
    },
    {
      id: 'screenshot',
      label: 'Capture',
      icon: <Camera size={18} />,
      action: takeScreenshot,
      tooltip: 'Take Screenshot & Save',
    },
    {
      id: 'phone_install',
      label: 'To Phone',
      icon: <Smartphone size={18} />,
      action: () => setIsInstallPhoneModalOpen(true),
      tooltip: 'Download & Install on Your Phone (APK)',
      highlight: true,
    },
    {
      id: 'apk',
      label: 'Install APK',
      icon: <Download size={18} />,
      action: () => setIsApkInstallerOpen(true),
      tooltip: 'Sideload / Install APK',
      highlight: true,
    },
    {
      id: 'gps',
      label: 'GPS Mock',
      icon: <MapPin size={18} />,
      action: () => setIsGpsModalOpen(true),
      tooltip: 'Mock GPS Coordinates',
    },
    {
      id: 'shake',
      label: 'Shake',
      icon: <Vibrate size={18} />,
      action: shakeDevice,
      tooltip: 'Shake Device (Sensor Simulation)',
    },
    {
      id: 'magisk_quick',
      label: 'Magisk',
      icon: <Hash size={18} strokeWidth={3} />,
      action: () => openApp('magisk'),
      tooltip: 'Open Magisk v27.0 Root Manager',
      highlightRoot: isRooted,
    },
    {
      id: 'logcat',
      label: 'Logcat',
      icon: <Terminal size={18} />,
      action: () => setIsLogcatModalOpen(true),
      tooltip: 'Android Logcat Terminal Console',
    },
    {
      id: 'settings',
      label: 'Config',
      icon: <Sliders size={18} />,
      action: () => setIsDeviceSettingsOpen(true),
      tooltip: 'Emulator Engine & Hardware Settings',
    },
  ];

  return (
    <div className="flex flex-row lg:flex-col items-center gap-1.5 p-2 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-x-auto lg:overflow-visible">
      {toolButtons.map((btn) => (
        <button
          key={btn.id}
          onClick={btn.action}
          className={`p-2.5 rounded-xl transition-all relative group flex items-center justify-center shrink-0 ${
            btn.highlightRoot
              ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/50'
              : btn.highlight
              ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-500'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title={btn.tooltip}
        >
          {btn.icon}

          {/* Desktop Hover Tooltip */}
          <span className="hidden lg:group-hover:block absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-950 text-white text-[11px] font-medium whitespace-nowrap z-50 border border-white/15 shadow-xl pointer-events-none">
            {btn.tooltip}
          </span>
        </button>
      ))}
    </div>
  );
};
