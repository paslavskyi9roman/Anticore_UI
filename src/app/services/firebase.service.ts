import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import { EventDetails } from '../models/event.iterface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  getEvents(): Observable<EventDetails[]> {
    const eventsCol = collection(this.db, 'events');
    const eventSnapshotPromise = getDocs(eventsCol);
    return from(eventSnapshotPromise.then(eventSnapshot =>
      eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as EventDetails))
    ));
  }

  addEvent(event: Omit<EventDetails, 'id'>): Observable<string> {
    const eventsCol = collection(this.db, 'events');
    const docRefPromise = addDoc(eventsCol, event);
    return from(docRefPromise.then(docRef => docRef.id));
  }

  updateEvent(event: EventDetails): Observable<void> {
    const eventRef = doc(this.db, 'events', event.id);
    const updateDocPromise = updateDoc(eventRef, { ...event });
    return from(updateDocPromise);
  }

  deleteEvent(eventId: string): Observable<void> {
    const eventRef = doc(this.db, 'events', eventId);
    const deleteDocPromise = deleteDoc(eventRef);
    return from(deleteDocPromise);
  }
}
