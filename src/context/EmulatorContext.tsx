import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppDefinition, DeviceProfile, LogcatEntry, MagiskModule, SuperuserApp, AndroidNotification } from '../types/emulator';
import { DEVICE_PROFILES, INITIAL_APPS, INITIAL_MODULES, INITIAL_SUPERUSER_APPS, PLAY_STORE_CATALOG } from '../data/mockSystem';

interface EmulatorContextType {
  // Device & Hardware
  device: DeviceProfile;
  setDevice: (p: DeviceProfile) => void;
  isPoweredOn: boolean;
  isBooting: boolean;
  bootProgress: number;
  isLocked: boolean;
  unlockDevice: () => void;
  lockDevice: () => void;
  togglePower: () => void;
  rebootDevice: () => void;
  batteryLevel: number;
  setBatteryLevel: (b: number) => void;
  isCharging: boolean;
  toggleCharging: () => void;
  wifiConnected: boolean;
  toggleWifi: () => void;
  cellularData: boolean;
  toggleCellular: () => void;
  volume: number;
  adjustVolume: (delta: number) => void;
  showVolumeSlider: boolean;
  brightness: number;
  setBrightness: (b: number) => void;
  orientation: 'portrait' | 'landscape';
  toggleOrientation: () => void;
  darkTheme: boolean;
  toggleDarkTheme: () => void;
  flashlight: boolean;
  toggleFlashlight: () => void;
  dnd: boolean;
  toggleDnd: () => void;
  gpsCoords: { lat: number; lng: number; city: string };
  setGpsCoords: (coords: { lat: number; lng: number; city: string }) => void;
  navigationMode: 'gestures' | 'buttons';
  setNavigationMode: (m: 'gestures' | 'buttons') => void;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
  isShaking: boolean;
  shakeDevice: () => void;

  // OS & App Lifecycle
  activeAppId: string | null;
  openApp: (id: string) => void;
  closeCurrentApp: () => void;
  recents: string[];
  isRecentsOpen: boolean;
  setIsRecentsOpen: (v: boolean) => void;
  clearRecents: () => void;
  isNotificationShadeOpen: boolean;
  setIsNotificationShadeOpen: (v: boolean) => void;
  isAppDrawerOpen: boolean;
  setIsAppDrawerOpen: (v: boolean) => void;
  installedApps: AppDefinition[];
  installApp: (app: AppDefinition) => void;
  uninstallApp: (id: string) => void;
  notifications: AndroidNotification[];
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (n: Omit<AndroidNotification, 'id'>) => void;

  // Magisk & Root Engine
  magiskVersion: string;
  isRooted: boolean;
  toggleRoot: () => void;
  zygiskEnabled: boolean;
  toggleZygisk: () => void;
  selinuxStatus: 'Enforcing' | 'Permissive';
  setSelinuxStatus: (s: 'Enforcing' | 'Permissive') => void;
  superuserApps: SuperuserApp[];
  toggleSuperuser: (appId: string, grant?: boolean) => void;
  modules: MagiskModule[];
  toggleModule: (id: string) => void;
  removeModule: (id: string) => void;
  flashModule: (mod: Partial<MagiskModule>) => void;
  denyList: string[];
  toggleDenyList: (pkg: string) => void;
  pendingRootRequest: {
    app: AppDefinition;
    resolve: (granted: boolean) => void;
  } | null;
  requestRoot: (app: AppDefinition) => Promise<boolean>;
  resolveRootRequest: (granted: boolean) => void;
  lastToast: string | null;
  showToast: (msg: string) => void;

  // Google Play Services & Store
  gmsActive: boolean;
  gmsVersion: string;
  playProtectSafe: boolean;
  isScanningPlayProtect: boolean;
  lastScanTime: string;
  runPlayProtectScan: () => void;
  playIntegrityPass: boolean;
  googleAccount: { name: string; email: string; avatar: string };

  // Performance
  fps: number;

  // Logcat & Console
  logcat: LogcatEntry[];
  addLogcat: (level: LogcatEntry['level'], tag: string, message: string) => void;
  clearLogcat: () => void;

  // Screenshots & Gallery
  screenshots: string[];
  takeScreenshot: () => void;

