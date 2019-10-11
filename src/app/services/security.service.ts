import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOGIN_MOCKS } from '../mocks/app-user-auth-mock';
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();
  constructor(private router: Router) {
    this.securityObject = this.getLoggedInUser();
    //console.log("in constructor ... ", this.securityObject);
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.userAccess.canAccessHome = false;
    this.securityObject.userAccess.canAccessProducts = false;

    localStorage.removeItem("bearerToken");
    localStorage.removeItem("loggedInUser");
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    //reset values 
    this.resetSecurityObject();

    Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.username.toLowerCase() ));
    console.log(this.securityObject);
    if(this.securityObject.userName != "") {
      localStorage.setItem("bearerToken", this.securityObject.bearerToken);
      localStorage.setItem("loggedInUser", JSON.stringify(this.securityObject));
    }
    return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
    this.router.navigateByUrl('login');
  }

  getLoggedInUser(): AppUserAuth {
    const loggedInUser :AppUserAuth = Object.assign(new AppUserAuth(), JSON.parse(localStorage.getItem("loggedInUser")));
    //console.log("loggedInUser....", loggedInUser);
    return loggedInUser;
  }
}
