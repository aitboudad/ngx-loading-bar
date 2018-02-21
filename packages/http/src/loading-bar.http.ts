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
    let headers = options && options.headers;
    if (!headers && url && (<Request> url).headers) {
      headers = (<Request> url).headers;
    }

    if (headers && headers.has('ignoreLoadingBar')) {
      headers.delete('ignoreLoadingBar');

      return super.request(url, options);
    }

    const response$ = super.request(url, options);
    if (options && options.ignoreLoadingBar === true) {
      return response$;
    }

    let started = false;
    const responseSubscribe = response$.subscribe.bind(response$);
    response$.subscribe = (...args) => {
      this.loadingBar.start();
      started = true;
      return responseSubscribe(...args);
    };

    return _finally.call(response$, () => started && this.loadingBar.complete()
    );
  }
}
