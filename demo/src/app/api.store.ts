import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export namespace Api {
  export class LoadResources {
    static readonly type = '[API] Load Resources';
  }
}

export interface ApiStateModel {
  data: any;
}

@State<ApiStateModel>({
  name: 'api',
})
@Injectable()
export class ApiState {
  constructor(private http: HttpClient) {}

  @Action(Api.LoadResources)
  loadResources(ctx: StateContext<ApiStateModel>) {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(tap((data) => ctx.setState({ data })));
  }
}
