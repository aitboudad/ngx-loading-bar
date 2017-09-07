import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
    constructor(private _loadingBarService: LoadingBarService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // https://github.com/angular/angular/issues/18155
        const meta = (req as any).metadata || {};
        if (meta && meta.ignoreLoadingBar === true) {
            return next.handle(req);
        }

        return next.handle(req).do(
            (event) => {
                if (event.type === HttpEventType.Sent) {
                    this._loadingBarService.startLoading();
                }

                if (event instanceof HttpResponse) {
                    this._loadingBarService.endLoading();
                }
            },
            () => this._loadingBarService.endLoading(),
        );
    }
}
