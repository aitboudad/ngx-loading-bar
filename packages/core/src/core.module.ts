import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingBar } from './loading-bar.component';

@Component({
  selector: 'ngx-loading-bar',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./loading-bar.component.scss'],
  templateUrl: './loading-bar.component.html',
  host: {
    '[attr.fixed]': 'fixed',
    '[style.color]': 'color',
  },
})
export class LoadingBarComponent extends NgxLoadingBar {}

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
