import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      padding: 64px 32px;
      display: block;
    }
  `]
})
export class AppComponent {
  timer = 0;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    public loader: LoadingBarService,
  ) {}

  get count() {
    // warning: do not use `_pendingRequests`, it's used here for demo purpose only
    return this.loader['_pendingRequests'];
  }

  startHttpRequest() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe();
  }

  startHttpClientRequest() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe();
  }

  start() {
    this.loader.start(10);
  }

  set() {
    this.loader.set(50);
  }

  increment() {
    this.loader.increment(10);
  }

  complete() {
    this.loader.complete();
  }

  startTimer() {
    interval(1000).pipe(take(3)).subscribe(
      (value) => this.timer = value + 1,
      (err) => this.loader.complete(),
      () => this.loader.complete(),
    );

    // We're sure that subscription has been made, we can start loading bar service
    this.loader.start();
  }
}
