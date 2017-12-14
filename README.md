# @ngx-loading-bar

A fully automatic loading bar with zero configuration for Angular app (http, http-client and router).

## Packages
- [@ngx-loading-bar/router](./packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http-client](./packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/http](./packages/http/README.md) - Display the progress of your `@angular/http` requests.
- [@ngx-loading-bar/core](./packages/core/README.md) - Core module to manage the progress bar manually.

## Demo
- online demo: https://angular-sypacw.stackblitz.io
- [demo-app](./demo): Example utilizing all @ngx-loading-bar libraries.

## Quick Start

#### 1. Install one or all @ngx-loading-bar libraries:

```bash
  # if you use `@angular/common/http`
  npm install @ngx-loading-bar/http-client --save

  # if you use `@angular/http`
  npm install @ngx-loading-bar/http --save

  # if you use `@angular/router`
  npm install @ngx-loading-bar/router --save

  # to manage loading-bar manually
  npm install @ngx-loading-bar/core --save
```

#### 2. Import the installed libraries (`LoadingBarHttpClientModule`, `LoadingBarHttpModule`, `LoadingBarRouterModule` or `LoadingBarModule`):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Http import LoadingBarHttpModule:
// import { LoadingBarHttpModule } from '@ngx-loading-bar/http';

// for Router import LoadingBarRouterModule:
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import LoadingBarModule:
// import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app';

@NgModule({
  ...
  imports: [
    ...

    LoadingBarHttpClientModule

    // for HttpClient use:
    // LoadingBarHttpModule,

    // for Router use:
    // LoadingBarRouterModule

    // for HttpClient use:
    // LoadingBarHttpClientModule

    // for Core use:
    // LoadingBarHttpClientModule.forRoot()
  ],
})
export class AppModule {}
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

## Manually manage loading service 

#### 1. Import the `LoadingBarModule`

```ts
import { NgModule } from '@angular/core';

import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  ...
  imports: [
    ...

    LoadingBarModule.forRoot(),
  ],
})
export class AppModule {}
```

#### 2. Inject/Use LoadingBarService

```ts
import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-loading-bar></ngx-loading-bar>
    <button (click)="startLoading()">start</button>
    <button (click)="stopLoading()">stop</button>
  `,
})
export class App {
  constructor(private loadingBar: LoadingBarService) {}

  startLoading() {
    this.loadingBar.start();
  }
  
  stopLoading() {
    this.loadingBar.complete();
  }
}
```

## Integration with [Material Progress bar](https://material.angular.io/components/progress-bar/overview)

```ts
import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app',
  template: `
    ...
    <mat-progress-bar mode="determinate" [value]="loader.progress$|async"></mat-progress-bar>
  `,
})
export class App {
  constructor(public loader: LoadingBarService) {}
}
```

# Credits 

- [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar)
- https://github.com/sir-valentin/Angular2LoadingBar.git
