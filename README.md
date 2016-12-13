## Quick Start

#### 1. Install ng-loading-bar
```bash
  npm install ng-loading-bar --save
```

#### 2. Import the `NgLoadingBarModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgLoadingBarModule } from 'ng-loading-bar';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgLoadingBarModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}

```

#### 3. Include `ng-loading-bar` in your app component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ng-loading-bar></ng-loading-bar>
  `,
})
export class AppComponent {}

```

#### 4. include the supplied CSS file (or create your own).
  - `loading-bar.css`
  
  
Based on https://github.com/sir-valentin/Angular2LoadingBar.git
