import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private snackbar: MatSnackBar){
    this.loginForm = this.fb.group({
      username: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    })
  }
  onSubmit(){
    this.snackbar.open('Login Successful','Close',{duration:2000})
    this.router.navigateByUrl('/home')
  }
}
