import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
    selector: 'ng-loading-bar-app',
    templateUrl: './app.html',
})
export class App {
    httpDataResponse: any[];
    httpClientDataResponse: any[];
    timer: number;

    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private loadingService: LoadingBarService,
    ) {}

    startHttpRequest() {
        this.http.get('/app/heroes').subscribe(heroes => this.httpDataResponse = heroes.json());
    }

    startHttpClientRequest() {
        this.httpClient.get('/app/heroes').subscribe((heroes: any[]) => this.httpClientDataResponse = heroes);
    }

    startTimer() {
        const timer$ = Observable
            .interval(1000)
            .take(3);

        timer$.subscribe(
            (value) => this.timer = value + 1,
            (err) => this.loadingService.complete(),
            () => this.loadingService.complete(),
        );

        // We're sure that subscription has been made, we can start loading bar service
        this.loadingService.start();
    }
}
