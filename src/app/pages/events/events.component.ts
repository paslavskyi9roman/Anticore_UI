import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

import {EventDetails} from '../../models/event.iterface';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events: EventDetails[] = [
    {
      id: '1',
      title: 'Summer Concert',
      imageUrl: 'assets/events/event1.jpg',
      date: '2024-06-15',
      description: 'Summer underground concert'
    },
    {
      id: '2',
      title: 'Summer Concert',
      imageUrl: 'assets/events/event1.jpg',
      date: '2024-06-15',
      description: 'Summer underground concert'
    }
  ];
}
