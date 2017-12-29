import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { _do } from 'rxjs/operator/do';
import { _finally } from 'rxjs/operator/finally';

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

    let started = false;
    return _finally.call(
      _do.call(response$, () => {
        this.loadingBar.start();
        started = true;
      }),
      () => started && this.loadingBar.complete()
    );
  }
}
