import {inject, Injectable} from '@angular/core';
import { Firestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable, from, switchMap } from 'rxjs';

import { EventDetails } from '../models/event.iterface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);

  getEvents(): Observable<EventDetails[]> {
    const eventsCol = collection(this.firestore, 'events');
    const eventSnapshotPromise = getDocs(eventsCol);
    return from(eventSnapshotPromise.then(eventSnapshot =>
      eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as EventDetails))
    ));
  }

  addEvent(event: Omit<EventDetails, 'id'>): Observable<string> {
    const eventsCol = collection(this.firestore, 'events');
    const docRefPromise = addDoc(eventsCol, event);
    return from(docRefPromise.then(docRef => docRef.id));
  }

  updateEvent(event: EventDetails): Observable<void> {
    const eventRef = doc(this.firestore, 'events', event.id);
    const updateDocPromise = updateDoc(eventRef, { ...event });
    return from(updateDocPromise);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.getEvents().pipe(
      switchMap(events => {
        const event = events.find(e => e.id === eventId);
        if (event?.imageUrl) {
          const imageRef = ref(this.storage, event.imageUrl);
          return from(deleteObject(imageRef)).pipe(
            switchMap(() => {
              const eventRef = doc(this.firestore, 'events', eventId);
              return from(deleteDoc(eventRef));
            })
          );
        }
        const eventRef = doc(this.firestore, 'events', eventId);
        return from(deleteDoc(eventRef));
      })
    );
  }

  uploadImage(file: File): Observable<string> {
    const storageRef = ref(this.storage, `events/${file.name}`);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap(() => from(getDownloadURL(storageRef)))
    );
  }
}
