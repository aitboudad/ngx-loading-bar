import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoadingBarComponent } from './loading-bar.component';
import { LoadingBarService } from './loading-bar.service';

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingBarComponent],
    exports: [LoadingBarComponent],
    providers: [LoadingBarService],
})
export class LoadingBarModule {}
