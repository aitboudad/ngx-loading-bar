import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <ng-container *ngIf="(value !== null ? value : loader.progress$|async) as progress">
      <div id="loading-bar-spinner" *ngIf="includeSpinner" [style.color]="color">
        <div [style.width]="diameter" [style.height]="diameter" class="spinner-icon"></div>
      </div>
      <div id="loading-bar" *ngIf="includeBar" [style.color]="color">
        <div class="bar" [style.background]="color" [style.height]="height" [style.width]="progress + '%'">
          <div class="peg" [style.height]="height"></div>
        </div>
      </div>
    </ng-container>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./loading-bar.component.scss'],
  host: {
    '[class.loading-bar-fixed]': 'fixed',
  }
})
export class LoadingBarComponent {
  @Input() includeSpinner = true;
  @Input() includeBar = true;
  @Input() fixed = true;
  @Input() color: string;
  @Input() height;
  @Input() diameter;
  @Input() value = null;

  constructor(public loader: LoadingBarService) {}
}
