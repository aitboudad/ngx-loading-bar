import { HttpClient, HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NGX_LOADING_BAR_IGNORED } from '@ngx-loading-bar/http-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private readonly httpClient: HttpClient,
    public readonly loader: LoadingBarService,
    private readonly matSnackBar: MatSnackBar,
  ) {}

  startHttpRequest() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe();
  }
  startHttpRequestWithoutLoadingBar() {
    this.matSnackBar.open('Load started', undefined, { duration: 1000 });
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users?delay=2000', {
        context: new HttpContext().set(NGX_LOADING_BAR_IGNORED, true),
      })
      .subscribe({
        complete: () => this.matSnackBar.open('Load finished', undefined, { duration: 1000 }),
      });
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
}
