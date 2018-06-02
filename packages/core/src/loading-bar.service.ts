import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class LoadingBarService implements OnDestroy {
  readonly progress$ = (new Subject<number>()).pipe(debounceTime(0)) as Subject<number>;

  private _pendingRequests = 0;
  private _value = 0;
  private _incTimeout: any;

  start(initialValue = 2) {
    ++this._pendingRequests;
    if (this._value === 0 || this._pendingRequests === 1) {
      // Inserts the loading bar element into the dom, and sets it to 2%
      this.set(this._pendingRequests === 1 && this._value > 0 ? this._value : initialValue);
    }
  }

  stop() {
    while (this._pendingRequests > 0) {
      this.complete();
    }
  }

  complete() {
    if (this._pendingRequests === 0 && this._value === 0) {
      return;
    }

    if (this._pendingRequests > 0) {
      --this._pendingRequests;
    }

    if (this._pendingRequests === 0 || (this._pendingRequests === 0 && this._value > 0)) {
      if (this._value !== 100) {
        this.set(100);
      }

      // Attempt to aggregate any start/complete calls within 500ms:
      setTimeout(() => this.set(0), 500);
    }
  }

  /**
   * Set the loading bar's width to a certain percent.
   *
   * @param n any value between 0 and 100
   */
  set(n) {
    if (n === 0 && this._pendingRequests > 0) {
      n = 2;
    }

    this._value = n;
    this.progress$.next(n);

    if (this._pendingRequests === 0) {
      return;
    }

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
  increment(rnd = 0) {
    if (rnd > 0) {
      this.set(this._value + rnd);
    }

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

  ngOnDestroy() {
    this.progress$.complete();
  }
}
