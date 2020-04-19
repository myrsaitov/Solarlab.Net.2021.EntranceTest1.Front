import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthService {
  private readonly tokenName = '  login_session';
  private isAuthSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isAuth() {
    return this.isAuthSubject$.value;
  }

  get isAuth$() {
    return this.isAuthSubject$.asObservable();
  }

  saveSession(token: string): void {
    sessionStorage.setItem(this.tokenName, token);
    this.isAuthSubject$.next(!!this.getSession());
  }

  getSession(): string {
    return sessionStorage.getItem(this.tokenName);
  }

  deleteSession(): void {
    sessionStorage.removeItem(this.tokenName);
    this.isAuthSubject$.next(!!this.getSession());
  }

  getUsername() {

    return sessionStorage.getItem('currentUser');

  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(!!this.getSession());
    });
  }
}
