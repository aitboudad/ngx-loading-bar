import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host {
      padding: 64px 32px;
      display: block;
    }
  `]
})
export class AppComponent {
  users: any[];
  timer = 0;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private loadingService: LoadingBarService,
  ) {}

  get count() {
    // warning: do not use `_pendingRequests`, it's used here for demo purpose only
    return this.loadingService['_pendingRequests'];
  }

  startHttpRequest() {
    this.users = [];
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe(heroes => this.users = heroes.json());
  }

  startHttpClientRequest() {
    this.users = [];
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .take(1)
      .subscribe((heroes: any[]) => this.users = heroes);
  }

  start() {
    this.loadingService.start();
  }

  complete() {
    this.loadingService.complete();
  }

  startTimer() {
    const timer$ = Observable
      .interval(1000)
      .take(3);

    timer$.subscribe(
      (value) => this.timer = value + 1,
      (err) => this.loadingService.complete(),
      () => this.loadingService.complete(),
    );

    // We're sure that subscription has been made, we can start loading bar service
    this.loadingService.start();
  }
}
