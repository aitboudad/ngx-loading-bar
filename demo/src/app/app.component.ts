import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Store } from '@ngxs/store';
import { Api } from './api.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private httpClient: HttpClient, public loader: LoadingBarService, private store: Store) {}

  startHttpRequest() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe();
  }

  start() {
    this.loader.useRef().start(10);
  }

  set() {
    this.loader.useRef().set(50);
  }

  increment() {
    this.loader.useRef().increment(10);
  }

  complete() {
    this.loader.useRef().complete();
  }

  stop() {
    this.loader.useRef().stop();
  }

  dispatchRequest() {
    this.store.dispatch(new Api.LoadResources());
  }
}
