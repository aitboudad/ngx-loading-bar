import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  private started: boolean;

  constructor(private loader: LoadingBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // https://github.com/angular/angular/issues/18155
    if (req.headers.has('ignoreLoadingBar')) {
      return next.handle(req.clone({ headers: req.headers.delete('ignoreLoadingBar') }));
    }

    this.started = false;
    const ref = this.loader.useRef('http');
    return next.handle(req).pipe(
      tap(() => {
        if (!this.started) {
          ref.start();
          this.started = true;
        }
      }),
      finalize(() => {
        if (this.started) ref.complete();
        console.log('finalized');
      }),
    );
  }
}
