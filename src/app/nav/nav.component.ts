import { Component, OnInit } from '@angular/core';
import { AppUserAuth } from '../models/app-user-auth';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  securityObject: AppUserAuth = null;

  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  logout(): void {
    this.securityService.logout();
  }

  ngOnInit() {
  }

}
