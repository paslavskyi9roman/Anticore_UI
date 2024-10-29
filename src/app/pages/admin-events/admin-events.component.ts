import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

import {FirebaseService} from '../../services/firebase.service';
import {EventDetails} from '../../models/event.iterface';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgOptimizedImage],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss'
})

export class AdminEventsComponent implements OnInit {
  events: EventDetails[] = [];
  eventForm: FormGroup;
  isEditMode = false;
  editingEventId: string | null = null;
  private authService = inject(AuthService);
  private router = inject(Router);
  private firebaseService: FirebaseService = inject(FirebaseService);

  constructor(
    private fb: FormBuilder,
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

  ngOnInit(): void {
    this.firebaseService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      if (this.isEditMode && this.editingEventId) {
        const updatedEvent = {
          id: this.editingEventId,
          ...this.eventForm.value
        };
        this.firebaseService.updateEvent(updatedEvent).subscribe(() => {
          this.resetForm();
          this.firebaseService.getEvents().subscribe(events => {
            this.events = events;
          });
        });
      } else {
        this.firebaseService.addEvent(this.eventForm.value).subscribe(() => {
          this.resetForm();
          this.firebaseService.getEvents().subscribe(events => {
            this.events = events;
          });
        });
      }
    }
  }

  editEvent(event: EventDetails) {
    this.isEditMode = true;
    this.editingEventId = event.id;
    this.eventForm.patchValue({
      title: event.title,
      date: event.date,
      description: event.description,
      location: event.location,
      price: event.price,
      ticketLink: event.ticketLink,
      imageUrl: event.imageUrl
    });
  }

  deleteEvent(eventId: string): void {
    this.firebaseService.deleteEvent(eventId).subscribe(() => {
      this.firebaseService.getEvents().subscribe(events => {
        this.events = events;
      });
    });
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.firebaseService.uploadImage(file).subscribe(imageUrl => {
        this.eventForm.patchValue({imageUrl});
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.editingEventId = null;
    this.eventForm.reset();
  }
}
