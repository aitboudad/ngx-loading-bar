import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _do } from 'rxjs/operator/do';
import { _finally } from 'rxjs/operator/finally';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  constructor(private loadingBar: LoadingBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // https://github.com/angular/angular/issues/18155
    const meta = (req as any).metadata || {};
    if (meta && meta.ignoreLoadingBar === true) {
      return next.handle(req);
    }

    let started = false;

    return _finally.call(_do.call(next.handle(req),
      (event) => {
        if (!started && event.type === HttpEventType.Sent) {
          started = true;
          this.loadingBar.start();
        } else if (started && event.type === HttpEventType.Response) {
          started = false;
          this.loadingBar.complete();
        }
      },
    ), () => started && this.loadingBar.complete());
  }
}
