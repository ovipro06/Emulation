import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { MapPin, Navigation, Compass, Layers, Search } from 'lucide-react';

export const MapsApp: React.FC = () => {
  const { gpsCoords, setIsGpsModalOpen } = useEmulator();

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col justify-between select-none overflow-hidden font-sans relative">
      {/* Top Floating Search */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 p-2.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
        <MapPin size={16} className="text-red-400 shrink-0" />
        <span className="text-xs text-white truncate flex-1">{gpsCoords.city}</span>
        <button
          onClick={() => setIsGpsModalOpen(true)}
          className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-semibold px-2.5 py-1 rounded-xl transition-colors"
        >
          Mock GPS
        </button>
      </div>

      {/* Simulated Map Canvas */}
      <div className="flex-1 w-full h-full bg-[#1b2431] relative flex items-center justify-center overflow-hidden">
        {/* Grid lines representing street grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Road simulations */}
        <div className="absolute w-full h-4 bg-slate-700/60 rotate-12" />
        <div className="absolute w-full h-6 bg-amber-500/30 -rotate-45" />
        <div className="absolute h-full w-5 bg-blue-500/30 rotate-6" />

        {/* Current Location Blue Dot with pulsing radar ring */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping absolute" />
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-xl flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Floating coordinates badge */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-slate-300">
          Lat: {gpsCoords.lat.toFixed(4)}, Lng: {gpsCoords.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
};
