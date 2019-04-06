import { Injectable } from '@angular/core';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = false;

  private loginUrl = 'https://reqres.in/api/login';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * We don't want someone outside of this class to alter loggedIn state.
   * Which is why we're storing logged in state in private _loggedIn property.
   * We will only expose a getter for it. Now we can access authService.loggedIn
   * outside of the class to check loggedIn state, but we can't do something like
   * authService.loggedIn = true, that would not work.
   */
  get loggedIn() {
    return this._loggedIn;
  }

  login(data: {email: string, password: string}) {
    /**
     * Chaining 'pipe' to observable allows us to 'play' with the emited value
     * before it's passed to subscribers. Inside of pipe() method we can put
     * some rxjs operators like tap(), map(). Tap does nothing, it just allows
     * us to do something before the subscriber gets the value.
     */
    return this.http.post(this.loginUrl, data).pipe(
      tap(() => this._loggedIn = true)
    );
  }

  logout() {
    this._loggedIn = false;
  }
}
