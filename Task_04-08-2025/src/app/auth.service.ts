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
