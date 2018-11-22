import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    console.warn('The `LoadingBarModule.forRoot()` calls is deprecated, use `LoadingBarModule` instead');

    return { ngModule: LoadingBarModule };
  }
}
