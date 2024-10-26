import { Injectable, signal, computed } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private authState = signal<boolean>(false);
  isAuthenticated = computed(() => this.authState());

  login(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password).then(userCredential => {
      this.authState.set(!!userCredential.user);
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.authState.set(false);
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }

  isAdmin(): boolean {
    return !!this.auth.currentUser;
  }
}
