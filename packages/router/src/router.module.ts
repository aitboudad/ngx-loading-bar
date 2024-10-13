import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { registerRouterListener } from './router.service';

@NgModule({
  imports: [RouterModule, LoadingBarModule],
  exports: [RouterModule, LoadingBarModule],
})
export class LoadingBarRouterModule {
  constructor(router: Router, loader: LoadingBarService) {
    registerRouterListener(router, loader)();
  }
}
