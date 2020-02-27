import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <ng-container *ngIf="(value != null ? value : value$|async) as progress">
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
export class LoadingBarComponent implements OnChanges {
  @Input() includeSpinner = true;
  @Input() includeBar = true;
  @Input() fixed = true;
  @Input() color: string;
  @Input() value: number;
  @Input() ref: string;
  @Input() height: string;
  @Input() diameter: string;

  value$ = this.loader.value$;

  constructor(public loader: LoadingBarService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ref) {
      this.value$ = this.ref
        ? this.loader.useRef(this.ref).value$
        : this.loader.value$;
    }
  }
}
