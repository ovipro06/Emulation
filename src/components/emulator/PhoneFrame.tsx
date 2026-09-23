import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { StatusBar } from './StatusBar';
import { NavigationBar } from './NavigationBar';
import { HomeScreen } from './HomeScreen';
import { AppContainer } from './AppContainer';
import { LockScreen } from './LockScreen';
import { NotificationShade } from './NotificationShade';
import { RecentsOverview } from './RecentsOverview';
import { SuperuserDialog } from './SuperuserDialog';
import { VolumeSlider } from './VolumeSlider';

export const PhoneFrame: React.FC = () => {
  const {
    device,
    isPoweredOn,
    isBooting,
    bootProgress,
    isLocked,
    orientation,
    togglePower,
    rebootDevice,
    adjustVolume,
    isShaking,
    lastToast,
  } = useEmulator();

  return (
    <div
      className={`relative flex items-center justify-center select-none transition-transform duration-300 ${
        isShaking ? 'animate-shake' : ''
      }`}
    >
      {/* Physical Hardware Buttons on Chassis */}
      {/* Power Button (Right) */}
      <button
        onClick={togglePower}
        onContextMenu={(e) => {
          e.preventDefault();
          rebootDevice();
        }}
        className="absolute -right-3 top-28 w-3 h-14 bg-slate-700 hover:bg-slate-600 rounded-r-md cursor-pointer active:scale-x-75 transition-all shadow-md z-10"
        title="Power Button (Click to toggle screen / Right-click to reboot)"
      />

      {/* Volume Up Button (Right) */}
      <button
        onClick={() => adjustVolume(10)}
        className="absolute -right-3 top-48 w-3 h-12 bg-slate-700 hover:bg-slate-600 rounded-r-md cursor-pointer active:scale-x-75 transition-all shadow-md z-10"
        title="Volume Up"
      />

      {/* Volume Down Button (Right) */}
      <button
        onClick={() => adjustVolume(-10)}
        className="absolute -right-3 top-62 w-3 h-12 bg-slate-700 hover:bg-slate-600 rounded-r-md cursor-pointer active:scale-x-75 transition-all shadow-md z-10"
        title="Volume Down"
      />

      {/* Outer Phone Bezel Frame */}
      <div
        className={`p-3.5 sm:p-4 bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-700/80 transition-all ${
          device.cornerRadius
        } ${
          orientation === 'landscape'
            ? 'w-[780px] h-[390px] sm:w-[840px] sm:h-[412px]'
            : device.aspectClass
        }`}
      >
        {/* Inner Phone Screen Display Container */}
        <div
          className={`relative w-full h-full overflow-hidden bg-slate-950 flex flex-col justify-between ${
            device.cornerRadius === 'rounded-[46px]' ? 'rounded-[36px]' : 'rounded-[24px]'
          } border border-white/10 shadow-inner`}
          style={{
            backgroundImage: `url(/src/assets/images/android14_material_wallpaper_1790175046198.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle Screen Ambient Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none z-20" />

          {/* Punch-Hole Front Camera */}
          {device.punchHolePosition === 'center' && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border border-white/20 z-40 flex items-center justify-center pointer-events-none shadow">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80" />
            </div>
          )}

          {/* SCREEN POWERED OFF STATE */}
          {!isPoweredOn ? (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center select-none text-white/40">
              <span className="text-xs font-mono">Device Powered Off</span>
              <span className="text-[11px] text-white/30 mt-1">Press Power button to boot</span>
            </div>
          ) : isBooting ? (
            /* ANDROID 14 BOOT ANIMATION */
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 select-none text-white animate-fadeIn">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-amber-400 to-red-500 flex items-center justify-center text-white text-2xl font-black shadow-2xl animate-spin">
                  G
                </div>
              </div>

              <span className="text-sm font-bold tracking-tight text-white/95">
                Android 14
              </span>
              <span className="text-xs text-amber-300/90 font-mono mt-0.5">
                Upside Down Cake • Magisk v27.0
              </span>

              {/* Boot Progress Bar */}
              <div className="w-48 bg-slate-800 h-1.5 rounded-full mt-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-2">
                Loading Zygisk Companion... {bootProgress}%
              </span>
            </div>
          ) : (
            /* ACTIVE RUNNING OS */
            <>
              {/* Top Android 14 Status Bar */}
              <StatusBar />

              {/* Main OS Content Canvas */}
              <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col">
                <HomeScreen />
                <AppContainer />
              </div>

              {/* Bottom Android 14 Navigation Bar */}
              <NavigationBar />

              {/* Overlays */}
              {isLocked && <LockScreen />}
              <NotificationShade />
              <RecentsOverview />
              <SuperuserDialog />
              <VolumeSlider />

              {/* Floating Android System Toast Notification */}
              {lastToast && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/15 shadow-2xl animate-bounce tracking-wide whitespace-nowrap max-w-[85%] truncate pointer-events-none">
                  {lastToast}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
