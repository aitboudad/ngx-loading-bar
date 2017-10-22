import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface LoadingBarStatus {
    started?: boolean;
    completed?: boolean;
    pendingRequests: number;
}

@Injectable()
export class LoadingBarService implements OnDestroy {
    pending = new Subject<LoadingBarStatus>();
    private _pendingRequests: number = 0;

    start() {
        this.pending.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests,
        });
    }

    complete() {
        if (this._pendingRequests === 0) {
            return;
        }

        this.pending.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests,
        });
    }

    ngOnDestroy() {
        this.pending.complete();
    }
}
