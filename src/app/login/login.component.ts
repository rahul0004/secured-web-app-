import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../services/security.service';
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedInUser: AppUserAuth = null;
  requestedUrlBeforeLogin: string;

  constructor(private fb: FormBuilder, private securityService: SecurityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initFormValues();
    this.requestedUrlBeforeLogin = this.route.snapshot.queryParamMap.get('requestedUrlBeforeLogin');
    console.log("url...", this.requestedUrlBeforeLogin);
    if (this.securityService.securityObject.isAuthenticated) {
      // already logged in 
      this.router.navigateByUrl('home');
    }
  }
  
  loginForm = this.fb.group({});

  initFormValues(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
    console.log(this.loginForm);
  }

  onSubmitLoginForm(): void {   
    if(this.loginForm.valid) {
      this.securityService.login(this.loginForm.value).subscribe(resp => {
        this.loggedInUser = resp;
        if(this.requestedUrlBeforeLogin) {
          this.router.navigateByUrl(this.requestedUrlBeforeLogin);
        }
        // by default if no route is matched it will be redirected to login page 
        this.router.navigateByUrl('home');
      });   
    }    
  }

}
