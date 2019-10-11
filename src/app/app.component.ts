import { Component } from '@angular/core';
import { AppUserAuth } from './models/app-user-auth';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'secured web app';
}
