import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { _do } from 'rxjs/operator/do';


export interface LoadingBarRequestOptionsArgs extends RequestOptionsArgs {
  ignoreLoadingBar?: boolean;
}

@Injectable()
export class LoadingBarHttp extends Http {
  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private loadingBar: LoadingBarService) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: LoadingBarRequestOptionsArgs): Observable<Response> {
    const response$ = super.request(url, options);
    if (options && options.ignoreLoadingBar === true) {
      return response$;
    }

    // NB: If we subscribe here, request would be sent while user hasn't decided to do it yet (http.get is cold)
    return _do.call(response$,
      (x) => this.loadingBar.start(),
      (err) => this.loadingBar.complete(),
      () => this.loadingBar.complete()
    );
  }
}
