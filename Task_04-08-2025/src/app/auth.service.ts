// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   // isLoggedIn = false
//   // constructor() { }

//   // login(email: string, password: string){
//   //   if(email === 'admin@gmail.com' && password === 'admin123')
//   //   {
//   //     this.isLoggedIn = true
//   //   }
//   //   return this.isLoggedIn
//   // }

//   isLoginSubject  = new BehaviorSubject<boolean>(this.hasToken());
//   constructor() { }

//   login (username: string, password: string):void {
//     if(username === 'admin@gmail.com ' && password === 'admin123'){
//       localStorage.setItem('token', 'JWT');
//       this.isLoginSubject.next(true);
//     }
//     else{
//       this.isLoginSubject.next(false)
//     }
//   }
//   logout (): void {
//     localStorage.removeItem('token');
//     this.isLoginSubject.next(false);
//   }
//   isLoggedIn() : Observable<boolean> {
//     return this.isLoginSubject.asObservable();
//   }

//   private hasToken (): boolean {
//     return !!localStorage.getItem('token');
//   }
// }


// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private authStatus = new BehaviorSubject<boolean>(this.hasToken());
//   isLoggedIn$ = this.authStatus.asObservable();

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   login(token: string) {
//     localStorage.setItem('token', token);
//     this.authStatus.next(true);
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.authStatus.next(false);
//   }
// }

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false
  constructor(){}
  login(username: string,password: string){
    if(username==='admin@gmail.com' && password === 'admin123'){
      this.isLoggedIn = true;
    }
    return this.isLoggedIn
  }
}
