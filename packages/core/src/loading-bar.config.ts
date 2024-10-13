import { InjectionToken, Provider } from '@angular/core';

export interface LoadingBarConfig {
  latencyThreshold?: number;
}

export const LOADING_BAR_CONFIG = new InjectionToken<LoadingBarConfig>('LOADING_BAR_CONFIG');

export function provideLoadingBar(config: LoadingBarConfig): Provider {
  return { provide: LOADING_BAR_CONFIG, useValue: config };
}
