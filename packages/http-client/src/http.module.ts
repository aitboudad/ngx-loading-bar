import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarInterceptor } from './loading-bar.interceptor';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  imports: [HttpClientModule, LoadingBarModule],
  exports: [HttpClientModule, LoadingBarModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptor,
      multi: true,
    },
  ],
})
export class LoadingBarHttpClientModule {}
