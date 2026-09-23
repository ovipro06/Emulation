export type DeviceProfileId = 'pixel8pro' | 's24ultra' | 'nothingphone2' | 'pixeltablet';

export interface DeviceProfile {
  id: DeviceProfileId;
  name: string;
  manufacturer: string;
  model: string;
  screenRatio: string;
  widthPx: number;
  heightPx: number;
  aspectClass: string;
  cornerRadius: string;
  punchHolePosition: 'center' | 'left' | 'none';
  accentColor: string;
}

export interface SuperuserApp {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  granted: boolean;
  grantTime?: string;
  accessCount: number;
  description: string;
  autoGrant?: boolean;
}

export interface MagiskModule {
  id: string;
  name: string;
  author: string;
  version: string;
  versionCode: number;
  description: string;
  enabled: boolean;
  canRemove: boolean;
  icon?: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  category: 'system' | 'google' | 'root' | 'tools' | 'user' | 'games';
  isDeletable: boolean;
  requiresRoot?: boolean;
  version?: string;
  size?: string;
  bannerImage?: string;
  rating?: number;
  downloadCount?: string;
  summary?: string;
  developer?: string;
  reviewsCount?: string;
  contentRating?: string;
  screenshots?: string[];
  description?: string;
  whatsNew?: string;
  genre?: string;
  tags?: string[];
}

export interface AndroidNotification {
  id: string;
  app: string;
  packageName: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export interface LogcatEntry {
  id: string;
  timestamp: string;
  level: 'V' | 'D' | 'I' | 'W' | 'E';
  tag: string;
  message: string;
  pid: number;
}

export interface FileItem {
  name: string;
  path: string;
  type: 'dir' | 'file';
  size?: string;
  permissions: string;
  owner: string;
  group: string;
  modified: string;
  content?: string;
}
