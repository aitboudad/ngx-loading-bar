import { Component, Directive, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'ngx-loading-bar',
  standalone: true,
  imports: [AsyncPipe, NgIf],
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
export class NgxLoadingBar {
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
