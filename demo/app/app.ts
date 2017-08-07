import { Component } from '@angular/core';
import { Http } from '@angular/http';
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

    heroes: Array<any>;
    timer: number;

    constructor(private _http: Http, private loadingService: LoadingBarService) {
    }

    startHttpRequest() {
        const request$ =
            this._http.get('/app/heroes')
                .map((response) => response.json().data);
        // Since module overrideHttp option is set to false, loading bar won't be displayed automatically

        request$.subscribe(
            (heroes) => this.heroes = heroes,
            (err) => this.loadingService.endLoading(),
            () => this.loadingService.endLoading(),
        );

        // We start loading manually only when we've subscribed
        this.loadingService.startLoading();
    }

    startLoadingBarHttpRequest() {
        this._http.get('/app/heroes');
    }

    startTimer() {
        const timer$ = Observable
            .interval(1000)
            .take(10);
        timer$
            .subscribe((value) => this.timer = value + 1);

        // We're sure that subscription has been made, we can start loading bar service
        this.loadingService.startLoading(timer$);
    }
}
