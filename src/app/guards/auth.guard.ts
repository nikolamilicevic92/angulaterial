import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Most of the time we will want to navigate user away to login page if
   * he is not allowed to pass a route, for that we'll inject router object
   * and use its navigateByUrl() method to redirect user away.
   */
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  /**
   * We don't really need any of arguments angular gives us (next, state), we'll mostly
   * call other services like authService to test things like loggedIn state. Also the
   * 1 mile long return type just means we can either return true/false (which we do here),
   * or we can return a Promise that resolves to true/false, or an Observable that will
   * emit true/false.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.loggedIn) {
      return true;
    }

    // Before we return false we'll redirect the user to login page
    this.router.navigateByUrl('/login');

    return true;
  }
}
