import { Injectable, NgZone, Optional } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarState } from './loading-bar.state';
import { Subject, combineLatest, Observable, OperatorFunction } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { LOADING_BAR_CONFIG, LoadingBarConfig } from './loading-bar.config';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private refs: { [id: string]: LoadingBarState } = {};
  private streams$ = new Subject<void>();
  readonly value$ = this.streams$.asObservable().pipe(
    startWith(null),
    switchMap(() => combineLatest(...Object.keys(this.refs).map((s) => this.refs[s].value$))),
    runInZone(this.zone),
    map((v) => Math.max(0, ...v)),
  );

  /** @deprecated use `value$` instead. */
  get progress$() {
    return this.value$;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(LOADING_BAR_CONFIG) private config: LoadingBarConfig = {},
    @Optional() private zone?: NgZone,
  ) {}

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
      this.refs[id] = new LoadingBarState(this.config);
      this.streams$.next();

      if (!isPlatformBrowser(this.platformId)) {
        this.refs[id].disable();
      }
    }

    return this.refs[id];
  }
}

// https://stackoverflow.com/a/57452361/1406096
export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  if (!zone) {
    return (source) => source;
  }

  return (source) =>
    new Observable((observer) =>
      source.subscribe(
        (value: T) => zone.run(() => observer.next(value)),
        (e: any) => zone.run(() => observer.error(e)),
        () => zone.run(() => observer.complete()),
      ),
    );
}
