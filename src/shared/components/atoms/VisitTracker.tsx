'use client';

import { useEffect } from 'react';

import { TrackingService } from '@/shared/services/tracking.service';
import { getDeviceInfo } from '@/shared/utils/getDeviceInfo';

const VISIT_TRACKED_KEY = 'visit_tracked';

export function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(VISIT_TRACKED_KEY)) return;

    sessionStorage.setItem(VISIT_TRACKED_KEY, '1');
    TrackingService.trackVisit({
      ...getDeviceInfo(),
      pageUrl: window.location.href,
    }).catch(() => {
      sessionStorage.removeItem(VISIT_TRACKED_KEY);
    });
  }, []);

  return null;
}
