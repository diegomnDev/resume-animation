'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      return;
    }
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
    });
  }, []);

  return null;
}
