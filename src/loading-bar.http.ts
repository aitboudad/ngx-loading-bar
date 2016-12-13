import { Injector } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';

export interface LoadingBarRequestOptionsArgs extends RequestOptionsArgs {
    ignoreLoadingBar?: boolean;
}

@Injectable()
export class NgLoadingBarHttp extends Http {
    pending = new Subject();
    private _pendingRequests: number = 0;

    request(url: string|Request, options?: LoadingBarRequestOptionsArgs): Observable<Response> {
        const response = super.request(url, options).share();
        if (options && options.ignoreLoadingBar === true) {
            return response;
        }

        this.requestStarted();
        response.subscribe(
            (x) => {},
            (err) => this.requestEnded(),
            () => this.requestEnded(),
        );

        return response;
    }

    private requestStarted() {
        this.pending.next({
            started: this._pendingRequests === 0,
            pendingRequests: ++this._pendingRequests,
        });
    }

    private requestEnded() {
        this.pending.next({
            completed: this._pendingRequests === 1,
            pendingRequests: --this._pendingRequests,
        });
    }
}
