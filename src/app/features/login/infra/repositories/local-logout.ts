import { Injectable } from '@angular/core';
import { LogoutRepository } from '../../domain/repositories/logout.repository';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalLogoutRepository implements LogoutRepository {
  logout(): Observable<void> {
    localStorage.removeItem('token');
    return of(undefined);
  }
}
