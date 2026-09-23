import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { MapPin, Navigation, X, Check } from 'lucide-react';

export const GpsMockerModal: React.FC = () => {
  const { isGpsModalOpen, setIsGpsModalOpen, gpsCoords, setGpsCoords, showToast, addLogcat } =
    useEmulator();

  const [lat, setLat] = useState<string>(String(gpsCoords.lat));
  const [lng, setLng] = useState<string>(String(gpsCoords.lng));
  const [cityName, setCityName] = useState<string>(gpsCoords.city);

  if (!isGpsModalOpen) return null;

  const presetLocations = [
    { city: 'Mountain View (Googleplex)', lat: 37.422, lng: -122.0841 },
    { city: 'Tokyo, Japan (Akihabara)', lat: 35.6997, lng: 139.7714 },
    { city: 'London, UK (King’s Cross)', lat: 51.5314, lng: -0.1261 },
    { city: 'New York City (Manhattan)', lat: 40.7128, lng: -74.006 },
    { city: 'Paris, France (Eiffel)', lat: 48.8584, lng: 2.2945 },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoords = {
      lat: parseFloat(lat) || 37.422,
      lng: parseFloat(lng) || -122.0841,
      city: cityName || 'Custom Mock Coordinates',
    };
    setGpsCoords(newCoords);
    showToast(`GPS location set to ${newCoords.city}`);
    addLogcat('I', 'LocationManagerService', `Mock GPS injected: Lat ${newCoords.lat}, Lng ${newCoords.lng}`);
    setIsGpsModalOpen(false);
  };

  const handleSelectPreset = (preset: typeof presetLocations[0]) => {
    setLat(String(preset.lat));
    setLng(String(preset.lng));
    setCityName(preset.city);
    setGpsCoords(preset);
    showToast(`GPS location updated to ${preset.city}`);
    addLogcat('I', 'LocationManagerService', `Mock GPS injected: ${preset.city}`);
    setIsGpsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none font-sans"
      onClick={() => setIsGpsModalOpen(false)}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Virtual GPS Coordinates Injector
              </h2>
              <span className="text-xs text-slate-400">
                Mock Android 14 Location Providers (FusedLocationProvider)
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsGpsModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Quick City Presets:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {presetLocations.map((p) => (
              <button
                key={p.city}
                onClick={() => handleSelectPreset(p)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-white/5 text-left transition-colors"
              >
                <span className="text-xs font-semibold text-white">{p.city}</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {p.lat.toFixed(2)}, {p.lng.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleApply} className="space-y-3 pt-2 border-t border-white/10">
          <span className="text-xs font-semibold text-slate-300 block">Custom Coordinates:</span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full bg-slate-800 text-xs px-3 py-2 rounded-xl border border-white/10 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full bg-slate-800 text-xs px-3 py-2 rounded-xl border border-white/10 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsGpsModalOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-xl text-white shadow"
            >
              Inject GPS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
