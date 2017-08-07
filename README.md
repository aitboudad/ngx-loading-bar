## Quick Start

#### 1. Install @ngx-loading-bar/http
```bash
  npm install @ngx-loading-bar/http --save
```

#### 2. Import the `LoadingBarHttpModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LoadingBarHttpModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}

```

#### 3. Include `ngx-loading-bar` in your app component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-loading-bar></ngx-loading-bar>
  `,
})
export class AppComponent {}

```

#### 4. include the supplied CSS file (or create your own).
  - [loading-bar.css](loading-bar.css)
  

## Manually manage loading service 

#### 1. Import the `LoadingBarModule`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LoadingBarModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}

```

#### 2. Inject/Use LoadingBarService

```ts
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

        request$.subscribe(
            (heroes) => this.heroes = heroes,
            (err) => this.loadingService.endLoading(), // Stop loading service
            () => this.loadingService.endLoading()
        );

        // Start loading service
        this.loadingService.startLoading();
    }
    
    startTimer() {
        const timer$ = Observable
            .interval(1000)
            .take(10);
        timer$
            .subscribe((value) => this.timer = value + 1);

        // If no need to do specific work on each coming event, we just pass the obervable to startLoading method
        this.loadingService.startLoading(timer$);   
    }
}

```
  
  
## Advanced

When you import LoadingBarHttpModule, http service observables become hot. That means that a HTTP request 
is sent as soon as a call to http.get (for example) has been made.

```ts

import { Component } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'ng-loading-bar-app',
    templateUrl: './app.html',
})
export class App {

    private request$;

    constructor(private _http: Http) {
        // http request is sent here
        this.request$ = _http.get('/app/heroes');
    }

    startLoadingBarHttpRequest() {
        if (false) {
            // Request has been sent to server 
            this.request$.subscribe();
        }
    }
}

```

This behavior is because the Loading bar module overrides default http service by setting up a subscription to the request. 
This subscription fires up the HTTP request. 

If this behavior does'nt suit you, you should manage loading bar manually as in the component startHttpRequest above.


Based on https://github.com/sir-valentin/Angular2LoadingBar.git
