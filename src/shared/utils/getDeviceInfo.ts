export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceDetails {
  operatingSystem: string;
  browser: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
}

export interface DeviceInfo {
  deviceType: DeviceType;
  deviceDetails: DeviceDetails;
}

function getDeviceType(ua: string): DeviceType {
  if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getOperatingSystem(ua: string): string {
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown';
}

function getBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return 'Edge';
  if (/OPR\/|Opera/i.test(ua)) return 'Opera';
  if (/Chrome\//i.test(ua)) return 'Chrome';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  if (/Safari\//i.test(ua)) return 'Safari';
  return 'Unknown';
}

export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;

  return {
    deviceType: getDeviceType(ua),
    deviceDetails: {
      operatingSystem: getOperatingSystem(ua),
      browser: getBrowser(ua),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
    },
  };
}
