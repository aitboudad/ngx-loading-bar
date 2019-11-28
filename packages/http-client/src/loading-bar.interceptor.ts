import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // https://github.com/angular/angular/issues/18155
    if (req.headers.has('ignoreLoadingBar')) {
      return next.handle(req.clone({ headers: req.headers.delete('ignoreLoadingBar') }));
    }

    const r = next.handle(req);

    let started = false;
    const responseSubscribe = r.subscribe.bind(r);
    r.subscribe = (...args) => {
      this.loader.start();
      started = true;
      return responseSubscribe(...args);
    };

    return r.pipe(
      finalize(() => started && this.loader.complete()),
    );
  }
}
