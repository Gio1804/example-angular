import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Authentication } from '../model/authentication';

export const ACCESS_TOKEN = 'demo-access-store';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authentication?: Authentication;

  constructor() {
    const stored = localStorage.getItem(ACCESS_TOKEN); //localStorage serve per salvari dati di autenticazione nel browser con la chiave “demo-access-store” definita dalla costante ACCESS_TOKEN.
    if (stored) {
      this.authentication = JSON.parse(stored) as Authentication;
  }
}

getAuthentication(): Authentication | undefined {  //ottenere informazioni sull’autenticazione
  return this.authentication;
}

login(username: string): Observable<void> { //effettuare login
  const loginDate = new Date();
  const expirationDate = new Date(loginDate.getTime() + (60 * 60000));  // 1 ora
  this.authentication = { username, loginDate, expirationDate };
  return of(localStorage.setItem(ACCESS_TOKEN, JSON.stringify(this.authentication)));
}

logout(): Observable<void> {  //effettuare logout
  this.authentication = undefined;
  return of(localStorage.removeItem(ACCESS_TOKEN));
}

}
