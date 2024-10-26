import {Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {EventsComponent} from './pages/events/events.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {InfoComponent} from './pages/info/info.component';
import {FundraisingComponent} from './pages/fundraising/fundraising.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './guards/authGuard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {
    path: 'events/:id',
    loadComponent: () => import('./pages/event-detail/event-detail.component').then(m => m.EventDetailComponent)
  },
  {path: 'contact-us', component: ContactsComponent},
  {path: 'info', component: InfoComponent},
  {path: 'fundraising', component: FundraisingComponent},
  {
    path: 'admin',
    children: [
      {path: 'login', component: LoginComponent},
      {
        path: 'events',
        loadComponent: () => import('./pages/admin-events/admin-events.component').then(m => m.AdminEventsComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {path: '**', redirectTo: ''}
];
