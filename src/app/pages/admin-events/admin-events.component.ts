import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import {EventDetails} from '../../models/event.iterface';
import {AuthService} from '../../services/auth-service.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss'
})
export class AdminEventsComponent implements OnInit {
  events: EventDetails[] = [];
  eventForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      price: [''],
      ticketLink: [''],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.firebaseService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.firebaseService.addEvent(this.eventForm.value).subscribe(() => {
        this.eventForm.reset();
        this.firebaseService.getEvents().subscribe(events => {
          this.events = events;
        });
      });
    }
  }


  deleteEvent(eventId: string) {
    this.firebaseService.deleteEvent(eventId).subscribe();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
