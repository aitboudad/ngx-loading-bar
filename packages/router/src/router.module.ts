import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel } from '@angular/router';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';

@NgModule({
  imports: [
    RouterModule,
    LoadingBarModule,
  ],
  exports: [
    RouterModule,
    LoadingBarModule,
  ],
})
export class LoadingBarRouterModule {
  constructor(router: Router, loader: LoadingBarService) {
    router.events.subscribe(event => {
      const navState = this.getCurrentNavigationState(router);
      if (navState && navState.ignoreLoadingBar) {
        return;
      }

      if (event instanceof NavigationStart) {
        loader.start();
      }

      if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
        loader.complete();
      }
    });
  }

  private getCurrentNavigationState(router: any) {
    // `getCurrentNavigation` only available in angular `7.2`
    const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras) {
      return currentNavigation.extras.state;
    }

    return {};
  }
}
