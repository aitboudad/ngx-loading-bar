import { Component, Input } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ng-loading-bar, ngx-loading-bar',
  template: `
    <ng-container *ngIf="(progress$|async) as value">
      <div id="loading-bar-spinner" *ngIf="includeSpinner"><div class="spinner-icon"></div></div>
      <div id="loading-bar"><div class="bar" [style.width]="value + '%'"><div class="peg"></div></div></div>
    </ng-container>
  `,
})
export class LoadingBarComponent {
  @Input() includeSpinner = true;
  progress$: Subject<number> = this.loader.progress$;

  constructor(private loader: LoadingBarService) {}
}
