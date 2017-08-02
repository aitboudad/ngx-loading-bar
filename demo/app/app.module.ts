import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgLoadingBarModule } from '../../src';
import { App } from './app';
import { InMemHeroService } from './hero-data';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    NgLoadingBarModule.forRoot({ overrideHttp: true }),
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemHeroService, { delay: 500 }),
  ],
  bootstrap: [App],
})
export class AppModule {
}
