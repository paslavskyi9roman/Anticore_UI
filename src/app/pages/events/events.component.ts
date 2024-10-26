import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { FirebaseService } from '../../services/firebase.service';
import { EventDetails } from '../../models/event.iterface';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: EventDetails[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
}
