import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }
  private keycloakAuth: any;
  init(): Promise<any> {
  return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://localhost:8080/auth',
        'realm': 'Alip',
        'clientId': 'bcw-angular'
      };
      this.keycloakAuth = new Keycloak(config);
	  //login-required will authenticate the client if the user is logged-in to Keycloak or display the login page if not. 
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        }); 
      });
  }
  getToken(): string {
    return this.keycloakAuth.token;
  }
}
