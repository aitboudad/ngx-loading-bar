import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingBarService implements OnDestroy {
  pending = new Subject<number>();
  private _pendingRequests = 0;

  start() {
    this.pending.next(++this._pendingRequests);
  }

  complete() {
    if (this._pendingRequests === 0) {
      return;
    }

    this.pending.next(--this._pendingRequests);
  }

  ngOnDestroy() {
      this.pending.complete();
  }
}
