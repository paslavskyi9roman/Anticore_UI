import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"anticore-lviv","appId":"1:147612515351:web:e4c9f7c15ef63b8aacb052","storageBucket":"anticore-lviv.appspot.com","apiKey":"AIzaSyDRopXoJvLts5SXQFbMnkTV5a6SwevA8ok","authDomain":"anticore-lviv.firebaseapp.com","messagingSenderId":"147612515351","measurementId":"G-KBRNT9VERQ"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())]
};
