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
  imports: [
    BrowserModule,
    HttpClientModule,

    LoadingBarHttpClientModule,
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