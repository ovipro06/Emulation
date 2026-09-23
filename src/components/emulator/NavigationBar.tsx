import React from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import { Triangle, Circle, Square } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const {
    navigationMode,
    activeAppId,
    closeCurrentApp,
    isRecentsOpen,
    setIsRecentsOpen,
    isAppDrawerOpen,
    setIsAppDrawerOpen,
    isNotificationShadeOpen,
    setIsNotificationShadeOpen,
  } = useEmulator();

  const handleBack = () => {
    if (isNotificationShadeOpen) {
      setIsNotificationShadeOpen(false);
      return;
    }
    if (isAppDrawerOpen) {
      setIsAppDrawerOpen(false);
      return;
    }
    if (isRecentsOpen) {
      setIsRecentsOpen(false);
      return;
    }
    if (activeAppId) {
      closeCurrentApp();
    }
  };

  const handleHome = () => {
    setIsNotificationShadeOpen(false);
    setIsAppDrawerOpen(false);
    setIsRecentsOpen(false);
    closeCurrentApp();
  };

  const handleRecents = () => {
    setIsNotificationShadeOpen(false);
    setIsAppDrawerOpen(false);
    setIsRecentsOpen(!isRecentsOpen);
  };

  if (navigationMode === 'buttons') {
    return (
      <div className="h-12 w-full flex items-center justify-around px-8 bg-black/40 backdrop-blur-md z-40 select-none border-t border-white/5">
        <button
          onClick={handleBack}
          className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
          title="Back"
        >
          <Triangle size={15} className="-rotate-90 fill-current" />
        </button>
        <button
          onClick={handleHome}
          className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
          title="Home"
        >
          <Circle size={15} className="fill-current" />
        </button>
        <button
          onClick={handleRecents}
          className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
          title="Recents"
        >
          <Square size={14} className="fill-current" />
        </button>
      </div>
    );
  }

  // Modern Android 14 Gesture Pill Navigation
  return (
    <div className="h-7 w-full flex items-center justify-center relative select-none z-40">
      {/* Edge Back button indicator on sides */}
      {(activeAppId || isAppDrawerOpen || isRecentsOpen || isNotificationShadeOpen) && (
        <button
          onClick={handleBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-white/60 hover:text-white flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/20 hover:bg-black/40 transition-all active:scale-95"
          title="Back (Swipe back gesture)"
        >
          <span>‹</span>
          <span>Back</span>
        </button>
      )}

      {/* Center Android 14 Gesture Pill Bar */}
      <button
        onClick={handleHome}
        onContextMenu={(e) => {
          e.preventDefault();
          handleRecents();
        }}
        className="group py-2 px-6 flex flex-col items-center justify-center"
        title="Tap for Home, Right-click or drag up for Recents"
      >
        <div className="w-28 h-1 bg-white/70 group-hover:bg-white rounded-full transition-all group-active:scale-x-90 group-active:h-1.5 shadow-sm" />
      </button>

      {/* Quick Recents trigger */}
      <button
        onClick={handleRecents}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/60 hover:text-white px-2 py-0.5 rounded-full bg-black/20 hover:bg-black/40 transition-all"
        title="Overview / Recents"
      >
        Recents
      </button>
    </div>
  );
};
