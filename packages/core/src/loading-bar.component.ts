import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <ng-container *ngIf="(loader.progress$|async) as progress">
      <div id="loading-bar-spinner" *ngIf="includeSpinner" [style.color]="color"><div class="spinner-icon"></div></div>
      <div id="loading-bar" *ngIf="includeBar" [style.color]="color">
        <div class="bar" [style.background]="color" [style.width]="progress + '%'">
          <div class="peg"></div>
        </div>
      </div>
    </ng-container>
  `,
  preserveWhitespaces: false,
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent {
  @Input() includeSpinner = true;
  @Input() includeBar = true;
  @Input() color;

  constructor(public loader: LoadingBarService) {}
}
