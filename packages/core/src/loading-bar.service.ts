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

    startLoading(source$?: Observable<any>) {
        console.warn(`LoadingBarService: 'startLoading' is deprecated and will removed in the next version use 'start' instead.`);
        this.start();
        if (source$) {
            console.warn(`LoadingBarService: passing 'source$' to 'startLoading' is deprecated and will removed in the next version.`);

            source$ = share.call(source$);
            source$.subscribe(this.getLoadingObserver());

            return source$;
        }
    }

    endLoading() {
        console.warn(`LoadingBarService: 'endLoading' is deprecated and will removed in the next version use 'complete' instead.`);
        this.complete();
    }

    getLoadingObserver(): Observer<any> {
        console.warn(`LoadingBarService: 'getLoadingObserver' is deprecated and will removed in the next version.`);

        return {
            next: (x) => x,
            error: (err) => this.complete(),
            complete: () => this.complete(),
        };
    }

    ngOnDestroy() {
        this.pending.complete();
    }
}
