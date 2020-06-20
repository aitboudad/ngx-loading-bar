# @ngx-loading-bar/router

A fully automatic loading bar with zero configuration for angular app (http, http-client and router).

#### 1. Install @ngx-loading-bar/router

```bash
  npm install @ngx-loading-bar/router --save
```

#### 2. Import the `LoadingBarRouterModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(...),

    LoadingBarRouterModule,
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

- [@ngx-loading-bar/http-client](./../../packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/http](./../../packages/http/README.md) - Display the progress of your `@angular/http` requests.
- [@ngx-loading-bar/core](./../../packages/core/README.md) - Core module to manage the progress bar manually.
