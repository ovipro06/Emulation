import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Volume2, VolumeX } from 'lucide-react';

export const VolumeSlider: React.FC = () => {
  const { volume, showVolumeSlider, adjustVolume } = useEmulator();

  if (!showVolumeSlider) return null;

  return (
    <div className="absolute right-3 top-24 z-50 flex flex-col items-center bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 border border-white/15 shadow-2xl animate-fadeIn select-none w-10">
      <div className="text-white/80 p-1">
        {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </div>

      <div className="relative h-32 w-4 bg-slate-700/80 rounded-full my-2 overflow-hidden flex flex-col justify-end">
        <div
          className="w-full bg-blue-500 rounded-full transition-all duration-150"
          style={{ height: `${volume}%` }}
        />
      </div>

      <span className="text-[10px] font-mono text-white/90 tabular-nums">{volume}%</span>
    </div>
  );
};
