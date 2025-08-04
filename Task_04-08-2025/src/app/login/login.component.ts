import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const { username, password } = this.loginForm.value;
    //   if (username === 'admin@gmail.com' && password === 'admin123') {
    //     this.authService.login('mock-token');
    //     this.router.navigate(['/movies']);
    //   } else {
    //     alert('Invalid credentials');
    //   }
    // }

    const {username,password} = this.loginForm.value
    if(this.authService.login(username,password)){
      this.router.navigate(['/movies'])
    }
  }
}
