import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { AppUserAuth } from '../models/app-user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private securityService: SecurityService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const accessType: string = next.data['accessType'];
      console.log("accessType...", accessType);
      console.log("return value ...", this.securityService.securityObject.isAuthenticated && this.securityService.securityObject.userAccess[accessType]);
      /*if(state.url.indexOf('login') != -1 && this.securityService.securityObject.isAuthenticated) {
        return false;
      } else*/
      if(this.securityService.securityObject.isAuthenticated && this.securityService.securityObject.userAccess[accessType]) {
        return true;
      } else {
        if (state.url.indexOf('login') !== -1) {
          this.router.navigate(['login'], {queryParams: {} });
        } else {
          this.router.navigate(['login'], {queryParams: {'requestedUrlBeforeLogin': state.url} });
        }
      }
    //return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {      
    return true;
  }
}
