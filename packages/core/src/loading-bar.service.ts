import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Injectable()
export class LoadingBarService implements OnDestroy {
  private _progress$ = new Subject<number>();
  readonly progress$: Subject<number> = debounceTime.call(this._progress$);

  private _pending = new Subject<number>();
  private _pendingRequests = 0;
  private _value = 0;
  private _incTimeout: any;

  get pending() {
    console.warn(`LoadingBarService: 'pending' is deprecated and will removed in the next version use 'progress$' instead which return a value between 0 and 100.`);

    return this._pending;
  }

  start() {
    this._pending.next(++this._pendingRequests);
    if (this._value === 0) {
      // Inserts the loading bar element into the dom, and sets it to 2%
      this.set(2);
    }
  }

  complete() {
    if (this._pendingRequests === 0) {
      return;
    }

    this._pending.next(--this._pendingRequests);

    if (this._pendingRequests === 0 && this._value !== 100) {
      if (this._value > 0) {
        this.set(100);
        // Attempt to aggregate any start/complete calls within 500ms:
        setTimeout(() => this.set(0), 500);
      }
    }
  }

  ngOnDestroy() {
    this._pending.complete();
    this.progress$.complete();
  }

  /**
   * Set the loading bar's width to a certain percent.
   *
   * @param n any value between 0 and 100
   */
  private set(n) {
    if (n === 0 && this._pendingRequests > 0) {
      n = 2;
    }

    this._value = n;
    this._progress$.next(n);

    // increment loadingbar to give the illusion that there is always
    // progress but make sure to cancel the previous timeouts so we don't
    // have multiple incs running at the same time.
    clearTimeout(this._incTimeout);
    if (this._value > 0 && this._value < 100) {
      this._incTimeout = setTimeout(() => this.increment(), 250);
    }
  }

  /**
   * Increments the loading bar by a random amount
   * but slows down as it progresses
   */
  private increment() {
    let rnd = 0;
    const stat = this._value;
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

    this.set(this._value + rnd);
  }
}
