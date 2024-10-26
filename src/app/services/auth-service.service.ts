import { Injectable, signal, computed } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private authState = signal<boolean>(false);
  isAuthenticated = computed(() => this.authState());

  constructor() {
    const savedAuthState = localStorage.getItem('authState');
    if (savedAuthState) {
      this.authState.set(JSON.parse(savedAuthState));
    }
  }

  login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password).then(userCredential => {
      const isAuthenticated = !!userCredential.user;
      this.authState.set(isAuthenticated);
      localStorage.setItem('authState', JSON.stringify(isAuthenticated));
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.authState.set(false);
      localStorage.removeItem('authState');
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }

  isAdmin(): boolean {
    return !!this.auth.currentUser;
  }
}
