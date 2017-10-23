import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { App } from './app';
import { InMemHeroService } from './hero-data';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    LoadingBarHttpModule,
    LoadingBarHttpClientModule,
    InMemoryWebApiModule.forRoot(InMemHeroService, { delay: 500 }),
  ],
  bootstrap: [App],
})
export class AppModule {
}
