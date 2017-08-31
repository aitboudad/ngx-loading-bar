import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operator/share';

export interface LoadingBarStatus {
    started?: boolean;
    completed?: boolean;
    pendingRequests: number;
}

@Injectable()
export class LoadingBarService implements OnDestroy {
    pending = new Subject<LoadingBarStatus>();
    private _pendingRequests: number = 0;

    startLoading(source$?: Observable<any>) {
        this.pending.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests,
        });

        if (source$) {
            share.call(source$).subscribe(this.getLoadingObserver());
        }
    }

    endLoading() {
        if (this._pendingRequests === 0) {
            return;
        }

        this.pending.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests,
        });
    }

    getLoadingObserver(): Observer<any> {
        return {
            next: (x) => x,
            error: (err) => this.endLoading(),
            complete: () => this.endLoading(),
        };
    }

    ngOnDestroy() {
        this.pending.complete();
    }
}
