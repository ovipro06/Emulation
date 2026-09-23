import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Camera as CameraIcon, RefreshCw, Circle, Sparkles, Image as ImageIcon } from 'lucide-react';

export const CameraApp: React.FC = () => {
  const { takeScreenshot, openApp, showToast } = useEmulator();
  const [lens, setLens] = useState<'main' | 'selfie'>('main');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      takeScreenshot();
      showToast('Photo saved to Google Photos');
    }, 300);
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col justify-between p-4 select-none overflow-hidden relative">
      {/* Viewfinder Flash Overlay */}
      {isCapturing && <div className="absolute inset-0 bg-white z-50 animate-fadeOut" />}

      {/* Top Controls */}
      <div className="flex items-center justify-between pt-2 px-2">
        <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
          Pixel Camera 9.2 (HDR+)
        </span>
        <button
          onClick={() => setLens(lens === 'main' ? 'selfie' : 'main')}
          className="p-2 rounded-full bg-black/40 text-white/90 border border-white/20 hover:bg-black/60 transition-colors"
          title="Switch lens"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Viewfinder simulation */}
      <div className="relative flex-1 my-3 rounded-3xl overflow-hidden border border-white/20 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-black">
        <div className="w-32 h-32 rounded-full border border-white/30 flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/80">
          {lens === 'main' ? '24mm f/1.68 • 50MP' : 'Selfie 10.5MP'}
        </div>
      </div>

      {/* Bottom Shutter Controls */}
      <div className="flex items-center justify-around py-4">
        <button
          onClick={() => openApp('gallery')}
          className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/15"
          title="Open Photos Gallery"
        >
          <ImageIcon size={20} />
        </button>

        {/* Shutter Button */}
        <button
          onClick={handleCapture}
          className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
          title="Capture photo"
        >
          <div className="w-14 h-14 rounded-full bg-white active:bg-slate-300 transition-colors shadow-inner" />
        </button>

        <button
          onClick={() => showToast('Night Sight enabled')}
          className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 hover:bg-white/20 transition-colors border border-white/15"
          title="Night Sight"
        >
          <Sparkles size={20} />
        </button>
      </div>
    </div>
  );
};
