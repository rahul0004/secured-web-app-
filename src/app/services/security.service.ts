import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOGIN_MOCKS } from '../mocks/app-user-auth-mock';
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();
  constructor() { }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.userAccess.canAccessHome = false;
    this.securityObject.userAccess.canAccessProducts = false;

    localStorage.removeItem("bearerToken");
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    //reset values 
    this.resetSecurityObject();

    Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.username.toLowerCase() ));
    console.log(this.securityObject);
    if(this.securityObject.userName != "") {
      localStorage.setItem("bearerToken", this.securityObject.bearerToken);
    }
    return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {    
    this.resetSecurityObject();
  }
}