  // Modals & Tools
  isApkInstallerOpen: boolean;
  setIsApkInstallerOpen: (v: boolean) => void;
  isGpsModalOpen: boolean;
  setIsGpsModalOpen: (v: boolean) => void;
  isLogcatModalOpen: boolean;
  setIsLogcatModalOpen: (v: boolean) => void;
  isDeviceSettingsOpen: boolean;
  setIsDeviceSettingsOpen: (v: boolean) => void;
  isInstallPhoneModalOpen: boolean;
  setIsInstallPhoneModalOpen: (v: boolean) => void;
}

const EmulatorContext = createContext<EmulatorContextType | undefined>(undefined);

export const EmulatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Device Hardware
  const [device, setDevice] = useState<DeviceProfile>(DEVICE_PROFILES[0]);
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [bootProgress, setBootProgress] = useState<number>(100);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(94);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [wifiConnected, setWifiConnected] = useState<boolean>(true);
  const [cellularData, setCellularData] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(85);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [flashlight, setFlashlight] = useState<boolean>(false);
  const [dnd, setDnd] = useState<boolean>(false);
  const [gpsCoords, setGpsCoords] = useState({ lat: 37.4220, lng: -122.0841, city: 'Mountain View, CA' });
  const [navigationMode, setNavigationMode] = useState<'gestures' | 'buttons'>('gestures');
  const [wallpaper, setWallpaper] = useState<string>('material');
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // App & OS States
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [recents, setRecents] = useState<string[]>(['settings', 'magisk']);
  const [isRecentsOpen, setIsRecentsOpen] = useState<boolean>(false);
  const [isNotificationShadeOpen, setIsNotificationShadeOpen] = useState<boolean>(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState<boolean>(false);
  const [installedApps, setInstalledApps] = useState<AppDefinition[]>(INITIAL_APPS);
  
  // Notifications
  const [notifications, setNotifications] = useState<AndroidNotification[]>([
    {
      id: 'notif_magisk',
      app: 'Magisk',
      packageName: 'com.topjohnwu.magisk',
      icon: 'ShieldAlert',
      title: 'MagiskSU v27.0 Active',
      body: 'Zygisk is running with 4 modules loaded and Selinux Enforcing.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 'notif_gms',
      app: 'Google Play Protect',
      packageName: 'com.google.android.gms',
      icon: 'ShoppingBag',
      title: 'No harmful apps found',
      body: 'Play Protect scanned 28 apps today. Play Integrity: PASS.',
      time: '25m ago',
      unread: false,
    },
  ]);

  // Magisk Root States
  const magiskVersion = 'v27.0 (27000)';
  const [isRooted, setIsRooted] = useState<boolean>(true);
  const [zygiskEnabled, setZygiskEnabled] = useState<boolean>(true);
  const [selinuxStatus, setSelinuxStatus] = useState<'Enforcing' | 'Permissive'>('Enforcing');
  const [superuserApps, setSuperuserApps] = useState<SuperuserApp[]>(INITIAL_SUPERUSER_APPS);
  const [modules, setModules] = useState<MagiskModule[]>(INITIAL_MODULES);
  const [denyList, setDenyList] = useState<string[]>(['com.google.android.gms', 'com.android.vending']);
  const [pendingRootRequest, setPendingRootRequest] = useState<{
    app: AppDefinition;
    resolve: (granted: boolean) => void;
  } | null>(null);

  // Google Play Services
  const gmsActive = true;
  const gmsVersion = '24.18.14 (190400-631032128)';
  const [playProtectSafe, setPlayProtectSafe] = useState<boolean>(true);
  const [isScanningPlayProtect, setIsScanningPlayProtect] = useState<boolean>(false);
  const [lastScanTime, setLastScanTime] = useState<string>('Just now');
  const playIntegrityPass = modules.some(m => m.id === 'playintegrityfix' && m.enabled);
  const googleAccount = {
    name: 'Android Power User',
    email: 'ovi0660@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  };

  // Logcat entries
  const [logcat, setLogcat] = useState<LogcatEntry[]>([
    { id: '1', timestamp: '07:49:12.102', level: 'I', tag: 'Init', message: 'Starting Android 14 (API level 34) Upside Down Cake kernel 5.15.110', pid: 1 },
    { id: '2', timestamp: '07:49:12.440', level: 'I', tag: 'Magisk', message: '** MagiskSU v27.0 daemon started (PID 284)', pid: 284 },
    { id: '3', timestamp: '07:49:12.650', level: 'D', tag: 'Zygisk', message: 'Hooking zygote64 socket and injecting Zygisk companion', pid: 412 },
    { id: '4', timestamp: '07:49:13.110', level: 'I', tag: 'Magisk', message: 'Loaded module: playintegrityfix (v15.9.3)', pid: 284 },
    { id: '5', timestamp: '07:49:13.115', level: 'I', tag: 'Magisk', message: 'Loaded module: zygisk_lsposed (v1.9.2)', pid: 284 },
    { id: '6', timestamp: '07:49:14.200', level: 'I', tag: 'GmsCore', message: 'Google Play Services 24.18.14 initialized. SafetyNet provider loaded.', pid: 890 },
    { id: '7', timestamp: '07:49:14.550', level: 'D', tag: 'PlayProtect', message: 'Play Integrity verdict: MEETS_DEVICE_INTEGRITY, MEETS_BASIC_INTEGRITY', pid: 890 },
    { id: '8', timestamp: '07:49:15.020', level: 'I', tag: 'ActivityManager', message: 'Boot complete. Starting launcher com.google.android.apps.nexuslauncher', pid: 620 },
  ]);

  // Screenshots
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [lastToast, setLastToast] = useState<string | null>(null);

  // Modals
  const [isApkInstallerOpen, setIsApkInstallerOpen] = useState<boolean>(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState<boolean>(false);
  const [isLogcatModalOpen, setIsLogcatModalOpen] = useState<boolean>(false);
  const [isDeviceSettingsOpen, setIsDeviceSettingsOpen] = useState<boolean>(false);
  const [isInstallPhoneModalOpen, setIsInstallPhoneModalOpen] = useState<boolean>(false);

  const showToast = useCallback((msg: string) => {
    setLastToast(msg);
    setTimeout(() => {
      setLastToast(current => (current === msg ? null : current));
    }, 2800);
  }, []);

  const addLogcat = useCallback((level: LogcatEntry['level'], tag: string, message: string) => {
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    const newEntry: LogcatEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: ts,
      level,
      tag,
      message,
      pid: Math.floor(Math.random() * 8000) + 1000,
    };
    setLogcat(prev => [newEntry, ...prev.slice(0, 199)]);
  }, []);

  const clearLogcat = useCallback(() => {
    setLogcat([]);
  }, []);

  const fps = 120;

  const adjustVolume = useCallback((delta: number) => {
    setVolume(prev => {
      const next = Math.min(100, Math.max(0, prev + delta));
      return next;
    });
    setShowVolumeSlider(true);
    const timer = setTimeout(() => setShowVolumeSlider(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleOrientation = useCallback(() => {
    setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'));
    addLogcat('D', 'WindowManager', `Display rotation triggered: ${orientation === 'portrait' ? 'ROTATION_90' : 'ROTATION_0'}`);
  }, [orientation, addLogcat]);

  const toggleDarkTheme = useCallback(() => {
    setDarkTheme(prev => !prev);
    addLogcat('I', 'UiModeManager', `Night mode toggled: ${!darkTheme}`);
  }, [darkTheme, addLogcat]);

  const toggleFlashlight = useCallback(() => {
    setFlashlight(prev => !prev);
    showToast(!flashlight ? 'Flashlight turned on' : 'Flashlight turned off');
  }, [flashlight, showToast]);

  const toggleDnd = useCallback(() => {
    setDnd(prev => !prev);
    showToast(!dnd ? 'Do Not Disturb on' : 'Do Not Disturb off');
  }, [dnd, showToast]);

  const toggleWifi = useCallback(() => {
    setWifiConnected(prev => !prev);
    showToast(!wifiConnected ? 'Wi-Fi Connected (AndroidWifi 5GHz)' : 'Wi-Fi Disconnected');
    addLogcat('I', 'WifiStateMachine', `State changed: ${!wifiConnected ? 'CONNECTED' : 'DISCONNECTED'}`);
  }, [wifiConnected, showToast, addLogcat]);

  const toggleCellular = useCallback(() => {
    setCellularData(prev => !prev);
    showToast(!cellularData ? 'Mobile Data (5G Ultra)' : 'Mobile Data Off');
  }, [cellularData, showToast]);

  const toggleCharging = useCallback(() => {
    setIsCharging(prev => !prev);
    showToast(!isCharging ? 'Charging rapidly (30W PD)' : 'Unplugged');
  }, [isCharging, showToast]);

  const unlockDevice = useCallback(() => {
    setIsLocked(false);
    addLogcat('I', 'KeyguardUpdateMonitor', 'Device unlocked via simulated biometric fingerprint');
  }, [addLogcat]);

  const lockDevice = useCallback(() => {
    setIsLocked(true);
    setActiveAppId(null);
    setIsRecentsOpen(false);
    setIsNotificationShadeOpen(false);
    setIsAppDrawerOpen(false);
  }, []);

  const rebootDevice = useCallback(() => {
    setIsBooting(true);
    setBootProgress(0);
    setActiveAppId(null);
    setIsRecentsOpen(false);
    setIsNotificationShadeOpen(false);
    setIsAppDrawerOpen(false);
    addLogcat('I', 'PowerManagerService', 'Rebooting system: user requested reboot');

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setBootProgress(100);
        setIsBooting(false);
        setIsLocked(false);
        showToast('Android 14 restarted successfully');
        addLogcat('I', 'ActivityManager', 'Zygisk environment ready and root initialized');
      } else {
        setBootProgress(current);
      }
    }, 280);
  }, [addLogcat, showToast]);

  const togglePower = useCallback(() => {
    if (!isPoweredOn) {
      setIsPoweredOn(true);
      rebootDevice();
    } else {
      setIsPoweredOn(false);
      setActiveAppId(null);
    }
  }, [isPoweredOn, rebootDevice]);

  const shakeDevice = useCallback(() => {
    setIsShaking(true);
    showToast('Accelerometer shake detected');
    addLogcat('D', 'SensorManager', 'Hardware shake motion triggered (X: 12.4m/s², Y: -14.1m/s²)');
    setTimeout(() => setIsShaking(false), 800);
  }, [showToast, addLogcat]);

  const requestRoot = useCallback((app: AppDefinition): Promise<boolean> => {
    return new Promise(resolve => {
      if (!isRooted) {
        showToast(`Root is disabled in Magisk! Cannot grant su to ${app.name}`);
        resolve(false);
        return;
      }

      // Check if already in superuser list
      const existing = superuserApps.find(a => a.id === app.id || a.packageName === app.packageName);
      if (existing) {
        if (existing.granted) {
          showToast(`Superuser rights granted to ${app.name}`);
          setSuperuserApps(prev =>
            prev.map(a =>
              a.id === existing.id
                ? { ...a, accessCount: a.accessCount + 1, grantTime: 'Just now' }
                : a
            )
          );
          resolve(true);
          return;
        } else {
          showToast(`Superuser request denied by policy for ${app.name}`);
          resolve(false);
          return;
        }
      }

      // Prompt user
      setPendingRootRequest({
        app,
        resolve,
      });
    });
  }, [isRooted, superuserApps, showToast]);

  const resolveRootRequest = useCallback((granted: boolean) => {
    if (!pendingRootRequest) return;
    const { app, resolve } = pendingRootRequest;

    if (granted) {
      showToast(`${app.name} was granted Superuser rights`);
      addLogcat('I', 'MagiskSU', `Granting root to ${app.packageName} (uid: 10182)`);
      setSuperuserApps(prev => [
        ...prev.filter(a => a.packageName !== app.packageName),
        {
          id: app.id,
          name: app.name,
          packageName: app.packageName,
          icon: app.icon,
          granted: true,
          grantTime: 'Just now',
          accessCount: 1,
          description: `Interactive shell requested by ${app.name}`,
        },
      ]);
    } else {
      showToast(`Denied Superuser rights to ${app.name}`);
      addLogcat('W', 'MagiskSU', `Denied root request for ${app.packageName}`);
      setSuperuserApps(prev => [
        ...prev.filter(a => a.packageName !== app.packageName),
        {
          id: app.id,
          name: app.name,
          packageName: app.packageName,
          icon: app.icon,
          granted: false,
          grantTime: 'Denied just now',
          accessCount: 0,
          description: `Denied by user request`,
        },
      ]);
    }

    resolve(granted);
    setPendingRootRequest(null);
  }, [pendingRootRequest, showToast, addLogcat]);

  const openApp = useCallback(async (appId: string) => {
    const app = installedApps.find(a => a.id === appId);
    if (!app) return;

    if (app.requiresRoot) {
      const granted = await requestRoot(app);
      if (!granted) {
        showToast(`${app.name} requires Root privileges to run.`);
        return;
      }
    }

    setActiveAppId(appId);
    setIsRecentsOpen(false);
    setIsNotificationShadeOpen(false);
    setIsAppDrawerOpen(false);

    setRecents(prev => {
      const filtered = prev.filter(id => id !== appId);
      return [appId, ...filtered];
    });

    addLogcat('I', 'ActivityManager', `START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=${app.packageName}/.MainActivity}`);
  }, [installedApps, requestRoot, showToast, addLogcat]);

  const closeCurrentApp = useCallback(() => {
    setActiveAppId(null);
  }, []);

  const clearRecents = useCallback(() => {
    setRecents([]);
    setActiveAppId(null);
    setIsRecentsOpen(false);
    showToast('Recent apps cleared');
  }, [showToast]);

  const installApp = useCallback((app: AppDefinition) => {
    setInstalledApps(prev => {
      if (prev.some(a => a.id === app.id)) return prev;
      return [...prev, app];
    });
    showToast(`Installed ${app.name}`);
    addLogcat('I', 'PackageManager', `Package ${app.packageName} installed successfully`);
    setNotifications(prev => [
      {
        id: Math.random().toString(36).substring(2, 9),
        app: 'Play Store',
        packageName: 'com.android.vending',
        icon: 'ShoppingBag',
        title: `${app.name} installed`,
        body: 'Tap to open the newly installed application.',
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);
  }, [showToast, addLogcat]);

  const uninstallApp = useCallback((id: string) => {
    const target = installedApps.find(a => a.id === id);
    if (!target) return;
    setInstalledApps(prev => prev.filter(a => a.id !== id));
    if (activeAppId === id) setActiveAppId(null);
    setRecents(prev => prev.filter(r => r !== id));
    showToast(`Uninstalled ${target.name}`);
    addLogcat('I', 'PackageManager', `Package ${target.packageName} uninstalled`);
  }, [installedApps, activeAppId, showToast, addLogcat]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const addNotification = useCallback((n: Omit<AndroidNotification, 'id'>) => {
    const newNotif: AndroidNotification = {
      ...n,
      id: Math.random().toString(36).substring(2, 9),
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  // Magisk controls
  const toggleRoot = useCallback(() => {
    setIsRooted(prev => {
      const next = !prev;
      showToast(next ? 'MagiskSU Enabled' : 'MagiskSU Root Disabled');
      addLogcat('I', 'Magisk', `Magisk root status switched to: ${next ? 'ENABLED' : 'DISABLED'}`);
      return next;
    });
  }, [showToast, addLogcat]);

  const toggleZygisk = useCallback(() => {
    setZygiskEnabled(prev => {
      const next = !prev;
      showToast(next ? 'Zygisk Enabled (Reboot recommended)' : 'Zygisk Disabled');
      addLogcat('I', 'Magisk', `Zygisk configuration set to: ${next ? '1' : '0'}`);
      return next;
    });
  }, [showToast, addLogcat]);

  const toggleSuperuser = useCallback((appId: string, grant?: boolean) => {
    setSuperuserApps(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const nextVal = grant !== undefined ? grant : !app.granted;
          return {
            ...app,
            granted: nextVal,
            grantTime: nextVal ? 'Just now' : 'Revoked just now',
          };
        }
        return app;
      })
    );
  }, []);

  const toggleModule = useCallback((id: string) => {
    setModules(prev =>
      prev.map(m => {
        if (m.id === id) {
          const next = !m.enabled;
          showToast(`${m.name} ${next ? 'enabled' : 'disabled'}`);
          addLogcat('I', 'MagiskModule', `Module ${m.id} state toggled to: ${next}`);
          return { ...m, enabled: next };
        }
        return m;
      })
    );
  }, [showToast, addLogcat]);

  const removeModule = useCallback((id: string) => {
    const mod = modules.find(m => m.id === id);
    if (!mod) return;
    setModules(prev => prev.filter(m => m.id !== id));
    showToast(`Removed module: ${mod.name}`);
    addLogcat('W', 'Magisk', `Removed module ${id} from /data/adb/modules`);
  }, [modules, showToast, addLogcat]);

  const flashModule = useCallback((mod: Partial<MagiskModule>) => {
    const newMod: MagiskModule = {
      id: mod.id || `module_${Date.now()}`,
      name: mod.name || 'Custom Magisk Module',
      author: mod.author || 'User Sideload',
      version: mod.version || 'v1.0.0',
      versionCode: 100,
      description: mod.description || 'Custom module flashed into /data/adb/modules',
      enabled: true,
      canRemove: true,
    };
    setModules(prev => [...prev, newMod]);
    showToast(`Successfully flashed ${newMod.name}`);
    addLogcat('I', 'MagiskInstaller', `Flashed ${newMod.name} to /data/adb/modules/${newMod.id}`);
  }, [showToast, addLogcat]);

  const toggleDenyList = useCallback((pkg: string) => {
    setDenyList(prev => {
      const exists = prev.includes(pkg);
      const next = exists ? prev.filter(p => p !== pkg) : [...prev, pkg];
      showToast(exists ? `Removed ${pkg} from Magisk DenyList` : `Added ${pkg} to Magisk DenyList`);
      return next;
    });
  }, [showToast]);

  const runPlayProtectScan = useCallback(() => {
    setIsScanningPlayProtect(true);
    addLogcat('I', 'PlayProtect', 'Initiating full application signature security scan...');
    setTimeout(() => {
      setIsScanningPlayProtect(false);
      setPlayProtectSafe(true);
      setLastScanTime('Just now');
      showToast('Google Play Protect: All apps are verified safe');
      addLogcat('I', 'PlayProtect', 'Scan finished. 0 threats detected. SafetyNet & Play Integrity passing.');
    }, 1800);
  }, [showToast, addLogcat]);

  const takeScreenshot = useCallback(() => {
    const time = new Date().toLocaleTimeString();
    const mockImage = '/src/assets/images/android14_material_wallpaper_1790175046198.jpg';
    setScreenshots(prev => [mockImage, ...prev]);
    showToast('Screenshot captured & saved to Gallery');
    addLogcat('I', 'ScreenshotHelper', `Screenshot captured at ${time}`);
    setNotifications(prev => [
      {
        id: Math.random().toString(36).substring(2, 9),
        app: 'System UI',
        packageName: 'com.android.systemui',
        icon: 'Image',
        title: 'Screenshot saved',
        body: 'Tap to view in Google Photos gallery.',
        time: 'Just now',
        unread: true,
      },
      ...prev,
    ]);
  }, [showToast, addLogcat]);

  return (
    <EmulatorContext.Provider
      value={{
        device,
        setDevice,
        isPoweredOn,
        isBooting,
        bootProgress,
        isLocked,
        unlockDevice,
        lockDevice,
        togglePower,
        rebootDevice,
        batteryLevel,
        setBatteryLevel,
        isCharging,
        toggleCharging,
        wifiConnected,
        toggleWifi,
        cellularData,
        toggleCellular,
        volume,
        adjustVolume,
        showVolumeSlider,
        brightness,
        setBrightness,
        orientation,
        toggleOrientation,
        darkTheme,
        toggleDarkTheme,
        flashlight,
        toggleFlashlight,
        dnd,
        toggleDnd,
        gpsCoords,
        setGpsCoords,
        navigationMode,
        setNavigationMode,
        wallpaper,
        setWallpaper,
        isShaking,
        shakeDevice,
        activeAppId,
        openApp,
        closeCurrentApp,
        recents,
        isRecentsOpen,
        setIsRecentsOpen,
        clearRecents,
        isNotificationShadeOpen,
        setIsNotificationShadeOpen,
        isAppDrawerOpen,
        setIsAppDrawerOpen,
        installedApps,
        installApp,
        uninstallApp,
        notifications,
        dismissNotification,
        clearAllNotifications,
        addNotification,
        magiskVersion,
        isRooted,
        toggleRoot,
        zygiskEnabled,
        toggleZygisk,
        selinuxStatus,
        setSelinuxStatus,
        superuserApps,
        toggleSuperuser,
        modules,
        toggleModule,
        removeModule,
        flashModule,
        denyList,
        toggleDenyList,
        pendingRootRequest,
        requestRoot,
        resolveRootRequest,
        lastToast,
        showToast,
        gmsActive,
        gmsVersion,
        playProtectSafe,
        isScanningPlayProtect,
        lastScanTime,
        runPlayProtectScan,
        playIntegrityPass,
        googleAccount,
        fps,
        logcat,
        addLogcat,
        clearLogcat,
        screenshots,
        takeScreenshot,
        isApkInstallerOpen,
        setIsApkInstallerOpen,
        isGpsModalOpen,
        setIsGpsModalOpen,
        isLogcatModalOpen,
        setIsLogcatModalOpen,
        isDeviceSettingsOpen,
        setIsDeviceSettingsOpen,
        isInstallPhoneModalOpen,
        setIsInstallPhoneModalOpen,
      }}
    >
      {children}
    </EmulatorContext.Provider>
  );
};

export const useEmulator = () => {
  const context = useContext(EmulatorContext);
  if (!context) {
    throw new Error('useEmulator must be used within an EmulatorProvider');
  }
  return context;
};
