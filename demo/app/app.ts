import { NgModule, Component, enableProdMode } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Component({
  selector: 'ng-loading-bar-app',
  templateUrl: './app.html',
})
export class App {
    constructor(private _http: Http) {}

    startHttpRequest() {
      this._http.get('/app/heroes/?name=^j');
    }
}
