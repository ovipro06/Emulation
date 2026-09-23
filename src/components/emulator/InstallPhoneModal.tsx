import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  Download,
  Smartphone,
  QrCode,
  Copy,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Server,
} from 'lucide-react';

interface InstallPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPhoneModal: React.FC<InstallPhoneModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'direct' | 'qrcode' | 'apk' | 'local'>('local');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate QR code using quickchart / standard QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=0f172a&color=3ddc84&margin=2`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-5 animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Install on Your Phone</h2>
              <span className="text-xs text-slate-400">Android 14 OS • WebAPK & Standalone</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-white/5 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('local')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'local'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server size={13} />
            <span>Host Locally</span>
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'direct'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Install Directly
          </button>
          <button
            onClick={() => setActiveTab('qrcode')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'qrcode'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scan QR
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'apk'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            .APK Package
          </button>
        </div>

        {/* TAB 0: 100% LOCAL HOSTING */}
        {activeTab === 'local' && (
          <div className="space-y-3.5 text-xs">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Server size={16} />
                <span>100% Offline & Local Hosting</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                You can host this entire Android 14 Emulator on your computer or local Wi-Fi network without any cloud or internet connection.
              </p>
            </div>

            {/* Quick 3 Steps */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Run locally with Node.js in 3 commands:
              </span>

              <div className="space-y-2">
                <div className="bg-black p-3 rounded-2xl border border-white/10 font-mono text-[11px] text-emerald-400 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400"># 1. Install packages</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('npm install');
                        setCopiedCmd('1');
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedCmd === '1' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedCmd === '1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-white font-bold">npm install</div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-slate-400"># 2. Start local server (LAN / Wi-Fi)</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('npm run dev');
                        setCopiedCmd('2');
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedCmd === '2' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedCmd === '2' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-white font-bold">npm run dev</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-[11px] text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Access on this PC:</span>
                    <code className="text-emerald-400 font-bold">http://localhost:3000</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Access on your Phone:</span>
                    <code className="text-sky-400 font-bold">http://&lt;your-pc-ip&gt;:3000</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Docker One-liner */}
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/5 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Docker (Optional Containerized)
              </span>
              <div className="bg-black px-2.5 py-1.5 rounded-xl font-mono text-[10px] text-slate-300 truncate">
                docker build -t android14 . && docker run -p 3000:3000 android14
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: DIRECT INSTALL (WEBAPK) */}
        {activeTab === 'direct' && (
          <div className="space-y-4">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck size={16} />
                <span>Google WebAPK Instant Install</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you install this from Google Chrome on your phone, Android generates an authentic signed <strong className="text-white">WebAPK</strong>. It places the Android 14 emulator directly in your phone’s app drawer and home screen with standalone full-screen execution.
              </p>
            </div>

            {isInstalled ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check size={18} />
                <span>Already installed and running as a standalone app!</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={install}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Download size={16} />
                <span>Install Android 14 Emulator Now</span>
              </button>
            ) : (
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  How to install in Chrome on your phone:
                </span>
                <ol className="space-y-2 text-slate-300 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5 font-mono text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">1</span>
                    <span>Open this website link in <strong>Google Chrome</strong> on your phone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">2</span>
                    <span>Tap the <strong>three dots menu (⋮)</strong> in the top right.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">3</span>
                    <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
                  </li>
                </ol>
              </div>
            )}

            {/* Copy Link Input */}
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-white/10">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="bg-transparent text-xs text-slate-400 focus:outline-none flex-1 truncate px-2 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: QR CODE SCAN */}
        {activeTab === 'qrcode' && (
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-xs text-slate-300">
              Scan this QR code with your phone camera or Google Lens to launch and install directly on your phone:
            </p>

            <div className="p-3 bg-slate-950 rounded-2xl border-2 border-emerald-500/40 shadow-xl">
              <img
                src={qrCodeUrl}
                alt="Scan to open on phone"
                className="w-48 h-48 rounded-xl object-contain"
              />
            </div>

            <button
              onClick={handleCopyLink}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Link copied to clipboard!' : 'Copy direct URL for mobile browser'}</span>
            </button>
          </div>
        )}

        {/* TAB 3: STANDALONE APK BUILDER */}
        {activeTab === 'apk' && (
          <div className="space-y-3.5 text-xs">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Sparkles size={16} />
                <span>Convert to Signed Android .APK File</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                You can generate a standalone compiled <code className="text-emerald-400">.apk</code> or Google Play <code className="text-emerald-400">.aab</code> package for this app in 1 minute using <strong>PWABuilder</strong> (created by Microsoft) or Google's <strong>Bubblewrap</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Option 1: 1-Click Online APK Generator
              </span>
              <a
                href={`https://www.pwabuilder.com?site=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-lg"
              >
                <span>Open in PWABuilder (Generate .APK)</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Option 2: Terminal Command (Bubblewrap)
              </span>
              <div className="bg-black p-3 rounded-xl border border-white/10 font-mono text-[10px] text-emerald-400 space-y-1">
                <div># Install Google Bubblewrap CLI</div>
                <div className="text-slate-300">npm i -g @bubblewrap/cli</div>
                <div className="mt-1"># Initialize and build Android APK</div>
                <div className="text-slate-300">bubblewrap init --manifest={currentUrl}manifest.webmanifest</div>
                <div className="text-slate-300">bubblewrap build</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
