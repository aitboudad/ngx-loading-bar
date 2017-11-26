import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ng-loading-bar, ngx-loading-bar',
  template: `
    <ng-container *ngIf="(loader.progress$|async) as progress">
      <div id="loading-bar-spinner" *ngIf="includeSpinner"><div class="spinner-icon"></div></div>
      <div id="loading-bar" *ngIf="includeBar"><div class="bar" [style.width]="progress + '%'"><div class="peg"></div></div></div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  @Input() includeSpinner = true;
  @Input() includeBar = true;

  constructor(public loader: LoadingBarService) {}
}
