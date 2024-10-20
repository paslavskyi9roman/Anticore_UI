import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { InfoComponent } from './pages/info/info.component';
import { FundraisingComponent } from './pages/fundraising/fundraising.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact-us', component: ContactsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'fundraising', component: FundraisingComponent },
  { path: '**', redirectTo: '' }
];
