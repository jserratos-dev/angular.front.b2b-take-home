import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';


  constructor() { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


  saveAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

}
