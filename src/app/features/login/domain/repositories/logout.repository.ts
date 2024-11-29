import { Observable } from 'rxjs';

export abstract class LogoutRepository {
  abstract logout(): Observable<void>;
}
