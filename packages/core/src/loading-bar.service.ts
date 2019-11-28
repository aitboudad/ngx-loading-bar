import { Injectable } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarState } from './loading-bar.state';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private state = new LoadingBarState();
  readonly progress$ = this.state.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) {
      this.state.disable();
    }
  }

  start(initialValue = 2) { this.state.start(initialValue); }

  stop() { this.state.stop(); }

  complete() { this.state.complete(); }

  set(value: number) { this.state.set(value); }

  increment(value?: number) { this.state.increment(value); }
}
