import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';
import { LoadingBarService } from './loading-bar.service';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingBarModule,
      providers: [LoadingBarService],
    };
  }
}
