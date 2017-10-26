import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel } from '@angular/router';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';

@NgModule({
  imports: [
    RouterModule,
    LoadingBarModule.forRoot(),
  ],
  exports: [
    RouterModule,
    LoadingBarModule,
  ],
})
export class LoadingBarRouterModule {
  constructor(router: Router, loadingBar: LoadingBarService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        loadingBar.start();
      }

      if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
        loadingBar.complete();
      }
    });
  }
}
