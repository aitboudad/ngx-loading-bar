import { Injectable } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarState } from './loading-bar.state';
import { Observable, Subject, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private refs: { [id: string]: LoadingBarState } = {};
  private streams$ = new Subject<void>();
  readonly value$ = this.streams$.asObservable().pipe(
    switchMap(() => combineLatest(...Object.keys(this.refs).map((s) => this.refs[s].value$))),
    map((v) => Math.max(0, ...v)),
  );

  /** @deprecated use `value$` instead. */
  get progress$() {
    return this.value$;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /** @deprecated use `useRef` instead. */
  start(initialValue = 2) {
    this.useRef().start(initialValue);
  }

  /** @deprecated use `useRef` instead. */
  set(value: number) {
    this.useRef().set(value);
  }

  /** @deprecated use `useRef` instead. */
  increment(value?: number) {
    this.useRef().increment(value);
  }

  /** @deprecated use `useRef` instead. */
  complete() {
    this.useRef().complete();
  }

  /** @deprecated use `useRef` instead. */
  stop() {
    this.useRef().stop();
  }

  useRef(id: string = 'default'): LoadingBarState {
    if (!this.refs[id]) {
      this.refs[id] = new LoadingBarState();
      this.streams$.next();

      if (!isPlatformBrowser(this.platformId)) {
        this.refs[id].disable();
      }
    }

    return this.refs[id];
  }
}
