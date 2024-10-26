import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FirebaseService } from '../../services/firebase.service';
import { EventDetails } from '../../models/event.iterface';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event?: EventDetails;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private firebaseService: FirebaseService = inject(FirebaseService);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.firebaseService.getEvents().subscribe(events => {
        this.event = events.find(e => e.id === eventId);
      });
    }
  }
}
