import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

import {FirebaseService} from '../../services/firebase.service';
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

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.firebaseService.addEvent(this.eventForm.value).subscribe(() => {
        this.eventForm.reset();
        this.firebaseService.getEvents().subscribe(events => {
          this.events = events;
        });
      });
    }
  }

  deleteEvent(eventId: string): void {
    this.firebaseService.deleteEvent(eventId).subscribe();
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
}
