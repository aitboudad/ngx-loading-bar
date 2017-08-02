import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgLoadingBarHttp } from './loading-bar.http';
import { NgLoadingBarComponent } from './loading-bar.component';
import { LoadingBarService } from './loading-bar.service';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, loadingBarService: LoadingBarService): Http {
    return new NgLoadingBarHttp(xhrBackend, requestOptions, loadingBarService);
}

@NgModule({
    declarations: [
        NgLoadingBarComponent,
    ],
    imports: [
        HttpModule,
    ],
    exports: [
        NgLoadingBarComponent,
    ],
})
export class NgLoadingBarModule {
    static forRoot(options?: { overrideHttp: boolean }): ModuleWithProviders {
        const _options = { overrideHttp: true, ...options };
        const providers =
            _options.overrideHttp
                ? [
                    LoadingBarService,
                    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, LoadingBarService] }
                ]
                : [LoadingBarService];
        return {
            ngModule: NgLoadingBarModule,
            providers
        };
    }
}
