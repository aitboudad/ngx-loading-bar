import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: ``
})
// Dummy component to simulate router navigation
export class HelloComponent {
  @Input() name: string;
}
