# @ngx-loading-bar/http-client

A fully automatic loading bar with zero configuration for angular app (http, http-client and router).

#### 1. Install @ngx-loading-bar/http-client

```bash
  npm install @ngx-loading-bar/http-client --save
```

#### 2. Import the `LoadingBarHttpClientModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, HttpClientModule, LoadingBarHttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
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

## Related packages

- [@ngx-loading-bar/router](./../../packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http](./../../packages/http/README.md) - Display the progress of your `@angular/http` requests.
- [@ngx-loading-bar/core](./../../packages/core/README.md) - Core module to manage the progress bar manually.
