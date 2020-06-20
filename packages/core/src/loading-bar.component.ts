import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <ng-container *ngIf="value != null ? value : (value$ | async) as progress">
      <div *ngIf="includeSpinner" class="ngx-spinner">
        <div [style.width]="diameter" [style.height]="diameter" class="ngx-spinner-icon"></div>
      </div>
      <div
        *ngIf="includeBar"
        class="ngx-bar"
        [style.background]="color"
        [style.height]="height"
        [style.width]="progress + '%'"
      ></div>
    </ng-container>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./loading-bar.component.scss'],
  host: {
    '[attr.fixed]': 'fixed',
    '[style.color]': 'color',
  },
})
export class LoadingBarComponent {
  @Input() includeSpinner = true;
  @Input() includeBar = true;
  @Input() fixed = true;
  @Input() color = '#29d';
  @Input() value: number;
  @Input() ref: string;
  @Input() height: string;
  @Input() diameter: string;

  get value$() {
    return this.ref ? this.loader.useRef(this.ref).value$ : this.loader.value$;
  }

  constructor(private loader: LoadingBarService) {}
}
