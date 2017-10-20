# @ngx-loading-bar/core

A fully automatic loading bar with zero configuration for angular app (http, http-client and router).

#### 1. Install @ngx-loading-bar/core
```bash
  npm install @ngx-loading-bar/core --save
```

#### 2. Import the `LoadingBarModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(...),

    LoadingBarModule.forRoot(),
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
  - [loading-bar.css](./../../loading-bar.css)


#### 5. Inject/Use LoadingBarService

```ts
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-loading-bar',
    templateUrl: './app.html',
})
export class App {
    heroes: Array<any>;
    timer: number;

    constructor(private _http: Http, private loadingBar: LoadingBarService) {}

    startHttpRequest() {
        const request$ = this._http.get('/app/heroes')
            .map((response) => response.json().data);

        request$.subscribe(
            (heroes) => this.heroes = heroes,
            (err) => this.loadingBar.complete(), // Stop loading service
            () => this.loadingBar.complete()
        );

        // Start loading service
        this.loadingBar.start();
    }
    
    startTimer() {
        const timer$ = Observable
            .interval(1000)
            .take(10);

        timer$.subscribe(
            (value) => this.timer = value + 1,
            (err) => this.loadingBar.complete(), // Stop loading service
            () => this.loadingBar.complete()
        );

        this.loadingBar.start(timer$);
    }
}

```
