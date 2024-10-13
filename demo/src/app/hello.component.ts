import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
// Dummy component to simulate router navigation
export class HelloComponent {
  @Input() name: string;
}
