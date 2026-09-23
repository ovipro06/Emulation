import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Search,
  Shield,
  Star,
  ExternalLink,
  Lock,
} from 'lucide-react';

export const ChromeApp: React.FC = () => {
  const { isRooted, magiskVersion } = useEmulator();

  const [url, setUrl] = useState<string>('https://github.com/topjohnwu/Magisk');
  const [inputUrl, setInputUrl] = useState<string>('https://github.com/topjohnwu/Magisk');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bookmarks = [
    { title: 'Magisk GitHub', url: 'https://github.com/topjohnwu/Magisk' },
    { title: 'Android 14 AOSP', url: 'https://source.android.com/docs/setup/about/android-14-release' },
    { title: 'XDA Developers', url: 'https://xdaforums.com' },
    { title: 'Reddit r/Magisk', url: 'https://reddit.com/r/Magisk' },
  ];

  const handleNavigate = (targetUrl: string) => {
    setIsLoading(true);
    setUrl(targetUrl);
    setInputUrl(targetUrl);
    setTimeout(() => setIsLoading(false), 400);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col select-none overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-white/10 p-2.5 space-y-2">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
            <ArrowLeft size={16} />
          </button>
          <button className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => handleNavigate(url)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <RotateCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>

          {/* URL Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate(inputUrl);
            }}
            className="flex-1 flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Lock size={12} className="text-emerald-400 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </form>
        </div>

        {/* Bookmarks Bar */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] px-1">
          {bookmarks.map((bm) => (
            <button
              key={bm.title}
              onClick={() => handleNavigate(bm.url)}
              className="px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 whitespace-nowrap"
            >
              {bm.title}
            </button>
          ))}
        </div>
      </div>

      {/* Web Page View */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-900 text-slate-200 scrollbar-none font-sans">
        {url.includes('Magisk') ? (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow">
                M
              </div>
              <div>
                <h2 className="text-base font-bold text-white">topjohnwu / Magisk</h2>
                <p className="text-xs text-slate-400">The Magic Mask for Android 14</p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono mt-1">
                  <span>Release: v27.0 Official</span>
                  <span>·</span>
                  <span>46.2k Stars</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-3 text-xs leading-relaxed">
              <h3 className="font-bold text-white text-sm">Features</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>
                  <strong className="text-white">MagiskSU:</strong> Provide root access for
                  applications with fine-grained authorization.
                </li>
                <li>
                  <strong className="text-white">Magisk Modules:</strong> Modify read-only
                  partitions by installing modules without tampering system binaries.
                </li>
                <li>
                  <strong className="text-white">MagiskBoot:</strong> Unpack and repack Android boot
                  images on Android 14.
                </li>
                <li>
                  <strong className="text-white">Zygisk:</strong> Run code in every Android
                  application's zygote process.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-xs text-emerald-300">
              ✓ Connected via Android 14 Virtual Ethernet. Root environment verified.
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
              <h2 className="text-sm font-bold text-white mb-2">{url}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Loading simulated web page on Android 14 Chromium engine. Play Integrity and CTS
                profile verified.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
