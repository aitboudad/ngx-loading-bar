# @ngx-loading-bar/core

A fully automatic loading bar with zero configuration for angular app (http, http-client and router).

#### 1. Install @ngx-loading-bar/core

```bash
  npm install @ngx-loading-bar/core --save
```

#### 2. Import the `LoadingBarModule`:

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

#### 5. Inject/Use LoadingBarService

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

## Related packages

- [@ngx-loading-bar/router](./../../packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http-client](./../../packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/http](./../../packages/http/README.md) - Display the progress of your `@angular/http` requests.
