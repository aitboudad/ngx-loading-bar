import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, of, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface IState {
  value: number;
  requests: number;
}

@Injectable({ providedIn: 'root' })
export class LoadingBarService {
  private state$ = new BehaviorSubject<IState>({
    requests: null,
    value: undefined,
  });

  readonly progress$ = this.state$.pipe(
    switchMap((s) => this.timer$(s)),
    map(s => s.value),
  );

  private timer$ = (s: IState) => {
    let state$: Observable<IState> = of(s);
    if (!isPlatformBrowser(this.platformId)) {
      state$ = of({ value: 0, requests: null });
    } else if (s.requests === 0) {
      // Attempt to aggregate any start/complete calls within 500ms:
      state$ = s.value === 0 ? of(s) : timer(0, 500).pipe(
        take(2),
        map(t => ({ requests: null, value: t === 1 ? 0 : 100 })),
      );
    } else if (s.requests !== null) {
      state$ = timer(0, 250).pipe(
        map(t => (t === 0 ? { ...s } : { ...s, value: this._increment() })),
      );
    }

    return state$.pipe(tap((next) => this.setState(next, false)));
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  start(initialValue = 2) {
    this.setState({
      requests: this.state.requests + 1,
      value: !this.state.value ? initialValue : this.state.value,
    });
  }

  stop() {
    this.setState({ requests: 0 });
  }

  complete() {
    if (this.state.requests > 0) {
      this.setState({ requests: (this.state.requests || 1) - 1 });
    }
  }

  /**
   * Set the loading bar's width to a certain percent.
   *
   * @param n any value between 0 and 100
   */
  set(n: number) {
    this.setState({ value: n });
  }

  /**
   * Increments the loading bar by a random amount
   * but slows down as it progresses
   */
  increment(rnd = 0) {
    this.set(this._increment(rnd));
  }

  private get state() { return this.state$.value; }
  private setState(state: Partial<IState>, emitEvent = true) {
    emitEvent ? this.state$.next({ ...this.state$.value, ...state }) : Object.keys(state).forEach(prop => this.state[prop] = state[prop]);
  }

  private _increment(rnd = 0) {
    const stat = this.state.value;
    if (stat >= 99) {
      rnd = 0;
    }

    if (rnd === 0) {
      if (stat >= 0 && stat < 25) {
        // Start out between 3 - 6% increments
        rnd = (Math.random() * (5 - 3 + 1) + 3);
      } else if (stat >= 25 && stat < 65) {
        // increment between 0 - 3%
        rnd = (Math.random() * 3);
      } else if (stat >= 65 && stat < 90) {
        // increment between 0 - 2%
        rnd = (Math.random() * 2);
      } else if (stat >= 90 && stat < 99) {
        // finally, increment it .5 %
        rnd = 0.5;
      } else {
        // after 99%, don't increment:
        rnd = 0;
      }
    }

    return rnd + stat;
  }
}
