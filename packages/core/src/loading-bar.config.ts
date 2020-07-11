import { InjectionToken } from '@angular/core';

export interface LoadingBarConfig {
  latencyThreshold?: number;
}

export const LOADING_BAR_CONFIG = new InjectionToken<LoadingBarConfig>('LOADING_BAR_CONFIG');
