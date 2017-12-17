# @ngx-loading-bar/http

A fully automatic loading bar with zero configuration for angular app (http, http-client and router).

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

## Related packages
- [@ngx-loading-bar/router](./../../packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http-client](./../../packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/core](./../../packages/core/README.md) - Core module to manage the progress bar manually.
