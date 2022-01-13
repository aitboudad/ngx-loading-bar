<div align="center">
  <h2>@ngx-loading-bar</h2>
  <br />
  A fully automatic loading bar with zero configuration for Angular app (http, http-client and router).
  <br /><br />

[![Npm version](https://badge.fury.io/js/%40ngx-loading-bar%2Fcore.svg)](https://npmjs.org/package/@ngx-loading-bar/core)
[![Downloads](https://img.shields.io/npm/dm/@ngx-loading-bar/core.svg)](https://npmjs.org/package/@ngx-loading-bar/core)
[![Build Status](https://api.travis-ci.org/aitboudad/ngx-loading-bar.svg?branch=main)](https://api.travis-ci.org/aitboudad/ngx-loading-bar.svg?branch=master)

</div>

---

## Packages

- [@ngx-loading-bar/router](./packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http-client](./packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/core](./packages/core/README.md) - Core module to manage the progress bar manually.

## Demo

- https://aitboudad.github.io/ngx-loading-bar/

# Table of contents

- [Getting started](#getting-started)
  - [1. Install @ngx-loading-bar](#1-install-ngx-loading-bar)
  - [2. Import the installed libraries](#2-import-the-installed-libraries)
  - [3. Include `ngx-loading-bar` in your app component](#3-include-ngx-loading-bar-in-your-app-component)
- [Global config](#global-config)
- [Ignoring particular requests](#ignoring-particular-requests)
- [Manage multi loading bars separately](#manage-multi-Loading-bars-separately)
- [Manually manage loading service](#manually-manage-loading-service)
- [Integration with Material Progress bar](#integration-with-material-progress-bar)
- [Credits](#credits)

## Getting started

#### 1. Install @ngx-loading-bar:

```bash
  # if you use `@angular/common/http`
  npm install @ngx-loading-bar/core @ngx-loading-bar/http-client --save

  # if you use `@angular/router`
  npm install @ngx-loading-bar/core @ngx-loading-bar/router --save

  # to manage loading-bar manually
  npm install @ngx-loading-bar/core --save
```

**Which Version to use?**

| Angular version | @ngx-loading-bar/core |
| --------------- | --------------------- |
| >=13.0          | 6.x                   |
| >=9.0           | 5.x                   |
| >=7.0           | 4.x                   |

#### 2. Import the installed libraries:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app';

@NgModule({
  ...
  imports: [
    ...

    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,

    // for Core use:
    LoadingBarModule
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

##### Customize `ngx-loading-bar`

You can pass the following inputs to customize the view:

| Input          | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| color          | The color of loading bar. Default value is `#29d`.                                       |
| includeSpinner | Hide or show the Spinner. Default value is `true`.                                       |
| includeBar     | Hide or show the Bar. Default value is `true`.                                           |
| height         | The height of loading bar. Default value is `2px`.                                       |
| diameter       | The diameter of the progress spinner. Default value is `14px`.                           |
| fixed          | set loading bar on the top of the screen or inside a container. Default value is `true`. |
| value          | Set the value of the progress bar.                                                       |
| ref            | Select the ref of a loading bar instance to display (`http`, `router`, ...)              |

## Global config

The global config can be adjusted by providing a value for `LOADING_BAR_CONFIG` in your application's root module.

```ts
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';

@NgModule({
  providers: [
    providers: [{ provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }],
  ]
})
```

| Option           | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| latencyThreshold | The initial delay time to wait before displaying the loading bar. Default value is `0`. |

## Ignoring particular requests

The loading bar can also be forced to ignore certain requests, for example, when long-polling or periodically sending debugging information back to the server.

#### http-client:

```ts
// ignore a particular $http GET:
httpClient.get('/status', {
  context: new HttpContext().set(NGX_LOADING_BAR_IGNORED, true),
});
```

#### router:

- using the `router.navigateByUrl()` method:

```ts
this.router.navigateByUrl('/custom-path', {
  state: { ignoreLoadingBar: true },
});
```

- using the `routerLink` directive:

```html
<a routerLink="/custom-path" [state]="{ ignoreLoadingBar: true }">Go</a>
```

## Manage multi loading bars separately

In some case you may want to differentiate the reason why the loading bar is showing for example show the loading bar when an HttpClient request is being made, and a full page darkening overlay with a spinner when the router is routing to a new page in that case either use `ref` input or `LoadingBarService` to control a specific loading bar instance:

- using `ref` input:

```html
<!-- loading bar for router -->
<ngx-loading-bar ref="router"></ngx-loading-bar>

<!-- loading bar for http -->
<ngx-loading-bar ref="http"></ngx-loading-bar>
```

- using `LoadingBarService` service:

```ts
// select the router loader instance
const state = this.loader.useRef('router');

// control state
state.start();
state.complete();

// get the progress value
const value$ = state.value$;
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

    LoadingBarModule,
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
    <button (click)="loader.start()">start</button>
    <button (click)="loader.complete()">Complete</button>
  `,
})
export class App {
  loader = this.loadingBar.useRef();
  constructor(private loadingBar: LoadingBarService) {}
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
    <mat-progress-bar mode="determinate" [value]="loader.value$ | async"></mat-progress-bar>
  `,
})
export class App {
  constructor(public loader: LoadingBarService) {}
}
```

## Lazy Loading modules

If you're using Lazy Loaded Modules in your app, please use LoadingBarRouterModule, because although a request is being fired in the nework console to fetch your lazy load module.js file, it won't trigger the LoadingBarHttpClientModule.

# Credits

- [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar)
- https://github.com/sir-valentin/Angular2LoadingBar.git
