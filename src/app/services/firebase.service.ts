import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {EventDetails} from '../models/event.iterface';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  async getEvents(): Promise<EventDetails[]> {
    const eventsCol = collection(this.db, 'events');
    const eventSnapshot = await getDocs(eventsCol);
    return eventSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as EventDetails));
  }

  async addEvent(event: Omit<EventDetails, 'id'>): Promise<string> {
    const eventsCol = collection(this.db, 'events');
    const docRef = await addDoc(eventsCol, event);
    return docRef.id;
  }

  async updateEvent(event: EventDetails): Promise<void> {
    const eventRef = doc(this.db, 'events', event.id);
    await updateDoc(eventRef, { ...event });
  }

  async deleteEvent(eventId: string): Promise<void> {
    const eventRef = doc(this.db, 'events', eventId);
    await deleteDoc(eventRef);
  }
}
