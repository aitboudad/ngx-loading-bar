import { Routes } from '@angular/router';
import { HelloComponent } from './hello.component';

export const routes: Routes = [
  { path: '', component: HelloComponent },
  { path: 'home', component: HelloComponent },
];
