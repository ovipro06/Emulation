import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Image as ImageIcon, Trash2, Share2, Sparkles } from 'lucide-react';

export const GalleryApp: React.FC = () => {
  const { screenshots } = useEmulator();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const defaultPhotos = [
    {
      id: 'p1',
      title: 'Material You Wallpaper',
      url: '/src/assets/images/android14_material_wallpaper_1790175046198.jpg',
      date: 'Today',
    },
    {
      id: 'p2',
      title: 'Dark AMOLED Wallpaper',
      url: '/src/assets/images/android14_dark_wallpaper_1790175059585.jpg',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      <div className="bg-slate-900 border-b border-white/10 p-3 flex items-center justify-between">
        <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <ImageIcon size={18} className="text-blue-400" />
          <span>Photos & Screenshots</span>
        </h1>
        <span className="text-xs text-slate-400 font-mono">
          {screenshots.length + defaultPhotos.length} items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-none">
        <div className="grid grid-cols-2 gap-3">
          {screenshots.map((shot, idx) => (
            <div
              key={`shot_${idx}`}
              onClick={() => setSelectedImage(shot)}
              className="group aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 relative cursor-pointer hover:border-blue-500 transition-colors"
            >
              <img
                src={shot}
                alt={`Screenshot ${idx}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                Screenshot {idx + 1}
              </div>
            </div>
          ))}

          {defaultPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo.url)}
              className="group aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 relative cursor-pointer hover:border-blue-500 transition-colors"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col justify-between items-center"
        >
          <div className="w-full flex justify-end">
            <button
              onClick={() => setSelectedImage(null)}
              className="px-3 py-1 bg-slate-800 rounded-full text-xs text-white"
            >
              Close
            </button>
          </div>
          <div className="max-h-[80%] max-w-[90%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-contain max-h-[500px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs text-slate-400">Tap anywhere to close preview</span>
        </div>
      )}
    </div>
  );
};
