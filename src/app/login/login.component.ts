import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../services/security.service';
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedInUser: AppUserAuth = null;

  constructor(private fb: FormBuilder, private securityService: SecurityService) { }

  ngOnInit() {
    this.initFormValues();
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
      });   
    }    
  }

}
