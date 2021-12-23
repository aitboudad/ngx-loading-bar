import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export const NGX_LOADING_BAR_IGNORED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // https://github.com/angular/angular/issues/18155
    if (req.headers.has('ignoreLoadingBar')) {
      console.warn(
        'Using http headers to ignore loading bar is deprecated. Use "NGX_LOADING_BAR_IGNORED" HttpContextToken instead.',
      );
      return next.handle(req.clone({ headers: req.headers.delete('ignoreLoadingBar') }));
    }
    if (req.context.get(NGX_LOADING_BAR_IGNORED) === true) {
      return next.handle(req);
    }

    let started = false;
    const ref = this.loader.useRef('http');
    return next.handle(req).pipe(
      tap(() => {
        if (!started) {
          ref.start();
          started = true;
        }
      }),
      finalize(() => started && ref.complete()),
    );
  }
}
