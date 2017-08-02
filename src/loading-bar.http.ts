import { LoadingBarService } from './loading-bar.service';
import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export interface LoadingBarRequestOptionsArgs extends RequestOptionsArgs {
    ignoreLoadingBar?: boolean;
}

@Injectable()
export class NgLoadingBarHttp extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, protected _loadingBarService: LoadingBarService) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: LoadingBarRequestOptionsArgs): Observable<Response> {
        const response$ = super.request(url, options);
        if (options && options.ignoreLoadingBar === true) {
            return response$;
        }

        // NB: If we subscribe here, request would be sent while user hasn't decided to do it yet (http.get is cold)
        this._loadingBarService.startLoading(response$);
        return response$;
    }
}
