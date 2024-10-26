import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

import {EventDetails} from '../../models/event.iterface';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event?: EventDetails;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');

    this.event = {
      id: eventId!,
      title: 'Summer Concert',
      imageUrl: 'assets/events/event1.jpg',
      date: '2024-06-15',
      description: 'Join us for an amazing underground concert experience!',
      location: 'Underground Club, Lviv',
      price: '200 UAH',
      ticketLink: 'https://tickets.example.com'
    };
  }
}
