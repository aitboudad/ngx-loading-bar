import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { LoadingBarHttp } from './loading-bar.http';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, loadingBarService: LoadingBarService): Http {
    return new LoadingBarHttp(xhrBackend, requestOptions, loadingBarService);
}

@NgModule({
    imports: [
        HttpModule,
        LoadingBarModule.forRoot(),
    ],
    exports: [
        HttpModule,
        LoadingBarModule,
    ],
    providers: [
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, LoadingBarService] },
    ],
})
export class LoadingBarHttpModule {}
