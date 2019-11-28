import { Subject, timer, of, Observable } from 'rxjs';
import { map, switchMap, take, tap, startWith, shareReplay } from 'rxjs/operators';

interface ILoadingBarState {
  action: 'start' | 'complete' | 'set' | 'stop' | 'increment';
  value: number;
  initialValue: number;
}

export class LoadingBarState {
  private state: ILoadingBarState = {
    action: null,
    value: 0,
    initialValue: 0,
  };
  private requests = null;
  private disabled = false;
  private stream$ = new Subject<ILoadingBarState>();

  asObservable() {
    return this.stream$.asObservable().pipe(
      switchMap((s) => this.timer$(s)),
      startWith({ action: null, value: 0 }),
      shareReplay(),
      map((s: ILoadingBarState) => s.value),
    );
  }

  start(initialValue = 2) {
    if (this.disabled) {
      return;
    }

    this.next({ action: 'start', initialValue });
  }

  stop() {
    this.next({ action: 'stop' });
  }

  complete() {
    this.next({ action: 'complete' });
  }

  disable() {
    this.disabled = true;
  }

  set(value: number) {
    this.next({ action: 'set', value });
  }

  increment(value = 0) {
    this.next({ action: 'increment', value });
  }

  private next(state: Partial<ILoadingBarState>, emitEvent = true) {
    switch (state.action) {
      case 'start':
        this.requests = (this.requests || 0) + 1;
        break;
      case 'complete':
        this.requests = (this.requests || 1) - 1;
        if (this.requests > 0) {
          return;
        }

        break;
      case 'stop':
        this.requests = 0;
        break;
      default:
        if (state.action === 'increment') {
          state.value = this._increment(state.value);
        }
        break;
    }

    const newState = {
      ...this.state,
      action: null,
      ...state,
    };

    this.state = newState;
    if (emitEvent) {
      this.stream$.next(this.state);
    }
  }

  private timer$ = (s: ILoadingBarState) => {
    let state$: Observable<Partial<ILoadingBarState>> = of(s);
    switch (s.action) {
      case 'start':
      case 'increment':
      case 'set': {
        if (this.requests > 0) {
          state$ = timer(0, 250).pipe(
            map(t => t === 0
              ? { ...s, value: this.state.value || s.initialValue }
              : { ...s, value: this._increment() }
            ),
          );
        }
        break;
      }
      case 'complete':
      case 'stop': {
        // Attempt to aggregate any start/complete calls within 500ms:
        state$ = s.value === 0 ? of({ ...s }) : timer(0, 500).pipe(
          take(2),
          map(t => ({ value: t === 0 ? 100 : 0 })),
        );
        break;
      }
    }

    return state$.pipe(
      map(next => <ILoadingBarState>({ ...next, action: 'set' })),
      tap((next) => this.next(next, false)),
    );
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
