import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationError,
  NavigationEnd,
  NavigationCancel,
  ROUTER_INITIALIZER,
} from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

function getCurrentNavigationState(router: any) {
  // `getCurrentNavigation` only available in angular `7.2`
  const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
  if (currentNavigation && currentNavigation.extras) {
    return currentNavigation.extras.state;
  }

  return {};
}

export function registerRouterListener(router: Router, loader: LoadingBarService) {
  return () => {
    const ref = loader.useRef('router');
    router.events.subscribe((event) => {
      const navState = getCurrentNavigationState(router);
      if (navState && navState.ignoreLoadingBar) {
        return;
      }

      if (event instanceof NavigationStart) {
        ref.start();
      }

      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        ref.complete();
      }
    });
  };
}

export function provideLoadingBarRouter(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: registerRouterListener,
    deps: [Router, LoadingBarService],
    multi: true,
  };
}
