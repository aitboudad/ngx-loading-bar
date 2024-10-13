import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const NGX_LOADING_BAR_IGNORED = new HttpContextToken<boolean>(() => false);
declare const ngDevMode: boolean;

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

export function provideLoadingBarInterceptor(): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingBarInterceptor,
    multi: true,
  };
}
