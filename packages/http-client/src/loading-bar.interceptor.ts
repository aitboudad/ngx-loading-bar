import { LoadingBarService } from '@ngx-loading-bar/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
    constructor(private _loadingBarService: LoadingBarService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(
            (event) => {
                if (event.type === HttpEventType.Sent) {
                    this._loadingBarService.startLoading();
                }
            },
            () => this._loadingBarService.endLoading(),
            () => this._loadingBarService.endLoading(),
        );
    }
}
